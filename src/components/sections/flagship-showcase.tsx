"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ButtonLink } from "@/components/ui/link";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { useCountUp, useInViewOnce } from "@/lib/animation-hooks";

// ---------------------------------------------------------------------------
// FlagshipShowcase — the second cinematic moment of the homepage.
//
// A full-bleed DARK section that showcases the ArmaDEX flagship case (an L1
// blockchain with a built-in perpetual DEX). It reuses the hero's dark/glass
// language (deep near-black surface, indigo halo, liquid-glass-dark eyebrow)
// and frames the product video inside a "terminal/browser" figure with a
// subtle scroll-driven parallax.
//
// Real data is sourced from src/lib/cases-data.ts (case-1 / web3-l1-dex):
//   - 7 active validators
//   - 1.6M+ finalized batches (testnet alpha)
//   - 99%+ success rate
//   - sub-250ms commit latency
//
// Integration notes (for the agent placing this on the homepage):
//   - Self-contained, default-exported via the named `FlagshipShowcase`.
//   - References utility class names `.section-dark`, `.grid-dots` and the
//     `<SectionBeam />` component (from src/components/effects/section-beam.tsx)
//     that ANOTHER agent is creating in parallel. To stay safe before that
//     lands, every one of those is given a plain inline fallback so the section
//     renders correctly on its own. When the shared styles exist, the class
//     names take over without code changes here.
//   - prefers-reduced-motion: parallax is disabled, the count-up is skipped
//     (handled inside useCountUp), and the video is replaced by its poster.
// ---------------------------------------------------------------------------

const ARMADEX_SLUG = "web3-l1-dex";

type Metric = {
  value: string;
  label: { en: string; ru: string };
};

// Real, NDA-safe metrics pulled from the case outcome.
const METRICS: Metric[] = [
  {
    value: "7",
    label: { en: "Active validators", ru: "Активных валидаторов" },
  },
  {
    value: "1.6M+",
    label: { en: "Finalized batches", ru: "Финализированных батчей" },
  },
  {
    value: "99%+",
    label: { en: "Success rate", ru: "Успешность" },
  },
  {
    value: "<250ms",
    label: { en: "Commit latency", ru: "Латентность коммита" },
  },
];

const COPY = {
  eyebrow: { en: "Flagship · Web3", ru: "Флагман · Web3" },
  headline: {
    en: "A Layer‑1 blockchain with a perpetual DEX, built end‑to‑end.",
    ru: "Layer‑1 блокчейн со встроенной DEX перпетуалов, собранный end‑to‑end.",
  },
  body: {
    en: "Deterministic EVM, native token economics, an on‑chain perpetual orderbook and a privacy layer — plus a full product suite: trading terminal, block explorer, operator panel, faucet and SDKs. Running on testnet alpha.",
    ru: "Детерминированный EVM, экономика нативного токена, ончейн‑ордербук перпетуалов и слой приватности — плюс полный продуктовый контур: торговый терминал, эксплорер, панель оператора, фаукнет и SDK. Работает на testnet alpha.",
  },
  cta: { en: "Explore the case", ru: "Открыть кейс" },
  figureLabel: { en: "ArmaDEX · live product", ru: "ArmaDEX · живой продукт" },
};

// A single animated stat. Drives the count-up only once the figure scrolls in.
function MetricPill({ metric, inView }: { metric: Metric; inView: boolean }) {
  const { language } = useLanguage();
  const display = useCountUp(metric.value, inView);

  return (
    <div className="flex flex-col gap-1">
      <span className="font-display text-2xl md:text-3xl font-bold text-white tabular-nums">
        {display}
      </span>
      <span className="text-caption font-mono uppercase tracking-[0.12em] text-white/55">
        {metric.label[language]}
      </span>
    </div>
  );
}

export function FlagshipShowcase() {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [statsRef, statsInView] = useInViewOnce(0.4);

  // Scroll-driven parallax for the video figure. The figure drifts up slightly
  // as the section scrolls through the viewport. Disabled under reduced motion.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const figureY = prefersReducedMotion ? 0 : parallaxY;

  return (
    <section
      ref={sectionRef}
      // `.section-dark` is provided by a parallel agent; the inline background
      // is a self-sufficient fallback that matches the hero's dark surface.
      className="section-dark relative overflow-hidden"
      style={{ backgroundColor: "#0A0A0B" }}
      aria-labelledby="flagship-heading"
    >
      {/* Subtle dotted grid — `.grid-dots` from the shared effects layer, with
          an inline radial-dot fallback so it reads even before that lands. */}
      <div
        className="grid-dots absolute inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle 1px at 1px 1px, rgba(255,255,255,0.06), transparent 0)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden="true"
      />

      {/* Restrained indigo halo behind the content — mirrors the hero halo. */}
      <div
        className="absolute left-1/2 top-[20%] -translate-x-1/2 w-[56rem] max-w-[92vw] h-[24rem] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.16), transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* SectionBeam — created in parallel (src/components/effects/section-beam.tsx).
          Referenced by name per the brief; intentionally NOT imported so this
          file does not break before that module exists. A thin gradient hairline
          along the top edge stands in for it as a graceful fallback. */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div className="flex flex-col items-start">
            <motion.span
              className="liquid-glass-dark inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-caption font-mono uppercase tracking-[0.16em] text-white/85"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
              {COPY.eyebrow[language]}
            </motion.span>

            <motion.h2
              id="flagship-heading"
              className="mt-6 font-display font-extrabold text-white text-balance text-3xl sm:text-4xl md:text-5xl leading-[1.08]"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              {COPY.headline[language]}
            </motion.h2>

            <motion.p
              className="mt-5 max-w-xl text-body-md md:text-body-lg text-white/70"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.12 }}
            >
              {COPY.body[language]}
            </motion.p>

            {/* Stats row */}
            <div
              ref={statsRef}
              className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"
            >
              {METRICS.map((metric) => (
                <MetricPill
                  key={metric.label.en}
                  metric={metric}
                  inView={statsInView}
                />
              ))}
            </div>

            <div className="mt-10">
              <ButtonLink
                href={`/cases/${ARMADEX_SLUG}`}
                buttonVariant="primary"
                size="lg"
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                }
                iconPosition="right"
              >
                {COPY.cta[language]}
              </ButtonLink>
            </div>
          </div>

          {/* Video figure column — terminal/browser frame with parallax */}
          <motion.div style={{ y: figureY }} className="relative w-full">
            <figure className="relative rounded-2xl overflow-hidden border border-white/12 bg-[#0C0C0F] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.7)]">
              {/* Terminal/browser chrome bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                <span className="ml-3 text-caption font-mono text-white/45 truncate">
                  {COPY.figureLabel[language]}
                </span>
              </div>

              {/* Media: video when motion is allowed, poster otherwise. */}
              <div className="relative aspect-video bg-black">
                {prefersReducedMotion ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/videos/armadex-poster.jpg"
                    alt={
                      language === "en"
                        ? "ArmaDEX trading terminal"
                        : "Торговый терминал ArmaDEX"
                    }
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/videos/armadex-poster.jpg"
                    aria-hidden="true"
                  >
                    <source src="/videos/armadex.mp4" type="video/mp4" />
                  </video>
                )}
                {/* Soft inner vignette so the frame edges feel cinematic. */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 120px rgba(0,0,0,0.45)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </figure>

            {/* Indigo glow anchoring the figure to the dark surface. */}
            <div
              className="absolute -inset-6 -z-10 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(79,70,229,0.18), transparent 70%)",
              }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
