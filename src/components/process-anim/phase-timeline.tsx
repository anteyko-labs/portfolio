"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { EASE, SpotlightCard } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";
import { PHASE_SCENES } from "./phase-scenes";
import "./process-anim.css";
import { type Language, pick } from "@/lib/i18n-text";

// The four phases on a dark stage: a sticky nav with a sliding active pill, a
// timeline that fills with a gradient as you scroll (a glowing dot rides its
// tip), and per phase a glass card with its own live scene and deliverables
// that unfold one by one.

type Step = {
  number: string;
  title: Record<Language, string>;
  duration: Record<Language, string>;
  description: Record<Language, string>;
  deliverables: Record<Language, readonly string[]>;
};

const PH = [
  { rgb: "129 140 248", hex: "#818CF8", grad: "linear-gradient(100deg,#C7D2FE,#818CF8 45%,#C4B5FD)" },
  { rgb: "232 121 249", hex: "#E879F9", grad: "linear-gradient(100deg,#F5D0FE,#E879F9 45%,#FDA4AF)" },
  { rgb: "34 211 238", hex: "#22D3EE", grad: "linear-gradient(100deg,#A5F3FC,#22D3EE 45%,#A5B4FC)" },
  { rgb: "52 211 153", hex: "#34D399", grad: "linear-gradient(100deg,#A7F3D0,#34D399 45%,#FDE68A)" },
];

const stepId = (n: string) => `process-step-${n}`;

/** Index of the last phase card whose top has passed the middle of the viewport */
function useActivePhase(ids: string[]) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      let a = 0;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < mid) a = i;
      });
      setActive(a);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids]);
  return active;
}

const TRACK = "linear-gradient(180deg,#818CF8 0%,#E879F9 33%,#22D3EE 66%,#34D399 100%)";

function DocIcon({ color }: { color: string }) {
  const draw = (delay: number) => ({ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { duration: 0.55, delay, ease: EASE } } });
  return (
    <span className="pr-chip__icon relative grid h-10 w-10 shrink-0 place-items-center rounded-lg border" style={{ borderColor: `rgb(${color} / 0.3)`, background: `rgb(${color} / 0.1)`, color: `rgb(${color})` }}>
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <motion.path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" variants={draw(0.1)} />
        <motion.path d="M14 3v5h5" variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1, transition: { duration: 0.35, delay: 0.5, ease: EASE } } }} style={{ transformOrigin: "19px 3px" }} />
        <motion.path d="M9 13h6" variants={draw(0.6)} />
        <motion.path d="M9 17h4" variants={draw(0.72)} />
      </svg>
      <motion.span
        className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-emerald-400 text-[#06060B] ring-2 ring-[#0E0E16]"
        variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: "spring", stiffness: 400, damping: 15, delay: 0.85 } } }}
      >
        <svg viewBox="0 0 20 20" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4.5 10.5l3.5 3.5 7.5-8" />
        </svg>
      </motion.span>
    </span>
  );
}

function PhaseCard({ step, i, lang, reduced }: { step: Step; i: number; lang: Language; reduced: boolean }) {
  const ph = PH[i];
  const Scene = PHASE_SCENES[i];
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 60, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <SpotlightCard color={ph.rgb} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-4 sm:p-6 md:p-8">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full opacity-40 blur-3xl" style={{ background: `rgb(${ph.rgb} / 0.35)` }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgb(${ph.rgb} / 0.7), transparent)` }} />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
              <span className="pr-num font-brand text-7xl font-semibold leading-none tracking-[-0.04em] md:text-8xl" style={{ backgroundImage: ph.grad }}>
                {step.number}
              </span>
              <span className="mb-2 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-white/70">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                {step.duration[lang]}
              </span>
            </div>
            <h2 className="mt-5 font-brand text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-4xl">{step.title[lang]}</h2>
            <p className="mt-4 text-body-lg text-white/60">{step.description[lang]}</p>
          </div>
          <div className="min-w-0">
            <Scene />
          </div>
        </div>

        <div className="mt-8 border-t border-white/[0.07] pt-6">
          <h3 className="mb-4 font-mono text-caption uppercase tracking-wider text-white/40">{pick({ en: "What you receive after this step", ru: "Что вы получаете после этого этапа", zh: "这一步之后您将收到", tr: "Bu adımdan sonra neler alırsınız", ar: "ما ستتسلّمه بعد هذه الخطوة" }, lang)}</h3>
          <motion.div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, margin: "-40px" }} transition={{ staggerChildren: 0.09 }}>
            {step.deliverables[lang].map((item) => (
              <motion.div key={`${step.number}-${item}`} variants={{ hidden: { opacity: 0, y: 18, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } } }}>
                <SpotlightCard color={ph.rgb} className="pr-chip h-full rounded-xl border border-white/10 bg-white/[0.03]">
                  <article className="flex items-start gap-3 p-4">
                    <DocIcon color={ph.rgb} />
                    <div className="min-w-0">
                      <p className="hyphens-auto break-words text-body-sm font-medium text-white/90">{item}</p>
                      <p className="mt-0.5 truncate font-mono text-caption text-white/35">
                        {pick({ en: "Phase", ru: "Фаза", zh: "阶段", tr: "Aşama", ar: "المرحلة" }, lang)} {step.number}
                      </p>
                    </div>
                  </article>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export function PhaseTimeline({ steps, lang }: { steps: readonly Step[]; lang: Language }) {
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const key = steps.map((s) => s.number).join(",");
  const ids = useMemo(() => key.split(",").map(stepId), [key]);
  const active = useActivePhase(ids);
  // progress of the list's span past the 55% line of the viewport (measured by hand: a
  // window useScroll with a target warns about the static <html> in dev)
  const box = useRef({ top: 0, h: 1, vh: 1 });
  const { scrollY } = useScroll();
  const raw = useTransform(scrollY, (y) => {
    const { top, h, vh } = box.current;
    return Math.min(1, Math.max(0, (y + vh * 0.55 - top) / h));
  });
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      box.current = { top: r.top + window.scrollY, h: Math.max(1, r.height), vh: window.innerHeight };
      scrollY.set(window.scrollY);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [scrollY]);
  const p = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });
  const dotY = useTransform(p, (v) => `${Math.round(v * 1000) / 10}%`);
  const dotColor = useTransform(p, [0, 0.33, 0.66, 1], PH.map((x) => x.hex));
  const pct = useTransform(p, (v) => `${Math.round(v * 100)}%`);
  const clip = useTransform(p, (v) => `inset(0 0 ${Math.round((1 - v) * 1000) / 10}% 0)`);

  return (
    <section className="section-dark relative overflow-clip bg-[#07070C] py-16 md:py-28">
      <div aria-hidden="true" className="pr-aurora pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden="true" className="pr-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[250px_1fr] xl:grid-cols-[280px_1fr] xl:gap-14">
          {/* sticky phase nav */}
          <aside className="sticky top-28 hidden self-start lg:block" aria-label={pick({ en: "Process navigation", ru: "Навигация по процессу", zh: "流程导航", tr: "Süreç gezinmesi", ar: "التنقل بين مراحل العملية" }, lang)}>
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur">
              <div className="flex items-center justify-between px-3 pb-3 pt-1">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">{pick({ en: "Phases", ru: "Фазы", zh: "阶段", tr: "Aşamalar", ar: "المراحل" }, lang)}</span>
                <motion.span className="font-mono text-[11px] tabular-nums text-white/60">{reduced ? "100%" : pct}</motion.span>
              </div>
              <div className="relative">
                <div aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-px bg-white/10">
                  <motion.div className="h-full w-full" style={{ background: TRACK, clipPath: reduced ? undefined : clip }} />
                </div>
                {steps.map((s, i) => {
                  const on = i === active;
                  const past = i < active;
                  return (
                    <a key={s.number} href={`#${stepId(s.number)}`} className="group relative flex items-center gap-3 rounded-xl px-3 py-3">
                      {on && <motion.span layoutId="pr-nav-pill" className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.06]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                      <span
                        className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full border font-mono text-[10px] transition-all duration-500"
                        style={on || past ? { borderColor: PH[i].hex, background: `linear-gradient(rgb(${PH[i].rgb} / 0.2), rgb(${PH[i].rgb} / 0.2)), #0B0B12`, color: "#fff", boxShadow: on ? `0 0 18px rgb(${PH[i].rgb} / 0.6)` : undefined } : { borderColor: "rgba(255,255,255,0.15)", background: "#0B0B12", color: "rgba(255,255,255,0.45)" }}
                      >
                        {s.number}
                      </span>
                      <span className="relative min-w-0">
                        <span className={`block text-body-sm font-medium transition-colors duration-300 ${on ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>{s.title[lang]}</span>
                        <span className="block font-mono text-[10px] text-white/35">{s.duration[lang]}</span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* timeline + cards */}
          <div ref={listRef} className="relative space-y-10 pl-8 sm:pl-12 md:space-y-16 md:pl-16">
            <div aria-hidden="true" className="absolute bottom-0 left-3 top-0 w-px bg-white/10 sm:left-5 md:left-7">
              <motion.div className="h-full w-full" style={{ background: TRACK, clipPath: reduced ? undefined : clip }} />
            </div>
            {!reduced && (
              <motion.div aria-hidden="true" className="pointer-events-none absolute left-3 top-0 h-full w-0 sm:left-5 md:left-7" style={{ y: dotY }}>
                <motion.span className="pr-dot absolute -left-[5px] -top-[5px] block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: dotColor, ["--pr-glow" as string]: dotColor }} />
              </motion.div>
            )}
            {steps.map((s, i) => (
              <div key={s.number} id={stepId(s.number)} className="relative scroll-mt-28">
                <span
                  aria-hidden="true"
                  className="absolute -left-5 top-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full border-2 transition-all duration-500 sm:-left-7 md:-left-9"
                  style={i <= active ? { borderColor: PH[i].hex, background: "#07070C", boxShadow: `0 0 0 4px rgb(${PH[i].rgb} / 0.15), 0 0 16px rgb(${PH[i].rgb} / 0.7)` } : { borderColor: "rgba(255,255,255,0.2)", background: "#07070C" }}
                />
                <PhaseCard step={s} i={i} lang={lang} reduced={reduced} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
