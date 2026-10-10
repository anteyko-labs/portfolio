"use client";

import "./case-anim.css";
import { ReactNode, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";
import { EASE, SpotlightCard } from "@/components/motion/kit";
import { Link as NextLink } from "@/i18n/navigation";
import { DrawIcon, ICONS, ScrollWords, pad2, useOnScreen, type IconName } from "./primitives";

const vp = { once: true, margin: "-60px" } as const;

/* ───────────────────────── Meta strip ───────────────────────── */

export function CaseMetaStrip({ items }: { items: { label: string; value: string; icon: IconName }[] }) {
  const reduced = useReducedMotion();
  return (
    <div className="relative">
      <ul className="grid gap-3 sm:grid-cols-3">
        {items.map((it, i) => (
          <motion.li
            key={it.label}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            className="group flex items-center gap-3 rounded-2xl border border-border bg-bg-secondary/70 px-4 py-3 transition-colors hover:border-accent-primary/30"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-primary/10 text-accent-primary transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
              <DrawIcon paths={ICONS[it.icon]} delay={0.2 + i * 0.1} />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-text-tertiary">{it.label}</span>
              <span className="block truncate text-body-md font-medium text-text-primary">{it.value}</span>
            </span>
          </motion.li>
        ))}
      </ul>
      <motion.div
        aria-hidden="true"
        className="mt-6 h-px origin-left bg-gradient-to-r from-indigo-500/60 via-fuchsia-500/40 to-transparent"
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={vp}
        transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
      />
    </div>
  );
}

/* ───────────────────────── Problem ───────────────────────── */

/** The problem statement, lighting up word by word as it scrolls past, next to an animated "signal" glyph */
export function CaseProblem({ text }: { text: string }) {
  const { ref, run } = useOnScreen<HTMLDivElement>();
  return (
    <div ref={ref} className={`relative grid gap-8 md:grid-cols-[1fr_auto] md:items-start ${run ? "ca-run" : ""}`}>
      <ScrollWords text={text} className="font-brand text-xl font-medium leading-[1.45] tracking-[-0.01em] text-text-primary sm:text-2xl md:text-[1.75rem]" />
      <ProblemGlyph />
    </div>
  );
}

function ProblemGlyph() {
  const reduced = useReducedMotion();
  // concentric rings + a "breaking" signal line that resolves into a clean one
  return (
    <div className="relative mx-auto hidden h-44 w-44 shrink-0 md:block" aria-hidden="true">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-amber-400/10 blur-xl" />
      <svg viewBox="0 0 176 176" className="relative h-full w-full">
        {[78, 60, 42].map((r, i) => (
          <motion.circle
            key={r}
            cx="88"
            cy="88"
            r={r}
            fill="none"
            stroke="currentColor"
            className="text-accent-primary/25"
            strokeWidth="1"
            strokeDasharray="3 5"
            initial={reduced ? false : { opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
            style={{ transformOrigin: "88px 88px" }}
          />
        ))}
        <motion.path
          d="M24 88 L52 88 L62 64 L74 112 L86 52 L98 120 L110 70 L120 88 L152 88"
          fill="none"
          stroke="url(#ca-prob-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
        />
        <defs>
          <linearGradient id="ca-prob-grad" x1="0" x2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="55%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <motion.g
          initial={reduced ? false : { x: -64, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
        >
          <circle cx="152" cy="88" r="5" fill="#f59e0b" />
          <circle cx="152" cy="88" r="10" fill="#f59e0b" opacity="0.2" />
        </motion.g>
      </svg>
    </div>
  );
}

/* ───────────────────────── Constraints ───────────────────────── */

const constraintIcon = (s: string): IconName => {
  if (/secur|безопас|complian|kyc|aml|legal|юрид|закон|regul|регул|audit|аудит|gdpr|соответств|privacy|приватн/i.test(s)) return "shield";
  if (/budget|бюджет|cost|стоим|\$|₽|price|цен|payment|платёж|платеж|оплат|refund|возврат/i.test(s)) return "coin";
  if (/\bapi\b|integrat|интеграц|wallet|кошел|rpc|webhook/i.test(s)) return "plug";
  if (/mobile|ios|android|мобил|device|устройств|offline|офлайн/i.test(s)) return "phone";
  if (/data|данн|storage|хран|retention|history|истор|database|баз/i.test(s)) return "database";
  if (/load|нагруз|latency|латент|perf|производ|scale|масштаб|fast|быстр|second|секунд|real.?time|реальн|peak|пик/i.test(s)) return "gauge";
  if (/week|day|hour|month|deadline|time|недел|дн[яейи]|час|месяц|срок|врем/i.test(s)) return "clock";
  return "lock";
};

export function CaseConstraints({ items }: { items: string[] }) {
  const reduced = useReducedMotion();
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((c, i) => (
        <motion.li
          key={`${i}-${c.slice(0, 24)}`}
          initial={reduced ? false : { opacity: 0, y: 24, rotateX: -12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={vp}
          transition={{ duration: 0.7, delay: i * 0.09, ease: EASE }}
          style={{ transformPerspective: 900 }}
          className="h-full"
        >
          <SpotlightCard className="h-full rounded-2xl border border-border bg-bg-primary p-5 transition-transform duration-500 hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent-primary/20 bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 text-accent-primary">
                <DrawIcon paths={ICONS[constraintIcon(c)]} className="h-5 w-5" delay={0.25 + i * 0.09} />
              </span>
              <div className="min-w-0">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-tertiary">{pad2(i + 1)}</span>
                <p className="mt-1 text-body-md leading-snug text-text-primary">{c}</p>
              </div>
            </div>
          </SpotlightCard>
        </motion.li>
      ))}
    </ul>
  );
}

/* ───────────────────────── Solution pipeline ───────────────────────── */

export type SolutionStep = { heading?: string; body: string };

const stepIcon = (heading?: string): IconName => {
  const h = (heading ?? "").toUpperCase();
  if (h.includes("DESIGN") || h.includes("ДИЗАЙН")) return "design";
  if (h.includes("FRONTEND") || h.includes("ФРОНТЕНД")) return "frontend";
  if (h.includes("BACKEND") || h.includes("БЭКЕНД")) return "backend";
  if (h.includes("IOS")) return "phone";
  if (h.includes("CHEF") || h.includes("ПОВАР")) return "flame";
  if (h.includes("API")) return "plug";
  return "cube";
};

const STEP_COLORS = ["99 102 241", "217 70 239", "245 158 11", "16 185 129", "14 165 233", "236 72 153"];

/**
 * Solution as a pipeline: a vertical rail that fills with a gradient as you
 * scroll, a glowing packet travelling down it, and a node per step that lights
 * up as its card arrives.
 */
export function CaseSolution({ intro, steps }: { intro?: string; steps: SolutionStep[] }) {
  const reduced = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const { ref, run } = useOnScreen<HTMLDivElement>();
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });
  const scaleY = useTransform(fill, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={run ? "ca-run" : ""}>
      {intro && (
        <motion.p
          className="mb-10 border-l-2 border-accent-primary/50 pl-5 font-brand text-xl font-medium leading-snug tracking-[-0.01em] text-text-primary md:text-2xl"
          initial={reduced ? false : { opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {intro}
        </motion.p>
      )}
      <div ref={railRef} className="relative">
        {/* rail */}
        <div aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-[2px] rounded-full bg-border sm:left-[23px]">
          <motion.div className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-indigo-500 via-fuchsia-500 to-amber-400" style={reduced ? undefined : { scaleY }} />
          {!reduced && <span className="ca-packet" />}
        </div>
        <ol className="space-y-5">
          {steps.map((s, i) => {
            const color = STEP_COLORS[i % STEP_COLORS.length];
            return (
              <motion.li
                key={i}
                className="relative grid grid-cols-[40px_1fr] gap-4 sm:grid-cols-[48px_1fr] sm:gap-6"
                initial={reduced ? false : "hidden"}
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
              >
                <motion.span
                  className="relative z-10 mt-4 grid h-10 w-10 place-items-center rounded-full border bg-bg-primary sm:h-12 sm:w-12"
                  style={{ borderColor: `rgb(${color} / 0.45)`, color: `rgb(${color})` }}
                  variants={{ hidden: { scale: 0.4, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 16, delay: 0.05 } } }}
                >
                  <span aria-hidden="true" className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 0 6px rgb(${color} / 0.08), 0 8px 24px -6px rgb(${color} / 0.5)` }} />
                  {s.heading ? (
                    <DrawIcon paths={ICONS[stepIcon(s.heading)]} className="relative h-5 w-5" delay={0.2} />
                  ) : (
                    <span className="relative font-mono text-body-sm font-semibold">{pad2(i + 1)}</span>
                  )}
                </motion.span>
                <motion.div variants={{ hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } } }} className="min-w-0">
                  <SpotlightCard color={color} className="rounded-2xl border border-border bg-bg-primary p-5 shadow-[0_1px_0_rgb(0_0_0/0.02)] transition-shadow duration-500 hover:shadow-[0_20px_50px_-24px_rgb(0_0_0/0.25)] md:p-6">
                    {s.heading && (
                      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="font-mono text-[11px] text-text-tertiary">{pad2(i + 1)}</span>
                        <h3 className="text-heading-sm font-semibold uppercase tracking-wider text-text-primary">{s.heading}</h3>
                      </div>
                    )}
                    <p className="text-body-md leading-relaxed text-text-secondary md:text-body-lg">{s.body}</p>
                  </SpotlightCard>
                </motion.div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

/* ───────────────────────── Deliverables ───────────────────────── */

export function CaseDeliverables({ items, label }: { items: string[]; label: string }) {
  const reduced = useReducedMotion();
  return (
    <div>
      <motion.div
        className="mb-5 flex items-center gap-3"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={vp}
        transition={{ duration: 0.6 }}
      >
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full origin-left rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={vp}
            transition={{ duration: Math.min(items.length, 7) * 0.12 + 0.6, ease: "linear" }}
          />
        </div>
        <span className="font-mono text-caption tabular-nums text-success">
          {items.length}/{items.length} {label}
        </span>
      </motion.div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((d, i) => (
          <motion.li
            key={`${i}-${d.slice(0, 24)}`}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.12, ease: EASE }}
            className="group flex items-start gap-3 rounded-xl border border-border bg-bg-secondary/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-success/30 hover:bg-bg-primary hover:shadow-[0_12px_30px_-18px_rgb(22_163_74/0.5)]"
          >
            <motion.span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-success/15 text-success"
              initial={reduced ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={vp}
              transition={{ type: "spring", stiffness: 380, damping: 16, delay: 0.1 + Math.min(i, 6) * 0.12 }}
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                <motion.path
                  d="M4.5 10.5l3.5 3.5 7.5-8"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduced ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={vp}
                  transition={{ duration: 0.4, delay: 0.25 + Math.min(i, 6) * 0.12, ease: EASE }}
                />
              </svg>
            </motion.span>
            <span className="pt-0.5 text-body-md text-text-primary">{d}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────────────────── Artifacts ───────────────────────── */

const TONES = {
  primary: { rgb: "79 70 229", fold: "#c7d2fe", bar: "from-indigo-500 to-violet-500", text: "text-indigo-600" },
  success: { rgb: "22 163 74", fold: "#bbf7d0", bar: "from-emerald-500 to-teal-400", text: "text-emerald-600" },
  warning: { rgb: "217 119 6", fold: "#fde68a", bar: "from-amber-500 to-orange-400", text: "text-amber-600" },
} as const;

/** Document cards that start stacked like a deck and fan out into the grid */
export function CaseArtifacts({ items }: { items: { title: string; subtitle: string; tone?: "primary" | "success" | "warning" }[] }) {
  const reduced = useReducedMotion();
  const mid = (items.length - 1) / 2;
  return (
    <motion.ul
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      initial={reduced ? false : "stack"}
      whileInView="fan"
      viewport={{ once: true, margin: "-80px" }}
    >
      {items.map((a, i) => {
        const tone = TONES[a.tone ?? "primary"];
        const off = i - mid;
        return (
          <motion.li
            key={`${i}-${a.title}`}
            variants={{
              stack: { opacity: 0, y: 50, x: Math.round(-off * 40), rotate: Math.round(off * 7), scale: 0.9 },
              fan: { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, transition: { duration: 0.9, delay: 0.08 * i, ease: EASE } },
            }}
            whileHover={reduced ? undefined : { y: -8, rotate: off < 0 ? -1.2 : 1.2, transition: { duration: 0.3, ease: EASE } }}
            className="group [filter:drop-shadow(0_1px_1px_rgb(0_0_0/0.04))] transition-[filter] duration-500 hover:[filter:drop-shadow(0_18px_24px_rgb(0_0_0/0.14))]"
          >
            <div className="ca-doc h-full rounded-xl border border-border bg-bg-primary" style={{ ["--ca-fold" as string]: tone.fold }}>
              <span className="ca-doc__fold" aria-hidden="true" />
              <div className={`h-1 w-full bg-gradient-to-r ${tone.bar}`} />
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${tone.text}`} style={{ background: `rgb(${tone.rgb} / 0.1)` }}>
                    <DrawIcon paths={ICONS.doc} className="h-5 w-5" delay={0.4 + i * 0.08} />
                  </span>
                  <div className="min-w-0 pr-4">
                    <p className="break-words text-body-md font-semibold leading-snug text-text-primary hyphens-auto">{a.title}</p>
                    <p className="mt-1 truncate font-mono text-caption text-text-tertiary">{a.subtitle}</p>
                  </div>
                </div>
                {/* ruled "content" lines */}
                <div className="mt-5 space-y-2" aria-hidden="true">
                  {[92, 76, 58].map((w, j) => (
                    <motion.span
                      key={w}
                      className="block h-1.5 origin-left rounded-full bg-bg-tertiary transition-colors duration-500 group-hover:bg-border"
                      style={{ width: `${w}%` }}
                      initial={reduced ? false : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.6 + i * 0.08 + j * 0.1, ease: EASE }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

/* ───────────────────────── Tech stack ───────────────────────── */

const CHIP_COLORS = ["99 102 241", "217 70 239", "245 158 11", "16 185 129", "14 165 233", "236 72 153", "139 92 246"];

const hashOf = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

/** Stack chips pop in one by one and float gently; a big outlined marquee of the stack drifts behind */
export function CaseTechStack({ items }: { items: string[] }) {
  const { ref, run, reduced } = useOnScreen<HTMLDivElement>();
  const loop = [...items, ...items];
  return (
    <div ref={ref} className={`relative ${run ? "ca-run" : ""}`}>
      <ul className="relative z-10 flex flex-wrap gap-2.5">
        {items.map((tech, i) => {
          const c = CHIP_COLORS[hashOf(tech) % CHIP_COLORS.length];
          return (
            <motion.li
              key={tech}
              initial={reduced ? false : { opacity: 0, scale: 0.5, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={vp}
              transition={{ type: "spring", stiffness: 320, damping: 18, delay: i * 0.06 }}
            >
              <span className="ca-float block" style={{ animationDelay: `${-((i * 0.7) % 5.5).toFixed(1)}s` }}>
                <span
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-bg-primary py-1.5 pl-1.5 pr-3.5 text-body-sm font-medium text-text-primary shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-all duration-300 hover:-translate-y-0.5"
                  style={{ ["--c" as string]: c }}
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full font-mono text-[11px] font-bold text-white transition-transform duration-300 group-hover:rotate-12" style={{ background: `rgb(${c})` }}>
                    {tech.replace(/[^A-Za-z0-9А-Яа-я]/g, "").charAt(0).toUpperCase() || "•"}
                  </span>
                  {tech}
                </span>
              </span>
            </motion.li>
          );
        })}
      </ul>
      <div aria-hidden="true" className="pointer-events-none relative -mx-4 mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] sm:-mx-6 lg:mx-0">
        <div className="ca-marquee">
          {loop.map((t, i) => (
            <span key={i} className="px-5 font-brand text-4xl font-semibold tracking-[-0.03em] text-transparent [-webkit-text-stroke:1px_rgb(0_0_0/0.12)] md:text-6xl">
              {t}
              <span className="ml-10 text-accent-primary/30 [-webkit-text-stroke:0]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Outcome ───────────────────────── */

const NUM_RE = /^(?:[<>~≈+]?\d[\d.,]*(?:K|M|k|%|ms|мс|x|×|\+)+[.,;:]?)$/;

/** Outcome as a big quote on a dark card; words light up on scroll and figures glow in gradient */
export function CaseOutcome({ text, label }: { text: string; label: string }) {
  const { ref, run, reduced } = useOnScreen<HTMLDivElement>();
  return (
    <div ref={ref} className={`relative overflow-hidden rounded-3xl bg-[#0B0A14] p-6 text-white sm:p-10 md:p-14 ${run ? "ca-run" : ""}`}>
      <span aria-hidden="true" className="ca-orb -right-24 -top-24 h-72 w-72 bg-indigo-500/35" />
      <span aria-hidden="true" className="ca-orb -bottom-28 -left-16 h-72 w-72 bg-fuchsia-500/25" style={{ animationDelay: "-6s" }} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }}
      />
      <div className="relative">
        <svg viewBox="0 0 48 36" className="h-9 w-12 text-indigo-300" fill="none" aria-hidden="true">
          <motion.path
            d="M4 32c0-12 4-22 16-28M28 32c0-12 4-22 16-28"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={reduced ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          />
        </svg>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">{label}</p>
        <ScrollWords
          text={text}
          className="mt-5 font-brand text-xl font-medium leading-[1.35] tracking-[-0.02em] sm:text-3xl md:text-[2.4rem]"
          renderWord={(w) => (NUM_RE.test(w) ? <span className="ca-grad-text-dark font-semibold">{w}</span> : w)}
        />
      </div>
    </div>
  );
}

/* ───────────────────────── Hard parts ───────────────────────── */

export function CaseHardParts({ items }: { items: { title: string; description: string }[] }) {
  const { ref, run, reduced } = useOnScreen<HTMLOListElement>(0.05);
  return (
    <ol ref={ref} className={`space-y-5 ${run ? "ca-run" : ""}`}>
      {items.map((hp, i) => (
        <motion.li
          key={`${i}-${hp.title.slice(0, 20)}`}
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
        >
          <SpotlightCard className="ca-rim rounded-2xl border border-border bg-bg-primary p-5 transition-transform duration-500 hover:-translate-y-1 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-7">
              <span className="font-brand text-5xl font-semibold leading-none tracking-[-0.04em] sm:w-24 text-transparent [-webkit-text-stroke:1.5px_rgb(99_102_241/0.55)] transition-colors duration-500 group-hover:text-indigo-500/15 sm:text-6xl">
                {pad2(i + 1)}
              </span>
              <div className="min-w-0">
                <h3 className="text-heading-md font-semibold leading-snug text-text-primary">{hp.title}</h3>
                <motion.span
                  aria-hidden="true"
                  className="mt-3 block h-[2px] w-16 origin-left rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                  initial={reduced ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: EASE }}
                />
                <p className="mt-4 text-body-md leading-relaxed text-text-secondary">{hp.description}</p>
              </div>
            </div>
          </SpotlightCard>
        </motion.li>
      ))}
    </ol>
  );
}

/* ───────────────────────── Prev / next ───────────────────────── */

function SlideArrow({ dir }: { dir: "left" | "right" }) {
  const d = dir === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7";
  const out = dir === "left" ? "group-hover:-translate-x-6" : "group-hover:translate-x-6";
  const inn = dir === "left" ? "translate-x-6 group-hover:translate-x-0" : "-translate-x-6 group-hover:translate-x-0";
  return (
    <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-border bg-bg-primary text-text-tertiary transition-colors duration-300 group-hover:border-accent-primary/40 group-hover:bg-accent-primary group-hover:text-white">
      <svg className={`absolute h-5 w-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${out}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
      </svg>
      <svg className={`absolute h-5 w-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${inn}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
      </svg>
    </span>
  );
}

export function CaseNavLink({ href, dir, kicker, title }: { href: string; dir: "prev" | "next"; kicker: string; title: string }) {
  const reduced = useReducedMotion();
  const next = dir === "next";
  return (
    <motion.div
      className={`w-full sm:max-w-[48%] ${next ? "sm:ml-auto" : ""}`}
      initial={reduced ? false : { opacity: 0, x: next ? 24 : -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={vp}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <NextLink
        href={href}
        className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-bg-primary p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-accent-primary/30 hover:shadow-[0_18px_40px_-24px_rgb(79_70_229/0.5)] sm:p-5 ${next ? "flex-row-reverse text-right" : ""}`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-500/[0.07] via-fuchsia-500/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${next ? "bg-gradient-to-l" : ""}`}
        />
        <SlideArrow dir={next ? "right" : "left"} />
        <span className="relative min-w-0 flex-1">
          <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-text-tertiary">{kicker}</span>
          <span className="mt-1 block truncate text-body-md font-semibold text-text-primary transition-colors duration-300 group-hover:text-accent-primary">{title}</span>
        </span>
      </NextLink>
    </motion.div>
  );
}

/** Related case card: lifts on hover with a gradient top rule that grows */
export function RelatedCaseCard({ href, children, index }: { href: string; children: ReactNode; index: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={vp}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className="h-full"
    >
      <NextLink href={href} className="group block h-full">
        <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-bg-secondary/60 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-accent-primary/30 hover:bg-bg-primary hover:shadow-[0_24px_50px_-28px_rgb(79_70_229/0.45)]">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
          {children}
        </div>
      </NextLink>
    </motion.div>
  );
}

/** Bottom "similar project" CTA block with drifting gradient orbs */
export function CaseCtaGlow({ children }: { children: ReactNode }) {
  const { ref, run, reduced } = useOnScreen<HTMLDivElement>();
  return (
    <div ref={ref} className={`relative isolate overflow-hidden rounded-3xl border border-border bg-bg-secondary px-6 py-12 text-center sm:px-10 md:py-16 ${run ? "ca-run" : ""}`}>
      <span aria-hidden="true" className="ca-orb -left-20 -top-24 -z-10 h-64 w-64 bg-indigo-400/25" />
      <span aria-hidden="true" className="ca-orb -bottom-24 -right-16 -z-10 h-64 w-64 bg-fuchsia-400/20" style={{ animationDelay: "-7s" }} />
      <motion.div initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.7, ease: EASE }}>
        {children}
      </motion.div>
    </div>
  );
}
