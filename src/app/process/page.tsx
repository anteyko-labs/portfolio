import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { ProcessContent } from "./process-content";

export const metadata = {
  title: "Process",
  description:
    "Discovery & Scope, Design & Architecture, Build & QA, Launch & Support. Four phases with clear deliverables. Based in Kyrgyzstan & Dubai.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <PageWrapper>
      <JsonLd data={homeBreadcrumb("Process", "/process")} />
      <ProcessContent />
    </PageWrapper>
  );
}
