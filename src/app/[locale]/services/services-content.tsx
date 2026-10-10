"use client";

import { useMemo } from "react";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeader, AnimatedItem } from "@/components/ui/section";
import { ButtonLink, Link } from "@/components/ui/link";
import { AuroraCta, CheckList, CompareMatrix, DeliveryGates, PackageShell, Price, ShineBadge } from "@/components/services-anim/parts";
import { PKG_COLOR } from "@/components/services-anim/package-visuals";
import { PACKAGE_SLUGS } from "@/lib/service-slugs";

// Comparison axes configuration (stable reference)
const COMPARISON_AXES_CONFIG = [
  {
    id: "speed",
    label: { en: "Speed to launch", ru: "Скорость запуска", zh: "上线速度", tr: "Lansman hızı", ar: "سرعة الإطلاق" },
    values: { "launch-site": 3, "mvp-sprint": 2, "startup-key": 1 },
  },
  {
    id: "depth",
    label: { en: "Depth of delivery", ru: "Глубина поставки", zh: "交付深度", tr: "Teslimat derinliği", ar: "عمق التسليم" },
    values: { "launch-site": 1, "mvp-sprint": 2, "startup-key": 3 },
  },
  {
    id: "risk",
    label: { en: "Risk control", ru: "Контроль рисков", zh: "风险控制", tr: "Risk kontrolü", ar: "التحكم في المخاطر" },
    values: { "launch-site": 1, "mvp-sprint": 2, "startup-key": 3 },
  },
  {
    id: "support",
    label: { en: "Post-launch support", ru: "Поддержка после запуска", zh: "上线后支持", tr: "Lansman sonrası destek", ar: "الدعم بعد الإطلاق" },
    values: { "launch-site": 1, "mvp-sprint": 2, "startup-key": 3 },
  },
];

export function ServicesContent() {
  const { t, translations, language } = useLanguage();
  const packages = translations.packages.items;
  const corePackages = packages.filter((pkg) => pkg.id !== "web3-addon");

  // Memoize comparison axes with language-dependent labels
  const comparisonAxes = useMemo(() => 
    COMPARISON_AXES_CONFIG.map((axis) => ({
      id: axis.id,
      label: pick(axis.label, language),
      values: axis.values,
    })),
    [language]
  );

  return (
    <>
      <PageHero
        title={t("packages.title")}
        subtitle={t("packages.subtitle")}
        eyebrow={pick({ en: "Services", ru: "Услуги", zh: "服务", tr: "Hizmetler", ar: "الخدمات" }, language)}
        metric={{
          value: pick({ en: "24h", ru: "24ч", zh: "24 小时", tr: "24 sa", ar: "24 ساعة" }, language),
          label: pick({ en: "estimate response", ru: "ответ по оценке", zh: "报价响应", tr: "teklif yanıtı", ar: "للرد بالتقدير" }, language),
        }}
        rightSlot={
          <DeliveryGates
            title={pick({ en: "Delivery gates", ru: "Гейты поставки", zh: "交付关卡", tr: "Teslimat kapıları", ar: "بوابات التسليم" }, language)}
            items={
              pick(
                {
                  en: ["Scope lock + risk review", "Architecture approval", "Release verification report"],
                  ru: ["Фиксация скоупа + риск‑ревью", "Утверждение архитектуры", "Отчёт верификации релиза"],
                  zh: ["范围锁定 + 风险评审", "架构审批", "发布验证报告"],
                  tr: ["Kapsam kilidi + risk incelemesi", "Mimari onayı", "Yayın doğrulama raporu"],
                  ar: ["تثبيت النطاق + مراجعة المخاطر", "اعتماد البنية المعمارية", "تقرير التحقق من الإصدار"],
                },
                language
              )
            }
          />
        }
      />

      <Section background="secondary" padding="lg">
        {/* 2x2 Grid layout with equal height cards */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {packages.map((pkg, index) => (
            <AnimatedItem key={pkg.id} delay={(index % 2) * 0.1} className="h-full">
              <PackageShell id={pkg.id} highlight={pkg.id === "web3-addon"}>
                {/* Content wrapper - grows to fill space */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-heading-lg font-display text-text-primary">
                          {pkg.title[language]}
                        </h2>
                        {pkg.id === "web3-addon" && <ShineBadge>Add-on</ShineBadge>}
                      </div>
                      <div className="mt-1 flex items-center gap-3">
                        <p className="text-body-sm text-text-muted">
                          {pkg.timeline[language]}
                        </p>
                        {"startingPrice" in pkg && (
                          <>
                            <span className="text-text-tertiary">·</span>
                            <p className="text-body-sm font-semibold text-accent-primary">
                              <Price value={pkg.startingPrice[language]} />
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-body-md text-text-secondary mb-6">
                    {pkg.description[language]}
                  </p>

                  {/* Best for section */}
                  <div className="mb-6">
                    <h3 className="text-caption text-text-muted uppercase tracking-wider mb-2">
                      {pick({ en: "Best for", ru: "Подходит для", zh: "适用于", tr: "En uygun olduğu durum", ar: "الأنسب لـ" }, language)}
                    </h3>
                    <p className="text-body-sm text-text-secondary">
                      {pkg.forWhom[language]}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="mb-6">
                    <h3 className="text-caption text-text-muted uppercase tracking-wider mb-3">
                      {pick({ en: "What you get", ru: "Что получите", zh: "您将获得", tr: "Neler alırsınız", ar: "ما ستحصل عليه" }, language)}
                    </h3>
                    <CheckList items={pkg.deliverables[language].slice(0, 6)} />
                  </div>

                  {/* Result section */}
                  <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-bg-tertiary/70 to-bg-secondary p-4">
                    <span aria-hidden="true" className="absolute inset-y-3 left-0 w-1 rounded-r-full" style={{ background: `rgb(${PKG_COLOR[pkg.id]})` }} />
                    <h3 className="text-caption text-text-muted uppercase tracking-wider mb-2">
                      {pick({ en: "End result", ru: "Итоговый результат", zh: "最终成果", tr: "Nihai sonuç", ar: "النتيجة النهائية" }, language)}
                    </h3>
                    <p className="text-body-sm text-text-primary">
                      {pkg.result[language]}
                    </p>
                  </div>
                </div>

                {/* CTA Button - always at bottom */}
                <div className="pt-6 mt-6 border-t border-border space-y-3">
                  <ButtonLink
                    href={`/contact?package=${pkg.id}`}
                    buttonVariant={pkg.id === "web3-addon" ? "primary" : "secondary"}
                    size="md"
                    className="w-full justify-center"
                  >
                    {t("cta.finalAction")}
                  </ButtonLink>
                  <Link
                    href={`/services/${PACKAGE_SLUGS[pkg.id as keyof typeof PACKAGE_SLUGS]}`}
                    variant="underline"
                    className="block text-center text-body-sm no-underline hover:underline"
                  >
                    {pick({ en: "Learn more", ru: "Подробнее", zh: "了解更多", tr: "Daha fazla bilgi", ar: "اعرف المزيد" }, language)}
                  </Link>
                </div>
              </PackageShell>
            </AnimatedItem>
          ))}
        </div>
      </Section>

      <Section background="primary" padding="lg">
        <SectionHeader
          title={t("packages.compareTitle")}
          subtitle={t("packages.compareSubtitle")}
          align="center"
        />
        <CompareMatrix axes={comparisonAxes} packages={corePackages.map((pkg) => ({ id: pkg.id, label: pkg.title[language] }))} />

        {/* CTA section */}
        <div className="mt-16">
          <AuroraCta
            as="h3"
            title={pick({ en: "Not sure which package fits?", ru: "Не уверены, какой пакет подходит?", zh: "不确定哪个方案适合？", tr: "Hangi paketin uygun olduğundan emin değil misiniz?", ar: "لست متأكدًا أي باقة تناسبك؟" }, language)}
            text={
              pick({ en: "Book a 30-minute call to discuss your project. We'll recommend the right approach based on your goals and constraints.", ru: "Запишитесь на 30-минутный звонок для обсуждения проекта. Мы порекомендуем подходящий подход на основе ваших целей и ограничений.", zh: "预约 30 分钟通话，聊聊您的项目。我们会根据您的目标和约束条件推荐合适的方案。", tr: "Projenizi konuşmak için 30 dakikalık bir görüşme planlayın. Hedeflerinize ve kısıtlarınıza göre doğru yaklaşımı önerelim.", ar: "احجز مكالمة مدتها 30 دقيقة لمناقشة مشروعك. سنوصي بالنهج الأنسب بناءً على أهدافك وقيودك." }, language)
            }
            primary={{ href: "/contact", label: t("cta.primary") }}
            secondary={{ href: "/cases", label: pick({ en: "See our work", ru: "Наши работы", zh: "查看我们的作品", tr: "Çalışmalarımızı görün", ar: "اطّلع على أعمالنا" }, language) }}
          />
        </div>
      </Section>
    </>
  );
}
