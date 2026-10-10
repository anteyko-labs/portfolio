import { PageWrapper } from "@/components/layout/page-wrapper";
import { FAQContent } from "./faq-content";
import { FAQSchema } from "@/components/seo/faq-schema";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { localeAlternates } from "@/i18n/metadata";
import { pick, type Language } from "@/lib/i18n-text";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
  title: pick({ en: "FAQ", ru: "Частые вопросы", zh: "常见问题", tr: "SSS", ar: "الأسئلة الشائعة" }, locale as Language),
  description:
    pick(
      {
        en: "Frequently asked questions about pricing, timelines, ownership, NDA, support, Web3, and how we work. Anteyko — Bishkek, Dubai, Istanbul, Chicago, Shenzhen.",
        ru: "Частые вопросы о ценах, сроках, правах собственности, NDA, поддержке, Web3 и о том, как мы работаем. Anteyko — Бишкек, Дубай, Стамбул, Чикаго, Шэньчжэнь.",
        zh: "关于价格、周期、所有权、NDA、支持、Web3 以及我们工作方式的常见问题。Anteyko——比什凯克、迪拜、伊斯坦布尔、芝加哥、深圳。",
        tr: "Fiyatlandırma, takvim, mülkiyet, NDA, destek, Web3 ve çalışma şeklimiz hakkında sık sorulan sorular. Anteyko — Bişkek, Dubai, İstanbul, Chicago, Shenzhen.",
        ar: "أسئلة شائعة حول الأسعار والمدد الزمنية وحقوق الملكية واتفاقية NDA والدعم وWeb3 وطريقة عملنا. Anteyko — بيشكيك ودبي وإسطنبول وشيكاغو وشنتشن.",
      },
      locale as Language
    ),
    alternates: localeAlternates(locale, "/faq"),
  };
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <PageWrapper>
      <FAQSchema locale={locale} />
      <JsonLd data={homeBreadcrumb("FAQ", "/faq")} />
      <FAQContent />
    </PageWrapper>
  );
}
