"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const sy = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFine);
    if (!isFine) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      setLabel(el?.dataset.cursor === "text" ? null : el?.dataset.cursor ?? null);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ left: sx, top: sy }}
      className="pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-normal"
    >
      <motion.div
        animate={{
          width: label ? 84 : 10,
          height: label ? 84 : 10,
          backgroundColor: label ? "#2b2622" : "#f6a390",
        }}
        transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
        className="flex items-center justify-center rounded-full"
      >
        {label && (
          <span className="text-center text-[10px] font-medium uppercase tracking-[0.1em] text-cream">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
