import { getProject, getProjects } from "@/lib/store";
import { notFound } from "next/navigation";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import FlipSlideshow from "@/components/FlipSlideshow";

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

  const outcomeSlides = (project.outcome ?? []).map((r) => ({ image: r.image, caption: r.caption }));

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
          <Plate seed={project.slug} src={project.cover} label={project.coverAlt} fit="contain" />
        </div>
      </Reveal>

      {/* Final Outcome */}
      {outcomeSlides.length > 0 && (
        <Section eyebrow="01 — Final Outcome" title="The result" bg="bg-cream-deep/60">
          <FlipSlideshow items={outcomeSlides} />
        </Section>
      )}

      {/* Deliverables */}
      {project.materialsImage && (
        <Section eyebrow="02 — Deliverables" title="Deliverables">
          <Plate seed={`${project.slug}-materials`} src={project.materialsImage} fit="contain" />
        </Section>
      )}

      {/* Reflection */}
      {project.reflection && (
        <Section eyebrow="03 — Reflection" title="What I learned">
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
