import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata = {
  title: "Terms",
  description: "Terms of use for Anteyko website and services.",
};

export default function TermsPage() {
  return (
    <PageWrapper>
      <Section background="primary" padding="xl">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title="Terms of use"
            subtitle="Using this website and our services"
            align="center"
            animate={false}
          />
          <div className="max-w-none mt-12 space-y-6 text-body-md text-text-secondary leading-relaxed">
            <p>
              By using this website and submitting inquiries, you agree to receive a response from Anteyko.
              Estimates and proposals are non-binding until a separate agreement is signed.
            </p>
            <p>
              All content on this site is for informational purposes. We reserve the right to update these terms;
              continued use of the site constitutes acceptance of the current version.
            </p>
            <p>
              For specific agreements (NDA, SOW, contracts), terms are defined in the respective documents.
              Contact us at{" "}
              <a href="mailto:labs@anteyko.com" className="text-accent-primary hover:text-accent-secondary">
                labs@anteyko.com
              </a>{" "}
              for questions.
            </p>
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
}
