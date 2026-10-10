import { defineRouting } from "next-intl/routing";

// en is the default locale and stays unprefixed (existing URLs like /about are
// preserved); ru is served under /ru. This keeps already-indexed en URLs intact
// while adding a crawlable Russian surface with hreflang. zh/tr/ar follow the
// same pattern (/zh, /tr, /ar).
export const routing = defineRouting({
  locales: ["en", "ru", "zh", "tr", "ar"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
