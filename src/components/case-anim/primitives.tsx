"use client";

import "./case-anim.css";
import { ReactNode, useRef } from "react";
import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";
import { EASE } from "@/components/motion/kit";

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** `run` is true while the element is on screen and motion is allowed — toggles `.ca-run` CSS loops */
export function useOnScreen<T extends Element>(amount = 0.15) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount });
  const reduced = useReducedMotion();
  return { ref, run: inView && !reduced, reduced };
}

/** Section heading: numbered kicker with a growing rule, then the title rising out of a mask */
export function CaseHeading({ index, kicker, title, subtitle, className = "" }: { index: number; kicker: string; title: string; subtitle?: string; className?: string }) {
  const reduced = useReducedMotion();
  const vp = { once: true, margin: "-40px" } as const;
  return (
    <div className={`mb-10 md:mb-12 ${className}`}>
      <motion.div
        className="flex items-center gap-3 font-mono text-caption uppercase tracking-[0.2em] text-text-tertiary"
        initial={reduced ? false : { opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={vp}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <span className="ca-grad-text font-semibold">{pad2(index)}</span>
        <motion.span
          aria-hidden="true"
          className="h-px w-10 origin-left bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400"
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={vp}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        />
        <span>{kicker}</span>
      </motion.div>
      <motion.h2
        className="mt-4 overflow-hidden pb-[0.08em] font-brand text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-text-primary sm:text-4xl md:text-5xl"
        initial={reduced ? false : "hidden"}
        whileInView="show"
        viewport={vp}
      >
        <motion.span
          className="block"
          variants={{ hidden: { y: "105%" }, show: { y: 0, transition: { duration: 0.8, delay: 0.05, ease: EASE } } }}
        >
          {title}
        </motion.span>
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-3 max-w-2xl text-body-lg text-text-secondary"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/** An outline icon whose strokes draw themselves when it scrolls into view */
export function DrawIcon({ paths, className = "h-5 w-5", delay = 0, strokeWidth = 1.8 }: { paths: readonly string[]; className?: string; delay?: number; strokeWidth?: number }) {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: delay + i * 0.15, ease: EASE }}
        />
      ))}
    </svg>
  );
}

/** Words light up one after another as the paragraph scrolls through the viewport */
export function ScrollWords({ text, className = "", renderWord }: { text: string; className?: string; renderWord?: (w: string, i: number) => ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "end 0.55"] });
  const words = text.split(" ");
  const n = words.length;
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} from={i / n} to={Math.min(1, (i + 2) / n)} reduced={reduced}>
          {renderWord ? renderWord(w, i) : w}
          {i < n - 1 ? " " : ""}
        </Word>
      ))}
    </p>
  );
}

function Word({ progress, from, to, reduced, children }: { progress: MotionValue<number>; from: number; to: number; reduced: boolean; children: ReactNode }) {
  const opacity = useTransform(progress, [from, to], [0.2, 1]);
  return <motion.span style={reduced ? undefined : { opacity }}>{children}</motion.span>;
}

export const ICONS = {
  design: ["M12 19l7-7 3 3-7 7-3-3z", "M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z", "M2 2l7.586 7.586", "M13 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"],
  frontend: ["M3 5h18v14H3z", "M3 9h18", "M10 13l-2 2 2 2", "M14 13l2 2-2 2"],
  backend: ["M4 3h16v7H4z", "M4 14h16v7H4z", "M8 6.5h.01", "M8 17.5h.01"],
  phone: ["M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z", "M11 18h2"],
  flame: ["M12 2c1 3 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 0-8z"],
  plug: ["M9 2v6", "M15 2v6", "M6 8h12v4a6 6 0 0 1-12 0V8z", "M12 18v4"],
  cube: ["M21 16V8l-9-5-9 5v8l9 5 9-5z", "M3.3 7L12 12l8.7-5", "M12 22V12"],
  clock: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 6v6l4 2"],
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "M9 12l2 2 4-4"],
  gauge: ["M3.34 19a10 10 0 1 1 17.32 0", "M12 14l4-4", "M12 14h.01"],
  coin: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .9-3 2s1.3 1.7 3 2 3 .9 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5", "M12 6v2", "M12 16v2"],
  database: ["M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3z", "M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5", "M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"],
  lock: ["M5 11h14v10H5z", "M8 11V7a4 4 0 0 1 8 0v4"],
  doc: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6", "M8 13h8", "M8 17h5"],
  calendar: ["M4 5h16v16H4z", "M4 10h16", "M8 3v4", "M16 3v4"],
  building: ["M4 21V5l8-3v19", "M12 8l8 3v10", "M2 21h20", "M8 9h.01", "M8 13h.01", "M8 17h.01", "M16 14h.01", "M16 18h.01"],
  timer: ["M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "M12 10v4l2 2", "M10 2h4"],
} as const;

export type IconName = keyof typeof ICONS;
