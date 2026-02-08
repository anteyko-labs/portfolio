import { PageWrapper } from "@/components/layout/page-wrapper";
import { ContactContent } from "./contact-content";

export const metadata = {
  title: "Contact",
  description:
    "Get an estimate in 24 hours or book a 20-minute scoping call. Tell us about your project. Anteyko — Kyrgyzstan & Dubai.",
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <ContactContent />
    </PageWrapper>
  );
}
