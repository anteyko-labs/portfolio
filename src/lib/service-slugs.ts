import { translations } from "@/lib/translations";

// URL slugs for the per-service landing pages (/services/<slug>). These map the
// human-readable URL to the package `id` used in src/lib/translations.ts. The
// ids and slugs match 1:1 except "startup-key" (id) -> "startup-under-key" (slug),
// which reads better in a URL and matches the package's English title.
export const PACKAGE_SLUGS = {
  "launch-site": "launch-site",
  "mvp-sprint": "mvp-sprint",
  "startup-key": "startup-under-key",
  "web3-addon": "web3-addon",
  "mobile-app": "mobile-apps",
  "time-access": "time-tracking-access-control",
  parking: "parking-system",
  cctv: "video-surveillance",
  fintech: "fintech",
  "carbon-credits": "carbon-credits",
  "it-support": "it-support",
  branding: "branding",
} as const satisfies Record<string, string>;

export type PackageId = keyof typeof PACKAGE_SLUGS;

// Reverse lookup: URL slug -> package id.
const SLUG_TO_ID: Record<string, PackageId> = Object.fromEntries(
  Object.entries(PACKAGE_SLUGS).map(([id, slug]) => [slug, id as PackageId])
) as Record<string, PackageId>;

export type ServicePackage = (typeof translations.packages.items)[number];

export type ServiceGroup = ServicePackage["group"];

/** Services grouped for /services and /pricing, in display order */
export const SERVICE_GROUPS: { id: ServiceGroup; label: Record<"en" | "ru" | "zh" | "tr" | "ar", string> }[] = [
  { id: "build", label: { en: "Product development", ru: "Разработка продуктов", zh: "产品开发", tr: "Ürün geliştirme", ar: "تطوير المنتجات" } },
  { id: "brand", label: { en: "Brand & design", ru: "Бренд и дизайн", zh: "品牌与设计", tr: "Marka ve tasarım", ar: "العلامة والتصميم" } },
  { id: "industry", label: { en: "Industry solutions", ru: "Отраслевые решения", zh: "行业解决方案", tr: "Sektörel çözümler", ar: "حلول قطاعية" } },
  { id: "care", label: { en: "Modules & support", ru: "Модули и сопровождение", zh: "模块与运维", tr: "Modüller ve destek", ar: "الوحدات والدعم" } },
];

export const packagesIn = (group: ServiceGroup) => translations.packages.items.filter((p) => p.group === group);

// All slugs, in catalog order — used for generateStaticParams.
export const SERVICE_SLUGS: string[] = translations.packages.items.map(
  (pkg) => PACKAGE_SLUGS[pkg.id as PackageId]
);

// Look up the package for a given URL slug. Returns undefined for unknown slugs
// so the route can call notFound().
export function getPackageBySlug(slug: string): ServicePackage | undefined {
  const id = SLUG_TO_ID[slug];
  if (!id) return undefined;
  return translations.packages.items.find((pkg) => pkg.id === id);
}
