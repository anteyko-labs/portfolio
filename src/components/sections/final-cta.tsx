"use client";

import { useLanguage } from "@/lib/language-context";
import { Section, AnimatedItem } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/link";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionBeam } from "@/components/effects/section-beam";

export function FinalCTASection() {
  const { language } = useLanguage();

  return (
    // Dark bookend — echoes the hero so the page ends as it began. `.section-dark`
    // remaps the color tokens within scope, so the child text/border/button
    // utilities invert to light-on-dark with no per-child overrides. The beam
    // motif sits here, just above the footer where logo-fusion fires, so the two
    // read as one connected system.
    <Section
      padding="xl"
      animate={false}
      className="section-dark relative overflow-hidden final-cta-section"
    >
      {/* Soft white fade at the top so the dark surface blends down from the
          light FAQ section above instead of hard-cutting. */}
      <div className="section-blend-top" aria-hidden />

      {/* Indigo halo — extends the logo-fusion glow language behind the card. */}
      <div className="section-halo" style={{ ["--halo-y" as string]: "50%" }} aria-hidden />

      {/* Section connector beam — energy threads down toward the footer. */}
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none" aria-hidden>
        <SectionBeam height="full" variant="dark" />
      </div>

      <div className="relative z-10 overflow-hidden rounded-3xl border border-border bg-bg-tertiary px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
        {/* Faint dot grid (light dots on the dark card) for tactile depth. */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle 1px at 1px 1px, rgba(255,255,255,0.05), transparent 0)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        {/* Left: content (asymmetric on desktop) */}
        <div className="max-w-xl lg:max-w-2xl lg:text-left">
          <AnimatedItem>
            <h2 className="text-heading-xl sm:text-display-sm md:text-display-md font-display text-text-primary leading-tight">
              {language === "en"
                ? "Not sure if we're a fit?"
                : "Не уверены, что мы подходим?"}
              <br />
              <span className="text-accent-primary font-display">
                {language === "en"
                  ? "Let's find out — fast."
                  : "Давайте выясним — быстро."}
              </span>
            </h2>
          </AnimatedItem>

          <AnimatedItem delay={0.1}>
            <p className="mt-6 text-body-lg text-text-secondary">
              {language === "en"
                ? "20 minutes — we'll discuss your task and give an honest assessment. No strings attached."
                : "45 минут — обсудим вашу задачу, дадим честную оценку. Без обязательств."}
            </p>
          </AnimatedItem>

          <AnimatedItem delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <MagneticButton className="inline-flex">
                <ButtonLink
                  href="/contact"
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
                  {language === "en"
                    ? "Get an estimate in 24 hours"
                    : "Получить оценку за 24 часа"}
                </ButtonLink>
              </MagneticButton>
              <MagneticButton className="inline-flex">
                <ButtonLink href="/process" buttonVariant="secondary" size="lg">
                  {language === "en"
                    ? "See how we work"
                    : "Как мы работаем"}
                </ButtonLink>
              </MagneticButton>
            </div>
          </AnimatedItem>

          <AnimatedItem delay={0.3}>
            <p className="mt-8 text-body-sm text-text-secondary flex items-center gap-2 lg:justify-start justify-center tracking-wider">
              <svg
                className="w-6 h-6 text-success shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {language === "en"
                ? "No commitments. No upsell. Just an honest 45-minute chat."
                : "Без обязательств. Без навязывания. Просто честный 45-минутный разговор."}
            </p>
          </AnimatedItem>
        </div>

        {/* Right: visual balance (empty on mobile, spacer on desktop) */}
        <div className="hidden lg:block flex-1 max-w-md min-h-[240px]" aria-hidden />
        </div>
      </div>
    </Section>
  );
}
