"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { Section, SectionHeader, AnimatedItem } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/link";
import { slideInLeft, slideInRight, fadeInUp } from "@/lib/motion";

export function ProcessPreviewSection() {
  const { t, translations, language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const steps = translations.process.steps;

  const stepVariants = (index: number) => {
    if (prefersReducedMotion) return {};
    if (index === 0) return slideInLeft;
    if (index === 1) return fadeInUp;
    if (index === 2) return fadeInUp;
    return slideInRight;
  };

  const stepAccent = (index: number) => {
    if (index === 0) return "border-l-4 border-l-accent-primary";
    if (index === 1) return "ring-1 ring-accent-primary/20"; // gradient circle
    if (index === 2) return "border-t-4 border-t-accent-primary";
    return "ring-1 ring-success/20"; // checkmark step
  };

  const stepBg = (index: number) => {
    return "bg-bg-tertiary";
  };

  return (
    <Section background="secondary" padding="xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 md:mb-16">
        <SectionHeader
          title={t("process.title")}
          subtitle={t("process.subtitle")}
          eyebrow={language === "en" ? "Process" : "Процесс"}
          animate={false}
        />
        <ButtonLink href="/process" buttonVariant="outline" size="sm">
          {t("cta.learnMore")}
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </ButtonLink>
      </div>

      {/* Asymmetric grid: row1 = 50/50, дорожка, row2 = 60/40 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-6 lg:gap-5 items-stretch">
        {steps.map((step, index) => {
          const colSpan = index === 0 || index === 1 ? "lg:col-span-5" : index === 2 ? "lg:col-span-6" : "lg:col-span-4";
          const isFirst = index === 0;
          const trackElement = index === 2 ? (
            <div key="process-track" className="lg:col-span-10 flex items-center justify-center py-1" aria-hidden>
              <div className="h-px w-full max-w-xl mx-auto bg-gradient-to-r from-transparent via-accent-primary/60 to-transparent rounded-full" />
            </div>
          ) : null;
          const cardElement = (
            <AnimatedItem key={index} delay={index * 0.1} className={`${colSpan} h-full`}>
              <motion.div
                className="h-full"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-20px" }}
                variants={stepVariants(index)}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                /* No hover lift — these cards are not interactive */
              >
                <div className={`relative h-full rounded-2xl p-6 border border-border transition-all duration-300 overflow-hidden flex flex-col ${stepAccent(index)} ${stepBg(index)}`}>
                  {/* Per-step decorative elements */}
                  {index === 0 && (
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent-primary/15 to-transparent rounded-bl-3xl pointer-events-none" aria-hidden />
                  )}
                  {index === 2 && (
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-accent-primary/12 to-transparent pointer-events-none" aria-hidden />
                  )}
                  {index === 3 && (
                    <div className="absolute inset-0 bg-success/5 pointer-events-none" aria-hidden />
                  )}

                  {/* Content wrapper - grows to fill space */}
                  <div className="flex-1 relative">
                    {/* Step number / icon area - different per step */}
                    <div className="flex items-center gap-3 mb-4">
                      {index === 1 ? (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary/30 to-accent-secondary/20 border border-accent-primary/30 flex items-center justify-center shadow-sm">
                          <span className="text-heading-md font-display font-bold text-accent-primary">{step.number}</span>
                        </div>
                      ) : index === 3 ? (
                        <div className="w-12 h-12 rounded-xl bg-success/15 border border-success/40 flex items-center justify-center">
                          <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isFirst ? "bg-accent-glow border-2 border-accent-primary/40" : "bg-accent-glow border border-accent-primary/30"}`}>
                          <span className="text-heading-md font-display font-bold text-accent-primary">{step.number}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-heading-sm font-medium text-text-primary mb-2">
                      {step.title[language]}
                    </h3>
                    <p className="text-body-sm text-text-secondary mb-3">
                      {step.duration[language]}
                    </p>
                    <p className="text-body-sm text-text-secondary">
                      {step.description[language]}
                    </p>
                  </div>

                  {/* Tags - always at bottom */}
                  <div className="relative mt-4 flex flex-wrap gap-2">
                    {step.deliverables[language].slice(0, 2).map((item, i) => (
                      <span
                        key={`${index}-del-${i}`}
                        className="px-3 py-1 rounded-full border border-border text-caption text-text-tertiary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedItem>
          );
          return index === 2 ? [trackElement, cardElement] : [cardElement];
        }).flat()}
      </div>
    </Section>
  );
}
