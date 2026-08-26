"use client";

import Link from "next/link";
import Plate from "./Plate";
import { Project } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";

const catColor: Record<string, string> = {
  "Graphic Novel": "bg-coral",
  "Character Design": "bg-aqua",
  Texturing: "bg-cream-deep",
  Animation: "bg-coral",
  Illustration: "bg-aqua",
  Experimental: "bg-cream-deep",
};

export default function ProjectCard({
  project,
  size = "medium",
}: {
  project: Project;
  size?: "large" | "medium" | "small";
}) {
  const ratio = size === "large" ? "aspect-[16/11]" : size === "small" ? "aspect-square" : "aspect-[4/5]";

  return (
    <Link
      href={`/works/${project.slug}`}
      data-cursor="Explore"
      className="group block"
    >
      <div className="relative overflow-hidden rounded-2xl">
        <div className="transition-transform duration-700 ease-out group-hover:scale-[1.045]">
          <Plate seed={project.slug} ratio={ratio} />
        </div>
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-ink ${catColor[project.category]}`}
        >
          {project.category}
        </span>
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="m-4 inline-flex items-center gap-1 rounded-full bg-cream px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-ink">
            View project <ArrowUpRight size={13} />
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-coral-deep">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-ink-soft">{project.tagline}</p>
        </div>
        <span className="shrink-0 text-sm text-ink-soft">{project.year}</span>
      </div>
    </Link>
  );
}
