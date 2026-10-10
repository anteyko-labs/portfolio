import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb, SITE_BASE } from "@/components/seo/breadcrumbs";
import { pick, type Language } from "@/lib/i18n-text";
import { seo } from "@/i18n/metadata";
import { ServicesContent } from "./services-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return seo(locale, "/services", {
  title: pick({ en: "Services", ru: "Услуги", zh: "服务", tr: "Hizmetler", ar: "الخدمات" }, locale as Language),
  description: pick(
    {
      en: "Launch Site, MVP Sprint, Startup Under Key, Web3 Add-on. Clear scope, fixed timeline, predictable outcomes. Offices in Bishkek, Dubai, Istanbul, Chicago and Shenzhen.",
      ru: "Launch Site, MVP Sprint, Startup Under Key, Web3 Add-on. Понятный объём, фиксированные сроки, предсказуемый результат. Офисы в Бишкеке, Дубае, Стамбуле, Чикаго и Шэньчжэне.",
      zh: "Launch Site、MVP Sprint、Startup Under Key、Web3 Add-on。范围清晰、周期固定、结果可预期。办公室遍布比什凯克、迪拜、伊斯坦布尔、芝加哥和深圳。",
      tr: "Launch Site, MVP Sprint, Startup Under Key, Web3 Add-on. Net kapsam, sabit takvim, öngörülebilir sonuçlar. Bişkek, Dubai, İstanbul, Chicago ve Shenzhen'de ofisler.",
      ar: "Launch Site وMVP Sprint وStartup Under Key وإضافة Web3. نطاق واضح، وجدول زمني ثابت، ونتائج يمكن توقعها. مكاتب في بيشكيك ودبي وإسطنبول وشيكاغو وشنتشن.",
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

// Mirrors the package catalog defined in src/lib/translations.ts. Prices reuse the
// existing startingPrice strings (USD, lower-bound offers).
const PACKAGES = [
  {
    name: "Launch Site",
    description:
      "Landing page or corporate site that converts. Design, development, deployment.",
    price: "800",
  },
  {
    name: "MVP Sprint",
    description:
      "Working product with core features. Validate your idea with real users.",
    price: "3000",
  },
  {
    name: "Startup Under Key",
    description:
      "Full product build with complex features, integrations, and scale considerations.",
    price: "5000",
  },
  {
    name: "Web3 Add-on",
    description:
      "Blockchain modules for existing or new products. Wallets, tokens, DeFi.",
    price: "3000",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Product development services",
  serviceType: "End-to-end product development",
  url: `${SITE_BASE}/services`,
  provider: PROVIDER,
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Anteyko service packages",
    itemListElement: PACKAGES.map((pkg) => ({
      "@type": "Offer",
      name: pkg.name,
      description: pkg.description,
      priceCurrency: "USD",
      price: pkg.price,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        minPrice: pkg.price,
      },
      itemOffered: {
        "@type": "Service",
        name: pkg.name,
        provider: PROVIDER,
      },
    })),
  },
};

export default function ServicesPage() {
  return (
    <PageWrapper>
      <JsonLd data={serviceSchema} />
      <JsonLd data={homeBreadcrumb("Services", "/services")} />
      <ServicesContent />
    </PageWrapper>
  );
}
