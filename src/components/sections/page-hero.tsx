"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/lib/hooks";
import { Section, AnimatedItem } from "@/components/ui/section";

interface PageHeroMetric {
  label: string;
  value: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  metric?: PageHeroMetric;
  rightSlot?: ReactNode;
  align?: "left" | "center";
  backgroundImage?: string;
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
  metric,
  rightSlot,
  align = "center",
  backgroundImage,
}: PageHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const isSplit = Boolean(rightSlot);
  const alignClasses = align === "center" ? "text-center" : "text-left";

  return (
    <Section background="primary" padding="lg" className="relative overflow-hidden">
      {/* Tech background: grid + blobs + noise */}
      <div className="absolute inset-0 pointer-events-none page-hero-grid" aria-hidden />

      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent" />
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none page-hero-noise" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <div className={`blob blob-accent w-[320px] h-[320px] absolute -top-16 -right-16 opacity-30 ${prefersReducedMotion ? "" : "animate-float-blob"}`} />
        <div className={`blob blob-accent-sub w-[260px] h-[260px] absolute bottom-0 -left-10 opacity-25 ${prefersReducedMotion ? "" : "animate-float-blob"}`} style={prefersReducedMotion ? {} : { animationDelay: "-6s" }} />
      </div>

      <div className={`relative ${isSplit ? "grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center" : "max-w-3xl mx-auto"}`}>
        <div className={isSplit ? "max-w-3xl" : ""}>
          {eyebrow && (
            <AnimatedItem>
              <p className={`text-caption uppercase tracking-[0.35em] text-text-tertiary ${alignClasses}`}>
                {eyebrow}
              </p>
            </AnimatedItem>
          )}

          <AnimatedItem delay={0.05}>
            <h1 className={`mt-4 text-display-sm md:text-display-md font-display text-text-primary ${alignClasses}`}>
              {title}
            </h1>
          </AnimatedItem>

          {subtitle && (
            <AnimatedItem delay={0.1}>
              <p className={`mt-5 text-body-lg text-text-secondary ${alignClasses}`}>
                {subtitle}
              </p>
            </AnimatedItem>
          )}

          {metric && (
            <AnimatedItem delay={0.15}>
              <div className={`mt-6 flex items-baseline gap-3 ${align === "center" ? "justify-center" : ""}`}>
                <span className="text-4xl sm:text-5xl font-display font-bold text-accent-primary tabular-nums">
                  {metric.value}
                </span>
                <span className="text-body-md text-text-secondary">{metric.label}</span>
              </div>
            </AnimatedItem>
          )}
        </div>

        {rightSlot && (
          <motion.div
            className="mt-8 lg:mt-0"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {rightSlot}
          </motion.div>
        )}
      </div>
    </Section>
  );
}
