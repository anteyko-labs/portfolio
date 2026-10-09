"use client";

import Image from "next/image";
import clsx from "clsx";
import { useLanguage } from "@/lib/language-context";

// Card scene for Go Market. The phone shows the app's real screen; everything
// around it is decoration: groceries fly into the cart, the installment plan
// fills up part by part. On hover the phone turns to face the viewer.

const ITEMS = [
  { e: "🍎", from: "-44cqw -30cqw", delay: 0 },
  { e: "🥑", from: "46cqw -26cqw", delay: -0.6 },
  { e: "🍋", from: "-48cqw 10cqw", delay: -1.2 },
  { e: "🥛", from: "48cqw 6cqw", delay: -1.8 },
  { e: "🍇", from: "-20cqw -40cqw", delay: -2.4 },
  { e: "🥕", from: "24cqw -40cqw", delay: -3.0 },
  { e: "🍞", from: "-50cqw -10cqw", delay: -3.6 },
  { e: "🍓", from: "40cqw 24cqw", delay: -4.2 },
];

export function GoMarketScene({ active }: { active: boolean }) {
  const { language } = useLanguage();
  const en = language === "en";
  return (
    <div
      className="gm-scene @container absolute inset-0 overflow-hidden"
      data-active={active}
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(circle at 18% 22%, #FFE45C 0%, transparent 38%), radial-gradient(circle at 86% 78%, #FF9F43 0%, transparent 42%), radial-gradient(circle at 80% 15%, #FF6B6B 0%, transparent 30%), linear-gradient(135deg, #C6F57A 0%, #63D471 55%, #2FB463 100%)",
      }}
    >
      {/* soft light sweeping across the stage */}
      <div className="gm-sheen absolute inset-0" />

      <div className="absolute inset-0 flex items-center justify-center [perspective:1100px]">
        {/* second screen behind, for depth */}
        <div className="gm-phone gm-phone--back absolute aspect-[390/844] h-[104%] overflow-hidden rounded-[22px] border-[5px] border-[#0A0A0A] bg-[#0A0A0A]">
          <Image src="/images/showcase/go-market/phone-2.jpg" alt="" fill sizes="220px" className="object-cover object-top" />
        </div>

        <div className="gm-phone gm-phone--front relative aspect-[390/844] h-[112%] overflow-hidden rounded-[24px] border-[6px] border-[#0A0A0A] bg-[#0A0A0A] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
          <Image src="/images/showcase/go-market/phone-1.jpg" alt="" fill sizes="240px" className="object-cover object-top" />
          <span className="gm-glare pointer-events-none absolute inset-0" />
        </div>

        {/* groceries flying into the cart */}
        <div className="absolute left-1/2 top-[58%] h-0 w-0">
          {ITEMS.map((it, i) => (
            <span
              key={i}
              className="gm-fly absolute -translate-x-1/2 -translate-y-1/2 select-none leading-none drop-shadow-[0_10px_12px_rgba(0,0,0,0.28)]"
              style={{ ["--from" as string]: it.from, animationDelay: `${it.delay}s`, fontSize: "clamp(20px, 7cqw, 58px)" }}
            >
              {it.e}
            </span>
          ))}
          <span className="gm-cart absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-xl" style={{ width: "clamp(36px, 9cqw, 72px)", height: "clamp(36px, 9cqw, 72px)", fontSize: "clamp(18px, 4.5cqw, 36px)" }}>
            🛒
          </span>
        </div>
      </div>

      {/* installment plan filling part by part */}
      <div className="gm-card absolute left-[5%] top-[12%] w-[30%] min-w-[130px] rounded-2xl bg-white/90 p-[2.2cqw] shadow-xl backdrop-blur">
        <p className="font-mono text-[clamp(8px,1.6cqw,13px)] uppercase tracking-wider text-[#0062CC]">{en ? "Installments" : "Рассрочка"}</p>
        <p className="mt-[0.6cqw] text-[clamp(11px,2.6cqw,22px)] font-bold leading-tight text-[#1C1C1E]">{en ? "4 payments" : "4 платежа"}</p>
        <div className="mt-[1.4cqw] flex gap-[0.8cqw]">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-[clamp(4px,1cqw,8px)] flex-1 overflow-hidden rounded-full bg-[#E5E7EB]">
              <span className="gm-pay block h-full rounded-full bg-[#00A700]" style={{ animationDelay: `${i * 0.45}s` }} />
            </span>
          ))}
        </div>
      </div>

      {/* order assembled */}
      <div className={clsx("gm-card gm-card--right absolute bottom-[10%] right-[5%] flex items-center gap-[1.4cqw] rounded-2xl bg-white/90 px-[2cqw] py-[1.6cqw] shadow-xl backdrop-blur")}>
        <span className="grid aspect-square w-[clamp(18px,4cqw,34px)] place-items-center rounded-full bg-[#00A700] text-[clamp(10px,2cqw,18px)] text-white">✓</span>
        <span className="text-[clamp(10px,2.2cqw,18px)] font-semibold text-[#1C1C1E]">{en ? "Order packed" : "Заказ собран"}</span>
      </div>
    </div>
  );
}
