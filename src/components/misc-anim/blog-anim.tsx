"use client";

import { Fragment, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { EASE, SpotlightCard } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";
import "./misc-anim.css";

// Motion pieces for /blog: generative covers seeded by the post slug, a tilt
// card, the article reading progress, a table of contents and heading reveals.

/* ───────────────────────────── Seeded random ───────────────────────────── */

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed || 1;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

const PALETTES = [
  { bg0: "#1E1B4B", bg1: "#0B0B14", a: "#818CF8", b: "#E879F9", c: "#FCD34D" },
  { bg0: "#0F2A3D", bg1: "#070B14", a: "#22D3EE", b: "#818CF8", c: "#34D399" },
  { bg0: "#3B0A2E", bg1: "#0B0712", a: "#F472B6", b: "#A78BFA", c: "#FDBA74" },
];

type Theme = "launch" | "chain" | "milestones";

function themeFor(tags: string[], seed: number): Theme {
  const t = tags[0]?.toLowerCase() ?? "";
  if (t.includes("mvp")) return "launch";
  if (t.includes("web3") || t.includes("chain")) return "chain";
  if (t.includes("deliver") || t.includes("process") || t.includes("owner")) return "milestones";
  return (["launch", "chain", "milestones"] as Theme[])[seed % 3];
}

/* ───────────────────────────── Cover ───────────────────────────── */

const W = 600;
const H = 340;

/** Deterministic animated cover, drawn in SVG from the slug */
export function BlogCover({ slug, tags, active = false, className = "" }: { slug: string; tags: string[]; active?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1 });
  const reduced = useReducedMotion();
  const seed = hash(slug);
  const rand = rng(seed);
  const pal = PALETTES[seed % PALETTES.length];
  const theme = themeFor(tags, seed);
  const id = `bc${seed.toString(36)}`;

  // background star dust
  const dust = Array.from({ length: 26 }, () => ({ x: r1(rand() * W), y: r1(rand() * H), r: r1(0.6 + rand() * 1.6), d: r1(rand() * -3) }));

  return (
    <div ref={ref} data-run={inView && !reduced} className={`overflow-hidden ${/\babsolute\b/.test(className) ? "" : "relative"} ${className}`}>
      <svg className="ms-cover absolute inset-0 h-full w-full" data-active={active} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-bg`} cx="30%" cy="20%" r="95%">
            <stop offset="0%" stopColor={pal.bg0} />
            <stop offset="100%" stopColor={pal.bg1} />
          </radialGradient>
          <linearGradient id={`${id}-ln`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={pal.a} />
            <stop offset="55%" stopColor={pal.b} />
            <stop offset="100%" stopColor={pal.c} />
          </linearGradient>
          <pattern id={`${id}-grid`} width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M30 0H0V30" fill="none" stroke="#fff" strokeOpacity="0.05" />
          </pattern>
          <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <rect width={W} height={H} fill={`url(#${id}-bg)`} />
        <rect width={W} height={H} fill={`url(#${id}-grid)`} />
        <circle className="ms-drift" cx={r1(W * (0.6 + rand() * 0.3))} cy={r1(H * 0.3)} r="120" fill={pal.b} fillOpacity="0.16" filter={`url(#${id}-glow)`} style={{ ["--dx" as string]: "-30px", ["--dy" as string]: "20px" }} />
        {dust.map((d, i) => (
          <circle key={i} className="ms-twinkle" cx={d.x} cy={d.y} r={d.r} fill="#fff" fillOpacity="0.5" style={{ animationDelay: `${d.d}s` }} />
        ))}
        {theme === "launch" && <LaunchScene id={id} seed={seed} pal={pal} />}
        {theme === "chain" && <ChainScene id={id} seed={seed} pal={pal} />}
        {theme === "milestones" && <MilestoneScene id={id} seed={seed} pal={pal} />}
      </svg>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  );
}

// Each scene draws from its own generator so render order (and Strict Mode
// double renders) can never shift the sequence between server and client.
type SceneProps = { id: string; seed: number; pal: (typeof PALETTES)[number] };

/** Sprint bars rising under a growth curve that a rocket rides */
function LaunchScene({ id, seed, pal }: SceneProps) {
  const rand = rng(seed ^ 0x9e3779b9);
  const bars = Array.from({ length: 8 }, (_, i) => ({ x: 70 + i * 58, h: r1(40 + i * 18 + rand() * 30) }));
  const curve = `M40 290 C 200 ${r1(280 - rand() * 20)}, 300 ${r1(200 - rand() * 30)}, 420 130 S 540 ${r1(50 + rand() * 20)}, 570 40`;
  return (
    <g>
      {bars.map((b, i) => (
        <rect key={i} className="ms-grow" x={b.x} y={300 - b.h} width="30" height={b.h} rx="6" fill={pal.a} fillOpacity={0.16 + i * 0.04} style={{ animationDelay: `${i * 0.12}s` }} />
      ))}
      <path d={curve} fill="none" stroke={pal.b} strokeOpacity="0.25" strokeWidth="10" strokeLinecap="round" />
      <path className="ms-flow" d={curve} fill="none" stroke={`url(#${id}-ln)`} strokeWidth="4" strokeLinecap="round" strokeDasharray="60 60" />
      <g className="ms-float" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <circle cx="570" cy="40" r="22" fill={pal.c} fillOpacity="0.25" />
        <circle cx="570" cy="40" r="11" fill={pal.c} />
      </g>
      {["W1", "W2", "W3", "W4"].map((w, i) => (
        <text key={w} x={92 + i * 116} y="326" fill="#fff" fillOpacity="0.4" fontSize="13" fontFamily="ui-monospace, monospace" textAnchor="middle">
          {w}
        </text>
      ))}
    </g>
  );
}

/** Blocks chained left to right, packets flowing between them, an orbit around the head */
function ChainScene({ id, seed, pal }: SceneProps) {
  const rand = rng(seed ^ 0x9e3779b9);
  const blocks = Array.from({ length: 5 }, (_, i) => ({ x: 36 + i * 100, y: r1(150 + Math.sin(i * 1.3 + rand()) * 40) }));
  return (
    <g>
      {blocks.slice(0, -1).map((b, i) => (
        <g key={i}>
          <line x1={b.x + 70} y1={b.y + 30} x2={blocks[i + 1].x} y2={blocks[i + 1].y + 30} stroke="#fff" strokeOpacity="0.15" strokeWidth="2" />
          <line className="ms-flow" x1={b.x + 70} y1={b.y + 30} x2={blocks[i + 1].x} y2={blocks[i + 1].y + 30} stroke={i % 2 ? pal.b : pal.a} strokeWidth="3" strokeDasharray="8 22" style={{ animationDelay: `${i * -0.5}s` }} />
        </g>
      ))}
      {blocks.map((b, i) => (
        <g key={i} className="ms-float" style={{ animationDelay: `${i * -0.9}s`, transformBox: "fill-box", transformOrigin: "center" }}>
          <rect x={b.x} y={b.y} width="70" height="60" rx="12" fill="#ffffff" fillOpacity="0.06" stroke={i === blocks.length - 1 ? pal.c : pal.a} strokeOpacity="0.7" strokeWidth="1.5" />
          <rect x={b.x + 12} y={b.y + 14} width="46" height="6" rx="3" fill="#fff" fillOpacity="0.35" />
          <rect x={b.x + 12} y={b.y + 28} width="30" height="6" rx="3" fill={pal.a} fillOpacity="0.6" />
          <text x={b.x + 12} y={b.y + 50} fill="#fff" fillOpacity="0.45" fontSize="9" fontFamily="ui-monospace, monospace">
            #{1024 + i}
          </text>
        </g>
      ))}
      <g transform={`translate(${blocks[4].x + 35} ${blocks[4].y + 30})`}>
        <g className="ms-spin">
          <circle r="64" fill="none" stroke={pal.c} strokeOpacity="0.35" strokeDasharray="3 7" />
          <circle cx="64" cy="0" r="5" fill={pal.c} />
        </g>
      </g>
      <text x="40" y="60" fill="#fff" fillOpacity="0.35" fontSize="13" fontFamily="ui-monospace, monospace">
        off-chain ⇄ on-chain
      </text>
      <circle cx="40" cy="300" r="4" fill={`url(#${id}-ln)`} />
    </g>
  );
}

/** A milestone timeline: gates light up one after another */
function MilestoneScene({ id, seed, pal }: SceneProps) {
  const rand = rng(seed ^ 0x9e3779b9);
  const gates = Array.from({ length: 5 }, (_, i) => ({ x: 70 + i * 115, y: r1(200 - i * 22 + rand() * 16) }));
  const path = gates.map((g, i) => `${i ? "L" : "M"}${g.x} ${g.y}`).join(" ");
  return (
    <g>
      <path d={path} fill="none" stroke="#fff" strokeOpacity="0.15" strokeWidth="3" />
      <path className="ms-flow" d={path} fill="none" stroke={`url(#${id}-ln)`} strokeWidth="3" strokeDasharray="40 80" />
      {gates.map((g, i) => (
        <g key={i}>
          <line x1={g.x} y1={g.y} x2={g.x} y2={g.y - 58} stroke="#fff" strokeOpacity="0.3" strokeWidth="2" />
          <path className="ms-float" d={`M${g.x} ${g.y - 58} h28 l-8 9 l8 9 h-28 z`} fill={i < 3 ? pal.a : pal.b} fillOpacity={i < 3 ? 0.9 : 0.5} style={{ animationDelay: `${i * -0.7}s` }} />
          <circle className="ms-blink" cx={g.x} cy={g.y} r="10" fill={i < 3 ? pal.c : "#fff"} fillOpacity={i < 3 ? 1 : 0.25} style={{ animationDelay: `${i * 0.4}s` }} />
          {i < 3 && <path d={`M${g.x - 4} ${g.y} l3 3 l6 -6`} stroke="#0B0B14" strokeWidth="2" fill="none" strokeLinecap="round" />}
          <text x={g.x} y={g.y + 32} fill="#fff" fillOpacity="0.45" fontSize="12" fontFamily="ui-monospace, monospace" textAnchor="middle">
            M{i + 1}
          </text>
        </g>
      ))}
      <g transform="translate(470 250)">
        <rect width="110" height="56" rx="12" fill="#fff" fillOpacity="0.06" stroke="#fff" strokeOpacity="0.15" />
        <text x="14" y="24" fill="#fff" fillOpacity="0.5" fontSize="10" fontFamily="ui-monospace, monospace">
          repo access
        </text>
        <text x="14" y="44" fill={pal.c} fontSize="14" fontWeight="700" fontFamily="ui-monospace, monospace">
          ✓ day 1
        </text>
      </g>
    </g>
  );
}

/* ───────────────────────────── Tilt card ───────────────────────────── */

/** Card that tilts toward the pointer, with the shared spotlight glow */
export function TiltCard({ children, className = "", onHover }: { children: ReactNode; className?: string; onHover?: (on: boolean) => void }) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 18 });
  const sy = useSpring(my, { stiffness: 160, damping: 18 });
  const rotY = useTransform(sx, [-1, 1], [5, -5]);
  const rotX = useTransform(sy, [-1, 1], [-4, 4]);
  return (
    <div className="h-full [perspective:1200px]">
      <motion.div
        className="h-full"
        style={reduced ? undefined : { rotateX: rotX, rotateY: rotY }}
        whileHover={reduced ? undefined : { y: -6 }}
        transition={{ duration: 0.3, ease: EASE }}
        onPointerMove={(e) => {
          if (reduced || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
          my.set(((e.clientY - r.top) / r.height) * 2 - 1);
        }}
        onPointerEnter={() => onHover?.(true)}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
          onHover?.(false);
        }}
      >
        <SpotlightCard className={`h-full ${className}`}>{children}</SpotlightCard>
      </motion.div>
    </div>
  );
}

/* ───────────────────────────── Article ───────────────────────────── */

/** Minutes to read from a word count (≈200 wpm) */
export function readingMinutes(words: number) {
  return Math.max(1, Math.round(words / 200));
}

/** Sticky gradient bar under the header that fills as the article is read */
export function ReadingProgress({ target, en }: { target: RefObject<HTMLElement | null>; en: boolean }) {
  // Progress through `target`: 0 when its top reaches the header, 1 when its end hits the viewport bottom.
  const scrollYProgress = useMotionValue(0);
  useEffect(() => {
    const update = () => {
      const el = target.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight + 80;
      scrollYProgress.set(span > 0 ? Math.min(1, Math.max(0, (80 - r.top) / span)) : 1);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [target, scrollYProgress]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });
  const pct = useTransform(scrollYProgress, (v) => `${Math.round(Math.min(1, Math.max(0, v)) * 100)}%`);
  return (
    <div className="sticky top-14 z-30 -mt-1 md:top-16">
      <div className="relative h-1 w-full bg-border/40">
        <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400 shadow-[0_0_12px_rgba(217,70,239,0.6)]" style={{ scaleX }} />
      </div>
      <div className="pointer-events-none absolute right-4 top-2 hidden rounded-full border border-border bg-bg-primary/90 px-2.5 py-1 font-mono text-[11px] tabular-nums text-text-secondary shadow-sm backdrop-blur sm:block">
        <span className="sr-only">{en ? "Read" : "Прочитано"} </span>
        <motion.span>{pct}</motion.span>
      </div>
    </div>
  );
}

/** Which section is currently being read (by scroll position) */
export function useActiveSection(count: number, prefix: string) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const els = Array.from({ length: count }, (_, i) => document.getElementById(`${prefix}${i}`)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let idx = 0;
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top < line) idx = i;
      });
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [count, prefix]);
  return active;
}

/** Side table of contents with a sliding marker on the current section */
export function ArticleToc({ headings, active, prefix, en }: { headings: string[]; active: number; prefix: string; en: boolean }) {
  return (
    <nav aria-label={en ? "Contents" : "Содержание"} className="sticky top-28">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">{en ? "Contents" : "Содержание"}</p>
      <ol className="relative space-y-1 border-l border-border">
        {headings.map((h, i) => {
          const on = i === active;
          return (
            <li key={i} className="relative">
              {on && <motion.span layoutId="ms-toc" className="absolute -left-px top-0 h-full w-[2px] bg-gradient-to-b from-indigo-500 to-fuchsia-500" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <a href={`#${prefix}${i}`} className={`block py-1.5 pl-4 text-body-sm leading-snug transition-colors ${on ? "font-medium text-text-primary" : "text-text-tertiary hover:text-text-secondary"}`}>
                <span className="mr-1.5 font-mono text-[11px] text-accent-primary/70">{String(i + 1).padStart(2, "0")}</span>
                {h}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Section heading: number chip, words rising out of a mask, an underline that draws */
export function RevealHeading({ text, index, id }: { text: string; index: number; id: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const show = inView || reduced;
  const words = text.split(" ");
  return (
    <div className="mb-6">
      <motion.span
        className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-primary"
        initial={reduced ? false : { opacity: 0, x: -10 }}
        animate={show ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-[10px] font-bold text-white">{String(index + 1).padStart(2, "0")}</span>
        <motion.span className="h-px w-10 origin-left bg-accent-primary/40" initial={reduced ? false : { scaleX: 0 }} animate={show ? { scaleX: 1 } : {}} transition={{ duration: 0.6, delay: 0.15, ease: EASE }} />
      </motion.span>
      <h2 ref={ref} id={id} className="scroll-mt-32 text-heading-xl font-display font-medium text-text-primary">
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span className="inline-block" initial={reduced ? false : { y: "105%" }} animate={show ? { y: 0 } : {}} transition={{ duration: 0.7, delay: 0.05 + i * 0.035, ease: EASE }}>
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </h2>
    </div>
  );
}

/** Tag chips that pop in one by one */
export function AnimatedTags({ tags, dark = false, delay = 0 }: { tags: string[]; dark?: boolean; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag, i) => (
        <motion.span
          key={tag}
          initial={reduced ? false : { opacity: 0, scale: 0.6, y: 6 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={reduced ? undefined : { y: -2 }}
          transition={{ type: "spring", stiffness: 420, damping: 22, delay: delay + i * 0.07 }}
          className={dark ? "rounded-md border border-white/15 bg-white/10 px-2 py-0.5 text-caption text-white/85 backdrop-blur" : "rounded-md border border-border bg-bg-tertiary px-2 py-0.5 text-caption text-text-secondary"}
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
}
