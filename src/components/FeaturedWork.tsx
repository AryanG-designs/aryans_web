import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function FeaturedWork() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.16em] text-coral-deep">Selected Work</p>
              <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                Featured Projects
              </h2>
            </div>
            <Link href="/works" className="underline-grow inline-flex items-center gap-1 text-sm uppercase tracking-[0.12em]">
              View all works <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          <Reveal className="md:col-span-2">
            <ProjectCard project={featured[0]} size="large" />
          </Reveal>
          {featured.slice(1).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProjectCard project={p} size="medium" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
