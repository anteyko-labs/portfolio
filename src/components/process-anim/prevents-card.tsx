"use client";

import { motion } from "framer-motion";
import { EASE, useLoop } from "@/components/motion/kit";
import "./process-anim.css";
import { useLanguage } from "@/lib/language-context";
import { type Language, pick } from "@/lib/i18n-text";

// Hero side card: the three problems the process prevents get struck out one by
// one, each stamped with the phase that prevents it, then the loop starts over.

const ITEMS = [
  { en: "Scope creep", ru: "Расплывчатый скоуп", zh: "范围蔓延", tr: "Kapsam kayması", ar: "توسّع النطاق غير المنضبط", phase: "01" },
  { en: "Hidden risks", ru: "Скрытые риски", zh: "隐藏风险", tr: "Gizli riskler", ar: "المخاطر الخفية", phase: "01" },
  { en: "Chaotic releases", ru: "Хаотичные релизы", zh: "混乱的发布", tr: "Kaotik yayınlar", ar: "إصدارات فوضوية", phase: "03" },
];
const N = 7; // 0 idle · 1..3 strike one by one · 4..6 hold

export function PreventsCard() {
  const { language } = useLanguage();
  const { ref, tick, run, reduced } = useLoop<HTMLDivElement>(1000);
  const c = reduced ? N - 1 : tick % N;
  const done = ITEMS.filter((_, i) => c > i).length;

  return (
    <div ref={ref} data-run={run} className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C0C16] p-6 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="relative mb-5 flex items-center justify-between gap-3">
        <p className="font-mono text-caption uppercase tracking-wider text-white/50">{pick({ en: "What it prevents", ru: "Что это предотвращает", zh: "可避免的问题", tr: "Neyi önler", ar: "ما الذي نمنعه" }, language)}</p>
        <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" />
          </svg>
        </span>
      </div>
      <ul className="relative space-y-2.5">
        {ITEMS.map((it, i) => {
          const off = c > i;
          return (
            <li key={it.en} className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-500 ${off ? "border-emerald-400/20 bg-emerald-400/[0.06]" : "border-white/10 bg-white/[0.03]"}`}>
              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors duration-500 ${off ? "bg-emerald-400/20 text-emerald-300" : "bg-amber-400/15 text-amber-300"}`}>
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {off ? <motion.path key="ok" d="M4.5 10.5l3.5 3.5 7.5-8" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, ease: EASE }} /> : <path d="M10 5v6M10 14.5v.5" />}
                </svg>
              </span>
              <span className="min-w-0 flex-1 text-body-sm">
                <span className={`relative inline-block transition-colors duration-500 ${off ? "text-white/45" : "text-white/85"}`}>
                  {pick(it, language)}
                  <motion.span aria-hidden="true" className="absolute -inset-x-1 top-1/2 h-[1.5px] origin-left rounded-full bg-gradient-to-r from-emerald-300 to-emerald-500" initial={false} animate={{ scaleX: off ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} />
                </span>
              </span>
              <motion.span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] text-emerald-200" initial={false} animate={{ opacity: off ? 1 : 0, x: off ? 0 : 8, scale: off ? 1 : 0.9 }} transition={{ duration: 0.4, ease: EASE, delay: off ? 0.25 : 0 }}>
                {pick({ en: "phase", ru: "фаза", zh: "阶段", tr: "aşama", ar: "مرحلة" }, language)} {it.phase} ✓
              </motion.span>
            </li>
          );
        })}
      </ul>
      <div className="relative mt-5 flex items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full origin-left rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400" initial={false} animate={{ scaleX: done / ITEMS.length }} transition={{ duration: 0.6, ease: EASE }} />
        </div>
        <span className="font-mono text-[11px] tabular-nums text-white/55">
          {done}/{ITEMS.length} {pick({ en: "prevented", ru: "предотвращено", zh: "已避免", tr: "önlendi", ar: "تم منعه" }, language)}
        </span>
      </div>
    </div>
  );
}
