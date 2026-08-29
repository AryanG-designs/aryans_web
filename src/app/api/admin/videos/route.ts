import { NextRequest, NextResponse } from "next/server";
import { getVideos, saveVideos } from "@/lib/videoStore";
import { Video } from "@/lib/videos";

export async function GET() {
  const videos = await getVideos();
  return NextResponse.json({ videos });
}

export async function PUT(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.videos)) {
    return NextResponse.json({ error: "Expected { videos: Video[] }" }, { status: 400 });
  }

  const videos = body.videos as Video[];
  for (const v of videos) {
    if (!v.slug || !v.title) {
      return NextResponse.json({ error: "Every video needs a slug and title." }, { status: 400 });
    }
  }

  await saveVideos(videos);
  return NextResponse.json({ ok: true });
}
