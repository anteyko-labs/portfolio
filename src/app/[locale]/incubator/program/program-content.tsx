"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { Link as NextLink } from "@/i18n/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { AccordionItem } from "@/components/ui/accordion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { EASE, SpotlightCard, Stagger } from "@/components/motion/kit";
import { ArchitectureScene, DevOpsScene, MvpScene, TrainerTerminal } from "@/components/incubator/scenes";

// The interactive part of the incubator, opened by the «Инкубация» button on
// /incubator. Applications are collected back on /incubator#apply.

const APPLY_HREF = "/incubator#apply";

type T = { en: string; ru: string };

export function ProgramContent() {
  const { language } = useLanguage();
  const lang: "en" | "ru" = language === "ru" ? "ru" : "en";
  const tx = useCallback((v: T) => v[lang], [lang]);

  return (
    <>
      <PageHero
        align="left"
        eyebrow={tx({ en: "Incubation · Anteyko Labs", ru: "Инкубация · Anteyko Labs" })}
        title={tx({ en: "Learn on real engineering tasks", ru: "Учитесь на настоящих инженерных задачах" })}
        subtitle={tx({
          en: "Three trainers below are playable. Solve all three missions and see how the incubator feels.",
          ru: "Три тренажёра ниже можно пройти прямо сейчас. Решите все три задачи и почувствуйте, как устроен инкубатор.",
        })}
        backLink={{ href: "/incubator", label: tx({ en: "Incubator", ru: "Инкубатор" }) }}
        rightSlot={<TrainerTerminal tx={tx} lang={lang} />}
      />

      <Directions tx={tx} lang={lang} />
      <Path tx={tx} />
      <Career tx={tx} />
      <Audience tx={tx} />
      <Faq tx={tx} />
      <FinalCta tx={tx} />
    </>
  );
}

/* ── shared bits ── */

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`font-mono text-caption uppercase tracking-[0.18em] ${dark ? "text-indigo-300" : "text-accent-primary"}`}>{children}</p>;
}

function SectionHead({ eyebrow, title, sub, dark }: { eyebrow: string; title: string; sub?: string; dark?: boolean }) {
  return (
    <Stagger className="max-w-3xl">
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2 className={`mt-3 font-brand text-heading-xl font-semibold tracking-tight ${dark ? "text-white" : ""}`}>{title}</h2>
      {sub && <p className={`mt-4 text-body-lg ${dark ? "text-white/60" : "text-text-secondary"}`}>{sub}</p>}
    </Stagger>
  );
}

function ApplyButton({ tx, light }: { tx: (v: T) => string; light?: boolean }) {
  return (
    <MagneticButton>
      <NextLink
        href={APPLY_HREF}
        className={`home-cta-glow inline-block rounded-xl px-6 py-3.5 text-body-md font-semibold transition ${light ? "bg-white text-[#0A0A0A] hover:bg-white/90" : "bg-accent-primary text-white hover:brightness-110"}`}
      >
        {tx({ en: "Apply", ru: "Подать заявку" })} →
      </NextLink>
    </MagneticButton>
  );
}

/* ── Directions: three tracks, each a mission; solve all three for a reward ── */

function Directions({ tx, lang }: { tx: (v: T) => string; lang: "en" | "ru" }) {
  const [active, setActive] = useState(0);
  const [solved, setSolved] = useState<boolean[]>([false, false, false]);
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const solve = useCallback((i: number) => setSolved((s) => (s[i] ? s : s.map((v, k) => (k === i ? true : v)))), []);
  const onArch = useCallback(() => solve(0), [solve]);
  const onDevops = useCallback(() => solve(1), [solve]);
  const onMvp = useCallback(() => solve(2), [solve]);

  const tracks = [
    {
      key: "arch",
      name: tx({ en: "System architecture", ru: "Системная архитектура" }),
      text: tx({ en: "How real systems hold the load: balancers, caches, queues, databases. You design, a mentor reviews.", ru: "Как настоящие системы держат нагрузку: балансировщики, кэши, очереди, базы. Вы проектируете, ментор разбирает." }),
      points: [tx({ en: "System design cases", ru: "Кейсы по system design" }), tx({ en: "Trade-offs and bottlenecks", ru: "Компромиссы и узкие места" }), tx({ en: "Diagram reviews", ru: "Разбор ваших схем" })],
      scene: <ArchitectureScene tx={tx} onSolve={onArch} />,
    },
    {
      key: "devops",
      name: "DevOps",
      text: tx({ en: "From git push to production: containers, CI/CD, monitoring and rollback, as we do it on client projects.", ru: "От git push до продакшена: контейнеры, CI/CD, мониторинг и откат, как мы делаем это на клиентских проектах." }),
      points: ["Docker, CI/CD", tx({ en: "Cloud and servers", ru: "Облако и серверы" }), tx({ en: "Monitoring and incidents", ru: "Мониторинг и инциденты" })],
      scene: <DevOpsScene tx={tx} onSolve={onDevops} />,
    },
    {
      key: "mvp",
      name: "MVP",
      text: tx({ en: "How to turn an idea into a product people use: cut the scope, ship in weeks, learn from users.", ru: "Как превратить идею в продукт, которым пользуются: урезать лишнее, выпустить за недели, учиться у пользователей." }),
      points: [tx({ en: "Scope and priorities", ru: "Объём и приоритеты" }), tx({ en: "Launch in 4 weeks", ru: "Запуск за 4 недели" }), tx({ en: "Metrics after launch", ru: "Метрики после запуска" })],
      scene: <MvpScene tx={tx} lang={lang} onSolve={onMvp} />,
    },
  ];
  const done = solved.filter(Boolean).length;
  const allDone = done === tracks.length;
  const nextOpen = solved.findIndex((s, i) => !s && i !== active);

  const go = (i: number) => {
    setActive(i);
    sectionRef.current?.querySelector("[role=tablist]")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <section ref={sectionRef} className="section-dark relative py-16 sm:py-24">
      <div aria-hidden="true" className="home-aurora home-aurora--violet pointer-events-none absolute inset-0 -z-10 opacity-40" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead dark eyebrow={tx({ en: "Three missions", ru: "Три задачи" })} title={tx({ en: "Try a trainer right here", ru: "Попробуйте тренажёр прямо здесь" })} sub={tx({ en: "Each scene is a small mission. Solve all three and get your incubator pass.", ru: "Каждая сцена — маленькая задача. Решите все три и получите пропуск в инкубатор." })} />

        {/* progress */}
        <div className="mt-8 max-w-md">
          <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
            <span>{tx({ en: "Progress", ru: "Прогресс" })}</span>
            <motion.span key={done} initial={reduced ? false : { scale: 1.4, color: "#6ee7b7" }} animate={{ scale: 1, color: allDone ? "#6ee7b7" : "rgba(255,255,255,0.7)" }} className="tabular-nums">
              {done} / {tracks.length}
            </motion.span>
          </div>
          <div className="flex gap-1.5">
            {tracks.map((tr, i) => (
              <div key={tr.key} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" initial={false} animate={{ width: solved[i] ? "100%" : "0%" }} transition={{ duration: 0.6, ease: EASE }} />
              </div>
            ))}
          </div>
        </div>

        <div role="tablist" aria-label={tx({ en: "Tracks", ru: "Направления" })} className="mt-6 inline-flex scroll-mt-28 flex-wrap gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1">
          {tracks.map((tr, i) => (
            <button key={tr.key} role="tab" aria-selected={i === active} onClick={() => setActive(i)} className={`relative rounded-xl px-4 py-2.5 text-body-sm font-medium transition-colors sm:px-5 ${i === active ? "text-white" : "text-white/55 hover:text-white/80"}`}>
              {i === active && <motion.span layoutId={reduced ? undefined : "inc-tab"} className="absolute inset-0 rounded-xl bg-indigo-500/25 ring-1 ring-indigo-400/50" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative flex items-center gap-1.5">
                <AnimatePresence initial={false}>
                  {solved[i] && (
                    <motion.span initial={{ scale: 0, width: 0 }} animate={{ scale: 1, width: "auto" }} className="text-emerald-300">
                      ✓
                    </motion.span>
                  )}
                </AnimatePresence>
                {tr.name}
              </span>
            </button>
          ))}
        </div>

        {/* Scenes stay mounted so a solved mission keeps its state when you switch tabs */}
        {tracks.map((tr, i) => (
          <motion.div
            key={tr.key}
            role="tabpanel"
            hidden={i !== active}
            initial={false}
            animate={i === active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
            className="mt-8 grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
          >
            <div>
              <h3 className="font-brand text-heading-lg font-semibold text-white">{tr.name}</h3>
              <p className="mt-3 text-body-lg text-white/65">{tr.text}</p>
              <ul className="mt-6 space-y-3">
                {tr.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-body-md text-white/80">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {tr.scene}
              {/* under the scene, so on a phone it shows up right where the mission was solved */}
              <AnimatePresence>
                {i === active && solved[i] && !allDone && nextOpen >= 0 && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={() => go(nextOpen)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3.5 text-body-md font-semibold text-[#06281C] transition hover:bg-emerald-300"
                  >
                    {tx({ en: "Next mission:", ru: "Следующая задача:" })} {tracks[nextOpen].name} →
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        <AnimatePresence>{allDone && <Reward tx={tx} reduced={reduced} />}</AnimatePresence>
      </div>
    </section>
  );
}

function Reward({ tx, reduced }: { tx: (v: T) => string; reduced: boolean }) {
  const bits = Array.from({ length: 28 }, (_, i) => i);
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="relative mt-12 overflow-hidden rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/15 via-indigo-500/10 to-fuchsia-500/15 p-8 text-center sm:p-12"
      role="status"
    >
      {!reduced &&
        bits.map((i) => {
          const a = (i / bits.length) * Math.PI * 2;
          return (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute left-1/2 top-16 h-2 w-2 rounded-sm"
              style={{ background: ["#6366F1", "#D946EF", "#F59E0B", "#10B981"][i % 4] }}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              animate={{ x: Math.cos(a) * (140 + (i % 3) * 50), y: Math.sin(a) * 110 + 60, opacity: 0, rotate: 260 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
            />
          );
        })}
      <motion.div initial={reduced ? false : { scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 240, damping: 14, delay: 0.1 }} className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400 text-3xl">
        🎟
      </motion.div>
      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">{tx({ en: "3 / 3 missions solved", ru: "3 / 3 задачи решены" })}</p>
      <h3 className="mt-2 font-brand text-heading-lg font-semibold text-white">{tx({ en: "You have the incubator pass", ru: "Пропуск в инкубатор ваш" })}</h3>
      <p className="mx-auto mt-3 max-w-lg text-body-md text-white/65">
        {tx({ en: "That was a taste. In the incubator the tasks are bigger and a mentor reviews every solution. One step left: the application.", ru: "Это была проба. В инкубаторе задачи больше, а каждое решение разбирает ментор. Остался один шаг: заявка." })}
      </p>
      <div className="mt-7 flex justify-center">
        <ApplyButton tx={tx} light />
      </div>
    </motion.div>
  );
}

/* ── Path: a line that fills as you scroll ── */

function Path({ tx }: { tx: (v: T) => string }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const steps = [
    { t: { en: "Application", ru: "Заявка" }, d: { en: "Two minutes on the form.", ru: "Две минуты на форму." } },
    { t: { en: "Meeting", ru: "Знакомство" }, d: { en: "A short call: what you know and where you want to go.", ru: "Короткий созвон: что умеете и куда хотите расти." } },
    { t: { en: "Trainers", ru: "Тренажёры" }, d: { en: "Tasks on architecture, DevOps and MVP with mentor reviews.", ru: "Задачи по архитектуре, DevOps и MVP с разбором от менторов." } },
    { t: { en: "Work and IT hub", ru: "Работа и IT-хаб" }, d: { en: "Help with the first job and a community that grows into an IT hub.", ru: "Помощь с первой работой и сообщество, из которого вырастет IT-хаб." } },
  ];
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow={tx({ en: "How it works", ru: "Как это устроено" })} title={tx({ en: "Four steps from application to first job", ru: "Четыре шага от заявки до первой работы" })} />
        <ol ref={ref} className="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
          <span aria-hidden="true" className="absolute left-[15px] top-2 bottom-2 w-px bg-border md:left-0 md:right-0 md:top-[15px] md:bottom-auto md:h-px md:w-auto" />
          <motion.span aria-hidden="true" style={{ scaleY: fill }} className="absolute left-[15px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-indigo-500 to-fuchsia-500 md:hidden" />
          <motion.span aria-hidden="true" style={{ scaleX: fill }} className="absolute left-0 right-0 top-[15px] hidden h-px origin-left bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400 md:block" />
          {steps.map((s, i) => (
            <motion.li key={s.t.en} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }} className="relative pl-12 md:pl-0 md:pt-12">
              <span className="absolute left-0 top-0 flex h-[31px] w-[31px] items-center justify-center rounded-full border border-border bg-bg-primary font-mono text-[12px] text-accent-primary">{i + 1}</span>
              <h3 className="font-brand text-heading-sm font-semibold">{tx(s.t)}</h3>
              <p className="mt-2 text-body-md text-text-secondary">{tx(s.d)}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Career help ── */

function Career({ tx }: { tx: (v: T) => string }) {
  const items = [
    { icon: "cv", t: { en: "CV and GitHub review", ru: "Разбор резюме и GitHub" }, d: { en: "We show what a hiring engineer looks at first.", ru: "Покажем, на что смотрит инженер, который нанимает." } },
    { icon: "mic", t: { en: "Mock interviews", ru: "Пробные собеседования" }, d: { en: "Technical and system design, with honest feedback.", ru: "Техническое и по system design, с честной обратной связью." } },
    { icon: "hand", t: { en: "Recommendations", ru: "Рекомендации" }, d: { en: "We recommend strong graduates to companies we work with.", ru: "Сильных выпускников рекомендуем компаниям, с которыми работаем." } },
  ];
  return (
    <section className="bg-bg-secondary py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow={tx({ en: "Career", ru: "Трудоустройство" })} title={tx({ en: "Help with your first job", ru: "Помогаем с первой работой" })} sub={tx({ en: "We do not promise a job offer. We help you become a candidate who gets one.", ru: "Мы не обещаем оффер. Мы помогаем стать кандидатом, который его получает." })} />
        <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((it) => (
            <SpotlightCard key={it.icon} className="h-full rounded-2xl border border-border bg-bg-primary p-6">
              <CareerIcon kind={it.icon} />
              <h3 className="mt-5 font-brand text-heading-sm font-semibold">{tx(it.t)}</h3>
              <p className="mt-2 text-body-md text-text-secondary">{tx(it.d)}</p>
            </SpotlightCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function CareerIcon({ kind }: { kind: string }) {
  const p = { stroke: "currentColor", strokeWidth: 1.6, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        {kind === "cv" && (<><rect x="5" y="3" width="14" height="18" rx="2" {...p} /><path d="M9 8h6M9 12h6M9 16h3" {...p} /></>)}
        {kind === "mic" && (<><path d="M4 6h16v10H8l-4 4z" {...p} /><path d="M8 10h8M8 13h5" {...p} /></>)}
        {kind === "hand" && (<><circle cx="9" cy="8" r="3" {...p} /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 11l2 2 4-4" {...p} /></>)}
      </svg>
    </span>
  );
}

/* ── Who it is for: tilt cards ── */

function Audience({ tx }: { tx: (v: T) => string }) {
  const items = [
    { e: "🎓", t: { en: "Students of any year", ru: "Студенты любого курса" }, d: { en: "IT and related majors, and those who are switching.", ru: "IT и смежные специальности, и те, кто переходит в IT." } },
    { e: "🧭", t: { en: "Those who want to grow", ru: "Кто хочет расти" }, d: { en: "You know the basics and want real-world tasks.", ru: "Знаете основы и хотите задачи из реальной работы." } },
    { e: "🛠", t: { en: "Builders", ru: "Кто делает своё" }, d: { en: "You have a pet project or a startup idea.", ru: "Есть пет-проект или идея стартапа." } },
    { e: "💼", t: { en: "Job seekers", ru: "Кто ищет работу" }, d: { en: "You want an internship or a first job in IT.", ru: "Хотите стажировку или первую работу в IT." } },
  ];
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead eyebrow={tx({ en: "Who it is for", ru: "Для кого" })} title={tx({ en: "If at least one is about you, apply", ru: "Если хотя бы одно про вас, подавайте заявку" })} />
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <TiltCard key={it.t.en}>
              <span className="inline-block text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12">{it.e}</span>
              <h3 className="mt-4 font-brand text-heading-sm font-semibold">{tx(it.t)}</h3>
              <p className="mt-2 text-body-md text-text-secondary">{tx(it.d)}</p>
            </TiltCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [r, setR] = useState({ x: 0, y: 0 });
  return (
    <div className="h-full [perspective:900px]">
      <motion.div
        onPointerMove={(e) => {
          if (reduced || e.pointerType !== "mouse") return;
          const b = e.currentTarget.getBoundingClientRect();
          setR({ x: ((e.clientY - b.top) / b.height - 0.5) * -10, y: ((e.clientX - b.left) / b.width - 0.5) * 10 });
        }}
        onPointerLeave={() => setR({ x: 0, y: 0 })}
        animate={{ rotateX: r.x, rotateY: r.y }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="group h-full rounded-2xl border border-border bg-bg-primary p-6 transition-shadow hover:shadow-[0_20px_50px_-25px_rgba(79,70,229,0.45)]"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── FAQ ── */

function Faq({ tx }: { tx: (v: T) => string }) {
  const [open, setOpen] = useState<number | null>(0);
  const qa = [
    { q: { en: "Is it really free?", ru: "Это правда бесплатно?" }, a: { en: "Yes. The trainers and the meetings are free for students.", ru: "Да. Тренажёры и встречи для студентов бесплатны." } },
    { q: { en: "I am in my first year. Is it too early?", ru: "Я на первом курсе. Не рано?" }, a: { en: "No. We match tasks to your level, and starting early is an advantage.", ru: "Нет. Задачи подбираем под уровень, а начать рано это преимущество." } },
    { q: { en: "Will you get me a job?", ru: "Вы устроите меня на работу?" }, a: { en: "We do not guarantee hiring. We review your CV and GitHub, run mock interviews and recommend strong graduates to companies we work with.", ru: "Гарантии найма нет. Мы разбираем резюме и GitHub, проводим пробные собеседования и рекомендуем сильных выпускников компаниям, с которыми работаем." } },
    { q: { en: "Online or offline?", ru: "Онлайн или офлайн?" }, a: { en: "Both: tasks online, meetings online and in our Bishkek office.", ru: "И так и так: задачи онлайн, встречи онлайн и в офисе в Бишкеке." } },
    { q: { en: "What happens after I apply?", ru: "Что будет после заявки?" }, a: { en: "We write to you in Telegram or call, get acquainted and suggest where to start.", ru: "Напишем в Telegram или позвоним, познакомимся и подскажем, с чего начать." } },
  ];
  return (
    <section className="bg-bg-secondary py-16 sm:py-24">
      <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <SectionHead eyebrow="FAQ" title={tx({ en: "Questions", ru: "Вопросы" })} />
        <div className="space-y-3">
          {qa.map((x, i) => (
            <AccordionItem key={x.q.en} variant="card" number={String(i + 1).padStart(2, "0")} title={tx(x.q)} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)}>
              <p className="text-body-md text-text-secondary">{tx(x.a)}</p>
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA back to the form ── */

function FinalCta({ tx }: { tx: (v: T) => string }) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative isolate flex flex-col items-start gap-6 overflow-hidden rounded-3xl bg-[#06060B] p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10 opacity-60" />
          <div className="max-w-xl">
            <Eyebrow dark>{tx({ en: "Application", ru: "Заявка" })}</Eyebrow>
            <h2 className="mt-3 font-brand text-heading-lg font-semibold">{tx({ en: "Two minutes, and we will write to you", ru: "Две минуты, и мы вам напишем" })}</h2>
            <p className="mt-3 text-body-md text-white/60">{tx({ en: "Free, any year and major, no entrance tests.", ru: "Бесплатно, любой курс и специальность, без вступительных тестов." })}</p>
          </div>
          <ApplyButton tx={tx} light />
        </div>
      </div>
    </section>
  );
}
