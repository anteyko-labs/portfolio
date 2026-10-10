"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { EASE } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";
import { RunScope, ScrollWords } from "./shared";

type L = { en: string; ru: string };

const HIGHLIGHTS: Record<"why" | "how" | "who", L[]> = {
  why: [{ en: "engineers own the result", ru: "инженеры отвечают за результат" }],
  how: [
    { en: "7-phase release checklist", ru: "7‑фазный чеклист релиза" },
    { en: "zero post-launch critical failures", ru: "нулём критических сбоев после запуска" },
  ],
  who: [{ en: "first product built right", ru: "первый продукт, построенный правильно" }],
};

/** The three story blocks on a spine that fills as you read; words brighten as they scroll past */
export function Story({ story, language }: { story: Record<"why" | "how" | "who", L>; language: "en" | "ru" }) {
  const en = language === "en";
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const blocks = [
    { key: "why" as const, label: en ? "Why we exist" : "Зачем мы существуем" },
    { key: "how" as const, label: en ? "How we work" : "Как мы работаем" },
    { key: "who" as const, label: en ? "Who we work with" : "С кем мы работаем" },
  ];

  return (
    <RunScope className="relative overflow-hidden bg-bg-primary py-20 md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[820px] max-w-full -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-500/[0.07] to-transparent blur-3xl" />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="relative mx-auto max-w-4xl">
          {/* spine */}
          <div aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-[2px] rounded-full bg-border md:left-[27px]">
            <motion.div className="h-full w-full origin-top rounded-full bg-gradient-to-b from-indigo-500 via-fuchsia-500 to-amber-400" style={reduced ? undefined : { scaleY: fill }} />
          </div>

          <ol className="space-y-10 md:space-y-14">
            {blocks.map((b, i) => (
              <li key={b.key} className="relative grid grid-cols-[40px_1fr] gap-4 md:grid-cols-[56px_1fr] md:gap-8">
                <motion.span
                  initial={reduced ? false : { scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-35% 0px -35% 0px" }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="relative z-10 mt-1 grid h-10 w-10 place-items-center rounded-full border border-indigo-500/30 bg-bg-primary font-mono text-caption font-semibold text-text-primary shadow-[0_0_0_6px_var(--color-bg-primary),0_10px_30px_-10px_rgba(99,102,241,0.6)] md:h-14 md:w-14 md:text-body-sm"
                >
                  <span className="bg-gradient-to-br from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">{String(i + 1).padStart(2, "0")}</span>
                </motion.span>
                <motion.div
                  initial={reduced ? false : { opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-bg-secondary p-6 transition-colors duration-500 hover:border-indigo-500/30 md:p-8"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <p className="mb-4 font-mono text-caption font-medium uppercase tracking-[0.18em] text-accent-primary">{b.label}</p>
                  <ScrollWords
                    text={story[b.key][language]}
                    highlights={HIGHLIGHTS[b.key].map((h) => h[language])}
                    className="text-body-lg leading-relaxed text-text-primary md:text-[1.2rem]"
                  />
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </RunScope>
  );
}
