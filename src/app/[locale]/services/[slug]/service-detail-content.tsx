"use client";

import { useLanguage } from "@/lib/language-context";
import { PageHero } from "@/components/sections/page-hero";
import { Section, AnimatedItem } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/link";

export function ServiceDetailContent({ packageId }: { packageId: string }) {
  const { t, translations, language } = useLanguage();
  const pkg = translations.packages.items.find((p) => p.id === packageId);

  // Guard: the server route already calls notFound() for unknown slugs, but this
  // keeps the client component type-safe if it ever renders without a match.
  if (!pkg) return null;

  return (
    <>
      <PageHero
        title={pkg.title[language]}
        subtitle={pkg.description[language]}
        eyebrow={language === "en" ? "Service" : "Услуга"}
        align="left"
        backLink={{
          href: "/services",
          label: language === "en" ? "All services" : "Все услуги",
        }}
        rightSlot={
          <div className="rounded-2xl border border-border bg-bg-secondary/80 p-6 space-y-4">
            <div>
              <p className="text-caption uppercase tracking-wider text-text-tertiary mb-1">
                {language === "en" ? "Starting price" : "Цена от"}
              </p>
              <p className="text-heading-md font-display font-bold text-accent-primary">
                {pkg.startingPrice[language]}
              </p>
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-caption uppercase tracking-wider text-text-tertiary mb-1">
                {language === "en" ? "Timeline" : "Сроки"}
              </p>
              <p className="text-body-md text-text-primary">
                {pkg.timeline[language]}
              </p>
            </div>
            <div className="border-t border-border pt-4">
              <ButtonLink
                href={`/contact?package=${pkg.id}`}
                buttonVariant="primary"
                size="md"
                className="w-full justify-center"
              >
                {t("cta.primary")}
              </ButtonLink>
            </div>
          </div>
        }
      />

      <Section background="secondary" padding="lg">
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Best for */}
          <AnimatedItem className="h-full">
            <Card variant="bordered" padding="lg" className="h-full bg-bg-primary">
              <h2 className="text-caption text-text-muted uppercase tracking-wider mb-3">
                {language === "en" ? "Best for" : "Подходит для"}
              </h2>
              <p className="text-body-md text-text-secondary">
                {pkg.forWhom[language]}
              </p>
            </Card>
          </AnimatedItem>

          {/* What's included */}
          <AnimatedItem delay={0.08} className="h-full lg:col-span-2">
            <Card variant="bordered" padding="lg" className="h-full bg-bg-primary">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-caption text-text-muted uppercase tracking-wider">
                  {language === "en" ? "What's included" : "Что входит"}
                </h2>
                {pkg.id === "web3-addon" && (
                  <Badge variant="primary" size="sm">
                    Add-on
                  </Badge>
                )}
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {pkg.deliverables[language].map((item, i) => (
                  <li
                    key={`${pkg.id}-del-${i}`}
                    className="text-body-md text-text-secondary flex items-start gap-2"
                  >
                    <svg
                      className="w-5 h-5 text-success shrink-0 mt-0.5"
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
            </Card>
          </AnimatedItem>
        </div>

        {/* End result */}
        <AnimatedItem delay={0.16}>
          <div className="mt-6 p-5 sm:p-8 rounded-2xl border border-accent-primary/20 bg-accent-glow">
            <h2 className="text-caption text-text-muted uppercase tracking-wider mb-2">
              {language === "en" ? "End result" : "Итоговый результат"}
            </h2>
            <p className="text-body-lg text-text-primary">
              {pkg.result[language]}
            </p>
          </div>
        </AnimatedItem>
      </Section>

      {/* CTA */}
      <Section background="primary" padding="lg">
        <div className="p-5 sm:p-8 rounded-2xl border border-border bg-bg-secondary/60 text-center">
          <h2 className="text-heading-lg font-medium text-text-primary mb-2">
            {language === "en"
              ? "Ready to start?"
              : "Готовы начать?"}
          </h2>
          <p className="text-body-md text-text-secondary mb-6 max-w-xl mx-auto">
            {language === "en"
              ? "Tell us about your project and get a fixed-scope estimate within 24 hours."
              : "Расскажите о проекте и получите оценку по фиксированному объёму в течение 24 часов."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href={`/contact?package=${pkg.id}`} buttonVariant="primary" size="lg">
              {t("cta.primary")}
            </ButtonLink>
            <ButtonLink href="/pricing" buttonVariant="secondary" size="lg">
              {language === "en" ? "See all pricing" : "Все цены"}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
