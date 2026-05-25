import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_BASE } from "@/components/seo/breadcrumbs";
import { HeroSection } from "@/components/sections/hero";
import { MarqueeBanner } from "@/components/sections/marquee-banner";
import { WhatWeBuildSection } from "@/components/sections/what-we-build";
import { WhyUsSection } from "@/components/sections/why-us";
import { TrustedBySection } from "@/components/sections/trusted-by";
import { FeaturedCasesSection } from "@/components/sections/featured-cases";
import { PackagesSection } from "@/components/sections/packages";
import { ProcessPreviewSection } from "@/components/sections/process-preview";
import { FAQPreviewSection } from "@/components/sections/faq-preview";
import { FinalCTASection } from "@/components/sections/final-cta";

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

export default function Home() {
  return (
    <PageWrapper>
      <JsonLd data={websiteSchema} />
      <HeroSection />
      <MarqueeBanner />
      <WhatWeBuildSection />
      <WhyUsSection />
      <TrustedBySection />
      <FeaturedCasesSection />
      <PackagesSection />
      <ProcessPreviewSection />
      <FAQPreviewSection />
      <FinalCTASection />
    </PageWrapper>
  );
}
