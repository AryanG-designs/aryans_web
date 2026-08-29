"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type SlideItem = { image: string; caption?: string };

export default function FlipSlideshow({ items }: { items: SlideItem[] }) {
  const [index, setIndex] = useState(0);

  if (items.length === 0) return null;

  function go(next: number) {
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

        <div
          style={{
            flex: "1 1 0%",
            height: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: "rgba(255, 237, 209, 0.4)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.image}
            alt={current.caption ?? `Slide ${index + 1}`}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              display: "block",
              transition: "opacity 0.3s ease",
            }}
          />
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
