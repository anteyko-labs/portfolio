'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { captureUtmParams, trackEvent } from '@/lib/analytics';

/**
 * Captures UTM parameters on first load + emits a `page_view` event on every
 * client-side route change. Place once at the root of the layout (inside the
 * client tree, after LanguageProvider).
 */
export function AnalyticsBootstrap() {
  const pathname = usePathname();

  // Capture UTM once on first mount (subsequent landings in the session
  // preserve original attribution unless utm_source overrides).
  useEffect(() => {
    captureUtmParams();
  }, []);

  // Emit page_view on every route change (Next.js App Router SPA navigation).
  useEffect(() => {
    if (!pathname) return;
    const query = typeof window !== 'undefined' ? window.location.search : '';
    trackEvent({
      event: 'page_view',
      page_path: query ? `${pathname}${query}` : pathname,
      page_title: typeof document !== 'undefined' ? document.title : undefined,
    });
  }, [pathname]);

  return null;
}
