"use client";

import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { MagneticButton } from "@/components/ui/magnetic-button";

/** Closing call to action: giant type on a dark aurora, two ways to reach us */
export function HomeCta() {
  const { t, language } = useLanguage();
  const en = language === "en";
  const words = en
    ? ["websites", "MVP", "Web3", "ERP", "CRM", "PWA", "L1", "dashboards"]
    : ["сайты", "MVP", "Web3", "ERP", "CRM", "PWA", "L1", "дашборды"];

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
        <p className="font-mono text-caption uppercase tracking-[0.2em] text-white/50">{en ? "Next project" : "Следующий проект"}</p>
        <h2 className="mx-auto mt-6 max-w-4xl font-brand text-5xl font-semibold leading-[0.98] tracking-[-0.035em] md:text-7xl">
          {en ? (
            <>
              Got an idea? <span className="home-gradient-text">Let’s ship it.</span>
            </>
          ) : (
            <>
              Есть идея? <span className="home-gradient-text">Запустим её.</span>
            </>
          )}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-body-lg text-white/60">
          {en ? "Tell us about the task — you get an estimate and a stage plan within 24 hours." : "Расскажите о задаче — оценку и план по этапам пришлём в течение 24 часов."}
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
