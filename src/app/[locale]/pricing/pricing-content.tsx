"use client";

import { useLanguage } from "@/lib/language-context";
import { PageHero } from "@/components/sections/page-hero";
import { Section, AnimatedItem } from "@/components/ui/section";
import { AuroraCta, CheckList, MilestoneTrack, PackageShell, Price, ShineBadge } from "@/components/services-anim/parts";
import { PKG_COLOR } from "@/components/services-anim/package-visuals";
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
            <MilestoneTrack />
          </div>
        }
      />

      <Section background="secondary" padding="lg">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {packages.map((pkg, index) => {
            const slug = PACKAGE_SLUGS[pkg.id];
            const isRecommended = pkg.id === "mvp-sprint";
            return (
              <AnimatedItem key={pkg.id} delay={(index % 2) * 0.1} className="h-full">
                <PackageShell id={pkg.id} highlight={isRecommended}>
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-heading-lg font-display font-bold text-text-primary">
                            {pkg.title[language]}
                          </h2>
                          {isRecommended && <ShineBadge>{language === "en" ? "Popular" : "Популярный"}</ShineBadge>}
                          {pkg.id === "web3-addon" && <ShineBadge tone="soft">Add-on</ShineBadge>}
                        </div>
                        <p className="mt-2 font-brand text-3xl font-semibold tracking-[-0.02em] text-accent-primary">
                          <Price value={pkg.startingPrice[language]} />
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
                      <CheckList items={pkg.deliverables[language]} />
                    </div>

                    {/* Result */}
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
                </PackageShell>
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
        <AuroraCta
          as="h3"
          title={language === "en" ? "Not sure which package fits?" : "Не уверены, какой пакет подходит?"}
          text={
            language === "en"
              ? "Tell us about your project and we'll recommend the right approach based on your goals and constraints."
              : "Расскажите о проекте, и мы порекомендуем подходящий подход на основе ваших целей и ограничений."
          }
          primary={{ href: "/contact", label: t("cta.primary") }}
          secondary={{ href: "/services", label: language === "en" ? "Compare packages" : "Сравнить пакеты" }}
        />
      </Section>
    </>
  );
}
