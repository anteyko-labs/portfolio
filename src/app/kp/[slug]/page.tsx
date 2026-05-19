import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import clients from '../../../../data/kp-clients.json';
import KPContent from '../kp-content';
import { getTemplate, type Currency } from '@/lib/kp-templates';

type ClientEntry = {
  client: string;
  currency: string;
  template: string;
  validUntil?: string;
  note?: string;
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

  return (
    <KPContent
      client={entry.client}
      currency={currency}
      template={template}
      validUntil={entry.validUntil}
      slug={slug}
    />
  );
}
