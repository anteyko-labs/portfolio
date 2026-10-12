"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { useReducedMotion } from "@/lib/hooks";
import { EASE } from "@/components/motion/kit";

/** Heading of a service group on /services: a rule draws across, then the label rises behind it */
export function GroupHeading({ index, label, count }: { index: number; label: string; count: number }) {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -10% 0px" }) || reduced;
  return (
    <div ref={ref}>
      <div className="flex items-end justify-between gap-6">
        <div className="overflow-hidden">
          <motion.h2
            className="font-brand text-3xl font-semibold tracking-[-0.03em] text-text-primary md:text-5xl"
            initial={reduced ? false : { y: "105%" }}
            animate={shown ? { y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          >
            <span className="mr-4 font-mono text-base font-normal tracking-normal text-text-tertiary md:text-lg">
              {String(index + 1).padStart(2, "0")}
            </span>
            {label}
          </motion.h2>
        </div>
        <motion.span
          className="shrink-0 font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary"
          initial={reduced ? false : { opacity: 0 }}
          animate={shown ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {count} {pick({ en: count === 1 ? "service" : "services", ru: count === 1 ? "услуга" : count < 5 ? "услуги" : "услуг", zh: "项服务", tr: "hizmet", ar: "خدمات" }, language)}
        </motion.span>
      </div>
      <motion.div
        className="mt-5 h-px origin-left bg-text-primary/80"
        initial={reduced ? false : { scaleX: 0 }}
        animate={shown ? { scaleX: 1 } : undefined}
        transition={{ duration: 1.1, ease: EASE }}
      />
    </div>
  );
}
