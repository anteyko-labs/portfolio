"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import clsx from "clsx";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import type { CatalogEntry } from "@/lib/catalog";
import { Poster } from "./poster";
import { CATEGORY_LABEL, pad } from "./labels";

/** Index view: big type rows, a screenshot follows the cursor over the hovered row. */
export function CatalogList({ entries }: { entries: CatalogEntry[] }) {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<CatalogEntry | null>(null);
  const x = useSpring(0, { stiffness: 220, damping: 26, mass: 0.6 });
  const y = useSpring(0, { stiffness: 220, damping: 26, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    x.set(e.clientX + 28);
    y.set(e.clientY - 120);
  };

  return (
    <div onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
      <ul className="border-t border-border">
        {entries.map((entry, i) => (
          <motion.li
            key={entry.slug}
            layout={!reduced}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.025, 0.4) }}
            className="border-b border-border"
          >
            <NextLink
              href={`/cases/${entry.slug}`}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                // First hover: appear at the cursor instead of flying in from the corner
                if (!hovered) {
                  x.jump(e.clientX + 28);
                  y.jump(e.clientY - 120);
                }
                setHovered(entry);
              }}
              onFocus={() => setHovered(null)}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-1 py-5 transition-colors focus:outline-none focus-visible:bg-bg-secondary md:grid-cols-[3rem_minmax(0,1.4fr)_minmax(0,1fr)_9rem_5rem_1.5rem] md:py-6"
            >
              <span className="font-mono text-caption text-text-muted">{pad(i + 1)}</span>
              <span className="min-w-0">
                <span className="block truncate font-display text-heading-lg font-semibold tracking-tight text-text-primary transition-[color,transform] duration-300 group-hover:translate-x-2 group-hover:text-accent-primary md:text-heading-xl motion-reduce:group-hover:translate-x-0">
                  {entry.title[language]}
                  {entry.signature && (
                    <span className="catalog-signature ml-3 inline-flex translate-y-[-0.2em] items-center rounded-full px-2 py-0.5 align-middle text-[11px] font-semibold text-white" title={entry.signature[language]}>
                      ✦
                    </span>
                  )}
                </span>
                <span className="mt-0.5 block truncate text-body-sm text-text-tertiary md:hidden">
                  {entry.client[language]}
                </span>
              </span>
              <span className="hidden truncate text-body-sm text-text-secondary md:block">{entry.client[language]}</span>
              <span className="hidden font-mono text-caption uppercase tracking-[0.14em] text-text-tertiary md:block">
                {CATEGORY_LABEL[entry.category][language]}
              </span>
              <span className="hidden font-mono text-caption text-text-tertiary md:block">{entry.year}</span>
              <span
                className="text-text-muted transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-accent-primary"
                aria-hidden="true"
              >
                →
              </span>
            </NextLink>
          </motion.li>
        ))}
      </ul>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="preview"
                className="pointer-events-none fixed left-0 top-0 z-[60] hidden w-[340px] overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-[0_40px_80px_-30px_rgba(10,10,10,0.45)] lg:block"
                style={{ x, y }}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={hovered.slug}
                    className="relative aspect-[16/10]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    {hovered.phones?.length ? (
                      <div className="absolute inset-0" style={{ background: hovered.stage ?? hovered.palette[0] }}>
                        <Image src={hovered.phones[0]} alt="" fill sizes="340px" className="object-contain py-3" />
                      </div>
                    ) : hovered.cover ? (
                      <Image
                        src={hovered.cover}
                        alt=""
                        fill
                        sizes="340px"
                        className={clsx(hovered.mobileFirst ? "object-contain bg-bg-tertiary" : "object-cover object-top")}
                      />
                    ) : (
                      <Poster
                        title={hovered.title[language]}
                        label={CATEGORY_LABEL[hovered.category][language]}
                        domain={hovered.domain}
                        palette={hovered.palette}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
