"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { pick, type L } from "@/lib/i18n-text";
import { CountUp, EASE, useLoop } from "@/components/motion/kit";
import { ButtonLink } from "@/components/ui/link";
import { useReducedMotion } from "@/lib/hooks";
import { SERVICE_GROUPS, type ServiceGroup } from "@/lib/service-slugs";
import { PKG_COLOR } from "./visual-frame";

// /services hero. Left: headline (CSS-animated, so it paints before hydration),
// the catalog in four counting numbers, two actions. Right: the four directions
// as folders fanned out like cards in a hand. One comes up at a time (in turn,
// or the one under the cursor): it lifts, glows softly in its colour and fades its
// services in; the hero's glow takes the same colour, and the fan tilts after the
// pointer. A click opens that folder in the catalog below. Everything that loops
// ticks only while the hero is on screen.

/** "From $800" / "От $3k" → 800 / 3000; "By agreement" → Infinity */
const usd = (label: string) => {
  const m = label.match(/\$(\d+(?:\.\d+)?)(k?)/i);
  return m ? Number(m[1]) * (m[2] ? 1000 : 1) : Infinity;
};

/** Short names for the folder tabs */
const TAB: Record<ServiceGroup, L> = {
  build: { en: "Development", ru: "Разработка", zh: "开发", tr: "Geliştirme", ar: "التطوير" },
  brand: { en: "Brand", ru: "Бренд", zh: "品牌", tr: "Marka", ar: "العلامة" },
  industry: { en: "Industries", ru: "Отрасли", zh: "行业", tr: "Sektörler", ar: "القطاعات" },
  care: { en: "Modules", ru: "Модули", zh: "模块", tr: "Modüller", ar: "الوحدات" },
};


export function ServicesHero({ onPick }: { onPick: (g: ServiceGroup) => void }) {
  const { t, translations, language } = useLanguage();
  const packages = translations.packages.items;
  const reduced = useReducedMotion();
  const groups = SERVICE_GROUPS.map((g) => ({ ...g, items: packages.filter((p) => p.group === g.id) })).filter((g) => g.items.length);
  const min = Math.min(...packages.map((p) => usd(p.startingPrice.en)));

  // which folder is up: the hovered one, or the next one in turn
  const [hover, setHover] = useState<number | null>(null);
  const { ref, tick } = useLoop<HTMLDivElement>(4500);
  const focus = hover ?? (reduced ? 0 : tick % groups.length);
  const colors = groups.map((g) => PKG_COLOR[g.items[0].id]);

  // the fan tilts after the pointer (desktop only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-1, 1], [-4, 4]), { stiffness: 40, damping: 20 });
  const rotX = useSpring(useTransform(my, [-1, 1], [3, -3]), { stiffness: 40, damping: 20 });
  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const stats = [
    { v: String(packages.length), l: pick({ en: "services", ru: "услуг", zh: "项服务", tr: "hizmet", ar: "خدمة" }, language) },
    { v: String(groups.length), l: pick({ en: "directions", ru: "направления", zh: "个方向", tr: "alan", ar: "مجالات" }, language) },
    { v: `$${min}`, l: pick({ en: "starting price", ru: "стартовая цена", zh: "起步价", tr: "başlangıç fiyatı", ar: "السعر الابتدائي" }, language) },
    { v: pick({ en: "24h", ru: "24ч", zh: "24 小时", tr: "24 sa", ar: "24 ساعة" }, language), l: pick({ en: "to an estimate", ru: "до оценки", zh: "内出报价", tr: "içinde teklif", ar: "حتى التقدير" }, language) },
  ];
  const lines = [
    pick({ en: "Services", ru: "Услуги", zh: "服务", tr: "Hizmetler", ar: "الخدمات" }, language),
    pick({ en: "end to end", ru: "под ключ", zh: "全流程交付", tr: "uçtan uca", ar: "من البداية إلى النهاية" }, language),
  ];

  return (
    <section onPointerMove={onMove} onPointerLeave={() => { mx.set(0); my.set(0); }} className="relative isolate overflow-hidden bg-[#06060B] pb-16 pt-16 text-white md:pb-24 md:pt-20">
      <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10" />
      {/* a glow in the colour of the folder that is up; layers cross-fade */}
      {colors.map((c, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 h-[620px] w-[620px] rounded-full transition-opacity duration-[1600ms] ease-in-out"
          style={{ right: "-8%", top: "8%", background: `radial-gradient(closest-side, rgb(${c} / 0.2), transparent)`, opacity: i === focus ? 1 : 0 }}
        />
      ))}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "64px 64px" }}
      />

      <div className="container relative mx-auto grid items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div>
          <p className="hero-in inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
            <span className="relative flex h-1.5 w-1.5">
              <span className="sv-ping absolute inset-0 rounded-full bg-emerald-400" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {pick({ en: "Service catalog", ru: "Каталог услуг", zh: "服务目录", tr: "Hizmet kataloğu", ar: "دليل الخدمات" }, language)}
          </p>

          <h1 className="mt-6 font-brand text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl xl:text-7xl">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <span className="hero-rise block" style={{ ["--d" as string]: `${0.08 + i * 0.12}s` }}>
                  <span className={i === 0 ? "home-gradient-text block" : "block"}>{line}</span>
                </span>
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
                <dd className="font-brand text-3xl font-semibold tabular-nums text-white">
                  <CountUp value={s.v} duration={1.4} />
                </dd>
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
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-body-md font-medium text-[#06060B] transition-transform hover:-translate-y-0.5"
            >
              {pick({ en: "Browse services", ru: "Смотреть услуги", zh: "浏览服务", tr: "Hizmetlere göz at", ar: "تصفّح الخدمات" }, language)}
              <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
            <ButtonLink href="/contact" buttonVariant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              {t("cta.primary")}
            </ButtonLink>
          </div>
        </div>

        <div ref={ref} className="hero-up [perspective:1400px]">
          {/* the whole fan tilts as one plane; no preserve-3d, which would sort the
              folders by depth and ignore their stacking order */}
          <motion.div style={reduced ? undefined : { rotateX: rotX, rotateY: rotY }}>
            <Folder groups={groups} colors={colors} focus={focus} setHover={setHover} onPick={onPick} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── One folder, four dividers sticking out of it ───────────── */

type Group = (typeof SERVICE_GROUPS)[number] & { items: ReturnType<typeof useLanguage>["translations"]["packages"]["items"][number][] };

function Folder({ groups, colors, focus, setHover, onPick }: { groups: Group[]; colors: string[]; focus: number; setHover: (i: number | null) => void; onPick: (g: ServiceGroup) => void }) {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const n = groups.length;
  const g = groups[focus];
  const color = colors[focus];
  const svc = pick({ en: "services", ru: "услуг", zh: "项服务", tr: "hizmet", ar: "خدمات" }, language);
  const open = pick({ en: "Open", ru: "Открыть", zh: "打开", tr: "Aç", ar: "افتح" }, language);

  return (
    <div className="relative mx-auto h-[400px] w-full max-w-[500px] sm:h-[440px]" onMouseLeave={() => setHover(null)}>
      {/* back of the folder */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 top-[64px] rounded-[22px] border border-white/[0.07] bg-[#0B0B12] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]" />

      {/* the dividers' sheets: their top edges peek out of the pocket */}
      {groups.map((d, i) => {
        const on = i === focus;
        return (
          <motion.div
            key={d.id}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-3 bottom-3 top-[104px] rounded-t-[16px] sm:inset-x-4"
            style={{ zIndex: 1 + i, background: "linear-gradient(180deg, #1B1B27, #13131C)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
            initial={false}
            animate={{ y: on ? -16 : 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="absolute inset-x-0 top-0 h-px rounded-t-[16px] transition-opacity duration-700" style={{ background: `linear-gradient(90deg, transparent, rgb(${colors[i]}), transparent)`, opacity: on ? 0.9 : 0.2 }} />
          </motion.div>
        );
      })}

      {/* the tabs, in their own layer so no sheet ever covers one; each moves
          with its sheet. A tab reaches down past its edge (after:), so when it
          slides up it still sits under the cursor that raised it */}
      {groups.map((d, i) => {
        const on = i === focus;
        const c = colors[i];
        return (
          <motion.button
            key={d.id}
            type="button"
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onClick={() => onPick(d.id)}
            aria-label={`${open}: ${pick(d.label, language)}`}
            aria-pressed={on}
            className="absolute top-[74px] z-10 flex h-[30px] items-center gap-1.5 rounded-t-xl border border-b-0 px-2 font-mono text-[8px] uppercase tracking-[0.02em] transition-colors duration-500 after:absolute after:inset-x-0 after:top-full after:h-6 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:px-3 sm:text-[10px] sm:tracking-[0.08em]"
            style={{
              left: `calc(${3 + i * 24.5}% + 4px)`,
              width: "22.5%",
              background: on ? `color-mix(in srgb, rgb(${c}) 16%, #1B1B27)` : "#1B1B27",
              borderColor: on ? `rgb(${c} / 0.35)` : "rgba(255,255,255,0.07)",
              color: on ? `rgb(${c})` : "rgba(255,255,255,0.55)",
            }}
            initial={false}
            animate={{ y: on ? -16 : 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: `rgb(${c})`, boxShadow: on ? `0 0 8px rgb(${c})` : "none" }} />
            <span className="truncate">{pick(TAB[d.id], language)}</span>
          </motion.button>
        );
      })}

      {/* front of the folder, where the open divider's contents show */}
      <button
        type="button"
        onClick={() => onPick(g.id)}
        aria-label={`${open}: ${pick(g.label, language)}`}
        className="absolute inset-x-0 bottom-0 top-[146px] z-20 overflow-hidden rounded-[22px] border text-left transition-[border-color,box-shadow] duration-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        style={{
          background: "linear-gradient(180deg, #17171F 0%, #0E0E15 100%)",
          borderColor: `rgb(${color} / 0.22)`,
          boxShadow: `0 -18px 30px -22px rgba(0,0,0,0.9), 0 30px 70px -40px rgb(${color} / 0.45), inset 0 1px 0 rgba(255,255,255,0.07)`,
        }}
      >
        {/* the pocket's lip */}
        <span aria-hidden="true" className="absolute inset-x-6 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgb(${color} / 0.6), transparent)` }} />
        <span aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full transition-colors duration-1000" style={{ background: `radial-gradient(closest-side, rgb(${color} / 0.16), transparent)` }} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={g.id}
            className="relative flex h-full flex-col p-5 sm:p-7"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <span className="flex items-center justify-between font-mono text-[11px] text-white/40">
              <span>{String(focus + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
              <span>{g.items.length} {svc}</span>
            </span>
            <span className="mt-2 font-brand text-[1.4rem] font-semibold leading-tight text-white sm:text-[1.7rem]">{pick(g.label, language)}</span>
            <span className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {g.items.slice(0, 6).map((p, k) => (
                <motion.span
                  key={p.id}
                  className="flex items-center justify-between gap-3 text-[13px]"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 + k * 0.05, ease: "easeOut" }}
                >
                  <span className="flex min-w-0 items-center gap-2 text-white/80">
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: `rgb(${PKG_COLOR[p.id]})` }} />
                    <span className="truncate">{pick(p.title, language)}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[11px] text-white/40">{pick(p.startingPrice, language)}</span>
                </motion.span>
              ))}
            </span>
            <span className="mt-auto inline-flex items-center gap-2 pt-4 text-body-sm font-medium" style={{ color: `rgb(${color})` }}>
              {pick({ en: "Open the folder", ru: "Открыть папку", zh: "打开文件夹", tr: "Klasörü aç", ar: "افتح المجلد" }, language)}
              <span aria-hidden="true">→</span>
            </span>
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
