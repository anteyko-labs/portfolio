// Helpers that build BreadcrumbList structured-data objects for use with <JsonLd>.
// All URLs are anchored at the canonical www host so crawlers follow no extra
// redirect hop. Each helper returns a plain object ready to pass to <JsonLd data={...} />.

export const SITE_BASE = "https://www.anteyko.com";

export interface Crumb {
  name: string;
  path: string;
}

// Builds a BreadcrumbList from an ordered list of crumbs. The first crumb is the
// site root (Home) and should use path "/".
export function breadcrumbList(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.path === "/" ? SITE_BASE : `${SITE_BASE}${crumb.path}`,
    })),
  };
}

// Convenience: a two-level trail (Home -> current page).
export function homeBreadcrumb(name: string, path: string) {
  return breadcrumbList([
    { name: "Home", path: "/" },
    { name, path },
  ]);
}
