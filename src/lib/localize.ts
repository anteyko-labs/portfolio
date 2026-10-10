import { LANGUAGES, type Language } from "./i18n-text";

const isLocalized = (o: Record<string, unknown>) => LANGUAGES.every((l) => l in o);

/**
 * Strips every { en, ru, zh, tr, ar } object in `data` down to English and
 * `lang`. Server pages run case data through this before handing it to client
 * components, so the browser receives one language (plus the English
 * fallback) instead of all five.
 */
export function localize<T>(data: T, lang: Language): T {
  if (Array.isArray(data)) return data.map((d) => localize(d, lang)) as T;
  if (data && typeof data === "object" && Object.getPrototypeOf(data) === Object.prototype) {
    const o = data as Record<string, unknown>;
    if (isLocalized(o)) return { en: o.en, [lang]: o[lang] } as T;
    return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, localize(v, lang)])) as T;
  }
  return data;
}
