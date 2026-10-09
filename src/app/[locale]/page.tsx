import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_BASE } from "@/components/seo/breadcrumbs";
import { localeAlternates } from "@/i18n/metadata";
import { HomeHero } from "@/components/home/home-hero";
import { HomeServices } from "@/components/home/home-services";
import { HomeWork } from "@/components/home/home-work";
import { HomeL1 } from "@/components/home/home-l1";
import { HomeProcess } from "@/components/home/home-process";
import { HomeCta } from "@/components/home/home-cta";
import { TrustedBySection } from "@/components/sections/trusted-by";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { PackagesSection } from "@/components/sections/packages";
import { FAQPreviewSection } from "@/components/sections/faq-preview";
import { getL1Snapshot } from "@/lib/l1-stats";

// Re-read the L1 height every 10 minutes; the client extrapolates in between.
export const revalidate = 600;

// WebSite entity for the home page. No SearchAction is included because the site
// exposes no on-site search endpoint. publisher points at the Organization that
// the root layout already describes.
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Anteyko",
  alternateName: "Anteyko Labs",
  url: SITE_BASE,
  publisher: {
    "@type": "Organization",
    name: "Anteyko",
    url: SITE_BASE,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { alternates: localeAlternates(locale, "/") };
}

export default async function Home() {
  const l1 = await getL1Snapshot();
  return (
    <PageWrapper>
      <JsonLd data={websiteSchema} />
      <HomeHero l1={l1} />
      <TrustedBySection />
      <HomeServices />
      <HomeWork />
      <HomeL1 snapshot={l1} />
      <HomeProcess />
      <TestimonialsSection />
      <PackagesSection />
      <FAQPreviewSection />
      <HomeCta />
    </PageWrapper>
  );
}
