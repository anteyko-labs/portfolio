/**
 * The site's only WhatsApp number: Anteyko Labs' WhatsApp Business on the Cloud
 * API, the "WhatsApp Anteyko Labs" inbox in the CRM. Every wa.me link on the
 * site is built from here, so a number change is one edit. The number runs on
 * the Cloud API with no phone app behind it: it takes messages, not calls.
 *
 * whatsapp.test.ts pins this number and fails if the number WhatsApp banned in
 * October 2026 shows up anywhere in src/ or public/ again.
 */
export const WHATSAPP_NUMBER = "996709927895";

/** wa.me wants the bare international number: digits only, no "+", no spaces. */
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
