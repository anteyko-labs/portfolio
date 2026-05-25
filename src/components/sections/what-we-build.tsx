"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { Link as NextLink } from "@/i18n/navigation";
import { Section, SectionHeader, AnimatedItem } from "@/components/ui/section";
import { TiltCard } from "@/components/ui/tilt-card";
import { slideInLeft, slideInRight, fadeInUp } from "@/lib/motion";

const icons = [
  <svg key="web" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>,
  <svg key="mvp" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>,
  <svg key="web3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>,
];

export function WhatWeBuildSection() {
  const { t, translations, language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const items = translations.whatWeBuild.items;

  const getVariants = (index: number) => {
    if (prefersReducedMotion) return {};
    if (index === 0) return slideInLeft;
    if (index === 1) return fadeInUp;
    return slideInRight;
  };

  return (
    <Section background="secondary" padding="lg">
      <SectionHeader
        title={t("whatWeBuild.title")}
        eyebrow={language === "en" ? "Services" : "Услуги"}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-40px" }}
            variants={getVariants(index)}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-full"
          >
            <NextLink href="/services" className="block h-full">
              <TiltCard
                variant="bordered"
                padding="lg"
                hoverGradientBorder={false}
                noiseHover={false}
                tiltAmount={4}
                className="h-full group !bg-bg-primary !border-border transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-bg-secondary border border-border flex items-center justify-center text-accent-primary mb-6 transition-colors duration-300 group-hover:bg-accent-primary/[0.07] group-hover:border-accent-primary/30">
                  {icons[index]}
                </div>
                <h3 className="text-heading-lg font-semibold text-text-primary mb-3 group-hover:text-accent-primary transition-colors">
                  {item.title[language]}
                </h3>
                <p className="text-body-md text-text-secondary">
                  {item.description[language]}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-body-sm font-medium text-accent-primary">
                  {language === "en" ? "Learn more" : "Подробнее"}
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </TiltCard>
            </NextLink>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
