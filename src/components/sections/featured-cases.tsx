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
                    className="absolute inset-0 opacity-[0.6]"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(10,10,10,0.04) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(10,10,10,0.04) 1px, transparent 1px)
                      `,
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <div className="absolute top-6 right-6 w-24 h-24 opacity-50">
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
                  <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md bg-bg-primary/90 border border-border text-caption font-mono text-accent-primary">
                    {t("cases.scenariosCount")}
                  </div>
                </>
              );
            }
            if (index === 1) {
              return (
                <div
                  className="absolute inset-0 opacity-[0.5]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(10,10,10,0.04) 8px, rgba(10,10,10,0.04) 10px)",
                  }}
                />
              );
            }
            if (index === 2) {
              return (
                <div
                  className="absolute inset-0 opacity-[0.7]"
                  style={{
                    backgroundImage: "radial-gradient(circle at 20% 80%, rgba(79,70,229,0.06) 0%, transparent 55%)",
                  }}
                />
              );
            }
            if (index === 3) {
              return (
                <div
                  className="absolute inset-0 opacity-[0.6]"
                  style={{
                    backgroundImage: "radial-gradient(circle 1px at 1px 1px, rgba(10,10,10,0.08), transparent 0)",
                    backgroundSize: "16px 16px",
                  }}
                />
              );
            }
            return (
              <div className="absolute inset-0">
                <div className="absolute top-4 right-4 w-28 h-28 rounded-full bg-accent-primary/[0.06] blur-2xl" />
                <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-accent-secondary/[0.05] blur-xl" />
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
                data-cursor="View"
              >
                <TiltCard
                  padding="none"
                  variant="bordered"
                  hoverGradientBorder={false}
                  noiseHover={false}
                  tiltAmount={8}
                  className="h-full overflow-hidden shadow-glow-sm"
                >
                  <div className={`relative ${cardHeights} bg-bg-tertiary overflow-hidden`}>
                    {caseItem.imageUrl ? (
                      caseItem.screenshotLayout === "mobile" ? (
                        <>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-bg-tertiary via-bg-secondary to-bg-primary" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-accent-primary/[0.06] blur-3xl" />
                            <div className={`relative ${isFeatured ? "w-[130px]" : "w-[100px]"} h-[85%] rounded-2xl overflow-hidden border border-border shadow-[0_8px_24px_-8px_rgba(10,10,10,0.18)] transition-transform duration-700 group-hover:scale-105`}>
                              <Image
                                src={caseItem.imageUrl}
                                alt={caseItem.title[language]}
                                width={390}
                                height={844}
                                sizes="130px"
                                className="w-full h-full object-cover object-top"
                              />
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/70 via-transparent to-transparent" />
                        </>
                      ) : (
                        <>
                          <Image
                            src={caseItem.imageUrl}
                            alt={caseItem.title[language]}
                            width={800}
                            height={450}
                            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            sizes={isFeatured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/70 via-transparent to-transparent" />
                        </>
                      )
                    ) : (
                      <>
                        {!isFeatured && (
                          <div className="absolute inset-0">
                            <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-accent-primary/[0.06] blur-3xl" />
                            <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-accent-secondary/[0.05] blur-2xl" />
                          </div>
                        )}
                        {backgroundByIndex()}
                      </>
                    )}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <CategoryBadge category={caseItem.category} />
                      <span className="px-2 py-0.5 rounded-md bg-bg-primary/80 backdrop-blur-sm border border-border text-caption font-mono text-text-tertiary">
                        {caseItem.year}
                      </span>
                    </div>
                  </div>

                  <div className={`p-6 pb-10 md:pb-12 ${isFeatured ? "md:p-8 md:pb-14" : ""}`}>
                    <h3 className={`font-display font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors duration-300 ${isFeatured ? "text-heading-lg md:text-heading-xl" : "text-heading-md"}`}>
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
