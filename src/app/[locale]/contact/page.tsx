import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { localeAlternates } from "@/i18n/metadata";
import { ContactContent } from "./contact-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
  title: "Contact",
  description:
    "Get an estimate in 24 hours or book a 20-minute scoping call. Tell us about your project. Anteyko — Kyrgyzstan & Dubai.",
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
