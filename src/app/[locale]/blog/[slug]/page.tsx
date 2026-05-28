import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { localeAlternates } from "@/i18n/metadata";
import { blogPosts, getPostBySlug, type BlogPost } from "@/lib/blog-data";
import { BlogArticleContent } from "./blog-article-content";

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
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article" };

  const description = clampDescription(post.excerpt.en);
  return {
    title: post.title.en,
    description,
    alternates: localeAlternates(locale, `/blog/${slug}`),
    openGraph: {
      type: "article",
      title: post.title.en,
      description,
      url: `${SITE}/blog/${slug}`,
      publishedTime: post.date,
    },
  };
}

const ORG = {
  "@type": "Organization",
  name: "Anteyko",
  url: SITE,
  logo: { "@type": "ImageObject", url: `${SITE}/icon-512.png` },
};

// Build Article + BreadcrumbList structured data for a blog post. Mirrors the
// Article pattern used by case studies (headline, description, datePublished,
// author/publisher Organization "Anteyko").
function articleJsonLd(slug: string, post: BlogPost) {
  const url = `${SITE}/blog/${slug}`;
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title.en,
    description: clampDescription(post.excerpt.en),
    image: `${SITE}/icon-512.png`,
    mainEntityOfPage: url,
    datePublished: post.date,
    author: ORG,
    publisher: ORG,
    keywords: post.tags.join(", "),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title.en, item: url },
    ],
  };
  return [article, breadcrumb];
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <PageWrapper>
      <JsonLd data={articleJsonLd(slug, post)} />
      <BlogArticleContent post={post} />
    </PageWrapper>
  );
}
