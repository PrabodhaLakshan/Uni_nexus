import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { resolveCompanyId } from "../../_shared";

export const runtime = "nodejs";

/**
 * Returns counts of gig applications for the authenticated founder:
 * - pending: status === "PENDING"
 * - total: all statuses
 */
export async function GET(req: Request) {
  try {
    const companyId = await resolveCompanyId(req);
    if (!companyId) {
      return NextResponse.json({
        success: true,
        data: { pending: 0, total: 0 },
      });
    }

    const gigs = await prisma.gigs.findMany({
      where: { company_id: companyId },
      select: { id: true },
    });

    if (gigs.length === 0) {
      return NextResponse.json({
        success: true,
        data: { pending: 0, total: 0 },
      });
    }

    const gigIds = gigs.map((g) => g.id);

    const [pending, total] = await Promise.all([
      prisma.gig_applications.count({
        where: { gig_id: { in: gigIds }, status: "PENDING" },
      }),
      prisma.gig_applications.count({
        where: { gig_id: { in: gigIds } },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: { pending, total },
    });
  } catch (error) {
    console.error("APPLICATIONS_SUMMARY_GET_ERROR:", error);
    const message = error instanceof Error ? error.message : "Failed to load applications summary";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

