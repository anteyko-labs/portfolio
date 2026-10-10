"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { EASE, useLoop } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";
import "./misc-anim.css";
import { useLanguage } from "@/lib/language-context";
import { type Language, pick } from "@/lib/i18n-text";

// Motion pieces for /contact: the hero inbox scene, the mode tabs, the form
// progress meter, the animated "what happens next" flow and the success burst.

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/* ───────────────────────── Hero: brief → estimate ───────────────────────── */

/** A looping inbox: a brief lands, an engineer reads it, an estimate is built and sent */
export function ContactHeroScene() {
  const { language } = useLanguage();
  const { ref, tick, run } = useLoop<HTMLDivElement>(1100);
  const c = run ? tick % 7 : 5;
  const bars = [
    { l: pick({ en: "Design", ru: "Дизайн", zh: "设计", tr: "Tasarım", ar: "التصميم" }, language), w: 0.32, v: pick({ en: "2 wk", ru: "2 нед", zh: "2 周", tr: "2 hf", ar: "أسبوعان" }, language) },
    { l: pick({ en: "Build", ru: "Разработка", zh: "开发", tr: "Geliştirme", ar: "البناء" }, language), w: 0.86, v: pick({ en: "6 wk", ru: "6 нед", zh: "6 周", tr: "6 hf", ar: "6 أسابيع" }, language) },
    { l: pick({ en: "Launch", ru: "Запуск", zh: "上线", tr: "Lansman", ar: "الإطلاق" }, language), w: 0.2, v: pick({ en: "1 wk", ru: "1 нед", zh: "1 周", tr: "1 hf", ar: "أسبوع" }, language) },
  ];
  const shown = (from: number) => c >= from;

  return (
    <div ref={ref} data-run={run} className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B14] p-5 text-white sm:p-6">
      <div aria-hidden="true" className="ms-orb pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl" />
      <div aria-hidden="true" className="ms-orb pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" style={{ animationDelay: "-6s" }} />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">inbox · anteyko</p>
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="ms-ping absolute inset-0 rounded-full bg-emerald-400" />
          <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
        </span>
      </div>

      <div className="relative mt-5 space-y-3" aria-hidden="true">
        {/* 1 — brief arrives */}
        <motion.div
          animate={{ opacity: shown(0) ? 1 : 0, x: shown(0) ? 0 : 24 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 font-mono text-[11px] text-white/80">{pick({ en: "You", ru: "Вы", zh: "您", tr: "Siz", ar: "أنت" }, language)}</span>
          <div className="min-w-0 flex-1">
            <p className="text-body-sm font-semibold">{pick({ en: "New brief", ru: "Новый бриф", zh: "新需求", tr: "Yeni brief", ar: "طلب جديد" }, language)}</p>
            <p className="truncate font-mono text-[11px] text-white/45">{pick({ en: "MVP · web app · Web3 module", ru: "MVP · веб-приложение · Web3", zh: "MVP · Web 应用 · Web3 模块", tr: "MVP · web uygulaması · Web3 modülü", ar: "MVP · تطبيق ويب · وحدة Web3" }, language)}</p>
          </div>
          <span className="rounded-full bg-indigo-400/15 px-2 py-0.5 font-mono text-[10px] text-indigo-200">{pick({ en: "new", ru: "новый", zh: "新", tr: "yeni", ar: "جديد" }, language)}</span>
        </motion.div>

        {/* 2 — an engineer reads it */}
        <motion.div
          animate={{ opacity: shown(1) ? 1 : 0.25 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 font-brand text-sm font-semibold">A</span>
          <div className="min-w-0 flex-1">
            <p className="text-body-sm font-semibold">{pick({ en: "Engineer on it", ru: "Инженер изучает", zh: "工程师已接手", tr: "Mühendis ilgileniyor", ar: "مهندس يتولى الأمر" }, language)}</p>
            <p className="font-mono text-[11px] text-white/45">{shown(2) ? (pick({ en: "scope · risks · stages ✓", ru: "объём · риски · этапы ✓", zh: "范围 · 风险 · 阶段 ✓", tr: "kapsam · riskler · aşamalar ✓", ar: "النطاق · المخاطر · المراحل ✓" }, language)) : pick({ en: "reading the brief", ru: "читает бриф", zh: "正在阅读需求", tr: "brief okunuyor", ar: "قراءة الطلب" }, language)}</p>
          </div>
          {shown(1) && !shown(2) ? (
            <span className="ms-typing inline-flex gap-1 text-indigo-200">
              <span />
              <span />
              <span />
            </span>
          ) : (
            <span className={`text-emerald-300 transition-opacity duration-300 ${shown(2) ? "opacity-100" : "opacity-0"}`}>✓</span>
          )}
        </motion.div>

        {/* 3 — estimate by stage */}
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <div className="mb-2.5 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">{pick({ en: "estimate", ru: "оценка", zh: "报价", tr: "teklif", ar: "تقدير" }, language)}</p>
            <p className="font-mono text-[10px] text-white/45">{pick({ en: "by stage", ru: "по этапам", zh: "分阶段", tr: "aşamalara göre", ar: "حسب المرحلة" }, language)}</p>
          </div>
          <div className="space-y-2">
            {bars.map((b, i) => (
              <div key={b.l} className="grid grid-cols-[5.5rem_1fr_2.5rem] items-center gap-2">
                <span className="truncate text-[12px] text-white/70">{b.l}</span>
                <span className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.span
                    className="block h-full origin-left rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-300"
                    style={{ width: `${Math.round(b.w * 100)}%` }}
                    animate={{ scaleX: shown(2) ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: shown(2) && c === 2 ? i * 0.18 : 0, ease: EASE }}
                  />
                </span>
                <motion.span animate={{ opacity: shown(3) ? 1 : 0 }} className="text-right font-mono text-[11px] text-white/60">
                  {b.v}
                </motion.span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 — sent */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 font-mono text-[11px] text-white/50">
            <svg viewBox="0 0 20 20" className="h-5 w-5 -rotate-90">
              <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
              <motion.circle
                cx="10"
                cy="10"
                r="8"
                fill="none"
                stroke="#A5B4FC"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ pathLength: Math.min(1, (c + 1) / 6) }}
                transition={{ duration: 0.9, ease: "linear" }}
              />
            </svg>
            {pick({ en: "reply < 24h", ru: "ответ < 24 ч", zh: "24 小时内回复", tr: "yanıt < 24 sa", ar: "الرد خلال أقل من 24 ساعة" }, language)}
          </div>
          <motion.span
            animate={{ opacity: shown(4) ? 1 : 0, scale: shown(4) ? 1 : 0.85, y: shown(4) ? 0 : 6 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-[12px] font-medium text-emerald-300"
          >
            ✓ {pick({ en: "Estimate sent", ru: "Оценка отправлена", zh: "报价已发送", tr: "Teklif gönderildi", ar: "تم إرسال التقدير" }, language)}
          </motion.span>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── Mode tabs ───────────────────────────── */

function TabIcon({ kind, active }: { kind: "brief" | "call"; active: boolean }) {
  if (kind === "brief") {
    return (
      <motion.svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" animate={active ? { rotate: [0, -12, 0] } : { rotate: 0 }} transition={{ duration: 0.5 }}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" />
      </motion.svg>
    );
  }
  return (
    <motion.svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" animate={active ? { rotate: [0, -14, 12, -8, 0] } : { rotate: 0 }} transition={{ duration: 0.6 }}>
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />
    </motion.svg>
  );
}

/** Two tabs with a dark pill that slides between them */
export function ModeTabs<T extends string>({ value, onChange, options, label }: { value: T; onChange: (v: T) => void; options: { value: T; label: string; icon: "brief" | "call" }[]; label: string }) {
  return (
    <div role="tablist" aria-label={label} className="relative mb-6 grid grid-cols-2 gap-1 rounded-2xl border border-border bg-bg-tertiary/70 p-1 sm:inline-grid">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={`relative z-10 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-center text-body-sm font-medium transition-colors sm:px-5 ${active ? "text-white" : "text-text-secondary hover:text-text-primary"}`}
          >
            {active && (
              <motion.span
                layoutId="ms-contact-mode"
                className="absolute inset-0 -z-10 overflow-hidden rounded-xl bg-[#0B0B14] shadow-[0_10px_30px_-12px_rgba(79,70,229,0.8)]"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              >
                <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(99,102,241,0.55),transparent_55%),radial-gradient(120%_120%_at_100%_100%,rgba(217,70,239,0.35),transparent_55%)]" />
              </motion.span>
            )}
            <TabIcon kind={o.icon} active={active} />
            <span className="leading-tight">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ───────────────────────────── Progress ───────────────────────────── */

/** Step indicator + gradient bar that springs to the completion value */
export function FormProgress({ step, completion }: { step: number; completion: number }) {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const spring = useSpring(completion, { stiffness: 120, damping: 22 });
  const pct = useTransform(spring, (v) => `${Math.round(v)}%`);
  useEffect(() => {
    spring.set(completion);
  }, [completion, spring]);
  const done = completion >= 100;
  const labels = pick({ en: ["Contacts", "Project"], ru: ["Контакты", "Проект"], zh: ["联系方式", "项目"], tr: ["İletişim", "Proje"], ar: ["جهات الاتصال", "المشروع"] }, language);

  return (
    <div className="mb-7">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {labels.map((l, i) => {
            const n = i + 1;
            const on = step >= n;
            return (
              <div key={l} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="relative h-px w-6 overflow-hidden bg-border sm:w-10" aria-hidden="true">
                    <motion.span className="absolute inset-0 origin-left bg-accent-primary" animate={{ scaleX: step >= 2 ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.5, ease: EASE }} />
                  </span>
                )}
                <motion.span
                  animate={{ scale: step === n && !reduced ? [1, 1.12, 1] : 1 }}
                  transition={{ duration: 0.45 }}
                  className={`grid h-6 w-6 place-items-center rounded-full font-mono text-[10px] font-bold transition-colors duration-300 ${on ? "bg-accent-primary text-white shadow-[0_0_0_4px_rgba(99,102,241,0.15)]" : "bg-bg-tertiary text-text-tertiary"}`}
                >
                  {step > n ? "✓" : n}
                </motion.span>
                <span className={`hidden text-caption transition-colors sm:inline ${on ? "text-text-primary" : "text-text-tertiary"}`}>{l}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 text-caption text-text-tertiary">
          <span>{pick({ en: `Step ${step} of 2`, ru: `Шаг ${step} из 2`, zh: `第 ${step} 步，共 2 步`, tr: `Adım ${step} / 2`, ar: `الخطوة ${step} من 2` }, language)}</span>
          <span aria-hidden="true">·</span>
          <motion.span className={`tabular-nums font-semibold ${done ? "text-emerald-600" : "text-text-primary"}`}>{reduced ? `${completion}%` : pct}</motion.span>
        </div>
      </div>
      <div className="relative h-2 rounded-full bg-bg-tertiary">
        <motion.div
          role="progressbar"
          aria-valuenow={completion}
          aria-valuemin={0}
          aria-valuemax={100}
          className={`ms-sheen relative h-full rounded-full ${done ? "bg-gradient-to-r from-emerald-400 to-teal-400" : "bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400"}`}
          initial={false}
          animate={{ width: `${completion}%` }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 110, damping: 20 }}
        />
        {completion > 0 && (
          <motion.span
            aria-hidden="true"
            className={`pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_14px_rgba(168,85,247,0.8)] ${done ? "bg-emerald-400" : "bg-fuchsia-500"}`}
            initial={false}
            animate={{ left: `${completion}%` }}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 110, damping: 20 }}
          />
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── What happens next ───────────────────────── */

/** Numbered steps on a line that draws itself; a comet travels 01 → 02 → 03 */
export function NextStepsFlow({ items }: { items: { title: string; description?: string }[] }) {
  const { ref, tick, run, reduced } = useLoop<HTMLOListElement>(1500);
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);
  const [pos, setPos] = useState<number[]>([]);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  useIsoLayoutEffect(() => {
    const measure = () => {
      const ol = ref.current;
      if (!ol) return;
      const base = ol.getBoundingClientRect().top;
      setPos(nodes.current.map((n) => (n ? Math.round(n.getBoundingClientRect().top - base + n.offsetHeight / 2) : 0)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [items.length, ref]);

  const last = items.length - 1;
  const phase = run ? tick % (items.length + 1) : -1;
  const active = phase < 0 ? -1 : Math.min(phase, last);
  const top = pos[0] ?? 0;
  const bottom = pos[last] ?? 0;

  return (
    <ol ref={ref} data-run={run} className="relative space-y-5">
      {/* rail */}
      <span aria-hidden="true" className="absolute left-4 w-px -translate-x-1/2 bg-border" style={{ top, height: Math.max(0, bottom - top) }} />
      <motion.span
        aria-hidden="true"
        className="absolute left-4 w-[2px] origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-500 via-fuchsia-500 to-amber-400"
        style={{ top, height: Math.max(0, bottom - top) }}
        initial={reduced ? false : { scaleY: 0 }}
        animate={inView || reduced ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
      />
      {run && pos.length === items.length && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-0 z-20 -ml-[5px] -mt-[5px] h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_0_4px_rgba(217,70,239,0.35),0_0_18px_6px_rgba(129,140,248,0.75)]"
          initial={false}
          animate={{ y: pos[active] ?? 0, opacity: phase === items.length ? 0 : 1 }}
          transition={{ y: { duration: active === 0 ? 0 : 0.9, ease: EASE }, opacity: { duration: 0.35 } }}
        />
      )}
      {items.map((item, i) => {
        const on = i === active;
        return (
          <motion.li
            key={`${item.title}-${i}`}
            className="relative flex items-start gap-4"
            initial={reduced ? false : { opacity: 0, x: 12 }}
            animate={inView || reduced ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 + i * 0.15, ease: EASE }}
          >
            <span
              ref={(el) => {
                nodes.current[i] = el;
              }}
              className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border font-mono text-caption font-semibold transition-all duration-500 ${on ? "scale-110 border-transparent bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-[0_8px_24px_-6px_rgba(168,85,247,0.8)]" : "border-accent-primary/40 bg-bg-primary text-accent-primary"}`}
            >
              {on && <span aria-hidden="true" className="ms-ping absolute inset-0 rounded-full bg-fuchsia-400/40" />}
              <span className="relative">{String(i + 1).padStart(2, "0")}</span>
            </span>
            <div className="pt-1">
              <p className={`text-body-sm font-medium transition-colors duration-500 ${on ? "text-accent-primary" : "text-text-primary"}`}>{item.title}</p>
              {item.description && <p className="mt-1 text-caption text-text-secondary">{item.description}</p>}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}

/* ───────────────────────────── Live desk ───────────────────────────── */

/** "Engineers online" chip with stacked avatars and typing dots */
export function LiveDesk() {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const reduced = useReducedMotion();
  const run = inView && !reduced;
  const people = [
    { l: "A", c: "from-indigo-500 to-violet-500" },
    { l: "D", c: "from-fuchsia-500 to-pink-500" },
    { l: "K", c: "from-amber-400 to-orange-500" },
  ];
  return (
    <div ref={ref} data-run={run} className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 backdrop-blur">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex shrink-0 -space-x-2" aria-hidden="true">
          {people.map((p, i) => (
            <span key={p.l} className={`ms-float grid h-7 w-7 place-items-center rounded-full border-2 border-[#0B0B14] bg-gradient-to-br ${p.c} text-[11px] font-semibold text-white`} style={{ animationDelay: `${i * -1.2}s` }}>
              {p.l}
            </span>
          ))}
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-caption font-medium text-white">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="ms-ping absolute inset-0 rounded-full bg-emerald-400" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {pick({ en: "Engineers online", ru: "Инженеры на связи", zh: "工程师在线", tr: "Çevrimiçi mühendisler", ar: "المهندسون متصلون" }, language)}
          </p>
          <p className="truncate text-[11px] text-white/50">{pick({ en: "replying to briefs now", ru: "сейчас отвечают на брифы", zh: "正在回复需求", tr: "şu an brief'leri yanıtlıyor", ar: "يردّون على الطلبات الآن" }, language)}</p>
        </div>
      </div>
      <span className="ms-typing inline-flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-2.5 py-1.5 text-indigo-200" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </div>
  );
}

/* ───────────────────────────── Success ───────────────────────────── */

const CONFETTI = Array.from({ length: 22 }, (_, i) => {
  const a = (i / 22) * Math.PI * 2 + (i % 2 ? 0.12 : -0.08);
  const d = 74 + (i % 4) * 16;
  return {
    x: Math.round(Math.cos(a) * d),
    y: Math.round(Math.sin(a) * d),
    r: (i * 47) % 360,
    c: ["#6366F1", "#D946EF", "#FBBF24", "#22D3EE", "#34D399"][i % 5],
    w: i % 3 === 0 ? 10 : 6,
  };
});

/** Check mark drawn inside an emerald disc, rings and a confetti burst */
export function SuccessBurst() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // The success view replaces the long form, so bring the burst into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < 80 || r.bottom > window.innerHeight) {
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    }
  }, [reduced]);
  return (
    <div ref={ref} className="relative mx-auto mb-8 grid h-28 w-28 place-items-center" aria-hidden="true">
      {!reduced &&
        [0, 1].map((i) => (
          <motion.span key={i} className="absolute inset-0 rounded-full border-2 border-emerald-400/60" initial={{ scale: 0.6, opacity: 0.9 }} animate={{ scale: 1.9, opacity: 0 }} transition={{ duration: 1.4, delay: 0.25 + i * 0.35, ease: "easeOut" }} />
        ))}
      {!reduced &&
        CONFETTI.map((p, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 rounded-[2px]"
            style={{ width: p.w, height: 6, marginLeft: -p.w / 2, marginTop: -3, background: p.c }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
            animate={{ x: p.x, y: [0, p.y, p.y + 24], opacity: [1, 1, 0], scale: 1, rotate: p.r }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      <motion.div
        className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_20px_50px_-12px_rgba(16,185,129,0.7)]"
        initial={reduced ? false : { scale: 0, rotate: -40 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
      >
        <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none">
          <motion.path d="M5 12.5l4.5 4.5L19 7.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.35, ease: EASE }} />
        </svg>
      </motion.div>
    </div>
  );
}
