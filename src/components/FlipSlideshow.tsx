"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type SlideItem = { image: string; caption?: string };

export default function FlipSlideshow({ items }: { items: SlideItem[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  if (items.length === 0) return null;

  function go(next: number) {
    setDirection(next > index ? 1 : -1);
    setIndex((next + items.length) % items.length);
  }

  const current = items[index];

  return (
    <div>
      <div
        className="relative w-full overflow-hidden bg-cream-deep/40"
        style={{ perspective: 1600 }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ rotateY: direction > 0 ? 90 : -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: direction > 0 ? -90 : 90, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.image} alt={current.caption ?? `Slide ${index + 1}`} className="block h-auto w-full" />
          </motion.div>
        </AnimatePresence>

        {items.length > 1 && (
          <>
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/90 p-2 shadow-md transition-transform hover:scale-105"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/90 p-2 shadow-md transition-transform hover:scale-105"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {current.caption && <p className="mt-3 text-sm text-ink-soft">{current.caption}</p>}

      {items.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? "bg-ink" : "bg-ink/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
