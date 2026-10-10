"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE, Stagger } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";
import { OFFICES, localTime } from "@/lib/locations";
import { RevealTitle, RunScope } from "./shared";
import { LAND } from "./world-data";

type L = { en: string; ru: string };

// ── Projection: equirectangular, 5 units per degree, y = 0 at 80°N ─────────
const K = 5;
const r2 = (n: number) => Math.round(n * 100) / 100;
const px = (lon: number) => r2((lon + 180) * K);
const py = (lat: number) => r2((LAND.top - lat) * K);
const VB = { x: 150, y: 10, w: 1560, h: 640 };

const COORDS: Record<string, [number, number]> = {
  "Asia/Bishkek": [74.59, 42.87],
  "Asia/Dubai": [55.27, 25.2],
  "Europe/Istanbul": [28.98, 41.01],
  "America/Chicago": [-87.63, 41.88],
  "Asia/Shanghai": [114.06, 22.54],
};
// Where each city's label sits relative to its marker (viewBox units)
const LABEL: Record<string, [number, number, "start" | "end"]> = {
  "Asia/Bishkek": [18, -30, "start"],
  "Asia/Dubai": [-18, 44, "end"],
  "Europe/Istanbul": [-26, -28, "end"],
  "America/Chicago": [18, -30, "start"],
  "Asia/Shanghai": [18, 40, "start"],
};

const CITIES = OFFICES.map((o) => {
  const [lon, lat] = COORDS[o.tz] ?? [0, 0];
  return { tz: o.tz, x: px(lon), y: py(lat) };
});
const AT = Object.fromEntries(CITIES.map((c) => [c.tz, c]));

const ROUTES: [string, string][] = [
  ["America/Chicago", "Europe/Istanbul"],
  ["Europe/Istanbul", "Asia/Dubai"],
  ["Asia/Dubai", "Asia/Bishkek"],
  ["Asia/Bishkek", "Asia/Shanghai"],
  ["Asia/Dubai", "Asia/Shanghai"],
];

/** Quadratic arc between two cities, lifted towards the pole, plus points along it for the travelling dot */
const ARCS = ROUTES.map(([a, b]) => {
  const A = AT[a];
  const B = AT[b];
  const dist = Math.hypot(B.x - A.x, B.y - A.y);
  const cx = r2((A.x + B.x) / 2);
  const cy = r2(Math.min(A.y, B.y) - dist * 0.32);
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    const u = 1 - t;
    xs.push(r2(u * u * A.x + 2 * u * t * cx + t * t * B.x));
    ys.push(r2(u * u * A.y + 2 * u * t * cy + t * t * B.y));
  }
  return { d: `M${A.x} ${A.y} Q${cx} ${cy} ${B.x} ${B.y}`, xs, ys, len: dist };
});

/** All land dots as one path of zero-length round-capped segments */
const DOTS_D = (() => {
  const parts: string[] = [];
  LAND.rows.forEach((row, r) => {
    if (!row) return;
    for (const run of row.split(" ")) {
      const [s, l] = run.split(".").map((v) => parseInt(v, 36));
      for (let c = s; c < s + l; c++) parts.push(`M${c * LAND.step * K + LAND.step * K * 0.5} ${r * LAND.step * K + LAND.step * K * 0.5}h0`);
    }
  });
  return parts.join("");
})();

const Dots = memo(function Dots({ clip }: { clip?: string }) {
  return <path d={DOTS_D} fill="none" stroke={clip ? "rgba(199,210,254,0.55)" : "rgba(255,255,255,0.16)"} strokeWidth="4.6" strokeLinecap="round" clipPath={clip} />;
});

// ── Time helpers (client only) ─────────────────────────────────────────────
const FMT = new Map<string, Intl.DateTimeFormat>();
function parts(tz: string, d: Date) {
  let f = FMT.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat("en-GB", { timeZone: tz, year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });
    FMT.set(tz, f);
  }
  const p = Object.fromEntries(f.formatToParts(d).map((x) => [x.type, x.value]));
  const h = Number(p.hour) % 24;
  const m = Number(p.minute);
  const s = Number(p.second);
  const asUtc = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), h, m, s);
  const offset = Math.round((asUtc - Math.floor(d.getTime() / 1000) * 1000) / 60000) / 60;
  return { h, m, s, offset };
}
const WORK = [9, 19];
const isWorking = (h: number) => h >= WORK[0] && h < WORK[1];
const STATIC_OFFSETS = OFFICES.map((o) => {
  const m = o.gmt.match(/([+−-])(\d+)/);
  return m ? (m[1] === "+" ? 1 : -1) * Number(m[2]) : 0;
});

/** Day polygon (the lit hemisphere) for the current sun position, in map units */
function dayPolygon(d: Date) {
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  const doy = (d.getTime() - start) / 86400000;
  let decl = -23.44 * Math.cos(((2 * Math.PI) / 365) * (doy + 10));
  if (Math.abs(decl) < 0.2) decl = decl < 0 ? -0.2 : 0.2;
  const utcH = d.getUTCHours() + d.getUTCMinutes() / 60;
  const sunLon = -15 * (utcH - 12);
  const rad = Math.PI / 180;
  const pts: string[] = [];
  for (let lon = -180; lon <= 180; lon += 3) {
    const lat = Math.atan(-Math.cos((lon - sunLon) * rad) / Math.tan(decl * rad)) / rad;
    pts.push(`${px(lon)},${py(lat)}`);
  }
  const poleY = decl > 0 ? py(90) : py(-90);
  pts.push(`${px(180)},${poleY}`, `${px(-180)},${poleY}`);
  return { points: pts.join(" "), sun: { x: px(((sunLon + 540) % 360) - 180), y: py(decl) } };
}

// ── Map ─────────────────────────────────────────────────────────────────────
function WorldMap({ now, hovered, language, run }: { now: Date | null; hovered: number | null; language: "en" | "ru"; run: boolean }) {
  const minute = now ? Math.floor(now.getTime() / 60000) : null;
  const day = useMemo(() => (minute == null ? null : dayPolygon(new Date(minute * 60000))), [minute]);
  const reduced = useReducedMotion();

  return (
    <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} className="block h-auto w-full" role="img" aria-label={language === "en" ? "Map of Anteyko offices" : "Карта офисов Anteyko"}>
      <defs>
        <radialGradient id="ab-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(253,230,138,0.35)" />
          <stop offset="100%" stopColor="rgba(253,230,138,0)" />
        </radialGradient>
        <linearGradient id="ab-arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="50%" stopColor="#E879F9" />
          <stop offset="100%" stopColor="#FCD34D" />
        </linearGradient>
        <radialGradient id="ab-marker-glow">
          <stop offset="0%" stopColor="rgba(52,211,153,0.45)" />
          <stop offset="100%" stopColor="rgba(52,211,153,0)" />
        </radialGradient>
        {day && (
          <clipPath id="ab-day">
            <polygon points={day.points} />
          </clipPath>
        )}
      </defs>

      <Dots />
      {day && (
        <>
          <circle cx={day.sun.x} cy={day.sun.y} r="260" fill="url(#ab-sun)" />
          <Dots clip="url(#ab-day)" />
          <polygon points={day.points} fill="none" stroke="rgba(253,230,138,0.18)" strokeWidth="1.5" strokeDasharray="2 6" />
        </>
      )}

      {/* routes */}
      {ARCS.map((a, i) => (
        <g key={a.d}>
          <motion.path
            d={a.d}
            fill="none"
            stroke="url(#ab-arc)"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            initial={reduced ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.3 + i * 0.18, ease: EASE }}
          />
          <path d={a.d} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" className="ab-flow" style={{ animationDelay: `${i * -0.4}s` }} />
          {run && (
            <motion.g
              initial={{ x: a.xs[0], y: a.ys[0], opacity: 0 }}
              animate={{ x: a.xs, y: a.ys, opacity: [0, 1, 1, 1, 0] }}
              transition={{ duration: 2.4 + a.len / 400, delay: i * 0.9, repeat: Infinity, repeatDelay: 1.6, ease: "linear" }}
            >
              <circle r="10" fill="rgba(240,171,252,0.25)" />
              <circle r="4.5" fill="#fff" />
            </motion.g>
          )}
        </g>
      ))}

      {/* city markers */}
      {OFFICES.map((o, i) => {
        const c = CITIES[i];
        const p = now ? parts(o.tz, now) : null;
        const working = p ? isWorking(p.h) : false;
        const hot = hovered === i;
        const [lx, ly, anchor] = LABEL[o.tz] ?? [18, -30, "start"];
        const color = working ? "#34D399" : "#A5B4FC";
        return (
          <g key={o.tz} transform={`translate(${c.x} ${c.y})`}>
            <g className="ab-mk">
              {working && <circle r="34" fill="url(#ab-marker-glow)" />}
              <circle r="12" fill="none" stroke={color} strokeWidth="2.5" className="ab-pulse" style={{ animationDelay: `${i * -0.5}s` }} />
              <circle r={hot ? 11 : 8} fill={color} stroke="#06060B" strokeWidth="3" style={{ transition: "r .3s" }} />
            </g>
            <g className="hidden sm:inline" transform={`translate(${lx} ${ly})`} opacity={hovered == null || hot ? 1 : 0.45} style={{ transition: "opacity .3s" }}>
              <text textAnchor={anchor} className="font-brand" fontSize="22" fontWeight="600" fill="#fff" stroke="#06060B" strokeWidth="6" paintOrder="stroke" strokeLinejoin="round">
                {o.city[language]}
              </text>
              <text y="24" textAnchor={anchor} fontSize="17" className="font-mono" stroke="#06060B" strokeWidth="5" paintOrder="stroke" strokeLinejoin="round" fill={working ? "#6EE7B7" : "rgba(255,255,255,0.5)"}>
                {p ? localTime(o.tz, now!) : "--:--"} · {o.gmt.split("/")[0]}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

// ── Coverage timeline ──────────────────────────────────────────────────────
function Coverage({ offsets, nowUtc, language, working }: { offsets: number[]; nowUtc: number | null; language: "en" | "ru"; working: boolean[] }) {
  const en = language === "en";
  const reduced = useReducedMotion();
  const covered = useMemo(() => {
    let n = 0;
    for (let h = 0; h < 24; h++) {
      if (offsets.some((off) => isWorking((((h + off) % 24) + 24) % 24))) n++;
    }
    return n;
  }, [offsets]);
  const pct = (h: number) => `${r2((h / 24) * 100)}%`;
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm md:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">{en ? "Follow the sun · UTC" : "Следуем за солнцем · UTC"}</p>
          <p className="mt-1 text-body-sm text-white/70">{en ? "Working hours of each office across one day" : "Рабочие часы каждого офиса на протяжении суток"}</p>
        </div>
        <p className="font-brand text-2xl font-semibold">
          <span className="home-gradient-text">{covered}</span>
          <span className="text-white/40"> / 24 {en ? "h covered" : "ч покрыто"}</span>
        </p>
      </div>
      <div className="relative">
        <div className="space-y-2">
          {OFFICES.map((o, i) => {
            const from = (((WORK[0] - offsets[i]) % 24) + 24) % 24;
            const len = WORK[1] - WORK[0];
            const segs: [number, number][] = from + len <= 24 ? [[from, len]] : [[from, 24 - from], [0, from + len - 24]];
            return (
              <div key={o.tz} className="grid grid-cols-[5.5rem_1fr] items-center gap-3 sm:grid-cols-[7rem_1fr]">
                <span className={`truncate text-caption ${working[i] ? "text-emerald-300" : "text-white/55"}`}>{o.city[language]}</span>
                <div className="relative h-3 overflow-hidden rounded-full bg-white/[0.06]">
                  {segs.map(([s, l], k) => (
                    <motion.span
                      key={k}
                      className={`absolute inset-y-0 origin-left rounded-full ${working[i] ? "bg-gradient-to-r from-emerald-400 to-cyan-400" : "bg-gradient-to-r from-indigo-500/70 to-fuchsia-500/70"}`}
                      style={{ left: pct(s), width: pct(l) }}
                      initial={reduced ? false : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.1 + k * 0.2, ease: EASE }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {/* now cursor */}
        {nowUtc != null && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-[-6px] left-[6.25rem] right-0 sm:left-[7.75rem]">
            <div className="absolute inset-y-0 w-px bg-amber-300 shadow-[0_0_10px_2px_rgba(252,211,77,0.6)] transition-[left] duration-1000" style={{ left: pct(nowUtc) }}>
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-amber-300" />
            </div>
          </div>
        )}
        <div className="mt-3 grid grid-cols-[5.5rem_1fr] gap-3 sm:grid-cols-[7rem_1fr]">
          <span />
          <div className="flex justify-between font-mono text-[10px] text-white/35">
            {[0, 6, 12, 18, 24].map((h) => (
              <span key={h}>{String(h).padStart(2, "0")}:00</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
/** Offices: a live dotted world map with day and night, routes between the cities, and live local clocks */
export function Offices({ title, description, language }: { title: L; description: L; language: "en" | "ru" }) {
  const en = language === "en";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "100px" });
  const reduced = useReducedMotion();
  const [now, setNow] = useState<Date | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    // first tick right after mount (never during render, so no hydration mismatch)
    const first = window.setTimeout(() => setNow(new Date()), 0);
    if (!inView) return () => window.clearTimeout(first);
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [inView]);

  const info = OFFICES.map((o) => (now ? parts(o.tz, now) : null));
  const offsets = info.map((p, i) => (p ? p.offset : STATIC_OFFSETS[i]));
  const working = info.map((p) => (p ? isWorking(p.h) : false));
  const workingCount = working.filter(Boolean).length;
  const nowUtc = now ? r2(now.getUTCHours() + now.getUTCMinutes() / 60) : null;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <RunScope className="relative isolate overflow-hidden bg-[#06060B] py-20 text-white md:py-28">
      <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <RevealTitle dark eyebrow={en ? "Offices · live" : "Офисы · в реальном времени"} title={title[language]} />
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="mt-6 max-w-2xl text-body-lg text-white/60"
            >
              {description[language]}
            </motion.p>
          </div>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
          >
            <div className="relative grid h-16 w-16 shrink-0 place-items-center">
              <span className="absolute inset-0 rounded-full border border-emerald-400/30" />
              <span className="absolute inset-2 animate-ping rounded-full bg-emerald-400/20 motion-reduce:animate-none" />
              <span className="relative font-brand text-2xl font-semibold text-emerald-300 tabular-nums">{now ? workingCount : "–"}</span>
            </div>
            <div>
              <p className="text-body-md font-medium text-white">{en ? `of ${OFFICES.length} offices in working hours now` : `из ${OFFICES.length} офисов сейчас в рабочем времени`}</p>
              <p className="mt-1 font-mono text-caption text-white/45">
                UTC {now ? `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}` : "--:--"}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-2 shadow-[0_60px_120px_-40px_rgba(79,70,229,0.5)] sm:p-5"
        >
          <WorldMap now={now} hovered={hovered} language={language} run={inView && !reduced} />
          <div className="pointer-events-none absolute bottom-3 left-4 hidden items-center gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45 sm:flex">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-400" />{en ? "working hours" : "рабочее время"}</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-indigo-300" />{en ? "off hours" : "нерабочее время"}</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-200/70" />{en ? "daylight" : "день"}</span>
          </div>
        </motion.div>

        <Stagger className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 [&>*:last-child]:col-span-2 sm:[&>*:last-child]:col-span-1" gap={0.07}>
          {OFFICES.map((o, i) => {
            const p = info[i];
            const w = working[i];
            return (
              <div
                key={o.tz}
                onPointerEnter={() => setHovered(i)}
                onPointerLeave={() => setHovered(null)}
                className={`group relative h-full overflow-hidden rounded-2xl border p-4 transition-all duration-500 hover:-translate-y-1 ${
                  w ? "border-emerald-400/35 bg-emerald-400/[0.06] shadow-[0_20px_50px_-25px_rgba(52,211,153,0.6)]" : "border-white/10 bg-white/[0.03] hover:border-white/25"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-white/50">{o.countryCode}</span>
                  <span className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider ${w ? "text-emerald-300" : "text-white/40"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${w ? "bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)]" : "bg-white/30"}`} />
                    {p ? (w ? (en ? "at work" : "работают") : en ? "off hours" : "не в офисе") : "…"}
                  </span>
                </div>
                <p className="mt-4 font-brand text-lg font-semibold leading-tight">{o.city[language]}</p>
                <p className="text-caption text-white/45">
                  {o.country[language]} · {o.role[language]}
                </p>
                <p className="mt-4 font-brand text-3xl font-semibold tabular-nums leading-none">
                  {p ? (
                    <>
                      {pad(p.h)}
                      <span className="ab-colon">:</span>
                      {pad(p.m)}
                      <span className="ml-1 align-top font-mono text-[11px] font-normal text-white/40">{pad(p.s)}</span>
                    </>
                  ) : (
                    <span className="text-white/30">--:--</span>
                  )}
                </p>
                {/* 24h day bar: working window and the current local time */}
                <div className="relative mt-4 h-1.5 rounded-full bg-white/10">
                  <span className={`absolute inset-y-0 rounded-full ${w ? "bg-emerald-400/70" : "bg-indigo-400/40"}`} style={{ left: `${r2((WORK[0] / 24) * 100)}%`, width: `${r2(((WORK[1] - WORK[0]) / 24) * 100)}%` }} />
                  {p && <span className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#06060B] bg-white" style={{ left: `${r2(((p.h + p.m / 60) / 24) * 100)}%` }} />}
                </div>
                <p className="mt-2 font-mono text-[10px] text-white/40">{o.gmt}</p>
              </div>
            );
          })}
        </Stagger>

        <div className="mt-5">
          <Coverage offsets={offsets} nowUtc={nowUtc} language={language} working={working} />
        </div>
      </div>
    </RunScope>
  );
}
