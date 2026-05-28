import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { localeAlternates } from "@/i18n/metadata";
import { blogPosts } from "@/lib/blog-data";
import { BlogIndexContent } from "./blog-index-content";

const SITE = "https://www.anteyko.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const description =
    "Field notes from Anteyko on shipping MVPs fast, running Web2 and Web3 in one delivery loop, and milestone-based delivery with repo access from day one.";
  return {
    title: "Blog / Insights",
    description,
    alternates: localeAlternates(locale, "/blog"),
    openGraph: {
      type: "website",
      title: "Blog / Insights",
      description,
      url: `${SITE}/blog`,
    },
  };
}

const ORG = {
  "@type": "Organization",
  name: "Anteyko",
  url: SITE,
  logo: { "@type": "ImageObject", url: `${SITE}/icon-512.png` },
};

// Blog listing as a structured CollectionPage + ItemList so crawlers can read the
// posts. Built entirely from our own static blog-data at build time.
function blogIndexJsonLd() {
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog / Insights",
    url: `${SITE}/blog`,
    publisher: ORG,
  };
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: blogPosts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: post.title.en,
      url: `${SITE}/blog/${post.slug}`,
    })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
    ],
  };
  return [collection, itemList, breadcrumb];
}

export default function BlogPage() {
  return (
    <PageWrapper>
      <JsonLd data={blogIndexJsonLd()} />
      <BlogIndexContent />
    </PageWrapper>
  );
}
