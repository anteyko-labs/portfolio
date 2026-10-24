import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { seo } from "@/i18n/metadata";
import { catalogEntries } from "@/lib/catalog";
import { countIndustries } from "@/lib/catalog-utils";
import { microCases } from "@/lib/cases-data";
import { CaseDataProvider } from "@/lib/case-data-context";
import { localize } from "@/lib/localize";

import { pick, type Language } from "@/lib/i18n-text";
import { CasesContent } from "./cases-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return seo(locale, "/cases", {
  title: pick({ en: "Portfolio: websites, apps and systems built in Bishkek", ru: "Портфолио и кейсы: сайты, приложения и системы из Бишкека", zh: "作品集：比什凯克打造的网站、应用与系统", tr: "Portföy: Bişkek'te geliştirilen siteler, uygulamalar ve sistemler", ar: "أعمالنا: مواقع وتطبيقات وأنظمة من بيشكيك" }, locale as Language),
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
  });
}

export default async function CasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale as Language;
  const data = {
    catalogEntries: localize(catalogEntries, lang),
    microCases: localize(microCases, lang),
    industries: countIndustries(catalogEntries),
  };
  return (
    <PageWrapper>
      <JsonLd data={homeBreadcrumb("Cases", "/cases")} />
      <CaseDataProvider value={data}>
        <CasesContent />
      </CaseDataProvider>
    </PageWrapper>
  );
}
