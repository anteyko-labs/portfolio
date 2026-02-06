"use client";

import { motion } from "framer-motion";
import NextLink from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { Section, SectionHeader, AnimatedItem } from "@/components/ui/section";
import { TiltCard } from "@/components/ui/tilt-card";
import { CategoryBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/link";
import { flagshipCases } from "@/lib/cases-data";

export function FeaturedCasesSection() {
  const { t, language } = useLanguage();

  return (
    <Section background="secondary" padding="lg">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 md:mb-16">
        <SectionHeader
          title={t("cases.title")}
          subtitle={t("cases.subtitle")}
          eyebrow={language === "en" ? "Portfolio" : "Портфолио"}
          animate={false}
        />
        <ButtonLink href="/cases" buttonVariant="outline" size="sm">
          {t("cta.viewAll")}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flagshipCases.slice(0, 5).map((caseItem, index) => {
          const isFeatured = index === 0;
          const cardHeights = isFeatured ? "h-52 md:h-64" : "h-40 md:h-48";

          const backgroundByIndex = () => {
            if (isFeatured) {
              return (
                <>
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
                      `,
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <div className="absolute top-6 right-6 w-24 h-24 opacity-40">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-accent-primary">
                      <circle cx="20" cy="20" r="4" fill="currentColor" />
                      <circle cx="50" cy="35" r="4" fill="currentColor" />
                      <circle cx="80" cy="25" r="4" fill="currentColor" />
                      <circle cx="30" cy="60" r="4" fill="currentColor" />
                      <circle cx="70" cy="70" r="4" fill="currentColor" />
                      <path d="M20 20 L50 35 L80 25" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
                      <path d="M50 35 L30 60 L70 70" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
                    </svg>
                  </div>
                  <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md bg-bg-elevated/80 border border-border text-caption font-mono text-accent-primary">
                    {t("cases.scenariosCount")}
                  </div>
                </>
              );
            }
            if (index === 1) {
              return (
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255,255,255,0.15) 8px, rgba(255,255,255,0.15) 10px)",
                  }}
                />
              );
            }
            if (index === 2) {
              return (
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: "radial-gradient(circle at 20% 80%, rgba(99,102,241,0.25) 0%, transparent 50%)",
                  }}
                />
              );
            }
            if (index === 3) {
              return (
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "radial-gradient(circle 1px at 1px 1px, rgba(255,255,255,0.4), transparent 0)",
                    backgroundSize: "16px 16px",
                  }}
                />
              );
            }
            return (
              <div className="absolute inset-0 opacity-25">
                <div className="absolute top-4 right-4 w-28 h-28 rounded-full bg-accent-primary/20 blur-2xl" />
                <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-accent-secondary/15 blur-xl" />
              </div>
            );
          };

          return (
            <AnimatedItem
              key={caseItem.id}
              delay={index * 0.1}
              className={isFeatured ? "md:col-span-2 lg:col-span-2" : ""}
            >
              <NextLink
                href={`/cases/${caseItem.slug}`}
                className="block h-full group rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary"
              >
                <TiltCard
                  padding="none"
                  variant="bordered"
                  hoverGradientBorder
                  noiseHover
                  tiltAmount={12}
                  noiseHoverOpacity={0.05}
                  className="h-full overflow-hidden"
                >
                  <div className={`relative ${cardHeights} bg-gradient-to-br from-bg-tertiary via-bg-elevated to-bg-secondary overflow-hidden`}>
                    {caseItem.imageUrl ? (
                      <>
                        <Image
                          src={caseItem.imageUrl}
                          alt={caseItem.title[language]}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          sizes={isFeatured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/90 via-bg-secondary/30 to-transparent" />
                      </>
                    ) : (
                      <>
                        {!isFeatured && (
                          <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-accent-primary/20 blur-3xl" />
                            <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-accent-secondary/20 blur-2xl" />
                          </div>
                        )}
                        {backgroundByIndex()}
                      </>
                    )}
                    <div className="absolute top-4 left-4 z-10">
                      <CategoryBadge category={caseItem.category} />
                    </div>
                  </div>

                  <div className={`p-6 pb-10 md:pb-12 ${isFeatured ? "md:p-8 md:pb-14" : ""}`}>
                    <h3 className={`font-medium text-text-primary mb-2 group-hover:text-accent-primary transition-colors duration-300 ${isFeatured ? "text-heading-lg md:text-heading-xl" : "text-heading-md"}`}>
                      {caseItem.title[language]}
                    </h3>
                    <p className={`text-text-secondary line-clamp-2 ${isFeatured ? "text-body-md" : "text-body-sm"}`}>
                      {caseItem.summary[language]}
                    </p>
                    {caseItem.metrics && caseItem.metrics.length > 0 && (
                      <div className={`mt-4 flex flex-wrap gap-x-6 gap-y-1 ${isFeatured ? "text-body-sm" : "text-caption"}`}>
                        {caseItem.metrics.slice(0, 2).map((m, i) => (
                          <span key={i} className="text-text-tertiary">
                            {m.label[language]}: <span className="text-accent-primary font-medium">{m.value}</span>
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-6 flex items-center text-body-sm text-accent-primary font-medium">
                      {t("cta.viewCase")}
                      <motion.span
                        className="inline-block ml-1"
                        initial={false}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg
                          className="w-4 h-4"
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
                      </motion.span>
                    </div>
                  </div>
                </TiltCard>
              </NextLink>
            </AnimatedItem>
          );
        })}
      </div>
    </Section>
  );
}
