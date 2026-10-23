"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { useReducedMotion } from "@/lib/hooks";
import { Section } from "@/components/ui/section";
import { EASE, SpotlightCard, Stagger } from "@/components/motion/kit";
import { PKG_COLOR } from "./visual-frame";
import type { ServiceDetail } from "@/lib/service-details/types";

// The long part of a service page: what it is, how the work goes, what it can do,
// and the questions buyers ask. Every animation runs once, when its block scrolls
// into view, so nothing keeps ticking on a phone.

function Heading({ eyebrow, title, color }: { eyebrow: string; title: string; color: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 inline-flex items-center gap-2 font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: `rgb(${color})` }} />
        {eyebrow}
      </p>
      <h2 className="font-brand text-3xl font-semibold tracking-[-0.02em] text-text-primary md:text-4xl">{title}</h2>
    </div>
  );
}

/* ───────────── Intro and stack ───────────── */

function Intro({ detail, color }: { detail: ServiceDetail; color: string }) {
  const { language } = useLanguage();
  return (
    <Section background="primary" padding="lg">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <Heading eyebrow={pick({ en: "About the service", ru: "Об услуге", zh: "服务介绍", tr: "Hizmet hakkında", ar: "عن الخدمة" }, language)} title={pick({ en: "What it solves", ru: "Какую задачу решаем", zh: "解决什么问题", tr: "Neyi çözüyoruz", ar: "ما الذي نحلّه" }, language)} color={color} />
          <p className="-mt-4 max-w-2xl text-body-lg leading-relaxed text-text-secondary">{pick(detail.intro, language)}</p>
        </div>
        <div>
          <p className="mb-4 font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary">
            {pick({ en: "Technologies", ru: "Технологии", zh: "技术栈", tr: "Teknolojiler", ar: "التقنيات" }, language)}
          </p>
          <Stagger as="ul" className="flex flex-wrap gap-2" gap={0.05} y={10}>
            {detail.stack.map((s) => (
              <span key={s} className="inline-flex rounded-full border border-border bg-bg-secondary px-3.5 py-1.5 text-body-sm text-text-primary" style={{ boxShadow: `inset 0 0 0 1px rgb(${color} / 0.12)` }}>
                {s}
              </span>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}

/* ───────────── How the work goes: a line draws across, stages light up in turn ───────────── */

function Steps({ detail, color }: { detail: ServiceDetail; color: string }) {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const n = detail.steps.length;
  return (
    <Section background="secondary" padding="lg">
      <Heading eyebrow={pick({ en: "Process", ru: "Процесс", zh: "流程", tr: "Süreç", ar: "العملية" }, language)} title={pick({ en: "How the work goes", ru: "Как проходит работа", zh: "工作如何进行", tr: "Çalışma nasıl ilerliyor", ar: "كيف يسير العمل" }, language)} color={color} />
      <motion.ol className="relative grid gap-8 md:grid-cols-4 md:gap-6" initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, margin: "-80px" }}>
        {/* the track: horizontal on desktop, vertical on phones */}
        <span aria-hidden="true" className="absolute left-[19px] top-2 bottom-2 w-px bg-border md:left-5 md:right-5 md:top-[19px] md:bottom-auto md:h-px md:w-auto" />
        <motion.span
          aria-hidden="true"
          className="absolute left-[19px] top-2 bottom-2 w-px origin-top md:hidden"
          style={{ background: `rgb(${color})` }}
          variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.35 * n, ease: "linear" } } }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute left-5 right-5 top-[19px] hidden h-px origin-left md:block"
          style={{ background: `linear-gradient(90deg, rgb(${color}), #A855F7)` }}
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.35 * n, ease: "linear" } } }}
        />
        {detail.steps.map((s, i) => (
          <motion.li
            key={i}
            className="relative flex gap-5 md:block"
            variants={{ hidden: { opacity: 0.35 }, show: { opacity: 1, transition: { duration: 0.4, delay: 0.35 * i } } }}
          >
            <motion.span
              className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border font-mono text-body-sm font-semibold"
              variants={{
                hidden: { scale: 0.8, backgroundColor: "rgba(0,0,0,0)", color: `rgb(${color})`, borderColor: `rgb(${color} / 0.35)` },
                show: { scale: 1, backgroundColor: `rgb(${color})`, color: "#ffffff", borderColor: `rgb(${color})`, transition: { duration: 0.35, delay: 0.35 * i, ease: EASE } },
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </motion.span>
            <div className="md:mt-5">
              <h3 className="text-heading-sm font-semibold text-text-primary">{pick(s.title, language)}</h3>
              <p className="mt-2 text-body-md text-text-secondary">{pick(s.text, language)}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}

/* ───────────── Capabilities ───────────── */

function Features({ detail, color }: { detail: ServiceDetail; color: string }) {
  const { language } = useLanguage();
  return (
    <Section background="primary" padding="lg">
      <Heading eyebrow={pick({ en: "Capabilities", ru: "Возможности", zh: "功能", tr: "Özellikler", ar: "الإمكانات" }, language)} title={pick({ en: "What you get in detail", ru: "Что вы получаете — подробно", zh: "详细交付内容", tr: "Ayrıntılı olarak neler alıyorsunuz", ar: "ما تحصل عليه بالتفصيل" }, language)} color={color} />
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
        {detail.features.map((f, i) => (
          <SpotlightCard key={i} color={color} className="h-full rounded-2xl border border-border bg-bg-secondary p-6">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-caption tracking-[0.16em]" style={{ color: `rgb(${color})` }}>{String(i + 1).padStart(2, "0")}</span>
              <motion.span
                aria-hidden="true"
                className="h-1 w-10 origin-right rounded-full"
                style={{ background: `linear-gradient(90deg, rgb(${color} / 0.2), rgb(${color}))` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.06, ease: EASE }}
              />
            </div>
            <h3 className="text-heading-sm font-semibold text-text-primary">{pick(f.title, language)}</h3>
            <p className="mt-2 text-body-md text-text-secondary">{pick(f.text, language)}</p>
          </SpotlightCard>
        ))}
      </Stagger>
    </Section>
  );
}

/* ───────────── Questions ───────────── */

function Faq({ detail, color }: { detail: ServiceDetail; color: string }) {
  const { language } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section background="secondary" padding="lg">
      <Heading eyebrow="FAQ" title={pick({ en: "Questions about this service", ru: "Вопросы об этой услуге", zh: "关于此服务的问题", tr: "Bu hizmetle ilgili sorular", ar: "أسئلة حول هذه الخدمة" }, language)} color={color} />
      <ul className="max-w-3xl divide-y divide-border rounded-2xl border border-border bg-bg-primary">
        {detail.faq.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={i}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-body-lg font-medium text-text-primary"
                >
                  {pick(f.q, language)}
                  <motion.span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border" animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? `rgb(${color})` : "rgba(0,0,0,0)", color: isOpen ? "#fff" : `rgb(${color})` }} transition={{ duration: 0.25 }}>
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 3v10M3 8h10" /></svg>
                  </motion.span>
                </button>
              </h3>
              {/* Always in the HTML, so crawlers read every answer; only the height animates */}
              <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-body-md text-text-secondary">{pick(f.a, language)}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

export function ServiceDeepDive({ id, detail }: { id: string; detail: ServiceDetail }) {
  const color = PKG_COLOR[id] ?? "99 102 241";
  return (
    <>
      <Intro detail={detail} color={color} />
      <Steps detail={detail} color={color} />
      <Features detail={detail} color={color} />
      <Faq detail={detail} color={color} />
    </>
  );
}
