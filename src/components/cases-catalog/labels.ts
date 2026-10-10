import type { CaseCategory } from "@/lib/cases-data";
import type { CatalogFilter, CatalogSort } from "@/lib/catalog";
import type { L } from "@/lib/i18n-text";

export const CATEGORY_LABEL: Record<CaseCategory, L> = {
  web: { en: "Website", ru: "Сайт", zh: "网站", tr: "Web sitesi", ar: "موقع" },
  product: { en: "Product", ru: "Продукт", zh: "产品", tr: "Ürün", ar: "منتج" },
  web3: { en: "Web3", ru: "Web3", zh: "Web3", tr: "Web3", ar: "Web3" },
  infrastructure: { en: "Infrastructure", ru: "Инфраструктура", zh: "基础设施", tr: "Altyapı", ar: "بنية تحتية" },
};

export const FILTER_LABEL: Record<CatalogFilter, L> = {
  all: { en: "All work", ru: "Все работы", zh: "全部作品", tr: "Tüm işler", ar: "جميع الأعمال" },
  motion: { en: "✦ Animation", ru: "✦ Анимации", zh: "✦ 动画", tr: "✦ Animasyon", ar: "✦ حركة" },
  web: { en: "Websites", ru: "Сайты", zh: "网站", tr: "Web siteleri", ar: "مواقع" },
  mobile: { en: "Mobile", ru: "Мобильные", zh: "移动端", tr: "Mobil", ar: "تطبيقات الجوال" },
  product: { en: "Products", ru: "Продукты", zh: "产品", tr: "Ürünler", ar: "منتجات" },
  web3: { en: "Web3", ru: "Web3", zh: "Web3", tr: "Web3", ar: "Web3" },
  infrastructure: { en: "Infrastructure", ru: "Инфраструктура", zh: "基础设施", tr: "Altyapı", ar: "بنية تحتية" },
};

export const SORT_LABEL: Record<CatalogSort, L> = {
  featured: { en: "Featured", ru: "Избранное", zh: "精选", tr: "Öne çıkan", ar: "المميّز" },
  newest: { en: "Newest first", ru: "Сначала новые", zh: "最新优先", tr: "Önce en yeni", ar: "الأحدث أولًا" },
  oldest: { en: "Oldest first", ru: "Сначала старые", zh: "最早优先", tr: "Önce en eski", ar: "الأقدم أولًا" },
  az: { en: "A → Z", ru: "А → Я", zh: "A → Z", tr: "A → Z", ar: "أ ← ي" },
};

export const pad = (n: number) => String(n).padStart(2, "0");

/** Russian plural form: plural(5, ["проект", "проекта", "проектов"]) → "проектов" */
export function plural(n: number, [one, few, many]: [string, string, string]) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}
