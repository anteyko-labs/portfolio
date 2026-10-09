import type { CaseCategory } from "@/lib/cases-data";
import type { CatalogFilter, CatalogSort } from "@/lib/catalog";

type L = { en: string; ru: string };

export const CATEGORY_LABEL: Record<CaseCategory, L> = {
  web: { en: "Website", ru: "Сайт" },
  product: { en: "Product", ru: "Продукт" },
  web3: { en: "Web3", ru: "Web3" },
  infrastructure: { en: "Infrastructure", ru: "Инфраструктура" },
};

export const FILTER_LABEL: Record<CatalogFilter, L> = {
  all: { en: "All work", ru: "Все работы" },
  motion: { en: "✦ Animation", ru: "✦ Анимации" },
  web: { en: "Websites", ru: "Сайты" },
  mobile: { en: "Mobile", ru: "Мобильные" },
  product: { en: "Products", ru: "Продукты" },
  web3: { en: "Web3", ru: "Web3" },
  infrastructure: { en: "Infrastructure", ru: "Инфраструктура" },
};

export const SORT_LABEL: Record<CatalogSort, L> = {
  featured: { en: "Featured", ru: "Избранное" },
  newest: { en: "Newest first", ru: "Сначала новые" },
  oldest: { en: "Oldest first", ru: "Сначала старые" },
  az: { en: "A → Z", ru: "А → Я" },
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
