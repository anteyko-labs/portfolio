"use client";

import { Link as NextLink } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { Section, AnimatedItem } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { TiltCard } from "@/components/ui/tilt-card";
import { CategoryBadge } from "@/components/ui/badge";
import { MetricPill } from "@/components/ui/metric-pill";
import { ButtonLink } from "@/components/ui/link";
import {
  type MicroCase,
  getRelatedFlagshipCases,
  microCases,
} from "@/lib/cases-data";
import { CaseBottomCTA } from "@/components/case-bottom-cta";
import { MicroVisual } from "@/components/cases-catalog/micro-visuals";

interface MicroCaseDetailContentProps {
  caseItem: MicroCase;
}

export function MicroCaseDetailContent({ caseItem }: MicroCaseDetailContentProps) {
  const { language, t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  
  // Get related flagship cases by same category
  const relatedFlagship = getRelatedFlagshipCases(caseItem.category, 2);
  
  // Get other micro cases in same category (excluding current)
  const relatedMicro = microCases
    .filter((c) => c.category === caseItem.category && c.id !== caseItem.id)
    .slice(0, 4);

  // Category descriptions for context
  const categoryDescriptions = {
    web: {
      en: "Web development expertise including responsive design, performance optimization, and modern frameworks.",
      ru: "Экспертиза веб-разработки: адаптивный дизайн, оптимизация производительности, современные фреймворки.",
    },
    product: {
      en: "Product development from concept to launch, including UX research, prototyping, and iterative delivery.",
      ru: "Разработка продукта от концепции до запуска: UX-исследования, прототипирование, итеративная поставка.",
    },
    web3: {
      en: "Blockchain and Web3 solutions including smart contracts, wallet integration, and DeFi protocols.",
      ru: "Блокчейн и Web3 решения: смарт-контракты, интеграция кошельков, DeFi протоколы.",
    },
    infrastructure: {
      en: "Backend infrastructure, DevOps, CI/CD pipelines, and scalable architecture design.",
      ru: "Бэкенд-инфраструктура, DevOps, CI/CD пайплайны, проектирование масштабируемой архитектуры.",
    },
  };

  const index = microCases.findIndex((c) => c.id === caseItem.id);
  const next = microCases[(index + 1) % microCases.length];
  const en = language === "en";
  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <>
      <section className="relative overflow-hidden bg-bg-primary pb-10 pt-10 md:pb-14 md:pt-14">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-accent-primary/10 blur-3xl" aria-hidden="true" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary">
            <NextLink href="/cases" className="inline-flex items-center gap-2 transition-colors hover:text-accent-primary">
              <span aria-hidden="true">←</span> {en ? "All work" : "Все работы"}
            </NextLink>
            <span>
              {String(index + 1).padStart(2, "0")} / {String(microCases.length).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-8">
            <CategoryBadge category={caseItem.category} />
          </div>
          <h1 className="mt-5 max-w-4xl overflow-hidden pb-[0.06em] font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-text-primary sm:text-6xl">
            <motion.span
              className="block"
              initial={prefersReducedMotion ? false : { y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              {caseItem.title[language]}
            </motion.span>
          </h1>
          <motion.p
            className="mt-4 max-w-2xl text-heading-md text-text-secondary"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            {caseItem.what[language]}
          </motion.p>
        </div>
      </section>

      <section className="bg-bg-primary pb-14 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          >
            <MicroVisual id={caseItem.id} category={caseItem.category} />
          </motion.div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <AnimatedItem>
              <div className="h-full rounded-2xl border border-border bg-bg-secondary p-6 md:p-8">
                <p className="font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary">{en ? "What we did" : "Что сделали"}</p>
                <p className="mt-3 text-heading-md text-text-primary">{caseItem.what[language]}</p>
                <p className="mt-3 text-body-md text-text-secondary">{categoryDescriptions[caseItem.category][language]}</p>
              </div>
            </AnimatedItem>
            <AnimatedItem delay={0.08}>
              <div className="relative h-full overflow-hidden rounded-2xl bg-text-primary p-6 text-white md:p-8">
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-accent-primary/40 blur-3xl" aria-hidden="true" />
                <p className="relative font-mono text-caption uppercase tracking-[0.16em] text-white/50">{en ? "Outcome" : "Результат"}</p>
                <p className="relative mt-3 font-brand text-2xl font-semibold leading-snug tracking-tight md:text-3xl">{caseItem.outcome[language]}</p>
              </div>
            </AnimatedItem>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border p-5 md:p-6">
            <p className="text-body-md text-text-secondary">
              {en ? "Want something similar in your product?" : "Хотите такое же в вашем продукте?"}
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact" buttonVariant="primary">
                {en ? "Discuss the project" : "Обсудить проект"}
              </ButtonLink>
              <ButtonLink href={`/cases/${next.id}`} buttonVariant="secondary">
                {en ? "Next work →" : "Следующая работа →"}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Related Flagship Cases */}
      {relatedFlagship.length > 0 && (
        <Section background="primary" padding="lg">
          <h2 className="text-display-sm font-display text-text-primary mb-2">
            {language === "en" ? "Related flagship cases" : "Связанные ключевые кейсы"}
          </h2>
          <p className="text-body-md text-text-secondary mb-8">
            {language === "en" 
              ? "Deep dives into similar projects" 
              : "Детальные разборы похожих проектов"}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedFlagship.map((flagship, index) => (
              <AnimatedItem key={flagship.id} delay={index * 0.1}>
                <NextLink href={`/cases/${flagship.slug}`} className="block h-full group">
                  <TiltCard
                    variant="bordered"
                    padding="none"
                    tiltAmount={8}
                    noiseHoverOpacity={0.03}
                    className="h-full"
                  >
                    <div className="relative h-40 bg-bg-tertiary overflow-hidden rounded-t-2xl">
                      <div className="absolute top-4 left-4 z-10">
                        <CategoryBadge category={flagship.category} />
                      </div>
                      {flagship.artifactHint && (
                        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-lg border border-border bg-bg-primary/90 backdrop-blur-sm text-caption font-mono text-accent-primary">
                          {flagship.artifactHint[language]}
                        </div>
                      )}
                      <div
                        className="absolute inset-0 opacity-60"
                        style={{
                          backgroundImage: `
                            linear-gradient(to right, rgba(10,10,10,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(10,10,10,0.05) 1px, transparent 1px)
                          `,
                          backgroundSize: "24px 24px",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/60 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-heading-md font-medium text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                        {flagship.title[language]}
                      </h3>
                      <p className="text-body-sm text-text-secondary line-clamp-2 mb-3">
                        {flagship.summary[language]}
                      </p>
                      {flagship.metrics && flagship.metrics.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {flagship.metrics.slice(0, 2).map((metric) => (
                            <MetricPill
                              key={`${flagship.id}-${metric.value}`}
                              label={metric.label[language]}
                              value={metric.value}
                              tone="primary"
                            />
                          ))}
                        </div>
                      )}
                      <span className="mt-4 inline-flex items-center text-body-sm text-accent-primary font-medium group-hover:gap-2 transition-all">
                        {t("cta.viewCase")}
                        <svg
                          className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
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
                      </span>
                    </div>
                  </TiltCard>
                </NextLink>
              </AnimatedItem>
            ))}
          </div>
        </Section>
      )}

      {/* Related Micro Cases */}
      {relatedMicro.length > 0 && (
        <Section background="secondary" padding="lg">
          <h2 className="text-heading-lg font-medium text-text-primary mb-2">
            {language === "en" ? "More in this category" : "Ещё в этой категории"}
          </h2>
          <p className="text-body-sm text-text-secondary mb-6">
            {language === "en" 
              ? "Other micro cases with similar focus" 
              : "Другие микро-кейсы схожей тематики"}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedMicro.map((micro, index) => (
              <AnimatedItem key={micro.id} delay={index * 0.05}>
                <NextLink href={`/cases/${micro.id}`} className="block h-full group">
                  <motion.div
                    className="h-full"
                    whileHover={prefersReducedMotion ? {} : { y: -4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Card
                      variant="bordered"
                      hover
                      padding="md"
                      className="h-full"
                    >
                      <h3 className="text-heading-sm font-medium text-text-primary mb-1 group-hover:text-accent-primary transition-colors line-clamp-2">
                        {micro.title[language]}
                      </h3>
                      <p className="text-caption text-text-muted mb-2">
                        {micro.what[language]}
                      </p>
                      <p className="text-body-sm text-text-secondary line-clamp-2">
                        {micro.outcome[language]}
                      </p>
                    </Card>
                  </motion.div>
                </NextLink>
              </AnimatedItem>
            ))}
          </div>
        </Section>
      )}

      {/* Back to all cases */}
      <Section background="primary" padding="md">
        <div className="text-center">
          <ButtonLink href="/cases" buttonVariant="ghost" className="inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {language === "en" ? "Back to all cases" : "Назад ко всем кейсам"}
          </ButtonLink>
        </div>
      </Section>

      {/* Universal bottom CTA */}
      <CaseBottomCTA />
    </>
  );
}
