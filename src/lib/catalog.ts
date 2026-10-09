import { flagshipCases, type CaseCategory } from "./cases-data";
import { visibleShowcaseItems, type ShowcaseStatus } from "./showcase-data";

// One list for the /cases catalog: engineering case studies (cases-data.ts)
// and the website/product showcase (showcase-data.ts) as uniform entries.

type L = { en: string; ru: string };

export type CatalogStatus = ShowcaseStatus | "case";
export type CatalogFilter = "all" | CaseCategory | "motion" | "mobile";
export type CatalogSort = "featured" | "newest" | "oldest" | "az";

export interface CatalogEntry {
  slug: string;
  title: L;
  client: L;
  category: CaseCategory;
  status: CatalogStatus;
  year: number;
  domain: string;
  url?: string;
  demo?: string;
  cover?: string;
  fullPage?: string;
  /** Desktop screens for the hover slideshow, cover first */
  frames: string[];
  /** Phone-format screenshots are framed as a device instead of a browser */
  mobileFirst?: boolean;
  /** Phone screens for mobile-first products, shown as a fanned stack */
  phones?: string[];
  stage?: string;
  decor?: string[];
  /** Signature animation label — highlighted card */
  signature?: L;
  summary: L;
  industry: L;
  tags: { en: string[]; ru: string[] };
  palette: [string, string, string, string];
  /** Lower comes first in the curated ("featured") order */
  rank: number;
}

// Case studies kept on their own pages but left out of the catalog
const EXCLUDED_CASES = ["web3-l1-dex", "utility-token-uae"];

// Curated order of the first rows — strongest visuals and the most
// representative projects first. Everything not listed follows by year.
const FEATURED: string[] = [
  "gran",
  "paddock",
  "web3-l1-dex",
  "kyrgyz-soul-travel",
  "asaki-sushi",
  "lumo",
  "dream-hotel",
  "detailing-booking",
  "shoestreet",
  "kvant",
  "trm-oferta-registration",
  "go-market",
  "erp-garment",
  "alatoo",
  "avtodom",
  "multi-location-restaurant-management",
  "djal",
  "aera",
  "asset-tokenization-platform",
  "anteyko-pwa",
  "meridian",
  "kut-wallet-crypto",
  "jocash-tender",
  "texi-driver",
  "ferro",
  "forma",
];

// Case-study screens that make weak card frames (placeholder copy, empty login forms, blank splash)
const SKIP_FRAMES = /tripwise\/best-destinations|sushi-system\/(login|welcome)|kut-wallet\/splash/;

const CATEGORY_PALETTE: Record<CaseCategory, [string, string, string, string]> = {
  web: ["#EEF2FF", "#0A0A0A", "#4F46E5", "#A5B4FC"],
  product: ["#ECFDF5", "#0A0A0A", "#059669", "#6EE7B7"],
  web3: ["#0B0B14", "#F5F3FF", "#8B5CF6", "#22D3EE"],
  infrastructure: ["#FFF7ED", "#0A0A0A", "#EA580C", "#FDBA74"],
};

const rankOf = (slug: string) => {
  const i = FEATURED.indexOf(slug);
  return i === -1 ? 1000 : i;
};

const fromShowcase: CatalogEntry[] = visibleShowcaseItems.map((s) => ({
  slug: s.slug,
  title: s.title,
  client: s.client,
  category: s.category,
  status: s.status,
  year: s.year,
  domain: s.domain,
  url: s.url,
  demo: s.demo,
  cover: s.cover,
  fullPage: s.fullPage,
  frames: [s.cover, ...(s.gallery ?? []).map((g) => g.src), ...(s.admin ?? []).map((a) => a.src)].filter(Boolean) as string[],
  phones: s.phones,
  stage: s.stage,
  decor: s.decor,
  signature: s.signature,
  summary: s.summary,
  industry: s.sphere,
  tags: s.stack?.length ? { en: s.stack.slice(0, 3), ru: s.stack.slice(0, 3) } : s.tags,
  palette: s.palette,
  rank: rankOf(s.slug),
}));

// Case-study titles are long ("KutWallet: Multi‑Asset Crypto Wallet … (iOS, end‑to‑end)").
// On a card the part before the colon is the name, the rest is the one-liner.
const dropParens = (s: string) => s.replace(/\s*\([^)]*\)\s*$/, "").trim();
function splitTitle(t: string): [string, string | null] {
  const i = t.indexOf(":");
  return i === -1 ? [dropParens(t), null] : [t.slice(0, i).trim(), dropParens(t.slice(i + 1))];
}
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const fromCases: CatalogEntry[] = flagshipCases.filter((c) => !EXCLUDED_CASES.includes(c.slug)).map((c) => {
  const [enName, enRest] = splitTitle(c.title.en);
  const [ruName, ruRest] = splitTitle(c.title.ru);
  const shots = (c.screenshots ?? []).map((s) => s.src).filter((src) => !SKIP_FRAMES.test(src));
  const cover = c.imageUrl ?? shots[0];
  return {
    slug: c.slug,
    title: { en: enName, ru: ruName },
    client: {
      en: enRest ? capitalize(enRest) : c.industry.en,
      ru: ruRest ? capitalize(ruRest) : c.industry.ru,
    },
    category: c.category,
    status: "case" as const,
    year: c.year,
    domain: enName.toLowerCase(),
    cover,
    frames: Array.from(new Set([cover, ...shots].filter(Boolean) as string[])).slice(0, 4),
    mobileFirst: c.screenshotLayout === "mobile",
    phones: c.screenshotLayout === "mobile" ? shots.slice(0, 3) : undefined,
    summary: c.summary,
    industry: c.industry,
    tags: { en: c.techStack.slice(0, 3), ru: c.techStack.slice(0, 3) },
    palette: CATEGORY_PALETTE[c.category],
    rank: rankOf(c.slug),
  };
});

export const catalogEntries: CatalogEntry[] = [...fromShowcase, ...fromCases];

export function matchesFilter(e: CatalogEntry, f: CatalogFilter): boolean {
  if (f === "all") return true;
  if (f === "motion") return Boolean(e.signature);
  if (f === "mobile") return Boolean(e.phones?.length || e.mobileFirst);
  return e.category === f;
}

export function sortEntries(list: CatalogEntry[], sort: CatalogSort, language: "en" | "ru"): CatalogEntry[] {
  const out = [...list];
  switch (sort) {
    case "featured":
      return out.sort((a, b) => a.rank - b.rank || b.year - a.year);
    case "newest":
      return out.sort((a, b) => b.year - a.year || a.rank - b.rank);
    case "oldest":
      return out.sort((a, b) => a.year - b.year || a.rank - b.rank);
    case "az":
      return out.sort((a, b) => a.title[language].localeCompare(b.title[language], language));
  }
}

export function searchEntries(list: CatalogEntry[], query: string, language: "en" | "ru"): CatalogEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((e) =>
    [e.title.en, e.title.ru, e.client[language], e.summary[language], e.domain, ...e.tags.en, ...e.tags.ru]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}
