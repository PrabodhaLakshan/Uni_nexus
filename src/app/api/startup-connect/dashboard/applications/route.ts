import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { formatDate, resolveCompanyId } from "../../_shared";

export const runtime = "nodejs";

function displayStatus(status: string) {
  const u = status.toUpperCase();
  if (u === "PENDING") return "Pending";
  if (u === "REVIEWED") return "Reviewed";
  if (u === "ACCEPTED") return "Accepted";
  if (u === "REJECTED") return "Rejected";
  return status;
}

export async function GET(req: Request) {
  try {
    const companyId = await resolveCompanyId(req);
    if (!companyId) {
      return NextResponse.json({ success: true, data: [] });
    }

    const gigs = await prisma.gigs.findMany({
      where: { company_id: companyId },
      orderBy: { created_at: "desc" },
      include: {
        gig_applications: {
          orderBy: { created_at: "desc" },
          include: {
            users: {
              select: {
                id: true,
                name: true,
                skills: true,
                specialization: true,
                rating: true,
                avatar_path: true,
                github_url: true,
                linkedin_url: true,
                year: true,
                bio: true,
              },
            },
          },
        },
      },
    });

    const data = gigs.map((gig) => {
      const budgetStr =
        gig.budget != null && Number.isFinite(Number(gig.budget))
          ? `LKR ${Number(gig.budget).toLocaleString("en-LK")}`
          : "—";

      const timeline = gig.created_at
        ? new Date(gig.created_at).toLocaleDateString("en-LK", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "—";

      const applicants = gig.gig_applications.map((app) => {
        const u = app.users;
        const displayName = u?.name?.trim() || "Student";
        const skillsFromUser = u?.skills?.length ? u.skills : (gig.requirements ?? []).slice(0, 6);
        const ratingVal = u?.rating != null ? Number(u.rating) : NaN;
        const ratingOut = Number.isFinite(ratingVal) ? ratingVal : null;

        return {
          id: app.id,
          name: displayName,
          date: formatDate(app.created_at),
          status: displayStatus(app.status),
          rawStatus: app.status.toUpperCase(),
          image: displayName.charAt(0).toUpperCase(),
          skills: skillsFromUser.slice(0, 8),
          experience:
            u?.year != null
              ? `Year ${u.year}`
              : (() => {
                  const b = u?.bio?.trim() ?? "";
                  if (!b) return "—";
                  return b.slice(0, 48) + (b.length > 48 ? "…" : "");
                })(),
          rating: ratingOut,
          portfolio: app.resume_url,
          motivation: app.motivation,
          githubUrl: u?.github_url ?? "",
          linkedinUrl: u?.linkedin_url ?? "",
          userId: app.user_id,
        };
      });

      return {
        id: gig.id,
        title: gig.title,
        budget: budgetStr,
        timeline,
        applicants,
      };
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("DASHBOARD_APPLICATIONS_GET_ERROR:", error);
    const message = error instanceof Error ? error.message : "Failed to load applications";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
