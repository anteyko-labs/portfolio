"use client";

import { useLanguage } from "@/lib/language-context";
import { PageHero } from "@/components/sections/page-hero";
import { PreventsCard } from "@/components/process-anim/prevents-card";
import { PhaseTimeline } from "@/components/process-anim/phase-timeline";
import { ProcessCta } from "@/components/process-anim/process-cta";

export function ProcessContent() {
  const { t, translations, language } = useLanguage();
  const lang = language === "en" ? "en" : "ru";
  const steps = translations.process.steps;

  return (
    <>
      <PageHero
        title={t("process.title")}
        subtitle={t("process.subtitle")}
        eyebrow={lang === "en" ? "Process" : "Процесс"}
        metric={{ value: "4", label: lang === "en" ? "phases" : "фазы" }}
        rightSlot={<PreventsCard en={lang === "en"} />}
      />
      <PhaseTimeline steps={steps} lang={lang} />
      <ProcessCta lang={lang} phases={steps.map((s) => ({ number: s.number, title: s.title[lang] }))} />
    </>
  );
}
