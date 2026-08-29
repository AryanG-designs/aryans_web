"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { Video } from "@/lib/videos";
import { getEmbedUrl } from "@/lib/videoEmbed";
import Plate from "@/components/Plate";

export default function VideoGrid({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState<Video | null>(null);
  const embedUrl = active ? getEmbedUrl(active.videoUrl) : null;

  return (
    <>
      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <button key={v.slug} onClick={() => setActive(v)} data-cursor="Play" className="group block text-left">
            <div className="relative overflow-hidden">
              <div className="transition-transform duration-700 ease-out group-hover:scale-[1.045]">
                <Plate seed={v.slug} src={v.thumbnail} ratio="aspect-video" fit="contain-boxed" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-ink/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/95">
                  <Play size={20} className="ml-0.5 fill-ink text-ink" />
                </span>
              </div>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold leading-snug transition-colors group-hover:text-coral-deep">
              {v.title}
            </h3>
            {v.description && <p className="mt-1 text-sm text-ink-soft">{v.description}</p>}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-lg text-cream">{active.title}</h3>
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="rounded-full bg-cream/10 p-2 text-cream hover:bg-cream/20"
                >
                  <X size={18} />
                </button>
              </div>

              {embedUrl ? (
                <div className="aspect-video w-full overflow-hidden bg-black">
                  <iframe
                    src={embedUrl}
                    title={active.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 bg-cream p-8 text-center">
                  <p>This video can't be embedded here.</p>
                  <a
                    href={active.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-ink px-5 py-2.5 text-sm uppercase tracking-[0.1em] text-cream"
                  >
                    Watch on original site
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
