"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { catalogEntries, sortEntries } from "@/lib/catalog";
import { CatalogCard } from "@/components/cases-catalog/catalog-card";

/** Horizontal strip of the strongest catalog work, scrollable by drag, wheel or arrows. */
export function HomeWork() {
  const { language } = useLanguage();
  const en = language === "en";
  const reduced = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const entries = sortEntries(catalogEntries, "featured", language).slice(0, 9);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 640), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section className="overflow-hidden border-t border-border bg-bg-secondary py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-caption uppercase tracking-[0.2em] text-text-tertiary">{en ? "Selected work" : "Избранные работы"}</p>
            <h2 className="mt-4 max-w-3xl font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-text-primary md:text-6xl">
              {en ? "Hover — they come alive" : "Наведите — они оживут"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => scroll(d)}
                aria-label={d < 0 ? (en ? "Previous" : "Назад") : en ? "Next" : "Вперёд"}
                className="grid h-12 w-12 place-items-center rounded-full border border-border bg-bg-primary text-text-primary transition-colors hover:border-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
              >
                {d < 0 ? "←" : "→"}
              </button>
            ))}
            <NextLink href="/cases" className="ml-2 inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-3 text-body-sm font-medium text-white transition-transform hover:-translate-y-0.5">
              {en ? `All ${catalogEntries.length} works` : `Все ${catalogEntries.length} работы`} <span aria-hidden="true">→</span>
            </NextLink>
          </div>
        </div>
      </div>

      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        {entries.map((e, i) => (
          <motion.div
            key={e.slug}
            className="w-[86vw] shrink-0 snap-start sm:w-[520px]"
            initial={reduced ? false : { opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: Math.min(i, 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <CatalogCard entry={e} index={i} size="half" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
