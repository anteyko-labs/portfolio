"use client";

import "./case-anim.css";
import { motion } from "framer-motion";
import { CountUp, EASE, useLoop } from "@/components/motion/kit";

type Metric = { value: string; label: string };

const BARS = 14;

/** Bar heights (in %) for a tiny live sparkline; deterministic for a given seed and tick */
function bars(seed: number, tick: number) {
  return Array.from({ length: BARS }, (_, j) => {
    const v = 0.5 + 0.5 * Math.sin(seed * 1.9 + (j + tick) * 0.75) * Math.cos(seed + (j + tick) * 0.23);
    return Math.round(22 + 70 * v);
  });
}

/**
 * Hero side panel for a case: a dark "live dashboard" with the case metrics as
 * glass cards that stagger in, count up and carry a small sparkline that keeps
 * ticking while the panel is on screen.
 */
export function CaseHeroMetrics({ metrics, caption, live }: { metrics: Metric[]; caption: string; live: string }) {
  const { ref, tick, run, reduced } = useLoop<HTMLDivElement>(900);
  const items = metrics.slice(0, 4);
  return (
    <div ref={ref} className={`relative overflow-hidden rounded-2xl bg-[#0B0A1E] p-3 text-white sm:p-4 ${run ? "ca-run" : ""}`}>
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" />

      <div className="relative mb-3 flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{caption}</span>
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300">
          <span className="ca-pulse h-1.5 w-1.5 rounded-full bg-emerald-400 text-emerald-400" />
          {live}
        </span>
      </div>

      <div className={`relative grid gap-2 sm:gap-3 ${items.length > 1 ? "grid-cols-2 lg:grid-cols-1" : "grid-cols-1"}`}>
        {items.map((m, i) => {
          const h = bars(i + 1, tick);
          return (
            <motion.div
              key={`${m.value}-${i}`}
              initial={reduced ? false : { opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.55 + i * 0.12, ease: EASE }}
              className={`relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur sm:p-4 ${i === 3 ? "lg:hidden" : ""}`}
            >
              <span className="ca-shimmer" style={{ ["--ca-delay" as string]: `${i * 0.8}s` }} aria-hidden="true" />
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="ca-grad-text-dark font-brand text-2xl font-semibold tabular-nums leading-none sm:text-3xl">
                    <CountUp value={m.value} duration={1.8} />
                  </p>
                  <p className="mt-2 text-[12px] leading-tight text-white/60 sm:text-body-sm">{m.label}</p>
                </div>
                <div className="hidden h-10 shrink-0 items-end gap-[3px] sm:flex" aria-hidden="true">
                  {h.map((v, j) => (
                    <span
                      key={j}
                      className="w-[4px] rounded-full bg-gradient-to-t from-indigo-500/40 to-fuchsia-400/90 transition-[height] duration-700 ease-out"
                      style={{ height: `${v}%`, opacity: Math.round((0.35 + (j / BARS) * 0.65) * 100) / 100 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
