// Pure helpers for catalog entries. Kept apart from catalog.ts so client
// components can sort/search without bundling the case data itself.
import type { CatalogEntry, CatalogFilter, CatalogSort } from "./catalog";
import { INTL_LOCALE, LANGUAGES, type Language } from "./i18n-text";

export function matchesFilter(e: CatalogEntry, f: CatalogFilter): boolean {
  if (f === "all") return true;
  if (f === "motion") return Boolean(e.signature);
  if (f === "mobile") return Boolean(e.phones?.length || e.mobileFirst);
  return e.category === f;
}

export function sortEntries(list: CatalogEntry[], sort: CatalogSort, language: Language): CatalogEntry[] {
  const out = [...list];
  switch (sort) {
    case "featured":
      return out.sort((a, b) => a.rank - b.rank || b.year - a.year);
    case "newest":
      return out.sort((a, b) => b.year - a.year || a.rank - b.rank);
    case "oldest":
      return out.sort((a, b) => a.year - b.year || a.rank - b.rank);
    case "az":
      return out.sort((a, b) => a.title[language].localeCompare(b.title[language], INTL_LOCALE[language]));
  }
}

export function searchEntries(list: CatalogEntry[], query: string, language: Language): CatalogEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((e) =>
    [...LANGUAGES.map((l) => e.title[l] ?? ""), e.client[language], e.summary[language], e.domain, ...LANGUAGES.flatMap((l) => e.tags[l] ?? [])]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}

// Industry labels vary per project ("Финтех", "FinTech / Крипто", …) —
// fold them into broad groups so the counter stays honest.
const INDUSTRY_GROUPS: [string, RegExp][] = [
  ["food", /общепит|horeca|foodtech|суши|ресторан/i],
  ["fintech", /финтех|fintech|банк|инвест|токениз|крипто/i],
  ["web3", /web3|defi|блокчейн/i],
  ["travel", /туризм|путешеств/i],
  ["commerce", /e-commerce|розниц|магазин|продаж|малый бизнес/i],
  ["auto", /авто|прокат/i],
  ["transport", /перевозк|логистик/i],
  ["manufacturing", /производств|металлург|микроэлектрон|швейн/i],
  ["saas", /saas|business intelligence|аналитик/i],
];
export function industryGroup(label: string) {
  return INDUSTRY_GROUPS.find(([, re]) => re.test(label))?.[0] ?? label.toLowerCase();
}

/** Number of distinct industry groups (labels are matched in Russian). */
export function countIndustries(list: CatalogEntry[]): number {
  return new Set(list.map((e) => industryGroup(e.industry.ru))).size;
}
