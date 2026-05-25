import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { localeAlternates } from "@/i18n/metadata";
import { ProcessContent } from "./process-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
  title: "Process",
  description:
    "Discovery & Scope, Design & Architecture, Build & QA, Launch & Support. Four phases with clear deliverables. Based in Kyrgyzstan & Dubai.",
    alternates: localeAlternates(locale, "/process"),
  };
}

export default function ProcessPage() {
  return (
    <PageWrapper>
      <JsonLd data={homeBreadcrumb("Process", "/process")} />
      <ProcessContent />
    </PageWrapper>
  );
}
