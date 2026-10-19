import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_BASE } from "@/components/seo/breadcrumbs";
import { pick, type Language } from "@/lib/i18n-text";
import { seo } from "@/i18n/metadata";
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
    return { title: pick({ en: "Service", ru: "Услуга", zh: "服务", tr: "Hizmet", ar: "الخدمة" }, locale as Language) };
  }

  const lang = locale as Language;
  const description = `${pkg.description[lang]} ${
    pick({ en: "Timeline", ru: "Срок", zh: "周期", tr: "Süre", ar: "المدة" }, lang)
  }: ${pkg.timeline[lang]}.`;

  return seo(locale, `/services/${slug}`, {
    title: `${pkg.title[lang]} — ${pkg.timeline[lang]}`,
    description,
  });
}

const PROVIDER = {
  "@type": "Organization",
  // Same entity as the root layout's Organization, so Google merges them
  "@id": `${SITE_BASE}/#organization`,
  name: "Anteyko",
  url: SITE_BASE,
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
