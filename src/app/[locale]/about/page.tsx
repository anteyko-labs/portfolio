import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { AboutContent } from "./about-content";

export const metadata = {
  title: "About",
  description:
    "CTO-grade engineering meets product delivery. Based in Bishkek, Kyrgyzstan. Active in Dubai, UAE. Serving clients globally.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <JsonLd data={homeBreadcrumb("About", "/about")} />
      <AboutContent />
    </PageWrapper>
  );
}
