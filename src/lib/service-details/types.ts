import type { L } from "@/lib/i18n-text";
import type { PackageId } from "@/lib/service-slugs";

// Long-form content for a service page (/services/<slug>), on top of the short
// package card in translations.ts. Every claim must agree with that card: same
// price, timeline and deliverables, no invented numbers, clients or awards.
export interface ServiceDetail {
  /** 2–3 sentences: the problem this service solves and for whom */
  intro: L;
  /** Technologies and tools, shown as chips (not translated) */
  stack: string[];
  /** Exactly 4 stages of how the work goes */
  steps: { title: L; text: L }[];
  /** Exactly 6 capabilities, more specific than the deliverables list */
  features: { title: L; text: L }[];
  /** Exactly 3 questions a buyer of this service asks */
  faq: { q: L; a: L }[];
}

export type ServiceDetails = Partial<Record<PackageId, ServiceDetail>>;
