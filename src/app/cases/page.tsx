import { PageWrapper } from "@/components/layout/page-wrapper";
import { CasesContent } from "./cases-content";

export const metadata = {
  title: "Cases",
  description:
    "Selected work: Web3, MVP, enterprise modules, geo/heatmap, payment flows. Real projects, real outcomes. Anteyko — Kyrgyzstan & Dubai.",
};

export default function CasesPage() {
  return (
    <PageWrapper>
      <CasesContent />
    </PageWrapper>
  );
}
