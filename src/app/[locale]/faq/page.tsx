import { PageWrapper } from "@/components/layout/page-wrapper";
import { FAQContent } from "./faq-content";
import { FAQSchema } from "@/components/seo/faq-schema";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { localeAlternates } from "@/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
  title: locale === "ru" ? "Частые вопросы" : "FAQ",
  description:
    locale === "ru"
      ? "Частые вопросы о ценах, сроках, правах собственности, NDA, поддержке, Web3 и о том, как мы работаем. Anteyko — Бишкек, Дубай, Стамбул, Чикаго, Шэньчжэнь."
      : "Frequently asked questions about pricing, timelines, ownership, NDA, support, Web3, and how we work. Anteyko — Bishkek, Dubai, Istanbul, Chicago, Shenzhen.",
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
