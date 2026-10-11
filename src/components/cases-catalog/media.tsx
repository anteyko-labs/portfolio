"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import type { CatalogEntry } from "@/lib/catalog";
import { Poster } from "./poster";
import { GENERATIVE_COVERS } from "./generative-covers";
import { useTouchDevice } from "@/lib/hooks";
import { demoShot } from "@/lib/demo-shots";
import { ScrollShot } from "@/components/ui/scroll-shot";

const BASE_W = 1440;

// Only one live demo runs at a time: mounting a new one unloads the previous.
let unloadCurrent: (() => void) | null = null;

interface MediaProps {
  entry: CatalogEntry;
  title: string;
  label: string;
  /** Card is hovered (or centred on touch screens) */
  active: boolean;
  sizes: string;
  priority?: boolean;
}

/**
 * Card screen. Picks the richest preview the entry has:
 * phone stack (mobile-first products) → live demo (iframe, auto-scrolls) → full-page screenshot (pans) →
 * several screens (slideshow) → single cover (slow zoom) → typographic poster.
 */
export function CatalogMedia({ entry, title, label, active, sizes, priority }: MediaProps) {
  // Hand-made illustrations win over a stock thumbnail
  const Illustration = GENERATIVE_COVERS[entry.slug];
  if (Illustration) return <Illustration active={active} />;
  if (entry.phones?.length) return <PhoneStack entry={entry} title={title} active={active} />;
  if (entry.demo) return <DemoPreview entry={entry} title={title} active={active} sizes={sizes} priority={priority} />;
  if (entry.fullPage) return <PanShot src={entry.fullPage} cover={entry.cover} title={title} active={active} sizes={sizes} priority={priority} />;
  if (entry.frames.length > 1) return <Slideshow frames={entry.frames} title={title} active={active} sizes={sizes} priority={priority} contain={entry.mobileFirst} />;
  if (entry.cover) return <Cover src={entry.cover} title={title} active={active} sizes={sizes} priority={priority} contain={entry.mobileFirst} />;
  return <Poster title={title} label={label} domain={entry.domain} palette={entry.palette} />;
}

function Cover({ src, title, active, sizes, priority, contain }: { src: string; title: string; active: boolean; sizes: string; priority?: boolean; contain?: boolean }) {
  return (
    <Image
      src={src}
      alt={title}
      fill
      sizes={sizes}
      priority={priority}
      className={clsx(
        "transition-transform duration-[1400ms] ease-out",
        contain ? "object-contain bg-bg-tertiary" : "object-cover object-top",
        active && "scale-[1.04]"
      )}
    />
  );
}

/**
 * Live demo on devices with a mouse; on touch devices a stitched screenshot of the
 * same demo that scrolls the same way, so a phone never runs a second page per card.
 */
function DemoPreview({ entry, title, active, sizes, priority }: { entry: CatalogEntry; title: string; active: boolean; sizes: string; priority?: boolean }) {
  const touch = useTouchDevice();
  const shot = demoShot(entry.demo);
  if (touch && shot) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {entry.cover && <Image src={entry.cover} alt={title} fill sizes={sizes} priority={priority} className="object-cover object-top" />}
        <ScrollShot shot={shot} mode="active" active={active} sizes={sizes} />
      </div>
    );
  }
  if (touch === null && entry.cover) {
    return <Image src={entry.cover} alt={title} fill sizes={sizes} priority={priority} className="object-cover object-top" />;
  }
  return <LivePreview entry={entry} title={title} active={active} sizes={sizes} priority={priority} />;
}

/** Real page in a 1440px iframe scaled to the card. Loads near the viewport, scrolls itself while active. */
function LivePreview({ entry, title, active, sizes, priority }: { entry: CatalogEntry; title: string; active: boolean; sizes: string; priority?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [near, setNear] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [wanted, setWanted] = useState(false);
  const [touchOn, setTouchOn] = useState(false);
  const [size, setSize] = useState({ scale: 0.5, h: 900 });
  const activeRef = useRef(false);
  const touchActive = useRef(false);

  useEffect(() => {
    activeRef.current = active || touchActive.current;
  }, [active]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      if (!r.width) return;
      const scale = r.width / BASE_W;
      setSize({ scale, h: Math.ceil(r.height / scale) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const nearIO = new IntersectionObserver(
      ([e]) => {
        setNear(e.isIntersecting);
        if (!e.isIntersecting) setLoaded(false);
      },
      { rootMargin: "400px 0px" }
    );
    nearIO.observe(el);

    // Touch screens: scroll while the card is almost fully on screen
    let centerIO: IntersectionObserver | undefined;
    if (window.matchMedia("(hover: none)").matches) {
      centerIO = new IntersectionObserver(
        ([e]) => {
          touchActive.current = e.intersectionRatio > 0.8;
          activeRef.current = touchActive.current;
          setTouchOn(touchActive.current);
        },
        { threshold: [0, 0.8, 1] }
      );
      centerIO.observe(el);
    }
    return () => {
      ro.disconnect();
      nearIO.disconnect();
      centerIO?.disconnect();
    };
  }, []);

  // Mount the demo only while it is being looked at; keep it a moment after
  // the pointer leaves so a quick re-hover doesn't reload it.
  useEffect(() => {
    const on = near && (active || touchOn);
    if (on) {
      // Dwell before loading so scrolling past cards doesn't start every demo
      const id = window.setTimeout(() => {
        const unload = () => {
          setWanted(false);
          setLoaded(false);
        };
        if (unloadCurrent && unloadCurrent !== unload) unloadCurrent();
        unloadCurrent = unload;
        setWanted(true);
      }, 350);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => {
      setWanted(false);
      setLoaded(false);
    }, 2500);
    return () => window.clearTimeout(id);
  }, [near, active, touchOn]);

  useEffect(() => {
    if (!loaded) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = performance.now();
    let y = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(64, now - last);
      last = now;
      try {
        const win = frame.current?.contentWindow;
        const doc = win?.document?.documentElement;
        if (!win || !doc) return;
        const max = Math.max(0, doc.scrollHeight - win.innerHeight);
        if (activeRef.current) y = Math.min(max, y + dt * 0.42);
        else if (y > 0) y = y < 2 ? 0 : y - Math.max(4, y * 0.012 * dt);
        else return;
        win.scrollTo(0, Math.max(0, y));
      } catch {
        /* cross-origin — keep the preview static */
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loaded]);

  return (
    <div ref={wrap} className="absolute inset-0 overflow-hidden">
      {entry.cover && (
        <Image
          src={entry.cover}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className={clsx("object-cover object-top transition-opacity duration-700", loaded && "opacity-0")}
        />
      )}
      {wanted && entry.demo && (
        <iframe
          ref={frame}
          src={entry.demo}
          title={title}
          tabIndex={-1}
          aria-hidden="true"
          scrolling="no"
          loading="lazy"
          onLoad={() => window.setTimeout(() => setLoaded(true), 350)}
          className={clsx(
            "pointer-events-none absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0"
          )}
          style={{ width: BASE_W, height: size.h, transform: `scale(${size.scale})` }}
        />
      )}
    </div>
  );
}

/** Full-height screenshot that slowly scrolls to the bottom while active. */
function PanShot({ src, cover, title, active, sizes, priority }: { src: string; cover?: string; title: string; active: boolean; sizes: string; priority?: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const pic = useRef<HTMLImageElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!box.current || !pic.current) return;
      setShift(Math.max(0, pic.current.offsetHeight - box.current.offsetHeight));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (box.current) ro.observe(box.current);
    if (pic.current) ro.observe(pic.current);
    return () => ro.disconnect();
  }, []);

  // ~650px per second feels like a fast read-through, capped so long pages stay watchable
  const duration = Math.min(14, Math.max(4, shift / 650));

  return (
    <div ref={box} className="absolute inset-0 overflow-hidden">
      {cover && (
        <Image src={cover} alt="" fill sizes={sizes} priority={priority} className="object-cover object-top" />
      )}
      <Image
        ref={pic}
        src={src}
        alt={title}
        width={1200}
        height={6000}
        sizes={sizes}
        onLoad={() => {
          if (box.current && pic.current) setShift(Math.max(0, pic.current.offsetHeight - box.current.offsetHeight));
        }}
        className={clsx("absolute left-0 top-0 h-auto w-full", active && "will-change-transform")}
        style={{
          transform: `translateY(${active ? -shift : 0}px)`,
          transition: `transform ${active ? duration : 1.1}s ${active ? "cubic-bezier(.45,.05,.4,1)" : "cubic-bezier(.2,.8,.2,1)"}`,
        }}
      />
    </div>
  );
}

/** Several screens cross-fading with story-style progress bars while active. */
function Slideshow({ frames, title, active, sizes, priority, contain }: { frames: string[]; title: string; active: boolean; sizes: string; priority?: boolean; contain?: boolean }) {
  const [index, setIndex] = useState(0);
  const STEP = 1700;

  useEffect(() => {
    if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % frames.length), STEP);
    return () => {
      window.clearInterval(id);
      setIndex(0);
    };
  }, [active, frames.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {frames.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? title : ""}
          fill
          sizes={sizes}
          priority={priority && i === 0}
          loading={i === 0 ? undefined : "lazy"}
          className={clsx(
            "transition-[opacity,transform] duration-700 ease-out",
            contain ? "object-contain bg-bg-tertiary" : "object-cover object-top",
            i === index ? "opacity-100" : "opacity-0",
            active && i === index && "scale-[1.03]"
          )}
        />
      ))}
      <div
        className={clsx(
          "absolute inset-x-3 top-3 z-10 flex gap-1 transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      >
        {frames.map((src, i) => (
          <span key={src} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/40 backdrop-blur">
            <span
              className="block h-full rounded-full bg-white"
              style={{
                width: i < index ? "100%" : i === index && active ? "100%" : "0%",
                transition: i === index && active ? `width ${STEP}ms linear` : "none",
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Two or three phone screens on a stage; they fan out while active. */
function PhoneStack({ entry, title, active }: { entry: CatalogEntry; title: string; active: boolean }) {
  const list = entry.phones!.slice(0, 3);
  const mid = (list.length - 1) / 2;
  const { palette } = entry;
  return (
    <div
      className="@container absolute inset-0 overflow-hidden"
      style={{ background: entry.stage ?? `radial-gradient(120% 90% at 50% 110%, ${palette[2]}55, transparent 60%), ${palette[0]}` }}
    >
      {entry.decor && <Decor items={entry.decor} active={active} />}
      <div className="absolute inset-x-0 top-[9%] flex h-[150%] justify-center">
        {list.map((src, i) => {
          const d = i - mid;
          return (
            <div
              key={src}
              className="relative mx-[-3%] aspect-[390/844] h-full shrink-0 overflow-hidden rounded-[18px] border-[5px] border-[#0A0A0A] bg-[#0A0A0A] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{
                zIndex: 10 - Math.abs(d),
                transform: `translateX(${d * (active ? 26 : 12)}%) translateY(${Math.abs(d) * (active ? 4 : 8)}%) rotate(${d * (active ? 7 : 4)}deg) scale(${d === 0 ? 1 : 0.92})`,
              }}
            >
              <Image src={src} alt={i === 0 ? title : ""} fill sizes="240px" className="object-cover object-top" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Spots around the phones, in % of the stage: [left, top, size, rotation]
// Kept to the edges so they never cover the phone screens
const DECOR_SPOTS: [number, number, number, number][] = [
  [4, 8, 13, -14], [12, 46, 11, 12], [3, 74, 10, 8], [16, 22, 8, 18],
  [84, 6, 12, 16], [90, 40, 10, -10], [82, 70, 13, -6], [92, 86, 8, 20],
  [1, 34, 8, 4], [93, 20, 7, -20], [14, 86, 8, -12], [78, 32, 7, 10],
];

/** Emoji props floating around the phones (a grocery app gets fruit, a café gets coffee). */
export function Decor({ items, active }: { items: string[]; active: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {items.slice(0, DECOR_SPOTS.length).map((e, i) => {
        const [l, t, size, rot] = DECOR_SPOTS[i];
        return (
          <span
            key={i}
            className="decor-float absolute select-none leading-none drop-shadow-[0_10px_14px_rgba(0,0,0,0.25)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{
              left: `${l}%`,
              top: `${t}%`,
              fontSize: `clamp(18px, ${size * 0.55}cqw, 64px)`,
              transform: `rotate(${rot}deg) scale(${active ? 1.18 : 1})`,
              animationDelay: `${i * -0.7}s`,
            }}
          >
            {e}
          </span>
        );
      })}
    </div>
  );
}
