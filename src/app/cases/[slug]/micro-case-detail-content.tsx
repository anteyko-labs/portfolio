"use client";

import NextLink from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { PageHero } from "@/components/sections/page-hero";
import { Section, AnimatedItem } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { TiltCard } from "@/components/ui/tilt-card";
import { CategoryBadge } from "@/components/ui/badge";
import { MetricPill } from "@/components/ui/metric-pill";
import { ButtonLink } from "@/components/ui/link";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import {
  type MicroCase,
  getRelatedFlagshipCases,
  microCases,
} from "@/lib/cases-data";
import { CaseBottomCTA } from "@/components/case-bottom-cta";

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

  return (
    <>
      <PageHero
        title={caseItem.title[language]}
        subtitle={caseItem.what[language]}
        eyebrow={language === "en" ? "Micro Case" : "Микро-кейс"}
        backLink={{ href: "/cases", label: language === "en" ? "All Cases" : "Все кейсы" }}
        rightSlot={
          <div className="rounded-2xl border border-border bg-bg-secondary/80 backdrop-blur-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <CategoryBadge category={caseItem.category} />
              <span className="text-caption text-text-tertiary uppercase tracking-wider">
                {language === "en" ? "Category" : "Категория"}
              </span>
            </div>
            <p className="text-body-sm text-text-secondary">
              {categoryDescriptions[caseItem.category][language]}
            </p>
          </div>
        }
      />

      {/* Main content */}
      <Section background="secondary" padding="lg">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={prefersReducedMotion ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Outcome highlight */}
          <motion.div 
            variants={prefersReducedMotion ? {} : fadeInUp}
            className="mb-12"
          >
            <Card variant="gradient" padding="lg" className="relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-caption uppercase tracking-wider text-text-tertiary">
                    {language === "en" ? "Outcome" : "Результат"}
                  </span>
                </div>
                <p className="text-heading-md text-text-primary font-medium">
                  {caseItem.outcome[language]}
                </p>
              </div>
              {/* Decorative gradient */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-primary/10 rounded-full blur-3xl" />
            </Card>
          </motion.div>

          {/* What we did */}
          <motion.div 
            variants={prefersReducedMotion ? {} : fadeInUp}
            className="mb-12"
          >
            <h2 className="text-heading-lg font-medium text-text-primary mb-4">
              {language === "en" ? "What we delivered" : "Что мы сделали"}
            </h2>
            <Card variant="bordered" padding="md">
              <p className="text-body-md text-text-secondary leading-relaxed">
                {caseItem.what[language]}
              </p>
            </Card>
          </motion.div>

          {/* CTA section */}
          <motion.div 
            variants={prefersReducedMotion ? {} : fadeInUp}
            className="p-6 rounded-2xl border border-border bg-bg-tertiary/50 text-center"
          >
            <p className="text-body-md text-text-secondary mb-4">
              {language === "en" 
                ? "Want to see how we can apply similar solutions to your project?" 
                : "Хотите узнать, как мы можем применить похожие решения для вашего проекта?"}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact" buttonVariant="primary">
                {language === "en" ? "Get in touch" : "Связаться"}
              </ButtonLink>
              <ButtonLink href="/process" buttonVariant="secondary">
                {language === "en" ? "Our process" : "Наш процесс"}
              </ButtonLink>
            </div>
          </motion.div>
        </motion.div>
      </Section>

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
                    <div className="relative h-40 bg-gradient-to-br from-bg-tertiary via-bg-elevated to-bg-secondary overflow-hidden rounded-t-2xl">
                      <div className="absolute top-4 left-4 z-10">
                        <CategoryBadge category={flagship.category} />
                      </div>
                      {flagship.artifactHint && (
                        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-lg border border-accent-primary/30 bg-bg-primary/80 backdrop-blur-sm text-caption font-mono text-accent-primary">
                          {flagship.artifactHint[language]}
                        </div>
                      )}
                      <div
                        className="absolute inset-0 opacity-15"
                        style={{
                          backgroundImage: `
                            linear-gradient(to right, rgba(99,102,241,0.2) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(99,102,241,0.2) 1px, transparent 1px)
                          `,
                          backgroundSize: "24px 24px",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/80 to-transparent" />
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
