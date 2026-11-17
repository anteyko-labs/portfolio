import { Carlito, JetBrains_Mono, Lato } from "next/font/google";
import { seo } from "@/i18n/metadata";
import { MetaPixel } from "@/components/meta-pixel";
import { LeadForm } from "./lead-form";
import s from "./lead.module.css";

// Ad landing for Meta ads: https://www.anteyko.com/ru/lead?utm_source=meta&...
// Russian only, no header or footer (one action per page), noindex: it is a
// funnel page, not content for search. Brand style v2.0 (Lato, indigo #2C46B8);
// Lato has no Cyrillic, so Cyrillic text falls back to Carlito, as in the
// original layout.

const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--lead-lato", display: "swap" });
const carlito = Carlito({ subsets: ["cyrillic", "latin"], weight: ["400", "700"], variable: "--lead-carlito", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["cyrillic", "latin"], weight: ["400", "500"], variable: "--lead-mono", display: "swap" });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    ...seo(locale, "/lead", {
      title: "Anteyko Labs: заявка на разговор о Вашем бизнесе",
      description: "Оставьте заявку: менеджер Anteyko Labs свяжется с Вами и обсудит Ваш бизнес.",
      locales: ["ru"],
    }),
    robots: { index: false, follow: true },
  };
}

export default function LeadPage() {
  return (
    <div className={`${s.root} ${lato.variable} ${carlito.variable} ${mono.variable}`} lang="ru">
      <MetaPixel />
      <div className={s.page}>
        <section className={`${s.block} ${s.head}`} aria-labelledby="lead-h1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={s.ridges} src="/brand/anteyko-ridges.svg" alt="" aria-hidden="true" />
          <a className={s.logo} href="https://www.anteyko.com/ru" aria-label="Anteyko Labs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/anteyko-labs-logo.svg" alt="Anteyko Labs" width={112} height={48} />
          </a>
          <div className={s.headBody}>
            <span className={`${s.tag} ${s.mono}`}>
              <span className={s.dot} />
              для&nbsp;владельцев бизнеса
            </span>
            <h1 id="lead-h1" className={s.h1}>Ваш инфраструктурный партнёр</h1>
          </div>
          <p className={s.lead}>
            Берём на&nbsp;себя всё, что&nbsp;связано с&nbsp;IT: сайт и&nbsp;приложения, учёт и&nbsp;заказы, поддержку после
            запуска. Вы&nbsp;занимаетесь бизнесом, а&nbsp;мы&nbsp;отвечаем за&nbsp;то, чтобы всё работало. С&nbsp;Вами
            на&nbsp;связи один менеджер, этапы и&nbsp;сроки известны заранее, на&nbsp;каждый результат есть акт. Оставьте
            заявку, и&nbsp;мы&nbsp;разберёмся, что&nbsp;поможет Вашему бизнесу расти.
          </p>
        </section>

        <section className={`${s.block} ${s.formBlock}`} aria-labelledby="lead-form-h">
          <LeadForm />
        </section>
      </div>
    </div>
  );
}
