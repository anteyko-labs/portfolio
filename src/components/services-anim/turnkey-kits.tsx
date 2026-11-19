"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { INTL_LOCALE, pick, type Language } from "@/lib/i18n-text";
import { Section, AnimatedItem } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/link";
import { EXTRA_SERVICES, KITS, SYSTEM_FLOW, type Kit } from "@/lib/turnkey-kits";

const SOM: Record<Language, string> = { ru: "сом", en: "KGS", zh: "索姆", tr: "KGS", ar: "سوم" };

const fmt = (n: number, lang: Language) => new Intl.NumberFormat(INTL_LOCALE[lang]).format(n);
const som = (n: number, lang: Language) => `${fmt(n, lang)} ${SOM[lang]}`;

function kitPrice(kit: Kit, lang: Language) {
  const prefix = kit.priceKind === "from" ? pick({ ru: "от", en: "from", zh: "起", tr: "başlayan", ar: "من" }, lang) : "≈";
  if (lang === "zh") return kit.priceKind === "from" ? `${som(kit.price, lang)} 起` : `≈ ${som(kit.price, lang)}`;
  if (lang === "tr" && kit.priceKind === "from") return `${som(kit.price, lang)}'dan`;
  return `${prefix} ${som(kit.price, lang)}`;
}

export function KitCard({ kit }: { kit: Kit }) {
  const { language: lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const name = (n: Kit["lines"][number]["name"]) => (typeof n === "string" ? n : pick(n, lang));

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-bg-primary p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-heading-sm font-semibold text-text-primary">{pick(kit.title, lang)}</h3>
          <p className="mt-1 text-body-sm text-text-secondary">{pick(kit.forWhom, lang)}</p>
        </div>
        <div className="shrink-0 rounded-xl bg-accent-primary px-3 py-2 text-right text-white">
          <p className="whitespace-nowrap text-body-md font-semibold">{kitPrice(kit, lang)}</p>
          <p className="text-[11px] opacity-80">{pick({ ru: "под ключ", en: "turnkey", zh: "交钥匙", tr: "anahtar teslim", ar: "تسليم مفتاح" }, lang)}</p>
        </div>
      </div>

      <p className="mt-4 text-body-sm text-text-secondary">{pick(kit.note, lang)}</p>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-4 inline-flex items-center gap-1.5 self-start text-body-sm font-medium text-accent-primary hover:underline"
      >
        {open
          ? pick({ ru: "Скрыть состав", en: "Hide breakdown", zh: "收起明细", tr: "Dökümü gizle", ar: "إخفاء التفاصيل" }, lang)
          : pick({ ru: "Состав и цены", en: "Breakdown and prices", zh: "明细与价格", tr: "Döküm ve fiyatlar", ar: "التفاصيل والأسعار" }, lang)}
        <svg viewBox="0 0 20 20" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-body-sm">
            <thead>
              <tr className="border-b border-border text-left text-caption uppercase tracking-wider text-text-tertiary">
                <th className="py-2 pr-3 font-medium">{pick({ ru: "Состав", en: "Item", zh: "项目", tr: "Kalem", ar: "البند" }, lang)}</th>
                <th className="py-2 px-2 text-right font-medium">{pick({ ru: "Кол-во", en: "Qty", zh: "数量", tr: "Adet", ar: "الكمية" }, lang)}</th>
                <th className="py-2 pl-2 text-right font-medium">{pick({ ru: "Сумма", en: "Total", zh: "合计", tr: "Tutar", ar: "المجموع" }, lang)}</th>
              </tr>
            </thead>
            <tbody>
              {kit.lines.map((l, i) => (
                <tr key={i} className="border-b border-border/60 align-top">
                  <td className="py-2 pr-3 text-text-secondary">
                    {name(l.name)}
                    {l.est ? <span className="text-text-tertiary">*</span> : null}
                  </td>
                  <td className="py-2 px-2 text-right tabular-nums text-text-secondary">{l.qty}</td>
                  <td className="py-2 pl-2 text-right tabular-nums text-text-primary whitespace-nowrap">{fmt(l.qty * l.price, lang)}</td>
                </tr>
              ))}
              <tr>
                <td className="py-2 pr-3 font-semibold text-text-primary" colSpan={2}>
                  {pick({ ru: "Итого", en: "Total", zh: "总计", tr: "Toplam", ar: "الإجمالي" }, lang)}
                </td>
                <td className="py-2 pl-2 text-right font-semibold tabular-nums text-text-primary whitespace-nowrap">≈ {som(kit.total, lang)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-auto pt-5">
        <ButtonLink href={`/contact?package=${kit.packageId ?? kit.id}`} buttonVariant="secondary" size="sm">
          {pick({ ru: "Рассчитать для моего объекта", en: "Quote for my site", zh: "为我的场所报价", tr: "Mekânım için fiyat al", ar: "احسب لموقعي" }, lang)}
        </ButtonLink>
      </div>
    </article>
  );
}

function PriceFootnote() {
  const { language: lang } = useLanguage();
  return (
    <p className="mt-6 text-caption text-text-tertiary">
      {pick(
        {
          ru: "Цены для Кыргызстана: оборудование — розница delta.kg, ноябрь 2026; * — средние рыночные, уточняются после осмотра. Точная смета — после бесплатного выезда. Возможна рассрочка и поэтапная установка.",
          en: "Prices for Kyrgyzstan: hardware at delta.kg retail, November 2026; * — average market price, refined after the survey. Exact quote after a free site visit. Instalments and staged installation available.",
          zh: "吉尔吉斯斯坦价格：设备按 delta.kg 零售价（2026 年 11 月）；* 为市场均价，现场勘查后确认。免费上门后出具准确报价，可分期、分阶段安装。",
          tr: "Kırgızistan fiyatları: ekipman delta.kg perakende, Kasım 2026; * — ortalama piyasa fiyatı, keşiften sonra netleşir. Kesin teklif ücretsiz keşiften sonra. Taksit ve aşamalı kurulum mümkün.",
          ar: "أسعار قيرغيزستان: المعدات بسعر التجزئة في delta.kg، نوفمبر 2026؛ * — متوسط سعر السوق ويُحدَّد بعد المعاينة. التسعير الدقيق بعد زيارة مجانية. يتوفر التقسيط والتركيب على مراحل.",
        },
        lang
      )}
    </p>
  );
}

/** On a service page: the turnkey kits that belong to it */
export function ServiceKits({ packageId }: { packageId: string }) {
  const { language: lang } = useLanguage();
  const kits = KITS.filter((k) => k.packageId === packageId);
  if (!kits.length) return null;
  return (
    <Section background="primary" padding="lg">
      <h2 className="text-heading-lg font-semibold text-text-primary">
        {pick({ ru: "Готовые пакеты под ключ", en: "Turnkey kits", zh: "交钥匙套装", tr: "Anahtar teslim paketler", ar: "باقات جاهزة متكاملة" }, lang)}
      </h2>
      <p className="mt-2 max-w-2xl text-body-md text-text-secondary">
        {pick({ ru: "Оборудование, монтаж и наше ПО — с понятной ценой в сомах.", en: "Hardware, installation and our software — with a clear price in som.", zh: "设备、安装与我们的软件——以索姆明码标价。", tr: "Ekipman, kurulum ve yazılımımız — som cinsinden net fiyatla.", ar: "المعدات والتركيب وبرنامجنا — بسعر واضح بالسوم." }, lang)}
      </p>
      <div className={`mt-8 grid gap-6 ${kits.length > 1 ? "lg:grid-cols-2" : "max-w-2xl"}`}>
        {kits.map((k, i) => (
          <AnimatedItem key={k.id} delay={i * 0.06} className="h-full">
            <KitCard kit={k} />
          </AnimatedItem>
        ))}
      </div>
      <PriceFootnote />
    </Section>
  );
}

/** On /services: security & automation kits, how the blocks connect, and smaller extras */
export function TurnkeySection() {
  const { language: lang } = useLanguage();
  return (
    <Section id="turnkey" background="primary" padding="lg">
      <p className="font-mono text-caption uppercase tracking-[0.16em] text-accent-primary">
        {pick({ ru: "Безопасность и автоматизация объектов", en: "Security & site automation", zh: "安防与场所自动化", tr: "Güvenlik ve tesis otomasyonu", ar: "الأمن وأتمتة المنشآت" }, lang)}
      </p>
      <h2 className="mt-2 text-display-sm font-semibold text-text-primary">
        {pick({ ru: "Пакеты под ключ с ценами", en: "Turnkey kits with prices", zh: "带价格的交钥匙套装", tr: "Fiyatlı anahtar teslim paketler", ar: "باقات متكاملة بالأسعار" }, lang)}
      </h2>
      <p className="mt-3 max-w-3xl text-body-lg text-text-secondary">
        {pick(
          {
            ru: "Камеры, СКУД, шлагбаумы, оплата и своё ПО. Ставим, подключаем и связываем в одну систему, которая работает сама — без лишних людей и разных программ. Въезд работает даже без интернета.",
            en: "Cameras, access control, barriers, payments and our own software. We install, connect and tie it all into one system that runs itself — no extra staff, no separate programs. Entry works even without internet.",
            zh: "摄像头、门禁、道闸、支付和自研软件。我们安装、连接并整合为一个自动运行的系统——无需额外人员和多套软件。断网也能正常进出。",
            tr: "Kameralar, geçiş kontrolü, bariyerler, ödeme ve kendi yazılımımız. Kurar, bağlar ve kendi kendine çalışan tek bir sistemde birleştiririz — fazladan personel ve ayrı programlar olmadan. Giriş internet olmadan da çalışır.",
            ar: "كاميرات وتحكّم في الدخول وحواجز ومدفوعات وبرنامجنا الخاص. نركّب ونربط كل شيء في نظام واحد يعمل ذاتيًا — دون موظفين إضافيين أو برامج متفرقة. الدخول يعمل حتى دون إنترنت.",
          },
          lang
        )}
      </p>

      {/* how the blocks connect */}
      <ol className="mt-8 flex flex-wrap items-center gap-2">
        {SYSTEM_FLOW.map((s, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary px-3.5 py-1.5 text-body-sm text-text-primary">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-accent-primary text-[11px] font-semibold text-white">{i + 1}</span>
              {pick(s, lang)}
            </span>
            {i < SYSTEM_FLOW.length - 1 && <span aria-hidden="true" className="text-text-tertiary rtl:rotate-180">→</span>}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {KITS.map((k, i) => (
          <AnimatedItem key={k.id} delay={(i % 3) * 0.06} className="h-full">
            <KitCard kit={k} />
          </AnimatedItem>
        ))}
      </div>
      <PriceFootnote />

      <h3 className="mt-16 text-heading-lg font-semibold text-text-primary">
        {pick({ ru: "Ещё что можем предложить", en: "What else we offer", zh: "更多服务", tr: "Sunabileceğimiz diğer hizmetler", ar: "ما نقدّمه أيضًا" }, lang)}
      </h3>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXTRA_SERVICES.map((x, i) => (
          <li key={i} className="rounded-2xl border border-border bg-bg-secondary p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-body-md font-semibold text-text-primary">{pick(x.title, lang)}</p>
              <p className="shrink-0 whitespace-nowrap text-body-sm font-semibold text-accent-primary">
                {x.from
                  ? `${pick({ ru: "от", en: "from", zh: "", tr: "", ar: "من" }, lang)} ${som(x.from, lang)}${x.monthly ? pick({ ru: "/мес", en: "/mo", zh: "/月", tr: "/ay", ar: "/شهر" }, lang) : ""}`.trim()
                  : pick({ ru: "по проекту", en: "per project", zh: "按项目", tr: "projeye göre", ar: "حسب المشروع" }, lang)}
              </p>
            </div>
            <p className="mt-2 text-body-sm text-text-secondary">{pick(x.text, lang)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
