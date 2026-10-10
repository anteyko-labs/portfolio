import { MetadataRoute } from "next";
import { flagshipCases } from "@/lib/cases-data";
import { visibleShowcaseItems } from "@/lib/showcase-data";
import { SERVICE_SLUGS } from "@/lib/service-slugs";
import { blogPosts } from "@/lib/blog-data";
import { LANGUAGES } from "@/lib/i18n-text";

const BASE = "https://www.anteyko.com";

// One entry per path with hreflang alternates for every locale. en is unprefixed;
// the rest live under /ru, /zh, /tr, /ar (matches localePrefix "as-needed").
function entry(
  path: string,
  changeFrequency: "weekly" | "monthly" | "yearly",
  priority: number
): MetadataRoute.Sitemap[number] {
  const en = `${BASE}${path}`;
  const languages = Object.fromEntries(LANGUAGES.map((l) => [l, l === "en" ? en : `${BASE}/${l}${path}`]));
  return {
    url: en,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    entry("", "weekly", 1),
    entry("/services", "monthly", 0.9),
    entry("/pricing", "monthly", 0.8),
    entry("/blog", "weekly", 0.7),
    entry("/cases", "weekly", 0.9),
    entry("/process", "monthly", 0.8),
    entry("/faq", "monthly", 0.8),
    entry("/about", "monthly", 0.8),
    entry("/contact", "monthly", 0.9),
    entry("/privacy", "yearly", 0.3),
    entry("/terms", "yearly", 0.3),
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) =>
    entry(`/services/${slug}`, "monthly", 0.7)
  );

  const casePages: MetadataRoute.Sitemap = [
    ...flagshipCases.map((c) => entry(`/cases/${c.slug}`, "monthly", 0.7)),
    ...visibleShowcaseItems.map((s) => entry(`/cases/${s.slug}`, "monthly", 0.6)),
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) =>
    entry(`/blog/${p.slug}`, "monthly", 0.6)
  );

  return [...staticPages, ...servicePages, ...casePages, ...blogPages];
}
