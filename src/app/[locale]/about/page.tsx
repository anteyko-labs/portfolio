import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { localeAlternates } from "@/i18n/metadata";
import { AboutContent } from "./about-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
  title: "About",
  description:
    "CTO-grade engineering meets product delivery. Based in Bishkek, Kyrgyzstan. Active in Dubai, UAE. Serving clients globally.",
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
