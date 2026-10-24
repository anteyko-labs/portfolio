import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb, SITE_BASE } from "@/components/seo/breadcrumbs";
import { pick, type Language } from "@/lib/i18n-text";
import { seo } from "@/i18n/metadata";
import { translations } from "@/lib/translations";
import { PricingContent } from "./pricing-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return seo(locale, "/pricing", {
    title: pick({ en: "Pricing", ru: "Цены", zh: "价格", tr: "Fiyatlar", ar: "الأسعار" }, locale as Language),
    description: pick(
      {
        en: "Transparent pricing: Launch Site from $800, MVP Sprint from $3k, Startup Under Key from $5k, Web3 Add-on from $3k. Clear scope, fixed timeline.",
        ru: "Прозрачные цены: Быстрый старт от $800, MVP-спринт от $3k, Стартап под ключ от $5k, Web3-модуль от $3k. Чёткий объём, фиксированные сроки.",
        zh: "透明定价：Launch Site 起价 $800，MVP Sprint 起价 $3k，Startup Under Key 起价 $5k，Web3 Add-on 起价 $3k。范围清晰，周期固定。",
        tr: "Şeffaf fiyatlar: Launch Site $800'dan, MVP Sprint $3k'dan, Startup Under Key $5k'dan, Web3 Add-on $3k'dan. Net kapsam, sabit takvim.",
        ar: "أسعار شفافة: Launch Site من 800 دولار، وMVP Sprint من 3 آلاف دولار، وStartup Under Key من 5 آلاف دولار، وإضافة Web3 من 3 آلاف دولار. نطاق واضح وجدول زمني ثابت.",
      },
      locale as Language
    ),
  });
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
  "mobile-app": "5000",
  "ai-bots": "1000",
  "telegram-bots": "500",
  "time-access": "800",
  parking: "1000",
  cctv: "800",
  "conference-av": "1000",
  fintech: "3000",
  "carbon-credits": "8000",
  branding: "2000",
};

const offerCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Anteyko pricing",
  url: `${SITE_BASE}/pricing`,
  // IT support is priced by agreement, so its offer carries no price
  itemListElement: translations.packages.items.map((pkg) => ({
    "@type": "Offer",
    name: pkg.title.en,
    description: pkg.description.en,
    ...(PACKAGE_MIN_PRICE[pkg.id]
      ? {
          priceCurrency: "USD",
          price: PACKAGE_MIN_PRICE[pkg.id],
          priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", minPrice: PACKAGE_MIN_PRICE[pkg.id] },
        }
      : {}),
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
