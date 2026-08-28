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
      <div className="flex items-center gap-3 sm:gap-6">
        <button
          onClick={() => go(index - 1)}
          aria-label="Previous"
          disabled={items.length <= 1}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream shadow-md transition-transform hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 sm:h-12 sm:w-12"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="grid flex-1 place-items-center overflow-hidden bg-cream-deep/40">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
              style={{ gridArea: "1 / 1" }}
              className="flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.image}
                alt={current.caption ?? `Slide ${index + 1}`}
                className="max-h-[65vh] w-auto max-w-full object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => go(index + 1)}
          aria-label="Next"
          disabled={items.length <= 1}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream shadow-md transition-transform hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 sm:h-12 sm:w-12"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {current.caption && (
        <p className="mt-3 text-center text-sm text-ink-soft">{current.caption}</p>
      )}

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
