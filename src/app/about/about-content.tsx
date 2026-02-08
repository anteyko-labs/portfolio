"use client";

import { useMemo } from "react";
import { useLanguage } from "@/lib/language-context";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeader, AnimatedItem } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/link";
import { PrincipleCard } from "@/components/ui/principle-card";

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

const OwnershipIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const industryIcons: Record<string, React.ReactNode> = {
  bank: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 20h20M5 20V9l7-5 7 5v11M9 20v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
    </svg>
  ),
  chain: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  cart: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
  ),
  building: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
};

export function AboutContent() {
  const { t, translations, language } = useLanguage();
  const about = translations.about;
  const metrics = about.metrics;

  const principleIcons = useMemo(() => [
    <ClarityIcon key="clarity" />,
    <PredictabilityIcon key="predictability" />,
    <SpeedIcon key="speed" />,
    <OwnershipIcon key="ownership" />,
  ], []);

  // Access story blocks safely
  const story = about.story as unknown as {
    why: { en: string; ru: string };
    how: { en: string; ru: string };
    who: { en: string; ru: string };
  };

  const industries = (about as unknown as {
    industries: {
      title: { en: string; ru: string };
      items: { name: { en: string; ru: string }; count: string; icon: string }[];
    };
  }).industries;

  const closingCta = (about as unknown as {
    closingCta: { en: string; ru: string };
  }).closingCta;

  return (
    <>
      <PageHero
        title={about.title[language]}
        subtitle={about.subtitle[language]}
        eyebrow={language === "en" ? "About" : "О нас"}
        rightSlot={
          <div className="rounded-2xl border border-border bg-bg-secondary/80 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `
                linear-gradient(to right, rgba(99,102,241,0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(99,102,241,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }} />
            <p className="relative text-caption uppercase tracking-wider text-text-tertiary mb-4">
              {language === "en" ? "Track record" : "Послужной список"}
            </p>
            <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-4">
              {metrics.map((metric) => (
                <div key={metric.value} className="text-center">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-accent-primary tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-caption text-text-secondary mt-1">
                    {metric.label[language]}
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent-primary/20 to-transparent" />
          </div>
        }
      />

      {/* Story — 3 structured blocks */}
      <Section background="secondary" padding="lg">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="space-y-6">
            {[
              { label: language === "en" ? "Why we exist" : "Зачем мы существуем", text: story.why[language] },
              { label: language === "en" ? "How we work" : "Как мы работаем", text: story.how[language] },
              { label: language === "en" ? "Who we work with" : "С кем мы работаем", text: story.who[language] },
            ].map((block, i) => (
              <AnimatedItem key={block.label} delay={i * 0.08}>
                <div className="rounded-xl border border-border/60 bg-bg-primary/40 p-6">
                  <p className="text-caption uppercase tracking-wider text-accent-primary mb-3 font-medium">
                    {block.label}
                  </p>
                  <p className="text-body-lg text-text-secondary leading-relaxed">
                    {block.text}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </div>

          {/* Principles — 2x2 grid */}
          <AnimatedItem delay={0.1}>
            <SectionHeader
              title={about.values.title[language]}
              animate={false}
            />
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {about.values.items.map((item, i) => (
                <PrincipleCard
                  key={`principle-${i}`}
                  title={item.title[language]}
                  description={item.description[language]}
                  evidence={item.evidence[language]}
                  icon={principleIcons[i]}
                />
              ))}
            </div>
          </AnimatedItem>

          {/* Industries */}
          <AnimatedItem delay={0.15}>
            <SectionHeader
              title={industries.title[language]}
              animate={false}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {industries.items.map((ind) => (
                <div
                  key={ind.icon}
                  className="rounded-xl border border-border bg-bg-tertiary/60 p-5 text-center hover:border-accent-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mx-auto mb-3 text-accent-primary">
                    {industryIcons[ind.icon]}
                  </div>
                  <p className="text-body-sm font-medium text-text-primary mb-1">
                    {ind.name[language]}
                  </p>
                  <p className="text-caption text-accent-primary font-bold">
                    {ind.count} {language === "en" ? "projects" : "проектов"}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedItem>

          {/* Toolchain */}
          <AnimatedItem delay={0.2}>
            <div className="p-8 bg-bg-tertiary rounded-2xl border border-border relative overflow-hidden">
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
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
                        <div className="min-w-0">
                          <p className="text-body-sm text-text-primary font-medium mb-1">
                            {item.title[language]}
                          </p>
                          <p className="text-caption text-text-secondary break-words">
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

          {/* Geography */}
          <AnimatedItem delay={0.3}>
            <div className="p-8 bg-bg-tertiary rounded-2xl border border-border relative overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 opacity-10">
                <svg className="w-full h-full text-accent-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <div className="relative">
                <h3 className="text-heading-sm font-medium text-text-primary mb-3">
                  {about.geography.title[language]}
                </h3>
                <p className="text-body-md text-text-secondary mb-5 max-w-xl">
                  {about.geography.description[language]}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { city: language === "en" ? "Dubai" : "Дубай", role: language === "en" ? "HQ" : "Штаб", tz: "GMT+4" },
                    { city: language === "en" ? "Bishkek" : "Бишкек", role: language === "en" ? "Office" : "Офис", tz: "GMT+6" },
                    { city: language === "en" ? "Moscow" : "Москва", role: language === "en" ? "Clients" : "Клиенты", tz: "GMT+3" },
                    { city: language === "en" ? "Remote" : "Удалённо", role: language === "en" ? "Worldwide" : "По миру", tz: "Async" },
                  ].map((loc) => (
                    <div key={loc.city} className="rounded-lg border border-border/60 bg-bg-secondary/50 p-3 text-center">
                      <p className="text-body-sm font-medium text-text-primary">{loc.city}</p>
                      <p className="text-caption text-text-tertiary">{loc.role}</p>
                      <p className="text-caption text-accent-primary font-mono mt-1">{loc.tz}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedItem>

          {/* Team */}
          <AnimatedItem delay={0.35}>
            <div className="rounded-xl border border-border bg-bg-secondary/60 p-6 flex items-center gap-5">
              <div className="flex -space-x-3 shrink-0">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-bg-tertiary border-2 border-bg-secondary flex items-center justify-center">
                    <svg className="w-4 h-4 text-text-tertiary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-body-sm font-medium text-text-primary">
                  {language === "en" ? "5+ engineers, designers, and product thinkers" : "5+ инженеров, дизайнеров и продуктовых мыслителей"}
                </p>
                <p className="text-caption text-text-tertiary mt-0.5">
                  {language === "en" ? "Multi-discipline team. Full-stack by default." : "Мультидисциплинарная команда. Full-stack по умолчанию."}
                </p>
              </div>
            </div>
          </AnimatedItem>

          {/* CTA */}
          <AnimatedItem delay={0.4}>
            <div className="text-center">
              <p className="text-heading-md font-display text-text-primary mb-8">
                {closingCta[language]}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ButtonLink href="/contact" buttonVariant="primary" size="lg">
                  {language === "en" ? "Start a conversation" : "Начать разговор"}
                </ButtonLink>
                <ButtonLink href="/cases" buttonVariant="secondary" size="lg">
                  {language === "en" ? "See our work" : "Смотреть кейсы"}
                </ButtonLink>
              </div>
            </div>
          </AnimatedItem>
        </div>
      </Section>
    </>
  );
}
