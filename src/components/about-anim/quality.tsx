"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE, SpotlightCard, Stagger, useLoop } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";
import { RevealTitle } from "./shared";

type L = { en: string; ru: string };
type Item = { title: L; description: L };

function Screen({ children, label, status }: { children: ReactNode; label: string; status?: ReactNode }) {
  return (
    <div className="relative h-36 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B14] p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/20 blur-2xl" />
      <div className="relative mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="ml-1.5">{label}</span>
        </span>
        {status}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/** Tests: suites whose pass counters tick up, next to a coverage ring */
function TestsWidget({ en }: { en: boolean }) {
  const { ref, tick } = useLoop<HTMLDivElement>(900);
  const suites = [
    { n: en ? "unit" : "юнит", base: 412, step: 3 },
    { n: en ? "integration" : "интеграция", base: 128, step: 1 },
    { n: en ? "contract" : "контракты", base: 36, step: 1 },
  ];
  const reduced = useReducedMotion();
  return (
    <div ref={ref}>
      <Screen label="ci · tests" status={<span className="text-emerald-300">● {en ? "passing" : "зелёные"}</span>}>
        <div className="flex items-center justify-between gap-3">
          <ul className="min-w-0 space-y-1.5 font-mono text-[12px]">
            {suites.map((s, i) => (
              <li key={s.n} className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span className="w-24 truncate text-white/60">{s.n}</span>
                <span className="tabular-nums text-white">{s.base + ((tick + i) % 7) * s.step}</span>
              </li>
            ))}
          </ul>
          <div className="relative h-20 w-20 shrink-0">
            <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3.5" />
              <motion.circle
                cx="20" cy="20" r="16" fill="none" stroke="url(#ab-q-g)" strokeWidth="3.5" strokeLinecap="round"
                initial={reduced ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 0.85 }}
                style={reduced ? { pathLength: 0.85 } : undefined}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: EASE }}
              />
              <defs>
                <linearGradient id="ab-q-g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center leading-none">
              <span className="font-brand text-[15px] font-semibold">85%</span>
            </div>
          </div>
        </div>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">{en ? "coverage ≥ 85%" : "покрытие ≥ 85%"}</p>
      </Screen>
    </div>
  );
}

/** Release gates: seven checks light up in turn, then the deploy unlocks */
function GatesWidget({ en }: { en: boolean }) {
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(650);
  const names = en
    ? ["build", "unit", "integration", "contracts", "env parity", "smoke", "security"]
    : ["сборка", "юнит", "интеграция", "контракты", "паритет", "smoke", "безопасность"];
  const cycle = 10;
  const step = reduced ? 7 : tick % cycle; // 0..6 checking, 7..9 deployed
  const done = step >= 7;
  return (
    <div ref={ref}>
      <Screen
        label="release · gates"
        status={<span className={`transition-colors ${done ? "text-emerald-300" : "text-amber-300"}`}>● {done ? (en ? "deploy" : "деплой") : `${step + 1}/7`}</span>}
      >
        <div className="relative mt-3 flex items-center justify-between">
          <div aria-hidden="true" className="absolute inset-x-3 top-1/2 h-[2px] -translate-y-1/2 bg-white/10" />
          <div aria-hidden="true" className="absolute left-3 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-emerald-400 to-cyan-400 transition-[width] duration-500" style={{ width: `calc((100% - 1.5rem) * ${Math.min(step, 6) / 6})` }} />
          {names.map((n, i) => {
            const passed = i < step || done;
            const current = i === step && !done;
            return (
              <span
                key={n}
                className={`relative z-10 grid h-6 w-6 place-items-center rounded-full border text-[10px] font-bold transition-all duration-300 ${
                  passed ? "border-emerald-400 bg-emerald-400 text-[#0B0B14]" : current ? "scale-110 border-amber-300 bg-[#0B0B14] text-amber-300 shadow-[0_0_14px_2px_rgba(252,211,77,0.45)]" : "border-white/20 bg-[#0B0B14] text-white/40"
                }`}
              >
                {passed ? "✓" : i + 1}
              </span>
            );
          })}
        </div>
        <div className="mt-5 flex items-center justify-between font-mono text-[12px]">
          <span className="text-white/50">{done ? (en ? "all 7 gates green" : "все 7 стадий зелёные") : names[step]}</span>
          <span className={`rounded-md px-2 py-0.5 transition-colors duration-300 ${done ? "bg-emerald-400/15 text-emerald-300" : "bg-white/5 text-white/30"}`}>{done ? "→ prod" : "prod"}</span>
        </div>
      </Screen>
    </div>
  );
}

/** Handover docs: a stack of documents that shuffles, the front one always readable */
function DocsWidget({ en }: { en: boolean }) {
  const { ref, tick } = useLoop<HTMLDivElement>(1800);
  const docs = [
    { t: "ADR-014", s: en ? "Why a modular monolith" : "Почему модульный монолит", c: "#818CF8" },
    { t: "Runbook", s: en ? "Restore from backup" : "Восстановление из бэкапа", c: "#F0ABFC" },
    { t: en ? "Video" : "Видео", s: en ? "Codebase walkthrough · 18 min" : "Разбор кодовой базы · 18 мин", c: "#FDE68A" },
    { t: en ? "Onboarding" : "Онбординг", s: en ? "Day 1: run it locally" : "День 1: запуск локально", c: "#67E8F9" },
  ];
  return (
    <div ref={ref}>
      <Screen label="handover · docs" status={<span className="text-white/45">{(tick % 4) + 1}/4</span>}>
        <div className="relative h-[76px]">
          {docs.map((d, i) => {
            const pos = (i - (tick % 4) + 4) % 4; // 0 = front
            return (
              <motion.div
                key={d.t}
                className="absolute inset-x-0 top-0 rounded-xl border border-white/10 bg-[#141424] p-3"
                animate={{ y: pos * 7, scale: 1 - pos * 0.05, opacity: pos === 3 ? 0 : 1 - pos * 0.25 }}
                transition={{ duration: 0.6, ease: EASE }}
                style={{ zIndex: 4 - pos }}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-sm" style={{ background: d.c }} />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-white">{d.t}</span>
                </div>
                <p className="mt-1 truncate text-[12px] text-white/60">{d.s}</p>
                <div className="mt-2 flex gap-1.5">
                  <span className="h-1 w-1/2 rounded-full bg-white/10" />
                  <span className="h-1 w-1/4 rounded-full bg-white/10" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </Screen>
    </div>
  );
}

// A deterministic latency-like series; drawn twice so the scroll loops seamlessly
const SPARK = (() => {
  const pts: string[] = [];
  const n = 24;
  for (let k = 0; k <= n * 2; k++) {
    const i = k % n;
    const v = 26 + Math.sin(i * 0.9) * 6 + Math.sin(i * 2.3) * 3 + (i === 9 ? -9 : 0);
    pts.push(`${k * 10},${Math.round(v * 100) / 100}`);
  }
  return pts.join(" ");
})();

/** Monitoring: a live latency sparkline under the alert threshold */
function MonitorWidget({ en }: { en: boolean }) {
  return (
    <Screen label="prod · metrics" status={<span className="text-emerald-300">● {en ? "healthy" : "в норме"}</span>}>
      <div className="relative h-14 overflow-hidden">
        <svg viewBox="0 0 240 48" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <line x1="0" y1="10" x2="240" y2="10" stroke="rgba(251,113,133,0.5)" strokeDasharray="3 4" />
        </svg>
        <div className="ab-spark-scroll absolute inset-y-0 left-0 w-[200%]">
          <svg viewBox="0 0 480 48" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="ab-spark-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(52,211,153,0.35)" />
                <stop offset="100%" stopColor="rgba(52,211,153,0)" />
              </linearGradient>
            </defs>
            <polygon points={`0,48 ${SPARK} 480,48`} fill="url(#ab-spark-fill)" />
            <polyline points={SPARK} fill="none" stroke="#34D399" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-white/50">
        <span>{en ? "error budget" : "бюджет ошибок"} <span className="text-emerald-300">✓</span></span>
        <span>{en ? "alerts" : "алерты"}: <span className="text-white">0</span></span>
        <span className="text-rose-300/70">{en ? "threshold" : "порог"}</span>
      </div>
    </Screen>
  );
}

const WIDGETS = [TestsWidget, GatesWidget, DocsWidget, MonitorWidget];

/** "How we guarantee quality": each guarantee shown as a small live console */
export function Quality({ title, items, language }: { title: L; items: readonly Item[]; language: "en" | "ru" }) {
  const en = language === "en";
  return (
    <div>
      <RevealTitle eyebrow={en ? "Quality" : "Качество"} title={title[language]} className="max-w-4xl" />
      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2" gap={0.1}>
        {items.map((item, i) => {
          const W = WIDGETS[i % WIDGETS.length];
          return (
            <SpotlightCard key={item.title.en} className="h-full rounded-3xl border border-border bg-bg-primary p-3 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(79,70,229,0.45)]">
              <W en={en} />
              <div className="px-3 pb-3 pt-5">
                <h3 className="font-brand text-lg font-semibold tracking-tight text-text-primary">{item.title[language]}</h3>
                <p className="mt-2 text-body-sm leading-relaxed text-text-secondary">{item.description[language]}</p>
              </div>
            </SpotlightCard>
          );
        })}
      </Stagger>
    </div>
  );
}
