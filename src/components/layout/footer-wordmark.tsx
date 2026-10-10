"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

/** Current time, ticking every 30 s; null on the server and the first client render */
export function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 30_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);
  return now;
}

const LETTERS = "ANTEYKO".split("");

/**
 * Oversized studio wordmark closing every page: letters rise in one by one,
 * a gradient sweeps through the outline, and a light follows the pointer.
 */
export function FooterWordmark() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--fx", `${Math.round(((e.clientX - r.left) / r.width) * 100)}%`);
    el.style.setProperty("--fy", `${Math.round(((e.clientY - r.top) / r.height) * 100)}%`);
  };
  return (
    <div ref={ref} onPointerMove={onMove} aria-hidden="true" className="footer-wordmark @container relative select-none overflow-hidden border-t border-border/50 pt-6 pb-2">
      <p className="footer-wordmark__text flex justify-between font-brand text-[12.6cqw] font-semibold leading-[0.85] tracking-[-0.04em]">
        {LETTERS.map((l, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="footer-wordmark__letter inline-block"
              initial={reduced ? false : { y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {l}
            </motion.span>
          </span>
        ))}
      </p>
    </div>
  );
}
