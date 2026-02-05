import { PageWrapper } from "@/components/layout/page-wrapper";
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

export default function Home() {
  return (
    <PageWrapper>
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
