"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Four steps on a line that fills as the section scrolls through the viewport */
export function HomeProcess() {
  const { language } = useLanguage();
  const en = language === "en";
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    { t: en ? "Estimate in 24 hours" : "Оценка за 24 часа", d: en ? "A call, the task in your words, a fixed estimate and a plan by stages." : "Созвон, задача вашими словами, фиксированная оценка и план по этапам." },
    { t: en ? "Design & prototype" : "Дизайн и прототип", d: en ? "Clickable screens before code — you see the product before paying for it." : "Кликабельные экраны до кода — вы видите продукт до того, как платите за разработку." },
    { t: en ? "Build in sprints" : "Разработка спринтами", d: en ? "A demo every week, a recording for everyone who missed it, payment per stage." : "Демо каждую неделю, запись для тех, кто не смог, оплата по этапам." },
    { t: en ? "Launch & support" : "Запуск и поддержка", d: en ? "Deploy, monitoring, analytics — and the code is yours from day one." : "Деплой, мониторинг, аналитика — и код ваш с первого дня." },
  ];

  return (
    <section ref={ref} className="bg-bg-primary py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-caption uppercase tracking-[0.2em] text-text-tertiary">{en ? "How we work" : "Как мы работаем"}</p>
            <h2 className="mt-4 max-w-2xl font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-text-primary md:text-6xl">
              {en ? "No surprises, stage by stage" : "Без сюрпризов, этап за этапом"}
            </h2>
          </div>
          <NextLink href="/process" className="inline-flex items-center gap-2 text-body-md font-medium text-text-primary underline decoration-border underline-offset-4 hover:decoration-text-primary">
            {en ? "The full process" : "Весь процесс"} <span aria-hidden="true">→</span>
          </NextLink>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-6 hidden h-[2px] bg-border lg:block" aria-hidden="true">
            <motion.div className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400" style={reduced ? { width: "100%" } : { width: fill }} />
          </div>
          <ol className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <motion.li
                key={s.t}
                initial={reduced ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className="relative"
              >
                <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-border bg-bg-primary font-mono text-body-sm font-semibold text-text-primary shadow-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-brand text-xl font-semibold tracking-tight text-text-primary">{s.t}</h3>
                <p className="mt-2 text-body-md text-text-secondary">{s.d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
