import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { localeAlternates } from "@/i18n/metadata";
import { pick, type Language } from "@/lib/i18n-text";
import { CasesContent } from "./cases-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
  title: pick({ en: "Cases", ru: "Кейсы", zh: "案例", tr: "Projeler", ar: "المشاريع" }, locale as Language),
  description:
    pick(
      {
        en: "Selected work: Web3, MVP, enterprise modules, geo/heatmap, payment flows. Real projects, real outcomes. Anteyko — Bishkek, Dubai, Istanbul, Chicago, Shenzhen.",
        ru: "Избранные работы: Web3, MVP, корпоративные модули, гео/тепловые карты, платёжные потоки. Реальные проекты, реальные результаты. Anteyko — Бишкек, Дубай, Стамбул, Чикаго, Шэньчжэнь.",
        zh: "精选作品：Web3、MVP、企业级模块、地理/热力图、支付流程。真实项目，真实成果。Anteyko——比什凯克、迪拜、伊斯坦布尔、芝加哥、深圳。",
        tr: "Seçili işler: Web3, MVP, kurumsal modüller, coğrafi/ısı haritaları, ödeme akışları. Gerçek projeler, gerçek sonuçlar. Anteyko — Bişkek, Dubai, İstanbul, Chicago, Shenzhen.",
        ar: "أعمال مختارة: Web3 وMVP ووحدات للمؤسسات وخرائط جغرافية/حرارية ومسارات دفع. مشاريع حقيقية ونتائج حقيقية. Anteyko — بيشكيك ودبي وإسطنبول وشيكاغو وشنتشن.",
      },
      locale as Language,
    ),
    alternates: localeAlternates(locale, "/cases"),
  };
}

export default function CasesPage() {
  return (
    <PageWrapper>
      <JsonLd data={homeBreadcrumb("Cases", "/cases")} />
      <CasesContent />
    </PageWrapper>
  );
}
