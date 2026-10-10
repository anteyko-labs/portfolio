// Languages of the site and helpers for localized text.
// Every localized string is an object with a key per language: { en, ru, zh, tr, ar }.

export const LANGUAGES = ["en", "ru", "zh", "tr", "ar"] as const;
export type Language = (typeof LANGUAGES)[number];

/** A string translated into every site language. */
export type L = Record<Language, string>;

/** Right-to-left languages. */
export const RTL_LANGUAGES: readonly Language[] = ["ar"];
export const isRtl = (lang: Language) => RTL_LANGUAGES.includes(lang);

/** Labels for the language switcher, in each language's own script. */
export const LANGUAGE_LABELS: Record<Language, { short: string; name: string }> = {
  en: { short: "EN", name: "English" },
  ru: { short: "RU", name: "Русский" },
  zh: { short: "中文", name: "中文" },
  tr: { short: "TR", name: "Türkçe" },
  ar: { short: "AR", name: "العربية" },
};

/** BCP 47 locale for Intl (dates, numbers). */
export const INTL_LOCALE: Record<Language, string> = {
  en: "en-US",
  ru: "ru-RU",
  zh: "zh-CN",
  tr: "tr-TR",
  ar: "ar-AE",
};

/**
 * Picks the text for `lang`, falling back to English when a translation is
 * missing (e.g. client-specific proposals that only exist in en/ru).
 */
export function pick<T>(value: { en: T } & Partial<Record<Language, T>>, lang: Language): T {
  return value[lang] ?? value.en;
}
