"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";
import { EASE } from "@/components/motion/kit";

/** Group label on /pricing: a pill that pops in with the rules on both sides growing out of it */
export function PriceGroupLabel({ label }: { label: string }) {
  const reduced = useReducedMotion();
  const view = { once: true, margin: "-40px" } as const;
  return (
    <div className="flex items-center gap-4">
      <motion.span
        className="h-px flex-1 origin-right bg-border"
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={view}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
      />
      <motion.h2
        className="rounded-full border border-border bg-bg-primary px-5 py-2 font-mono text-caption uppercase tracking-[0.18em] text-text-secondary"
        initial={reduced ? false : { opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={view}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {label}
      </motion.h2>
      <motion.span
        className="h-px flex-1 origin-left bg-border"
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={view}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
      />
    </div>
  );
}
