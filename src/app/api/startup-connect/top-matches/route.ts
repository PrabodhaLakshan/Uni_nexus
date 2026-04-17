import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { resolveCompanyId } from "../_shared";

export const runtime = "nodejs";

type MatchTalent = {
  id: string;
  name: string;
  role: string;
  match: number;
  rating: string;
  skills: string[];
};

type RequirementProfile = {
  reqWeight: Map<string, number>;
  reqDisplay: Map<string, string>;
  topRequirementTokens: Set<string>;
};

function normalizeSkill(skill: string) {
  return skill
    .trim()
    .toLowerCase()
    .replace(/[+]/g, " plus ")
    .replace(/[.#/\\-]/g, " ")
    .replace(/\s+/g, " ");
}

function canonicalizeSkill(skill: string) {
  const normalized = normalizeSkill(skill);
  const compact = normalized.replace(/\s+/g, "");

  const aliases: Record<string, string> = {
    reactjs: "react",
    react: "react",
    nextjs: "nextjs",
    nodejs: "nodejs",
    node: "nodejs",
    js: "javascript",
    javascript: "javascript",
    ts: "typescript",
    typescript: "typescript",
    postgres: "postgresql",
    postgresql: "postgresql",
    mongodb: "mongodb",
    tailwindcss: "tailwindcss",
    tailwind: "tailwindcss",
    figma: "figma",
    uxui: "ui ux",
  };

  if (aliases[compact]) {
    return aliases[compact];
  }

  return normalized;
}

function skillTokens(skill: string) {
  return canonicalizeSkill(skill)
    .split(/[^a-z0-9]+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function unique(arr: string[]) {
  return Array.from(new Set(arr));
}

function intersectAllTokens(tokens: string[], tokenSet: Set<string>) {
  if (tokens.length === 0) return false;
  return tokens.every((t) => tokenSet.has(t));
}

function toDisplaySkill(raw: string) {
  if (!raw) return raw;
  return raw
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function buildRequirementProfile(gigs: Array<{ requirements: string[] }>): RequirementProfile {
  const reqWeight = new Map<string, number>();
  const reqDisplay = new Map<string, string>();
  const tokenFreq = new Map<string, number>();

  for (const gig of gigs) {
    const canonicalReqs = unique((gig.requirements ?? []).map(canonicalizeSkill).filter(Boolean));
    for (const req of canonicalReqs) {
      reqWeight.set(req, (reqWeight.get(req) ?? 0) + 1);
      if (!reqDisplay.has(req)) reqDisplay.set(req, toDisplaySkill(req));

      for (const token of skillTokens(req)) {
        tokenFreq.set(token, (tokenFreq.get(token) ?? 0) + 1);
      }
    }
  }

  const topRequirementTokens = new Set(
    [...tokenFreq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([token]) => token)
  );

  return { reqWeight, reqDisplay, topRequirementTokens };
}

function extractCompanyProfileSkills(industry: string | null | undefined, about: string | null | undefined) {
  const seed = [industry ?? "", about ?? ""].join(" ").trim();
  if (!seed) return [] as string[];

  const parts = seed
    .split(/[\n,;|/]+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const expanded: string[] = [];
  for (const part of parts) {
    expanded.push(part);
    for (const token of part.split(/\s+/)) {
      if (token.length >= 3) expanded.push(token);
    }
  }

  return unique(
    expanded
      .map(canonicalizeSkill)
      .filter((s) => s.length >= 2)
  );
}

/**
 * Real student skills = canonical rows in `user_skills` → `skills.name`
 * plus legacy/free-text entries in `users.skills` (String[]).
 * Deduped by normalized name; display label prefers first seen casing.
 */
function buildStudentSkillIndex(student: {
  skills: string[];
  user_skills: Array<{ skills: { name: string } | null }>;
}) {
  const normToDisplay = new Map<string, string>();
  const tokenSet = new Set<string>();

  const add = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const n = canonicalizeSkill(trimmed);
    if (!n) return;
    if (!normToDisplay.has(n)) normToDisplay.set(n, trimmed);
    for (const token of skillTokens(trimmed)) tokenSet.add(token);
  };

  for (const us of student.user_skills ?? []) {
    const name = us.skills?.name;
    if (name) add(name);
  }

  for (const s of student.skills ?? []) {
    if (typeof s === "string") add(s);
  }

  return {
    normSet: new Set(normToDisplay.keys()),
    normToDisplay,
    tokenSet,
  };
}

export async function GET(req: Request) {
  try {
    const companyId = await resolveCompanyId(req);
    if (!companyId) {
      return NextResponse.json({ success: true, data: [], meta: { matchedCount: 0, minMatch: null } });
    }

    const company = await prisma.companies.findUnique({
      where: { id: companyId },
      select: {
        industry: true,
        about: true,
      },
    });

    const gigs = await prisma.gigs.findMany({
      where: {
        company_id: companyId,
        NOT: { status: "CLOSED" },
      },
      select: { id: true, requirements: true },
    });

    const companyProfileSkills = extractCompanyProfileSkills(company?.industry, company?.about);

    const requirementProfile = buildRequirementProfile([
      ...gigs.map((g) => ({ requirements: g.requirements ?? [] })),
      { requirements: companyProfileSkills },
    ]);

    if (requirementProfile.reqWeight.size === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        meta: { matchedCount: 0, minMatch: null, hint: "no_gig_requirements" },
      });
    }

    let students: Array<{
      id: string;
      name: string;
      specialization: string | null;
      skills: string[];
      rating: unknown;
      user_skills: Array<{ skills: { name: string } | null }>;
    }>;

    try {
      students = await prisma.users.findMany({
        where: { role: { in: ["STUDENT", "Student", "student"] } },
        select: {
          id: true,
          name: true,
          specialization: true,
          skills: true,
          rating: true,
          user_skills: {
            select: {
              skills: { select: { name: true } },
            },
          },
        },
        take: 800,
      });

      // Legacy data fallback: some rows may have null/other role values even for students.
      if (students.length === 0) {
        const loose = await prisma.users.findMany({
          where: {
            OR: [
              { skills: { isEmpty: false } },
              { user_skills: { some: {} } },
            ],
          },
          select: {
            id: true,
            name: true,
            specialization: true,
            skills: true,
            rating: true,
            user_skills: {
              select: {
                skills: { select: { name: true } },
              },
            },
          },
          take: 800,
        });

        students = loose;
      }
    } catch (loadErr) {
      console.error("TOP_MATCHES_STUDENTS_WITH_SKILLS_ERROR:", loadErr);
      const basic = await prisma.users.findMany({
        where: { role: { in: ["STUDENT", "Student", "student"] } },
        select: {
          id: true,
          name: true,
          specialization: true,
          skills: true,
          rating: true,
        },
        take: 800,
      });
      students = basic.map((s) => ({ ...s, user_skills: [] }));
    }

    const matches: MatchTalent[] = [];
    const totalRequirementWeight = [...requirementProfile.reqWeight.values()].reduce(
      (sum, w) => sum + w,
      0
    );

    for (const student of students) {
      const { normSet, normToDisplay, tokenSet } = buildStudentSkillIndex(student);
      if (normSet.size === 0) continue;

      let matchedWeight = 0;
      const matchedNorms: string[] = [];

      for (const [req, weight] of requirementProfile.reqWeight.entries()) {
        const isMatch =
          normSet.has(req) || intersectAllTokens(skillTokens(req), tokenSet);
        if (!isMatch) continue;
        matchedWeight += weight;
        matchedNorms.push(req);
      }

      const skillCoverage =
        totalRequirementWeight > 0 ? (matchedWeight / totalRequirementWeight) * 100 : 0;

      const ratingValue = Number.parseFloat(String(student.rating ?? "0"));
      const safeRating = Number.isFinite(ratingValue) ? Math.max(0, Math.min(5, ratingValue)) : 0;
      const ratingScore = (safeRating / 5) * 100;

      const specializationTokens = skillTokens(student.specialization ?? "");
      const specializationBoost = specializationTokens.some((t) => requirementProfile.topRequirementTokens.has(t))
        ? 3
        : 0;

      const weightedScore = Math.min(100, skillCoverage * 0.85 + ratingScore * 0.15 + specializationBoost);
      const matchRounded = parseFloat(weightedScore.toFixed(1));
      if (matchRounded <= 0) continue;

      const bestMatchedLabels = matchedNorms
        .sort((a, b) => (requirementProfile.reqWeight.get(b) ?? 0) - (requirementProfile.reqWeight.get(a) ?? 0))
        .slice(0, 8)
        .map((norm) =>
          normToDisplay.get(norm) ?? requirementProfile.reqDisplay.get(norm) ?? toDisplaySkill(norm)
        );

      matches.push({
        id: student.id,
        name: student.name,
        role: student.specialization ?? "Student",
        match: matchRounded,
        rating: safeRating.toFixed(1),
        skills: bestMatchedLabels,
      });
    }

    matches.sort((a, b) => {
      if (b.match !== a.match) return b.match - a.match;
      const ar = parseFloat(a.rating) || 0;
      const br = parseFloat(b.rating) || 0;
      return br - ar;
    });

    const matchedCount = matches.length;
    const computed = matches;

    return NextResponse.json({
      success: true,
      data: computed,
      meta: {
        matchedCount,
        minMatch: null,
        totalCandidates: matches.length,
        returnedCount: computed.length,
        fallbackUsed: false,
        companyProfileSkillCount: companyProfileSkills.length,
      },
    });
  } catch (error) {
    console.error("STARTUP_TOP_MATCHES_GET_ERROR:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch top matches";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
