"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { pick } from "@/lib/i18n-text";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { Section, AnimatedItem } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { CategoryBadge } from "@/components/ui/badge";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { CatalogHero } from "@/components/cases-catalog/catalog-hero";
import { Catalog } from "@/components/cases-catalog/catalog";
import {
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

export function CasesContent() {
  const { t, language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<CaseCategory | "all">("all");
  const filteredMicro = useMemo(
    () => getCasesByCategory(filter, microCases),
    [filter]
  );

  return (
    <>
      <CatalogHero />
      <Catalog />

      {/* Micro showcase */}
      <Section background="secondary" padding="lg" className="border-t border-border">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" aria-live="polite">
          {filteredMicro.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-body-lg text-text-secondary">
                {pick({ en: "No micro cases match this filter.", ru: "Нет микро-кейсов по выбранному фильтру.", zh: "没有符合此筛选条件的小型案例。", tr: "Bu filtreyle eşleşen mikro vaka yok.", ar: "لا توجد حالات مصغّرة تطابق هذا الفلتر." }, language)}
              </p>
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="mt-4 text-body-sm text-accent-primary hover:text-accent-secondary transition-colors"
              >
                {pick({ en: "Show all", ru: "Показать все", zh: "显示全部", tr: "Tümünü göster", ar: "عرض الكل" }, language)}
              </button>
            </div>
          )}
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
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
