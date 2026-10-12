"use client";

import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICE_GROUPS, type ServiceGroup } from "@/lib/service-slugs";
import { CountUp, EASE, SpotlightCard } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";
import { RevealTitle } from "./shared";
import { type L, type Language, pick } from "@/lib/i18n-text";

type Industry = { name: L; examples: L; icon: string };

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const ICONS: Record<string, ReactNode> = {
  bank: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path {...S} d="M2 20h20M5 20V9l7-5 7 5v11" />
      <path {...S} d="M9 20v-4a2 2 0 012-2h2a2 2 0 012 2v4" className="transition-transform duration-500 group-hover:-translate-y-0.5" />
      <circle cx="12" cy="9.5" r="1.4" fill="currentColor" className="ab-box transition-transform duration-500 group-hover:scale-150" />
    </svg>
  ),
  chain: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <g className="transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:translate-y-0.5">
        <path {...S} d="M10.2 13.8a4 4 0 010-5.6l2-2a4 4 0 015.6 5.6l-1.1 1.1" />
      </g>
      <g className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <path {...S} d="M13.8 10.2a4 4 0 010 5.6l-2 2a4 4 0 01-5.6-5.6l1.1-1.1" />
      </g>
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <g className="transition-transform duration-500 group-hover:translate-x-1">
        <path {...S} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3c-.6.6-.2 1.7.7 1.7H17" />
        <circle cx="9" cy="20" r="1.6" {...S} />
        <circle cx="17" cy="20" r="1.6" {...S} />
      </g>
      <path d="M2 9h2M1.5 12h2.5" {...S} className="opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path {...S} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16M3 21h18" />
      <path {...S} d="M9 7h1M14 7h1M9 11h1M14 11h1" className="transition-opacity duration-300 group-hover:opacity-40" />
      <path {...S} d="M10 21v-4h4v4" />
      <path d="M9 15h1M14 15h1" {...S} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </svg>
  ),
  bag: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path {...S} d="M5 8h14l-1.2 12a1 1 0 01-1 .9H7.2a1 1 0 01-1-.9L5 8z" />
      <path {...S} d="M9 8V6a3 3 0 016 0v2" className="transition-transform duration-500 group-hover:-translate-y-0.5" />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <g className="transition-transform duration-500 group-hover:translate-x-1">
        <path {...S} d="M2 6h11v10H2zM13 10h4l3 3v3h-7" />
        <circle cx="6" cy="18" r="1.8" {...S} />
        <circle cx="17" cy="18" r="1.8" {...S} />
      </g>
    </svg>
  ),
  plane: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path {...S} d="M10.5 13.5L3 11l1.5-1.5 8 .5 4-4a2.1 2.1 0 013 3l-4 4 .5 8L14.5 22 12 14.5l-3 3V20l-1.5 1.5-1-3-3-1L5 16h2.5z" className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path {...S} d="M3 11l9-7 9 7M5 9.5V20h14V9.5" />
      <path {...S} d="M10 20v-5h4v5" className="transition-transform duration-500 group-hover:-translate-y-0.5" />
    </svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path {...S} d="M3 21V10l5 3V10l5 3V10l5 3V4h3v17z" />
      <path {...S} d="M7 17h2M12 17h2" className="transition-opacity duration-300 group-hover:opacity-40" />
    </svg>
  ),
  car: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <g className="transition-transform duration-500 group-hover:translate-x-0.5">
        <path {...S} d="M3 16v-3l2-5h14l2 5v3a1 1 0 01-1 1H4a1 1 0 01-1-1zM3 13h18" />
        <circle cx="7.5" cy="17" r="1.8" {...S} />
        <circle cx="16.5" cy="17" r="1.8" {...S} />
      </g>
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path {...S} d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z" className="origin-bottom-left transition-transform duration-500 group-hover:rotate-[-6deg]" />
      <path {...S} d="M5 19c3-4 6-7 10-9" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path {...S} d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path {...S} d="M8.5 12l2.5 2.5 4.5-5" className="transition-transform duration-500 group-hover:scale-110" style={{ transformOrigin: "12px 12px" }} />
    </svg>
  ),  bolt: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path {...S} d="M13 2L4 14h7l-1 8 9-12h-7z" className="transition-transform duration-500 group-hover:scale-110" style={{ transformOrigin: "12px 12px" }} />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path {...S} d="M6 3h9l4 4v14H6z" />
      <path {...S} d="M9 11h7M9 15h7M9 7h3" className="transition-opacity duration-300 group-hover:opacity-40" />
    </svg>
  ),
  cap: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path {...S} d="M2 9l10-5 10 5-10 5z" className="transition-transform duration-500 group-hover:-translate-y-0.5" />
      <path {...S} d="M6 11v5c3 2 9 2 12 0v-5M22 9v6" />
    </svg>
  ),
};

const COLORS = ["99 102 241", "217 70 239", "245 158 11", "6 182 212", "34 197 94", "236 72 153"];

// Which industries each direction serves (icon ids from translations.about.industries)
const BY_GROUP: Record<ServiceGroup, string[]> = {
  build: ["bank", "chain", "cart", "building", "bag", "truck", "plane", "home", "factory", "car", "leaf", "shield", "bolt", "doc", "cap"],
  brand: ["bag", "cart", "plane", "home", "bank", "car", "cap", "building", "chain", "factory", "bolt", "leaf", "truck"],
  industry: ["bank", "factory", "truck", "bag", "home", "bolt", "leaf", "shield", "doc", "car", "plane", "cart", "building"],
  care: ["bank", "chain", "building", "bag", "cart", "truck", "plane", "home", "car", "bolt", "doc", "cap", "factory", "shield"],
};

/**
 * Industries by direction: a tab per direction, at least a dozen domains in
 * each. Switching tabs reflows the grid — tiles that stay glide to their new
 * place, the rest fade out and in. Icons orbit in their rings.
 */
export function Industries({ title, items, language }: { title: L; items: readonly Industry[]; language: Language }) {
  const reduced = useReducedMotion();
  const [group, setGroup] = useState<ServiceGroup>("build");
  const byIcon = new Map(items.map((it) => [it.icon, it]));
  const shown = BY_GROUP[group].map((icon) => byIcon.get(icon)).filter((x): x is Industry => Boolean(x));
  const colorOf = (icon: string) => COLORS[items.findIndex((it) => it.icon === icon) % COLORS.length];

  return (
    <div>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <RevealTitle eyebrow={pick({ en: "Domains", ru: "Домены", zh: "领域", tr: "Alanlar", ar: "النطاقات" }, language)} title={title[language]} className="max-w-3xl" />
        <dl className="flex gap-10">
          {[
            { v: "70+", l: pick({ en: "projects", ru: "проектов", zh: "个项目", tr: "proje", ar: "مشروعًا" }, language) },
            { v: String(items.length), l: pick({ en: "industries", ru: "отраслей", zh: "个行业", tr: "sektör", ar: "قطاعًا" }, language) },
          ].map((m) => (
            <div key={m.l}>
              <dt className="sr-only">{m.l}</dt>
              <dd>
                <span className="block font-brand text-5xl font-semibold tabular-nums text-text-primary md:text-6xl">
                  <CountUp value={m.v} duration={1.4} />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-tertiary">{m.l}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div role="tablist" aria-label={pick({ en: "Directions", ru: "Направления", zh: "方向", tr: "Yönler", ar: "الاتجاهات" }, language)} className="mt-10 flex flex-wrap gap-2">
        {SERVICE_GROUPS.map((g) => {
          const on = g.id === group;
          return (
            <button
              key={g.id}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => setGroup(g.id)}
              className={`relative rounded-full px-4 py-2 text-body-sm font-medium transition-colors ${on ? "text-white" : "border border-border text-text-secondary hover:text-text-primary"}`}
            >
              {on && (
                <motion.span layoutId="ab-ind-tab" className="absolute inset-0 -z-0 rounded-full bg-text-primary" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <span className="relative">
                {pick(g.label, language)} <span className={on ? "text-white/60" : "text-text-tertiary"}>· {BY_GROUP[g.id].length}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((ind, i) => {
            const c = colorOf(ind.icon);
            return (
              <motion.div
                key={ind.icon}
                layout={!reduced}
                className="h-full"
                initial={reduced ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.45, delay: reduced ? 0 : Math.min(i, 10) * 0.025, ease: EASE }}
              >
                <SpotlightCard color={c} className="group h-full rounded-3xl border border-border bg-bg-primary p-4 text-center transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(79,70,229,0.45)] sm:p-5">
                  <div className="relative mx-auto h-16 w-16">
                    <svg viewBox="0 0 80 80" className="ab-orbit absolute inset-0 h-full w-full" style={{ animationDelay: `${i * -3}s` }} aria-hidden="true">
                      <circle cx="40" cy="40" r="37" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeDasharray="2 5" className="text-text-primary" />
                      <circle cx="40" cy="3" r="3" fill={`rgb(${c})`} />
                    </svg>
                    <span
                      className="absolute inset-[11px] grid place-items-center rounded-2xl border transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110"
                      style={{ color: `rgb(${c})`, background: `rgb(${c} / 0.1)`, borderColor: `rgb(${c} / 0.25)` }}
                    >
                      {ICONS[ind.icon]}
                    </span>
                  </div>
                  <p className="mt-3 text-body-sm font-semibold leading-snug text-text-primary">{ind.name[language]}</p>
                  <p className="mt-1 text-caption leading-snug text-text-tertiary">{ind.examples[language]}</p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
