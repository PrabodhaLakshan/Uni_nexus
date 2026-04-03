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

function normalizeSkill(skill: string) {
  return skill.trim().toLowerCase();
}

function unique(arr: string[]) {
  return Array.from(new Set(arr));
}

function intersectionSize(a: string[], b: string[]) {
  const setB = new Set(b);
  let count = 0;
  for (const x of a) if (setB.has(x)) count++;
  return count;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const minMatchParam = parseInt(url.searchParams.get("minMatch") ?? "0", 10);
    const minMatch = Number.isFinite(minMatchParam) ? Math.max(0, Math.min(100, minMatchParam)) : 0;

    const companyId = await resolveCompanyId(req);
    if (!companyId) {
      return NextResponse.json({ success: true, data: [] });
    }

    const gigs = await prisma.gigs.findMany({
      where: { company_id: companyId },
      select: { id: true, requirements: true },
    });

    // Pre-compute normalized requirements per gig (so we can score per gig).
    const gigReqs = gigs
      .map((g) =>
        unique((g.requirements ?? []).map(normalizeSkill).filter(Boolean))
      )
      .filter((arr) => arr.length > 0);

    if (gigReqs.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    const students = await prisma.users.findMany({
      where: { role: "STUDENT" },
      select: {
        id: true,
        name: true,
        specialization: true,
        skills: true,
        rating: true,
      },
      take: 500,
    });

    const matches: MatchTalent[] = students
      .map((student) => {
        const originalSkills = student.skills ?? [];
        const skillToOriginal = new Map<string, string>();
        for (const s of originalSkills) {
          const norm = normalizeSkill(s);
          if (!norm) continue;
          if (!skillToOriginal.has(norm)) skillToOriginal.set(norm, s.trim());
        }

        const studentSkills = originalSkills.map(normalizeSkill).filter(Boolean);
        if (studentSkills.length === 0) return null;

        // Score per gig; keep the best match (highest overlap ratio).
        let bestMatch = 0;
        let bestMatchedSkills: string[] = [];

        for (const gigReq of gigReqs) {
          const matchedCount = intersectionSize(studentSkills, gigReq);
          const matchPct = gigReq.length
            ? (matchedCount / gigReq.length) * 100
            : 0;

          if (matchPct > bestMatch) {
            bestMatch = matchPct;
            const matchedNorm = unique(studentSkills.filter((s) => gigReq.includes(s))).slice(0, 6);
            bestMatchedSkills = matchedNorm.map((norm) => skillToOriginal.get(norm) ?? norm);
          }
        }

        const match = Math.round(bestMatch);
        if (match <= 0) return null;

        return {
          id: student.id,
          name: student.name,
          role: student.specialization ?? "Student",
          match: match,
          rating: student.rating?.toString() ?? "0",
          skills: bestMatchedSkills,
        } satisfies MatchTalent;
      })
      .filter((x): x is MatchTalent => Boolean(x))
      .sort((a, b) => {
        if (b.match !== a.match) return b.match - a.match;
        // If match equal, use numeric rating
        const ar = parseFloat(a.rating) || 0;
        const br = parseFloat(b.rating) || 0;
        return br - ar;
      })
      .filter((item) => item.match >= minMatch);

    const matchedCount = matches.length;
    const computed = matches.slice(0, 3);

    return NextResponse.json({ success: true, data: computed, meta: { matchedCount, minMatch } });
  } catch (error) {
    console.error("STARTUP_TOP_MATCHES_GET_ERROR:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch top matches";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

