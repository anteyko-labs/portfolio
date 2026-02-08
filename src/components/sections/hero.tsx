"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useState, useEffect } from "react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

function HeroCounter({ value, suffix }: { value: string; suffix: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const target = parseInt(value);
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => requestAnimationFrame(tick), 800);
    return () => clearTimeout(timer);
  }, [value]);
  return (
    <span className="text-3xl sm:text-4xl font-display font-bold text-text-primary tabular-nums">
      {display}{suffix}
    </span>
  );
}

// Dynamic import for 3D scene with SSR disabled
const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary" />
    ),
  }
);

export function HeroSection() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const tagline = t("hero.tagline");
  const taglineParts = tagline.split(/\s*·\s*/);

  const { scrollYProgress } = useScroll();
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0.8, 0.5, 0.25]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.97]);
  const sceneBlur = useTransform(scrollYProgress, [0, 0.2], [0, 5]);
  const sceneFilter = useTransform(sceneBlur, (v) => `blur(${v}px)`);

  return (
    <section className="relative min-h-[90dvh] flex items-center overflow-hidden">
      {/* 3D Background — reduced opacity for better text contrast */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: prefersReducedMotion ? 0.7 : sceneOpacity,
          scale: prefersReducedMotion ? 1 : sceneScale,
          filter: prefersReducedMotion ? "none" : sceneFilter,
        }}
      >
        <HeroScene className="absolute inset-0" />
      </motion.div>

      {/* Gradient overlay — darkens left side for text readability */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: `
            linear-gradient(to right, rgba(10,10,11,0.88) 0%, rgba(10,10,11,0.65) 50%, rgba(10,10,11,0.3) 100%),
            radial-gradient(ellipse at 30% 50%, transparent 0%, rgba(10,10,11,0.5) 100%)
          `,
        }}
      />

      {/* Gradient blobs — subtle, hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block z-[2]">
        <div
          className="blob blob-accent w-[300px] md:w-[400px] h-[300px] md:h-[400px] absolute -top-32 -right-32 animate-float-blob"
          style={{ opacity: 0.3 }}
        />
        <div
          className="blob blob-accent-sub w-[200px] md:w-[300px] h-[200px] md:h-[300px] absolute bottom-1/4 -left-24 animate-float-blob"
          style={{ animationDelay: "-5s", opacity: 0.2 }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-3xl"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Tagline — accent-muted with left border */}
          <motion.div
            className="border-l-2 border-accent-primary/60 pl-3 mb-6"
            variants={prefersReducedMotion ? {} : { initial: { opacity: 0, x: -12 }, animate: { opacity: 1, x: 0, transition: { delay: 0.05 } } }}
          >
            <p className="text-body-sm sm:text-body-md text-accent-primary/70 tracking-[0.15em] uppercase font-medium">
              {taglineParts.map((part, i) => (
                <span key={i} className="inline-block mr-3 last:mr-0">
                  {part}
                </span>
              ))}
            </p>
          </motion.div>

          {/* Main Headline — word-by-word reveal */}
          <motion.h1
            className="text-[1.75rem] sm:text-[2.25rem] md:text-display-lg lg:text-display-xl font-display font-bold leading-[1.1] tracking-tight text-balance"
            variants={prefersReducedMotion ? {} : fadeInUp}
          >
            {t("hero.titleAccent").split(" ").map((word, i) => (
              <motion.span
                key={`accent-${i}`}
                className="text-accent-primary inline-block mr-[0.3em]"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {word}
              </motion.span>
            ))}
            <br className="hidden sm:block" />{" "}
            {t("hero.titleRest").split(" ").map((word, i) => (
              <motion.span
                key={`rest-${i}`}
                className="text-text-primary inline-block mr-[0.3em]"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.5 + i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Metric — glass card with counter */}
          <motion.div
            className="mt-8 inline-flex items-center gap-3 bg-bg-elevated/50 backdrop-blur-sm border border-border/60 rounded-xl px-5 py-3"
            variants={prefersReducedMotion ? {} : fadeInUp}
          >
            <HeroCounter value="24" suffix={language === "en" ? "h" : "\u00A0\u0447"} />
            <span className="w-px h-6 bg-border/60" />
            <span className="text-body-sm text-text-tertiary">{t("hero.heroMetricLabel")}</span>
          </motion.div>

          {/* Subtitle — larger, balanced */}
          <motion.p
            className="mt-5 text-body-lg md:text-[1.2rem] text-text-secondary max-w-xl leading-relaxed text-balance"
            variants={prefersReducedMotion ? {} : fadeInUp}
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            variants={prefersReducedMotion ? {} : fadeInUp}
          >
            <MagneticButton>
              <Button
                variant="primary"
                size="lg"
                className="font-semibold"
                onClick={() => router.push("/contact")}
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                {t("cta.primary")}
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/cases")}
              >
                {language === "en" ? "View our work" : "Смотреть кейсы"}
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Trust Line — with top border divider */}
          <motion.div
            className="mt-8 pt-6 border-t border-border/30"
            variants={prefersReducedMotion ? {} : fadeInUp}
          >
            <p className="text-body-md text-text-secondary flex items-center gap-3">
              <svg
                className="w-5 h-5 text-success shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {t("hero.trustLine")}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator — minimal, no neon */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden sm:block"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: prefersReducedMotion ? 0 : 0.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-text-muted/20 flex justify-center pt-2"
          animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
          transition={
            prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }
        >
          <div className="w-1 h-2 rounded-full bg-text-muted/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
