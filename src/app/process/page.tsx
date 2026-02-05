import { PageWrapper } from "@/components/layout/page-wrapper";
import { ProcessContent } from "./process-content";

export const metadata = {
  title: "Process",
  description:
    "Discovery & Scope, Design & Architecture, Build & QA, Launch & Support. Four phases with clear deliverables. Based in Kyrgyzstan & Dubai.",
};

export default function ProcessPage() {
  return (
    <PageWrapper>
      <ProcessContent />
    </PageWrapper>
  );
}
