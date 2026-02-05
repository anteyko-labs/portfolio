import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { 
  getFlagshipCaseBySlug, 
  getMicroCaseById,
  flagshipCases, 
  microCases 
} from "@/lib/cases-data";
import { CaseDetailContent } from "./case-detail-content";
import { MicroCaseDetailContent } from "./micro-case-detail-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  // Generate paths for both flagship and micro cases
  const flagshipPaths = flagshipCases.map((c) => ({ slug: c.slug }));
  const microPaths = microCases.map((c) => ({ slug: c.id }));
  return [...flagshipPaths, ...microPaths];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  
  // Try flagship first
  const flagshipCase = getFlagshipCaseBySlug(slug);
  if (flagshipCase) {
    return {
      title: flagshipCase.title.en,
      description: flagshipCase.summary.en,
    };
  }
  
  // Try micro case
  const microCase = getMicroCaseById(slug);
  if (microCase) {
    return {
      title: microCase.title.en,
      description: microCase.what.en,
    };
  }
  
  return { title: "Case" };
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  
  // Try flagship first
  const flagshipCase = getFlagshipCaseBySlug(slug);
  if (flagshipCase) {
    return (
      <PageWrapper>
        <CaseDetailContent caseItem={flagshipCase} />
      </PageWrapper>
    );
  }
  
  // Try micro case
  const microCase = getMicroCaseById(slug);
  if (microCase) {
    return (
      <PageWrapper>
        <MicroCaseDetailContent caseItem={microCase} />
      </PageWrapper>
    );
  }
  
  notFound();
}
