import { PageWrapper } from "@/components/layout/page-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import { homeBreadcrumb } from "@/components/seo/breadcrumbs";
import { pick, type Language } from "@/lib/i18n-text";
import { localeAlternates } from "@/i18n/metadata";
import { ContactContent } from "./contact-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const language = locale as Language;
  return {
    title: pick({ en: "Contact", ru: "Контакты", zh: "联系我们", tr: "İletişim", ar: "تواصل معنا" }, language),
    description: pick(
      {
        en: "Get an estimate in 24 hours or book a 45-minute scoping call. Tell us about your project. Anteyko — Bishkek, Dubai, Istanbul, Chicago, Shenzhen.",
        ru: "Получите оценку за 24 часа или запишитесь на 45-минутный созвон. Расскажите нам о вашем проекте. Anteyko — Бишкек, Дубай, Стамбул, Чикаго, Шэньчжэнь.",
        zh: "24 小时内获取报价，或预约 45 分钟需求沟通会。告诉我们您的项目。Anteyko——比什凯克、迪拜、伊斯坦布尔、芝加哥、深圳。",
        tr: "24 saatte teklif alın veya 45 dakikalık kapsam görüşmesi planlayın. Bize projenizden bahsedin. Anteyko — Bişkek, Dubai, İstanbul, Chicago, Shenzhen.",
        ar: "احصل على تقدير خلال 24 ساعة أو احجز مكالمة لتحديد النطاق مدتها 45 دقيقة. حدّثنا عن مشروعك. Anteyko — بيشكيك ودبي وإسطنبول وشيكاغو وشنتشن.",
      },
      language,
    ),
    alternates: localeAlternates(locale, "/contact"),
  };
}

export default function ContactPage() {
  return (
    <PageWrapper>
      <JsonLd data={homeBreadcrumb("Contact", "/contact")} />
      <ContactContent />
    </PageWrapper>
  );
}
