"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import NextLink from "next/link";
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
  backLink?: { href: string; label: string };
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
  metric,
  rightSlot,
  align = "center",
  backgroundImage,
  backLink,
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
        <div className={`blob blob-accent w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] absolute -top-16 -right-16 opacity-30 ${prefersReducedMotion ? "" : "animate-float-blob"}`} />
        <div className={`blob blob-accent-sub w-[160px] h-[160px] sm:w-[260px] sm:h-[260px] absolute bottom-0 -left-10 opacity-25 ${prefersReducedMotion ? "" : "animate-float-blob"}`} style={prefersReducedMotion ? {} : { animationDelay: "-6s" }} />
      </div>

      <div className={`relative ${isSplit ? "grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center" : "max-w-3xl mx-auto"}`}>
        <div className={isSplit ? "max-w-3xl" : ""}>
          {backLink && (
            <AnimatedItem>
              <NextLink
                href={backLink.href}
                className="inline-flex items-center gap-2 text-body-sm font-medium text-text-primary bg-bg-secondary/80 backdrop-blur-sm border border-border/60 rounded-lg px-3.5 py-2 hover:bg-bg-tertiary hover:border-accent-primary/40 hover:text-accent-primary transition-all duration-200 mb-6 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
              >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {backLink.label}
              </NextLink>
            </AnimatedItem>
          )}

          {eyebrow && (
            <AnimatedItem>
              <p className={`text-caption uppercase tracking-[0.35em] text-text-tertiary ${alignClasses}`}>
                {eyebrow}
              </p>
            </AnimatedItem>
          )}

          <AnimatedItem delay={0.05}>
            <h1 className={`mt-4 text-heading-xl sm:text-display-sm md:text-display-md font-display text-text-primary ${alignClasses}`}>
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
