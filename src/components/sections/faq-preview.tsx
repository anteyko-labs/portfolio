"use client";

import { useLanguage } from "@/lib/language-context";
import { Section, AnimatedItem } from "@/components/ui/section";
import { AccordionItem } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/link";
import { getFAQItems } from "@/lib/faq-data";

export function FAQPreviewSection() {
  const { t, language } = useLanguage();
  const faqItems = getFAQItems(6);

  return (
    <Section background="primary" padding="lg">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 md:mb-16">
        <div>
          <span className="block font-mono text-caption uppercase tracking-[0.15em] text-text-tertiary mb-4">
            FAQ
          </span>
          <h2 className="font-display font-semibold tracking-tight text-text-primary text-display-sm md:text-display-md">
            {t("faq.title")}
          </h2>
          <p className="mt-4 md:mt-5 text-body-lg text-text-secondary max-w-2xl leading-relaxed">
            {t("faq.subtitle")}
          </p>
        </div>
        <ButtonLink href="/faq" buttonVariant="outline" size="sm">
          {t("faq.viewAll")}
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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

      <div className="max-w-3xl">
        <AnimatedItem>
          <div className="bg-bg-secondary rounded-2xl border border-border p-6 md:p-8">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} title={item.question[language]}>
                {item.answer[language]}
              </AccordionItem>
            ))}
          </div>
        </AnimatedItem>
      </div>
    </Section>
  );
}
