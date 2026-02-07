"use client";

import { useMemo } from "react";
import { useLanguage } from "@/lib/language-context";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeader, AnimatedItem } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/link";
import { PrincipleCard } from "@/components/ui/principle-card";

// Icon components for principles (to avoid creating JSX outside component)
const ClarityIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const PredictabilityIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const SpeedIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export function AboutContent() {
  const { t, translations, language } = useLanguage();
  const about = translations.about;
  const metrics = about.metrics;
  
  // Memoize principle icons to avoid recreating on each render
  const principleIcons = useMemo(() => [
    <ClarityIcon key="clarity" />,
    <PredictabilityIcon key="predictability" />,
    <SpeedIcon key="speed" />,
  ], []);

  return (
    <>
      <PageHero
        title={about.title[language]}
        subtitle={about.subtitle[language]}
        eyebrow={language === "en" ? "About" : "О нас"}
        rightSlot={
          <div className="rounded-2xl border border-border bg-bg-secondary/80 p-6 relative overflow-hidden">
            {/* Techno panel background */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `
                linear-gradient(to right, rgba(99,102,241,0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(99,102,241,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }} />
            <p className="relative text-caption uppercase tracking-wider text-text-tertiary mb-4">
              {language === "en" ? "Operating metrics" : "Ключевые метрики"}
            </p>
            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4">
              {metrics.map((metric, index) => (
                <div key={metric.value} className="text-center">
                  <div className="text-3xl sm:text-4xl font-display font-bold text-accent-primary tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-caption text-text-secondary mt-1">
                    {metric.label[language]}
                  </div>
                </div>
              ))}
            </div>
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent-primary/20 to-transparent" />
          </div>
        }
      />

      <Section background="secondary" padding="lg">
        <div className="max-w-3xl mx-auto space-y-16">
          <AnimatedItem>
            <div className="prose prose-invert max-w-none">
              <p className="text-body-lg text-text-secondary whitespace-pre-line leading-relaxed">
                {about.story[language]}
              </p>
            </div>
          </AnimatedItem>

          <AnimatedItem delay={0.1}>
            <h2 className="text-heading-lg font-display text-text-primary mb-6">
              {about.values.title[language]}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {about.values.items.map((item, i) => (
                <PrincipleCard
                  key={`principle-${item.title.en.toLowerCase().replace(/\s+/g, '-')}`}
                  title={item.title[language]}
                  description={item.description[language]}
                  evidence={item.evidence[language]}
                  icon={principleIcons[i % principleIcons.length]}
                />
              ))}
            </div>
          </AnimatedItem>

          <AnimatedItem delay={0.2}>
            <div className="p-8 bg-bg-tertiary rounded-2xl border border-border relative overflow-hidden">
              {/* Techno grid background */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `
                  radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)
                `,
                backgroundSize: '24px 24px',
              }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-heading-sm font-medium text-text-primary">
                    {about.toolchain.title[language]}
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {about.toolchain.items.map((item) => (
                    <div key={`tool-${item.title.en.toLowerCase().replace(/\s+/g, '-')}`} className="group rounded-xl border border-border bg-bg-secondary/60 p-4 hover:border-accent-primary/30 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-success mt-2 shrink-0" />
                        <div>
                          <p className="text-body-sm text-text-primary font-medium mb-1">
                            {item.title[language]}
                          </p>
                          <p className="text-caption text-text-secondary">
                            {item.description[language]}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem delay={0.3}>
            <div className="p-8 bg-bg-tertiary rounded-2xl border border-border relative overflow-hidden">
              {/* Globe icon background */}
              <div className="absolute top-4 right-4 w-24 h-24 opacity-10">
                <svg className="w-full h-full text-accent-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <div className="relative flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-heading-sm font-medium text-text-primary mb-2">
                    {about.geography.title[language]}
                  </h3>
                  <p className="text-body-md text-text-secondary">
                    {about.geography.description[language]}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-bg-secondary border border-border text-caption text-text-secondary">
                      🇰🇬 Kyrgyzstan
                    </span>
                    <span className="px-3 py-1 rounded-full bg-bg-secondary border border-border text-caption text-text-secondary">
                      🇦🇪 Dubai
                    </span>
                    <span className="px-3 py-1 rounded-full bg-bg-secondary border border-border text-caption text-text-secondary">
                      🌍 Remote-first
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4">
              <ButtonLink href="/contact" buttonVariant="primary" size="lg">
                {t("cta.primary")}
              </ButtonLink>
              <ButtonLink href="/cases" buttonVariant="secondary" size="lg">
                {language === "en" ? "View our work" : "Смотреть кейсы"}
              </ButtonLink>
            </div>
          </AnimatedItem>
        </div>
      </Section>
    </>
  );
}
