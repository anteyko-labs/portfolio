"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { pick, type L } from "@/lib/i18n-text";

// Animated scenes for client products: shown on the catalog card and, for
// items with `heroScene`, large at the top of the case page. Real screens
// sit in the middle; everything around them is decoration that tells what
// the product does. Styles live in globals.css (ak-*, av-*, an-*).

type SceneProps = { active: boolean };

/* ── AKMOU ─────────────────────────────────────────────────────────────
   The real hero is three vertical clips side by side. Here they become a
   lookbook triptych: on hover the panels part and fold like a screen, each
   frame pulls into focus in turn (the site's own effect) and the shot under
   the pointer stays sharp while its neighbours soften. */

const AKMOU_COVER = "/images/showcase/akmou/cover.jpg";
const AKMOU_LANGS = ["EN", "RU", "DE", "PL"];

export function AkmouScene({ active }: SceneProps) {
  const { language } = useLanguage();
  return (
    <div className="ak-scene @container absolute inset-0 overflow-hidden bg-[#EFEAE3]" data-active={active} aria-hidden="true">
      <div className="ak-spread absolute inset-0 flex [perspective:1400px]">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`ak-panel ak-panel--${i} relative h-full flex-1 overflow-hidden`} style={{ ["--i" as string]: i }}>
            {/* the full cover, three panels wide; each panel is a window on its own third.
                Anchoring and scaling around that third keeps the neighbouring clip out of view. */}
            <div className="ak-shot absolute inset-y-0 w-[300%]" style={{ left: `${-100 * i}%`, transformOrigin: `${((2 * i + 1) * 100) / 6}% 50%` }}>
              <Image src={AKMOU_COVER} alt="" fill sizes="1600px" className="object-cover" style={{ objectPosition: `${i * 50}% 50%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* every text is kept in four languages */}
      <div className="ak-card absolute bottom-[6%] left-[4%] flex items-center gap-[0.6cqw] rounded-full bg-white/90 p-[0.6cqw] shadow-lg backdrop-blur">
        {AKMOU_LANGS.map((l, i) => (
          <span
            key={l}
            className="ak-lang rounded-full px-[1.4cqw] py-[0.5cqw] font-sans text-[clamp(8px,1.5cqw,13px)] font-medium tracking-[0.18em]"
            style={{ animationDelay: `${i * 1.2}s` }}
          >
            {l}
          </span>
        ))}
      </div>

      {/* the floating request bar from the model page */}
      <div className="ak-card ak-cta absolute bottom-[6%] right-[4%] flex items-center gap-[1.2cqw] bg-[#0A0A0A] px-[2cqw] py-[1.1cqw] font-sans text-[clamp(8px,1.5cqw,13px)] uppercase tracking-[0.2em] text-white shadow-xl">
        {pick({ en: "Request this model", ru: "Запросить модель", zh: "询问此款", tr: "Bu modeli talep et", ar: "اطلب هذا الموديل" }, language)}
        <span aria-hidden="true">→</span>
      </div>
    </div>
  );
}

/* ── Avtodom ───────────────────────────────────────────────────────────
   The owner's dashboard in 3D; the till printer pushes out an oil-change
   receipt that ends with the car's next change (the oil log); oil stock in
   litres drains by a canister; the till goes offline and catches up. */

export function AvtodomScene({ active }: SceneProps) {
  const { language } = useLanguage();
  const t = (l: L) => pick(l, language);
  const km = t({ en: "km", ru: "км", zh: "km", tr: "km", ar: "كم" });
  const lines: [string, string][] = [
    ["Toyota 0W-20 · 4L", "3 600"],
    [t({ en: "Oil filter", ru: "Фильтр масляный", zh: "机油滤芯", tr: "Yağ filtresi", ar: "فلتر الزيت" }), "450"],
    [t({ en: "Air filter", ru: "Фильтр воздушный", zh: "空气滤芯", tr: "Hava filtresi", ar: "فلتر الهواء" }), "950"],
    [t({ en: "Air filter change", ru: "Замена фильтра", zh: "更换滤芯", tr: "Filtre değişimi", ar: "تغيير الفلتر" }), "100"],
  ];
  return (
    <div
      className="av-scene @container absolute inset-0 overflow-hidden"
      data-active={active}
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(circle at 80% 14%, rgba(2,132,199,0.55), transparent 42%), radial-gradient(circle at 10% 92%, rgba(4,120,87,0.5), transparent 40%), linear-gradient(135deg, #0B1220 0%, #0F172A 55%, #13233F 100%)",
      }}
    >
      <div className="av-grid absolute inset-0" />

      {/* owner's 30-day summary */}
      <div className="absolute inset-0 [perspective:1400px]">
        <div className="av-window absolute left-[5%] top-[13%] w-[62%] overflow-hidden rounded-[1.2cqw] bg-[#F1F5F9] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75)] ring-1 ring-white/10">
          <div className="flex h-[2.6cqw] items-center gap-[0.6cqw] bg-[#0F172A] px-[1.2cqw]">
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
              <i key={c} className="aspect-square w-[0.9cqw] rounded-full" style={{ background: c }} />
            ))}
          </div>
          <div className="relative aspect-[16/10]">
            <Image src="/images/showcase/avtodom/cover.jpg" alt="" fill sizes="(max-width: 768px) 70vw, 900px" className="object-cover object-left-top" />
            <span className="av-glare pointer-events-none absolute inset-0" />
          </div>
        </div>
      </div>

      {/* till printer and the receipt coming out of it */}
      <div className="absolute right-[4%] top-[5%] w-[28%]">
        <div className="relative z-10 flex h-[3.4cqw] items-center justify-end rounded-[0.9cqw] bg-[#1E293B] px-[1cqw] shadow-xl ring-1 ring-white/10">
          <span className="absolute inset-x-[8%] bottom-[18%] h-[0.35cqw] rounded-full bg-black/70" />
          <span className="av-led mb-[1cqw] aspect-square w-[0.8cqw] rounded-full bg-emerald-400" />
        </div>
        <div className="av-roll relative mx-[7%] -mt-[0.6cqw] overflow-hidden pb-[2cqw]">
          <div className="av-paper bg-white px-[1.4cqw] pb-[2.2cqw] pt-[1.6cqw] font-mono text-[clamp(6px,1.05cqw,14px)] leading-[1.6] text-[#0F172A] [&>p]:truncate [&>p]:whitespace-nowrap">
            <p className="text-center font-bold tracking-[0.2em]">AVTODOM</p>
            <p className="text-center text-[#64748B]">{t({ en: "Oil change · service", ru: "Замена масла · в сервис", zh: "换油 · 进店服务", tr: "Yağ değişimi · servis", ar: "تغيير الزيت · خدمة" })}</p>
            <p className="my-[0.5cqw] border-t border-dashed border-[#94A3B8]" />
            {lines.map(([name, sum]) => (
              <p key={name} className="flex justify-between gap-[1cqw]">
                <span className="truncate">{name}</span>
                <span className="shrink-0 tabular-nums">{sum}</span>
              </p>
            ))}
            <p className="my-[0.5cqw] border-t border-dashed border-[#94A3B8]" />
            <p className="flex justify-between font-bold">
              <span>{t({ en: "TOTAL", ru: "ИТОГО", zh: "合计", tr: "TOPLAM", ar: "الإجمالي" })}</span>
              <span className="shrink-0 tabular-nums">5 100 {t({ en: "som", ru: "с", zh: "索姆", tr: "som", ar: "سوم" })}</span>
            </p>
            <p className="mt-[0.6cqw] text-[#64748B]">01KG 606 XHT · 66 700 {km}</p>
            <p className="mt-[0.4cqw] rounded-[0.4cqw] bg-[#E0F2FE] px-[0.6cqw] py-[0.3cqw] font-bold text-[#0369A1]">
              {t({ en: "Next change", ru: "Следующая замена", zh: "下次更换", tr: "Sonraki değişim", ar: "التغيير التالي" })}: 74 700 {km}
            </p>
          </div>
        </div>
      </div>

      {/* oil stock in litres: canisters and pouring come from one stock */}
      <div className="av-card absolute bottom-[7%] left-[4%] w-[31%] rounded-[1.2cqw] bg-white/95 p-[1.6cqw] shadow-2xl backdrop-blur">
        <p className="font-mono text-[clamp(6px,1.1cqw,13px)] uppercase tracking-wider text-[#0284C7]">
          {t({ en: "Oil in stock", ru: "Остаток масла", zh: "机油库存", tr: "Yağ stoku", ar: "مخزون الزيت" })}
        </p>
        <p className="mt-[0.4cqw] text-[clamp(8px,1.8cqw,22px)] font-bold leading-tight text-[#0F172A]">Toyota 0W-20 SP</p>
        <div className="mt-[1cqw] h-[1cqw] overflow-hidden rounded-full bg-[#E2E8F0]">
          <span className="av-level block h-full rounded-full bg-gradient-to-r from-[#047857] to-[#10B981]" />
        </div>
        <div className="relative mt-[0.7cqw] flex items-center justify-between text-[clamp(7px,1.4cqw,17px)] font-semibold tabular-nums text-[#0F172A]">
          <span>{t({ en: "100.1 L", ru: "100,1 л", zh: "100.1 升", tr: "100,1 L", ar: "100.1 لتر" })}</span>
          <span className="av-pour rounded-full bg-[#FEE2E2] px-[0.8cqw] text-[#B91C1C]">−4 {t({ en: "L", ru: "л", zh: "升", tr: "L", ar: "لتر" })}</span>
        </div>
      </div>

      {/* the till keeps selling offline and catches up */}
      <div className="av-card absolute bottom-[8.5%] left-[38%] grid rounded-full bg-[#0F172A]/90 px-[1.6cqw] py-[0.9cqw] text-[clamp(7px,1.35cqw,16px)] font-medium text-white shadow-xl ring-1 ring-white/15 backdrop-blur">
        <span className="av-net av-net--off col-start-1 row-start-1 flex items-center gap-[0.8cqw]">
          <i className="aspect-square w-[0.9cqw] rounded-full bg-amber-400" />
          {t({ en: "Offline · receipt queued", ru: "Нет сети · чек в очереди", zh: "离线 · 小票排队中", tr: "Çevrimdışı · fiş kuyrukta", ar: "دون اتصال · الإيصال في الطابور" })}
        </span>
        <span className="av-net av-net--on col-start-1 row-start-1 flex items-center gap-[0.8cqw]">
          <i className="aspect-square w-[0.9cqw] rounded-full bg-emerald-400" />
          {t({ en: "Synced · 3 receipts", ru: "Отправлено · 3 чека", zh: "已同步 · 3 张小票", tr: "Gönderildi · 3 fiş", ar: "تمت المزامنة · 3 إيصالات" })}
        </span>
      </div>
    </div>
  );
}

/* ── AnarMarket ────────────────────────────────────────────────────────
   The buyer's phone (catalog with the cart) in front of a delivered order;
   a supplier's invoice photo is scanned into request lines for Microinvest;
   the weight card shows ordered vs actual weight — the invoice follows the
   scale, not the order. */

const ANAR_FLOAT = [
  { e: "🥔", x: "8%", y: "70%", d: 0 },
  { e: "🧅", x: "30%", y: "86%", d: -1.4 },
  { e: "🥕", x: "88%", y: "12%", d: -2.2 },
  { e: "🍅", x: "44%", y: "8%", d: -0.8 },
  { e: "🥒", x: "92%", y: "46%", d: -3 },
  { e: "🍋", x: "36%", y: "48%", d: -1.9 },
];

export function AnarMarketScene({ active }: SceneProps) {
  const { language } = useLanguage();
  const t = (l: L) => pick(l, language);
  const kg = t({ en: "kg", ru: "кг", zh: "公斤", tr: "kg", ar: "كغ" });
  const rows: [string, string][] = [
    [t({ en: "Potatoes", ru: "Картофель", zh: "土豆", tr: "Patates", ar: "بطاطس" }), "300"],
    [t({ en: "Onions", ru: "Лук репчатый", zh: "洋葱", tr: "Soğan", ar: "بصل" }), "200"],
    [t({ en: "Carrots", ru: "Морковь", zh: "胡萝卜", tr: "Havuç", ar: "جزر" }), "150"],
  ];
  return (
    <div
      className="an-scene @container absolute inset-0 overflow-hidden"
      data-active={active}
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(circle at 20% 22%, #F2C14E 0%, transparent 38%), radial-gradient(circle at 84% 80%, #7BB661 0%, transparent 42%), radial-gradient(circle at 82% 14%, #E8553A 0%, transparent 30%), linear-gradient(135deg, #3A0D14 0%, #6B1A26 55%, #A8323F 100%)",
      }}
    >
      <div className="gm-sheen absolute inset-0" />

      {ANAR_FLOAT.map((f) => (
        <span
          key={f.e}
          className="an-float absolute select-none leading-none drop-shadow-[0_10px_12px_rgba(0,0,0,0.3)]"
          style={{ left: f.x, top: f.y, animationDelay: `${f.d}s`, fontSize: "clamp(16px, 5.5cqw, 52px)" }}
        >
          {f.e}
        </span>
      ))}

      {/* buyer's phone in front of a delivered order */}
      <div className="absolute inset-y-0 left-[44%] right-[4%] flex items-center justify-center [perspective:1100px]">
        <div className="an-phone an-phone--back absolute aspect-[390/844] h-[96%] overflow-hidden rounded-[2.2cqw] border-[0.5cqw] border-[#140A0C] bg-[#140A0C]">
          <Image src="/images/showcase/anarmarket/phone-3.jpg" alt="" fill sizes="240px" className="object-cover object-top" />
        </div>
        <div className="an-phone an-phone--front relative aspect-[390/844] h-[108%] overflow-hidden rounded-[2.4cqw] border-[0.6cqw] border-[#140A0C] bg-[#140A0C] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
          <Image src="/images/showcase/anarmarket/phone-1.jpg" alt="" fill sizes="260px" className="object-cover object-top" />
          <span className="gm-glare pointer-events-none absolute inset-0" />
        </div>
      </div>

      {/* supplier's invoice photo → request lines for Microinvest */}
      <div className="an-card absolute left-[4%] top-[15%] w-[40%] rounded-[1.4cqw] bg-white/95 p-[1.5cqw] shadow-2xl backdrop-blur">
        <p className="font-mono text-[clamp(6px,1.1cqw,13px)] uppercase tracking-wider text-[#6B1A26]">
          {t({ en: "Invoice photo · AI", ru: "Фото накладной · ИИ", zh: "发票照片 · AI", tr: "Fatura fotoğrafı · YZ", ar: "صورة الفاتورة · ذكاء اصطناعي" })}
        </p>
        <div className="mt-[1cqw] flex gap-[1.4cqw]">
          <div className="relative aspect-[3/4] w-[30%] shrink-0 -rotate-3 overflow-hidden rounded-[0.4cqw] bg-[#FBFAF7] p-[0.7cqw] shadow-md ring-1 ring-black/10">
            {[90, 70, 80, 60, 85, 55, 75].map((w, i) => (
              <span key={i} className="mb-[0.55cqw] block h-[0.35cqw] rounded-full bg-[#CBD5E1]" style={{ width: `${w}%` }} />
            ))}
            <span className="absolute bottom-[8%] right-[10%] aspect-square w-[28%] rounded-full border-[0.25cqw] border-[#6366F1]/50" />
            <span className="an-scan absolute inset-x-0 top-0 h-[18%]" />
          </div>
          <ul className="min-w-0 flex-1 space-y-[0.5cqw] text-[clamp(7px,1.35cqw,16px)] text-[#2A1A1D]">
            {rows.map(([name, qty], i) => (
              <li key={name} className="an-row flex items-center gap-[0.6cqw]" style={{ animationDelay: `${0.5 + i * 0.45}s` }}>
                <span className="grid aspect-square w-[1.6cqw] shrink-0 place-items-center rounded-full bg-[#4F7A2F] text-[0.9cqw] text-white">✓</span>
                <span className="truncate">{name}</span>
                <span className="ml-auto shrink-0 font-semibold tabular-nums">
                  {qty} {kg}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="an-row mt-[1cqw] inline-flex rounded-full bg-[#6B1A26] px-[1.2cqw] py-[0.4cqw] text-[clamp(7px,1.25cqw,15px)] font-semibold text-white" style={{ animationDelay: "1.9s" }}>
          → Microinvest · {t({ en: "supplier order", ru: "заявка поставщику", zh: "供应商采购单", tr: "tedarikçi siparişi", ar: "طلب مورّد" })}
        </p>
      </div>

      {/* ordered vs actual weight */}
      <div className="an-card an-card--low absolute bottom-[8%] left-[4%] w-[34%] rounded-[1.4cqw] bg-white/95 p-[1.5cqw] shadow-2xl backdrop-blur">
        <p className="font-mono text-[clamp(6px,1.1cqw,13px)] uppercase tracking-wider text-[#4F7A2F]">
          ⚖ {t({ en: "Actual weight", ru: "Вес по факту", zh: "实际重量", tr: "Gerçek ağırlık", ar: "الوزن الفعلي" })}
        </p>
        <div className="mt-[0.6cqw] flex items-baseline gap-[1cqw] text-[#2A1A1D]">
          <span className="text-[clamp(8px,1.6cqw,19px)]">{t({ en: "Potatoes", ru: "Картошка", zh: "土豆", tr: "Patates", ar: "بطاطس" })}</span>
          <span className="relative ml-auto text-[clamp(8px,1.6cqw,19px)] tabular-nums text-[#94A3B8]">
            60
            <span className="an-strike absolute left-[-10%] top-1/2 h-[0.2cqw] w-[120%] origin-left bg-[#B91C1C]" />
          </span>
          <span className="an-weight inline-block text-[clamp(10px,2.4cqw,30px)] font-bold tabular-nums">
            {t({ en: "59.449", ru: "59,449", zh: "59.449", tr: "59,449", ar: "59.449" })} {kg}
          </span>
        </div>
      </div>
    </div>
  );
}

export const CLIENT_SCENES: Record<string, (p: SceneProps) => React.ReactElement> = {
  akmou: AkmouScene,
  avtodom: AvtodomScene,
  anarmarket: AnarMarketScene,
};
