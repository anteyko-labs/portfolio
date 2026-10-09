"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, animate, type MotionValue } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { estimateHeight, type L1Snapshot } from "@/lib/l1-stats";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const WORDS = {
  en: ["websites", "MVPs", "Web3", "ERP & CRM", "mobile apps"],
  ru: ["сайты", "MVP", "Web3", "ERP и CRM", "мобильные PWA"],
};

/** A real page in a scaled iframe that scrolls itself in a loop */
function LiveSite({ src, title, width = 1440, height = 900, poster }: { src: string; title: string; width?: number; height?: number; poster?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(0.4);
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  useEffect(() => {
    if (!loaded || reduced) return;
    let raf = 0;
    let y = 0;
    let dir = 1;
    let last = performance.now();
    let pause = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(64, now - last);
      last = now;
      if (pause > 0) {
        pause -= dt;
        return;
      }
      try {
        const win = frame.current?.contentWindow;
        const doc = win?.document?.documentElement;
        if (!win || !doc) return;
        const max = Math.max(0, doc.scrollHeight - win.innerHeight);
        y += dir * dt * (dir > 0 ? 0.32 : 1.6);
        if (y >= max) { y = max; dir = -1; pause = 900; }
        if (y <= 0) { y = 0; dir = 1; pause = 1600; }
        win.scrollTo(0, y);
      } catch {
        /* cross-origin — stay static */
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loaded, reduced]);

  return (
    <div ref={wrap} className="absolute inset-0 overflow-hidden">
      {poster && <Image src={poster} alt="" fill sizes="600px" priority className="object-cover object-top" />}
      <iframe
        ref={frame}
        src={src}
        title={title}
        tabIndex={-1}
        aria-hidden="true"
        scrolling="no"
        onLoad={() => window.setTimeout(() => setLoaded(true), 400)}
        className="pointer-events-none absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-700"
        style={{ width, height, transform: `scale(${scale})`, opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
}

function L1Ticker({ snapshot, en }: { snapshot: L1Snapshot; en: boolean }) {
  const [h, setH] = useState(snapshot.height);
  useEffect(() => {
    const tick = () => setH(estimateHeight(snapshot));
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [snapshot]);
  return (
    <div className="w-[220px] rounded-2xl border border-white/10 bg-[#0E0E18]/90 p-4 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/50">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70 motion-reduce:animate-none" />
          <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        {en ? "Our L1 · finalized" : "Наш L1 · финализирован"}
      </div>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.p
          key={h}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-2 font-mono text-xl font-semibold tabular-nums text-white"
        >
          #{h.toLocaleString("ru-RU")}
        </motion.p>
      </AnimatePresence>
      <div className="mt-3 flex gap-1">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className="h-5 flex-1 rounded-sm bg-gradient-to-t from-indigo-500/40 to-fuchsia-400/80" style={{ opacity: 0.35 + ((h + i) % 5) * 0.15 }} />
        ))}
      </div>
    </div>
  );
}

function Counter({ to, suffix = "", delay = 0 }: { to: number; suffix?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const c = animate(0, to, { duration: 1.6, delay, ease: EASE, onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`) });
    return () => c.stop();
  }, [to, suffix, delay, reduced]);
  return <span ref={ref} className="tabular-nums">{`${to}${suffix}`}</span>;
}

export function HomeHero({ l1 }: { l1: L1Snapshot }) {
  const { t, language } = useLanguage();
  const en = language === "en";
  const reduced = useReducedMotion();
  const [word, setWord] = useState(0);
  const words = WORDS[en ? "en" : "ru"];

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setWord((w) => (w + 1) % words.length), 2200);
    return () => window.clearInterval(id);
  }, [reduced, words.length]);

  // Pointer parallax for the device stage
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotY = useTransform(sx, [-1, 1], [-14, -4]);
  const rotX = useTransform(sy, [-1, 1], [10, 2]);
  const layerTicker = useParallax(sx, sy, 2.2);
  const layerPhone = useParallax(sx, sy, 1.4);
  const layerChips = useParallax(sx, sy, 2.8);

  const onMove = (e: React.PointerEvent) => {
    if (reduced) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const stats = [
    { to: 40, suffix: "+", label: en ? "products shipped" : "запущенных продуктов" },
    { to: 15, suffix: "", label: en ? "industries" : "отраслей" },
    { to: 5, suffix: "", label: en ? "years in production" : "лет в разработке" },
    { to: 24, suffix: en ? "h" : " ч", label: en ? "to an estimate" : "до оценки проекта" },
  ];

  return (
    <section onPointerMove={onMove} className="relative isolate overflow-hidden bg-[#06060B] pb-16 pt-28 text-white md:pb-24 md:pt-32 lg:min-h-[100svh]">
      {/* Aurora + grid */}
      <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "64px 64px" }}
      />

      <div className="container mx-auto grid items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-6">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {en ? "Product studio · Bishkek · Dubai" : "Студия продуктов · Бишкек · Дубай"}
          </motion.p>

          <h1 className="mt-7 font-brand text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl xl:text-[5.4rem]">
            {[t("hero.titleAccent"), t("hero.titleRest")].map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={i === 0 ? "home-gradient-text block" : "block text-white"}
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            className="mt-6 flex flex-wrap items-center gap-3 text-lg text-white/70 md:text-xl"
          >
            <span>{en ? "We build" : "Делаем"}</span>
            <span className="relative inline-flex h-11 min-w-[11rem] items-center overflow-hidden rounded-xl border border-white/15 bg-white/5 px-4 font-semibold text-white">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={word}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -28, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="block whitespace-nowrap"
                >
                  {words[word]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span>{en ? "end to end" : "под ключ"}</span>
          </motion.div>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="mt-5 max-w-xl text-body-lg text-white/60"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <MagneticButton>
              <NextLink
                href="/contact"
                className="home-cta-glow inline-flex items-center gap-2.5 rounded-xl bg-white px-7 py-4 text-body-lg font-semibold text-[#0A0A0F] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {t("cta.primary")}
                <span aria-hidden="true">→</span>
              </NextLink>
            </MagneticButton>
            <MagneticButton>
              <NextLink
                href="/cases"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-body-lg font-medium text-white backdrop-blur transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {en ? "See the work" : "Смотреть работы"}
              </NextLink>
            </MagneticButton>
          </motion.div>

          <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-brand text-3xl font-semibold tracking-tight">
                    <Counter to={s.to} suffix={s.suffix} delay={0.7 + i * 0.08} />
                  </span>
                  <span className="mt-1 block text-caption leading-snug text-white/50">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Device stage */}
        <div className="relative lg:col-span-6">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
            className="relative mx-auto aspect-[5/4] w-full max-w-[640px] [perspective:1600px]"
          >
            <motion.div
              style={reduced ? undefined : { rotateY: rotY, rotateX: rotX }}
              className="absolute inset-0 [transform-style:preserve-3d]"
            >
              {/* browser with a live concept site */}
              <div className="absolute left-[4%] top-[8%] w-[88%] overflow-hidden rounded-2xl border border-white/15 bg-[#111118] shadow-[0_50px_100px_-30px_rgba(79,70,229,0.55)]">
                <div className="flex h-8 items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3">
                  <i className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <i className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                  <i className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                  <span className="mx-auto rounded-md bg-white/5 px-3 py-0.5 font-mono text-[10px] text-white/50">gran</span>
                </div>
                <div className="relative aspect-[16/10]">
                  <LiveSite src="/demos/gran/index.html" poster="/images/showcase/gran/cover.jpg" title={en ? "Live concept site" : "Живой концепт-сайт"} />
                </div>
              </div>

              {/* phone */}
              <motion.div style={reduced ? undefined : layerPhone} className="absolute -bottom-[2%] left-[-2%] w-[26%] min-w-[110px]">
                <div className="overflow-hidden rounded-[22px] border-[5px] border-[#0A0A0A] bg-[#0A0A0A] shadow-[0_40px_70px_-20px_rgba(0,0,0,0.8)]">
                  <div className="relative aspect-[390/844] bg-[#FAFAF7]">
                    <LiveSite src="/demos/lumo/index.html" width={390} height={844} title={en ? "Live mobile site" : "Живой мобильный сайт"} />
                  </div>
                </div>
              </motion.div>

              {/* L1 ticker */}
              <motion.div style={reduced ? undefined : layerTicker} className="absolute -right-[3%] top-[-4%] hidden sm:block">
                <L1Ticker snapshot={l1} en={en} />
              </motion.div>

              {/* result chips */}
              <motion.div style={reduced ? undefined : layerChips} className="absolute bottom-[6%] right-[0%] flex flex-col items-end gap-2">
                <span className="home-float inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/90 px-4 py-2 text-sm font-semibold text-[#0A0A0F] shadow-xl">
                  <span className="text-emerald-600">▲</span> {en ? "mobile conversion +23%" : "мобильная конверсия +23%"}
                </span>
                <span className="home-float inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111118]/90 px-4 py-2 text-sm font-medium text-white shadow-xl backdrop-blur [animation-delay:-2s]">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> {en ? "no-shows 32% → 8%" : "неявки 32% → 8%"}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <a href="#home-services" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 lg:flex">
        {en ? "scroll" : "листайте"}
        <span className="home-scroll-cue h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </a>
    </section>
  );
}

/** Offset of a floating layer for the pointer parallax; k = depth */
function useParallax(sx: MotionValue<number>, sy: MotionValue<number>, k: number) {
  const x = useTransform(sx, [-1, 1], [-14 * k, 14 * k]);
  const y = useTransform(sy, [-1, 1], [-10 * k, 10 * k]);
  return { x, y };
}
