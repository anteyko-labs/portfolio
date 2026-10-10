import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { localeAlternates } from "@/i18n/metadata";
import { pick, type Language } from "@/lib/i18n-text";
import { ProcessContent } from "./process-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
  title: pick({ en: "Process", ru: "Процесс", zh: "流程", tr: "Süreç", ar: "آلية العمل" }, locale as Language),
  description:
    pick({ en: "Discovery & Scope, Design & Architecture, Build & QA, Launch & Support. Four phases with clear deliverables. Offices in Bishkek, Dubai, Istanbul, Chicago and Shenzhen.", ru: "Исследование и объём, дизайн и архитектура, разработка и QA, запуск и поддержка. Четыре фазы с понятными результатами. Офисы в Бишкеке, Дубае, Стамбуле, Чикаго и Шэньчжэне.", zh: "需求与范围、设计与架构、开发与 QA、上线与支持。四个阶段，交付物清晰。办公室遍布比什凯克、迪拜、伊斯坦布尔、芝加哥和深圳。", tr: "Keşif ve Kapsam, Tasarım ve Mimari, Geliştirme ve QA, Lansman ve Destek. Net teslimatlarla dört aşama. Bişkek, Dubai, İstanbul, Chicago ve Shenzhen'de ofisler.", ar: "الاستكشاف وتحديد النطاق، التصميم والبنية، البناء وضمان الجودة، الإطلاق والدعم. أربع مراحل بمخرجات واضحة. مكاتب في بيشكيك ودبي وإسطنبول وشيكاغو وشنتشن." }, locale as Language),
    alternates: localeAlternates(locale, "/process"),
  };
}

export default function ProcessPage() {
  return (
    <PageWrapper>
      <JsonLd data={homeBreadcrumb("Process", "/process")} />
      <ProcessContent />
    </PageWrapper>
  );
}
