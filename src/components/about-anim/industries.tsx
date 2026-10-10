"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { CountUp, EASE, SpotlightCard, Stagger } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";
import { RevealTitle } from "./shared";
import { type L, type Language, pick } from "@/lib/i18n-text";

type Industry = { name: L; count: string; icon: string };

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
};

const COLORS = ["99 102 241", "217 70 239", "245 158 11", "6 182 212"];
const DOT = ["bg-indigo-500", "bg-fuchsia-500", "bg-amber-500", "bg-cyan-500"];

/** Industry tiles: icon in an orbiting ring, project count counting up, one lit dot per project */
export function Industries({ title, items, language }: { title: L; items: readonly Industry[]; language: Language }) {
  const reduced = useReducedMotion();
  return (
    <div>
      <RevealTitle eyebrow={pick({ en: "Domains", ru: "Домены", zh: "领域", tr: "Alanlar", ar: "النطاقات" }, language)} title={title[language]} className="max-w-4xl" />
      <Stagger className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4" gap={0.08}>
        {items.map((ind, i) => (
          <SpotlightCard key={ind.icon} color={COLORS[i % 4]} className="h-full rounded-3xl border border-border bg-bg-primary p-4 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(79,70,229,0.45)] sm:p-6">
            <div className="relative mx-auto h-20 w-20">
              <svg viewBox="0 0 80 80" className="ab-orbit absolute inset-0 h-full w-full" style={{ animationDelay: `${i * -3}s` }} aria-hidden="true">
                <circle cx="40" cy="40" r="37" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeDasharray="2 5" className="text-text-primary" />
                <circle cx="40" cy="3" r="3" fill={`rgb(${COLORS[i % 4]})`} />
              </svg>
              <svg viewBox="0 0 80 80" className="ab-orbit ab-orbit--rev absolute inset-0 h-full w-full" aria-hidden="true">
                <circle cx="40" cy="74" r="1.8" fill={`rgb(${COLORS[i % 4]})`} opacity="0.6" />
              </svg>
              <span
                className="absolute inset-[14px] grid place-items-center rounded-2xl border transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110"
                style={{ color: `rgb(${COLORS[i % 4]})`, background: `rgb(${COLORS[i % 4]} / 0.1)`, borderColor: `rgb(${COLORS[i % 4]} / 0.25)` }}
              >
                {ICONS[ind.icon]}
              </span>
            </div>
            <p className="mt-4 font-brand text-4xl font-semibold tabular-nums text-text-primary">
              <CountUp value={ind.count} duration={1.2} />
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-tertiary">{pick({ en: "projects", ru: "проектов", zh: "个项目", tr: "proje", ar: "مشروع" }, language)}</p>
            <div className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
              {Array.from({ length: Number(ind.count) || 0 }, (_, k) => (
                <motion.span
                  key={k}
                  className={`h-1.5 w-5 rounded-full ${DOT[i % 4]}`}
                  initial={reduced ? false : { scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + k * 0.15 + i * 0.05, ease: EASE }}
                />
              ))}
            </div>
            <p className="mt-4 text-body-sm font-medium leading-snug text-text-primary">{ind.name[language]}</p>
          </SpotlightCard>
        ))}
      </Stagger>
    </div>
  );
}
