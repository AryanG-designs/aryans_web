import { getVideos } from "@/lib/videoStore";
import VideoGrid from "@/components/VideoGrid";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <div className="px-6 pb-28 pt-16 md:px-10 md:pt-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-coral-deep">Motion</p>
          <h1 className="font-display text-5xl font-semibold tracking-tight md:text-7xl">Videos</h1>
          <p className="mt-4 max-w-xl text-ink-soft">
            Animation, motion tests, and process reels.
          </p>
        </Reveal>

        <div className="mt-14">
          {videos.length > 0 ? (
            <VideoGrid videos={videos} />
          ) : (
            <p className="text-ink-soft">No videos yet — check back soon.</p>
          )}
        </div>
      </div>
    </div>
  );
}
