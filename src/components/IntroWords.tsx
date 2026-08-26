"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const words = ["Designer", "Researcher", "Maker", "Experimenter", "Storyteller"];

export default function IntroWords() {
  return (
    <section className="border-y border-ink/10 bg-cream-deep/50 px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-wrap gap-x-6 gap-y-3">
          {words.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0.25, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="font-display text-4xl font-semibold tracking-tight text-ink/90 sm:text-5xl md:text-6xl"
            >
              {w}
              {i < words.length - 1 && <span className="text-coral-deep">,</span>}
            </motion.span>
          ))}
        </div>

        <Reveal>
          <div className="grid gap-10 md:grid-cols-2">
            <p className="font-display text-2xl leading-snug md:text-3xl">
              I'm a third-year design student working across product,
              graphic, and experimental design.
            </p>
            <p className="text-ink-soft leading-relaxed">
              My process usually starts with a material, a constraint, or a
              question I can't quite answer — and I design my way toward an
              answer. I'm interested in how things are made as much as what
              they become: the failed prototypes, the material tests, the
              sketchbook pages nobody sees. This site is an attempt to show
              that thinking alongside the finished work.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
