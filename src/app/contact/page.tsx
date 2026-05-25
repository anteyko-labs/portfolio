import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { ContactContent } from "./contact-content";

export const metadata = {
  title: "Contact",
  description:
    "Get an estimate in 24 hours or book a 20-minute scoping call. Tell us about your project. Anteyko — Kyrgyzstan & Dubai.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <JsonLd data={homeBreadcrumb("Contact", "/contact")} />
      <ContactContent />
    </PageWrapper>
  );
}
