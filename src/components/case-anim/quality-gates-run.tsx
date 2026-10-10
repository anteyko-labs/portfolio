"use client";

import "./case-anim.css";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";
import { EASE } from "@/components/motion/kit";
import { pad2 } from "./primitives";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";

type Gate = { name: string; passed: boolean };

const STEP_MS = 560;

/**
 * A verification run that plays when scrolled into view: every gate goes from
 * queued to running (spinner + scan line) to passed, the progress bar fills and
 * the N/N counter climbs, ending in a success glow. With reduced motion the
 * finished run is shown straight away.
 */
export function QualityGatesRun({ gates, label }: { gates: Gate[]; label: string }) {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();
  const total = gates.length;
  // step = index of the gate that is currently running; total = finished
  const [step, setStep] = useState(-1);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    let s = -1;
    let id = 0;
    const next = () => {
      s += 1;
      setStep(s);
      if (s < total) id = window.setTimeout(next, s === 0 ? STEP_MS + 150 : STEP_MS);
    };
    id = window.setTimeout(next, 350);
    return () => window.clearTimeout(id);
  }, [inView, reduced, total, runId]);

  const cur = reduced ? total : step;
  const finished = cur >= total;
  const doneCount = Math.max(0, Math.min(cur, total));
  const passedSoFar = gates.slice(0, doneCount).filter((g) => g.passed).length;
  const passedTotal = gates.filter((g) => g.passed).length;
  const allPassed = passedTotal === total;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  const replay = () => {
    setStep(-1);
    setRunId((r) => r + 1);
  };

  return (
    <div ref={ref} className="relative">
      {/* success glow behind the panel */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-emerald-500/25 via-indigo-500/20 to-fuchsia-500/20 blur-2xl"
        initial={false}
        animate={{ opacity: finished ? 1 : 0.25, scale: finished ? 1 : 0.96 }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      <div
        className={`relative overflow-hidden rounded-3xl border bg-[#0C0C14] transition-[border-color,box-shadow] duration-700 ${
          finished && allPassed ? "border-emerald-400/40 shadow-[0_0_0_1px_rgb(52_211_153/0.15),0_30px_80px_-30px_rgb(16_185_129/0.45)]" : "border-white/10"
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.06) 1px, transparent 0)", backgroundSize: "22px 22px" }}
        />

        {/* window bar */}
        <div className="relative flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
          </div>
          <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-white/45">{label}</span>
          <button
            type="button"
            onClick={replay}
            disabled={!finished || reduced}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/70 transition-colors hover:border-white/25 hover:text-white disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {pick({ en: "Run again", ru: "Запустить снова", zh: "重新运行", tr: "Tekrar çalıştır", ar: "تشغيل مجددًا" }, language)}
          </button>
        </div>

        {/* progress */}
        <div className="relative px-4 pt-5 sm:px-6">
          <div className="flex items-baseline justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.16em]">
            <span className={finished ? "text-emerald-300" : "text-white/50"}>
              {finished ? (pick({ en: "Verification complete", ru: "Проверка завершена", zh: "验证完成", tr: "Doğrulama tamamlandı", ar: "اكتمل التحقق" }, language)) : cur < 0 ? (pick({ en: "Queued", ru: "В очереди", zh: "排队中", tr: "Sırada", ar: "في قائمة الانتظار" }, language)) : pick({ en: "Verifying…", ru: "Проверяем…", zh: "验证中…", tr: "Doğrulanıyor…", ar: "جارٍ التحقق…" }, language)}
            </span>
            <span className="tabular-nums text-white/60">{pct}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-400"
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
            />
          </div>
        </div>

        {/* gates */}
        <ol className="relative space-y-2 p-4 sm:p-6">
          {gates.map((g, i) => {
            const state = i < cur ? (g.passed ? "pass" : "skip") : i === cur ? "run" : "queued";
            return (
              <li
                key={`${g.name}-${i}`}
                className={`relative flex items-center gap-3 overflow-hidden rounded-xl border px-3 py-3 transition-colors duration-500 sm:gap-4 sm:px-4 ${
                  state === "pass"
                    ? "border-emerald-400/20 bg-emerald-400/[0.06]"
                    : state === "skip"
                      ? "border-amber-400/25 bg-amber-400/[0.06]"
                      : state === "run"
                        ? "border-indigo-400/40 bg-indigo-400/[0.08]"
                        : "border-white/[0.07] bg-white/[0.02]"
                }`}
              >
                {state === "run" && <span className="ca-scan" aria-hidden="true" />}
                <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
                  <AnimatePresence mode="wait" initial={false}>
                    {state === "pass" ? (
                      <motion.svg
                        key="pass"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-4 w-4 text-emerald-300"
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                        aria-hidden="true"
                      >
                        <motion.path
                          d="M4.5 10.5l3.5 3.5 7.5-8"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={reduced ? false : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.35, ease: EASE }}
                        />
                      </motion.svg>
                    ) : state === "skip" ? (
                      <motion.span key="skip" className="font-mono text-body-sm font-bold text-amber-300" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        –
                      </motion.span>
                    ) : state === "run" ? (
                      <motion.span key="run" className="ca-spinner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                    ) : (
                      <motion.span key="queued" className="h-1.5 w-1.5 rounded-full bg-white/25" exit={{ opacity: 0 }} />
                    )}
                  </AnimatePresence>
                </span>
                <span className="relative font-mono text-[11px] text-white/35">{pad2(i + 1)}</span>
                <span className={`relative min-w-0 flex-1 text-body-sm font-medium transition-colors duration-500 sm:text-body-md ${state === "queued" ? "text-white/45" : "text-white"}`}>
                  {g.name}
                </span>
                <span
                  className={`relative shrink-0 rounded-md px-2 py-1 font-mono text-[11px] font-medium transition-colors duration-500 ${
                    state === "pass"
                      ? "bg-emerald-400/15 text-emerald-300"
                      : state === "skip"
                        ? "bg-amber-400/15 text-amber-300"
                        : state === "run"
                          ? "bg-indigo-400/15 text-indigo-200"
                          : "bg-white/5 text-white/40"
                  }`}
                >
                  {state === "pass"
                    ? pick({ en: "Pass", ru: "Пройден", zh: "通过", tr: "Geçti", ar: "ناجح" }, language)
                    : state === "skip"
                      ? pick({ en: "Skipped", ru: "Пропущен", zh: "已跳过", tr: "Atlandı", ar: "تم تخطّيه" }, language)
                      : state === "run"
                        ? pick({ en: "Running", ru: "Идёт", zh: "进行中", tr: "Çalışıyor", ar: "قيد التنفيذ" }, language)
                        : pick({ en: "Queued", ru: "Ожидает", zh: "等待中", tr: "Sırada", ar: "في الانتظار" }, language)}
                </span>
              </li>
            );
          })}
        </ol>

        {/* summary footer */}
        <div className="relative flex items-center justify-between gap-4 border-t border-white/10 px-4 py-4 sm:px-6 sm:py-5">
          <span className="text-body-sm text-white/65">
            {finished
              ? allPassed
                ? pick({ en: "All gates passed", ru: "Все гейты пройдены", zh: "所有关卡均已通过", tr: "Tüm kapılar geçildi", ar: "اجتازت جميع البوابات" }, language)
                : pick({ en: `${passedTotal} of ${total} gates passed`, ru: `${passedTotal} из ${total} гейтов пройдено`, zh: `${total} 道关卡中已通过 ${passedTotal} 道`, tr: `${total} kapıdan ${passedTotal} tanesi geçti`, ar: `اجتازت ${passedTotal} من ${total} بوابات` }, language)
              : pick({ en: "Release is blocked until every gate is green", ru: "Релиз заблокирован, пока все гейты не зелёные", zh: "所有关卡变绿之前，发布将被拦截", tr: "Her kapı yeşil olana kadar yayın engellenir", ar: "الإصدار محظور حتى تصبح كل البوابات خضراء" }, language)}
          </span>
          <div className="flex items-center gap-2">
            <span className={`font-brand text-3xl font-semibold tabular-nums transition-colors duration-500 ${finished ? (allPassed ? "text-emerald-300" : "text-amber-300") : "text-white"}`}>
              {passedSoFar}/{total}
            </span>
            <motion.span
              className={`grid h-8 w-8 place-items-center rounded-full ${allPassed ? "bg-emerald-400/20 text-emerald-300" : "bg-amber-400/20 text-amber-300"}`}
              initial={false}
              animate={finished ? { scale: [0.6, 1.25, 1], opacity: 1 } : { scale: 0.6, opacity: 0.2 }}
              transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                {allPassed ? (
                  <path d="M4.5 10.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M10 5v6M10 14.5v.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                )}
              </svg>
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
}
