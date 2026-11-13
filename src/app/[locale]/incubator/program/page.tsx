import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { seo } from "@/i18n/metadata";
import { pick, type Language } from "@/lib/i18n-text";
import { ProgramContent } from "./program-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const language = locale as Language;
  return seo(locale, "/incubator/program", {
    title: pick({ en: "Incubation — playable trainers | Anteyko Labs", ru: "Инкубация — тренажёры в браузере | Anteyko Labs" }, language),
    description: pick(
      {
        en: "Three playable missions in system architecture, DevOps and MVP. Solve them and apply to the free IT incubator for students.",
        ru: "Три задачи прямо в браузере: системная архитектура, DevOps и MVP. Решите их и подайте заявку в бесплатный IT-инкубатор для студентов.",
      },
      language,
    ),
    locales: ["en", "ru"],
  });
}

export default function IncubatorProgramPage() {
  return (
    <PageWrapper>
      <JsonLd data={homeBreadcrumb("Incubation", "/incubator/program")} />
      <ProgramContent />
    </PageWrapper>
  );
}
