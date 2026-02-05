import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata = {
  title: "Privacy",
  description: "Privacy policy of Anteyko. How we collect and use your data.",
};

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <Section background="primary" padding="xl">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title="Privacy"
            subtitle="How we handle your data"
            align="center"
            animate={false}
          />
          <div className="prose prose-invert prose-zinc max-w-none mt-12 space-y-6 text-body-md text-text-secondary">
            <p>
              We collect only the information you provide when contacting us (name, email, project details).
              We use it solely to respond to your request and do not share it with third parties for marketing.
            </p>
            <p>
              Data from the contact form is stored securely and can be deleted on request. We do not use cookies
              for tracking; language preference is stored locally in your browser.
            </p>
            <p>
              For questions about your data, contact us at{" "}
              <a href="mailto:hello@anteyko.com" className="text-accent-primary hover:text-accent-secondary">
                hello@anteyko.com
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
}
