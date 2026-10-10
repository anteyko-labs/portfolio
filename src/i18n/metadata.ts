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
