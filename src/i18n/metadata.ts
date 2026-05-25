// Locale-aware canonical + hreflang alternates. With localePrefix "as-needed",
// en is served unprefixed (/about) and ru under /ru (/ru/about). The canonical
// points at the current locale's URL; hreflang advertises both + x-default (en).
const SITE = "https://www.anteyko.com";

export function localeAlternates(locale: string, path: string) {
  const clean = path === "/" ? "" : path;
  const enUrl = `${SITE}${clean || "/"}`;
  const ruUrl = `${SITE}/ru${clean}`;
  return {
    canonical: locale === "ru" ? ruUrl : enUrl,
    languages: {
      en: enUrl,
      ru: ruUrl,
      "x-default": enUrl,
    },
  };
}
