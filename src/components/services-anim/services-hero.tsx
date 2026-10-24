"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { pick, type Language } from "@/lib/i18n-text";
import { SERVICE_GROUPS, type ServiceGroup } from "@/lib/service-slugs";
import { PKG_COLOR } from "./visual-frame";

// /services hero: the headline on the left; on the right a glass orb with the
// four directions on a slowly turning, tilted orbit and one dot per service on
// an inner orbit turning the other way. Positions are set per frame (transform
// only, no React renders), paused off screen and under reduced motion. Hovering
// a direction eases the orbit to a stop and tints the glow; a click opens it in
// the catalog below.


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


type Group = (typeof SERVICE_GROUPS)[number] & { items: ReturnType<typeof useLanguage>["translations"]["packages"]["items"][number][] };

export function ServicesHero({ onPick }: { onPick: (g: ServiceGroup) => void }) {
  const { translations, language } = useLanguage();
  const packages = translations.packages.items;
  const groups: Group[] = SERVICE_GROUPS.map((g) => ({ ...g, items: packages.filter((p) => p.group === g.id) })).filter((g) => g.items.length);
  const colors = groups.map((g) => PKG_COLOR[g.items[0].id]);
  const [hover, setHover] = useState<number | null>(null);

  const lines = [
    pick({ en: "Services", ru: "Услуги", zh: "服务", tr: "Hizmetler", ar: "الخدمات" }, language),
    pick({ en: "end to end", ru: "под ключ", zh: "全流程交付", tr: "uçtan uca", ar: "من البداية إلى النهاية" }, language),
  ];
  const openLabel = pick({ en: "Open", ru: "Открыть", zh: "打开", tr: "Aç", ar: "افتح" }, language);

  return (
    <section className="relative isolate overflow-hidden bg-[#06060B] pb-10 pt-14 text-white md:pb-16 md:pt-16">
      <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "64px 64px" }}
      />

      <div className="container relative mx-auto grid items-center gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8">
        <h1 className="font-brand text-[3.6rem] font-semibold leading-[0.92] tracking-[-0.04em] sm:text-8xl xl:text-[7.5rem]">
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

        <Orbit groups={groups} colors={colors} hover={hover} setHover={setHover} onPick={onPick} openLabel={openLabel} />
      </div>
    </section>
  );
}

/* ───────────── The orbit, positioned per frame ───────────── */

// The orbit is drawn flat and placed in JS each frame: CSS 3D depth sorting put
// the back of the orbit in front of the orb. Here every node knows its depth
// (front half in front of the orb, back half behind it, smaller and dimmer).
const TILT = 0.34; // vertical squash of the orbit ellipse
/** Orbit radii for a box width: narrower on phones so the labels stay on screen */
const radii = (w: number) => {
  const r1 = w < 480 ? w * 0.33 : Math.min(230, w * 0.44);
  return { r1, r2: r1 * 0.6, tilt: w < 480 ? 0.62 : TILT };
};

function Orbit({ groups, colors, hover, setHover, onPick, openLabel }: { groups: Group[]; colors: string[]; hover: number | null; setHover: (i: number | null) => void; onPick: (g: ServiceGroup) => void; openLabel: string }) {
  const { translations, language } = useLanguage();
  const packages = translations.packages.items;
  const box = useRef<HTMLDivElement>(null);
  const outer = useRef<(HTMLDivElement | null)[]>([]);
  const inner = useRef<(HTMLSpanElement | null)[]>([]);
  const paused = useRef(false);
  paused.current = hover !== null;
  const glow = hover === null ? "167 139 250" : colors[hover];

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, last = 0, a = 0, speed = 0, visible = true;
    const place = () => {
      const { r1, r2, tilt } = radii(el.clientWidth);
      groups.forEach((_, i) => {
        const node = outer.current[i];
        if (!node) return;
        const t = a + (i / groups.length) * Math.PI * 2 - Math.PI / 2;
        const depth = Math.sin(t); // +1 nearest (bottom), -1 farthest (top)
        const k = (depth + 1) / 2;
        node.style.transform = `translate(-50%, -50%) translate(${Math.cos(t) * r1}px, ${depth * r1 * tilt}px) scale(${0.86 + k * 0.18})`;
        node.style.opacity = String(0.62 + k * 0.38);
        node.style.zIndex = depth > 0 ? "30" : "10";
      });
      packages.forEach((_, i) => {
        const dot = inner.current[i];
        if (!dot) return;
        const t = -a * 1.4 + (i / packages.length) * Math.PI * 2;
        const depth = Math.sin(t);
        const k = (depth + 1) / 2;
        dot.style.transform = `translate(-50%, -50%) translate(${Math.cos(t) * r2}px, ${depth * r2 * tilt}px) scale(${0.6 + k * 0.6})`;
        dot.style.opacity = String(0.35 + k * 0.65);
        dot.style.zIndex = depth > 0 ? "30" : "10";
      });
    };
    const frame = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      // ease the spin down while a direction is hovered, and back up after
      const target = paused.current ? 0 : 0.00011;
      speed += (target - speed) * Math.min(1, dt / 220);
      a += speed * dt;
      place();
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    place();
    if (reduced) return;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
    });
    io.observe(el);
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
    // groups and packages come from static data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div ref={box} className="hero-up relative mx-auto h-[330px] w-full max-w-[560px] sm:h-[470px]" onMouseLeave={() => setHover(null)}>
      {/* glow behind the orb, in the colour of the direction under the cursor */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[background] duration-1000" style={{ background: `radial-gradient(closest-side, rgb(${glow} / 0.28), transparent)` }} />

      {/* orbit lines: back halves behind the orb, front halves over it */}
      <OrbitLines />

      {/* the glass orb */}
      <div aria-hidden="true" className="sv-orb absolute left-1/2 top-1/2 z-20 -ml-[46px] -mt-[46px] h-[92px] w-[92px] rounded-full sm:-ml-[90px] sm:-mt-[90px] sm:h-[180px] sm:w-[180px]">
        <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.95) 0 3%, rgba(221,214,254,0.85) 9%, rgba(139,92,246,0.85) 32%, rgba(49,46,129,0.95) 60%, rgba(12,10,30,1) 78%)" }} />
        <div className="sv-orb-sheen absolute inset-0 rounded-full opacity-60 mix-blend-screen" style={{ background: "conic-gradient(from 0deg, transparent 0 20%, rgba(34,211,238,0.45) 30%, transparent 45%, rgba(236,72,153,0.4) 70%, transparent 85%)" }} />
        <div className="absolute inset-0 rounded-full" style={{ boxShadow: "inset -14px -18px 40px rgba(0,0,0,0.55), inset 8px 10px 24px rgba(255,255,255,0.18), 0 0 80px rgba(139,92,246,0.45)" }} />
      </div>

      {/* inner orbit: one dot per service */}
      {packages.map((p, i) => (
        <span
          key={p.id}
          ref={(n) => { inner.current[i] = n; }}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 block h-2 w-2 rounded-full will-change-transform"
          style={{ background: `rgb(${PKG_COLOR[p.id]})`, boxShadow: `0 0 10px rgb(${PKG_COLOR[p.id]})` }}
        />
      ))}

      {/* outer orbit: the four directions */}
      {groups.map((g, i) => {
        const c = colors[i];
        const on = hover === i;
        return (
          <div key={g.id} ref={(n) => { outer.current[i] = n; }} className="absolute left-1/2 top-1/2 will-change-transform">
            <button
              type="button"
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onClick={() => onPick(g.id)}
              aria-label={`${openLabel}: ${pick(g.label, language)}`}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border px-2.5 py-1.5 text-left sm:gap-2.5 transition-[background-color,border-color,box-shadow,transform] duration-500 ease-out hover:scale-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:px-4 sm:py-2.5"
              style={{
                background: on ? `rgb(${c} / 0.16)` : "rgba(18,18,28,0.78)",
                borderColor: on ? `rgb(${c} / 0.6)` : "rgba(255,255,255,0.12)",
                boxShadow: on ? `0 0 32px -6px rgb(${c} / 0.7)` : "0 10px 30px -18px rgba(0,0,0,0.9)",
              }}
            >
              <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full sm:h-8 sm:w-8" style={{ background: `radial-gradient(circle at 35% 30%, rgb(${c}), rgb(${c} / 0.35))`, boxShadow: `0 0 16px rgb(${c} / 0.55)` }}>
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {ICON[g.id].map((d, k) => <path key={k} d={d} />)}
                </svg>
              </span>
              <span>
                <span className="block text-[12px] font-medium leading-tight text-white sm:text-[14px]">{pick(SHORT[g.id], language)}</span>
                <span className="block font-mono text-[10px] leading-tight text-white/45">{countLabel(g.items.length, language)}</span>
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

/** The two orbit ellipses, each split into a back half (behind the orb) and a front half (over it) */
function OrbitLines() {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 560, h: 470 });
  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const cx = size.w / 2, cy = size.h / 2;
  const { r1, r2, tilt } = radii(size.w);
  const half = (r: number, front: boolean) => `M ${cx - r} ${cy} A ${r} ${r * tilt} 0 0 ${front ? 0 : 1} ${cx + r} ${cy}`;
  return (
    <>
      <svg ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] h-full w-full">
        <path d={half(r1, false)} fill="none" stroke="rgba(255,255,255,0.12)" />
        <path d={half(r1 + 34, false)} fill="none" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 5" />
        <path d={half(r2, false)} fill="none" stroke="rgba(255,255,255,0.08)" />
      </svg>
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-[25] h-full w-full">
        <path d={half(r1, true)} fill="none" stroke="rgba(255,255,255,0.14)" />
        <path d={half(r1 + 34, true)} fill="none" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 5" />
        <path d={half(r2, true)} fill="none" stroke="rgba(255,255,255,0.1)" />
      </svg>
    </>
  );
}
