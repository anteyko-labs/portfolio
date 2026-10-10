"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useLanguage } from "@/lib/language-context";
import type { ShowcaseItem } from "@/lib/showcase-data";
import { Decor } from "./media";
import { pick } from "@/lib/i18n-text";

type Mode = "desktop" | "mobile";
const DIM: Record<Mode, { w: number; h: number }> = { desktop: { w: 1440, h: 860 }, mobile: { w: 390, h: 780 } };

function Chrome({ domain, children }: { domain: string; children?: React.ReactNode }) {
  return (
    <div className="flex h-11 items-center gap-3 border-b border-border bg-bg-secondary px-4">
      <span className="flex gap-1.5" aria-hidden="true">
        <i className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <i className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <i className="h-3 w-3 rounded-full bg-[#28C840]" />
      </span>
      <span className="mx-auto hidden max-w-[50%] truncate rounded-md bg-bg-tertiary px-4 py-1 font-mono text-caption text-text-tertiary sm:block">
        {domain}
      </span>
      <div className="ml-auto flex items-center gap-2 sm:ml-0">{children}</div>
    </div>
  );
}

/**
 * The work itself on the case page: a live demo you can scroll and switch to a
 * phone, a full-page screenshot you can scroll, or a gallery of screens.
 */
export function ShowcaseViewer({ item }: { item: ShowcaseItem }) {
  if (item.phones?.length) return <PhoneRow item={item} />;
  if (item.demo || item.embed) return <LiveViewer item={item} />;
  if (item.fullPage) return <ScrollShot item={item} />;
  return <Gallery item={item} />;
}

function LiveViewer({ item }: { item: ShowcaseItem }) {
  const { language } = useLanguage();
  const [mode, setMode] = useState<Mode>("desktop");
  const stage = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);

  // Phones start on the phone layout
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (window.innerWidth < 760) setMode("mobile");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (!w) return;
      setScale(mode === "desktop" ? w / DIM.desktop.w : Math.min(1, (w - 32) / DIM.mobile.w));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mode]);

  const d = DIM[mode];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[0_40px_80px_-40px_rgba(10,10,10,0.35)]">
      <Chrome domain={item.domain}>
        <div className="flex rounded-full border border-border bg-bg-primary p-0.5" role="group" aria-label={pick({ en: "Screen size", ru: "Размер экрана", zh: "屏幕尺寸", tr: "Ekran boyutu", ar: "حجم الشاشة" }, language)}>
          {(["desktop", "mobile"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={clsx(
                "rounded-full px-3 py-1 text-caption font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary",
                mode === m ? "bg-text-primary text-white" : "text-text-secondary hover:text-text-primary"
              )}
            >
              {m === "desktop" ? (pick({ en: "Desktop", ru: "Десктоп", zh: "桌面端", tr: "Masaüstü", ar: "سطح المكتب" }, language)) : pick({ en: "Phone", ru: "Телефон", zh: "手机", tr: "Telefon", ar: "الهاتف" }, language)}
            </button>
          ))}
        </div>
      </Chrome>
      <div
        ref={stage}
        className={clsx("relative flex justify-center", mode === "mobile" && "bg-bg-tertiary py-6")}
        style={{ height: Math.round(d.h * scale) + (mode === "mobile" ? 48 : 0) }}
      >
        <div
          className={clsx("relative overflow-hidden", mode === "mobile" && "rounded-[28px] border-[6px] border-text-primary shadow-xl")}
          style={{ width: Math.round(d.w * scale) + (mode === "mobile" ? 12 : 0), height: Math.round(d.h * scale) + (mode === "mobile" ? 12 : 0) }}
        >
          <iframe
            key={mode}
            src={item.demo ?? item.embed}
            title={item.title[language]}
            loading="lazy"
            className="absolute left-0 top-0 origin-top-left border-0"
            style={{ width: d.w, height: d.h, transform: `scale(${scale})` }}
          />
        </div>
      </div>
      <p className="border-t border-border px-4 py-3 text-center text-body-sm text-text-tertiary">
        {item.embed
          ? pick({ en: "The live site, loaded right here — scroll and click inside the window.", ru: "Живой сайт прямо здесь — листайте и кликайте внутри окна.", zh: "真实网站就在这里加载——在窗口内滚动、点击即可体验。", tr: "Canlı site tam burada yüklendi — pencerenin içinde kaydırın ve tıklayın.", ar: "الموقع الفعلي محمّل هنا — مرّر وانقر داخل النافذة." }, language)
          : pick({ en: "This is the real site, not a video — scroll right inside the window.", ru: "Это настоящий сайт, а не видео — листайте прямо в окне.", zh: "这是真实网站，不是视频——直接在窗口内滚动。", tr: "Bu videonun değil, gerçek sitenin kendisi — doğrudan pencerenin içinde kaydırın.", ar: "هذا هو الموقع الحقيقي وليس فيديو — مرّر مباشرة داخل النافذة." }, language)}
      </p>
    </div>
  );
}

function ScrollShot({ item }: { item: ShowcaseItem }) {
  const { language } = useLanguage();
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
      <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[0_40px_80px_-40px_rgba(10,10,10,0.35)]">
        <Chrome domain={item.domain} />
        <div className="relative h-[62vh] max-h-[760px] min-h-[360px] overflow-y-auto overscroll-contain" tabIndex={0} aria-label={pick({ en: "Full page screenshot, scrollable", ru: "Скриншот всей страницы, можно листать", zh: "整页截图，可滚动", tr: "Tam sayfa ekran görüntüsü, kaydırılabilir", ar: "لقطة شاشة كاملة للصفحة قابلة للتمرير" }, language)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.fullPage} alt={item.title[language]} className="block w-full" loading="lazy" />
        </div>
        <p className="border-t border-border px-4 py-3 text-center text-body-sm text-text-tertiary">
          {pick({ en: "The whole page — scroll inside the window.", ru: "Вся страница целиком — листайте внутри окна.", zh: "整个页面——在窗口内滚动查看。", tr: "Sayfanın tamamı — pencerenin içinde kaydırın.", ar: "الصفحة كاملة — مرّر داخل النافذة." }, language)}
        </p>
      </div>
      {item.mobile && <Phone src={item.mobile} alt={item.title[language]} />}
    </div>
  );
}

function Gallery({ item }: { item: ShowcaseItem }) {
  const { language } = useLanguage();
  const frames = [
    ...(item.cover ? [{ src: item.cover, alt: item.title }] : []),
    ...(item.gallery ?? []),
  ];
  const [index, setIndex] = useState(0);
  if (frames.length === 0) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
      <div className="min-w-0">
        <div className="overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[0_40px_80px_-40px_rgba(10,10,10,0.35)]">
          <Chrome domain={item.domain} />
          <div className="relative aspect-[16/10] bg-bg-tertiary">
            {frames.map((f, i) => (
              <Image
                key={f.src}
                src={f.src}
                alt={f.alt[language]}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                priority={i === 0}
                className={clsx("object-cover object-top transition-opacity duration-500", i === index ? "opacity-100" : "opacity-0")}
              />
            ))}
          </div>
        </div>
        {frames.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1" role="tablist" aria-label={pick({ en: "Screens", ru: "Экраны", zh: "界面", tr: "Ekranlar", ar: "الشاشات" }, language)}>
            {frames.map((f, i) => (
              <button
                key={f.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={f.alt[language]}
                onClick={() => setIndex(i)}
                className={clsx(
                  "relative aspect-[16/10] w-36 shrink-0 overflow-hidden rounded-lg border-2 transition-[border-color,opacity] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary",
                  i === index ? "border-accent-primary" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image src={f.src} alt="" fill sizes="144px" className="object-cover object-top" />
              </button>
            ))}
          </div>
        )}
      </div>
      {item.mobile && <Phone src={item.mobile} alt={item.title[language]} />}
    </div>
  );
}

function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto w-[240px] shrink-0 rounded-[34px] border-[7px] border-text-primary bg-text-primary shadow-[0_40px_80px_-30px_rgba(10,10,10,0.5)] lg:w-[260px]">
      <div className="relative aspect-[390/844] overflow-hidden rounded-[27px] bg-bg-tertiary">
        <Image src={src} alt={alt} fill sizes="260px" className="object-cover object-top" />
      </div>
    </div>
  );
}

/** Mobile-first products: the phone screens side by side, desktop screens below if there are any. */
function PhoneRow({ item }: { item: ShowcaseItem }) {
  const { language } = useLanguage();
  return (
    <div className="space-y-8">
      <div
        className="@container relative flex snap-x snap-mandatory gap-6 overflow-x-auto rounded-2xl border border-border px-6 py-10 md:justify-center md:gap-10 md:px-10 md:py-14"
        style={{ background: item.stage ?? `radial-gradient(120% 90% at 50% 120%, ${item.palette[2]}40, transparent 60%), ${item.palette[0]}` }}
      >
        {item.decor && <Decor items={item.decor} active={false} />}
        {item.phones!.map((src, i) => (
          <div key={src} className="relative snap-center">
            <Phone src={src} alt={`${item.title[language]} — ${i + 1}`} />
          </div>
        ))}
      </div>
      {(item.gallery?.length ?? 0) > 0 && <Gallery item={{ ...item, cover: undefined, mobile: undefined }} />}
    </div>
  );
}
