"use client";

import { useLanguage } from "@/lib/language-context";
import { PageHero } from "@/components/sections/page-hero";
import { Section, AnimatedItem } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink, Link } from "@/components/ui/link";
import { PACKAGE_SLUGS } from "@/lib/service-slugs";

export function PricingContent() {
  const { t, translations, language } = useLanguage();
  const packages = translations.packages.items;

  return (
    <>
      <PageHero
        title={language === "en" ? "Pricing" : "Цены"}
        subtitle={t("packages.subtitle")}
        eyebrow={language === "en" ? "Pricing" : "Цены"}
        metric={{
          value: language === "en" ? "24h" : "24ч",
          label: language === "en" ? "estimate response" : "ответ по оценке",
        }}
        rightSlot={
          <div className="rounded-2xl border border-border bg-bg-secondary/80 p-6">
            <p className="text-caption uppercase tracking-wider text-text-tertiary mb-4">
              {language === "en" ? "Pricing in USD" : "Цены в USD"}
            </p>
            <p className="text-body-sm text-text-secondary">
              {language === "en"
                ? "Prices are starting points in US dollars. Every project is scoped individually — you get a fixed-scope estimate within 24 hours, billed in milestones."
                : "Цены указаны в долларах США как стартовая точка. Каждый проект оценивается индивидуально — фиксированную оценку по объёму вы получаете в течение 24 часов, оплата по этапам."}
            </p>
          </div>
        }
      />

      <Section background="secondary" padding="lg">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {packages.map((pkg, index) => {
            const slug = PACKAGE_SLUGS[pkg.id];
            const isRecommended = pkg.id === "mvp-sprint";
            return (
              <AnimatedItem key={pkg.id} delay={index * 0.08} className="h-full">
                <Card
                  variant="bordered"
                  padding="lg"
                  className={`h-full flex flex-col bg-bg-primary ${
                    isRecommended
                      ? "border-accent-primary ring-1 ring-accent-primary/20"
                      : pkg.id === "web3-addon"
                        ? "border-accent-primary/30"
                        : ""
                  }`}
                >
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-heading-lg font-display font-bold text-text-primary">
                            {pkg.title[language]}
                          </h2>
                          {isRecommended && (
                            <Badge variant="primary" size="md">
                              {language === "en" ? "Popular" : "Популярный"}
                            </Badge>
                          )}
                          {pkg.id === "web3-addon" && (
                            <Badge variant="primary" size="md">
                              Add-on
                            </Badge>
                          )}
                        </div>
                        <p className="text-heading-sm font-display font-semibold text-accent-primary mt-2">
                          {pkg.startingPrice[language]}
                        </p>
                        <p className="text-body-sm text-text-muted mt-1">
                          {pkg.timeline[language]}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-body-md text-text-secondary mb-6">
                      {pkg.description[language]}
                    </p>

                    {/* Deliverables */}
                    <div className="mb-6">
                      <h3 className="text-caption text-text-muted uppercase tracking-wider mb-3">
                        {language === "en" ? "What's included" : "Что входит"}
                      </h3>
                      <ul className="space-y-2">
                        {pkg.deliverables[language].map((item, i) => (
                          <li
                            key={`${pkg.id}-del-${i}`}
                            className="text-body-sm text-text-secondary flex items-start gap-2"
                          >
                            <svg
                              className="w-4 h-4 text-success shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Result */}
                    <div className="p-4 bg-bg-tertiary/60 rounded-xl">
                      <h3 className="text-caption text-text-muted uppercase tracking-wider mb-2">
                        {language === "en" ? "End result" : "Итоговый результат"}
                      </h3>
                      <p className="text-body-sm text-text-primary">
                        {pkg.result[language]}
                      </p>
                    </div>
                  </div>

                  {/* CTA + details link - always at bottom */}
                  <div className="pt-6 mt-6 border-t border-border space-y-3">
                    <ButtonLink
                      href={`/contact?package=${pkg.id}`}
                      buttonVariant={isRecommended ? "primary" : "secondary"}
                      size="md"
                      className="w-full justify-center"
                    >
                      {t("cta.primary")}
                    </ButtonLink>
                    <Link
                      href={`/services/${slug}`}
                      variant="underline"
                      className="block text-center text-body-sm no-underline hover:underline"
                    >
                      {language === "en" ? "See full details" : "Подробнее об услуге"}
                    </Link>
                  </div>
                </Card>
              </AnimatedItem>
            );
          })}
        </div>

        {/* USD note */}
        <AnimatedItem delay={0.4}>
          <p className="mt-8 text-body-sm text-text-tertiary text-center max-w-2xl mx-auto">
            {language === "en"
              ? "All prices are in US dollars (USD) and represent starting points. Final scope and cost are confirmed in a fixed-scope proposal after a short discovery."
              : "Все цены указаны в долларах США (USD) и являются стартовыми. Финальный объём и стоимость фиксируются в предложении после короткого этапа исследования."}
          </p>
        </AnimatedItem>
      </Section>

      {/* Not sure which? CTA */}
      <Section background="primary" padding="lg">
        <div className="p-5 sm:p-8 rounded-2xl border border-border bg-bg-secondary/60 text-center">
          <h3 className="text-heading-lg font-medium text-text-primary mb-2">
            {language === "en"
              ? "Not sure which package fits?"
              : "Не уверены, какой пакет подходит?"}
          </h3>
          <p className="text-body-md text-text-secondary mb-6 max-w-xl mx-auto">
            {language === "en"
              ? "Tell us about your project and we'll recommend the right approach based on your goals and constraints."
              : "Расскажите о проекте, и мы порекомендуем подходящий подход на основе ваших целей и ограничений."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href="/contact" buttonVariant="primary" size="lg">
              {t("cta.primary")}
            </ButtonLink>
            <ButtonLink href="/services" buttonVariant="secondary" size="lg">
              {language === "en" ? "Compare packages" : "Сравнить пакеты"}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
