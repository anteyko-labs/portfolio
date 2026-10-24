"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { useReducedMotion } from "@/lib/hooks";
import { EASE, useLoop } from "@/components/motion/kit";
import { PACKAGE_SLUGS, SERVICE_GROUPS, type PackageId, type ServiceGroup } from "@/lib/service-slugs";
import { PKG_COLOR } from "./visual-frame";

// /services hero: the headline, a switch between the four directions, and the
// open direction's services in one neat row. The switch moves on its own every
// few seconds (a thin bar in the active pill shows when) until someone picks a
// direction. A service opens its card in the catalog below; "All services"
// opens the direction's folder.

const STEP = 5000;

const SHORT: Record<ServiceGroup, { en: string; ru: string; zh: string; tr: string; ar: string }> = {
  build: { en: "Development", ru: "Разработка", zh: "开发", tr: "Geliştirme", ar: "التطوير" },
  brand: { en: "Brand", ru: "Бренд", zh: "品牌", tr: "Marka", ar: "العلامة" },
  industry: { en: "Industries", ru: "Отрасли", zh: "行业", tr: "Sektörler", ar: "القطاعات" },
  care: { en: "Modules", ru: "Модули", zh: "模块", tr: "Modüller", ar: "الوحدات" },
};

export function ServicesHero({ onPick }: { onPick: (g: ServiceGroup, slug?: string) => void }) {
  const { translations, language } = useLanguage();
  const reduced = useReducedMotion();
  const packages = translations.packages.items;
  const groups = SERVICE_GROUPS.map((g) => ({ ...g, items: packages.filter((p) => p.group === g.id) })).filter((g) => g.items.length);

  // auto-advances until a direction is picked by hand
  const [picked, setPicked] = useState<number | null>(null);
  const { ref, tick } = useLoop<HTMLDivElement>(STEP);
  const active = picked ?? (reduced ? 0 : tick % groups.length);
  const auto = picked === null && !reduced;
  const g = groups[active];
  const color = PKG_COLOR[g.items[0].id];

  const lines = [
    pick({ en: "Services", ru: "Услуги", zh: "服务", tr: "Hizmetler", ar: "الخدمات" }, language),
    pick({ en: "end to end", ru: "под ключ", zh: "全流程交付", tr: "uçtan uca", ar: "من البداية إلى النهاية" }, language),
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#06060B] pb-14 pt-14 text-white md:pb-20 md:pt-16">
      <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10 opacity-50" />
      {/* a soft glow in the open direction's colour */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[55%] -z-10 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[background] duration-1000" style={{ background: `radial-gradient(closest-side, rgb(${color} / 0.14), transparent)` }} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "64px 64px" }}
      />

      <div ref={ref} className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center font-brand text-[2.6rem] font-semibold leading-[1] tracking-[-0.035em] sm:text-6xl lg:text-[4.5rem]">
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

        {/* the switch */}
        <div className="hero-in mt-10 flex justify-center md:mt-12" style={{ ["--d" as string]: "0.3s" }}>
          <div role="tablist" aria-label={pick({ en: "Directions", ru: "Направления", zh: "方向", tr: "Alanlar", ar: "المجالات" }, language)} className="scrollbar-hide flex max-w-full gap-0.5 overflow-x-auto rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md sm:gap-1 sm:p-1.5">
            {groups.map((d, i) => {
              const on = i === active;
              const c = PKG_COLOR[d.items[0].id];
              return (
                <button
                  key={d.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setPicked(i)}
                  className={`relative shrink-0 rounded-full px-2.5 py-2 text-[12.5px] font-medium transition-colors duration-300 sm:px-6 sm:text-[15px] ${on ? "text-white" : "text-white/55 hover:text-white/85"}`}
                >
                  {on && (
                    <motion.span
                      layoutId="svc-hero-pill"
                      aria-hidden="true"
                      className="absolute inset-0 overflow-hidden rounded-full"
                      style={{ background: `rgb(${c} / 0.18)`, boxShadow: `inset 0 0 0 1px rgb(${c} / 0.45)` }}
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    >
                      {/* time until the switch moves on */}
                      {auto && <motion.span key={tick} className="absolute bottom-0 left-0 h-[2px] w-full origin-left" style={{ background: `rgb(${c})` }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: STEP / 1000, ease: "linear" }} />}
                    </motion.span>
                  )}
                  <span className="relative inline-flex items-center gap-1.5 sm:gap-2">
                    <span aria-hidden="true" className="hidden h-1.5 w-1.5 rounded-full sm:block" style={{ background: `rgb(${c})` }} />
                    {pick(SHORT[d.id], language)}
                    <span className="hidden font-mono text-[11px] text-white/35 sm:inline">{d.items.length}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* the open direction's services */}
        <div className="mx-auto mt-6 min-h-[262px] max-w-5xl md:mt-10 lg:min-h-[220px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={g.id}
              role="tabpanel"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className={`grid gap-2 sm:gap-3 ${g.items.length === 1 ? "mx-auto max-w-sm" : g.items.length === 2 ? "mx-auto max-w-2xl grid-cols-2" : "grid-cols-2 lg:grid-cols-3"}`}>
                {g.items.map((p, k) => {
                  const c = PKG_COLOR[p.id];
                  return (
                    <motion.button
                      key={p.id}
                      type="button"
                      onClick={() => onPick(p.group, PACKAGE_SLUGS[p.id as PackageId])}
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 + k * 0.05, ease: EASE }}
                      className="group flex items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-3 text-left sm:gap-4 sm:px-5 sm:py-4 transition-[background-color,border-color] duration-300 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                      style={{ ["--c" as string]: c }}
                    >
                      <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full" style={{ background: `rgb(${c})`, boxShadow: `0 0 10px rgb(${c} / 0.6)` }} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium text-white sm:text-[15px]">{pick(p.title, language)}</span>
                        <span className="mt-0.5 block font-mono text-[11px] text-white/40"><span className="sm:hidden">{pick(p.startingPrice, language)}</span><span className="hidden sm:inline">{pick(p.timeline, language)}</span></span>
                      </span>
                      <span className="hidden shrink-0 font-mono text-[12px] text-white/70 sm:inline">{pick(p.startingPrice, language)}</span>
                      <span aria-hidden="true" className="hidden shrink-0 text-white/30 sm:inline transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-white/70">→</span>
                    </motion.button>
                  );
                })}
              </div>
              <div className="mt-6 text-center">
                <button type="button" onClick={() => onPick(g.id)} className="inline-flex items-center gap-2 text-body-sm font-medium transition-opacity hover:opacity-80" style={{ color: `rgb(${color})` }}>
                  {pick({ en: "All services in this direction", ru: "Все услуги направления", zh: "查看该方向全部服务", tr: "Bu alandaki tüm hizmetler", ar: "كل خدمات هذا المجال" }, language)} <span aria-hidden="true">→</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
