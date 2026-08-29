"use client";

import Link from "next/link";
import { Clapperboard, ArrowUpRight } from "lucide-react";

export default function VideoNavCard() {
  return (
    <Link href="/videos" data-cursor="Watch" className="group block">
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-ink">
        <div className="flex flex-col items-center gap-3 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
          <Clapperboard size={44} className="text-cream" strokeWidth={1.5} />
          <span className="font-display text-lg font-semibold text-cream">Videos</span>
        </div>
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-coral/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="m-4 inline-flex items-center gap-1 rounded-full bg-cream px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-ink">
            Watch <ArrowUpRight size={13} />
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-coral-deep">
            Videos
          </h3>
          <p className="mt-1 text-sm text-ink-soft">Animation, motion tests, and process reels.</p>
        </div>
      </div>
    </Link>
  );
}
