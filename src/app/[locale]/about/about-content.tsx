"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { pick, type L, type Language } from "@/lib/i18n-text";
import { useReducedMotion } from "@/lib/hooks";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/link";
import { EASE } from "@/components/motion/kit";
import { RunScope } from "@/components/about-anim/shared";
import { StatsCard } from "@/components/about-anim/stats-card";
import { Story } from "@/components/about-anim/story";
import { Principles } from "@/components/about-anim/principles";
import { Industries } from "@/components/about-anim/industries";
import { Quality } from "@/components/about-anim/quality";
import { Offices } from "@/components/about-anim/offices";
import { Team } from "@/components/about-anim/team";
import { Crew } from "@/components/about-anim/crew";
import { Directions } from "@/components/about-anim/directions";


export function AboutContent() {
  const { translations, language } = useLanguage();
  const reduced = useReducedMotion();
  const about = translations.about;

  const story = about.story as unknown as Record<"why" | "how" | "who", L>;
  const industries = (about as unknown as { industries: { title: L; items: { name: L; count: string; icon: string }[] } }).industries;
  const closingCta = (about as unknown as { closingCta: L }).closingCta;

  return (
    <>
      <PageHero
        title={about.title[language]}
        subtitle={about.subtitle[language]}
        eyebrow={pick({ en: "About", ru: "О нас", zh: "关于", tr: "Hakkımızda", ar: "من نحن" }, language)}
        rightSlot={<StatsCard metrics={about.metrics} language={language} />}
      />

      {/* Story — 3 structured blocks */}
      <Story story={story} language={language} />

      {/* Team in numbers + what we do */}
      <RunScope className="relative overflow-hidden bg-bg-secondary py-20 md:py-28">
        <div className="container mx-auto space-y-24 px-4 sm:px-6 md:space-y-32 lg:px-8">
          <Crew language={language} />
          <Directions />
        </div>
      </RunScope>

      {/* Principles */}
      <Principles title={about.values.title} items={about.values.items} language={language} />

      {/* Industries + quality */}
      <RunScope className="relative overflow-hidden bg-bg-primary py-20 md:py-28">
        <div className="container mx-auto space-y-20 px-4 sm:px-6 md:space-y-28 lg:px-8">
          <Industries title={industries.title} items={industries.items} language={language} />
          <Quality title={about.toolchain.title} items={about.toolchain.items} language={language} />
        </div>
      </RunScope>

      {/* Geography */}
      <Offices title={about.geography.title} description={about.geography.description} language={language} />

      {/* Team, founder note, CTA */}
      <RunScope className="relative overflow-hidden bg-bg-primary py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Team language={language} />

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative isolate mt-20 overflow-hidden rounded-3xl bg-[#06060B] px-6 py-14 text-center text-white md:mt-28 md:px-12 md:py-20"
          >
            <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10 opacity-80" />
            <p className="mx-auto max-w-3xl font-brand text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-4xl">
              <span className="home-gradient-text">{closingCta[language].split(". ")[0]}.</span> {closingCta[language].split(". ").slice(1).join(". ")}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <span className="home-cta-glow inline-flex rounded-xl">
                <ButtonLink href="/contact" buttonVariant="primary" size="lg" className="w-full">
                  {pick({ en: "Get an estimate in 24 hours", ru: "Получить оценку за 24 часа", zh: "24 小时内获取报价", tr: "24 saatte teklif alın", ar: "احصل على تقدير خلال 24 ساعة" }, language)}
                </ButtonLink>
              </span>
              <ButtonLink href="/cases" buttonVariant="secondary" size="lg">
                {pick({ en: "See our work", ru: "Смотреть кейсы", zh: "查看我们的作品", tr: "Çalışmalarımızı görün", ar: "اطّلع على أعمالنا" }, language)}
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </RunScope>
    </>
  );
}
