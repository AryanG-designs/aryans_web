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
          <Plate seed={project.slug} src={project.cover} label={project.coverAlt} ratio="aspect-[16/9]" className="rounded-2xl" />
        </div>
      </Reveal>

      {/* Brief */}
      <Section eyebrow="01 — The Brief" title="Problem & objectives">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-ink-soft leading-relaxed">{project.brief.problem}</p>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.14em] text-ink-soft">Audience</p>
              <p className="mt-1">{project.brief.audience}</p>
            </div>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-[0.14em] text-ink-soft">Constraints</p>
              <p className="mt-1">{project.brief.constraints}</p>
            </div>
          </div>
          <ul className="space-y-3">
            {project.brief.objectives.map((o, i) => (
              <li key={i} className="flex gap-3 rounded-xl bg-cream-deep/60 p-4">
                <span className="font-display text-coral-deep">{String(i + 1).padStart(2, "0")}</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Research */}
      <Section eyebrow="02 — Research" title="Research & references" bg="bg-aqua/30">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {project.research.map((r, i) => (
            <div key={i}>
              <Plate seed={`${project.slug}-research-${i}`} src={r.image} ratio="aspect-[4/5]" className="rounded-xl" />
              <p className="mt-3 text-sm text-ink-soft">{r.caption}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Exploration */}
      <Section eyebrow="03 — Exploration" title="Ideation & sketching">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {project.exploration.map((r, i) => (
            <div key={i} className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}>
              <Plate
                seed={`${project.slug}-explore-${i}`}
                src={r.image}
                ratio={i === 0 ? "aspect-[16/9]" : "aspect-square"}
                className="rounded-xl"
              />
              <p className="mt-3 text-sm text-ink-soft">{r.caption}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section eyebrow="04 — Process" title="Development & iteration" bg="bg-coral/20">
        <div className="space-y-6">
          {project.process.map((r, i) => (
            <div key={i} className="grid items-center gap-6 md:grid-cols-[1fr_1.2fr]">
              <Plate seed={`${project.slug}-process-${i}`} src={r.image} ratio="aspect-[4/3]" className="rounded-xl" />
              <p className="text-ink-soft leading-relaxed">{r.caption}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Materials */}
      {project.materials && project.materials.length > 0 && (
        <Section eyebrow="05 — Materials & Making" title="Material study">
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

      {/* Outcome */}
      <Section eyebrow="06 — Final Outcome" title="The result" bg="bg-cream-deep/60">
        <div className="space-y-8">
          {project.outcome.map((r, i) => (
            <div key={i}>
              <Plate
                seed={`${project.slug}-final-${i}`}
                src={r.image}
                ratio={i === 0 ? "aspect-[16/9]" : "aspect-[16/10]"}
                className="rounded-2xl"
              />
              <p className="mt-3 text-sm text-ink-soft">{r.caption}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Reflection */}
      <Section eyebrow="07 — Reflection" title="What I learned">
        <blockquote className="font-display text-2xl leading-snug md:text-3xl">
          "{project.reflection}"
        </blockquote>
      </Section>

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
