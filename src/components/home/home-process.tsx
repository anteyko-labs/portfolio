"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { useReducedMotion } from "@/lib/hooks";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Four steps on a line that fills as the section scrolls through the viewport */
export function HomeProcess() {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    { t: pick({ en: "Estimate in 24 hours", ru: "Оценка за 24 часа", zh: "24 小时内获取报价", tr: "24 saatte teklif", ar: "تقدير خلال 24 ساعة" }, language), d: pick({ en: "A call, the task in your words, a fixed estimate and a plan by stages.", ru: "Созвон, задача вашими словами, фиксированная оценка и план по этапам.", zh: "一次通话，用您的话描述需求，我们给出固定报价和分阶段计划。", tr: "Bir görüşme, görevin sizin ifadenizle anlatımı, sabit bir teklif ve aşamalara bölünmüş bir plan.", ar: "مكالمة، ومهمتك بكلماتك، وتقدير ثابت وخطة على مراحل." }, language) },
    { t: pick({ en: "Design & prototype", ru: "Дизайн и прототип", zh: "设计与原型", tr: "Tasarım ve prototip", ar: "التصميم والنموذج الأولي" }, language), d: pick({ en: "Clickable screens before code — you see the product before paying for it.", ru: "Кликабельные экраны до кода — вы видите продукт до того, как платите за разработку.", zh: "先有可点击的界面再写代码——付费开发之前，您就能看到产品。", tr: "Koddan önce tıklanabilir ekranlar — ürünü ödeme yapmadan önce görürsünüz.", ar: "شاشات تفاعلية قبل كتابة الشيفرة — ترى المنتج قبل أن تدفع مقابله." }, language) },
    { t: pick({ en: "Build in sprints", ru: "Разработка спринтами", zh: "按冲刺迭代开发", tr: "Sprint'lerle geliştirme", ar: "البناء على مراحل (Sprints)" }, language), d: pick({ en: "A demo every week, a recording for everyone who missed it, payment per stage.", ru: "Демо каждую неделю, запись для тех, кто не смог, оплата по этапам.", zh: "每周一次演示，没赶上的人有录屏可看，按阶段付款。", tr: "Her hafta bir demo, kaçıranlar için kayıt, aşama başına ödeme.", ar: "عرض تجريبي كل أسبوع، وتسجيل لمن فاته، والدفع عن كل مرحلة." }, language) },
    { t: pick({ en: "Launch & support", ru: "Запуск и поддержка", zh: "上线与支持", tr: "Lansman ve destek", ar: "الإطلاق والدعم" }, language), d: pick({ en: "Deploy, monitoring, analytics — and the code is yours from day one.", ru: "Деплой, мониторинг, аналитика — и код ваш с первого дня.", zh: "部署、监控、分析——代码从第一天起就归您所有。", tr: "Dağıtım, izleme, analitik — ve kod ilk günden sizin.", ar: "النشر والمراقبة والتحليلات — والشيفرة ملكك منذ اليوم الأول." }, language) },
  ];

  return (
    <section ref={ref} className="bg-bg-primary py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-caption uppercase tracking-[0.2em] text-text-tertiary">{pick({ en: "How we work", ru: "Как мы работаем", zh: "我们如何工作", tr: "Nasıl çalışırız", ar: "كيف نعمل" }, language)}</p>
            <h2 className="mt-4 max-w-2xl font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-text-primary md:text-6xl">
              {pick({ en: "No surprises, stage by stage", ru: "Без сюрпризов, этап за этапом", zh: "按阶段推进，没有意外", tr: "Sürpriz yok, aşama aşama", ar: "دون مفاجآت، مرحلة بعد مرحلة" }, language)}
            </h2>
          </div>
          <NextLink href="/process" className="inline-flex items-center gap-2 text-body-md font-medium text-text-primary underline decoration-border underline-offset-4 hover:decoration-text-primary">
            {pick({ en: "The full process", ru: "Весь процесс", zh: "完整流程", tr: "Sürecin tamamı", ar: "العملية كاملة" }, language)} <span aria-hidden="true">→</span>
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
