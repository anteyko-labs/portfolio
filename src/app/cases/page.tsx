import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { CasesContent } from "./cases-content";

export const metadata = {
  title: "Cases",
  description:
    "Selected work: Web3, MVP, enterprise modules, geo/heatmap, payment flows. Real projects, real outcomes. Anteyko — Kyrgyzstan & Dubai.",
  alternates: { canonical: "/cases" },
};

export default function CasesPage() {
  return (
    <PageWrapper>
      <JsonLd data={homeBreadcrumb("Cases", "/cases")} />
      <CasesContent />
    </PageWrapper>
  );
}
