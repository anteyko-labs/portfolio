import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { seo } from "@/i18n/metadata";
import { pick, type Language } from "@/lib/i18n-text";
import { IncubatorContent } from "./incubator-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const language = locale as Language;
  return seo(locale, "/incubator", {
    title: pick({ en: "IT incubator Anteyko Labs — free trainers for students", ru: "IT-инкубатор Anteyko Labs — бесплатные тренажёры для студентов" }, language),
    description: pick(
      {
        en: "Free trainers in system architecture, DevOps and MVP for students in Bishkek, mentor reviews and help with the first job. Apply in two minutes.",
        ru: "Бесплатные тренажёры по системной архитектуре, DevOps и MVP для студентов Бишкека, разбор с менторами и помощь с первой работой. Заявка за две минуты.",
      },
      language,
    ),
    locales: ["en", "ru"],
  });
}

export default function IncubatorPage() {
  return (
    <PageWrapper>
      <JsonLd data={homeBreadcrumb("IT incubator", "/incubator")} />
      <IncubatorContent />
    </PageWrapper>
  );
}
