"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import type { CatalogEntry } from "@/lib/catalog";
import { CatalogMedia } from "./media";
import { CATEGORY_LABEL, pad } from "./labels";
import { pick } from "@/lib/i18n-text";

export type CardSize = "wide" | "half" | "third";

const SIZES: Record<CardSize, string> = {
  wide: "(max-width: 768px) 100vw, 60vw",
  half: "(max-width: 768px) 100vw, 45vw",
  third: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
};

export function CatalogCard({
  entry,
  index,
  size,
  priority,
}: {
  entry: CatalogEntry;
  index: number;
  size: CardSize;
  priority?: boolean;
}) {
  const { language } = useLanguage();
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const title = entry.title[language];
  const href = `/cases/${entry.slug}`;
  const external = entry.url && /^https?:/.test(entry.url);

  // Start loading the preview about a screen and a half before the card arrives instead of
  // leaving the distance to the browser's lazy loading, which can start late on a phone
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setNear(true);
        io.disconnect();
      }
    }, { rootMargin: "150% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Touch screens have no hover: the preview plays while the card is mostly on screen
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(([e]) => setActive(e.intersectionRatio >= 0.6), { threshold: [0, 0.6, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Cursor-following light on the card surface
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article
      ref={ref}
      onPointerEnter={(e) => e.pointerType === "mouse" && setActive(true)}
      onPointerLeave={() => setActive(false)}
      onPointerMove={onMove}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className={clsx(
        "catalog-card group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-bg-elevated",
        entry.signature ? "catalog-card--signature border-transparent" : "border-border",
        "transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-border-hover hover:shadow-[0_30px_60px_-30px_rgba(10,10,10,0.25)] motion-reduce:hover:translate-y-0"
      )}
    >
      <NextLink
        href={href}
        className="relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 rounded-t-2xl"
        aria-label={title}
        data-cursor={pick({ en: "Open", ru: "Открыть", zh: "打开", tr: "Aç", ar: "فتح" }, language)}
      >
        {/* Browser chrome */}
        <div className="flex h-9 items-center gap-3 border-b border-border bg-bg-secondary px-3.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/80" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
          </span>
          <span className="mx-auto flex min-w-0 max-w-[70%] items-center gap-1.5 rounded-md bg-bg-tertiary px-3 py-0.5 font-mono text-[11px] text-text-tertiary">
            <svg className="h-3 w-3 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            <span className="truncate">{entry.domain}</span>
          </span>
          <span className="w-[42px]" aria-hidden="true" />
        </div>

        <div className={clsx("cv-media relative overflow-hidden bg-bg-tertiary", size === "wide" ? "aspect-[16/10]" : "aspect-[16/11]")}>
          <CatalogMedia
            entry={entry}
            title={title}
            label={CATEGORY_LABEL[entry.category][language]}
            active={active}
            sizes={SIZES[size]}
            priority={priority || near}
          />
          {entry.signature && (
            <span className="catalog-signature pointer-events-none absolute left-3 top-3 z-10 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold text-white shadow-lg">
              <span aria-hidden="true">✦</span>
              <span className="truncate">{entry.signature[language]}</span>
            </span>
          )}
        </div>
      </NextLink>

      <div className="relative flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary">
          <span className="text-text-muted">{pad(index + 1)}</span>
          <span>{CATEGORY_LABEL[entry.category][language]}</span>
          <span>{entry.year}</span>
        </div>

        <h3 className={clsx("font-display font-semibold tracking-tight text-text-primary", size === "third" ? "text-heading-lg" : "text-heading-xl")}>
          <NextLink href={href} className="transition-colors hover:text-accent-primary focus:outline-none focus-visible:text-accent-primary">
            {title}
          </NextLink>
        </h3>
        <p className="mt-1 text-body-sm text-text-tertiary">{entry.client[language]}</p>

        {size !== "third" && (
          <p className="mt-3 line-clamp-2 text-body-sm text-text-secondary">{entry.summary[language]}</p>
        )}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-5">
          <ul className="flex flex-wrap gap-1.5">
            {entry.tags[language].slice(0, size === "third" ? 2 : 3).map((t) => (
              <li key={t} className="rounded-full border border-border px-2.5 py-0.5 text-caption text-text-secondary">
                {t}
              </li>
            ))}
          </ul>
          {entry.url && (
            <a
              href={entry.url}
              target="_blank"
              rel={external ? "noopener noreferrer" : undefined}
              className="relative z-10 inline-flex items-center gap-1 text-body-sm font-medium text-text-secondary transition-colors hover:text-accent-primary"
            >
              {pick({ en: "Open site", ru: "Открыть сайт", zh: "打开网站", tr: "Siteyi aç", ar: "افتح الموقع" }, language)}
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
