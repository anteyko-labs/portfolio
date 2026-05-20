"use client";

import { useLanguage } from "@/lib/language-context";
import { Section, AnimatedItem } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/link";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function FinalCTASection() {
  const { language } = useLanguage();

  return (
    <Section background="gradient" padding="xl" className="relative final-cta-section overflow-hidden">
      {/* Background: grid + blobs + noise */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none final-cta-bg-grid" aria-hidden />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-accent-primary/10 blur-2xl sm:blur-3xl animate-float-blob" />
        <div className="blob blob-accent w-[400px] h-[400px] absolute -top-20 left-1/4 opacity-40 animate-float-blob" style={{ animationDelay: "-3s" }} />
        <div className="blob blob-accent-sub w-[300px] h-[300px] absolute bottom-0 right-1/4 opacity-30 animate-float-blob" style={{ animationDelay: "-7s" }} />
        {/* Large blob right side (desktop) for asymmetry */}
        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] rounded-full bg-accent-primary/15 blur-3xl translate-x-1/4 animate-float-blob" style={{ animationDelay: "-5s" }} />
        <div className="hidden lg:block absolute bottom-0 left-0 w-[280px] h-[280px] rounded-full bg-accent-secondary/20 blur-2xl -translate-x-1/4 animate-float-blob" style={{ animationDelay: "-2s" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none final-cta-noise" aria-hidden />
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="particle hidden sm:block"
            style={{
              "--left": `${5 + (i * 37) % 90}%`,
              "--delay": `${(i * 0.7) % 12}s`,
              "--duration": `${8 + (i % 6) * 2}s`,
              "--size": `${2 + (i % 3)}px`,
              "--drift": `${-30 + (i % 7) * 10}px`,
              "--opacity": `${0.2 + (i % 4) * 0.1}`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        {/* Left: content (asymmetric on desktop) */}
        <div className="max-w-xl lg:max-w-2xl lg:text-left">
          <AnimatedItem>
            <h2 className="text-heading-xl sm:text-display-sm md:text-display-md font-display text-text-primary leading-tight">
              {language === "en"
                ? "Not sure if we're a fit?"
                : "Не уверены, что мы подходим?"}
              <br />
              <span className="text-text-secondary font-normal">
                {language === "en"
                  ? "Let's find out in one call."
                  : "Давайте проверим за один звонок."}
              </span>
            </h2>
          </AnimatedItem>

          <AnimatedItem delay={0.1}>
            <p className="mt-6 text-body-lg text-text-secondary">
              {language === "en"
                ? "20 minutes — we'll discuss your task and give an honest assessment. No strings attached."
                : "20 минут — обсудим вашу задачу, дадим честную оценку. Без обязательств."}
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
                    ? "Book a 20-min call"
                    : "Записаться на 20-мин звонок"}
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
                ? "No commitments. No upsell. Just an honest 20-minute chat."
                : "Без обязательств. Без навязывания. Просто честный 20-минутный разговор."}
            </p>
          </AnimatedItem>
        </div>

        {/* Right: visual weight (empty on mobile, blob area on desktop) */}
        <div className="hidden lg:block flex-1 max-w-md min-h-[320px]" aria-hidden />
      </div>
    </Section>
  );
}
