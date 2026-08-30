import Hero from "@/components/Hero";
import IntroWords from "@/components/IntroWords";
import FeaturedWork from "@/components/FeaturedWork";
import Reveal from "@/components/Reveal";
import Plate from "@/components/Plate";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProjects } from "@/lib/store";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await getProjects();
  const settings = await getSettings();
  const heroProjects = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));
  const hasSketchbookImages = settings.sketchbookImages.some((s) => s.image);

  return (
    <>
      <Hero projects={heroProjects} heroImages={settings.heroImages} />
      <IntroWords />
      <FeaturedWork projects={projects} />

      {hasSketchbookImages && (
        <section className="bg-aqua/40 px-6 py-24 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="mb-2 text-xs uppercase tracking-[0.16em] text-ink-soft">Sketchbook</p>
              <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                Not just what I made —
                <br />
                how I got there.
              </h2>
              <p className="mt-5 max-w-md text-ink-soft leading-relaxed">
                Every project on this site carries its process: the research,
                the failed prototypes, the material tests. Explore any case
                study to see the thinking behind the outcome.
              </p>
              <Link
                href="/works"
                className="mt-7 inline-flex items-center gap-1 rounded-full border border-ink/20 px-5 py-2.5 text-sm uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-cream"
              >
                See the process <ArrowUpRight size={14} />
              </Link>
            </Reveal>

            <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
              {settings.sketchbookImages.map((s, i) => (
                <Plate
                  key={i}
                  seed={`teaser-${i + 1}`}
                  src={s.image}
                  label={s.label}
                  fit="contain-boxed"
                  className={i === 0 || i === 3 ? "translate-y-6" : ""}
                />
              ))}
            </Reveal>
          </div>
        </section>
      )}

      <section className="px-6 py-24 text-center md:px-10 md:py-32">
        <Reveal>
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-coral-deep">Let's talk</p>
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Let's create something.
          </h2>
          <Link
            href="/contact"
            data-cursor="Say hi"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm uppercase tracking-[0.12em] text-cream transition-transform hover:-translate-y-0.5"
          >
            Get in touch <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
