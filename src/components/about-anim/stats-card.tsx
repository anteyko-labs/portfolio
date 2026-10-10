"use client";

import "./about-anim.css";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CountUp, EASE } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";

type Metric = { value: string; label: { en: string; ru: string } };

const BARS = [0.35, 0.5, 0.42, 0.62, 0.55, 0.74, 0.68, 0.88, 1];

/** Products shipped: a little bar chart that keeps growing */
function Bars() {
  return (
    <svg viewBox="0 0 96 24" className="h-6 w-full" aria-hidden="true">
      {BARS.map((h, i) => (
        <rect
          key={i}
          x={i * 10.5 + 1}
          y={24 - h * 22}
          width="6.5"
          height={h * 22}
          rx="1.5"
          className="ab-bar ab-box"
          style={{ animationDelay: `${i * 0.12}s`, transformOrigin: "bottom" }}
          fill={i === BARS.length - 1 ? "url(#ab-stat-g)" : "rgba(165,180,252,0.35)"}
        />
      ))}
    </svg>
  );
}

/** Years in delivery: five year ticks that fill one by one */
function Years({ run }: { run: boolean }) {
  const reduced = useReducedMotion();
  return (
    <div className="flex h-6 w-full items-center gap-1.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.span
            className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400"
            initial={reduced ? false : { scaleX: 0 }}
            animate={run || reduced ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.22, ease: EASE }}
          />
        </span>
      ))}
      <span className="ml-1 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_10px_2px_rgba(252,211,77,0.6)]" />
    </div>
  );
}

/** Response time: a clock face whose hand sweeps round */
function Clock() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="10" fill="none" stroke="url(#ab-stat-g)" strokeWidth="1.8" strokeDasharray="62.8" strokeDashoffset="15" strokeLinecap="round" transform="rotate(-90 12 12)" />
      <line x1="12" y1="12" x2="12" y2="5.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" className="ab-hand" />
      <line x1="12" y1="12" x2="16" y2="12" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6" strokeLinecap="round" className="ab-hand ab-hand--slow" />
      <circle cx="12" cy="12" r="1.4" fill="#fff" />
    </svg>
  );
}

/** Failed launches: a calm, flat health line with a pulse travelling along it */
function Flatline() {
  return (
    <svg viewBox="0 0 104 24" className="h-6 w-full overflow-visible" aria-hidden="true">
      <path d="M0 14 H38 l4 -7 l4 12 l4 -5 H104" fill="none" stroke="rgba(52,211,153,0.45)" strokeWidth="1.5" strokeLinejoin="round" />
      <g className="ab-runner">
        <circle cx="4" cy="14" r="2.6" fill="#34D399" />
        <circle cx="4" cy="14" r="6" fill="rgba(52,211,153,0.25)" />
      </g>
    </svg>
  );
}

/** Hero side card: the track record on a dark glass panel with a scanning grid */
export function StatsCard({ metrics, language }: { metrics: readonly Metric[]; language: "en" | "ru" }) {
  const en = language === "en";
  const ref = useRef<HTMLDivElement>(null);
  const run = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const visuals = [<Bars key="b" />, <Years key="y" run={run} />, <Clock key="c" />, <Flatline key="f" />];

  return (
    <div ref={ref} className="ab-scope relative isolate overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B14] p-5 text-white sm:p-6" data-run="true">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="ab-stat-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A5B4FC" />
            <stop offset="55%" stopColor="#F0ABFC" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
        </defs>
      </svg>
      <div aria-hidden="true" className="ab-stats-grid absolute inset-0 -z-10" />
      <div aria-hidden="true" className="ab-scan pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/4" />
      <div aria-hidden="true" className="absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-20 -left-10 -z-10 h-48 w-48 rounded-full bg-indigo-500/25 blur-3xl" />

      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">{en ? "Track record" : "Послужной список"}</p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          {en ? "Live" : "Сейчас"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.value}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={run ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.35 + i * 0.1, ease: EASE }}
            className="group rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.07]"
          >
            <div className="home-gradient-text font-brand text-3xl font-semibold tabular-nums sm:text-4xl">
              <CountUp value={m.value} duration={1.8} />
            </div>
            <div className="mt-1 min-h-[2.5em] text-caption leading-snug text-white/60">{m.label[language]}</div>
            <div className="mt-3 flex h-6 items-center">{visuals[i]}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
