import { MetadataRoute } from "next";
import { flagshipCases, microCases } from "@/lib/cases-data";
import { visibleShowcaseItems } from "@/lib/showcase-data";
import { SERVICE_SLUGS } from "@/lib/service-slugs";
import { blogPosts } from "@/lib/blog-data";
import { LANGUAGES } from "@/lib/i18n-text";

const BASE = "https://www.anteyko.com";

type Options = {
  locales?: readonly string[];
  /** Real content date only: a build-time "now" on every page teaches Google to ignore lastmod */
  lastModified?: string;
  images?: (string | undefined)[];
};

const localeUrl = (l: string, path: string) => (l === "en" ? `${BASE}${path}` : `${BASE}/${l}${path}`);
const abs = (src: string) => (src.startsWith("http") ? src : `${BASE}${src}`);

// One <url> per locale (en unprefixed, the rest under /ru, /zh, /tr, /ar — matches
// localePrefix "as-needed"), each with the full hreflang set plus x-default, so
// every language version is listed on its own and linked to its siblings.
function entries(
  path: string,
  changeFrequency: "weekly" | "monthly" | "yearly",
  priority: number,
  opts: Options = {}
): MetadataRoute.Sitemap {
  const locales = opts.locales ?? LANGUAGES;
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [l, localeUrl(l, path)]));
  languages["x-default"] = localeUrl("en", path);
  const images = [...new Set(opts.images?.filter((s): s is string => Boolean(s)).map(abs))].slice(0, 10);
  return locales.map((l) => ({
    url: localeUrl(l, path),
    ...(opts.lastModified ? { lastModified: opts.lastModified } : {}),
    changeFrequency,
    priority,
    alternates: { languages },
    ...(images.length ? { images } : {}),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = blogPosts.map((p) => p.date).sort().at(-1);

  const staticPages = [
    entries("", "weekly", 1),
    entries("/services", "monthly", 0.9),
    entries("/pricing", "monthly", 0.8),
    entries("/blog", "weekly", 0.7, { lastModified: latestPost }),
    entries("/cases", "weekly", 0.9),
    entries("/process", "monthly", 0.8),
    entries("/faq", "monthly", 0.8),
    entries("/about", "monthly", 0.8),
    entries("/contact", "monthly", 0.9),
    entries("/incubator", "monthly", 0.6, { locales: ["en", "ru"] }),
    entries("/privacy", "yearly", 0.3, { locales: ["en", "ru"] }),
    entries("/terms", "yearly", 0.3, { locales: ["en", "ru"] }),
  ];

  const servicePages = SERVICE_SLUGS.map((slug) => entries(`/services/${slug}`, "monthly", 0.7));

  const casePages = [
    ...flagshipCases.map((c) =>
      entries(`/cases/${c.slug}`, "monthly", 0.7, {
        images: [c.heroImage, c.imageUrl, ...(c.screenshots ?? []).map((s) => s.src)],
      })
    ),
    ...visibleShowcaseItems.map((s) =>
      entries(`/cases/${s.slug}`, "monthly", 0.6, {
        images: [
          s.cover,
          s.fullPage,
          ...(s.gallery ?? []).map((g) => g.src),
          s.mobile,
          ...(s.phones ?? []),
          ...(s.admin ?? []).map((a) => a.src),
        ],
      })
    ),
    ...microCases.map((m) => entries(`/cases/${m.id}`, "yearly", 0.4)),
  ];

  const blogPages = blogPosts.map((p) => entries(`/blog/${p.slug}`, "monthly", 0.6, { lastModified: p.date }));

  return [...staticPages, ...servicePages, ...casePages, ...blogPages].flat();
}
