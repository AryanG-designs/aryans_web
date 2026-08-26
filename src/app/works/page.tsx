"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects, categories } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

export default function WorksPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="px-6 pb-28 pt-16 md:px-10 md:pt-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-coral-deep">Full Portfolio</p>
          <h1 className="font-display text-5xl font-semibold tracking-tight md:text-7xl">Works</h1>
          <p className="mt-4 max-w-xl text-ink-soft">
            A collection of academic and personal projects across product,
            graphic, and experimental design — each with its own process
            archived alongside the outcome.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-3">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.12em] transition-colors ${
                active === c
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/20 text-ink-soft hover:border-ink/40 hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} size={p.size} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-14 text-ink-soft">No projects in this category yet.</p>
        )}
      </div>
    </div>
  );
}
