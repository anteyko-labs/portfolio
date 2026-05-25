import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getFlagshipCaseBySlug,
  getMicroCaseById,
  flagshipCases,
  microCases,
  type FlagshipCase,
  type MicroCase,
} from "@/lib/cases-data";
import { CaseDetailContent } from "./case-detail-content";
import { MicroCaseDetailContent } from "./micro-case-detail-content";

type Props = { params: Promise<{ slug: string }> };

const SITE = "https://www.anteyko.com";

// Clamp a description to a search-friendly length (~120–160 chars), cutting at a
// word boundary so Google doesn't truncate the meta description mid-word.
function clampDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > 80 ? slice.slice(0, lastSpace) : slice).trimEnd() + "…";
}

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
    const description = clampDescription(flagshipCase.summary.en);
    return {
      title: flagshipCase.title.en,
      description,
      alternates: { canonical: `/cases/${slug}` },
      openGraph: {
        type: "article",
        title: flagshipCase.title.en,
        description,
        url: `${SITE}/cases/${slug}`,
      },
    };
  }

  // Try micro case
  const microCase = getMicroCaseById(slug);
  if (microCase) {
    const description = clampDescription(microCase.what.en);
    return {
      title: microCase.title.en,
      description,
      alternates: { canonical: `/cases/${slug}` },
      openGraph: {
        type: "article",
        title: microCase.title.en,
        description,
        url: `${SITE}/cases/${slug}`,
      },
    };
  }

  return { title: "Case" };
}

const ORG = {
  "@type": "Organization",
  name: "Anteyko",
  url: SITE,
  logo: { "@type": "ImageObject", url: `${SITE}/icon.svg` },
};

// Build Article + BreadcrumbList structured data for a case study.
function caseJsonLd(slug: string, c: FlagshipCase | MicroCase) {
  const url = `${SITE}/cases/${slug}`;
  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title.en,
    description: clampDescription("summary" in c ? c.summary.en : c.what.en),
    image: `${url}/opengraph-image`,
    mainEntityOfPage: url,
    author: ORG,
    publisher: ORG,
  };
  if ("year" in c) {
    article.datePublished = `${c.year}-01-01`;
    article.about = c.industry.en;
    if (c.techStack?.length) article.keywords = c.techStack.join(", ");
  }
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Cases", item: `${SITE}/cases` },
      { "@type": "ListItem", position: 3, name: c.title.en, item: url },
    ],
  };
  return [article, breadcrumb];
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;

  // Try flagship first
  const flagshipCase = getFlagshipCaseBySlug(slug);
  if (flagshipCase) {
    return (
      <PageWrapper>
        <JsonLd data={caseJsonLd(slug, flagshipCase)} />
        <CaseDetailContent caseItem={flagshipCase} />
      </PageWrapper>
    );
  }

  // Try micro case
  const microCase = getMicroCaseById(slug);
  if (microCase) {
    return (
      <PageWrapper>
        <JsonLd data={caseJsonLd(slug, microCase)} />
        <MicroCaseDetailContent caseItem={microCase} />
      </PageWrapper>
    );
  }

  notFound();
}
