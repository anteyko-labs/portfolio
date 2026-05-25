import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb, SITE_BASE } from "@/components/seo/breadcrumbs";
import { localeAlternates } from "@/i18n/metadata";
import { translations } from "@/lib/translations";
import { PricingContent } from "./pricing-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "ru" ? "Цены" : "Pricing",
    description:
      locale === "ru"
        ? "Прозрачные цены: Быстрый старт от $800, MVP-спринт от $3k, Стартап под ключ от $5k, Web3-модуль от $3k. Чёткий объём, фиксированные сроки."
        : "Transparent pricing: Launch Site from $800, MVP Sprint from $3k, Startup Under Key from $5k, Web3 Add-on from $3k. Clear scope, fixed timeline.",
    alternates: localeAlternates(locale, "/pricing"),
  };
}

const PROVIDER = {
  "@type": "Organization",
  name: "Anteyko",
  url: SITE_BASE,
};

// Mirrors the package catalog in src/lib/translations.ts. Prices reuse the lower
// bound of each package's startingPrice string (USD). Kept in sync manually with
// the single source of truth above so structured data stays accurate.
const PACKAGE_MIN_PRICE: Record<string, string> = {
  "launch-site": "800",
  "mvp-sprint": "3000",
  "startup-key": "5000",
  "web3-addon": "3000",
};

const offerCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Anteyko pricing",
  url: `${SITE_BASE}/pricing`,
  itemListElement: translations.packages.items.map((pkg) => ({
    "@type": "Offer",
    name: pkg.title.en,
    description: pkg.description.en,
    priceCurrency: "USD",
    price: PACKAGE_MIN_PRICE[pkg.id],
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "USD",
      minPrice: PACKAGE_MIN_PRICE[pkg.id],
    },
    itemOffered: {
      "@type": "Service",
      name: pkg.title.en,
      provider: PROVIDER,
    },
  })),
};

export default function PricingPage() {
  return (
    <PageWrapper>
      <JsonLd data={offerCatalogSchema} />
      <JsonLd data={homeBreadcrumb("Pricing", "/pricing")} />
      <PricingContent />
    </PageWrapper>
  );
}
