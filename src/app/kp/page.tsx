import { Suspense } from 'react';
import type { Metadata } from 'next';
import KPQueryWrapper from './kp-query-wrapper';

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

export default function KPPage() {
  return (
    <Suspense fallback={null}>
      <KPQueryWrapper />
    </Suspense>
  );
}
