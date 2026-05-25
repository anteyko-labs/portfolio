import { faqItems } from "@/lib/faq-data";

// Server component: emits FAQPage JSON-LD in the active locale so crawlers read
// the questions/answers in the language matching the current /[locale] route.
export function FAQSchema({ locale }: { locale: string }) {
  const isRu = locale === "ru";
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: isRu ? item.question.ru : item.question.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: isRu ? item.answer.ru : item.answer.en,
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
