"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

const narrowQuery = "(max-width: 639px)";
const subscribeNarrow = (cb: () => void) => {
  const m = window.matchMedia(narrowQuery);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const useNarrow = () => useSyncExternalStore(subscribeNarrow, () => window.matchMedia(narrowQuery).matches, () => false);

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
            <Fan groups={groups} colors={colors} focus={focus} setHover={setHover} onPick={onPick} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── The four directions, fanned out ───────────── */

type Group = (typeof SERVICE_GROUPS)[number] & { items: ReturnType<typeof useLanguage>["translations"]["packages"]["items"][number][] };

function Fan({ groups, colors, focus, setHover, onPick }: { groups: Group[]; colors: string[]; focus: number; setHover: (i: number | null) => void; onPick: (g: ServiceGroup) => void }) {
  const { language } = useLanguage();
  const narrow = useNarrow();
  const n = groups.length;
  const mid = (n - 1) / 2;
  // cards in a hand: all turn around one point far below, so their tops (and
  // tabs) fan apart and stay visible whichever folder is up
  const step = narrow ? 5 : 9;
  const svc = pick({ en: "services", ru: "услуг", zh: "项服务", tr: "hizmet", ar: "خدمات" }, language);
  const pending = useRef<number | null>(null);
  const timer = useRef(0);
  const zoneOf = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return Math.min(n - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * n)));
  };

  return (
    <div
      className="relative mx-auto h-[420px] cursor-pointer w-full max-w-[560px] sm:h-[470px]"
      // the fan is split into one zone per folder across its width: the folder
      // for the zone under the cursor comes up and covers that zone, so a click
      // always lands on the folder you see (folders overlap, hit-testing alone
      // would pick a neighbour)
      // a short rest before a folder comes up, so sweeping across doesn't flicker
      onMouseMove={(e) => {
        const z = zoneOf(e);
        if (z === pending.current) return;
        pending.current = z;
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setHover(z), 160);
      }}
      onMouseLeave={() => {
        pending.current = null;
        window.clearTimeout(timer.current);
        setHover(null);
      }}
      // mouse clicks and taps go by zone too; keyboard Enter reaches the button
      onClick={(e) => {
        if (e.detail > 0) onPick(groups[zoneOf(e)].id);
      }}
    >
      {/* sparks drifting around the fan */}
      {[[10, 22], [90, 16], [6, 70]].map(([l, t], k) => (
        <span key={k} aria-hidden="true" className="sv-float absolute h-1 w-1 rounded-full opacity-60" style={{ left: `${l}%`, top: `${t}%`, background: `rgb(${colors[k % n]})`, boxShadow: `0 0 8px rgb(${colors[k % n]})`, animationDelay: `${k * -2.3}s`, animationDuration: "11s" }} />
      ))}
      {groups.map((g, i) => {
        const on = i === focus;
        const off = i - mid;
        const color = colors[i];
        return (
          <motion.button
            key={g.id}
            type="button"
            onClick={(e) => {
              if (e.detail === 0) onPick(g.id);
            }}
            onFocus={() => setHover(i)}
            aria-label={`${pick({ en: "Open", ru: "Открыть", zh: "打开", tr: "Aç", ar: "افتح" }, language)}: ${pick(g.label, language)}`}
            className="absolute bottom-0 left-1/2 flex h-[300px] w-[196px] -ml-[98px] flex-col rounded-2xl border text-left sm:h-[350px] sm:w-[262px] sm:-ml-[131px] focus-visible:outline-none"
            style={{
              zIndex: on ? n + 1 : i,
              transformOrigin: "50% 190%",
              background: "linear-gradient(180deg, #16161F 0%, #0F0F17 100%)",
              borderColor: on ? `rgb(${color} / 0.38)` : "rgba(255,255,255,0.08)",
              boxShadow: on ? `0 28px 60px -34px rgb(${color} / 0.5), inset 0 1px 0 rgba(255,255,255,0.06)` : "0 20px 44px -32px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.04)",
              transition: "border-color 0.8s ease, box-shadow 0.8s ease",
            }}
            initial={false}
            animate={{
              rotate: off * step,
              y: on ? -14 : 0,
              scale: on ? 1.015 : 0.975,
            }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {/* folder tab */}
            <span className="absolute -top-7 left-4 flex h-7 items-center gap-1.5 rounded-t-xl px-3 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-700" style={{ background: on ? `color-mix(in srgb, rgb(${color}) 18%, #16161F)` : "#16161F", color: on ? `rgb(${color})` : "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderBottom: 0 }}>
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: `rgb(${color})` }} />
              {pick(TAB[g.id], language)}
            </span>
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px rounded-t-2xl transition-opacity duration-700" style={{ background: `linear-gradient(90deg, rgb(${color}), transparent 70%)`, opacity: on ? 1 : 0.45 }} />

            <span className="flex w-full flex-1 flex-col p-4 sm:p-6">
              <span className="flex items-center justify-between font-mono text-[11px] text-white/40 transition-opacity duration-700" style={{ opacity: on ? 1 : 0.6 }}>
                <span>{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
                <span>{g.items.length} {svc}</span>
              </span>
              <span className="mt-3 font-brand text-[1.2rem] font-semibold leading-tight text-white transition-opacity duration-700 sm:text-2xl" style={{ opacity: on ? 1 : 0.28 }}>
                {pick(g.label, language)}
              </span>
              <span className="mt-4 space-y-2">
                {g.items.slice(0, 6).map((p, k) => (
                  <motion.span
                    key={p.id}
                    className="flex items-center justify-between gap-2 text-[12px] sm:gap-3 sm:text-[13px]"
                    initial={false}
                    animate={{ opacity: on ? 1 : 0.18 }}
                    transition={{ duration: 0.6, delay: on ? 0.15 + k * 0.05 : 0, ease: "easeOut" }}
                  >
                    <span className="flex min-w-0 items-center gap-2 text-white/80">
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: `rgb(${PKG_COLOR[p.id]})` }} />
                      <span className="truncate">{pick(p.title, language)}</span>
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-white/45">{pick(p.startingPrice, language)}</span>
                  </motion.span>
                ))}
              </span>
              <motion.span
                className="mt-auto inline-flex items-center gap-2 text-body-sm font-medium"
                style={{ color: `rgb(${color})` }}
                initial={false}
                animate={{ opacity: on ? 1 : 0 }}
                transition={{ duration: 0.6, delay: on ? 0.35 : 0, ease: "easeOut" }}
              >
                {pick({ en: "Open the folder", ru: "Открыть папку", zh: "打开文件夹", tr: "Klasörü aç", ar: "افتح المجلد" }, language)}
                <span aria-hidden="true">→</span>
              </motion.span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
