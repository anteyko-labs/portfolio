// Studio offices — the single source for the footer, the about page, the hero
// and the structured data. Order is the display order.

type L = { en: string; ru: string };

export interface Office {
  city: L;
  country: L;
  countryCode: string;
  /** IANA zone, used to show the local time */
  tz: string;
  /** Static offset label (Chicago observes DST) */
  gmt: string;
  role: L;
}

export const OFFICES: Office[] = [
  { city: { en: "Bishkek", ru: "Бишкек" }, country: { en: "Kyrgyzstan", ru: "Кыргызстан" }, countryCode: "KG", gmt: "GMT+6", tz: "Asia/Bishkek", role: { en: "Office", ru: "Офис" } },
  { city: { en: "Dubai", ru: "Дубай" }, country: { en: "UAE", ru: "ОАЭ" }, countryCode: "AE", gmt: "GMT+4", tz: "Asia/Dubai", role: { en: "HQ", ru: "Штаб" } },
  { city: { en: "Istanbul", ru: "Стамбул" }, country: { en: "Türkiye", ru: "Турция" }, countryCode: "TR", gmt: "GMT+3", tz: "Europe/Istanbul", role: { en: "Office", ru: "Офис" } },
  { city: { en: "Chicago", ru: "Чикаго" }, country: { en: "USA", ru: "США" }, countryCode: "US", gmt: "GMT−6/−5", tz: "America/Chicago", role: { en: "Office", ru: "Офис" } },
  { city: { en: "Shenzhen", ru: "Шэньчжэнь" }, country: { en: "China", ru: "Китай" }, countryCode: "CN", gmt: "GMT+8", tz: "Asia/Shanghai", role: { en: "Office", ru: "Офис" } },
];

/** Local time in an office, e.g. "14:32" */
export function localTime(tz: string, date = new Date()) {
  return new Intl.DateTimeFormat("ru-RU", { timeZone: tz, hour: "2-digit", minute: "2-digit" }).format(date);
}
