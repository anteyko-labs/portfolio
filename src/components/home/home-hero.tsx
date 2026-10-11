"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform, animate, type MotionValue } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { pick, type Language } from "@/lib/i18n-text";
import { useReducedMotion, useTouchDevice } from "@/lib/hooks";
import { demoShot, demoVideo, type DemoVideo } from "@/lib/demo-shots";
import { ScrollShot } from "@/components/ui/scroll-shot";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { OFFICES, localTime } from "@/lib/locations";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const WORDS = {
  en: ["websites", "MVPs", "Web3", "ERP & CRM", "mobile apps"],
  ru: ["сайты", "MVP", "Web3", "ERP и CRM", "мобильные PWA"],
  zh: ["网站", "MVP", "Web3", "ERP 与 CRM", "移动应用"],
  tr: ["web siteleri", "MVP'ler", "Web3", "ERP ve CRM", "mobil uygulamalar"],
  ar: ["مواقع ويب", "منتجات MVP", "Web3", "ERP وCRM", "تطبيقات جوال"],
};

/**
 * A real page in a scaled iframe that scrolls itself in a loop. Touch devices get a video
 * of the same page scrolling the same way (or, without a recording, a stitched screenshot):
 * a second live page inside a 3D scene is more than a phone's memory budget allows, while
 * video is decoded by dedicated hardware.
 */
function LiveSite({ src, title, width = 1440, height = 900, poster, run }: { src: string; title: string; width?: number; height?: number; poster?: string; run: boolean }) {
  const touch = useTouchDevice();
  const video = demoVideo(src);
  const shot = demoShot(src);
  if (touch === null) return <Poster src={poster} />;
  if (touch && video) return <VideoSite video={video} run={run} />;
  if (touch && shot) return <ShotSite shot={shot} poster={poster} />;
  return <FrameSite src={src} title={title} width={width} height={height} poster={poster} />;
}

function Poster({ src }: { src?: string }) {
  return src ? <Image src={src} alt="" fill sizes="(min-width: 1024px) 600px, 80vw" priority className="object-cover object-top" /> : null;
}

function VideoSite({ video, run }: { video: DemoVideo; run: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  // Plays only while the hero is on screen; with reduced motion it stays on the first frame
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (run && !reduced) v.play().catch(() => {});
    else v.pause();
  }, [run, reduced]);
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover object-top"
      poster={video.poster}
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={video.hevc} type='video/mp4; codecs="hvc1"' />
      <source src={video.h264} type="video/mp4" />
    </video>
  );
}

function ShotSite({ shot, poster }: { shot: NonNullable<ReturnType<typeof demoShot>>; poster?: string }) {
  const [ready, setReady] = useState(false);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Poster src={poster} />
      <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
        <ScrollShot shot={shot} mode="loop" sizes="(min-width: 768px) 600px, 80vw" onReady={() => setReady(true)} />
      </div>
    </div>
  );
}

function FrameSite({ src, title, width = 1440, height = 900, poster }: { src: string; title: string; width?: number; height?: number; poster?: string }) {
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
      <Poster src={poster} />
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

/** Office cities cycling with their local time: "Istanbul 10:42" */
function OfficeClock({ language, run }: { language: Language; run: boolean }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const clock = window.setInterval(tick, 15000);
    const cycle = reduced || !run ? 0 : window.setInterval(() => setI((n) => (n + 1) % OFFICES.length), 2400);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(clock);
      if (cycle) window.clearInterval(cycle);
    };
  }, [reduced, run]);
  const o = OFFICES[i];
  return (
    <span className="relative inline-flex h-4 min-w-[8.5rem] items-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={o.countryCode}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="inline-flex items-center gap-1.5 whitespace-nowrap"
        >
          {o.city[language]}
          {now && <span className="tabular-nums text-white/45">{localTime(o.tz, now)}</span>}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const SCREENS = [
  "/images/showcase/asaki-sushi/phone-1.jpg",
  "/images/showcase/go-market/phone-1.jpg",
  "/images/showcase/djal/phone-1.jpg",
  "/images/showcase/anteyko-pwa/phone-1.jpg",
  "/images/showcase/asaki-sushi/phone-2.jpg",
];

/** Real app screens swiping like stories, each slowly panning while shown */
function PhoneScreens({ run }: { run: boolean }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced || !run) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % SCREENS.length), 2600);
    return () => window.clearInterval(id);
  }, [reduced, run]);
  return (
    <div className="absolute inset-0 overflow-hidden">
      {SCREENS.map((src, k) => (
        <div
          key={src}
          className="absolute inset-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ transform: `translateX(${(k - i) * 100}%) scale(${k === i ? 1 : 0.92})`, opacity: Math.abs(k - i) > 1 ? 0 : 1 }}
        >
          {/* Eager: a lazily loaded next screen shows the dark phone body for a moment as it slides in */}
          <Image src={src} alt="" fill sizes="170px" loading="eager" className={k === i ? "phone-pan object-cover object-top" : "object-cover object-top"} />
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1">
        {SCREENS.map((src, k) => (
          <span key={src} className={`h-1 rounded-full transition-all duration-500 ${k === i ? "w-4 bg-white" : "w-1 bg-white/50"}`} />
        ))}
      </div>
    </div>
  );
}

/** Rotating ring of text around an arrow — a quiet "scroll" cue */
function RingBadge({ language }: { language: Language }) {
  const text = pick({ en: "ANTEYKO · PRODUCT STUDIO · SINCE 2021 · ", ru: "ANTEYKO · СТУДИЯ ПРОДУКТОВ · С 2021 · ", zh: "ANTEYKO · 产品工作室 · 始于 2021 · ", tr: "ANTEYKO · ÜRÜN STÜDYOSU · 2021'DEN BERİ · ", ar: "ANTEYKO · استوديو منتجات · منذ 2021 · " }, language);
  return (
    <a href="#home-services" aria-label={pick({ en: "Scroll to services", ru: "К услугам", zh: "滚动查看服务", tr: "Hizmetlere kaydır", ar: "مرّر إلى الخدمات" }, language)} className="group relative grid h-28 w-28 place-items-center">
      <svg viewBox="0 0 100 100" className="home-ring absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="ring-path" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text fill="rgba(255,255,255,0.7)" fontSize="8.4" letterSpacing="2.2" fontFamily="ui-monospace, monospace">
          <textPath href="#ring-path">{text}</textPath>
        </text>
      </svg>
      <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#0A0A0F] transition-transform duration-500 group-hover:rotate-90" aria-hidden="true">↓</span>
    </a>
  );
}

/** Decorative card for the L1 work: modules lighting up in turn (no live data) */
function L1Card({ language }: { language: Language }) {
  const mods = ["Consensus", "EVM", "DEX", "Privacy", "Governance", "SDK"];
  return (
    <div className="w-[220px] rounded-2xl border border-white/10 bg-[#0E0E18]/90 p-4 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/50">
        <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
        {pick({ en: "L1 blockchain", ru: "L1-блокчейн", zh: "L1 区块链", tr: "L1 blokzincir", ar: "بلوكتشين L1" }, language)}
      </div>
      <p className="mt-2 font-brand text-lg font-semibold text-white">Rust · EVM · DEX</p>
      <svg viewBox="0 0 120 30" className="mt-2 h-8 w-full" aria-hidden="true">
        <defs>
          <linearGradient id="l1-spark" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#E879F9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E879F9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 24 L10 20 L20 22 L30 15 L40 17 L50 10 L60 13 L70 8 L80 11 L90 5 L100 9 L110 4 L120 6 L120 30 L0 30 Z" fill="url(#l1-spark)" />
        <path className="l1-spark" d="M0 24 L10 20 L20 22 L30 15 L40 17 L50 10 L60 13 L70 8 L80 11 L90 5 L100 9 L110 4 L120 6" fill="none" stroke="#F0ABFC" strokeWidth="1.6" pathLength={1} />
      </svg>
      <div className="mt-3 grid grid-cols-3 gap-1">
        {mods.map((m, i) => (
          <span key={m} className="home-module rounded-md border border-white/10 px-1.5 py-1 text-center font-mono text-[9px] text-white/70" style={{ animationDelay: `${i * 0.4}s` }}>
            {m}
          </span>
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

export function HomeHero() {
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();
  const [word, setWord] = useState(0);
  const words = WORDS[language];
  // Rotations stop once the hero is scrolled away (each one re-renders part of the hero)
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "100px" });

  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(() => setWord((w) => (w + 1) % words.length), 2200);
    return () => window.clearInterval(id);
  }, [reduced, inView, words.length]);

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
    // Mouse only: a finger dragging or pinching would shake the whole 3D stage
    if (reduced || e.pointerType !== "mouse") return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    (e.currentTarget as HTMLElement).style.setProperty("--sx", `${e.clientX - r.left}px`);
    (e.currentTarget as HTMLElement).style.setProperty("--sy", `${e.clientY - r.top}px`);
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const stats = [
    { to: 40, suffix: "+", label: pick({ en: "products shipped", ru: "запущенных продуктов", zh: "款已交付产品", tr: "teslim edilen ürün", ar: "منتجًا تم تسليمه" }, language) },
    { to: 15, suffix: "", label: pick({ en: "industries", ru: "отраслей", zh: "个行业", tr: "sektör", ar: "قطاعات" }, language) },
    { to: 5, suffix: "", label: pick({ en: "years in production", ru: "лет в разработке", zh: "年生产经验", tr: "yıllık production deneyimi", ar: "سنوات في الإنتاج" }, language) },
    { to: 24, suffix: pick({ en: "h", ru: " ч", zh: "小时", tr: "sa", ar: "س" }, language), label: pick({ en: "to an estimate", ru: "до оценки проекта", zh: "出具报价", tr: "teklife kadar", ar: "حتى التقدير" }, language) },
  ];

  return (
    <section ref={sectionRef} onPointerMove={onMove} className="relative isolate overflow-hidden bg-[#06060B] pb-16 pt-28 text-white md:pb-24 md:pt-32 lg:min-h-[100svh]">
      {/* Soft light that follows the pointer */}
      <div aria-hidden="true" className="home-spotlight pointer-events-none absolute inset-0 -z-10" />
      {/* Aurora + grid */}
      <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "64px 64px" }}
      />

      <div className="container mx-auto grid items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-6 lg:px-8">
        <div>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {pick({ en: "Product studio", ru: "Студия продуктов", zh: "产品工作室", tr: "Ürün stüdyosu", ar: "استوديو منتجات" }, language)}
            <span className="text-white/30">·</span>
            <OfficeClock language={language} run={inView} />
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
            <span>{pick({ en: "We build", ru: "Делаем", zh: "我们打造", tr: "Uçtan uca", ar: "نبني" }, language)}</span>
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
            <span>{pick({ en: "end to end", ru: "под ключ", zh: "端到端", tr: "inşa ediyoruz", ar: "من الفكرة إلى الإطلاق" }, language)}</span>
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
                {pick({ en: "See the work", ru: "Смотреть работы", zh: "查看作品", tr: "İşleri gör", ar: "شاهد الأعمال" }, language)}
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
        <div className="relative">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
            className="relative mx-auto aspect-[5/4] w-full max-w-[720px] [perspective:1600px] lg:max-w-none lg:w-[104%] 2xl:w-[116%]"
          >
            {/* Flat on purpose: the layers have no depth of their own, and in a preserve-3d
                context WebKit z-sorts coplanar layers arbitrarily — on iOS the phone and the
                browser swapped places and flickered on every repaint */}
            <motion.div
              style={reduced ? undefined : { rotateY: rotY, rotateX: rotX }}
              className="absolute inset-0 isolate"
            >
              {/* browser with a live concept site */}
              <div className="clip-fix absolute left-[2%] top-[6%] w-[92%] overflow-hidden rounded-2xl border border-white/15 bg-[#111118] shadow-[0_50px_100px_-30px_rgba(79,70,229,0.55)]">
                <div className="flex h-8 items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3">
                  <i className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <i className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                  <i className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                  <span className="mx-auto rounded-md bg-white/5 px-3 py-0.5 font-mono text-[10px] text-white/50">gran</span>
                </div>
                <div className="relative aspect-[16/10]">
                  <LiveSite src="/demos/gran/index.html" poster="/images/showcase/gran/cover.jpg" run={inView} title={pick({ en: "Live concept site", ru: "Живой концепт-сайт", zh: "在线概念网站", tr: "Canlı konsept site", ar: "موقع مفهومي مباشر" }, language)} />
                </div>
              </div>

              {/* phone */}
              <motion.div style={reduced ? undefined : layerPhone} className="absolute -bottom-[4%] left-[-4%] w-[31%] min-w-[130px]">
                <div className="clip-fix overflow-hidden rounded-[22px] border-[5px] border-[#0A0A0A] bg-[#0A0A0A] shadow-[0_40px_70px_-20px_rgba(0,0,0,0.8)]">
                  <div className="relative aspect-[390/844] bg-[#0A0A0A]">
                    <PhoneScreens run={inView} />
                  </div>
                </div>
              </motion.div>

              {/* L1 card */}
              <motion.div style={reduced ? undefined : layerTicker} className="absolute right-0 top-[-4%] hidden sm:block 2xl:-right-[3%]">
                <L1Card language={language} />
              </motion.div>

              {/* result chips */}
              <motion.div style={reduced ? undefined : layerChips} className="absolute bottom-[6%] right-[4%] flex flex-col items-end gap-2 2xl:right-0">
                <span className="home-float inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/90 px-4 py-2 text-sm font-semibold text-[#0A0A0F] shadow-xl">
                  <span className="text-emerald-600">▲</span> {pick({ en: "mobile conversion +23%", ru: "мобильная конверсия +23%", zh: "移动端转化率 +23%", tr: "mobil dönüşüm +%23", ar: "التحويل عبر الجوال +23%" }, language)}
                </span>
                <span className="home-float inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111118]/90 px-4 py-2 text-sm font-medium text-white shadow-xl backdrop-blur [animation-delay:-2s]">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> {pick({ en: "no-shows 32% → 8%", ru: "неявки 32% → 8%", zh: "爽约率 32% → 8%", tr: "gelmeyenler %32 → %8", ar: "عدم الحضور من 32% ← 8%" }, language)}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden lg:block xl:right-14">
        <RingBadge language={language} />
      </div>
    </section>
  );
}

/** Offset of a floating layer for the pointer parallax; k = depth */
function useParallax(sx: MotionValue<number>, sy: MotionValue<number>, k: number) {
  const x = useTransform(sx, [-1, 1], [-14 * k, 14 * k]);
  const y = useTransform(sy, [-1, 1], [-10 * k, 10 * k]);
  return { x, y };
}
