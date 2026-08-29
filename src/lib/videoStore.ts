import { list, put } from "@vercel/blob";
import { Video, seedVideos } from "./videos";

const DATA_PATH = "data/videos.json";

export async function getVideos(): Promise<Video[]> {
  try {
    const { blobs } = await list({ prefix: DATA_PATH, limit: 1 });
    const match = blobs.find((b) => b.pathname === DATA_PATH);
    if (!match) return seedVideos;
    const res = await fetch(match.url, { cache: "no-store" });
    if (!res.ok) return seedVideos;
    const data = (await res.json()) as Video[];
    if (!Array.isArray(data)) return seedVideos;
    return data;
  } catch {
    return seedVideos;
  }
}

export async function saveVideos(videos: Video[]): Promise<void> {
  await put(DATA_PATH, JSON.stringify(videos, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
