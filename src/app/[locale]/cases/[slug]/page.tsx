import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { seo } from "@/i18n/metadata";
import { pick, type Language } from "@/lib/i18n-text";
import {
  getFlagshipCaseBySlug,
  getMicroCaseById,
  getRelatedFlagshipCases,
  flagshipCases,
  microCases,
  type FlagshipCase,
  type MicroCase,
} from "@/lib/cases-data";
import { getShowcaseItem, visibleShowcaseItems, type ShowcaseItem } from "@/lib/showcase-data";
import { catalogEntries, sortEntries } from "@/lib/catalog";
import { localize } from "@/lib/localize";
import { CaseDetailContent } from "./case-detail-content";
import { MicroCaseDetailContent } from "./micro-case-detail-content";
import { ShowcaseDetailContent } from "./showcase-detail-content";

type Props = { params: Promise<{ locale: string; slug: string }> };

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
  const showcasePaths = visibleShowcaseItems.map((s) => ({ slug: s.slug }));
  return [...flagshipPaths, ...microPaths, ...showcasePaths];
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;

  const lang = locale as Language;

  // Try flagship first
  const flagshipCase = getFlagshipCaseBySlug(slug);
  if (flagshipCase) {
    const title = pick(flagshipCase.title, lang);
    const description = clampDescription(
      pick(flagshipCase.summary, lang)
    );
    return seo(locale, `/cases/${slug}`, { title, description, type: "article" });
  }

  // Try micro case
  const microCase = getMicroCaseById(slug);
  if (microCase) {
    const title = pick(microCase.title, lang);
    const description = clampDescription(
      pick(microCase.what, lang)
    );
    return seo(locale, `/cases/${slug}`, { title, description, type: "article" });
  }

  // Website / product showcase
  const showcase = getShowcaseItem(slug);
  if (showcase) {
    const title = `${showcase.title[lang]} — ${showcase.client[lang]}`;
    const description = clampDescription(showcase.summary[lang]);
    return seo(locale, `/cases/${slug}`, { title, description, type: "article" });
  }

  return { title: "Case" };
}

const ORG = {
  "@type": "Organization",
  // Same entity as the root layout's Organization, so Google merges them
  "@id": `${SITE}/#organization`,
  name: "Anteyko",
  url: SITE,
  logo: { "@type": "ImageObject", url: `${SITE}/icon-512.png` },
};

// Build Article + BreadcrumbList structured data for a case study.
function caseJsonLd(slug: string, c: FlagshipCase | MicroCase | ShowcaseItem) {
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
  if ("industry" in c) {
    article.datePublished = `${c.year}-01-01`;
    article.about = c.industry.en;
    if (c.techStack?.length) article.keywords = c.techStack.join(", ");
  } else if ("sphere" in c) {
    article.datePublished = `${c.year}-01-01`;
    article.about = c.sphere.en;
    article.keywords = [...c.tags.en, ...(c.stack ?? [])].join(", ");
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
  const { locale, slug } = await params;
  const lang = locale as Language;

  // Client components get this case (and its neighbours) in one language only
  const flagshipCase = getFlagshipCaseBySlug(slug);
  if (flagshipCase) {
    const i = flagshipCases.indexOf(flagshipCase);
    const related = flagshipCases
      .filter((c) => c.id !== flagshipCase.id && c.category === flagshipCase.category)
      .slice(0, 3);
    return (
      <PageWrapper>
        <JsonLd data={caseJsonLd(slug, flagshipCase)} />
        <CaseDetailContent
          caseItem={localize(flagshipCase, lang)}
          prevCase={i > 0 ? localize(flagshipCases[i - 1], lang) : null}
          nextCase={i < flagshipCases.length - 1 ? localize(flagshipCases[i + 1], lang) : null}
          related={localize(related, lang)}
        />
      </PageWrapper>
    );
  }

  const microCase = getMicroCaseById(slug);
  if (microCase) {
    const mi = microCases.indexOf(microCase);
    const relatedMicro = microCases
      .filter((c) => c.category === microCase.category && c.id !== microCase.id)
      .slice(0, 4);
    return (
      <PageWrapper>
        <JsonLd data={caseJsonLd(slug, microCase)} />
        <MicroCaseDetailContent
          caseItem={localize(microCase, lang)}
          relatedFlagship={localize(getRelatedFlagshipCases(microCase.category, 2), lang)}
          relatedMicro={localize(relatedMicro, lang)}
          next={localize(microCases[(mi + 1) % microCases.length], lang)}
          index={mi}
          total={microCases.length}
        />
      </PageWrapper>
    );
  }

  const showcase = getShowcaseItem(slug);
  if (showcase) {
    const ordered = sortEntries(catalogEntries, "featured", lang);
    const si = ordered.findIndex((e) => e.slug === slug);
    const next = ordered[(si + 1) % ordered.length];
    return (
      <PageWrapper>
        <JsonLd data={caseJsonLd(slug, showcase)} />
        <ShowcaseDetailContent item={localize(showcase, lang)} next={localize(next, lang)} index={si} total={ordered.length} />
      </PageWrapper>
    );
  }

  notFound();
}
