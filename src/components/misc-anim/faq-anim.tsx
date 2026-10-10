"use client";

import { ReactNode, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, useLoop } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";
import "./misc-anim.css";

// Motion pieces for /faq: a chat scene in the hero, search with a live result
// counter, category chips with a sliding pill and an accordion row.

/* ───────────────────────── Hero: question → answer ───────────────────────── */

/** A looping chat: a real question from the list is typed, then answered */
export function FaqHeroScene({ en, questions }: { en: boolean; questions: string[] }) {
  const { ref, tick, run } = useLoop<HTMLDivElement>(90);
  const CYCLE = 70; // ticks per question
  const qi = run ? Math.floor(tick / CYCLE) % questions.length : 0;
  const t = run ? tick % CYCLE : CYCLE - 1;
  const q = questions[qi] ?? "";
  const typed = q.slice(0, Math.min(q.length, Math.floor(t * 1.6)));
  const typingDone = typed.length >= q.length;
  const thinking = typingDone && t < Math.ceil(q.length / 1.6) + 10;
  const answered = typingDone && !thinking;

  return (
    <div ref={ref} data-run={run} className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B14] p-5 text-white sm:p-6" aria-hidden="true">
      <div className="ms-orb pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="ms-orb pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl" style={{ animationDelay: "-5s" }} />
      <div className="relative flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{en ? "ask anteyko" : "спросите anteyko"}</p>
        <p className="font-mono text-[10px] tabular-nums text-white/45">
          {String(qi + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}
        </p>
      </div>

      <div className="relative mt-5 flex min-h-[190px] flex-col gap-3">
        {/* question bubble */}
        <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-gradient-to-br from-indigo-500 to-violet-600 px-4 py-3 text-body-sm font-medium shadow-[0_12px_30px_-12px_rgba(99,102,241,0.9)]">
          <span className="grid">
            <span className="invisible [grid-area:1/1]">{q}</span>
            <span className="[grid-area:1/1]">
              {typed}
              {!typingDone && <span className="ms-caret ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-white" />}
            </span>
          </span>
        </div>

        {/* answer */}
        <div className="flex items-end gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 font-brand text-xs font-semibold">A</span>
          <div className="min-w-0 flex-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-3">
            <AnimatePresence mode="wait" initial={false}>
              {answered ? (
                <motion.div key={`a-${qi}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="space-y-2">
                  {[0.92, 0.78, 0.55].map((w, i) => (
                    <motion.span
                      key={i}
                      className="block h-2 origin-left rounded-full bg-gradient-to-r from-white/50 to-white/15"
                      style={{ width: `${Math.round(w * 100)}%` }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                    />
                  ))}
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="pt-1 font-mono text-[11px] text-emerald-300">
                    ✓ {en ? "answered, no fluff" : "ответ, без воды"}
                  </motion.p>
                </motion.div>
              ) : (
                <motion.span key="dots" initial={{ opacity: 0 }} animate={{ opacity: thinking ? 1 : 0.35 }} exit={{ opacity: 0 }} className="ms-typing inline-flex items-center gap-1 py-1 text-indigo-200">
                  <span />
                  <span />
                  <span />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* question index dots */}
      <div className="relative mt-4 flex flex-wrap gap-1">
        {questions.map((_, i) => (
          <span key={i} className={`h-1 rounded-full transition-all duration-500 ${i === qi ? "w-5 bg-gradient-to-r from-indigo-400 to-fuchsia-400" : "w-1.5 bg-white/15"}`} />
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────────── Search ───────────────────────────── */

export function FaqSearch({ value, onChange, placeholder, en }: { value: string; onChange: (v: string) => void; placeholder: string; en: boolean }) {
  const reduced = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const active = value.trim().length > 0;
  return (
    <div className="ms-rim group relative rounded-2xl border border-border bg-bg-primary shadow-[0_18px_50px_-30px_rgba(79,70,229,0.5)] transition-shadow focus-within:shadow-[0_24px_60px_-28px_rgba(79,70,229,0.7)]">
      <motion.svg
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-accent-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        animate={active && !reduced ? { rotate: [0, -18, 12, 0], scale: [1, 1.15, 1] } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        key={active ? "on" : "off"}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
      </motion.svg>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-2xl bg-transparent py-4 pl-12 pr-14 text-text-primary placeholder:text-text-muted focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
        <AnimatePresence initial={false}>
          {active && (
            <motion.button
              key="clear"
              type="button"
              onClick={() => {
                onChange("");
                inputRef.current?.focus();
              }}
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.25 }}
              className="grid h-8 w-8 place-items-center rounded-full text-text-tertiary hover:bg-bg-tertiary hover:text-text-primary"
              aria-label={en ? "Clear search" : "Очистить поиск"}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───────────────────────────── Chips ───────────────────────────── */

export function CategoryChips<T extends string>({ items, value, onChange }: { items: { value: T; label: string; icon: string; count: number }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((cat, i) => {
        const on = cat.value === value;
        return (
          <motion.button
            key={cat.value}
            type="button"
            onClick={() => onChange(cat.value)}
            aria-pressed={on}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.05, ease: EASE }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={`relative inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-body-sm font-medium transition-colors duration-200 ${on ? "border-transparent text-white" : "border-border/60 bg-bg-primary/60 text-text-tertiary hover:border-border hover:text-text-secondary"}`}
          >
            {on && (
              <motion.span
                layoutId="ms-faq-chip"
                className="absolute inset-0 -z-0 rounded-xl bg-[#0B0B14] shadow-[0_10px_26px_-10px_rgba(79,70,229,0.9)]"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              >
                <span aria-hidden="true" className="absolute inset-0 rounded-xl bg-[radial-gradient(120%_140%_at_0%_0%,rgba(99,102,241,0.6),transparent_60%),radial-gradient(120%_140%_at_100%_100%,rgba(217,70,239,0.4),transparent_60%)]" />
              </motion.span>
            )}
            <span className="relative text-sm" aria-hidden="true">
              {cat.icon}
            </span>
            <span className="relative">{cat.label}</span>
            <span className={`relative rounded-md px-1.5 font-mono text-[10px] tabular-nums transition-colors ${on ? "bg-white/15 text-white" : "bg-bg-tertiary text-text-muted"}`}>{cat.count}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ───────────────────────────── Row ───────────────────────────── */

/** Accordion row: number lights up, a rail grows on the left, the answer slides open */
export function FaqRow({ number, title, open, onToggle, children }: { number: string; title: ReactNode; open: boolean; onToggle: () => void; children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <div className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${open ? "border-accent-primary/30 bg-bg-primary shadow-[0_24px_60px_-30px_rgba(79,70,229,0.55)]" : "border-border bg-bg-primary/70 hover:-translate-y-0.5 hover:border-border-hover hover:bg-bg-primary hover:shadow-[0_16px_40px_-30px_rgba(79,70,229,0.5)]"}`}>
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-0 top-0 w-[3px] origin-top bg-gradient-to-b from-indigo-500 via-fuchsia-500 to-amber-400"
        initial={false}
        animate={{ scaleY: open ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
      />
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-primary sm:px-6 sm:py-5"
      >
        <span className={`relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl font-mono text-caption font-bold transition-all duration-300 ${open ? "text-white shadow-[0_8px_20px_-6px_rgba(168,85,247,0.8)]" : "bg-bg-tertiary text-text-tertiary group-hover:text-accent-primary"}`}>
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-fuchsia-500"
            initial={false}
            animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative">{number}</span>
        </span>
        <span className={`flex-1 text-heading-sm font-medium transition-colors duration-200 ${open ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"}`}>{title}</span>
        <span className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${open ? "bg-accent-primary text-white" : "bg-bg-tertiary text-text-tertiary group-hover:bg-accent-primary/10 group-hover:text-accent-primary"}`} aria-hidden="true">
          <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M2 7h10" />
            <motion.path d="M7 2v10" initial={false} animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }} style={{ transformOrigin: "7px 7px" }} transition={{ duration: 0.3 }} />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <motion.div
              initial={reduced ? false : { y: -8 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="px-4 pb-5 pl-[4.25rem] text-body-md leading-relaxed text-text-secondary sm:px-6 sm:pb-6 sm:pl-[5.25rem]"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────────── Empty / CTA ───────────────────────────── */

export function FaqEmpty({ en }: { en: boolean }) {
  const reduced = useReducedMotion();
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-16 text-center">
      <div className="relative mx-auto mb-5 h-20 w-20">
        <span className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/15 to-fuchsia-500/15" />
        <motion.svg
          className="absolute inset-0 m-auto h-9 w-9 text-accent-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          animate={reduced ? {} : { x: [-6, 6, -6], y: [0, -4, 0], rotate: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </motion.svg>
      </div>
      <p className="mb-1 text-body-md text-text-secondary">{en ? "No results found" : "Ничего не найдено"}</p>
      <p className="text-caption text-text-tertiary">{en ? "Try another keyword or category" : "Попробуйте другой запрос или категорию"}</p>
    </motion.div>
  );
}

const GLYPHS = [
  { x: 8, y: 22, s: 28, d: 0 },
  { x: 86, y: 18, s: 40, d: -1.5 },
  { x: 16, y: 72, s: 22, d: -3 },
  { x: 78, y: 70, s: 30, d: -2.2 },
  { x: 48, y: 10, s: 18, d: -4 },
  { x: 94, y: 48, s: 20, d: -0.8 },
];

/** Floating question marks behind the closing CTA */
export function FaqGlyphs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {GLYPHS.map((g, i) => (
        <span
          key={i}
          className="ms-float absolute font-brand font-semibold text-white/10"
          style={{ left: `${g.x}%`, top: `${g.y}%`, fontSize: g.s * 2, animationDelay: `${g.d}s`, ["--rot" as string]: `${i % 2 ? 8 : -8}deg` }}
        >
          ?
        </span>
      ))}
    </div>
  );
}
