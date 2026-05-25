import { PageWrapper } from "@/components/layout/page-wrapper";
import { FAQContent } from "./faq-content";
import { FAQSchema } from "@/components/seo/faq-schema";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { localeAlternates } from "@/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
  title: "FAQ",
  description:
    "Frequently asked questions about pricing, timelines, ownership, NDA, support, Web3, and how we work. Anteyko — Kyrgyzstan & Dubai.",
    alternates: localeAlternates(locale, "/faq"),
  };
}

export default function FAQPage() {
  return (
    <PageWrapper>
      <FAQSchema />
      <JsonLd data={homeBreadcrumb("FAQ", "/faq")} />
      <FAQContent />
    </PageWrapper>
  );
}
