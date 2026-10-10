"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { EASE } from "@/components/motion/kit";

// The 404 page: a glitching "4 · 4" around a portal with orbiting satellites,
// a star field that drifts with the pointer and a terminal line with the URL.

const r1 = (n: number) => Math.round(n * 10) / 10;

// Deterministic star field (no Math.random → identical on server and client)
const frac = (n: number) => (((Math.imul(n ^ (n >>> 15), 2246822519) ^ Math.imul(n, 3266489917)) >>> 0) % 10000) / 10000;
const STARS = Array.from({ length: 70 }, (_, i) => {
  const fx = frac(i * 7919 + 13);
  const fy = frac(i * 104729 + 71);
  return { x: r1(fx * 100), y: r1(fy * 100), s: r1(1 + ((i * 7) % 5) * 0.5), d: r1(((i * 13) % 30) / 10), layer: i % 3 };
});

const ORBITS = [
  { r: 120, dur: 9, size: 9, color: "#A5B4FC", start: 0 },
  { r: 140, dur: 14, size: 7, color: "#F0ABFC", start: 120 },
  { r: 158, dur: 21, size: 11, color: "#FDE68A", start: 240 },
];

/** The middle "0": a portal of rotating rings with satellites */
function Portal({ run }: { run: boolean }) {
  return (
    <svg viewBox="-170 -170 340 340" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id="ms404-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06060B" />
          <stop offset="62%" stopColor="#0B0B14" />
          <stop offset="80%" stopColor="#4F46E5" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#D946EF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ms404-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A5B4FC" />
          <stop offset="50%" stopColor="#F0ABFC" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
      </defs>
      <circle r="150" fill="url(#ms404-core)" opacity="0.6" />
      {/* the "0" itself */}
      <motion.ellipse
        rx="82"
        ry="110"
        fill="none"
        stroke="url(#ms404-ring)"
        strokeWidth="22"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
      />
      <ellipse rx="82" ry="110" fill="url(#ms404-core)" opacity="0.9" />
      {/* inner swirl */}
      <motion.g animate={run ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}>
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} rx={r1(56 - i * 10)} ry={r1(78 - i * 14)} fill="none" stroke="#818CF8" strokeOpacity={0.5 - i * 0.1} strokeWidth="1.5" strokeDasharray="6 10" transform={`rotate(${i * 22})`} />
        ))}
      </motion.g>
      <circle r="6" fill="#fff" opacity="0.9" />
      {/* orbits + satellites */}
      {ORBITS.map((o, i) => (
        <g key={i}>
          <circle r={o.r} fill="none" stroke="#fff" strokeOpacity="0.08" strokeDasharray="2 6" />
          <motion.g initial={{ rotate: o.start }} animate={run ? { rotate: o.start + (i % 2 ? -360 : 360) } : { rotate: o.start }} transition={{ duration: o.dur, repeat: Infinity, ease: "linear" }}>
            {/* invisible ring keeps the group's box centred on the portal, so it rotates around it */}
            <circle r={o.r} fill="none" stroke="none" />
            <motion.g style={{ x: o.r }}>
              <circle r={o.size * 2} fill={o.color} opacity="0.18" />
              <circle r={o.size} fill={o.color} />
            </motion.g>
          </motion.g>
        </g>
      ))}
    </svg>
  );
}

export function NotFoundScene() {
  const { language } = useLanguage();
  const en = language === "en";
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const run = inView && !reduced;

  // Path is shown only after mount so server and client markup always agree.
  const [path, setPath] = useState("");
  const [typed, setTyped] = useState(0);
  useEffect(() => {
    const p = pathname || "/";
    const t0 = window.setTimeout(() => setPath(p.length > 32 ? `${p.slice(0, 31)}…` : p), 0);
    return () => window.clearTimeout(t0);
  }, [pathname]);
  const line = `GET ${path}`;
  useEffect(() => {
    if (!path) return;
    if (reduced) {
      const t = window.setTimeout(() => setTyped(line.length), 0);
      return () => window.clearTimeout(t);
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= line.length) window.clearInterval(id);
    }, 45);
    return () => window.clearInterval(id);
  }, [path, line.length, reduced]);
  const typedDone = path !== "" && typed >= line.length;

  // pointer parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const far = { x: useTransform(sx, (v) => v * -10), y: useTransform(sy, (v) => v * -10) };
  const near = { x: useTransform(sx, (v) => v * 22), y: useTransform(sy, (v) => v * 16) };
  const mid = { x: useTransform(sx, (v) => v * 8), y: useTransform(sy, (v) => v * 6) };
  const onMove = (e: React.PointerEvent) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const links = [
    { href: "/", label: en ? "Back to home" : "На главную", primary: true },
    { href: "/cases", label: en ? "See our cases" : "Смотреть кейсы" },
    { href: "/contact", label: en ? "Contact us" : "Связаться" },
  ];

  return (
    <section
      ref={ref}
      data-run={run}
      onPointerMove={onMove}
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-[#06060B] py-20 text-white md:min-h-[calc(100svh-5.5rem)]"
    >
      <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "64px 64px" }}
      />
      {/* stars in three depth layers */}
      {[far, mid, near].map((m, layer) => (
        <motion.div key={layer} aria-hidden="true" className="pointer-events-none absolute -inset-8 -z-10" style={reduced ? undefined : m}>
          {STARS.filter((s) => s.layer === layer).map((s, i) => (
            <span
              key={i}
              className="ms-twinkle absolute rounded-full bg-white"
              style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s + layer * 0.5, height: s.s + layer * 0.5, opacity: 0.25 + layer * 0.2, animationDelay: `-${s.d}s` }}
            />
          ))}
        </motion.div>
      ))}

      <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
          {en ? "Error 404" : "Ошибка 404"}
        </motion.p>

        {/* 4 · portal · 4 */}
        <h1 className="sr-only">{en ? "404 — page not found" : "404 — страница не найдена"}</h1>
        <div aria-hidden="true" className="mx-auto mt-6 flex items-center justify-center gap-1 sm:gap-4">
          {[0, 1, 2].map((i) =>
            i === 1 ? (
              <motion.div key={i} className="relative -mx-2 h-[9.5rem] w-[9.5rem] sm:mx-0 sm:h-[15rem] sm:w-[15rem] md:h-[18rem] md:w-[18rem]" style={reduced ? undefined : mid} initial={reduced ? false : { scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: EASE }}>
                <Portal run={run} />
              </motion.div>
            ) : (
              <motion.div key={i} style={reduced ? undefined : near}>
                <motion.span
                  data-text="4"
                  className="ms-glitch home-gradient-text block font-brand text-[7.5rem] font-semibold leading-none tracking-[-0.04em] sm:text-[12rem] md:text-[15rem]"
                  initial={reduced ? false : { y: 60, opacity: 0, rotate: i === 0 ? -12 : 12 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: EASE }}
                >
                  4
                </motion.span>
              </motion.div>
            ),
          )}
        </div>

        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          className="mx-auto mt-6 max-w-2xl font-brand text-3xl font-semibold leading-[1.08] tracking-[-0.03em] md:text-5xl"
        >
          {en ? "This page drifted out of orbit" : "Эта страница сошла с орбиты"}
        </motion.h2>
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          className="mx-auto mt-4 max-w-xl text-body-lg text-white/60"
        >
          {en
            ? "The link may be old or mistyped. Everything else is where it should be — pick a direction below."
            : "Ссылка устарела или в ней опечатка. Всё остальное на месте — выберите, куда двигаться дальше."}
        </motion.p>

        {/* terminal line */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
          className="mx-auto mt-8 flex max-w-md items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left font-mono text-[12px] backdrop-blur"
        >
          <span className="text-emerald-300">$</span>
          <span className="min-w-0 flex-1 truncate text-white/75">
            {line.slice(0, typed)}
            {!typedDone && <span className="ms-caret ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-white/70" />}
          </span>
          <motion.span initial={false} animate={{ opacity: typedDone ? 1 : 0, scale: typedDone ? 1 : 0.8 }} className="shrink-0 rounded-md bg-rose-500/15 px-2 py-0.5 text-rose-300">
            404
          </motion.span>
        </motion.div>

        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          {links.map((l, i) => (
            <motion.div key={l.href} initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65 + i * 0.08, ease: EASE }}>
              <NextLink
                href={l.href}
                className={
                  l.primary
                    ? "home-cta-glow group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-body-md font-semibold text-[#0A0A0F] sm:w-auto"
                    : "group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-body-md font-medium text-white backdrop-blur transition-colors hover:bg-white/10 sm:w-auto"
                }
              >
                {l.primary && (
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                )}
                {l.label}
                {!l.primary && (
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                )}
              </NextLink>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
