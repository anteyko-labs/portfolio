"use client";

import { useMemo } from "react";
import { useLanguage } from "@/lib/language-context";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeader, AnimatedItem } from "@/components/ui/section";
import { ButtonLink, Link } from "@/components/ui/link";
import { AuroraCta, CheckList, CompareMatrix, DeliveryGates, PackageShell, Price, ShineBadge } from "@/components/services-anim/parts";
import { PKG_COLOR } from "@/components/services-anim/package-visuals";
import { PACKAGE_SLUGS } from "@/lib/service-slugs";

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
          value: language === "en" ? "24h" : "24ч",
          label: language === "en" ? "estimate response" : "ответ по оценке",
        }}
        rightSlot={
          <DeliveryGates
            title={language === "en" ? "Delivery gates" : "Гейты поставки"}
            items={
              language === "en"
                ? ["Scope lock + risk review", "Architecture approval", "Release verification report"]
                : ["Фиксация скоупа + риск‑ревью", "Утверждение архитектуры", "Отчёт верификации релиза"]
            }
          />
        }
      />

      <Section background="secondary" padding="lg">
        {/* 2x2 Grid layout with equal height cards */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {packages.map((pkg, index) => (
            <AnimatedItem key={pkg.id} delay={(index % 2) * 0.1} className="h-full">
              <PackageShell id={pkg.id} highlight={pkg.id === "web3-addon"}>
                {/* Content wrapper - grows to fill space */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-heading-lg font-display text-text-primary">
                          {pkg.title[language]}
                        </h2>
                        {pkg.id === "web3-addon" && <ShineBadge>Add-on</ShineBadge>}
                      </div>
                      <div className="mt-1 flex items-center gap-3">
                        <p className="text-body-sm text-text-muted">
                          {pkg.timeline[language]}
                        </p>
                        {"startingPrice" in pkg && (
                          <>
                            <span className="text-text-tertiary">·</span>
                            <p className="text-body-sm font-semibold text-accent-primary">
                              <Price value={pkg.startingPrice[language]} />
                            </p>
                          </>
                        )}
                      </div>
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
                    <CheckList items={pkg.deliverables[language].slice(0, 6)} />
                  </div>

                  {/* Result section */}
                  <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-bg-tertiary/70 to-bg-secondary p-4">
                    <span aria-hidden="true" className="absolute inset-y-3 left-0 w-1 rounded-r-full" style={{ background: `rgb(${PKG_COLOR[pkg.id]})` }} />
                    <h3 className="text-caption text-text-muted uppercase tracking-wider mb-2">
                      {language === "en" ? "End result" : "Итоговый результат"}
                    </h3>
                    <p className="text-body-sm text-text-primary">
                      {pkg.result[language]}
                    </p>
                  </div>
                </div>

                {/* CTA Button - always at bottom */}
                <div className="pt-6 mt-6 border-t border-border space-y-3">
                  <ButtonLink
                    href={`/contact?package=${pkg.id}`}
                    buttonVariant={pkg.id === "web3-addon" ? "primary" : "secondary"}
                    size="md"
                    className="w-full justify-center"
                  >
                    {t("cta.finalAction")}
                  </ButtonLink>
                  <Link
                    href={`/services/${PACKAGE_SLUGS[pkg.id as keyof typeof PACKAGE_SLUGS]}`}
                    variant="underline"
                    className="block text-center text-body-sm no-underline hover:underline"
                  >
                    {language === "en" ? "Learn more" : "Подробнее"}
                  </Link>
                </div>
              </PackageShell>
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
        <CompareMatrix axes={comparisonAxes} packages={corePackages.map((pkg) => ({ id: pkg.id, label: pkg.title[language] }))} />

        {/* CTA section */}
        <div className="mt-16">
          <AuroraCta
            as="h3"
            title={language === "en" ? "Not sure which package fits?" : "Не уверены, какой пакет подходит?"}
            text={
              language === "en"
                ? "Book a 30-minute call to discuss your project. We'll recommend the right approach based on your goals and constraints."
                : "Запишитесь на 30-минутный звонок для обсуждения проекта. Мы порекомендуем подходящий подход на основе ваших целей и ограничений."
            }
            primary={{ href: "/contact", label: t("cta.primary") }}
            secondary={{ href: "/cases", label: language === "en" ? "See our work" : "Наши работы" }}
          />
        </div>
      </Section>
    </>
  );
}
