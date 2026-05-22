"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { useCountUp, useInViewOnce } from "@/lib/animation-hooks";
import { Section, SectionHeader, AnimatedItem } from "@/components/ui/section";
import { slideInLeft, slideInRight } from "@/lib/motion";

const icons = [
  // End-to-end
  <svg
    key="e2e"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>,
  // Engineering
  <svg
    key="eng"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>,
  // Product thinking
  <svg
    key="product"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>,
  // Transparency
  <svg
    key="trans"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>,
  // Speed
  <svg
    key="speed"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>,
  // Support after launch (lifebuoy)
  <svg
    key="support"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
    <circle cx="12" cy="12" r="3.5" strokeWidth={1.5} />
    <path
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M5.6 5.6l3.3 3.3m6.2 6.2l3.3 3.3m0-13.1l-3.3 3.3M8.9 15.1l-3.3 3.3"
    />
  </svg>,
];

export function WhyUsSection() {
  const { t, translations, language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [counterRef, counterInView] = useInViewOnce(0.5);
  const count40 = useCountUp("40+", counterInView);
  const count5 = useCountUp("5+", counterInView);

  const items = translations.whyUs.items;

  const itemVariants = (i: number) => (prefersReducedMotion ? {} : i % 2 === 0 ? slideInLeft : slideInRight);

  return (
    <Section background="primary" padding="xl" className="relative">
      <SectionHeader
        title={t("whyUs.title")}
        eyebrow={language === "en" ? "Advantages" : "Преимущества"}
      />

      {/* Игра с цифрой в строке (StrategiQ-style: 40+ projec ts) */}
      <motion.p
        ref={counterRef as React.Ref<HTMLParagraphElement>}
        className="text-center text-body-lg text-text-secondary mb-10"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <span className="gradient-text font-semibold">{count40}</span>{" "}
        {language === "en" ? "projects" : "проектов"} ·{" "}
        <span className="gradient-text font-semibold">{count5}</span>{" "}
        {language === "en" ? "years" : "лет"}
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-12 lg:gap-y-8 relative">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-30px" }}
            variants={itemVariants(index)}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex gap-4 group">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-bg-secondary border border-border flex items-center justify-center text-accent-primary transition-all duration-300 group-hover:border-border-hover group-hover:bg-bg-tertiary group-hover:shadow-glow-sm">
                {icons[index]}
              </div>
              <div>
                <h3 className="text-heading-sm font-semibold text-text-primary mb-1">
                  {item.title[language]}
                </h3>
                <p className="text-body-md text-text-secondary">
                  {item.description[language]}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
