import { faqItems } from "@/lib/faq-data";
import { pick, type Language } from "@/lib/i18n-text";

// Server component: emits FAQPage JSON-LD in the active locale so crawlers read
// the questions/answers in the language matching the current /[locale] route.
export function FAQSchema({ locale }: { locale: string }) {
  const lang = locale as Language;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: pick(item.question, lang),
      acceptedAnswer: {
        "@type": "Answer",
        text: pick(item.answer, lang),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
