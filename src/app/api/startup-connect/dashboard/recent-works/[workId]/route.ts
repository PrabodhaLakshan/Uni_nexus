import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { formatDate, normalizeString } from "../../../_shared";
import { saveUploadedFile } from "../../../_upload";

export const runtime = "nodejs";

type Ctx = { params: { workId: string } } | { params: Promise<{ workId: string }> };

async function resolveWorkId(ctx: Ctx) {
  const maybePromise = (ctx as { params: Promise<{ workId: string }> }).params;
  const params =
    typeof (maybePromise as Promise<{ workId: string }>)?.then === "function"
      ? await maybePromise
      : (ctx as { params: { workId: string } }).params;
  return params?.workId?.trim() ?? "";
}

export async function PATCH(req: Request, ctx: Ctx) {
  try {
    const workId = await resolveWorkId(ctx);
    if (!workId) {
      return NextResponse.json({ success: false, error: "workId is required." }, { status: 400 });
    }

    const contentType = req.headers.get("content-type") || "";
    let title = "";
    let description = "";
    let demo = "";
    let imageUrl: string | null | undefined = undefined;

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      title = normalizeString(form.get("title"));
      description = normalizeString(form.get("description"));
      demo = normalizeString(form.get("demo"));

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
        demo?: unknown;
        images?: unknown;
      };
      title = normalizeString(body.title);
      description = normalizeString(body.description);
      demo = normalizeString(body.demo);
      if (Array.isArray(body.images) && typeof body.images[0] === "string") {
        imageUrl = body.images[0];
      }
    }

    const data: { title?: string; description?: string; project_url?: string | null; image_url?: string | null } = {};
    if (title) data.title = title;
    if (description) data.description = description;
    if (demo) data.project_url = demo;
    if (imageUrl !== undefined) data.image_url = imageUrl;

    const updated = await prisma.company_recent_works.update({
      where: { id: workId },
      data,
    });

    return NextResponse.json({
      success: true,
      data: {
        id: updated.id,
        title: updated.title,
        description: updated.description,
        github: null,
        demo: updated.project_url ?? "",
        date: formatDate(updated.created_at),
        images: updated.image_url ? [updated.image_url] : [],
      },
    });
  } catch (error) {
    console.error("STARTUP_RECENT_WORKS_PATCH_ERROR:", error);
    const message = error instanceof Error ? error.message : "Failed to update recent work";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(_: Request, ctx: Ctx) {
  try {
    const workId = await resolveWorkId(ctx);
    if (!workId) {
      return NextResponse.json({ success: false, error: "workId is required." }, { status: 400 });
    }
    await prisma.company_recent_works.delete({ where: { id: workId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("STARTUP_RECENT_WORKS_DELETE_ERROR:", error);
    const message = error instanceof Error ? error.message : "Failed to delete recent work";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
