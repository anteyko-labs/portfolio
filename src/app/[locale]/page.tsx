import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_BASE } from "@/components/seo/breadcrumbs";
import { seo } from "@/i18n/metadata";
import { catalogEntries, sortEntries } from "@/lib/catalog";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/i18n/site-copy";
import { pick, type Language } from "@/lib/i18n-text";
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
  const lang = locale as Language;
  return seo(locale, "/", { title: pick(SITE_TITLE, lang), description: pick(SITE_DESCRIPTION, lang) });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale as Language;
  const covers = sortEntries(catalogEntries, "featured", lang)
    .filter((e) => e.cover)
    .slice(0, 5)
    .map((e) => ({ slug: e.slug, cover: e.cover!, title: pick(e.title, lang) }));

  return (
    <PageWrapper>
      <JsonLd data={websiteSchema} />
      <HomeHero />
      <TrustedBySection />
      <HomeServices />
      <HomeWork covers={covers} domains={catalogEntries.map((e) => e.domain)} />
      <HomeL1 />
      <HomeProcess />
      <TestimonialsSection />
      <PackagesSection />
      <FAQPreviewSection />
      <HomeCta />
    </PageWrapper>
  );
}
