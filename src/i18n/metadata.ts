import { LANGUAGES } from "@/lib/i18n-text";

// Locale-aware canonical + hreflang alternates. With localePrefix "as-needed",
// en is served unprefixed (/about) and every other locale under its prefix
// (/ru/about, /zh/about, /tr/about, /ar/about). The canonical points at the
// current locale's URL; hreflang advertises all of them + x-default (en).
const SITE = "https://www.anteyko.com";

export function localeAlternates(locale: string, path: string) {
  const clean = path === "/" ? "" : path;
  const url = (l: string) => (l === "en" ? `${SITE}${clean || "/"}` : `${SITE}/${l}${clean}`);
  const languages: Record<string, string> = {};
  for (const l of LANGUAGES) languages[l] = url(l);
  languages["x-default"] = url("en");
  return {
    canonical: url(locale),
    languages,
  };
}

const OG_LOCALE: Record<string, string> = { en: "en_US", ru: "ru_RU", zh: "zh_CN", tr: "tr_TR", ar: "ar_AE" };
const OG_IMAGE = { url: `${SITE}/og-image.png`, width: 1024, height: 682, alt: "Anteyko — Product Development Studio", type: "image/png" };

type PageMeta = {
  title: string;
  description: string;
  /** "article" for case studies and blog posts */
  type?: "website" | "article";
  publishedTime?: string;
  /**
   * Locales that have their own content. Others (e.g. zh/tr/ar on legal pages
   * that exist only in en/ru) point their canonical at the English page so
   * search engines don't index duplicates.
   */
  locales?: string[];
};

/**
 * Full per-page metadata: title/description, canonical + hreflang, and a
 * complete Open Graph / Twitter block. A page's `openGraph` replaces the
 * layout's one entirely (Next merges metadata shallowly), so url, image,
 * site name and locale are always set here — otherwise pages lose og:image
 * and inherit the wrong og:url. Pages with an opengraph-image file still get
 * that image: file-based metadata wins over this default.
 */
export function seo(locale: string, path: string, meta: PageMeta) {
  const all = localeAlternates(locale, path);
  const own = meta.locales ?? null;
  const alternates = own
    ? {
        canonical: own.includes(locale) ? all.canonical : all.languages.en,
        languages: Object.fromEntries(Object.entries(all.languages).filter(([l]) => l === "x-default" || own.includes(l))),
      }
    : all;
  const ogTitle = /anteyko/i.test(meta.title) ? meta.title : `${meta.title} | Anteyko`;
  return {
    // A title that already names the brand skips the "%s | Anteyko" template
    title: /anteyko/i.test(meta.title) ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates,
    openGraph: {
      type: meta.type ?? "website",
      siteName: "Anteyko",
      url: alternates.canonical,
      title: ogTitle,
      description: meta.description,
      locale: OG_LOCALE[locale] ?? OG_LOCALE.en,
      alternateLocale: Object.entries(OG_LOCALE).filter(([l]) => l !== locale).map(([, v]) => v),
      images: [OG_IMAGE],
      ...(meta.publishedTime ? { publishedTime: meta.publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image" as const,
      title: ogTitle,
      description: meta.description,
      images: [OG_IMAGE.url],
    },
  };
}
