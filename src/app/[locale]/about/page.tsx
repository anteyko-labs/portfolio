import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { localeAlternates } from "@/i18n/metadata";
import { AboutContent } from "./about-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
  title: locale === "ru" ? "О студии" : "About",
  description:
    locale === "ru"
      ? "Инженерия уровня CTO в сочетании с продуктовой поставкой. Офисы в Бишкеке, Дубае, Стамбуле, Чикаго и Шэньчжэне. Работаем с клиентами по всему миру."
      : "CTO-grade engineering meets product delivery. Offices in Bishkek, Dubai, Istanbul, Chicago and Shenzhen. Serving clients globally.",
    alternates: localeAlternates(locale, "/about"),
  };
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <JsonLd data={homeBreadcrumb("About", "/about")} />
      <AboutContent />
    </PageWrapper>
  );
}
