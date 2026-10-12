"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { useReducedMotion } from "@/lib/hooks";
import { PageHero } from "@/components/sections/page-hero";
import { Section, AnimatedItem } from "@/components/ui/section";
import { ButtonLink, Link } from "@/components/ui/link";
import { EASE, SpotlightCard } from "@/components/motion/kit";
import { PKG_COLOR, PackageVisual } from "@/components/services-anim/package-visuals";
import { AuroraCta, CheckList, ShineBadge } from "@/components/services-anim/parts";

export function ServiceDetailContent({ packageId }: { packageId: string }) {
  const { t, translations, language } = useLanguage();
  const reduced = useReducedMotion();
  const pkg = translations.packages.items.find((p) => p.id === packageId);

  // Guard: the server route already calls notFound() for unknown slugs, but this
  // keeps the client component type-safe if it ever renders without a match.
  if (!pkg) return null;
  const color = PKG_COLOR[pkg.id];

  return (
    <>
      <PageHero
        title={pkg.title[language]}
        subtitle={pkg.description[language]}
        eyebrow={pick({ en: "Service", ru: "Услуга", zh: "服务", tr: "Hizmet", ar: "الخدمة" }, language)}
        align="left"
        backLink={{
          href: "/services",
          label: pick({ en: "All services", ru: "Все услуги", zh: "全部服务", tr: "Tüm hizmetler", ar: "جميع الخدمات" }, language),
        }}
        rightSlot={
          <div className="rounded-2xl border border-border bg-bg-secondary/80 p-4 sm:p-5 space-y-4">
            <PackageVisual id={pkg.id} />
            <div className="grid grid-cols-2 gap-4 px-1">
              <div>
                <p className="text-caption uppercase tracking-wider text-text-tertiary mb-1">
                  {pick({ en: "Timeline", ru: "Сроки", zh: "周期", tr: "Takvim", ar: "المدة الزمنية" }, language)}
                </p>
                <p className="text-body-md text-text-primary">
                  {pkg.timeline[language]}
                </p>
              </div>
              <div className="border-l border-border pl-4">
                <p className="text-caption uppercase tracking-wider text-text-tertiary mb-1">
                  {pick({ en: "Cost", ru: "Стоимость", zh: "费用", tr: "Maliyet", ar: "التكلفة" }, language)}
                </p>
                <Link href="/pricing" variant="underline" className="text-body-md">
                  {pick({ en: "See pricing", ru: "Смотреть цены", zh: "查看价格", tr: "Fiyatları gör", ar: "عرض الأسعار" }, language)}
                </Link>
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <ButtonLink
                href={`/contact?package=${pkg.id}`}
                buttonVariant="primary"
                size="md"
                className="w-full justify-center"
              >
                {t("cta.primary")}
              </ButtonLink>
            </div>
          </div>
        }
      />

      <Section background="secondary" padding="lg">
        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {/* Best for */}
          <AnimatedItem className="h-full">
            <SpotlightCard color={color} className="h-full rounded-2xl border border-border bg-bg-primary p-5 sm:p-8">
              <span aria-hidden="true" className="mb-5 grid h-11 w-11 place-items-center rounded-xl text-white shadow-lg" style={{ background: `linear-gradient(135deg, rgb(${color}), #A855F7)` }}>
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </span>
              <h2 className="text-caption text-text-muted uppercase tracking-wider mb-3">
                {pick({ en: "Best for", ru: "Подходит для", zh: "适用于", tr: "En uygun olduğu durum", ar: "الأنسب لـ" }, language)}
              </h2>
              <p className="text-body-md text-text-secondary">
                {pkg.forWhom[language]}
              </p>
            </SpotlightCard>
          </AnimatedItem>

          {/* What's included */}
          <AnimatedItem delay={0.08} className="h-full lg:col-span-2">
            <SpotlightCard color={color} className="h-full rounded-2xl border border-border bg-bg-primary p-5 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-caption text-text-muted uppercase tracking-wider">
                  {pick({ en: "What's included", ru: "Что входит", zh: "包含内容", tr: "Neler dahil", ar: "ما تشمله الباقة" }, language)}
                </h2>
                {pkg.id === "web3-addon" && <ShineBadge tone="soft">Add-on</ShineBadge>}
              </div>
              <CheckList
                items={pkg.deliverables[language]}
                className="grid sm:grid-cols-2 gap-x-6 gap-y-3"
                itemClassName="text-body-md"
                iconClassName="h-4 w-4"
              />
            </SpotlightCard>
          </AnimatedItem>
        </div>

        {/* End result */}
        <AnimatedItem delay={0.16}>
          <div className="sv-sheen-panel relative mt-6 overflow-hidden rounded-2xl bg-[#0B0B14] p-5 text-white sm:p-8">
            <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10 opacity-70" />
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <span aria-hidden="true" className="relative grid h-12 w-12 shrink-0 place-items-center">
                <span className="sv-ping absolute inset-0 rounded-full border-2" style={{ borderColor: `rgb(${color})` }} />
                <span className="grid h-12 w-12 place-items-center rounded-full text-white" style={{ background: `linear-gradient(135deg, rgb(${color}), #EC4899)` }}>
                  <svg viewBox="0 0 20 20" fill="none" className="h-6 w-6">
                    <motion.path
                      d="M4.5 10.5l3.5 3.5 7.5-8"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={reduced ? false : { pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                    />
                  </svg>
                </span>
              </span>
              <div>
                <h2 className="text-caption text-white/50 uppercase tracking-wider mb-2">
                  {pick({ en: "End result", ru: "Итоговый результат", zh: "最终成果", tr: "Nihai sonuç", ar: "النتيجة النهائية" }, language)}
                </h2>
                <p className="text-body-lg text-white">
                  {pkg.result[language]}
                </p>
              </div>
            </div>
          </div>
        </AnimatedItem>
      </Section>

      {/* CTA */}
      <Section background="primary" padding="lg">
        <AuroraCta
          title={pick({ en: "Ready to start?", ru: "Готовы начать?", zh: "准备好开始了吗？", tr: "Başlamaya hazır mısınız?", ar: "جاهز للبدء؟" }, language)}
          text={
            pick({ en: "Tell us about your project and get a fixed-scope estimate within 24 hours.", ru: "Расскажите о проекте и получите оценку по фиксированному объёму в течение 24 часов.", zh: "告诉我们您的项目，24 小时内获得固定范围的报价。", tr: "Projenizden bahsedin, 24 saat içinde sabit kapsamlı bir teklif alın.", ar: "حدّثنا عن مشروعك واحصل على تقدير بنطاق ثابت خلال 24 ساعة." }, language)
          }
          primary={{ href: `/contact?package=${pkg.id}`, label: t("cta.primary") }}
          secondary={{ href: "/pricing", label: pick({ en: "See all pricing", ru: "Все цены", zh: "查看全部价格", tr: "Tüm fiyatları gör", ar: "عرض جميع الأسعار" }, language) }}
        />
      </Section>
    </>
  );
}
