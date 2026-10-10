"use client";

import { ReactNode, useRef, useState } from "react";
import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { CountUp, DrawCheck, EASE, SpotlightCard, Stagger, useLoop } from "@/components/motion/kit";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { useReducedMotion } from "@/lib/hooks";
import { PKG_COLOR, PackageVisual } from "./package-visuals";
import "./services-anim.css";

// Building blocks shared by /services, /pricing and /services/[slug].

/** Package card: pointer spotlight in the package colour, its live scene on top and an optional rotating gradient rim */
export function PackageShell({ id, highlight = false, children }: { id: string; highlight?: boolean; children: ReactNode }) {
  const card = (
    <SpotlightCard color={PKG_COLOR[id]} className={clsx("flex h-full flex-col rounded-2xl bg-bg-primary p-5 sm:p-8", highlight ? "border border-transparent" : "border border-border transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(79,70,229,0.35)]")}>
      <PackageVisual id={id} className="mb-6" />
      {children}
    </SpotlightCard>
  );
  if (!highlight) return card;
  return (
    <div className="sv-ring isolate h-full rounded-2xl p-[1.5px]" style={{ ["--sv-c" as string]: PKG_COLOR[id] }}>
      {card}
    </div>
  );
}

/** Shimmering pill badge ("Popular", "Add-on") */
export function ShineBadge({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "soft" }) {
  return (
    <span
      className={clsx(
        "sv-shimmer inline-flex shrink-0 items-center rounded-full px-3 py-1 text-caption font-semibold",
        tone === "brand" ? "bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-[0_6px_20px_-6px_rgba(124,58,237,0.7)]" : "border border-accent-primary/30 bg-accent-primary/10 text-accent-primary",
      )}
    >
      {children}
    </span>
  );
}

/** Price that counts up when it scrolls into view */
export function Price({ value, className }: { value: string; className?: string }) {
  return <CountUp value={value} duration={1.3} className={clsx("tabular-nums", className)} />;
}

/** Deliverables list: items rise in one by one, each with a self-drawing check */
export function CheckList({ items, className = "space-y-2", itemClassName = "text-body-sm", iconClassName = "h-4 w-4" }: { items: readonly string[]; className?: string; itemClassName?: string; iconClassName?: string }) {
  return (
    <Stagger as="ul" className={className} gap={0.06} y={10}>
      {items.map((item, i) => (
        <span key={i} className={clsx("flex items-start gap-2 text-text-secondary", itemClassName)}>
          <span className="mt-0.5 grid shrink-0 place-items-center rounded-full bg-success/10 p-0.5 text-success">
            <DrawCheck delay={0.25 + i * 0.07} className={iconClassName} />
          </span>
          {item}
        </span>
      ))}
    </Stagger>
  );
}

/** Hero checklist: the delivery gates get checked off one by one, then "ready to ship", on a loop */
export function DeliveryGates({ title, items }: { title: string; items: string[] }) {
  const { language } = useLanguage();
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(1100);
  const n = items.length;
  const s = reduced ? n + 1 : tick % (n + 3);
  const done = Math.min(s, n);
  const ready = s >= n;
  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl border border-border bg-bg-secondary/80 p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-caption uppercase tracking-wider text-text-tertiary">{title}</p>
        <span className="font-mono text-caption tabular-nums text-text-tertiary">
          {done}/{n}
        </span>
      </div>
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-border">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-400" initial={false} animate={{ width: `${Math.round((done / n) * 100)}%` }} transition={{ duration: 0.6, ease: EASE }} />
      </div>
      <ul className="relative space-y-4 text-body-sm text-text-secondary">
        <span aria-hidden="true" className="absolute bottom-3 left-[11px] top-3 w-px bg-border" />
        {items.map((it, i) => {
          const ok = i < done;
          const active = i === done && !ready;
          return (
            <li key={i} className="relative flex items-center gap-3">
              <span className={clsx("relative grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors duration-500", ok ? "border-emerald-500 bg-emerald-500 text-white" : active ? "border-accent-primary bg-bg-primary text-accent-primary" : "border-border bg-bg-primary text-transparent")}>
                {ok ? (
                  <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                    <motion.path d="M4.5 10.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, ease: EASE }} />
                  </svg>
                ) : active ? (
                  <span className="h-3 w-3 rounded-full border-2 border-current border-t-transparent sv-spin" />
                ) : null}
                {active && <span className="sv-ping absolute inset-0 rounded-full border border-accent-primary" />}
              </span>
              <span className={clsx("transition-colors duration-500", ok ? "text-text-primary" : "")}>{it}</span>
            </li>
          );
        })}
      </ul>
      <motion.div
        initial={false}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 8 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-caption text-emerald-600"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {pick({ en: "Ready to ship", ru: "Готово к релизу", zh: "随时可发布", tr: "Yayına hazır", ar: "جاهز للتسليم" }, language)}
      </motion.div>
    </div>
  );
}

/** Milestone billing track for the pricing hero: stages fill in turn and get paid */
export function MilestoneTrack() {
  const { language } = useLanguage();
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(1000);
  const s = reduced ? 4 : tick % 6;
  const stages = pick({ en: ["Stage 1", "Stage 2", "Stage 3"], ru: ["Этап 1", "Этап 2", "Этап 3"], zh: ["阶段 1", "阶段 2", "阶段 3"], tr: ["Aşama 1", "Aşama 2", "Aşama 3"], ar: ["المرحلة 1", "المرحلة 2", "المرحلة 3"] }, language);
  return (
    <div ref={ref} className="mt-5 border-t border-border pt-5">
      <div className="grid grid-cols-3 gap-2">
        {stages.map((st, i) => {
          const fill = s > i + 1 ? 1 : s === i + 1 ? 0.6 : 0;
          const paid = s > i + 1;
          return (
            <div key={st}>
              <div className="h-2 overflow-hidden rounded-full bg-border">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" initial={false} animate={{ width: `${fill * 100}%` }} transition={{ duration: 0.8, ease: EASE }} />
              </div>
              <div className="mt-2 flex items-center justify-between gap-1">
                <span className="font-mono text-[11px] text-text-tertiary">{st}</span>
                <motion.span
                  initial={false}
                  animate={{ opacity: paid ? 1 : 0, scale: paid ? 1 : 0.6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-[11px] font-bold text-white"
                >
                  $
                </motion.span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** A bar that grows when its track scrolls into view (observed on the track, so a scaled-to-zero fill never blocks the trigger) */
function Bar({ value, color, delay }: { value: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  return (
    <div ref={ref} className="h-2 overflow-hidden rounded-full bg-bg-tertiary">
      <motion.div
        className="h-full origin-left rounded-full"
        style={{ width: `${Math.round(value * 100)}%`, background: `linear-gradient(90deg, rgb(${color} / 0.55), rgb(${color}))`, boxShadow: `0 0 12px rgb(${color} / 0.5)` }}
        initial={reduced ? false : { scaleX: 0 }}
        animate={inView || reduced ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      />
    </div>
  );
}

type Axis = { id: string; label: string; values: Record<string, number> };

/** Comparison matrix: bars grow on scroll, hovering a package lights up its whole column */
export function CompareMatrix({ axes, packages }: { axes: Axis[]; packages: { id: string; label: string }[] }) {
  const [col, setCol] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const cell = (id: string) => clsx("rounded-xl border p-3 transition-all duration-300", col === id ? "border-accent-primary/40 bg-bg-primary shadow-[0_16px_40px_-20px_rgba(79,70,229,0.5)]" : "border-border bg-bg-secondary", col && col !== id && "sv-col-dim");
  return (
    <div onPointerLeave={() => setCol(null)} className="space-y-6 md:space-y-3">
      <div className="hidden gap-3 md:grid md:grid-cols-[1.1fr_repeat(3,1fr)]">
        <span />
        {packages.map((p) => (
          <button
            key={p.id}
            type="button"
            onPointerEnter={() => setCol(p.id)}
            onFocus={() => setCol(p.id)}
            onBlur={() => setCol(null)}
            className={clsx("flex items-center gap-2 rounded-xl px-3 py-2 text-left text-body-sm font-semibold text-text-primary transition-all duration-300", col === p.id ? "bg-bg-secondary" : "", col && col !== p.id && "sv-col-dim")}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: `rgb(${PKG_COLOR[p.id]})`, boxShadow: `0 0 12px rgb(${PKG_COLOR[p.id]})` }} />
            {p.label}
          </button>
        ))}
      </div>
      {axes.map((axis, ai) => (
        <motion.div
          key={axis.id}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: ai * 0.08, ease: EASE }}
          className="grid items-center gap-3 md:grid-cols-[1.1fr_repeat(3,1fr)]"
        >
          <p className="text-caption uppercase tracking-wider text-text-tertiary">{axis.label}</p>
          {packages.map((p, pi) => {
            const v = Math.min(Math.max(axis.values[p.id] ?? 1, 1), 3);
            return (
              <div key={p.id} onPointerEnter={() => setCol(p.id)} className={cell(p.id)}>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-body-sm text-text-secondary md:hidden">{p.label}</span>
                  <span className="ml-auto flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: d < v ? `rgb(${PKG_COLOR[p.id]})` : "var(--color-border)" }}
                        initial={reduced ? false : { scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 + ai * 0.08 + pi * 0.06 + d * 0.06 }}
                      />
                    ))}
                  </span>
                </div>
                <Bar value={v / 3} color={PKG_COLOR[p.id]} delay={0.15 + ai * 0.08 + pi * 0.08} />
              </div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
}

const CHIPS = [
  { t: "24h", c: "left-[6%] top-[18%]", r: "-6deg", d: "0s" },
  { t: "MVP", c: "right-[8%] top-[14%]", r: "5deg", d: "-2s" },
  { t: "Web3", c: "left-[10%] bottom-[16%]", r: "4deg", d: "-4s" },
  { t: "</>", c: "right-[12%] bottom-[20%]", r: "-5deg", d: "-1s" },
  { t: "SEO ✓", c: "left-[24%] top-[6%]", r: "3deg", d: "-3s" },
  { t: "$", c: "right-[26%] bottom-[6%]", r: "-3deg", d: "-5s" },
];

/** Closing call to action on a dark aurora with floating chips */
export function AuroraCta({ title, text, primary, secondary, as = "h2" }: { title: string; text: string; primary: { href: string; label: string }; secondary: { href: string; label: string }; as?: "h2" | "h3" }) {
  const H = as;
  const reduced = useReducedMotion();
  const words = title.split(" ");
  const last = words.pop();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative isolate overflow-hidden rounded-3xl bg-[#06060B] px-5 py-14 text-center text-white sm:px-10 md:py-20"
    >
      <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <div aria-hidden="true" className="sv-orbit pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(720px,140%)] rounded-full border border-dashed border-white/10" style={{ transform: "translate(-50%, -50%)" }}>
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-300 shadow-[0_0_16px_4px_rgba(240,171,252,0.7)]" />
        <span className="absolute bottom-[15%] left-[14%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_3px_rgba(103,232,249,0.7)]" />
      </div>
      {CHIPS.map((c) => (
        <span key={c.t} aria-hidden="true" className={clsx("sv-float pointer-events-none absolute hidden rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-caption text-white/70 backdrop-blur md:block", c.c)} style={{ ["--r" as string]: c.r, animationDelay: c.d }}>
          {c.t}
        </span>
      ))}
      <H className="mx-auto max-w-3xl font-brand text-3xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-4xl md:text-5xl">
        {words.join(" ")} <span className="home-gradient-text">{last}</span>
      </H>
      <p className="mx-auto mt-5 max-w-xl text-body-md text-white/60 md:text-body-lg">{text}</p>
      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <MagneticButton>
          <NextLink href={primary.href} className="home-cta-glow inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-body-md font-semibold text-[#0A0A0F] sm:w-auto">
            {primary.label} <span aria-hidden="true">→</span>
          </NextLink>
        </MagneticButton>
        <MagneticButton>
          <NextLink href={secondary.href} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-body-md font-medium text-white backdrop-blur transition-colors hover:bg-white/10 sm:w-auto">
            {secondary.label}
          </NextLink>
        </MagneticButton>
      </div>
    </motion.div>
  );
}
