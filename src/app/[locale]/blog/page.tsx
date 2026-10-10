import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { seo } from "@/i18n/metadata";
import { pick, type Language } from "@/lib/i18n-text";
import { blogPosts } from "@/lib/blog-data";
import { BlogIndexContent } from "./blog-index-content";

const SITE = "https://www.anteyko.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Language;
  return seo(locale, "/blog", {
    title: pick({ en: "Blog / Insights", ru: "Блог / Заметки", zh: "博客 / 洞察", tr: "Blog / Notlar", ar: "المدونة / رؤى" }, lang),
    description: pick(
      {
        en: "Field notes from Anteyko on shipping MVPs fast, running Web2 and Web3 in one delivery loop, and milestone-based delivery with repo access from day one.",
        ru: "Заметки Anteyko о быстром запуске MVP, Web2 и Web3 в одном цикле поставки и оплате по этапам с доступом к репозиторию с первого дня.",
        zh: "Anteyko 的实战笔记：如何快速交付 MVP、在同一交付闭环中运行 Web2 与 Web3，以及从第一天起开放代码仓库的里程碑式交付。",
        tr: "Anteyko'dan saha notları: MVP'yi hızlı yayına almak, Web2 ve Web3'ü tek teslimat döngüsünde yürütmek ve ilk günden repo erişimiyle aşamalı teslimat.",
        ar: "ملاحظات ميدانية من Anteyko حول إطلاق MVP بسرعة، وتشغيل Web2 وWeb3 في دورة تسليم واحدة، والتسليم على مراحل مع الوصول إلى المستودع من اليوم الأول.",
      },
      lang
    ),
  });
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
