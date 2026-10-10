"use client";

import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { PageHero } from "@/components/sections/page-hero";
import { PreventsCard } from "@/components/process-anim/prevents-card";
import { PhaseTimeline } from "@/components/process-anim/phase-timeline";
import { ProcessCta } from "@/components/process-anim/process-cta";

export function ProcessContent() {
  const { t, translations, language } = useLanguage();
  const steps = translations.process.steps;

  return (
    <>
      <PageHero
        title={t("process.title")}
        subtitle={t("process.subtitle")}
        eyebrow={pick({ en: "Process", ru: "Процесс", zh: "流程", tr: "Süreç", ar: "آلية العمل" }, language)}
        metric={{ value: "4", label: pick({ en: "phases", ru: "фазы", zh: "个阶段", tr: "aşama", ar: "مراحل" }, language) }}
        rightSlot={<PreventsCard />}
      />
      <PhaseTimeline steps={steps} lang={language} />
      <ProcessCta lang={language} phases={steps.map((s) => ({ number: s.number, title: s.title[language] }))} />
    </>
  );
}
