"use client";

import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";

const REPEATS = 4;

export function MarqueeBanner() {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const text =
    language === "en"
      ? "End-to-end delivery. Engineering discipline. Product thinking."
      : "Поставка под ключ. Инженерная дисциплина. Продуктовое мышление.";

  const content = Array(REPEATS)
    .fill(text)
    .join(" · ");

  return (
    <section
      className="relative py-5 overflow-hidden border-y border-border bg-bg-secondary"
      aria-hidden="true"
    >
      <div
        className={prefersReducedMotion ? "flex justify-center" : "marquee-track flex whitespace-nowrap"}
        style={prefersReducedMotion ? {} : { willChange: "transform" }}
      >
        <span className="marquee-content inline-block font-mono text-caption uppercase text-text-tertiary tracking-[0.2em] px-4">
          {content}
        </span>
        {!prefersReducedMotion && (
          <span className="marquee-content inline-block font-mono text-caption uppercase text-text-tertiary tracking-[0.2em] px-4" aria-hidden>
            {content}
          </span>
        )}
      </div>
    </section>
  );
}
