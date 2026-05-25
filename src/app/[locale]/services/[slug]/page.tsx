import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_BASE } from "@/components/seo/breadcrumbs";
import { localeAlternates } from "@/i18n/metadata";
import { SERVICE_SLUGS, getPackageBySlug } from "@/lib/service-slugs";
import { ServiceDetailContent } from "./service-detail-content";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    return { title: locale === "ru" ? "Услуга" : "Service" };
  }

  const lang = locale === "ru" ? "ru" : "en";
  const description = `${pkg.description[lang]} ${
    lang === "ru" ? "Срок" : "Timeline"
  }: ${pkg.timeline[lang]}. ${pkg.startingPrice[lang]}.`;

  return {
    title: `${pkg.title[lang]} — ${pkg.startingPrice[lang]}`,
    description,
    alternates: localeAlternates(locale, `/services/${slug}`),
    openGraph: {
      type: "website",
      title: pkg.title.en,
      description: pkg.description.en,
      url: `${SITE_BASE}/services/${slug}`,
    },
  };
}

const PROVIDER = {
  "@type": "Organization",
  name: "Anteyko",
  url: SITE_BASE,
};

// Lower-bound USD price per package id, mirroring the startingPrice strings in
// src/lib/translations.ts (e.g. "From $800" -> 800). Used for Offer structured data.
const PACKAGE_MIN_PRICE: Record<string, string> = {
  "launch-site": "800",
  "mvp-sprint": "3000",
  "startup-key": "5000",
  "web3-addon": "3000",
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  const url = `${SITE_BASE}/services/${slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pkg.title.en,
    description: pkg.description.en,
    serviceType: "End-to-end product development",
    url,
    provider: PROVIDER,
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: PACKAGE_MIN_PRICE[pkg.id],
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        minPrice: PACKAGE_MIN_PRICE[pkg.id],
      },
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_BASE },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_BASE}/services` },
      { "@type": "ListItem", position: 3, name: pkg.title.en, item: url },
    ],
  };

  return (
    <PageWrapper>
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />
      <ServiceDetailContent packageId={pkg.id} />
    </PageWrapper>
  );
}
