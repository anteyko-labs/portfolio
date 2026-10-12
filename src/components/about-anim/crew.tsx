"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";
import { EASE } from "@/components/motion/kit";
import { type Language, pick } from "@/lib/i18n-text";
import { RevealTitle } from "./shared";

const STAFF = 56;
const COLS = 8;
const TINTS = ["#818CF8", "#A78BFA", "#F0ABFC", "#22D3EE", "#34D399", "#FBBF24"];

const ROLES = [
  { en: "Product managers", ru: "Продакт-менеджеры", zh: "产品经理", tr: "Ürün yöneticileri", ar: "مديرو المنتجات" },
  { en: "UX/UI designers", ru: "UX/UI-дизайнеры", zh: "UX/UI 设计师", tr: "UX/UI tasarımcıları", ar: "مصممو UX/UI" },
  { en: "Frontend engineers", ru: "Фронтенд-разработчики", zh: "前端工程师", tr: "Frontend mühendisleri", ar: "مهندسو الواجهات الأمامية" },
  { en: "Backend engineers", ru: "Бэкенд-разработчики", zh: "后端工程师", tr: "Backend mühendisleri", ar: "مهندسو الواجهات الخلفية" },
  { en: "Mobile developers", ru: "Мобильные разработчики", zh: "移动端开发", tr: "Mobil geliştiriciler", ar: "مطورو تطبيقات الجوال" },
  { en: "QA engineers", ru: "QA-инженеры", zh: "测试工程师", tr: "QA mühendisleri", ar: "مهندسو ضمان الجودة" },
  { en: "DevOps & support", ru: "DevOps и сопровождение", zh: "DevOps 与运维", tr: "DevOps ve destek", ar: "DevOps والدعم" },
  { en: "Web3 engineers", ru: "Web3-инженеры", zh: "Web3 工程师", tr: "Web3 mühendisleri", ar: "مهندسو Web3" },
  { en: "Analysts", ru: "Аналитики", zh: "分析师", tr: "Analistler", ar: "المحللون" },
];

/**
 * The team in numbers: 56 figures fill the grid in a diagonal wave, then a few
 * at a time "come online" — a nod to five offices across time zones.
 */
export function Crew({ language }: { language: Language }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -15% 0px" }) || reduced;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <RevealTitle
          eyebrow={pick({ en: "Team", ru: "Команда", zh: "团队", tr: "Ekip", ar: "الفريق" }, language)}
          title={pick({ en: "56 people on staff", ru: "56 человек в штате", zh: "56 名全职员工", tr: "56 kadrolu çalışan", ar: "56 موظفًا بدوام كامل" }, language)}
        />
        <motion.p
          className="mt-6 max-w-xl text-body-lg text-text-secondary"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          {pick(
            {
              en: "The whole cycle is in-house: product, design, frontend, backend, mobile, QA, DevOps and Web3. One team takes a product from the first call to launch and keeps it running after.",
              ru: "Весь цикл — внутри команды: продукт, дизайн, фронтенд, бэкенд, мобильная разработка, QA, DevOps и Web3. Одна команда ведёт продукт от первого созвона до запуска и сопровождает после.",
              zh: "完整流程全部由内部团队完成：产品、设计、前端、后端、移动端、测试、DevOps 与 Web3。同一个团队从第一次沟通一直负责到上线，并在上线后持续运维。",
              tr: "Tüm döngü şirket içinde: ürün, tasarım, frontend, backend, mobil, QA, DevOps ve Web3. Tek bir ekip ürünü ilk görüşmeden lansmana taşır ve sonrasında da destekler.",
              ar: "الدورة كاملة داخل الفريق: المنتج والتصميم والواجهة الأمامية والخلفية وتطبيقات الجوال وضمان الجودة وDevOps وWeb3. فريق واحد يقود المنتج من أول مكالمة حتى الإطلاق ويواصل دعمه بعده.",
            },
            language
          )}
        </motion.p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {ROLES.map((r, i) => (
            <motion.li
              key={r.en}
              className="rounded-full border border-border bg-bg-primary px-3.5 py-1.5 text-body-sm text-text-secondary"
              initial={reduced ? false : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.3 + i * 0.05 }}
            >
              {pick(r, language)}
            </motion.li>
          ))}
        </ul>
      </div>

      <div ref={ref} className="ab-crew relative mx-auto w-full max-w-md rounded-3xl border border-border bg-[#0B0B14] p-6 sm:p-8" data-run={shown ? "true" : "false"}>
        <div className="grid gap-2.5 sm:gap-3" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }} aria-hidden="true">
          {Array.from({ length: STAFF }, (_, i) => {
            const row = Math.floor(i / COLS);
            const col = i % COLS;
            const tint = TINTS[(row + col) % TINTS.length];
            return (
              <motion.span
                key={i}
                className="ab-crew-dot mx-auto flex aspect-square w-full max-w-7 flex-col items-center justify-end"
                style={{ color: tint, animationDelay: `${((i * 37) % 56) * 0.11}s` }}
                initial={reduced ? false : { opacity: 0, scale: 0.3, y: 6 }}
                animate={shown ? { opacity: 1, scale: 1, y: 0 } : undefined}
                transition={{ duration: 0.45, delay: (row + col) * 0.05, ease: EASE }}
              >
                <span className="h-[34%] w-[34%] rounded-full bg-current" />
                <span className="mt-[6%] h-[38%] w-[62%] rounded-t-full bg-current" />
              </motion.span>
            );
          })}
        </div>
        <div className="mt-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
          <span>{pick({ en: "In-house team", ru: "Команда в штате", zh: "内部团队", tr: "Şirket içi ekip", ar: "فريق داخلي" }, language)}</span>
          <span className="text-white">{STAFF}</span>
        </div>
      </div>
    </div>
  );
}
