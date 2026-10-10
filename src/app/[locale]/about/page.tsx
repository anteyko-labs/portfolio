import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { seo } from "@/i18n/metadata";
import { pick, type Language } from "@/lib/i18n-text";
import { AboutContent } from "./about-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return seo(locale, "/about", {
  title: pick({ en: "About", ru: "О студии", zh: "关于我们", tr: "Stüdyo", ar: "عن الاستوديو" }, locale as Language),
  description:
    pick({ en: "CTO-grade engineering meets product delivery. Offices in Bishkek, Dubai, Istanbul, Chicago and Shenzhen. Serving clients globally.", ru: "Инженерия уровня CTO в сочетании с продуктовой поставкой. Офисы в Бишкеке, Дубае, Стамбуле, Чикаго и Шэньчжэне. Работаем с клиентами по всему миру.", zh: "CTO 级工程能力，加上产品交付的执行力。办公室遍布比什凯克、迪拜、伊斯坦布尔、芝加哥和深圳，服务全球客户。", tr: "CTO seviyesinde mühendislik, ürün teslimatıyla buluşuyor. Bişkek, Dubai, İstanbul, Chicago ve Shenzhen'de ofisler. Dünya genelinde müşterilere hizmet veriyoruz.", ar: "هندسة بمستوى CTO تلتقي بتسليم المنتجات. مكاتب في بيشكيك ودبي وإسطنبول وشيكاغو وشنتشن. نخدم عملاءنا حول العالم." }, locale as Language),
  });
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <JsonLd data={homeBreadcrumb("About", "/about")} />
      <AboutContent />
    </PageWrapper>
  );
}
