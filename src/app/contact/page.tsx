"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { Mail, ArrowUpRight } from "lucide-react";
import { InstagramIcon, LinkedinIcon, BehanceIcon } from "@/components/SocialIcons";

const socials = [
  { name: "Instagram", icon: InstagramIcon, href: "#" },
  { name: "LinkedIn", icon: LinkedinIcon, href: "#" },
  { name: "Behance", icon: BehanceIcon, href: "#" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="bg-aqua/25 px-6 pb-28 pt-16 md:px-10 md:pt-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-coral-deep">Contact</p>
          <h1 className="font-display text-5xl font-semibold tracking-tight md:text-7xl">
            Let's create
            <br />
            something.
          </h1>
          <p className="mt-5 max-w-lg text-ink-soft">
            Open to internships, collaborations, and freelance projects.
            The fastest way to reach me is email — I read everything.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal delay={0.1}>
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-ink-soft">Email</p>
                <a href="mailto:hello@aryangoswami.design" className="underline-grow mt-1 inline-flex items-center gap-2 font-display text-xl">
                  <Mail size={16} /> hello@aryangoswami.design
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-ink-soft">Based in</p>
                <p className="mt-1 font-display text-xl">Portland, OR</p>
              </div>
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.14em] text-ink-soft">Elsewhere</p>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      aria-label={s.name}
                      className="rounded-full border border-ink/15 p-3 transition-colors hover:bg-coral"
                    >
                      <s.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {sent ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl bg-cream p-10 text-center">
                <p className="font-display text-2xl">Thank you — message sent.</p>
                <p className="mt-2 text-ink-soft">I'll get back to you within a few days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-cream p-8 shadow-sm">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-[0.12em] text-ink-soft">Name</label>
                    <input
                      required
                      type="text"
                      className="mt-2 w-full rounded-lg border border-ink/15 bg-transparent px-4 py-3 outline-none transition-colors focus:border-coral-deep"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.12em] text-ink-soft">Email</label>
                    <input
                      required
                      type="email"
                      className="mt-2 w-full rounded-lg border border-ink/15 bg-transparent px-4 py-3 outline-none transition-colors focus:border-coral-deep"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.12em] text-ink-soft">Subject</label>
                  <input
                    required
                    type="text"
                    className="mt-2 w-full rounded-lg border border-ink/15 bg-transparent px-4 py-3 outline-none transition-colors focus:border-coral-deep"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.12em] text-ink-soft">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="mt-2 w-full rounded-lg border border-ink/15 bg-transparent px-4 py-3 outline-none transition-colors focus:border-coral-deep"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.12em] text-cream transition-transform hover:-translate-y-0.5"
                >
                  Send message
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
