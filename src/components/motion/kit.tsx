"use client";

import { Children, ReactNode, useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

// Shared motion building blocks for the inner pages, so every page animates in
// the same language as the home page. All loops pause off screen and every
// effect falls back to a static frame with reduced motion.

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Fades and lifts its children in one by one when scrolled into view */
export function Stagger({ children, className, gap = 0.07, y = 24, as = "div" }: { children: ReactNode; className?: string; gap?: number; y?: number; as?: "div" | "ul" | "ol" }) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  const Item = as === "div" ? motion.div : motion.li;
  return (
    <Tag className={className} initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: gap }}>
      {Children.map(children, (child) =>
        child == null || child === false ? null : (
          <Item variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}>{child}</Item>
        ),
      )}
    </Tag>
  );
}

/** Counts the leading number of a value like "40+", "24h" or "8,850+" up from zero once it is in view */
export function CountUp({ value, duration = 1.6, className }: { value: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  useEffect(() => {
    const m = value.match(/^(\D*)(\d[\d,\s]*(?:\.\d+)?)(.*)$/);
    const el = ref.current;
    if (!m || !el || !inView || reduced) return;
    const [, pre, raw, post] = m;
    const sep = raw.includes(",") ? "," : /\s/.test(raw) ? " " : "";
    const target = parseFloat(raw.replace(/[,\s]/g, ""));
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const fmt = (v: number) => {
      const s = v.toFixed(decimals);
      return sep ? s.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : s;
    };
    const c = animate(0, target, { duration, ease: EASE, onUpdate: (v) => (el.textContent = `${pre}${fmt(v)}${post}`) });
    return () => {
      c.stop();
      el.textContent = value;
    };
  }, [value, inView, reduced, duration]);
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

/** A tick counter that only advances while `ref` is on screen; returns 0 forever with reduced motion */
export function useLoop<T extends Element>(ms: number) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);
  const run = inView && !reduced;
  useEffect(() => {
    if (!run) return;
    const id = window.setInterval(() => setTick((t) => t + 1), ms);
    return () => window.clearInterval(id);
  }, [ms, run]);
  return { ref, tick, run, reduced };
}

/** Card with a soft glow that follows the pointer and a gradient rim on hover */
export function SpotlightCard({ children, className = "", color = "99 102 241" }: { children: ReactNode; className?: string; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onPointerMove={onMove} className={`spot-card group relative isolate ${className}`} style={{ ["--spot" as string]: color }}>
      <span aria-hidden="true" className="spot-card__glow pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {children}
    </div>
  );
}

/** A check mark that draws itself when it scrolls into view */
export function DrawCheck({ delay = 0, className = "h-4 w-4" }: { delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <motion.path
        d="M4.5 10.5l3.5 3.5 7.5-8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay, ease: EASE }}
      />
    </svg>
  );
}

/** A bar that grows to `value` (0–1) when its track scrolls into view (the track is observed, not the zero-width bar) */
export function GrowBar({ value, className = "", barClassName = "bg-accent-primary", delay = 0 }: { value: number; className?: string; barClassName?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={`h-1.5 overflow-hidden rounded-full bg-border ${className}`} initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true }}>
      <motion.div
        className={`h-full origin-left rounded-full ${barClassName}`}
        style={{ width: `${Math.round(value * 100)}%` }}
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, delay, ease: EASE } } }}
      />
    </motion.div>
  );
}
