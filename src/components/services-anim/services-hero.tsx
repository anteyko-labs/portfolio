"use client";

import { Fragment, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { pick, type Language } from "@/lib/i18n-text";
import { EASE, useLoop } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";
import { SERVICE_GROUPS, type ServiceGroup } from "@/lib/service-slugs";
import { PKG_COLOR } from "./visual-frame";

// /services hero: the headline, and under it the four directions as wide
// panels. One panel is open at a time (the one under the cursor, or each in
// turn): it widens, the others narrow, and it shows its services with prices.
// A click opens that direction in the catalog below. On phones the panels
// stack as an accordion. Loops tick only while the hero is on screen.

const CYCLE = 5000;

/** "1 услуга / 3 услуги / 6 услуг", "1 service / 4 services" */
function countLabel(count: number, language: Language) {
  if (language === "ru") {
    const m10 = count % 10, m100 = count % 100;
    const w = m10 === 1 && m100 !== 11 ? "услуга" : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? "услуги" : "услуг";
    return `${count} ${w}`;
  }
  if (language === "en") return `${count} ${count === 1 ? "service" : "services"}`;
  return `${count} ${pick({ en: "", ru: "", zh: "项服务", tr: "hizmet", ar: "خدمات" }, language)}`;
}

/** Short names for the narrow panels */
const SHORT: Record<ServiceGroup, { en: string; ru: string; zh: string; tr: string; ar: string }> = {
  build: { en: "Development", ru: "Разработка", zh: "开发", tr: "Geliştirme", ar: "التطوير" },
  brand: { en: "Brand", ru: "Бренд", zh: "品牌", tr: "Marka", ar: "العلامة" },
  industry: { en: "Industries", ru: "Отрасли", zh: "行业", tr: "Sektörler", ar: "القطاعات" },
  care: { en: "Modules", ru: "Модули", zh: "模块", tr: "Modüller", ar: "الوحدات" },
};

/** A line icon per direction */
const ICON: Record<ServiceGroup, string[]> = {
  build: ["M9 7 4 12l5 5", "M15 7l5 5-5 5", "M13.5 5l-3 14"],
  brand: ["M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"],
  industry: ["M3 21V10l6 4V10l6 4V6h6v15z", "M3 21h18", "M17 10h2", "M17 14h2"],
  care: ["M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"],
};

function Icon({ id, color, draw }: { id: ServiceGroup; color: string; draw: boolean }) {
  const reduced = useReducedMotion();
  return (
    <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border" style={{ borderColor: `rgb(${color} / 0.35)`, background: `rgb(${color} / 0.1)` }}>
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={`rgb(${color})`} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {ICON[id].map((d, k) => (
          <motion.path key={`${k}-${draw}`} d={d} initial={reduced || !draw ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.15 + k * 0.12, ease: EASE }} />
        ))}
      </svg>
    </span>
  );
}

type Group = (typeof SERVICE_GROUPS)[number] & { items: ReturnType<typeof useLanguage>["translations"]["packages"]["items"][number][] };

export function ServicesHero({ onPick }: { onPick: (g: ServiceGroup) => void }) {
  const { translations, language } = useLanguage();
  const packages = translations.packages.items;
  const reduced = useReducedMotion();
  const groups: Group[] = SERVICE_GROUPS.map((g) => ({ ...g, items: packages.filter((p) => p.group === g.id) })).filter((g) => g.items.length);
  const colors = groups.map((g) => PKG_COLOR[g.items[0].id]);

  // the open panel: the one under the cursor (after a short rest), or each in turn
  const [hover, setHover] = useState<number | null>(null);
  const timer = useRef(0);
  const rest = (i: number | null) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setHover(i), i === null ? 0 : 110);
  };
  const { ref, tick } = useLoop<HTMLDivElement>(CYCLE);
  const open = hover ?? (reduced ? 0 : tick % groups.length);
  const auto = hover === null && !reduced;
  // phones: no auto-cycling, which would fold and unfold rows under the thumb
  const [mOpen, setMOpen] = useState(0);

  const lines = [
    pick({ en: "Services", ru: "Услуги", zh: "服务", tr: "Hizmetler", ar: "الخدمات" }, language),
    pick({ en: "end to end", ru: "под ключ", zh: "全流程交付", tr: "uçtan uca", ar: "من البداية إلى النهاية" }, language),
  ];
  const openLabel = pick({ en: "Open", ru: "Открыть", zh: "打开", tr: "Aç", ar: "افتح" }, language);
  const openDirection = pick({ en: "Open the direction", ru: "Открыть направление", zh: "查看方向", tr: "Alanı aç", ar: "افتح المجال" }, language);

  return (
    <section className="relative isolate overflow-hidden bg-[#06060B] pb-16 pt-16 text-white md:pb-24 md:pt-20">
      <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10 opacity-70" />
      {/* one soft glow in the colour of the open direction; layers cross-fade */}
      {colors.map((c, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[700px] w-[1100px] -translate-x-1/2 rounded-full transition-opacity duration-[1600ms] ease-in-out"
          style={{ background: `radial-gradient(closest-side, rgb(${c} / 0.16), transparent)`, opacity: i === open ? 1 : 0 }}
        />
      ))}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "64px 64px" }}
      />

      <div ref={ref} className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center font-brand text-[3.4rem] font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-[6.5rem]">
          {lines.map((line, i) => (
            <Fragment key={i}>
              <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span className="hero-rise inline-block" style={{ ["--d" as string]: `${0.08 + i * 0.12}s` }}>
                  <span className={i === 0 ? "home-gradient-text" : undefined}>{line}</span>
                </span>
              </span>
              {i === 0 ? " " : null}
            </Fragment>
          ))}
        </h1>

        {/* desktop: panels in a row; the open one widens */}
        <div className="hero-up mt-12 hidden h-[400px] gap-3 md:flex lg:mt-16" onMouseLeave={() => rest(null)}>
          {groups.map((g, i) => {
            const on = i === open;
            const c = colors[i];
            return (
              <button
                key={g.id}
                type="button"
                onMouseEnter={() => rest(i)}
                onFocus={() => setHover(i)}
                onClick={() => onPick(g.id)}
                aria-label={`${openLabel}: ${pick(g.label, language)}`}
                aria-expanded={on}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-[28px] border text-left transition-[flex-grow,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                style={{
                  flexGrow: on ? 3.2 : 1,
                  flexBasis: 0,
                  background: "linear-gradient(180deg, #14141D 0%, #0C0C13 100%)",
                  borderColor: on ? `rgb(${c} / 0.35)` : "rgba(255,255,255,0.07)",
                  boxShadow: on ? `0 40px 80px -50px rgb(${c} / 0.7), inset 0 1px 0 rgba(255,255,255,0.07)` : "inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px transition-opacity duration-700" style={{ background: `linear-gradient(90deg, transparent, rgb(${c}), transparent)`, opacity: on ? 1 : 0.25 }} />
                <span aria-hidden="true" className="absolute -right-24 -top-24 h-64 w-64 rounded-full transition-opacity duration-700" style={{ background: `radial-gradient(closest-side, rgb(${c} / 0.2), transparent)`, opacity: on ? 1 : 0 }} />

                <span className="relative flex h-full flex-col p-6 lg:p-7">
                  <span className="flex items-start justify-between gap-3">
                    <Icon id={g.id} color={c} draw={on} />
                    <span className="font-mono text-[11px] text-white/35">{String(i + 1).padStart(2, "0")}</span>
                  </span>

                  <span className="mt-auto">
                    <span className={`block font-brand font-semibold leading-[1.05] tracking-[-0.02em] text-white transition-[font-size] duration-500 ${on ? "text-[1.9rem] lg:text-[2.2rem]" : "text-[1.15rem] lg:text-[1.3rem]"}`}>
                      {/* a narrow panel shows the short name */}
                      {on ? pick(g.label, language) : pick(SHORT[g.id], language)}
                    </span>
                    <span className="mt-2 block font-mono text-[11px] text-white/45">{countLabel(g.items.length, language)}</span>

                    {/* the open panel's services */}
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.span
                          key="list"
                          className="block"
                          initial={reduced ? false : { opacity: 0 }}
                          animate={{ opacity: 1, transition: { duration: 0.45, delay: 0.3 } }}
                          exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        >
                          <span className={`mt-6 grid gap-x-8 gap-y-2.5 ${g.items.length > 3 ? "grid-cols-2" : "grid-cols-1"}`}>
                            {g.items.map((p, k) => (
                              <motion.span
                                key={p.id}
                                className="flex items-center justify-between gap-3 border-b border-white/[0.06] pb-2 text-[14px]"
                                initial={reduced ? false : { opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: 0.35 + k * 0.05, ease: EASE }}
                              >
                                <span className="flex min-w-0 items-center gap-2 text-white/85">
                                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: `rgb(${PKG_COLOR[p.id]})` }} />
                                  <span className="truncate">{pick(p.title, language)}</span>
                                </span>
                                <span className="shrink-0 font-mono text-[11px] text-white/40">{pick(p.startingPrice, language)}</span>
                              </motion.span>
                            ))}
                          </span>
                          <span className="mt-6 flex items-center justify-between gap-6">
                            <span className="inline-flex items-center gap-2 text-body-sm font-medium" style={{ color: `rgb(${c})` }}>
                              {openDirection}
                              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                            </span>
                            {/* time until the next panel opens on its own */}
                            <span aria-hidden="true" className="h-[2px] w-24 overflow-hidden rounded-full bg-white/[0.08] transition-opacity duration-500" style={{ opacity: auto ? 1 : 0 }}>
                              {auto && <motion.span key={`${g.id}-${tick}`} className="block h-full origin-left rounded-full" style={{ background: `rgb(${c})` }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: CYCLE / 1000, ease: "linear" }} />}
                            </span>
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* phones: an accordion; a tap opens a panel, a tap on the open one opens it below */}
        <div className="hero-up mt-10 space-y-3 md:hidden">
          {groups.map((g, i) => {
            const on = i === mOpen;
            const c = colors[i];
            return (
              <div key={g.id} className="overflow-hidden rounded-[22px] border transition-colors duration-500" style={{ background: "linear-gradient(180deg, #14141D, #0C0C13)", borderColor: on ? `rgb(${c} / 0.35)` : "rgba(255,255,255,0.07)" }}>
                <button type="button" onClick={() => (on ? onPick(g.id) : setMOpen(i))} aria-expanded={on} className="flex w-full items-center gap-4 p-4 text-left">
                  <Icon id={g.id} color={c} draw={on} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-brand text-lg font-semibold leading-tight text-white">{pick(g.label, language)}</span>
                    <span className="block font-mono text-[11px] text-white/45">{countLabel(g.items.length, language)}</span>
                  </span>
                  <span aria-hidden="true" className="transition-transform duration-500" style={{ transform: on ? "rotate(90deg)" : "none", color: on ? `rgb(${c})` : "rgba(255,255,255,0.4)" }}>→</span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="space-y-2 px-4 pb-4">
                      {g.items.map((p) => (
                        <div key={p.id} className="flex items-center justify-between gap-3 border-b border-white/[0.06] pb-2 text-[13px]">
                          <span className="flex min-w-0 items-center gap-2 text-white/85">
                            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: `rgb(${PKG_COLOR[p.id]})` }} />
                            <span className="truncate">{pick(p.title, language)}</span>
                          </span>
                          <span className="shrink-0 font-mono text-[11px] text-white/40">{pick(p.startingPrice, language)}</span>
                        </div>
                      ))}
                      <button type="button" onClick={() => onPick(g.id)} className="mt-2 inline-flex items-center gap-2 text-body-sm font-medium" style={{ color: `rgb(${c})` }}>
                        {openDirection} <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
