import { PageWrapper } from "@/components/layout/page-wrapper";
import { Section, SectionHeader } from "@/components/ui/section";
import { localeAlternates } from "@/i18n/metadata";
import type { Language } from "@/lib/translations";
import { privacyCopy, type Block } from "./privacy-content";

const EMAIL = "labs@anteyko.com";
const TELEGRAM = "https://t.me/Anteyko_labs";
const LINK = "text-accent-primary hover:text-accent-secondary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "ru" ? "Политика конфиденциальности" : "Privacy policy",
    description:
      locale === "ru"
        ? "Как Anteyko Labs собирает, обрабатывает и хранит ваши данные: сайт и аналитика, переписка в мессенджерах и почте, ИИ-помощник, удаление данных."
        : "How Anteyko Labs collects, processes and stores your data: website and analytics, messenger and email conversations, the AI assistant, data deletion.",
    alternates: localeAlternates(locale, "/privacy"),
  };
}

// `{email}` and `{telegram}` become links; everything else is plain text. Split
// on the whole token so a sentence reads as a sentence in the content file.
function withLinks(text: string) {
  return text.split(/(\{email\}|\{telegram\})/).map((part, index) => {
    if (part === "{email}") {
      return (
        <a key={index} href={`mailto:${EMAIL}`} className={LINK}>
          {EMAIL}
        </a>
      );
    }
    if (part === "{telegram}") {
      return (
        <a
          key={index}
          href={TELEGRAM}
          className={LINK}
          target="_blank"
          rel="noopener noreferrer"
        >
          @Anteyko_labs
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

function PolicyBlock({ block }: { block: Block }) {
  if ("ul" in block) {
    return (
      <ul className="list-disc pl-6 space-y-2">
        {block.ul.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    <p>
      {block.lead ? (
        <>
          <strong className="text-text-primary">{block.lead}</strong>{" "}
        </>
      ) : null}
      {withLinks(block.p)}
    </p>
  );
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = privacyCopy[(locale === "ru" ? "ru" : "en") as Language];

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

          <div className="max-w-none mt-12 text-body-md text-text-secondary leading-relaxed [&_p]:mb-4 [&_ul]:mb-4 [&_h2]:mt-12 [&_h2]:mb-4">
            <p className="text-text-tertiary text-body-sm">{copy.updated}</p>

            {copy.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-display-sm md:text-display-md font-display font-semibold text-text-primary mt-12 mb-4">
                  {section.title}
                </h2>
                {section.blocks.map((block, index) => (
                  <PolicyBlock key={index} block={block} />
                ))}
              </section>
            ))}
          </div>
        </div>
      </Section>
    </PageWrapper>
  );
}
