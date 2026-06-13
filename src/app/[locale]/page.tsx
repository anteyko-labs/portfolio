import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_BASE } from "@/components/seo/breadcrumbs";
import { localeAlternates } from "@/i18n/metadata";
import { HeroSection } from "@/components/sections/hero";
import { MarqueeBanner } from "@/components/sections/marquee-banner";
import { WhatWeBuildSection } from "@/components/sections/what-we-build";
import { WhyUsSection } from "@/components/sections/why-us";
import { TrustedBySection } from "@/components/sections/trusted-by";
import { FeaturedCasesSection } from "@/components/sections/featured-cases";
import { FlagshipShowcase } from "@/components/sections/flagship-showcase";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { PackagesSection } from "@/components/sections/packages";
import { ProcessPreviewSection } from "@/components/sections/process-preview";
import { FAQPreviewSection } from "@/components/sections/faq-preview";
import { FinalCTASection } from "@/components/sections/final-cta";
import { SectionBeam } from "@/components/effects/section-beam";

// Thin relative wrapper that hosts a <SectionBeam> between two sections so the
// indigo "energy line" reads as a deliberate connector in the scroll. The beam
// itself centers + offsets inside this container; the height gives it room.
function BeamConnector() {
  return (
    <div className="relative h-20 md:h-24" aria-hidden="true">
      <SectionBeam height="full" />
    </div>
  );
}

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

export default function Home() {
  return (
    <PageWrapper>
      <JsonLd data={websiteSchema} />
      <HeroSection />
      <MarqueeBanner />
      {/* Beam connector — energy flows out of the marquee into the first content section. */}
      <BeamConnector />
      <WhatWeBuildSection />
      <WhyUsSection />
      <TrustedBySection />
      <FeaturedCasesSection />
      {/* Beam connector — leads the eye into the dark flagship moment. */}
      <BeamConnector />
      <FlagshipShowcase />
      <TestimonialsSection />
      <PackagesSection />
      <ProcessPreviewSection />
      <FAQPreviewSection />
      <FinalCTASection />
    </PageWrapper>
  );
}
