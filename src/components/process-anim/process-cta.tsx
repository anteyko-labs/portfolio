"use client";

import { motion } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { EASE, useLoop } from "@/components/motion/kit";
import "./process-anim.css";

// Closing CTA on a dark aurora: a rotating halo, the four phases lighting up in
// turn with the links between them filling, and magnetic buttons.

type L = "en" | "ru";
const HEX = ["#818CF8", "#E879F9", "#22D3EE", "#34D399"];

export function ProcessCta({ lang, phases }: { lang: L; phases: { number: string; title: string }[] }) {
  const en = lang === "en";
  const { ref, tick, run, reduced } = useLoop<HTMLDivElement>(800);
  const c = reduced ? 5 : tick % 7; // 0..3 light phases one by one, 4..6 all lit
  const lit = Math.min(phases.length, c + 1);

  return (
    <section className="relative isolate overflow-hidden bg-[#06060B] py-24 text-white md:py-32">
      <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden="true" className="pr-ring pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 opacity-45 md:h-[860px] md:w-[860px]" />

      <div ref={ref} data-run={run} className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        {/* phase chain */}
        <div className="mx-auto mb-10 flex max-w-5xl items-center justify-center" aria-hidden="true">
          {phases.map((ph, i) => {
            const on = i < lit;
            return (
              <div key={ph.number} className="flex shrink-0 items-center">
                {i > 0 && (
                  <span className="relative mx-1.5 h-px w-6 overflow-hidden bg-white/15 sm:mx-2 sm:w-10">
                    <motion.span className="absolute inset-0 origin-left" style={{ background: `linear-gradient(90deg, ${HEX[i - 1]}, ${HEX[i]})` }} initial={false} animate={{ scaleX: on ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} />
                  </span>
                )}
                <motion.span
                  className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 font-mono text-[11px] sm:px-3"
                  initial={false}
                  animate={{ borderColor: on ? HEX[i] : "rgba(255,255,255,0.12)", backgroundColor: on ? `${HEX[i]}22` : "rgba(255,255,255,0.03)", color: on ? "#fff" : "rgba(255,255,255,0.4)", scale: i === lit - 1 && c < 4 ? 1.08 : 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: on ? HEX[i] : "rgba(255,255,255,0.3)", boxShadow: on ? `0 0 10px ${HEX[i]}` : undefined }} />
                  {ph.number}
                  <span className="hidden whitespace-nowrap xl:inline">{ph.title}</span>
                </motion.span>
              </div>
            );
          })}
        </div>

        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto max-w-3xl font-brand text-5xl font-semibold leading-[0.98] tracking-[-0.035em] md:text-7xl"
        >
          {en ? (
            <>
              Ready to <span className="home-gradient-text">start?</span>
            </>
          ) : (
            <>
              Готовы <span className="home-gradient-text">начать?</span>
            </>
          )}
        </motion.h2>
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mx-auto mt-6 max-w-xl text-body-lg text-white/60"
        >
          {en ? "Let's discuss your project and find the best approach for your needs." : "Обсудим ваш проект и найдём оптимальный подход для ваших задач."}
        </motion.p>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <MagneticButton>
            <NextLink href="/contact" className="home-cta-glow inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-4 text-body-lg font-semibold text-[#0A0A0F]">
              {en ? "Get an estimate" : "Получить оценку"} <span aria-hidden="true">→</span>
            </NextLink>
          </MagneticButton>
          <MagneticButton>
            <NextLink href="/cases" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-body-lg font-medium text-white backdrop-blur transition-colors hover:bg-white/10">
              {en ? "View case studies" : "Смотреть кейсы"} <span aria-hidden="true">↗</span>
            </NextLink>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
