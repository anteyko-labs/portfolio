"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import type { ServiceGroup } from "@/lib/service-slugs";
import { pick } from "@/lib/i18n-text";
import { Section } from "@/components/ui/section";
import { Link } from "@/components/ui/link";
import { AuroraCta } from "@/components/services-anim/parts";
import { ServicesHero } from "@/components/services-anim/services-hero";
import { ServiceCabinet } from "@/components/services-anim/service-cabinet";

export function ServicesContent() {
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();
  // the open catalog folder; the hero's folders and the catalog's tabs both set it
  const [tab, setTab] = useState<ServiceGroup>("build");
  // cards are dealt in when a folder is opened by hand, not on first paint
  const [opened, setOpened] = useState(false);
  const openFolder = (g: ServiceGroup, deal = true) => {
    if (deal) setOpened(true);
    setTab(g);
  };

  return (
    <>
      <ServicesHero
        onPick={(g, slug) => {
          openFolder(g);
          // the folder renders first, then its card can be scrolled to
          window.setTimeout(() => document.getElementById(slug ?? "catalog")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }), 60);
        }}
      />
      <ServiceCabinet tab={tab} opened={opened} onTab={openFolder} />
      <div className="bg-bg-secondary pb-16">
        <p className="text-center text-body-md text-text-secondary">
          {pick({ en: "Prices and payment terms are on the", ru: "Цены и условия оплаты — на странице", zh: "价格与付款条件请见", tr: "Fiyatlar ve ödeme koşulları için", ar: "الأسعار وشروط الدفع في صفحة" }, language)}{" "}
          <Link href="/pricing" variant="underline">
            {pick({ en: "Pricing", ru: "Цены", zh: "价格页面", tr: "Fiyatlar sayfasına bakın", ar: "الأسعار" }, language)}
          </Link>
        </p>
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
