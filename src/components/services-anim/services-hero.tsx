"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { EASE, useLoop } from "@/components/motion/kit";
import { ButtonLink } from "@/components/ui/link";
import { SERVICE_GROUPS } from "@/lib/service-slugs";
import { PKG_COLOR } from "./visual-frame";

// /services hero. Left: headline (CSS-animated, so it paints before hydration),
// what the catalog holds, two actions. Right: a deck of index cards, one per
// service; every few seconds the front card lifts away and the next one comes
// forward. The deck ticks only while it is on screen.

const DEPTH = 4;

/** "From $800" / "От $3k" → 800 / 3000; "By agreement" → Infinity */
const usd = (label: string) => {
  const m = label.match(/\$(\d+(?:\.\d+)?)(k?)/i);
  return m ? Number(m[1]) * (m[2] ? 1000 : 1) : Infinity;
};

export function ServicesHero() {
  const { t, translations, language } = useLanguage();
  const packages = translations.packages.items;
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(2600);
  const front = reduced ? 0 : tick % packages.length;
  const visible = Array.from({ length: DEPTH }, (_, d) => packages[(front + d) % packages.length]);
  const min = Math.min(...packages.map((p) => usd(p.startingPrice.en)));
  const groupOf = (g: string) => SERVICE_GROUPS.find((x) => x.id === g)!;

  const stats = [
    { v: String(packages.length), l: pick({ en: "services", ru: "услуг", zh: "项服务", tr: "hizmet", ar: "خدمة" }, language) },
    { v: String(SERVICE_GROUPS.length), l: pick({ en: "directions", ru: "направления", zh: "个方向", tr: "alan", ar: "مجالات" }, language) },
    { v: `$${min}`, l: pick({ en: "starting price", ru: "стартовая цена", zh: "起步价", tr: "başlangıç fiyatı", ar: "السعر الابتدائي" }, language) },
    { v: pick({ en: "24h", ru: "24ч", zh: "24 小时", tr: "24 sa", ar: "24 ساعة" }, language), l: pick({ en: "to an estimate", ru: "до оценки", zh: "内出报价", tr: "içinde teklif", ar: "حتى التقدير" }, language) },
  ];

  const lines = [
    pick({ en: "Services", ru: "Услуги", zh: "服务", tr: "Hizmetler", ar: "الخدمات" }, language),
    pick({ en: "end to end", ru: "под ключ", zh: "全流程交付", tr: "uçtan uca", ar: "من البداية إلى النهاية" }, language),
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#06060B] pb-16 pt-16 text-white md:pb-24 md:pt-20">
      <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "64px 64px" }}
      />

      <div className="container relative mx-auto grid items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <p className="hero-in inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {pick({ en: "Service catalog", ru: "Каталог услуг", zh: "服务目录", tr: "Hizmet kataloğu", ar: "دليل الخدمات" }, language)}
          </p>

          <h1 className="mt-6 font-brand text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl xl:text-7xl">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <span className="hero-rise block" style={{ ["--d" as string]: `${0.08 + i * 0.12}s` }}>
                  <span className={i === 0 ? "home-gradient-text block" : "block"}>{line}</span>
                </span>
                {/* keeps the lines apart in the text crawlers read */}
                {i === 0 ? " " : null}
              </span>
            ))}
          </h1>

          <p className="hero-in mt-6 max-w-xl text-body-lg text-white/60" style={{ ["--d" as string]: "0.3s" }}>
            {t("packages.subtitle")}
          </p>

          <dl className="hero-in mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4" style={{ ["--d" as string]: "0.4s" }}>
            {stats.map((s) => (
              <div key={s.l} className="border-l border-white/10 pl-4">
                <dt className="sr-only">{s.l}</dt>
                <dd className="font-brand text-3xl font-semibold tabular-nums text-white">{s.v}</dd>
                <dd className="mt-1 text-caption text-white/50">{s.l}</dd>
              </div>
            ))}
          </dl>

          <div className="hero-in mt-10 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "0.5s" }}>
            <a
              href="#catalog"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("catalog")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-body-md font-medium text-[#06060B] transition-transform hover:-translate-y-0.5"
            >
              {pick({ en: "Browse services", ru: "Смотреть услуги", zh: "浏览服务", tr: "Hizmetlere göz at", ar: "تصفّح الخدمات" }, language)}
              <span aria-hidden="true">↓</span>
            </a>
            <ButtonLink href="/contact" buttonVariant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              {t("cta.primary")}
            </ButtonLink>
          </div>
        </div>

        {/* the deck */}
        <div ref={ref} className="hero-up relative mx-auto h-[360px] w-full max-w-[440px]" aria-hidden="true">
          <AnimatePresence initial={false}>
            {visible.map((p, d) => {
              const color = PKG_COLOR[p.id];
              const group = groupOf(p.group);
              const n = packages.indexOf(p) + 1;
              return (
                <motion.div
                  key={p.id}
                  className="absolute inset-x-0 bottom-0 flex h-[270px] flex-col rounded-2xl border border-white/10 p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]"
                  style={{ zIndex: DEPTH - d, transformOrigin: "50% 100%", background: d === 0 ? "#12121C" : `color-mix(in srgb, #12121C ${100 - d * 14}%, #000)` }}
                  initial={{ opacity: 0, y: -DEPTH * 26, scale: 1 - DEPTH * 0.04 }}
                  animate={{ opacity: 1 - d * 0.12, y: -d * 26, scale: 1 - d * 0.04 }}
                  exit={{ opacity: 0, y: 60, rotate: -4, scale: 1.03, transition: { duration: 0.55, ease: EASE } }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  {/* index tab */}
                  <span className="absolute -top-3 max-w-[60%] truncate rounded-t-lg rounded-br-lg px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white" style={{ background: `rgb(${color})`, left: `${24 + (packages.indexOf(p) % 3) * 104}px` }}>
                    {pick(group.label, language)}
                  </span>
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-caption text-white/40">
                      {String(n).padStart(2, "0")} / {String(packages.length).padStart(2, "0")}
                    </span>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: `rgb(${color})`, boxShadow: `0 0 16px rgb(${color})` }} />
                  </div>
                  <p className="mt-4 font-brand text-2xl font-semibold leading-tight text-white">{pick(p.title, language)}</p>
                  <p className="mt-1 text-body-sm text-white/50">{pick(p.timeline, language)}</p>
                  <ul className="mt-4 space-y-1.5">
                    {p.deliverables[language].slice(0, 2).map((x) => (
                      <li key={x} className="flex items-center gap-2 truncate text-body-sm text-white/70">
                        <span className="h-1 w-3 shrink-0 rounded-full" style={{ background: `rgb(${color})` }} />
                        <span className="truncate">{x}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">{pick({ en: "from", ru: "цена", zh: "价格", tr: "fiyat", ar: "السعر" }, language)}</span>
                    <span className="font-brand text-xl font-semibold" style={{ color: `rgb(${color})` }}>{pick(p.startingPrice, language)}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
