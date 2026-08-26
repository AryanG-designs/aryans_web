"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Plate from "./Plate";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { damping: 20, stiffness: 120 });
  const smy = useSpring(my, { damping: 20, stiffness: 120 });

  const t1x = useTransform(smx, [-1, 1], [-14, 14]);
  const t1y = useTransform(smy, [-1, 1], [-10, 10]);
  const t2x = useTransform(smx, [-1, 1], [10, -10]);
  const t2y = useTransform(smy, [-1, 1], [8, -8]);
  const t3x = useTransform(smx, [-1, 1], [-6, 6]);
  const t3y = useTransform(smy, [-1, 1], [-6, 6]);

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative overflow-hidden px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-ink-soft"
          >
            Illustration · Animation · Visual Storytelling
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-[13vw] font-semibold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.2rem]"
          >
            Aryan
            <br />
            Goswami<span className="text-coral-deep">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-6 max-w-md text-lg text-ink-soft"
          >
            Drawing characters, worlds and motion through curiosity and
            experimentation — a sketchbook, turned digital exhibition.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/works"
              data-cursor="View"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.12em] text-cream transition-transform hover:-translate-y-0.5"
            >
              Explore the work
              <ArrowDownRight size={16} className="transition-transform group-hover:rotate-45" />
            </Link>
            <Link
              href="/about"
              className="underline-grow text-sm uppercase tracking-[0.12em] text-ink-soft hover:text-ink"
            >
              About me
            </Link>
          </motion.div>
        </div>

        <div className="relative h-[420px] md:h-[480px]">
          <motion.div style={{ x: t1x, y: t1y }} className="absolute right-4 top-0 w-[58%] shadow-xl">
            <Plate seed="hero-1" label="Graphic Novel, 2025" ratio="aspect-[3/4]" className="rounded-2xl" />
          </motion.div>
          <motion.div style={{ x: t2x, y: t2y }} className="absolute left-0 bottom-6 w-[46%] shadow-xl">
            <Plate seed="hero-2" label="Sketchbook" ratio="aspect-square" className="rounded-2xl" />
          </motion.div>
          <motion.div
            style={{ x: t3x, y: t3y }}
            className="absolute left-[30%] top-[38%] w-[34%] rounded-2xl bg-coral p-4 shadow-xl"
          >
            <p className="font-display text-sm leading-snug">
              "Drawing is thinking made visible."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
