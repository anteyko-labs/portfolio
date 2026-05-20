/**
 * Typed analytics wrapper for dataLayer events.
 * Pushes to window.dataLayer for GTM / GA4 / Yandex.Metrica.
 */

type DataLayerEvent =
  | { event: "page_view"; page_path: string; page_title?: string }
  | { event: "contact_form_view"; step?: number }
  | { event: "contact_form_step_complete"; step: number }
  | {
      event: "contact_form_submit";
      project_type?: string;
      stage?: string;
      timeline?: string;
      budget?: string;
      has_message: boolean;
    }
  | { event: "contact_form_error"; error_type: string }
  | {
      event: "kp_view";
      slug: string;
      client: string;
      template: string;
      currency: string;
    }
  | {
      event: "kp_plan_click";
      plan_id: string;
      plan_name: string;
      slug: string;
      template: string;
    }
  | {
      event: "kp_invoice_download";
      slug: string;
      plan: string;
      format: "pdf";
    }
  | { event: "case_study_view"; case_slug: string }
  | { event: "case_study_scroll_50"; case_slug: string }
  | {
      event: "cta_click_telegram";
      location: "header" | "footer" | "kp" | "cta" | "sticky";
      slug?: string;
    }
  | { event: "outbound_click"; outbound_url: string; link_text?: string }
  | { event: "404_error"; referrer?: string; attempted_path: string };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(payload: DataLayerEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload as unknown as Record<string, unknown>);
}

// Helper: парсит UTM из текущего URL и сохраняет в sessionStorage
export function captureUtmParams(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utm = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "gclid",
    "fbclid",
  ];
  const captured: Record<string, string> = {};
  for (const key of utm) {
    const value = params.get(key);
    if (value) captured[key] = value;
  }
  if (Object.keys(captured).length > 0) {
    sessionStorage.setItem("anteyko_utm", JSON.stringify(captured));
  }
}

export function getStoredUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(
      sessionStorage.getItem("anteyko_utm") || "{}"
    ) as Record<string, string>;
  } catch {
    return {};
  }
}
