"use client";

import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { PageHero } from "@/components/sections/page-hero";
import { Section, AnimatedItem } from "@/components/ui/section";
import { AuroraCta, MilestoneTrack } from "@/components/services-anim/parts";
import { PriceRow, PriceTier } from "@/components/services-anim/price-tier";
import { PriceGroupLabel } from "@/components/services-anim/price-group-label";
import { SERVICE_GROUPS } from "@/lib/service-slugs";

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
        {SERVICE_GROUPS.map((group, g) => {
          const items = packages.filter((pkg) => pkg.group === group.id);
          return (
            <div key={group.id} className={g ? "mt-20" : undefined}>
              <PriceGroupLabel label={pick(group.label, language)} />
              {group.id === "care" ? (
                <ul className="mt-8 space-y-5">
                  {items.map((pkg, i) => (
                    <PriceRow key={pkg.id} pkg={pkg} index={i} />
                  ))}
                </ul>
              ) : (
                <div className={`mt-8 grid items-stretch gap-6 md:grid-cols-2 ${items.length === 4 ? "xl:grid-cols-4" : "lg:grid-cols-3"}`}>
                  {items.map((pkg, i) => (
                    <PriceTier key={pkg.id} pkg={pkg} index={i} recommended={pkg.id === "mvp-sprint"} entrance={group.id === "build" ? "flip" : "curtain"} />
                  ))}
                </div>
              )}
            </div>
          );
        })}

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
          secondary={{ href: "/services", label: pick({ en: "All services", ru: "Все услуги", zh: "全部服务", tr: "Tüm hizmetler", ar: "جميع الخدمات" }, language) }}
        />
      </Section>
    </>
  );
}
