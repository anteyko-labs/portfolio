"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { PageHero } from "@/components/sections/page-hero";
import { AccordionItem } from "@/components/ui/accordion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { DrawCheck, EASE, SpotlightCard, Stagger } from "@/components/motion/kit";
import { ArchitectureScene, DevOpsScene, MvpScene, TrainerTerminal } from "@/components/incubator/scenes";
import { ApplyForm, TelegramIcon } from "@/components/incubator/apply-form";

export const CHANNEL_URL = "https://t.me/anteykolabs";

type T = { en: string; ru: string };

export function IncubatorContent() {
  const { language } = useLanguage();
  const lang: "en" | "ru" = language === "ru" ? "ru" : "en";
  const tx = useCallback((v: T) => v[lang], [lang]);
  const reduced = useReducedMotion();

  const toForm = () => document.getElementById("apply")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });

  return (
    <>
      <PageHero
        align="left"
        eyebrow={tx({ en: "IT incubator · free for students", ru: "IT-инкубатор · бесплатно для студентов" })}
        title={tx({ en: "Learn on real engineering tasks", ru: "Учитесь на настоящих инженерных задачах" })}
        subtitle={tx({
          en: "Free trainers in system architecture, DevOps and MVP from the team that builds products for clients. Then help with your first job.",
          ru: "Бесплатные тренажёры по системной архитектуре, DevOps и MVP от команды, которая делает продукты для клиентов. Потом помощь с первой работой.",
        })}
        rightSlot={<TrainerTerminal tx={tx} lang={lang} />}
      />
      <HeroActions tx={tx} onApply={toForm} />

      <Directions tx={tx} lang={lang} />
      <Path tx={tx} />
      <Career tx={tx} />
      <Audience tx={tx} />

      <section id="apply" className="scroll-mt-24 bg-bg-secondary py-16 sm:py-24">
        <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>{tx({ en: "Application", ru: "Заявка" })}</Eyebrow>
            <h2 className="mt-3 font-brand text-heading-xl font-semibold tracking-tight">{tx({ en: "Tell us about yourself", ru: "Расскажите о себе" })}</h2>
            <p className="mt-4 max-w-md text-body-lg text-text-secondary">
              {tx({ en: "We read every application and write back to get acquainted. No tests at the entrance.", ru: "Читаем каждую заявку и пишем, чтобы познакомиться. Вступительных тестов нет." })}
            </p>
            <ul className="mt-8 space-y-3 text-body-md text-text-secondary">
              {[
                { en: "Free of charge", ru: "Бесплатно" },
                { en: "Any year and major", ru: "Любой курс и специальность" },
                { en: "Online and in our Bishkek office", ru: "Онлайн и в офисе в Бишкеке" },
              ].map((x, i) => (
                <li key={x.en} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
                    <DrawCheck delay={0.1 * i} className="h-3.5 w-3.5" />
                  </span>
                  {tx(x)}
                </li>
              ))}
            </ul>
          </div>
          <ApplyForm tx={tx} channelUrl={CHANNEL_URL} />
        </div>
      </section>

      <Faq tx={tx} />
      <Channel tx={tx} />
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

function HeroActions({ tx, onApply }: { tx: (v: T) => string; onApply: () => void }) {
  return (
    <div className="relative bg-[#06060B] pb-14">
      <div className="container mx-auto flex flex-wrap items-center gap-3 px-4 sm:px-6 lg:px-8">
        <MagneticButton>
          <button type="button" onClick={onApply} className="home-cta-glow rounded-xl bg-white px-6 py-3.5 text-body-md font-semibold text-[#0A0A0A] transition hover:bg-white/90">
            {tx({ en: "Apply", ru: "Подать заявку" })} →
          </button>
        </MagneticButton>
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3.5 text-body-md text-white/80 transition hover:border-white/40 hover:text-white">
          <TelegramIcon className="h-4 w-4" />
          {tx({ en: "Telegram channel", ru: "Telegram-канал" })}
        </a>
      </div>
    </div>
  );
}

/* ── Directions: three tracks, each with a playable scene ── */

function Directions({ tx, lang }: { tx: (v: T) => string; lang: "en" | "ru" }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const tracks = [
    {
      key: "arch",
      name: tx({ en: "System architecture", ru: "Системная архитектура" }),
      text: tx({ en: "How real systems hold the load: balancers, caches, queues, databases. You design, a mentor reviews.", ru: "Как настоящие системы держат нагрузку: балансировщики, кэши, очереди, базы. Вы проектируете, ментор разбирает." }),
      points: [tx({ en: "System design cases", ru: "Кейсы по system design" }), tx({ en: "Trade-offs and bottlenecks", ru: "Компромиссы и узкие места" }), tx({ en: "Diagram reviews", ru: "Разбор ваших схем" })],
      scene: <ArchitectureScene tx={tx} />,
    },
    {
      key: "devops",
      name: "DevOps",
      text: tx({ en: "From git push to production: containers, CI/CD, monitoring and rollback, as we do it on client projects.", ru: "От git push до продакшена: контейнеры, CI/CD, мониторинг и откат, как мы делаем это на клиентских проектах." }),
      points: ["Docker, CI/CD", tx({ en: "Cloud and servers", ru: "Облако и серверы" }), tx({ en: "Monitoring and incidents", ru: "Мониторинг и инциденты" })],
      scene: <DevOpsScene tx={tx} />,
    },
    {
      key: "mvp",
      name: "MVP",
      text: tx({ en: "How to turn an idea into a product people use: cut the scope, ship in weeks, learn from users.", ru: "Как превратить идею в продукт, которым пользуются: урезать лишнее, выпустить за недели, учиться у пользователей." }),
      points: [tx({ en: "Scope and priorities", ru: "Объём и приоритеты" }), tx({ en: "Launch in 4 weeks", ru: "Запуск за 4 недели" }), tx({ en: "Metrics after launch", ru: "Метрики после запуска" })],
      scene: <MvpScene tx={tx} lang={lang} />,
    },
  ];
  const t = tracks[active];

  return (
    <section className="section-dark py-16 sm:py-24">
      <div aria-hidden="true" className="home-aurora home-aurora--violet pointer-events-none absolute inset-0 -z-10 opacity-40" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead dark eyebrow={tx({ en: "Three tracks", ru: "Три направления" })} title={tx({ en: "Try a trainer right here", ru: "Попробуйте тренажёр прямо здесь" })} sub={tx({ en: "Each scene below is clickable. This is how the tasks in the incubator feel.", ru: "Каждая сцена ниже кликабельна. Примерно так ощущаются задачи в инкубаторе." })} />

        <div role="tablist" aria-label={tx({ en: "Tracks", ru: "Направления" })} className="mt-10 inline-flex flex-wrap gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1">
          {tracks.map((tr, i) => (
            <button key={tr.key} role="tab" aria-selected={i === active} onClick={() => setActive(i)} className={`relative rounded-xl px-4 py-2.5 text-body-sm font-medium transition-colors sm:px-5 ${i === active ? "text-white" : "text-white/55 hover:text-white/80"}`}>
              {i === active && <motion.span layoutId={reduced ? undefined : "inc-tab"} className="absolute inset-0 rounded-xl bg-indigo-500/25 ring-1 ring-indigo-400/50" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative">{tr.name}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={t.key} role="tabpanel" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }} className="mt-8 grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
            <div>
              <h3 className="font-brand text-heading-lg font-semibold text-white">{t.name}</h3>
              <p className="mt-3 text-body-lg text-white/65">{t.text}</p>
              <ul className="mt-6 space-y-3">
                {t.points.map((p, i) => (
                  <li key={p} className="flex items-center gap-3 text-body-md text-white/80">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                      <DrawCheck delay={0.15 + i * 0.1} className="h-3.5 w-3.5" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            {t.scene}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── Path: a line that fills as you scroll ── */

function Path({ tx }: { tx: (v: T) => string }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const steps = [
    { t: { en: "Application", ru: "Заявка" }, d: { en: "Two minutes on the form below.", ru: "Две минуты на форму ниже." } },
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
    <section className="py-16 sm:py-24">
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

/* ── Telegram channel ── */

function Channel({ tx }: { tx: (v: T) => string }) {
  const reduced = useReducedMotion();
  return (
    <section className="pb-20 sm:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="group relative isolate flex flex-col items-start gap-6 overflow-hidden rounded-3xl bg-[#06060B] p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10 opacity-60" />
          <div className="max-w-xl">
            <Eyebrow dark>Telegram</Eyebrow>
            <h2 className="mt-3 font-brand text-heading-lg font-semibold">{tx({ en: "Anteyko Labs channel", ru: "Telegram-канал Anteyko Labs" })}</h2>
            <p className="mt-3 text-body-md text-white/60">{tx({ en: "Tasks, breakdowns of real projects and incubator news.", ru: "Задачи, разборы реальных проектов и новости инкубатора." })}</p>
          </div>
          <div className="relative flex items-center gap-4">
            <motion.span
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#229ED9] shadow-[0_20px_40px_-15px_rgba(34,158,217,0.8)]"
              animate={reduced ? undefined : { y: [0, -6, 0], rotate: [0, -4, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <TelegramIcon className="h-8 w-8 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </motion.span>
            <span className="rounded-xl bg-white px-5 py-3 text-body-md font-semibold text-[#0A0A0A] transition group-hover:bg-white/90">@anteykolabs →</span>
          </div>
        </a>
      </div>
    </section>
  );
}
