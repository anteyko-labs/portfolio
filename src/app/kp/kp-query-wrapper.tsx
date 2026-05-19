'use client';

import { useSearchParams } from 'next/navigation';
import KPContent from './kp-content';
import { getTemplate, type Currency } from '@/lib/kp-templates';

export default function KPQueryWrapper() {
  const searchParams = useSearchParams();
  const clientRaw = searchParams.get('client')?.trim() ?? '';
  const currencyRaw = (searchParams.get('currency') ?? 'som').toLowerCase();
  const templateRaw = searchParams.get('template');

  const currency: Currency = currencyRaw === 'usd' ? 'usd' : 'som';
  const client = clientRaw.slice(0, 80);
  const template = getTemplate(templateRaw);

  return (
    <KPContent
      client={client}
      currency={currency}
      template={template}
    />
  );
}
