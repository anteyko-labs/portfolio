import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { localeAlternates } from "@/i18n/metadata";
import { ContactContent } from "./contact-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
  title: locale === "ru" ? "Контакты" : "Contact",
  description:
    locale === "ru"
      ? "Получите оценку за 24 часа или запишитесь на 45-минутный созвон. Расскажите нам о вашем проекте. Anteyko — Бишкек, Дубай, Стамбул, Чикаго, Шэньчжэнь."
      : "Get an estimate in 24 hours or book a 45-minute scoping call. Tell us about your project. Anteyko — Bishkek, Dubai, Istanbul, Chicago, Shenzhen.",
    alternates: localeAlternates(locale, "/contact"),
  };
}

export default function ContactPage() {
  return (
    <PageWrapper>
      <JsonLd data={homeBreadcrumb("Contact", "/contact")} />
      <ContactContent />
    </PageWrapper>
  );
}
