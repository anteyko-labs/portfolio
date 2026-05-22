"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeader, AnimatedItem } from "@/components/ui/section";
import { ArtifactCard } from "@/components/ui/artifact-card";
import { ButtonLink } from "@/components/ui/link";
import { ScrollProgressRail } from "@/components/ui/scroll-progress-rail";
import { slideInLeft, fadeInUp, slideInRight } from "@/lib/motion";

export function ProcessContent() {
  const { t, translations, language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const steps = translations.process.steps;
  const navItems = steps.map((step) => ({
    id: `process-step-${step.number}`,
    label: step.title[language],
  }));

  const stepVariants = (index: number) => {
    if (prefersReducedMotion) return { initial: { opacity: 1 }, animate: { opacity: 1 } };
    if (index === 0) return slideInLeft;
    if (index === 3) return slideInRight;
    return fadeInUp;
  };

  const stepCardClass = (index: number) => {
    const base = "bg-bg-secondary border border-border";
    if (index === 0) return `${base} pl-5 md:pl-10 border-l-4 border-l-accent-primary`;
    if (index === 1) return base;
    if (index === 2) return `${base} pt-8 border-t-4 border-t-accent-primary md:pt-10`;
    return `${base} pl-5 md:pl-10 border-l-4 border-l-success/50`;
  };

  return (
    <>
      <PageHero
        title={t("process.title")}
        subtitle={t("process.subtitle")}
        eyebrow={language === "en" ? "Process" : "Процесс"}
        metric={{
          value: language === "en" ? "4" : "4",
          label: language === "en" ? "phases" : "фазы",
        }}
        rightSlot={
          <div className="rounded-2xl border border-border bg-bg-secondary/80 p-6">
            <p className="text-caption uppercase tracking-wider text-text-tertiary mb-4">
              {language === "en" ? "What it prevents" : "Что это предотвращает"}
            </p>
            <ul className="space-y-3 text-body-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-accent-primary">•</span>
                {language === "en" ? "Scope creep" : "Расплывчатый скоуп"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-primary">•</span>
                {language === "en" ? "Hidden risks" : "Скрытые риски"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-primary">•</span>
                {language === "en" ? "Chaotic releases" : "Хаотичные релизы"}
              </li>
            </ul>
          </div>
        }
      />

      <Section background="secondary" padding="lg">
        <div className="grid lg:grid-cols-[0.35fr_0.65fr] gap-10">
          <ScrollProgressRail items={navItems} />
          <motion.div
            className="space-y-12 md:space-y-28"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              initial: {},
              animate: {
                transition: { staggerChildren: 0.1, delayChildren: 0.05 },
              },
            }}
          >
            {steps.map((step, index) => (
              <motion.div key={step.number} variants={stepVariants(index)} id={`process-step-${step.number}`}>
                <div className={`relative flex flex-col md:flex-row gap-6 md:gap-12 rounded-2xl p-5 md:p-10 ${stepCardClass(index)}`}>
                  {/* Decorative per-step — flat accents, no glow/gradient */}
                  {index === 0 && <div className="absolute top-0 left-0 w-32 h-1 bg-accent-primary/60 rounded-r-full" aria-hidden />}
                  {index === 2 && <div className="absolute top-0 left-0 right-0 h-px bg-border" aria-hidden />}

                  <div className={`relative shrink-0 ${index % 2 === 1 ? "md:w-64" : "md:w-72"}`}>
                    {index === 3 ? (
                      <div className="w-14 h-14 rounded-2xl bg-success/10 border border-success/30 flex items-center justify-center mb-4">
                        <svg className="w-7 h-7 text-success" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mb-4">
                        <span className="text-heading-lg font-display font-bold text-accent-primary">{step.number}</span>
                      </div>
                    )}
                    <h2 className="text-heading-xl font-medium text-text-primary">
                      {step.title[language]}
                    </h2>
                    <p className="mt-2 text-body-sm text-text-muted">
                      {step.duration[language]}
                    </p>
                  </div>

                  <div className="relative flex-1 min-w-0">
                    <p className="text-body-lg text-text-secondary mb-8">
                      {step.description[language]}
                    </p>
                    <div>
                      <h3 className="text-caption text-text-muted uppercase tracking-wider mb-4">
                        {language === "en"
                          ? "What you receive after this step"
                          : "Что вы получаете после этого этапа"}
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                      {step.deliverables[language].map((item) => (
                        <ArtifactCard
                          key={`step-${step.number}-${item.slice(0, 25).replace(/\s+/g, '-').toLowerCase()}`}
                          title={item}
                          subtitle={`${language === "en" ? "Phase" : "Фаза"} ${step.number}`}
                          icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          }
                        />
                      ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="primary" padding="lg">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-heading-xl font-display text-text-primary mb-4">
            {language === "en" ? "Ready to start?" : "Готовы начать?"}
          </h2>
          <p className="text-body-lg text-text-secondary mb-8">
            {language === "en"
              ? "Let's discuss your project and find the best approach for your needs."
              : "Обсудим ваш проект и найдём оптимальный подход для ваших задач."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href="/contact" buttonVariant="primary" size="lg">
              {language === "en" ? "Get an estimate" : "Получить оценку"}
            </ButtonLink>
            <ButtonLink href="/cases" buttonVariant="secondary" size="lg">
              {language === "en" ? "View case studies" : "Смотреть кейсы"}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
