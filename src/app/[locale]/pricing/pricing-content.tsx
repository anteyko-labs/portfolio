"use client";

import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { PageHero } from "@/components/sections/page-hero";
import { Section, AnimatedItem } from "@/components/ui/section";
import { AuroraCta, CheckList, MilestoneTrack, PackageShell, Price, ShineBadge } from "@/components/services-anim/parts";
import { PKG_COLOR } from "@/components/services-anim/package-visuals";
import { ButtonLink, Link } from "@/components/ui/link";
import { PACKAGE_SLUGS } from "@/lib/service-slugs";

export function PricingContent() {
  const { t, translations, language } = useLanguage();
  const packages = translations.packages.items;

  return (
    <>
      <PageHero
        title={pick({ en: "Pricing", ru: "Цены", zh: "价格", tr: "Fiyatlar", ar: "الأسعار" }, language)}
        subtitle={t("packages.subtitle")}
        eyebrow={pick({ en: "Pricing", ru: "Цены", zh: "价格", tr: "Fiyatlar", ar: "الأسعار" }, language)}
        metric={{
          value: pick({ en: "24h", ru: "24ч", zh: "24 小时", tr: "24 sa", ar: "24 ساعة" }, language),
          label: pick({ en: "estimate response", ru: "ответ по оценке", zh: "报价响应", tr: "teklif yanıtı", ar: "للرد بالتقدير" }, language),
        }}
        rightSlot={
          <div className="rounded-2xl border border-border bg-bg-secondary/80 p-6">
            <p className="text-caption uppercase tracking-wider text-text-tertiary mb-4">
              {pick({ en: "Pricing in USD", ru: "Цены в USD", zh: "以美元计价", tr: "Fiyatlar USD cinsinden", ar: "الأسعار بالدولار الأمريكي" }, language)}
            </p>
            <p className="text-body-sm text-text-secondary">
              {pick({ en: "Prices are starting points in US dollars. Every project is scoped individually — you get a fixed-scope estimate within 24 hours, billed in milestones.", ru: "Цены указаны в долларах США как стартовая точка. Каждый проект оценивается индивидуально — фиксированную оценку по объёму вы получаете в течение 24 часов, оплата по этапам.", zh: "价格为美元起步价。每个项目单独评估——24 小时内为您提供固定范围的报价，按里程碑付款。", tr: "Fiyatlar ABD doları cinsinden başlangıç noktalarıdır. Her proje ayrı kapsamlandırılır — 24 saat içinde sabit kapsamlı bir teklif alırsınız, ödeme aşamalara göre yapılır.", ar: "الأسعار بالدولار الأمريكي وتمثل نقطة بداية. يُقيَّم كل مشروع على حدة — تحصل على تقدير بنطاق ثابت خلال 24 ساعة، مع الدفع على مراحل." }, language)}
            </p>
            <MilestoneTrack />
          </div>
        }
      />

      <Section background="secondary" padding="lg">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {packages.map((pkg, index) => {
            const slug = PACKAGE_SLUGS[pkg.id];
            const isRecommended = pkg.id === "mvp-sprint";
            return (
              <AnimatedItem key={pkg.id} delay={(index % 2) * 0.1} className="h-full">
                <PackageShell id={pkg.id} highlight={isRecommended}>
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-heading-lg font-display font-bold text-text-primary">
                            {pkg.title[language]}
                          </h2>
                          {isRecommended && <ShineBadge>{pick({ en: "Popular", ru: "Популярный", zh: "热门", tr: "Popüler", ar: "الأكثر طلبًا" }, language)}</ShineBadge>}
                          {pkg.id === "web3-addon" && <ShineBadge tone="soft">Add-on</ShineBadge>}
                        </div>
                        <p className="mt-2 font-brand text-3xl font-semibold tracking-[-0.02em] text-accent-primary">
                          <Price value={pkg.startingPrice[language]} />
                        </p>
                        <p className="text-body-sm text-text-muted mt-1">
                          {pkg.timeline[language]}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-body-md text-text-secondary mb-6">
                      {pkg.description[language]}
                    </p>

                    {/* Deliverables */}
                    <div className="mb-6">
                      <h3 className="text-caption text-text-muted uppercase tracking-wider mb-3">
                        {pick({ en: "What's included", ru: "Что входит", zh: "包含内容", tr: "Neler dahil", ar: "ما تشمله الباقة" }, language)}
                      </h3>
                      <CheckList items={pkg.deliverables[language]} />
                    </div>

                    {/* Result */}
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

                  {/* CTA + details link - always at bottom */}
                  <div className="pt-6 mt-6 border-t border-border space-y-3">
                    <ButtonLink
                      href={`/contact?package=${pkg.id}`}
                      buttonVariant={isRecommended ? "primary" : "secondary"}
                      size="md"
                      className="w-full justify-center"
                    >
                      {t("cta.primary")}
                    </ButtonLink>
                    <Link
                      href={`/services/${slug}`}
                      variant="underline"
                      className="block text-center text-body-sm no-underline hover:underline"
                    >
                      {pick({ en: "See full details", ru: "Подробнее об услуге", zh: "查看完整详情", tr: "Tüm ayrıntılar", ar: "عرض التفاصيل الكاملة" }, language)}
                    </Link>
                  </div>
                </PackageShell>
              </AnimatedItem>
            );
          })}
        </div>

        {/* USD note */}
        <AnimatedItem delay={0.4}>
          <p className="mt-8 text-body-sm text-text-tertiary text-center max-w-2xl mx-auto">
            {pick({ en: "All prices are in US dollars (USD) and represent starting points. Final scope and cost are confirmed in a fixed-scope proposal after a short discovery.", ru: "Все цены указаны в долларах США (USD) и являются стартовыми. Финальный объём и стоимость фиксируются в предложении после короткого этапа исследования.", zh: "所有价格均以美元（USD）计，为起步价。最终范围与费用将在简短的需求调研后，通过固定范围方案确认。", tr: "Tüm fiyatlar ABD doları (USD) cinsindendir ve başlangıç noktalarıdır. Nihai kapsam ve maliyet, kısa bir keşif aşamasından sonra sabit kapsamlı teklifte netleşir.", ar: "جميع الأسعار بالدولار الأمريكي (USD) وتمثل نقطة بداية. يُعتمد النطاق النهائي والتكلفة في عرض بنطاق ثابت بعد مرحلة استكشاف قصيرة." }, language)}
          </p>
        </AnimatedItem>
      </Section>

      {/* Not sure which? CTA */}
      <Section background="primary" padding="lg">
        <AuroraCta
          as="h3"
          title={pick({ en: "Not sure which package fits?", ru: "Не уверены, какой пакет подходит?", zh: "不确定哪个方案适合？", tr: "Hangi paketin uygun olduğundan emin değil misiniz?", ar: "لست متأكدًا أي باقة تناسبك؟" }, language)}
          text={
            pick({ en: "Tell us about your project and we'll recommend the right approach based on your goals and constraints.", ru: "Расскажите о проекте, и мы порекомендуем подходящий подход на основе ваших целей и ограничений.", zh: "告诉我们您的项目，我们会根据您的目标和约束条件推荐合适的方案。", tr: "Projenizden bahsedin, hedeflerinize ve kısıtlarınıza göre doğru yaklaşımı önerelim.", ar: "حدّثنا عن مشروعك وسنوصي بالنهج الأنسب بناءً على أهدافك وقيودك." }, language)
          }
          primary={{ href: "/contact", label: t("cta.primary") }}
          secondary={{ href: "/services", label: pick({ en: "Compare packages", ru: "Сравнить пакеты", zh: "对比方案", tr: "Paketleri karşılaştır", ar: "قارن بين الباقات" }, language) }}
        />
      </Section>
    </>
  );
}
