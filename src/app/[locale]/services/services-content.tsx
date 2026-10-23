"use client";

import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { Link } from "@/components/ui/link";
import { AuroraCta, DeliveryGates } from "@/components/services-anim/parts";
import { GroupHeading } from "@/components/services-anim/group-heading";
import { SERVICE_GROUPS } from "@/lib/service-slugs";
import { ServiceChapter } from "@/components/services-anim/service-chapter";
import { ServicesStrip } from "@/components/services-anim/services-strip";

export function ServicesContent() {
  const { t, translations, language } = useLanguage();
  const packages = translations.packages.items;

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

      {/* the strip sticks only while the chapters are on screen */}
      <div>
      <ServicesStrip />
      <Section background="secondary" padding="lg">
        {SERVICE_GROUPS.map((group, g) => {
          const items = packages.filter((pkg) => pkg.group === group.id);
          // chapters are numbered in display order, across groups
          const start = SERVICE_GROUPS.slice(0, g).reduce((n, prev) => n + packages.filter((pkg) => pkg.group === prev.id).length, 0);
          return (
            <div key={group.id} className={g ? "mt-24 md:mt-32" : undefined}>
              <GroupHeading index={g} label={pick(group.label, language)} count={items.length} />
              <ol className="mt-12 space-y-20 md:space-y-28">
                {items.map((pkg, i) => (
                  <ServiceChapter key={pkg.id} pkg={pkg} index={start + i} />
                ))}
              </ol>
            </div>
          );
        })}
        <p className="mt-16 text-center text-body-md text-text-secondary">
          {pick({ en: "Prices and payment terms are on the", ru: "Цены и условия оплаты — на странице", zh: "价格与付款条件请见", tr: "Fiyatlar ve ödeme koşulları için", ar: "الأسعار وشروط الدفع في صفحة" }, language)}{" "}
          <Link href="/pricing" variant="underline">
            {pick({ en: "Pricing", ru: "Цены", zh: "价格页面", tr: "Fiyatlar sayfasına bakın", ar: "الأسعار" }, language)}
          </Link>
        </p>
      </Section>
      </div>

      <Section background="primary" padding="lg">
        {/* CTA section */}
        <div>
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
