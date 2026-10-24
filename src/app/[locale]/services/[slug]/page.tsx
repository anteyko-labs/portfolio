import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_BASE } from "@/components/seo/breadcrumbs";
import { pick, type Language } from "@/lib/i18n-text";
import { seo } from "@/i18n/metadata";
import { SERVICE_SLUGS, getPackageBySlug } from "@/lib/service-slugs";
import { ServiceDetailContent } from "./service-detail-content";
import { getServiceDetail } from "@/lib/service-details";
import { searchTitle } from "@/lib/footer-search-links";

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
  const description = `${pkg.description[lang]} ${pkg.startingPrice[lang]}, ${pkg.timeline[lang]}. ${
    pick({ en: "Anteyko, IT studio in Bishkek.", ru: "Anteyko — IT-студия в Бишкеке.", zh: "Anteyko——比什凯克 IT 工作室。", tr: "Anteyko — Bişkek'te BT stüdyosu.", ar: "Anteyko — استوديو تقني في بيشكيك." }, lang)
  }`;
  // the phrase people search for, e.g. «Автоматизация парковки в Бишкеке — от $1k»
  const phrase = searchTitle(`/services/${slug}`, lang) ?? pkg.title[lang];

  return seo(locale, `/services/${slug}`, {
    title: `${phrase} — ${pkg.startingPrice[lang].toLowerCase()}`,
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
  const { locale, slug } = await params;
  const lang = locale as Language;
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  const url = `${SITE_BASE}/services/${slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pkg.title.en,
    description: getServiceDetail(pkg.id)?.intro.en ?? pkg.description.en,
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

  const detail = getServiceDetail(pkg.id);
  // The page's own questions, in the page's language
  const faqSchema = detail
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: detail.faq.map((f) => ({ "@type": "Question", name: pick(f.q, lang), acceptedAnswer: { "@type": "Answer", text: pick(f.a, lang) } })),
      }
    : null;

  return (
    <PageWrapper>
      <JsonLd data={faqSchema ? [serviceSchema, breadcrumbSchema, faqSchema] : [serviceSchema, breadcrumbSchema]} />
      <ServiceDetailContent packageId={pkg.id} detail={detail} />
    </PageWrapper>
  );
}
