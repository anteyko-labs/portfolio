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
} as const satisfies Record<string, string>;

export type PackageId = keyof typeof PACKAGE_SLUGS;

// Reverse lookup: URL slug -> package id.
const SLUG_TO_ID: Record<string, PackageId> = Object.fromEntries(
  Object.entries(PACKAGE_SLUGS).map(([id, slug]) => [slug, id as PackageId])
) as Record<string, PackageId>;

export type ServicePackage = (typeof translations.packages.items)[number];

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
