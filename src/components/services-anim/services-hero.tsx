"use client";

import { Fragment, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";

// /services hero: the headline centred on top, and under it one row of
// abstract cards drifting along an arch (the "curved carousel" pattern): cards
// rise, grow and brighten towards the centre, and dip, turn and fade towards
// the edges. Decorative only (the services are listed right below). Cards are
// moved per frame with transforms only, paused off screen and still under
// reduced motion.

const PALETTE = ["99 102 241", "6 182 212", "236 72 153", "163 230 53", "249 115 22", "139 92 246", "20 184 166", "244 63 94", "56 189 248", "234 179 8"];
const KINDS = ["chart", "list", "ring", "toggles", "bars", "chat"] as const;
type Kind = (typeof KINDS)[number];

const CARD_W = 280;
const GAP = 22;
const SPEED = 0.028; // px per ms

/* ───────────── Abstract card faces (no text) ───────────── */

function Face({ kind, c }: { kind: Kind; c: string }) {
  const col = `rgb(${c})`;
  const soft = `rgb(${c} / 0.35)`;
  const line = "rgba(255,255,255,0.09)";
  switch (kind) {
    case "chart":
      return (
        <svg viewBox="0 0 240 110" className="h-full w-full" fill="none">
          <defs>
            <linearGradient id={`g-${c.replace(/ /g, "")}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={col} stopOpacity="0.35" />
              <stop offset="1" stopColor={col} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[30, 60, 90].map((y) => <line key={y} x1="0" x2="240" y1={y} y2={y} stroke={line} />)}
          <path d="M0 88 C30 80 45 62 70 66 S110 40 135 46 S180 20 205 26 S232 14 240 10 L240 110 L0 110 Z" fill={`url(#g-${c.replace(/ /g, "")})`} />
          <path d="M0 88 C30 80 45 62 70 66 S110 40 135 46 S180 20 205 26 S232 14 240 10" stroke={col} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="205" cy="26" r="4" fill={col} />
        </svg>
      );
    case "bars":
      return (
        <svg viewBox="0 0 240 110" className="h-full w-full" fill="none">
          {[44, 70, 52, 88, 62, 98, 76].map((h, i) => (
            <rect key={i} x={8 + i * 33} y={110 - h} width="20" height={h} rx="5" fill={i === 5 ? col : soft} />
          ))}
        </svg>
      );
    case "ring":
      return (
        <div className="flex h-full items-center gap-5">
          <svg viewBox="0 0 80 80" className="h-[86px] w-[86px] shrink-0 -rotate-90" fill="none">
            <circle cx="40" cy="40" r="32" stroke={line} strokeWidth="8" />
            <circle cx="40" cy="40" r="32" stroke={col} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 32 * 0.72} 999`} />
          </svg>
          <div className="flex-1 space-y-2.5">
            {[90, 64, 78].map((w, i) => <div key={i} className="h-2 rounded-full" style={{ width: `${w}%`, background: i === 0 ? soft : line }} />)}
          </div>
        </div>
      );
    case "list":
      return (
        <div className="space-y-3">
          {[78, 58, 70].map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="h-7 w-7 shrink-0 rounded-lg" style={{ background: i === 0 ? soft : line }} />
              <span className="h-2 rounded-full" style={{ width: `${w}%`, background: line }} />
              <span className="ml-auto h-2 w-8 shrink-0 rounded-full" style={{ background: i === 0 ? col : line }} />
            </div>
          ))}
        </div>
      );
    case "toggles":
      return (
        <div className="space-y-3.5">
          {[true, false, true].map((on, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="h-2 rounded-full" style={{ width: `${[52, 66, 44][i]}%`, background: line }} />
              <span className="relative h-5 w-9 rounded-full" style={{ background: on ? col : line }}>
                <span className="absolute top-0.5 h-4 w-4 rounded-full bg-white/90" style={{ left: on ? 18 : 2 }} />
              </span>
            </div>
          ))}
        </div>
      );
    case "chat":
      return (
        <div className="space-y-2.5">
          <div className="h-6 w-[62%] rounded-xl rounded-bl-sm" style={{ background: line }} />
          <div className="ml-auto h-6 w-[54%] rounded-xl rounded-br-sm" style={{ background: soft }} />
          <div className="h-6 w-[44%] rounded-xl rounded-bl-sm" style={{ background: line }} />
        </div>
      );
  }
}

function GhostCard({ k }: { k: number }) {
  const c = PALETTE[k % PALETTE.length];
  const kind = KINDS[k % KINDS.length];
  return (
    <div
      className="relative h-[210px] overflow-hidden rounded-[24px] border border-white/[0.08] p-5"
      style={{ width: CARD_W, background: "linear-gradient(180deg, rgba(26,26,38,0.96) 0%, rgba(14,14,21,0.96) 100%)", boxShadow: `inset 0 1px 0 rgba(255,255,255,0.07), 0 30px 60px -40px rgba(0,0,0,0.95), 0 0 0 1px rgb(${c} / 0.05)` }}
    >
      <span className="absolute inset-x-0 top-0 h-[2px]" style={{ background: `linear-gradient(90deg, rgb(${c}), transparent 75%)` }} />
      <span className="absolute -right-14 -top-14 h-36 w-36 rounded-full" style={{ background: `radial-gradient(closest-side, rgb(${c} / 0.18), transparent)` }} />
      {/* header: a dot, a title line, a pill */}
      <div className="relative flex items-center gap-2.5">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: `rgb(${c})`, boxShadow: `0 0 12px rgb(${c} / 0.7)` }} />
        <span className="h-2.5 w-24 rounded-full bg-white/[0.16]" />
        <span className="ml-auto h-5 w-12 rounded-full border border-white/[0.08]" />
      </div>
      <div className="relative mt-5 h-[118px]">
        <Face kind={kind} c={c} />
      </div>
    </div>
  );
}

/* ───────────── The arch ───────────── */

function Arch() {
  const box = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const COUNT = 12;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, last = 0, x = 0, visible = true;
    const place = () => {
      const w = el.clientWidth;
      const half = w / 2;
      // smaller cards on narrow screens, the same arch
      const sc = w < 640 ? 0.66 : 1;
      const step = (CARD_W + GAP) * sc;
      const loop = step * COUNT;
      for (let i = 0; i < COUNT; i++) {
        const n = nodes.current[i];
        if (!n) continue;
        // position along the row, wrapped so the loop is seamless
        let px = ((i * step - x) % loop + loop) % loop - loop / 2 + step / 2;
        if (px > loop / 2) px -= loop;
        const d = Math.max(-1.4, Math.min(1.4, px / (half + step / 2))); // -1 left edge, 0 centre, +1 right edge
        const ad = Math.abs(d);
        const y = ad * ad * 70 * sc; // dips towards the edges
        const rot = d * 9; // follows the arch
        const s = (1 - ad * 0.14) * sc;
        const o = Math.max(0, 1 - Math.pow(ad, 2.2) * 0.9);
        n.style.transform = `translate3d(${px - CARD_W / 2}px, ${y}px, 0) rotate(${rot}deg) scale(${s})`;
        n.style.opacity = String(o);
        n.style.zIndex = String(100 - Math.round(ad * 50));
      }
    };
    const frame = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      x += SPEED * dt * (el.clientWidth < 640 ? 0.75 : 1);
      place();
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(el);
    if (reduced) return () => ro.disconnect();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
    });
    io.observe(el);
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
  }, []);

  return (
    <div ref={box} aria-hidden="true" className="hero-up pointer-events-none relative mt-8 h-[220px] w-full overflow-hidden sm:h-[300px] md:mt-14 md:h-[320px]">
      {/* a soft floor glow under the centre of the arch */}
      <div className="absolute bottom-0 left-1/2 h-40 w-[70%] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.22), transparent)" }} />
      {Array.from({ length: COUNT }, (_, i) => (
        <div key={i} ref={(n) => { nodes.current[i] = n; }} className="absolute left-1/2 top-4 origin-top will-change-transform">
          <GhostCard k={i} />
        </div>
      ))}
    </div>
  );
}

export function ServicesHero() {
  const { language } = useLanguage();
  const lines = [
    pick({ en: "Services", ru: "Услуги", zh: "服务", tr: "Hizmetler", ar: "الخدمات" }, language),
    pick({ en: "end to end", ru: "под ключ", zh: "全流程交付", tr: "uçtan uca", ar: "من البداية إلى النهاية" }, language),
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#06060B] pb-10 pt-14 text-white md:pb-14 md:pt-16">
      <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10 opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "64px 64px" }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>

      <Arch />
    </section>
  );
}
