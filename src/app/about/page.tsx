import Reveal from "@/components/Reveal";
import Plate from "@/components/Plate";
import Link from "next/link";
import { Download } from "lucide-react";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

const skillGroups = [
  {
    title: "Design",
    items: ["Illustration", "Character Design", "Animation", "Graphic Novels", "Storyboarding"],
  },
  {
    title: "Digital Tools",
    items: ["Procreate", "Photoshop", "After Effects", "Toon Boom", "Blender"],
  },
  {
    title: "Making",
    items: ["Texturing", "Hand Inking", "Traditional Media", "Frame-by-Frame Animation"],
  },
  {
    title: "Thinking",
    items: ["Visual Narrative", "Concept Development", "Visual Thinking", "Experimentation"],
  },
];

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <div className="px-6 pb-28 pt-16 md:px-10 md:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <Plate seed="portrait" src={settings.portrait} ratio="aspect-[4/5]" fit="contain-boxed" label="Aryan, studio 2025" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-coral-deep">About</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Hi, I'm Aryan.
            </h1>
            <p className="mt-5 text-lg text-ink-soft leading-relaxed">
              I'm a fourth year design student passionate about animation,
              VFX, and graphic novels. I enjoy combining visual storytelling,
              design, and experimentation to bring ideas and stories to
              life. My work explores characters, worlds, movement, and
              narrative while allowing me to constantly learn, experiment,
              and develop my own creative style.
            </p>
            {settings.cvFile && (
              <a
                href={settings.cvFile}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-cream"
              >
                Download CV <Download size={15} />
              </a>
            )}
          </Reveal>
        </div>

        <div className="mt-28 grid gap-16 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold">Who I am</h2>
            <p className="mt-3 text-ink-soft leading-relaxed">
              I grew up filling the margins of every notebook with characters,
              which turned into a practice built around visual storytelling
              more than certainty. I care about expressive line work, honest
              texture, and the kind of illustration that admits its own
              process.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-semibold">What I design</h2>
            <p className="mt-3 text-ink-soft leading-relaxed">
              Graphic novels, character illustration, texture studies, and
              short frame-by-frame animation, plus the occasional experiment
              with no clear brief at all. I'm drawn to projects that sit
              between drawing and motion.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="font-display text-2xl font-semibold">How I think</h2>
            <p className="mt-3 text-ink-soft leading-relaxed">
              Sketch first, decide later. I try to make the loosest possible
              version of an idea as fast as I can, then let the failures tell
              me what to fix. Feedback and iteration matter more to me than
              getting it right the first time.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <h2 className="font-display text-2xl font-semibold">Where I want to go</h2>
            <p className="mt-3 text-ink-soft leading-relaxed">
              I'm looking for a studio internship where I can keep working
              across illustration and animation — somewhere that values
              process as much as polish, and where I can keep learning by
              making.
            </p>
          </Reveal>
        </div>

        {/* Skills */}
        <div className="mt-28">
          <Reveal>
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-coral-deep">Skills</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              What I work with
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.06}>
                <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink-soft"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Timeline */}
        {settings.timeline.length > 0 && (
          <div className="mt-28">
            <Reveal>
              <p className="mb-2 text-xs uppercase tracking-[0.16em] text-coral-deep">CV</p>
              <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Education &amp; experience
              </h2>
            </Reveal>
            <div className="mt-10 divide-y divide-ink/10 border-t border-ink/10">
              {settings.timeline.map((t, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-display text-lg font-semibold">{t.title}</p>
                      <p className="text-sm text-ink-soft">{t.org}</p>
                    </div>
                    <p className="text-sm text-ink-soft">{t.year}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <Reveal className="mt-28 text-center">
          <p className="font-display text-2xl md:text-3xl">
            Want to know more?{" "}
            <Link href="/contact" className="underline-grow text-coral-deep">
              Let's talk.
            </Link>
          </p>
        </Reveal>
      </div>
    </div>
  );
}
