import { defineRouting } from "next-intl/routing";

// en is the default locale and stays unprefixed (existing URLs like /about are
// preserved); ru is served under /ru. This keeps already-indexed en URLs intact
// while adding a crawlable Russian surface with hreflang.
export const routing = defineRouting({
  locales: ["en", "ru"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
