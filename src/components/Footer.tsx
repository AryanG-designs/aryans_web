import Link from "next/link";
import { InstagramIcon, LinkedinIcon, BehanceIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream-deep/60">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold">Aryan Goswami</p>
            <p className="mt-1 text-sm text-ink-soft">Illustrator · Animator · Storyteller</p>
          </div>

          <nav className="flex gap-6 text-sm uppercase tracking-[0.14em] text-ink-soft">
            <Link className="underline-grow hover:text-ink" href="/works">Works</Link>
            <Link className="underline-grow hover:text-ink" href="/about">About</Link>
            <Link className="underline-grow hover:text-ink" href="/contact">Contact</Link>
          </nav>

          <div className="flex items-start gap-4">
            <a aria-label="Instagram" href="#" className="rounded-full border border-ink/15 p-2.5 transition-colors hover:bg-coral">
              <InstagramIcon size={16} />
            </a>
            <a aria-label="LinkedIn" href="#" className="rounded-full border border-ink/15 p-2.5 transition-colors hover:bg-coral">
              <LinkedinIcon size={16} />
            </a>
            <a aria-label="Behance" href="#" className="rounded-full border border-ink/15 p-2.5 transition-colors hover:bg-coral">
              <BehanceIcon size={16} />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-ink/10 pt-6 text-xs text-ink-soft md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Aryan Goswami. All rights reserved.</p>
          <a href="mailto:hello@aryangoswami.design" className="underline-grow">hello@aryangoswami.design</a>
        </div>
      </div>
    </footer>
  );
}
