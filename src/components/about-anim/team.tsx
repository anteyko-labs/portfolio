"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE, SpotlightCard } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";
import { OFFICES } from "@/lib/locations";
import { RevealTitle, ScrollWords } from "./shared";
import { type Language, pick } from "@/lib/i18n-text";

function SocialLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-border bg-bg-secondary px-3.5 py-2 text-caption font-medium text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-primary/40 hover:text-accent-primary hover:shadow-[0_12px_30px_-14px_rgba(79,70,229,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
    >
      <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent transition-transform duration-700 group-hover/link:translate-x-full" />
      <span className="transition-transform duration-300 group-hover/link:-rotate-12 group-hover/link:scale-110">{icon}</span>
      {label}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">↗</span>
    </a>
  );
}

const GH = (
  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 .5C5.73.5.5 5.73.5 12.21c0 5.18 3.36 9.58 8.02 11.13.59.11.8-.26.8-.57v-2c-3.26.72-3.95-1.58-3.95-1.58-.53-1.37-1.3-1.73-1.3-1.73-1.07-.74.08-.73.08-.73 1.18.08 1.8 1.23 1.8 1.23 1.05 1.83 2.76 1.3 3.43.99.11-.78.41-1.3.75-1.6-2.6-.3-5.34-1.32-5.34-5.88 0-1.3.46-2.36 1.22-3.19-.12-.3-.53-1.51.12-3.15 0 0 1-.33 3.3 1.22a11.3 11.3 0 016 0c2.28-1.55 3.29-1.22 3.29-1.22.65 1.64.24 2.85.12 3.15.76.83 1.22 1.89 1.22 3.19 0 4.57-2.75 5.58-5.36 5.87.42.37.8 1.1.8 2.22v3.29c0 .31.21.69.81.57 4.65-1.56 8-5.95 8-11.13C23.5 5.73 18.27.5 12 .5z" />
  </svg>
);
const LI = (
  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

/** Founder card with a living gradient ring, the team card, and the founder's note revealed as you read */
export function Team({ language }: { language: Language }) {
  const reduced = useReducedMotion();
  const quote = pick({ en: "“Five years ago I started Anteyko Labs as a full-cycle product studio. Too many founders I met had the same story: a contractor who blew the deadline, or code they were afraid to open. We built Anteyko to be the opposite of that — staged payments, code in your repo from day one, a demo every two weeks, and the keys handed over at the end. Production-grade products founders can actually be proud of.”", ru: "«Пять лет назад я основал Anteyko Labs — продуктовую студию полного цикла. У слишком многих founder'ов, которых я встречал, была одна и та же история: подрядчик, сорвавший сроки, или код, который страшно открыть. Мы построили Anteyko как противоположность этому — этапная оплата, код в твоём репо с первого дня, демо каждые две недели и передача ключей в конце. Production-grade продукты, которыми хочется гордиться.»", zh: "“五年前，我创办了 Anteyko Labs，做全周期产品工作室。我遇到的太多创始人都有相同的遭遇：外包方延误交期，或者交付的代码让人不敢打开。我们打造 Anteyko，就是要做到截然相反——分阶段付款、第一天起代码就在您的仓库里、每两周一次演示、最后交出全部钥匙。做出创始人真正引以为傲的生产级产品。”", tr: "“Beş yıl önce Anteyko Labs'i tam döngülü bir ürün stüdyosu olarak kurdum. Tanıştığım pek çok girişimcinin hikâyesi aynıydı: teslim tarihini kaçıran bir yüklenici ya da açmaya korktukları bir kod. Anteyko'yu bunun tam tersi olacak şekilde kurduk — aşamalı ödemeler, ilk günden deponuzda olan kod, iki haftada bir demo ve sonunda teslim edilen anahtarlar. Girişimcilerin gerçekten gurur duyabileceği, production seviyesinde ürünler.”", ar: "«قبل خمس سنوات أسّستُ Anteyko Labs كاستوديو منتجات متكامل. كثير من المؤسسين الذين قابلتهم يحملون القصة نفسها: مقاول أخلّ بالموعد النهائي، أو شيفرة يخشون فتحها. بنينا Anteyko لتكون النقيض تمامًا — دفعات على مراحل، وشيفرة في مستودعك منذ اليوم الأول، وعرض تجريبي كل أسبوعين، وتسليم المفاتيح في النهاية. منتجات بمعايير الإنتاج يفخر بها المؤسسون حقًا.»" }, language);
  const quoteHl = pick({ en: ["the opposite of that", "Production-grade products founders can actually be proud of."], ru: ["противоположность этому", "Production-grade продукты, которыми хочется гордиться."], zh: ["截然相反", "做出创始人真正引以为傲的生产级产品。"], tr: ["bunun tam tersi", "Girişimcilerin gerçekten gurur duyabileceği, production seviyesinde ürünler."], ar: ["النقيض تمامًا", "منتجات بمعايير الإنتاج يفخر بها المؤسسون حقًا."] }, language);

  return (
    <div>
      <RevealTitle eyebrow={pick({ en: "Team", ru: "Команда", zh: "团队", tr: "Ekip", ar: "الفريق" }, language)} title={pick({ en: "Who's behind Anteyko", ru: "Кто стоит за Anteyko", zh: "Anteyko 背后的人", tr: "Anteyko'nun arkasındaki isim", ar: "من يقف وراء Anteyko" }, language)} className="max-w-3xl" />

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <motion.div initial={reduced ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: EASE }}>
          <SpotlightCard className="h-full rounded-3xl border border-border bg-bg-primary p-6 md:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="relative mx-auto shrink-0 sm:mx-0">
                <div className="ab-ring relative isolate overflow-hidden rounded-[1.6rem] p-[3px]">
                  <Image
                    src="/images/team/bekzhan.jpg"
                    alt={pick({ en: "Bekjan Ergeshov, Founder & CEO of Anteyko Labs", ru: "Бекжан Эргешов, основатель и CEO Anteyko Labs", zh: "Bekjan Ergeshov，Anteyko Labs 创始人兼 CEO", tr: "Bekjan Ergeshov, Anteyko Labs Kurucusu ve CEO'su", ar: "بيكجان إرغيشوف، المؤسس والرئيس التنفيذي لشركة Anteyko Labs" }, language)}
                    width={112}
                    height={112}
                    className="relative rounded-[1.4rem] border-2 border-bg-primary object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{ width: "112px", height: "112px" }}
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-bg-primary bg-emerald-400" aria-hidden="true">
                  <span className="h-2 w-2 animate-ping rounded-full bg-white/80 motion-reduce:animate-none" />
                </span>
              </div>
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="font-brand text-2xl font-semibold tracking-tight text-text-primary">{pick({ en: "Bekjan Ergeshov", ru: "Бекжан Эргешов", zh: "Bekjan Ergeshov", tr: "Bekjan Ergeshov", ar: "بيكجان إرغيشوف" }, language)}</p>
                <p className="mt-1 font-mono text-caption font-medium uppercase tracking-[0.16em] text-accent-primary">{pick({ en: "Founder & CEO", ru: "Основатель и CEO", zh: "创始人兼 CEO", tr: "Kurucu ve CEO", ar: "المؤسس والرئيس التنفيذي" }, language)}</p>
                <p className="mt-4 text-body-md leading-relaxed text-text-secondary">
                  {pick({ en: "Helps founders turn an idea into a production-grade product — no blown deadlines, no rewrites from scratch, no surprises on the invoice. Five years building Anteyko: 40+ products shipped, from startup MVPs to enterprise platforms, with offices in Bishkek, Dubai, Istanbul, Chicago and Shenzhen.", ru: "Помогает founder'ам превращать идею в production-grade продукт — без срывов сроков, переписывания с нуля и сюрпризов в счёте. Пять лет строит Anteyko: 40+ запущенных продуктов, от MVP стартапов до enterprise-платформ, с офисами в Бишкеке, Дубае, Стамбуле, Чикаго и Шэньчжэне.", zh: "帮助创始人把想法变成生产级产品——不延期、不推倒重来、账单上没有意外。五年打造 Anteyko：已交付 40+ 款产品，从初创公司 MVP 到企业级平台，办公室遍布比什凯克、迪拜、伊斯坦布尔、芝加哥和深圳。", tr: "Girişimcilerin fikri production seviyesinde bir ürüne dönüştürmesine yardım eder — kaçırılan teslim tarihleri, sıfırdan yeniden yazımlar, faturada sürprizler olmadan. Anteyko'yu beş yıldır kuruyor: girişim MVP'lerinden kurumsal platformlara 40'tan fazla ürün teslim edildi; ofisler Bişkek, Dubai, İstanbul, Chicago ve Shenzhen'de.", ar: "يساعد المؤسسين على تحويل الفكرة إلى منتج بمعايير الإنتاج — دون تأخير في المواعيد، ودون إعادة كتابة من الصفر، ودون مفاجآت في الفاتورة. خمس سنوات من بناء Anteyko: أكثر من 40 منتجًا تم تسليمه، من MVP للشركات الناشئة إلى منصات المؤسسات، مع مكاتب في بيشكيك ودبي وإسطنبول وشيكاغو وشنتشن." }, language)}
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <SocialLink href="https://github.com/anteyko-labs" label="GitHub" icon={GH} />
                  <SocialLink href="https://www.linkedin.com/in/bekjan-ergeshov/" label="LinkedIn" icon={LI} />
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Honest team representation — no fake faces */}
        <motion.div initial={reduced ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: 0.12, ease: EASE }}>
          <SpotlightCard color="217 70 239" className="flex h-full flex-col justify-between rounded-3xl border border-border bg-bg-secondary p-6 md:p-8">
            <div className="relative mx-auto h-36 w-36" aria-hidden="true">
              <svg viewBox="0 0 140 140" className="ab-orbit absolute inset-0 h-full w-full">
                <circle cx="70" cy="70" r="62" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="2 6" className="text-text-primary" />
                {OFFICES.map((o, i) => {
                  const a = (i / OFFICES.length) * Math.PI * 2 - Math.PI / 2;
                  return <circle key={o.tz} cx={Math.round((70 + Math.cos(a) * 62) * 100) / 100} cy={Math.round((70 + Math.sin(a) * 62) * 100) / 100} r="5" fill={["#6366F1", "#D946EF", "#F59E0B", "#06B6D4", "#10B981"][i % 5]} />;
                })}
              </svg>
              <span className="absolute inset-[34px] grid place-items-center rounded-full border border-accent-primary/20 bg-accent-primary/10 text-accent-primary">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a3 3 0 10-2.83-4M5 11a3 3 0 102.83-4" />
                </svg>
              </span>
            </div>
            <div className="mt-6 text-center">
              <p className="font-brand text-lg font-semibold text-text-primary">{pick({ en: "A team across 5 cities", ru: "Команда в 5 городах", zh: "跨 5 座城市的团队", tr: "5 şehirde bir ekip", ar: "فريق موزّع على 5 مدن" }, language)}</p>
              <p className="mt-2 text-body-sm text-text-secondary">
                {pick({ en: "Multi-discipline team — design, frontend, backend, infrastructure. Full-stack by default.", ru: "Мультидисциплинарная команда — дизайн, фронт, бэк, инфраструктура. Full-stack по умолчанию.", zh: "多学科团队——设计、前端、后端、基础设施。默认全栈。", tr: "Çok disiplinli ekip — tasarım, frontend, backend, altyapı. Varsayılan olarak full-stack.", ar: "فريق متعدد التخصصات — تصميم وواجهات أمامية وخلفية وبنية تحتية. Full-stack بشكل افتراضي." }, language)}
              </p>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>

      {/* Founder note — why we started Anteyko */}
      <motion.figure
        initial={reduced ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative mt-4 overflow-hidden rounded-3xl border border-accent-primary/20 bg-gradient-to-br from-accent-primary/[0.07] via-fuchsia-500/[0.04] to-amber-400/[0.05] p-7 md:p-12"
      >
        <span aria-hidden="true" className="ab-quote-mark pointer-events-none absolute -top-6 right-6 select-none font-brand text-[10rem] leading-none opacity-30 md:right-12 md:text-[14rem]">
          ”
        </span>
        <p className="relative font-mono text-caption font-medium uppercase tracking-[0.18em] text-accent-primary">{pick({ en: "Why we started Anteyko", ru: "Почему мы основали Anteyko", zh: "我们为何创办 Anteyko", tr: "Anteyko'yu neden kurduk", ar: "لماذا أسّسنا Anteyko" }, language)}</p>
        <blockquote className="relative mt-5">
          <ScrollWords text={quote} highlights={quoteHl} className="text-body-lg leading-relaxed text-text-primary md:text-[1.35rem] md:leading-[1.6]" dim={0.2} />
        </blockquote>
        <figcaption className="relative mt-6 flex items-center gap-3 text-body-sm text-text-tertiary">
          <motion.span
            aria-hidden="true"
            className="h-px w-10 origin-left bg-gradient-to-r from-indigo-500 to-fuchsia-500"
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          />
          {pick({ en: "Bekjan Ergeshov, Founder & CEO", ru: "Бекжан Эргешов, основатель и CEO", zh: "Bekjan Ergeshov，创始人兼 CEO", tr: "Bekjan Ergeshov, Kurucu ve CEO", ar: "بيكجان إرغيشوف، المؤسس والرئيس التنفيذي" }, language)}
        </figcaption>
      </motion.figure>
    </div>
  );
}
