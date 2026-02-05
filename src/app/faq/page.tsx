import { PageWrapper } from "@/components/layout/page-wrapper";
import { FAQContent } from "./faq-content";
import { FAQSchema } from "@/components/seo/faq-schema";

export const metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about pricing, timelines, ownership, NDA, support, Web3, and how we work. Anteyko — Kyrgyzstan & Dubai.",
};

export default function FAQPage() {
  return (
    <PageWrapper>
      <FAQSchema />
      <FAQContent />
    </PageWrapper>
  );
}
