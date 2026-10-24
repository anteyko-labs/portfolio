"use client";

import { Fragment, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, useLoop } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { PACKAGE_SLUGS, SERVICE_GROUPS, type PackageId, type ServiceGroup } from "@/lib/service-slugs";
import { PKG_COLOR } from "./visual-frame";

// /services hero: the headline on the left, and on the right a flat card box
// holding every service as an index card (see CardIndex).


export function ServicesHero({ onPick }: { onPick: (g: ServiceGroup, slug?: string) => void }) {
  const { language } = useLanguage();
  const lines = [
    pick({ en: "Services", ru: "Услуги", zh: "服务", tr: "Hizmetler", ar: "الخدمات" }, language),
    pick({ en: "end to end", ru: "под ключ", zh: "全流程交付", tr: "uçtan uca", ar: "من البداية إلى النهاية" }, language),
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#06060B] pb-14 pt-14 text-white md:pb-20 md:pt-16">
      <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "64px 64px" }}
      />

      <div className="container relative mx-auto grid items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <h1 className="font-brand text-[3rem] font-semibold leading-[0.95] tracking-[-0.035em] sm:text-7xl xl:text-[5.5rem]">
          {lines.map((line, i) => (
            <Fragment key={i}>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-rise block" style={{ ["--d" as string]: `${0.08 + i * 0.12}s` }}>
                  <span className={i === 0 ? "home-gradient-text" : undefined}>{line}</span>
                </span>
              </span>
              {i === 0 ? " " : null}
            </Fragment>
          ))}
        </h1>

        <CardIndex onPick={onPick} />
      </div>
    </section>
  );
}

/* ───────────── A card box: every service is an index card ───────────── */

// The catalog's own cards, filed in a flat box: each one shows its top edge
// (direction colour, name, price). The card under the cursor, or each in turn,
// rises a little and its details show on the front of the box. A click opens
// that very card in the catalog below. Only transforms and opacity animate.
const STEP = 3800;

function CardIndex({ onPick }: { onPick: (g: ServiceGroup, slug?: string) => void }) {
  const { translations, language } = useLanguage();
  const reduced = useReducedMotion();
  const packages = translations.packages.items;
  // filed by direction, like the catalog
  const cards = SERVICE_GROUPS.flatMap((g) => packages.filter((p) => p.group === g.id));
  const [hover, setHover] = useState<number | null>(null);
  const timer = useRef(0);
  const rest = (i: number | null) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setHover(i), i === null ? 0 : 120);
  };
  const { ref, tick } = useLoop<HTMLDivElement>(STEP);
  const active = hover ?? (reduced ? 0 : tick % cards.length);
  const p = cards[active];
  const c = PKG_COLOR[p.id];
  const groupOf = (id: ServiceGroup) => SERVICE_GROUPS.find((g) => g.id === id)!;
  const go = (k: number) => onPick(cards[k].group, PACKAGE_SLUGS[cards[k].id as PackageId]);

  return (
    <div ref={ref} className="hero-up mx-auto w-full max-w-[540px]" onMouseLeave={() => rest(null)}>
      <div className="rounded-[26px] border border-white/[0.08] p-3 shadow-[0_40px_80px_-50px_rgba(0,0,0,0.9)] sm:p-4" style={{ background: "linear-gradient(180deg, rgba(20,20,30,0.85), rgba(10,10,16,0.92))" }}>
        <div className="mb-3 flex items-center justify-between px-2 font-mono text-[11px] text-white/40">
          <span>{pick({ en: "Card index", ru: "Картотека", zh: "卡片目录", tr: "Kart dizini", ar: "فهرس البطاقات" }, language)}</span>
          <span>{String(active + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}</span>
        </div>

        {/* the cards' top edges, filed one behind another */}
        <div className="relative">
          {cards.map((card, k) => {
            const on = k === active;
            const cc = PKG_COLOR[card.id];
            return (
              <button
                key={card.id}
                type="button"
                onMouseEnter={() => rest(k)}
                onFocus={() => setHover(k)}
                onClick={() => go(k)}
                aria-label={pick(card.title, language)}
                className="relative -mt-2 flex h-[34px] w-full items-center gap-2.5 rounded-t-[12px] border border-b-0 px-3.5 text-left transition-[background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] first:mt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:px-4"
                style={{
                  zIndex: k + 1,
                  background: on ? `linear-gradient(180deg, color-mix(in srgb, rgb(${cc}) 16%, #1D1D29), #181822)` : `linear-gradient(180deg, #1C1C27, #161620)`,
                  borderColor: on ? `rgb(${cc} / 0.45)` : "rgba(255,255,255,0.07)",
                  boxShadow: "0 -8px 14px -10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                <span aria-hidden="true" className="absolute inset-y-1.5 left-0 w-[2px] rounded-full transition-opacity duration-500" style={{ background: `rgb(${cc})`, opacity: on ? 1 : 0 }} />
                <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full" style={{ background: `rgb(${cc})`, boxShadow: on ? `0 0 10px rgb(${cc})` : "none" }} />
                <span className={`min-w-0 flex-1 truncate text-[13px] transition-colors duration-500 ${on ? "text-white" : "text-white/65"}`}>{pick(card.title, language)}</span>
                <span className={`shrink-0 font-mono text-[11px] transition-colors duration-500 ${on ? "text-white/80" : "text-white/35"}`}>{pick(card.startingPrice, language)}</span>
              </button>
            );
          })}

          {/* the front card: the active service in full */}
          <button
            type="button"
            onClick={() => go(active)}
            className="relative z-[40] -mt-2 block w-full overflow-hidden rounded-[16px] border p-5 text-left transition-[border-color] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:p-6"
            style={{ background: "linear-gradient(180deg, #1A1A25, #111119)", borderColor: `rgb(${c} / 0.3)`, boxShadow: `0 -10px 20px -12px rgba(0,0,0,0.9), 0 24px 50px -36px rgb(${c} / 0.6)` }}
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px]" style={{ background: `linear-gradient(90deg, rgb(${c}), transparent 70%)` }} />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={p.id}
                className="block"
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <span className="block font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: `rgb(${c})` }}>{pick(groupOf(p.group).label, language)}</span>
                <span className="mt-1.5 block font-brand text-[1.45rem] font-semibold leading-tight text-white sm:text-[1.7rem]">{pick(p.title, language)}</span>
                <span className="mt-2 line-clamp-2 block min-h-[2.6em] text-[14px] leading-snug text-white/60">{pick(p.description, language)}</span>
                <span className="mt-4 flex items-center justify-between gap-4">
                  <span className="whitespace-nowrap font-mono text-[12px] text-white/50">
                    {pick(p.timeline, language)} · <span className="text-white/85">{pick(p.startingPrice, language)}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-body-sm font-medium" style={{ color: `rgb(${c})` }}>
                    <span className="hidden sm:inline">{pick({ en: "Open the card", ru: "Открыть карточку", zh: "查看卡片", tr: "Kartı aç", ar: "افتح البطاقة" }, language)}</span> <span aria-hidden="true">→</span>
                  </span>
                </span>
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
}
