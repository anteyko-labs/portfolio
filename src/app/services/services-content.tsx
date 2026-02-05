"use client";

import { useMemo } from "react";
import clsx from "clsx";
import { useLanguage } from "@/lib/language-context";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeader, AnimatedItem } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/link";
import { ComparisonAxis } from "@/components/ui/comparison-axis";

type PackageId = "launch-site" | "mvp-sprint" | "startup-key" | "web3-addon";

// Comparison axes configuration (stable reference)
const COMPARISON_AXES_CONFIG = [
  {
    id: "speed",
    labelEn: "Speed to launch",
    labelRu: "Скорость запуска",
    values: { "launch-site": 3, "mvp-sprint": 2, "startup-key": 1 },
  },
  {
    id: "depth",
    labelEn: "Depth of delivery",
    labelRu: "Глубина поставки",
    values: { "launch-site": 1, "mvp-sprint": 2, "startup-key": 3 },
  },
  {
    id: "risk",
    labelEn: "Risk control",
    labelRu: "Контроль рисков",
    values: { "launch-site": 1, "mvp-sprint": 2, "startup-key": 3 },
  },
  {
    id: "support",
    labelEn: "Post-launch support",
    labelRu: "Поддержка после запуска",
    values: { "launch-site": 1, "mvp-sprint": 2, "startup-key": 3 },
  },
];

export function ServicesContent() {
  const { t, translations, language } = useLanguage();
  const packages = translations.packages.items;
  const corePackages = packages.filter((pkg) => pkg.id !== "web3-addon");

  // Memoize comparison axes with language-dependent labels
  const comparisonAxes = useMemo(() => 
    COMPARISON_AXES_CONFIG.map((axis) => ({
      id: axis.id,
      label: language === "en" ? axis.labelEn : axis.labelRu,
      values: axis.values,
    })),
    [language]
  );

  return (
    <>
      <PageHero
        title={t("packages.title")}
        subtitle={t("packages.subtitle")}
        eyebrow={language === "en" ? "Services" : "Услуги"}
        metric={{
          value: language === "en" ? "48h" : "48ч",
          label: language === "en" ? "estimate response" : "ответ по оценке",
        }}
        rightSlot={
          <div className="rounded-2xl border border-border bg-bg-secondary/80 p-6">
            <p className="text-caption uppercase tracking-wider text-text-tertiary mb-4">
              {language === "en" ? "Delivery gates" : "Гейты поставки"}
            </p>
            <ul className="space-y-3 text-body-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-accent-primary">•</span>
                {language === "en" ? "Scope lock + risk review" : "Фиксация скоупа + риск‑ревью"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-primary">•</span>
                {language === "en" ? "Architecture approval" : "Утверждение архитектуры"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-primary">•</span>
                {language === "en" ? "Release verification report" : "Отчёт верификации релиза"}
              </li>
            </ul>
          </div>
        }
      />

      <Section background="secondary" padding="lg">
        {/* 2x2 Grid layout with equal height cards */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {packages.map((pkg, index) => (
            <AnimatedItem key={pkg.id} delay={index * 0.08} className="h-full">
              <Card
                variant="gradient"
                padding="lg"
                className={clsx(
                  "h-full flex flex-col",
                  pkg.id === "web3-addon" ? "border-accent-primary/30" : ""
                )}
              >
                {/* Content wrapper - grows to fill space */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-heading-lg font-display text-text-primary">
                          {pkg.title[language]}
                        </h2>
                        {pkg.id === "web3-addon" && (
                          <Badge variant="primary" size="md">
                            Add-on
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-body-sm text-text-muted">
                        {pkg.timeline[language]}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-body-md text-text-secondary mb-6">
                    {pkg.description[language]}
                  </p>

                  {/* Best for section */}
                  <div className="mb-6">
                    <h3 className="text-caption text-text-muted uppercase tracking-wider mb-2">
                      {language === "en" ? "Best for" : "Подходит для"}
                    </h3>
                    <p className="text-body-sm text-text-secondary">
                      {pkg.forWhom[language]}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="mb-6">
                    <h3 className="text-caption text-text-muted uppercase tracking-wider mb-3">
                      {language === "en" ? "What you get" : "Что получите"}
                    </h3>
                    <ul className="space-y-2">
                      {pkg.deliverables[language].slice(0, 6).map((item) => (
                        <li 
                          key={`${pkg.id}-del-${item.slice(0, 20).replace(/\s+/g, '-')}`} 
                          className="text-body-sm text-text-secondary flex items-start gap-2"
                        >
                          <svg className="w-4 h-4 text-success shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Result section */}
                  <div className="p-4 bg-bg-tertiary/60 rounded-xl">
                    <h3 className="text-caption text-text-muted uppercase tracking-wider mb-2">
                      {language === "en" ? "End result" : "Итоговый результат"}
                    </h3>
                    <p className="text-body-sm text-text-primary">
                      {pkg.result[language]}
                    </p>
                  </div>
                </div>

                {/* CTA Button - always at bottom */}
                <div className="pt-6 mt-6 border-t border-border/30">
                  <ButtonLink 
                    href="/contact" 
                    buttonVariant={pkg.id === "web3-addon" ? "primary" : "secondary"} 
                    size="md"
                    className="w-full justify-center"
                  >
                    {t("cta.finalAction")}
                  </ButtonLink>
                </div>
              </Card>
            </AnimatedItem>
          ))}
        </div>
      </Section>

      <Section background="primary" padding="lg">
        <SectionHeader
          title={t("packages.compareTitle")}
          subtitle={t("packages.compareSubtitle")}
          align="center"
        />
        <div className="space-y-8">
          {comparisonAxes.map((axis) => (
            <ComparisonAxis
              key={axis.id}
              label={axis.label}
              items={corePackages.map((pkg) => ({
                id: pkg.id,
                label: pkg.title[language],
                value: axis.values[pkg.id as keyof typeof axis.values] ?? 1,
              }))}
            />
          ))}
        </div>

        {/* CTA section */}
        <div className="mt-12 p-8 rounded-2xl border border-border bg-bg-secondary/60 text-center">
          <h3 className="text-heading-lg font-medium text-text-primary mb-2">
            {language === "en" ? "Not sure which package fits?" : "Не уверены, какой пакет подходит?"}
          </h3>
          <p className="text-body-md text-text-secondary mb-6 max-w-xl mx-auto">
            {language === "en" 
              ? "Book a 30-minute call to discuss your project. We'll recommend the right approach based on your goals and constraints." 
              : "Запишитесь на 30-минутный звонок для обсуждения проекта. Мы порекомендуем подходящий подход на основе ваших целей и ограничений."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href="/contact" buttonVariant="primary" size="lg">
              {t("cta.primary")}
            </ButtonLink>
            <ButtonLink href="/cases" buttonVariant="secondary" size="lg">
              {language === "en" ? "See our work" : "Наши работы"}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
