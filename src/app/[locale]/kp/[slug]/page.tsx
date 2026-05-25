import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import clients from '../../../../../data/kp-clients.json';
import KPContent from '../kp-content';
import { getTemplate, type Currency } from '@/lib/kp-templates';

type ClientEntry = {
  client: string;
  currency: string;
  template: string;
  validUntil?: string;
  note?: string;
  intro?: string;
  brief?: string;
};

const CLIENTS = clients as Record<string, ClientEntry | string>;

function getClient(slug: string): ClientEntry | null {
  if (slug.startsWith('_')) return null;
  const entry = CLIENTS[slug];
  if (!entry || typeof entry === 'string') return null;
  return entry;
}

export const metadata: Metadata = {
  title: 'Коммерческое предложение — Anteyko',
  description: 'Коммерческое предложение Anteyko Labs.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export function generateStaticParams() {
  return Object.keys(CLIENTS)
    .filter((slug) => !slug.startsWith('_'))
    .filter((slug) => typeof CLIENTS[slug] === 'object')
    .map((slug) => ({ slug }));
}

export default async function KPSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getClient(slug);
  if (!entry) notFound();

  const currency: Currency = entry.currency === 'usd' ? 'usd' : 'som';
  const template = getTemplate(entry.template);

  // JSON-LD payload is built from static template/entry data (no user input),
  // and JSON.stringify safely escapes all string values, so this dangerouslySetInnerHTML
  // call cannot introduce XSS. </script> sequences are not possible in our content.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: template.title,
    description: template.subtitle,
    provider: {
      '@type': 'Organization',
      name: 'Anteyko Labs',
      url: 'https://anteyko.com',
    },
    priceCurrency: currency === 'usd' ? 'USD' : 'KGS',
    ...(entry.validUntil ? { validThrough: entry.validUntil } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- static data, see note above
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <KPContent
        client={entry.client}
        currency={currency}
        template={template}
        validUntil={entry.validUntil}
        slug={slug}
        intro={entry.intro}
        brief={entry.brief}
      />
    </>
  );
}
