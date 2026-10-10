"use client";

import { Link } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";

export function CaseBottomCTA() {
  const { language } = useLanguage();

  return (
    <section className="border-t border-border/50 bg-bg-secondary py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-display-md font-display font-bold text-text-primary mb-4">
          {pick({ en: "Similar project?", ru: "Похожий проект?", zh: "类似项目？", tr: "Benzer bir proje mi?", ar: "مشروع مماثل؟" }, language)}
        </h2>
        <p className="text-body-lg text-text-secondary mb-8">
          {pick({ en: "20 minutes — we'll discuss your task and give an honest assessment. No strings attached.", ru: "45 минут — обсудим вашу задачу, дадим честную оценку. Без обязательств.", zh: "20 分钟——聊聊您的需求，给出诚实的评估。无任何附加条件。", tr: "20 dakika — görevinizi konuşur, dürüst bir değerlendirme yaparız. Hiçbir bağlayıcılık yok.", ar: "20 دقيقة — نناقش مهمتك ونقدّم لك تقييمًا صريحًا. دون أي التزام." }, language)}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/contact"
            className="px-6 py-3 bg-accent-primary text-white rounded-lg font-medium hover:opacity-90 transition"
          >
            {pick({ en: "Get an estimate in 24 hours →", ru: "Получить оценку за 24 часа →", zh: "24 小时内获取报价 →", tr: "24 saatte teklif alın →", ar: "احصل على تقدير خلال 24 ساعة ←" }, language)}
          </Link>
          <Link
            href="/cases"
            className="px-6 py-3 border border-border rounded-lg font-medium text-text-primary hover:bg-bg-tertiary transition"
          >
            {pick({ en: "See other cases", ru: "Смотреть другие кейсы", zh: "查看其他案例", tr: "Diğer vakaları gör", ar: "اطّلع على حالات أخرى" }, language)}
          </Link>
        </div>
      </div>
    </section>
  );
}
