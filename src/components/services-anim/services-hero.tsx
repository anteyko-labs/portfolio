"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { EASE, useLoop } from "@/components/motion/kit";
import { ButtonLink } from "@/components/ui/link";
import { useReducedMotion } from "@/lib/hooks";
import { SERVICE_GROUPS, type ServiceGroup } from "@/lib/service-slugs";
import { PKG_COLOR } from "./visual-frame";

// /services hero. Left: headline (CSS-animated, so it paints before hydration),
// what the catalog holds, two actions. Right: the four directions as folders in
// a card index. The back ones peek out by their tabs; hovering one lifts it over
// the others, and a click opens the same folder in the catalog below and scrolls
// there. Without a hover the folders take turns (ticking only while on screen).


/** "From $800" / "От $3k" → 800 / 3000; "By agreement" → Infinity */
const usd = (label: string) => {
  const m = label.match(/\$(\d+(?:\.\d+)?)(k?)/i);
  return m ? Number(m[1]) * (m[2] ? 1000 : 1) : Infinity;
};

export function ServicesHero({ onPick }: { onPick: (g: ServiceGroup) => void }) {
  const { t, translations, language } = useLanguage();
  const packages = translations.packages.items;
  const reduced = useReducedMotion();
  const min = Math.min(...packages.map((p) => usd(p.startingPrice.en)));

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

        <Folders onPick={onPick} />
      </div>
    </section>
  );
}

/* ───────────── The four directions as folders ───────────── */

/** Short names for the folder tabs, where the full label doesn't fit */
const TAB: Record<ServiceGroup, Record<"en" | "ru" | "zh" | "tr" | "ar", string>> = {
  build: { en: "Development", ru: "Разработка", zh: "开发", tr: "Geliştirme", ar: "التطوير" },
  brand: { en: "Brand", ru: "Бренд", zh: "品牌", tr: "Marka", ar: "العلامة" },
  industry: { en: "Industries", ru: "Отрасли", zh: "行业", tr: "Sektörler", ar: "القطاعات" },
  care: { en: "Modules", ru: "Модули", zh: "模块", tr: "Modüller", ar: "الوحدات" },
};

function Folders({ onPick }: { onPick: (g: ServiceGroup) => void }) {
  const { translations, language } = useLanguage();
  const packages = translations.packages.items;
  const groups = SERVICE_GROUPS.map((g) => ({ ...g, items: packages.filter((p) => p.group === g.id) })).filter((g) => g.items.length);
  const [hover, setHover] = useState<number | null>(null);
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(3000);
  const n = groups.length;
  const focus = hover ?? (reduced ? 0 : tick % n);
  const svc = pick({ en: "services", ru: "услуг", zh: "项服务", tr: "hizmet", ar: "خدمات" }, language);

  return (
    <div ref={ref} className="hero-up relative mx-auto h-[450px] w-full max-w-[460px]" onMouseLeave={() => setHover(null)}>
      {groups.map((g, i) => {
        // each folder keeps its place and layer in the stack (the first one in
        // front); the focused one slides up out of the stack, so it never moves
        // away from the cursor or covers another folder's tab
        const d = i;
        const on = i === focus;
        const color = PKG_COLOR[g.items[0].id];
        return (
          <motion.button
            key={g.id}
            type="button"
            onClick={() => onPick(g.id)}
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            aria-label={`${pick({ en: "Open", ru: "Открыть", zh: "打开", tr: "Aç", ar: "افتح" }, language)}: ${pick(g.label, language)}`}
            className={`absolute inset-x-0 bottom-0 flex h-[280px] flex-col justify-start rounded-2xl ${i === 0 ? "rounded-tl-none" : ""} border border-white/10 text-left shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60`}
            style={{ zIndex: n - d, transformOrigin: "50% 100%", background: d === 0 ? "#13131D" : `color-mix(in srgb, #13131D ${100 - d * 10}%, #000)` }}
            initial={false}
            animate={{ y: -d * 36 - (on && d > 0 ? 26 : 0), scale: 1 - d * 0.03, opacity: on ? 1 : 1 - d * 0.1 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {/* the folder tab, at its own place so all four stay visible */}
            <span
              className="absolute -top-8 flex h-8 items-center gap-1.5 truncate rounded-t-xl border border-b-0 border-white/10 px-3 font-mono text-[9px] uppercase tracking-[0.08em] text-white/80 transition-colors duration-300 sm:text-[10px]"
              style={{ left: `${i * 24}%`, width: "26%", background: on && d > 0 ? `rgb(${color})` : "inherit", color: on && d > 0 ? "#fff" : undefined }}
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: on && d > 0 ? "#fff" : `rgb(${color})` }} />
              <span className="truncate">{pick(TAB[g.id], language)}</span>
            </span>
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] rounded-tr-2xl" style={{ background: `linear-gradient(90deg, rgb(${color}), transparent)` }} />

            {d === 0 && (
            <span className="flex w-full flex-1 flex-col p-6">
              <span className="flex items-baseline justify-between">
                <span className="font-brand text-2xl font-semibold leading-tight text-white">{pick(g.label, language)}</span>
                <span className="font-mono text-caption text-white/40">{g.items.length} {svc}</span>
              </span>
              <span className="mt-4 space-y-2">
                {g.items.slice(0, 6).map((p) => (
                  <span key={p.id} className="flex items-center justify-between gap-3 text-body-sm">
                    <span className="flex min-w-0 items-center gap-2 text-white/75">
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: `rgb(${PKG_COLOR[p.id]})` }} />
                      <span className="truncate">{pick(p.title, language)}</span>
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-white/45">{pick(p.startingPrice, language)}</span>
                  </span>
                ))}
              </span>
              <span className="mt-auto inline-flex items-center gap-2 text-body-sm font-medium" style={{ color: `rgb(${color})` }}>
                {pick({ en: "Open the folder", ru: "Открыть папку", zh: "打开文件夹", tr: "Klasörü aç", ar: "افتح المجلد" }, language)}
                <span aria-hidden="true">↓</span>
              </span>
            </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
