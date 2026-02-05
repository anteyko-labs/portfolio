import { PageWrapper } from "@/components/layout/page-wrapper";
import { AboutContent } from "./about-content";

export const metadata = {
  title: "About",
  description:
    "CTO-grade engineering meets product delivery. Based in Bishkek, Kyrgyzstan. Active in Dubai, UAE. Serving clients globally.",
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <AboutContent />
    </PageWrapper>
  );
}
