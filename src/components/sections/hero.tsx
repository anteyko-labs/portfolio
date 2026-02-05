"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { fadeInUp, staggerContainer } from "@/lib/motion";

// Dynamic import for 3D scene with SSR disabled
const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false }
);

const wordContainer = {
  animate: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const wordItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const router = useRouter();
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const title = t("hero.title");
  const words = title.split(" ");
  const tagline = t("hero.tagline");
  const taglineParts = tagline.split(/\s*·\s*/);

  const { scrollYProgress } = useScroll();
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [1, 0.65, 0.35]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.97]);
  const sceneBlur = useTransform(scrollYProgress, [0, 0.2], [0, 5]);
  const sceneFilter = useTransform(sceneBlur, (v) => `blur(${v}px)`);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* 3D Background — при скролле уходит: меньше opacity, scale, blur */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: prefersReducedMotion ? 0.9 : sceneOpacity,
          scale: prefersReducedMotion ? 1 : sceneScale,
          filter: prefersReducedMotion ? "none" : sceneFilter,
        }}
      >
        <HeroScene className="absolute inset-0" />
      </motion.div>

      {/* Gradient blobs — умеренное неоновое свечение, скрыты на мобильных */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
        <div
          className="blob blob-accent w-[300px] md:w-[400px] h-[300px] md:h-[400px] absolute -top-32 -right-32 animate-float-blob"
          style={{ boxShadow: "0 0 80px 20px rgba(99, 102, 241, 0.2), 0 0 140px 40px rgba(99, 102, 241, 0.08)" }}
        />
        <div
          className="blob blob-accent-sub w-[200px] md:w-[300px] h-[200px] md:h-[300px] absolute bottom-1/4 -left-24 animate-float-blob"
          style={{ animationDelay: "-5s", boxShadow: "0 0 70px 18px rgba(129, 140, 248, 0.18), 0 0 120px 35px rgba(129, 140, 248, 0.06)" }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Tagline — разбитая строка в стиле StrategiQ */}
          <motion.p
            className="text-body-sm sm:text-body-md md:text-body-lg text-text-secondary tracking-[0.12em] sm:tracking-[0.2em] md:tracking-[0.35em] uppercase mb-4"
            variants={prefersReducedMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1, transition: { delay: 0.05 } } }}
          >
            {taglineParts.map((part, i) => (
              <span key={i} className="inline-block mr-2 sm:mr-4 last:mr-0">
                {part}
              </span>
            ))}
          </motion.p>

          {/* Main Headline - word stagger, градиент и размер под hero */}
          <motion.h1
            className="text-display-md sm:text-display-lg lg:text-[4.5rem] font-display leading-tight tracking-tight gradient-text"
            variants={prefersReducedMotion ? {} : wordContainer}
          >
            {prefersReducedMotion ? (
              title
            ) : (
              words.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  variants={wordItem}
                >
                  {word}
                </motion.span>
              ))
            )}
          </motion.h1>

          {/* Одна крупная метрика (StrategiQ-style) */}
          <motion.div
            className="mt-6 flex items-baseline gap-3"
            variants={prefersReducedMotion ? {} : fadeInUp}
          >
            <span className="text-4xl sm:text-5xl font-display font-bold text-accent-primary tabular-nums">
              {t("hero.heroMetric")}
            </span>
            <span className="text-body-md text-text-secondary">{t("hero.heroMetricLabel")}</span>
          </motion.div>

          {/* Subtitle — чуть меньший размер, цвет secondary */}
          <motion.p
            className="mt-4 text-body-lg text-text-secondary max-w-2xl"
            variants={prefersReducedMotion ? {} : fadeInUp}
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTAs - magnetic hover */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            variants={prefersReducedMotion ? {} : fadeInUp}
          >
            <MagneticButton>
              <Button
                variant="primary"
                size="lg"
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
                variant="secondary"
                size="lg"
                onClick={() => router.push("/contact")}
              >
                {t("cta.secondary")}
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Trust Line */}
          <motion.p
            className="mt-8 text-body-sm text-text-secondary flex items-center gap-2"
            variants={prefersReducedMotion ? {} : fadeInUp}
          >
            <svg
              className="w-4 h-4 text-success"
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
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator — скрыт на мобильных */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: prefersReducedMotion ? 0 : 0.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex justify-center pt-2"
          style={{ boxShadow: "0 0 20px rgba(99, 102, 241, 0.25), inset 0 0 12px rgba(99, 102, 241, 0.08)" }}
          animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
          transition={
            prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }
        >
          <div
            className="w-1 h-2 rounded-full bg-text-muted/50"
            style={{ boxShadow: "0 0 8px rgba(99, 102, 241, 0.4)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
