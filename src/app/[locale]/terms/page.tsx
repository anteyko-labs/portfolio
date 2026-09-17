import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section, SectionHeader } from "@/components/ui/section";
import { localeAlternates } from "@/i18n/metadata";
import type { Language } from "@/lib/translations";

const EMAIL = "labs@anteyko.com";

// Same shape in both locales, for the same reason as the privacy policy: legal
// pages drift apart the moment they are maintained as two separate documents.
// `{email}` becomes a link at render time.
const COPY: Record<Language, { title: string; subtitle: string; paragraphs: string[] }> = {
  en: {
    title: "Terms of use",
    subtitle: "Using this website and our services",
    paragraphs: [
      "By using this website and submitting inquiries, you agree to receive a response from Anteyko. Estimates and proposals are non-binding until a separate agreement is signed.",
      "When you write to us in a messenger, in the website chat or by email, you may receive an automatic first reply prepared by our AI assistant. It is always labelled as automatic, it is not a commitment on price or timeline, and a person continues the conversation afterwards. How we handle the data of those conversations is described in our privacy policy.",
      "All content on this site is for informational purposes. We reserve the right to update these terms; continued use of the site constitutes acceptance of the current version.",
      "For specific agreements (NDA, SOW, contracts), terms are defined in the respective documents. Contact us at {email} for questions.",
    ],
  },
  ru: {
    title: "Условия использования",
    subtitle: "Использование сайта и наших услуг",
    paragraphs: [
      "Пользуясь этим сайтом и отправляя заявки, вы соглашаетесь получить от Anteyko ответ. Оценки и коммерческие предложения не являются обязательством до подписания отдельного договора.",
      "Когда вы пишете нам в мессенджер, в чат на сайте или на почту, первым может прийти автоматический ответ, подготовленный нашим ИИ-помощником. Он всегда помечен как автоматический, не является обязательством по цене или срокам, и дальше разговор продолжает человек. Как мы обращаемся с данными этих переписок — в политике конфиденциальности.",
      "Всё содержимое сайта носит информационный характер. Мы вправе обновлять эти условия; продолжая пользоваться сайтом, вы принимаете действующую версию.",
      "Для конкретных договорённостей (NDA, SOW, договоры) условия определяются соответствующими документами. Вопросы — на {email}.",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "ru" ? "Условия использования" : "Terms",
    description:
      locale === "ru"
        ? "Условия использования сайта и услуг Anteyko: заявки, автоматические ответы, договоры."
        : "Terms of use for the Anteyko website and services: inquiries, automatic replies, agreements.",
    alternates: localeAlternates(locale, "/terms"),
  };
}

function withEmail(text: string) {
  return text.split(/(\{email\})/).map((part, index) =>
    part === "{email}" ? (
      <a
        key={index}
        href={`mailto:${EMAIL}`}
        className="text-accent-primary hover:text-accent-secondary"
      >
        {EMAIL}
      </a>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = COPY[(locale === "ru" ? "ru" : "en") as Language];

  return (
    <PageWrapper>
      <Section background="primary" padding="xl">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title={copy.title}
            subtitle={copy.subtitle}
            align="center"
            animate={false}
          />
          <div className="max-w-none mt-12 space-y-6 text-body-md text-text-secondary leading-relaxed">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{withEmail(paragraph)}</p>
            ))}
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
}
