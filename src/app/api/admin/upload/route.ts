import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const imageExtensions = /\.(jpe?g|png|gif|webp|svg|bmp|tiff?|heic|heif|avif)$/i;
  const looksLikeImage = file.type.startsWith("image/") || imageExtensions.test(file.name);

  if (!looksLikeImage) {
    return NextResponse.json({ error: "Only image files are allowed." }, { status: 400 });
  }

  if (file.size > 25 * 1024 * 1024) {
    return NextResponse.json({ error: "Image must be under 25MB." }, { status: 400 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Image storage isn't connected yet. In Vercel, go to Storage → Create Database → Blob, then redeploy." },
      { status: 500 }
    );
  }

  try {
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
    const blob = await put(`uploads/${Date.now()}-${safeName}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return NextResponse.json({ url: blob.url });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Upload failed unexpectedly." },
      { status: 500 }
    );
  }
}
