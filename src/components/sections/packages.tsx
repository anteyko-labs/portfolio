"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { useReducedMotion } from "@/lib/hooks";
import { Section, SectionHeader, AnimatedItem } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/link";
import clsx from "clsx";

export function PackagesSection() {
  const { t, translations, language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const packages = translations.packages.items;

  return (
    <Section background="primary" padding="lg" className="relative">
      <SectionHeader
        title={t("packages.title")}
        subtitle={t("packages.subtitle")}
        eyebrow={pick({ en: "Pricing", ru: "Тарифы", zh: "价格", tr: "Fiyatlar", ar: "الأسعار" }, language)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative items-stretch">
        {packages.map((pkg, index) => {
          const isRecommended = pkg.id === "mvp-sprint";
          return (
          <AnimatedItem key={pkg.id} delay={index * 0.1} className="h-full">
            <motion.div
              className="h-full"
              whileHover={prefersReducedMotion ? {} : { y: -3, transition: { duration: 0.2 } }}
            >
              <Card
                variant="default"
                padding="none"
                className={clsx(
                  "h-full flex flex-col border transition-all duration-300 bg-bg-primary",
                  isRecommended
                    ? "border-accent-primary ring-1 ring-accent-primary/20 shadow-glow-md hover:shadow-card-hover"
                    : "border-border shadow-glow-sm hover:shadow-glow-md hover:border-border-hover",
                  pkg.id === "web3-addon" && "lg:col-span-2"
                )}
              >
                <div className="p-6 lg:p-8 flex flex-col h-full">
                  {/* Content wrapper - grows to fill space */}
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-heading-lg font-display font-bold text-text-primary">
                          {pkg.title[language]}
                        </h3>
                        <p className="text-heading-sm font-display font-semibold text-accent-primary mt-1">
                          {pkg.startingPrice[language]}
                        </p>
                        <p className="text-body-sm text-text-secondary mt-1">
                          {pkg.timeline[language]}
                        </p>
                      </div>
                      {isRecommended && (
                        <Badge variant="primary">
                          {pick({ en: "Popular", ru: "Популярный", zh: "热门", tr: "Popüler", ar: "الأكثر طلبًا" }, language)}
                        </Badge>
                      )}
                      {pkg.id === "web3-addon" && (
                        <Badge variant="primary">Add-on</Badge>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-body-md text-text-secondary mb-6">
                      {pkg.description[language]}
                    </p>

                    {/* For whom */}
                    <div className="mb-6">
                      <p className="text-caption font-mono text-text-tertiary uppercase tracking-wide mb-2">
                        {pick({ en: "Best for", ru: "Подходит для", zh: "适用于", tr: "En uygun olduğu durum", ar: "الأنسب لـ" }, language)}
                      </p>
                      <p className="text-body-sm text-text-secondary">
                        {pkg.forWhom[language]}
                      </p>
                    </div>

                    {/* Deliverables */}
                    <div className="mb-6">
                      <p className="text-caption font-mono text-text-tertiary uppercase tracking-wide mb-3">
                        {pick({ en: "What you get", ru: "Что получите", zh: "您将获得", tr: "Neler alırsınız", ar: "ما ستحصل عليه" }, language)}
                      </p>
                      <ul className="space-y-2">
                        {pkg.deliverables[language].map((item, i) => (
                          <li
                            key={`${pkg.id}-del-${i}`}
                            className="flex items-start gap-2 text-body-sm text-text-secondary"
                          >
                            <svg
                              className="w-4 h-4 text-success mt-0.5 shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
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
                    <div className={clsx(
                      "p-4 rounded-xl border",
                      isRecommended
                        ? "bg-accent-glow border-accent-primary/20"
                        : "bg-bg-secondary border-border"
                    )}>
                      <p className="text-caption font-mono text-text-tertiary uppercase tracking-wide mb-1">
                        {pick({ en: "End result", ru: "Итоговый результат", zh: "最终成果", tr: "Nihai sonuç", ar: "النتيجة النهائية" }, language)}
                      </p>
                      <p className="text-body-sm text-text-primary">
                        {pkg.result[language]}
                      </p>
                    </div>
                  </div>

                  {/* CTA - always at bottom */}
                  <div className="pt-6 mt-6 border-t border-border">
                    <ButtonLink
                      href="/contact"
                      buttonVariant={isRecommended ? "primary" : "outline"}
                      size="sm"
                      className="w-full justify-center"
                    >
                      {t("cta.finalAction")}
                    </ButtonLink>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatedItem>
          );
        })}
      </div>
    </Section>
  );
}
