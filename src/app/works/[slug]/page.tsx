import { getProject, getProjects } from "@/lib/store";
import { notFound } from "next/navigation";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";

export const dynamic = "force-dynamic";

function Section({
  eyebrow,
  title,
  bg = "",
  children,
}: {
  eyebrow: string;
  title: string;
  bg?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`px-6 py-20 md:px-10 md:py-24 ${bg}`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-coral-deep">{eyebrow}</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/works/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return notFound();

  const others = (await getProjects()).filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="px-6 pb-14 pt-14 md:px-10 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <Link href="/works" className="underline-grow inline-flex items-center gap-1 text-sm text-ink-soft">
            <ArrowLeft size={14} /> Back to works
          </Link>

          <Reveal className="mt-8">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-coral-deep">
              {project.category} · {project.year}
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-soft">{project.tagline}</p>

            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink/10 pt-6 text-sm">
              <div>
                <p className="text-ink-soft">Duration</p>
                <p className="mt-1 font-medium">{project.duration}</p>
              </div>
              <div>
                <p className="text-ink-soft">Role</p>
                <p className="mt-1 font-medium">{project.role}</p>
              </div>
              <div>
                <p className="text-ink-soft">Tools</p>
                <p className="mt-1 font-medium">{project.tools.join(", ")}</p>
              </div>
              <div>
                <p className="text-ink-soft">Tags</p>
                <p className="mt-1 font-medium">{project.tags.join(", ")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal>
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Plate seed={project.slug} src={project.cover} label={project.coverAlt} fit="contain" className="rounded-2xl" />
        </div>
      </Reveal>

      {/* Materials */}
      {project.materials && project.materials.length > 0 && (
        <Section eyebrow="01 — Materials & Making" title="Material study">
          <div className="relative">
            <Plate seed={`${project.slug}-materials`} src={project.materialsImage} ratio="aspect-[16/9]" className="rounded-2xl" />
            {project.materials.map((m, i) => (
              <div
                key={i}
                style={{ left: `${m.x}%`, top: `${m.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <div className="flex items-center gap-2 rounded-full bg-cream/95 px-3 py-1.5 shadow-md">
                  <span className="h-2 w-2 rounded-full bg-coral-deep" />
                  <span className="text-xs font-semibold uppercase tracking-[0.08em]">{m.label}</span>
                </div>
                <p className="mt-1 ml-4 text-[11px] text-ink-soft">{m.detail}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Reflection */}
      {project.reflection && (
        <Section eyebrow="02 — Reflection" title="What I learned">
          <blockquote className="font-display text-2xl leading-snug md:text-3xl">
            "{project.reflection}"
          </blockquote>
        </Section>
      )}

      {/* Next projects */}
      <section className="border-t border-ink/10 px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-display text-3xl font-semibold tracking-tight">More work</h2>
            <Link href="/works" className="underline-grow inline-flex items-center gap-1 text-sm uppercase tracking-[0.12em]">
              All projects <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <ProjectCard key={p.slug} project={p} size="medium" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
