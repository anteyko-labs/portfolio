"use client";

import { motion } from "framer-motion";
import { EASE, SpotlightCard, Stagger } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";
import { RevealTitle, RunScope } from "./shared";
import { type L, type Language, pick } from "@/lib/i18n-text";

type Item = { title: L; description: L; evidence: L };

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** Clarity: an eye that looks around and blinks */
function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <g className="ab-blink">
        <path {...S} d="M2.5 12C4 7.6 7.7 5 12 5s8 2.6 9.5 7c-1.5 4.4-5.2 7-9.5 7s-8-2.6-9.5-7z" />
        <g className="ab-look">
          <circle cx="12" cy="12" r="3.2" fill="currentColor" opacity="0.25" />
          <circle cx="12" cy="12" r="3.2" {...S} />
          <circle cx="13" cy="11" r="0.9" fill="currentColor" />
        </g>
      </g>
    </svg>
  );
}

/** Predictability: a calendar whose page flips and a marker that steps through the days */
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2.5" {...S} />
      <path {...S} d="M8 3v4M16 3v4" />
      <rect x="3" y="5" width="18" height="5" rx="2" fill="currentColor" opacity="0.3" className="ab-flip" />
      <g className="ab-dayfill">
        <rect x="6.5" y="12.5" width="3" height="3" rx="0.8" fill="currentColor" />
      </g>
      <path d="M11 14h1M15 14h1M7 18h1M11 18h1M15 18h1" {...S} opacity="0.45" />
    </svg>
  );
}

/** Speed: a flickering bolt throwing sparks */
function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 overflow-visible" aria-hidden="true">
      <path d="M13 2.5L4.5 13.5H11l-1 8 8.5-11H12z" {...S} fill="currentColor" fillOpacity="0.2" className="ab-flicker" />
      <path d="M19.5 4.5l1.8-1.5M20.5 8h2.2M3.5 4.5L2 3" {...S} className="ab-spark" />
    </svg>
  );
}

/** Ownership: a shield sending out a ripple while its check draws in */
function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 overflow-visible" aria-hidden="true">
      <path d="M12 2.8l7.5 3v5.6c0 4.6-3.2 8.3-7.5 9.8-4.3-1.5-7.5-5.2-7.5-9.8V5.8z" {...S} className="ab-ripple" opacity="0.6" />
      <path d="M12 2.8l7.5 3v5.6c0 4.6-3.2 8.3-7.5 9.8-4.3-1.5-7.5-5.2-7.5-9.8V5.8z" {...S} fill="currentColor" fillOpacity="0.18" />
      <path d="M8.5 12.2l2.4 2.4 4.6-4.8" {...S} strokeWidth={2} className="ab-tick" />
    </svg>
  );
}

const ICONS = [EyeIcon, CalendarIcon, BoltIcon, ShieldIcon];
const TINTS = [
  { rgb: "129 140 248", text: "text-indigo-300", ring: "from-indigo-500/40 to-indigo-500/0" },
  { rgb: "232 121 249", text: "text-fuchsia-300", ring: "from-fuchsia-500/40 to-fuchsia-500/0" },
  { rgb: "251 191 36", text: "text-amber-300", ring: "from-amber-400/40 to-amber-400/0" },
  { rgb: "52 211 153", text: "text-emerald-300", ring: "from-emerald-400/40 to-emerald-400/0" },
];

/** "Result: …" — the label becomes a chip and the claim gets an underline that draws in */
function Evidence({ text, delay }: { text: string; delay: number }) {
  const reduced = useReducedMotion();
  const cut = text.indexOf(":");
  const label = cut > 0 && cut < 14 ? text.slice(0, cut) : null;
  const body = label ? text.slice(cut + 1).trim() : text;
  return (
    <div className="mt-6 border-t border-white/10 pt-5">
      {label && <span className="mb-2 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300">{label}</span>}
      <p className="relative text-body-sm text-white/85">
        <span>{body}</span>
        <motion.span
          aria-hidden="true"
          className="mt-2 block h-[2px] origin-left rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-transparent"
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 + delay, ease: EASE }}
        />
      </p>
    </div>
  );
}

/** "How we think": four principles on glass cards in a dark aurora section */
export function Principles({ title, items, language }: { title: L; items: readonly Item[]; language: Language }) {
  return (
    <RunScope className="relative isolate overflow-hidden bg-[#06060B] py-20 text-white md:py-28">
      <div aria-hidden="true" className="home-aurora home-aurora--violet pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "28px 28px" }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <RevealTitle dark eyebrow={pick({ en: "Principles", ru: "Принципы", zh: "原则", tr: "İlkeler", ar: "المبادئ" }, language)} title={title[language]} className="max-w-3xl" />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2" gap={0.1}>
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const tint = TINTS[i % TINTS.length];
            return (
              <SpotlightCard key={item.title.en} color={tint.rgb} className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-white/[0.05] md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className={`relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br ${tint.ring} ${tint.text} transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110`}>
                    <Icon />
                  </span>
                  <span className="font-brand text-4xl font-semibold leading-none text-white/[0.08] transition-colors duration-500 group-hover:text-white/20">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 font-brand text-xl font-semibold tracking-tight md:text-2xl">{item.title[language]}</h3>
                <p className="mt-3 text-body-md leading-relaxed text-white/60">{item.description[language]}</p>
                <Evidence text={item.evidence[language]} delay={i * 0.12} />
              </SpotlightCard>
            );
          })}
        </Stagger>
      </div>
    </RunScope>
  );
}
