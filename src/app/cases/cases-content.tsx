"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeader, AnimatedItem } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { TiltCard } from "@/components/ui/tilt-card";
import { CategoryBadge } from "@/components/ui/badge";
import { MetricPill } from "@/components/ui/metric-pill";
import { SegmentedControl } from "@/components/ui/segmented-control";
import {
  flagshipCases,
  microCases,
  getCasesByCategory,
  type CaseCategory,
} from "@/lib/cases-data";

const FILTERS: { value: CaseCategory | "all"; key: string }[] = [
  { value: "all", key: "filterAll" },
  { value: "web", key: "filterWeb" },
  { value: "product", key: "filterProduct" },
  { value: "web3", key: "filterWeb3" },
  { value: "infrastructure", key: "filterInfra" },
];

const INITIAL_FLAGSHIP_COUNT = 4;

export function CasesContent() {
  const { t, language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<CaseCategory | "all">("all");
  const [showAllFlagship, setShowAllFlagship] = useState(false);
  const filteredMicro = useMemo(
    () => getCasesByCategory(filter, microCases),
    [filter]
  );

  const visibleFlagshipCases = showAllFlagship
    ? flagshipCases
    : flagshipCases.slice(0, INITIAL_FLAGSHIP_COUNT);

  return (
    <>
      <PageHero
        title={t("cases.keyCases")}
        subtitle={t("cases.subtitle")}
        eyebrow={language === "en" ? "Cases" : "Кейсы"}
        metric={{
          value: String(flagshipCases.length),
          label: language === "en" ? "flagship cases" : "ключевых кейсов",
        }}
        rightSlot={
          <div className="rounded-2xl border border-border bg-bg-secondary/80 p-6">
            <p className="text-caption uppercase tracking-wider text-text-tertiary mb-4">
              {language === "en" ? "Proof stack" : "Слой доказательств"}
            </p>
            <ul className="space-y-3 text-body-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-accent-primary">•</span>
                {language === "en" ? "Metrics on every case" : "Метрики на каждом кейсе"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-primary">•</span>
                {language === "en" ? "Artifacts and verification" : "Артефакты и верификация"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-primary">•</span>
                {language === "en" ? "Engineering-grade delivery" : "Поставка уровня engineering"}
              </li>
            </ul>
          </div>
        }
      />

      {/* Flagship cases - big cards with TiltCard */}
      <Section background="secondary" padding="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {visibleFlagshipCases.map((caseItem, index) => (
            <AnimatedItem key={caseItem.id} delay={index * 0.06}>
              <NextLink href={`/cases/${caseItem.slug}`} className="block h-full group">
                <TiltCard
                  variant="bordered"
                  padding="none"
                  tiltAmount={10}
                  noiseHoverOpacity={0.04}
                  className="h-full"
                >
                  <div className="relative h-48 md:h-56 bg-gradient-to-br from-bg-tertiary via-bg-elevated to-bg-secondary overflow-hidden rounded-t-2xl">
                    <div className="absolute top-4 left-4 z-10">
                      <CategoryBadge category={caseItem.category} />
                    </div>
                    {caseItem.artifactHint && (
                      <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-lg border border-accent-primary/30 bg-bg-primary/80 backdrop-blur-sm text-caption font-mono text-accent-primary">
                        {caseItem.artifactHint[language]}
                      </div>
                    )}
                    {caseItem.imageUrl ? (
                      <>
                        <Image
                          src={caseItem.imageUrl}
                          alt={caseItem.title[language]}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-bg-primary/20 mix-blend-overlay" />
                      </>
                    ) : (
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
                    )}
                    {/* Gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/80 to-transparent" />
                  </div>
                  <div className="p-6 pb-8 md:p-8 md:pb-10">
                    <h2 className="text-heading-lg font-medium text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                      {caseItem.title[language]}
                    </h2>
                    <p className="text-body-md text-text-secondary line-clamp-2">
                      {caseItem.summary[language]}
                    </p>
                    {caseItem.metrics && caseItem.metrics.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {caseItem.metrics.slice(0, 3).map((metric) => (
                          <MetricPill
                            key={`${caseItem.id}-metric-${metric.value}`}
                            label={metric.label[language]}
                            value={metric.value}
                            tone="primary"
                          />
                        ))}
                      </div>
                    )}
                    <span className="mt-6 inline-flex items-center text-body-sm text-accent-primary font-medium group-hover:gap-2 transition-all">
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

        {/* Load more button */}
        {!showAllFlagship && flagshipCases.length > INITIAL_FLAGSHIP_COUNT && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAllFlagship(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-bg-tertiary/60 text-body-md text-text-secondary font-medium hover:text-text-primary hover:border-border-hover transition-colors"
            >
              {language === "en"
                ? `Show ${flagshipCases.length - INITIAL_FLAGSHIP_COUNT} more cases`
                : `Показать ещё ${flagshipCases.length - INITIAL_FLAGSHIP_COUNT} кейсов`}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </Section>

      {/* Micro showcase */}
      <Section background="primary" padding="lg">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <h2 className="text-display-sm font-display text-text-primary">
            {t("cases.micro")}
          </h2>
          <SegmentedControl
            id="cases-filter"
            options={FILTERS.map((f) => ({ value: f.value, label: t(`cases.${f.key}`) }))}
            value={filter}
            onChange={(value) => setFilter(value as CaseCategory | "all")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMicro.map((item, index) => (
            <AnimatedItem key={item.id} delay={Math.min(index * 0.02, 0.3)}>
              <NextLink href={`/cases/${item.id}`} className="block h-full">
                <motion.div
                  className="h-full group"
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Card
                    variant="bordered"
                    hover
                    padding="md"
                    className="h-full relative overflow-visible card-gradient-border"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CategoryBadge category={item.category} size="sm" />
                      <motion.span
                        className="inline-flex text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={false}
                        whileHover={{ x: 2 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.span>
                    </div>
                    <h3 className="text-heading-sm font-medium text-text-primary mb-1 group-hover:text-accent-primary transition-colors line-clamp-2">
                      {item.title[language]}
                    </h3>
                    <p className="text-caption text-text-muted mb-2">
                      {item.what[language]}
                    </p>
                    <p className="text-body-sm text-text-secondary line-clamp-2 pb-1" title={item.outcome[language]}>
                      {item.outcome[language]}
                    </p>
                  </Card>
                </motion.div>
              </NextLink>
            </AnimatedItem>
          ))}
        </div>
      </Section>
    </>
  );
}
