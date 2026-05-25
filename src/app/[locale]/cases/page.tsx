import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { localeAlternates } from "@/i18n/metadata";
import { CasesContent } from "./cases-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
  title: locale === "ru" ? "Кейсы" : "Cases",
  description:
    locale === "ru"
      ? "Избранные работы: Web3, MVP, корпоративные модули, гео/тепловые карты, платёжные потоки. Реальные проекты, реальные результаты. Anteyko — Кыргызстан и Дубай."
      : "Selected work: Web3, MVP, enterprise modules, geo/heatmap, payment flows. Real projects, real outcomes. Anteyko — Kyrgyzstan & Dubai.",
    alternates: localeAlternates(locale, "/cases"),
  };
}

export default function CasesPage() {
  return (
    <PageWrapper>
      <JsonLd data={homeBreadcrumb("Cases", "/cases")} />
      <CasesContent />
    </PageWrapper>
  );
}
