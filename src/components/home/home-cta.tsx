"use client";

import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { MagneticButton } from "@/components/ui/magnetic-button";

/** Closing call to action: giant type on a dark aurora, two ways to reach us */
export function HomeCta() {
  const { t, language } = useLanguage();
  const words = pick(
    {
      en: ["websites", "MVP", "Web3", "ERP", "CRM", "PWA", "L1", "dashboards"],
      ru: ["сайты", "MVP", "Web3", "ERP", "CRM", "PWA", "L1", "дашборды"],
      zh: ["网站", "MVP", "Web3", "ERP", "CRM", "PWA", "L1", "数据看板"],
      tr: ["web siteleri", "MVP", "Web3", "ERP", "CRM", "PWA", "L1", "paneller"],
      ar: ["مواقع ويب", "MVP", "Web3", "ERP", "CRM", "PWA", "L1", "لوحات معلومات"],
    },
    language,
  );

  return (
    <section className="relative isolate overflow-hidden bg-[#06060B] py-24 text-white md:py-32">
      <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-10 -z-10 overflow-hidden opacity-[0.06]">
        <div className="home-marquee flex w-max gap-10 whitespace-nowrap font-brand text-[9rem] font-semibold leading-none">
          {[...words, ...words].map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <p className="font-mono text-caption uppercase tracking-[0.2em] text-white/50">{pick({ en: "Next project", ru: "Следующий проект", zh: "下一个项目", tr: "Sonraki proje", ar: "المشروع التالي" }, language)}</p>
        <h2 className="mx-auto mt-6 max-w-4xl font-brand text-5xl font-semibold leading-[0.98] tracking-[-0.035em] md:text-7xl">
          {pick(
            {
              en: (
                <>
                  Got an idea? <span className="home-gradient-text">Let’s ship it.</span>
                </>
              ),
              ru: (
                <>
                  Есть идея? <span className="home-gradient-text">Запустим её.</span>
                </>
              ),
              zh: (
                <>
                  有想法？<span className="home-gradient-text">一起把它上线。</span>
                </>
              ),
              tr: (
                <>
                  Bir fikriniz mi var? <span className="home-gradient-text">Hayata geçirelim.</span>
                </>
              ),
              ar: (
                <>
                  لديك فكرة؟ <span className="home-gradient-text">لنُطلقها معاً.</span>
                </>
              ),
            },
            language,
          )}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-body-lg text-white/60">
          {pick({ en: "Tell us about the task — you get an estimate and a stage plan within 24 hours.", ru: "Расскажите о задаче — оценку и план по этапам пришлём в течение 24 часов.", zh: "告诉我们您的任务——24 小时内给您报价和分阶段计划。", tr: "Görevden bahsedin — 24 saat içinde teklifi ve aşama planını alın.", ar: "حدّثنا عن المهمة — وتحصل على تقدير وخطة مراحل خلال 24 ساعة." }, language)}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <MagneticButton>
            <NextLink href="/contact" className="home-cta-glow inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-4 text-body-lg font-semibold text-[#0A0A0F]">
              {t("cta.primary")} <span aria-hidden="true">→</span>
            </NextLink>
          </MagneticButton>
          <MagneticButton>
            <a href="https://t.me/anteyko_labs" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-body-lg font-medium text-white backdrop-blur hover:bg-white/10">
              Telegram <span aria-hidden="true">↗</span>
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
