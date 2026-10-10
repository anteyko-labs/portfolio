import type { L } from "./i18n-text";

// Studio offices — the single source for the footer, the about page, the hero
// and the structured data. Order is the display order.

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
  { city: { en: "Bishkek", ru: "Бишкек", zh: "比什凯克", tr: "Bişkek", ar: "بيشكيك" }, country: { en: "Kyrgyzstan", ru: "Кыргызстан", zh: "吉尔吉斯斯坦", tr: "Kırgızistan", ar: "قرغيزستان" }, countryCode: "KG", gmt: "GMT+6", tz: "Asia/Bishkek", role: { en: "Office", ru: "Офис", zh: "办公室", tr: "Ofis", ar: "المكتب" } },
  { city: { en: "Dubai", ru: "Дубай", zh: "迪拜", tr: "Dubai", ar: "دبي" }, country: { en: "UAE", ru: "ОАЭ", zh: "阿联酋", tr: "BAE", ar: "الإمارات" }, countryCode: "AE", gmt: "GMT+4", tz: "Asia/Dubai", role: { en: "HQ", ru: "Штаб", zh: "总部", tr: "Merkez", ar: "المقر الرئيسي" } },
  { city: { en: "Istanbul", ru: "Стамбул", zh: "伊斯坦布尔", tr: "İstanbul", ar: "إسطنبول" }, country: { en: "Türkiye", ru: "Турция", zh: "土耳其", tr: "Türkiye", ar: "تركيا" }, countryCode: "TR", gmt: "GMT+3", tz: "Europe/Istanbul", role: { en: "Office", ru: "Офис", zh: "办公室", tr: "Ofis", ar: "المكتب" } },
  { city: { en: "Chicago", ru: "Чикаго", zh: "芝加哥", tr: "Chicago", ar: "شيكاغو" }, country: { en: "USA", ru: "США", zh: "美国", tr: "ABD", ar: "الولايات المتحدة" }, countryCode: "US", gmt: "GMT−6/−5", tz: "America/Chicago", role: { en: "Office", ru: "Офис", zh: "办公室", tr: "Ofis", ar: "المكتب" } },
  { city: { en: "Shenzhen", ru: "Шэньчжэнь", zh: "深圳", tr: "Shenzhen", ar: "شنتشن" }, country: { en: "China", ru: "Китай", zh: "中国", tr: "Çin", ar: "الصين" }, countryCode: "CN", gmt: "GMT+8", tz: "Asia/Shanghai", role: { en: "Office", ru: "Офис", zh: "办公室", tr: "Ofis", ar: "المكتب" } },
];

/** Local time in an office, e.g. "14:32" */
export function localTime(tz: string, date = new Date()) {
  return new Intl.DateTimeFormat("ru-RU", { timeZone: tz, hour: "2-digit", minute: "2-digit" }).format(date);
}
