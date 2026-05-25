import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

// Translations are served by our own src/lib/translations.ts plus the {en,ru}
// data objects (e.g. cases-data.ts). next-intl only drives routing + the active
// locale, so the message catalog is intentionally empty.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return { locale, messages: {} };
});
