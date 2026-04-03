import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { formatDate, normalizeString, resolveCompanyId } from "../../_shared";
import { saveUploadedFile } from "../../_upload";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const companyId = await resolveCompanyId(req, url.searchParams.get("companyId") ?? undefined);
    if (!companyId) {
      return NextResponse.json({ success: true, data: [] });
    }

    const rows = await prisma.company_recent_works.findMany({
      where: { company_id: companyId },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: rows.map((work) => ({
        id: work.id,
        title: work.title,
        description: work.description,
        github: null,
        demo: work.project_url ?? "",
        date: formatDate(work.created_at),
        images: work.image_url ? [work.image_url] : [],
      })),
    });
  } catch (error) {
    console.error("STARTUP_RECENT_WORKS_GET_ERROR:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch recent works";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let title = "";
    let description = "";
    let demo = "";
    let companyIdHint = "";
    let imageUrl: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      title = normalizeString(form.get("title"));
      description = normalizeString(form.get("description"));
      demo = normalizeString(form.get("demo"));
      companyIdHint = normalizeString(form.get("companyId"));

      const firstImage = form
        .getAll("images")
        .find((item) => item instanceof File && item.size > 0);

      if (firstImage instanceof File) {
        imageUrl = await saveUploadedFile(firstImage, "portfolio");
      }
    } else {
      const body = (await req.json()) as {
        title?: unknown;
        description?: unknown;
        github?: unknown;
        demo?: unknown;
        images?: unknown;
        companyId?: unknown;
      };
      title = normalizeString(body.title);
      description = normalizeString(body.description);
      demo = normalizeString(body.demo);
      companyIdHint = normalizeString(body.companyId);
      imageUrl = Array.isArray(body.images) && typeof body.images[0] === "string" ? body.images[0] : null;
    }

    const companyId = await resolveCompanyId(req, companyIdHint);
    if (!companyId) {
      return NextResponse.json({ success: false, error: "No startup company found." }, { status: 404 });
    }

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: "Title and description are required." },
        { status: 400 }
      );
    }

    const created = await prisma.company_recent_works.create({
      data: {
        company_id: companyId,
        title,
        description,
        project_url: demo || null,
        image_url: imageUrl,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: created.id,
        title: created.title,
        description: created.description,
        github: null,
        demo: created.project_url ?? "",
        date: formatDate(created.created_at),
        images: created.image_url ? [created.image_url] : [],
      },
    });
  } catch (error) {
    console.error("STARTUP_RECENT_WORKS_POST_ERROR:", error);
    const message = error instanceof Error ? error.message : "Failed to add recent work";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
