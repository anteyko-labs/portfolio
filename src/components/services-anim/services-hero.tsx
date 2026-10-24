"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { PACKAGE_SLUGS, SERVICE_GROUPS, type PackageId, type ServiceGroup } from "@/lib/service-slugs";
import { PKG_COLOR } from "./visual-frame";

// /services hero: the headline centred on top, and under it a slowly turning
// ring with one dot per service. The service at the top of the ring (or the
// dot under the cursor, which stops the ring) shows in the centre: direction,
// name, price. A click opens that card in the catalog below. The ring is moved
// per frame with transforms only, paused off screen and still under reduced
// motion.

const TURN_MS = 75_000; // one full turn

export function ServicesHero({ onPick }: { onPick: (g: ServiceGroup, slug?: string) => void }) {
  const { language } = useLanguage();
  const lines = [
    pick({ en: "Services", ru: "Услуги", zh: "服务", tr: "Hizmetler", ar: "الخدمات" }, language),
    pick({ en: "end to end", ru: "под ключ", zh: "全流程交付", tr: "uçtan uca", ar: "من البداية إلى النهاية" }, language),
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#06060B] pb-12 pt-14 text-white md:pb-16 md:pt-16">
      <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10 opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "64px 64px" }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center font-brand text-[2.6rem] font-semibold leading-[1] tracking-[-0.035em] sm:text-6xl lg:text-[4.5rem]">
          {lines.map((line, i) => (
            <Fragment key={i}>
              <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span className="hero-rise inline-block" style={{ ["--d" as string]: `${0.08 + i * 0.12}s` }}>
                  <span className={i === 0 ? "home-gradient-text" : undefined}>{line}</span>
                </span>
              </span>
              {i === 0 ? " " : null}
            </Fragment>
          ))}
        </h1>

        <Ring onPick={onPick} />
      </div>
    </section>
  );
}

/* ───────────── The ring of services ───────────── */

function Ring({ onPick }: { onPick: (g: ServiceGroup, slug?: string) => void }) {
  const { translations, language } = useLanguage();
  const reduced = useReducedMotion();
  const packages = translations.packages.items;
  // filed by direction, so each direction's colours sit together on the ring
  const cards = SERVICE_GROUPS.flatMap((g) => packages.filter((p) => p.group === g.id));
  const n = cards.length;

  const box = useRef<HTMLDivElement>(null);
  const dots = useRef<(HTMLButtonElement | null)[]>([]);
  const [hover, setHover] = useState<number | null>(null);
  const [top, setTop] = useState(0);
  const hovering = useRef(false);
  useEffect(() => {
    hovering.current = hover !== null;
  }, [hover]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let raf = 0, last = 0, a = 0, speed = 0, visible = true, shownTop = -1;
    const place = () => {
      const r = el.clientWidth / 2 - (el.clientWidth < 480 ? 22 : 30);
      let best = 0, bestY = Infinity;
      for (let i = 0; i < n; i++) {
        const node = dots.current[i];
        if (!node) continue;
        const t = a + (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(t) * r, y = Math.sin(t) * r;
        node.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        if (y < bestY) { bestY = y; best = i; }
      }
      if (best !== shownTop) { shownTop = best; setTop(best); }
    };
    const frame = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      // ease to a stop while a dot is hovered, and back up after
      const target = hovering.current ? 0 : (Math.PI * 2) / TURN_MS;
      speed += (target - speed) * Math.min(1, dt / 260);
      a -= speed * dt;
      place();
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    place();
    if (reduced) return;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
    });
    io.observe(el);
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [reduced, n]);

  const active = hover ?? top;
  const p = cards[active];
  const c = PKG_COLOR[p.id];
  const groupOf = (id: ServiceGroup) => SERVICE_GROUPS.find((g) => g.id === id)!;
  const go = (k: number) => onPick(cards[k].group, PACKAGE_SLUGS[cards[k].id as PackageId]);

  return (
    <div ref={box} className="hero-up relative mx-auto mt-10 aspect-square w-full max-w-[340px] sm:max-w-[520px] lg:mt-12" onMouseLeave={() => setHover(null)}>
      {/* soft glow in the active service's colour */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-[12%] rounded-full transition-[background] duration-1000" style={{ background: `radial-gradient(closest-side, rgb(${c} / 0.22), transparent)` }} />
      {/* the track, a fainter outer ring and a marker at the top */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-[22px] rounded-full border border-white/10 sm:inset-[30px]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-[4px] rounded-full border border-dashed border-white/[0.05]" />
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[2px] h-3 w-px -translate-x-1/2 bg-white/40 sm:top-[6px]" />

      {/* the centre: the service at the top of the ring, or the one hovered */}
      <button
        type="button"
        onClick={() => go(active)}
        data-ring-centre=""
        className="absolute inset-[22%] grid place-items-center rounded-full text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <span aria-hidden="true" className="absolute inset-0 rounded-full border transition-colors duration-700" style={{ borderColor: `rgb(${c} / 0.25)`, background: "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.05), rgba(10,10,16,0.6) 70%)" }} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={p.id}
            className="relative block px-4"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <span className="block font-mono text-[10px] uppercase tracking-[0.14em] sm:text-[11px]" style={{ color: `rgb(${c})` }}>{pick(groupOf(p.group).label, language)}</span>
            <span className="mt-1.5 block font-brand text-[1.15rem] font-semibold leading-tight text-white sm:mt-2 sm:text-[1.6rem]">{pick(p.title, language)}</span>
            <span className="mt-1.5 block font-mono text-[11px] text-white/50 sm:mt-2 sm:text-[12px]">
              {pick(p.timeline, language)} · <span className="text-white/85">{pick(p.startingPrice, language)}</span>
            </span>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium sm:mt-4 sm:text-body-sm" style={{ color: `rgb(${c})` }}>
              {pick({ en: "Open", ru: "Открыть", zh: "查看", tr: "Aç", ar: "افتح" }, language)} <span aria-hidden="true">→</span>
            </span>
          </motion.span>
        </AnimatePresence>
      </button>

      {/* one dot per service */}
      {cards.map((card, k) => {
        const on = k === active;
        const cc = PKG_COLOR[card.id];
        return (
          <button
            key={card.id}
            ref={(node) => { dots.current[k] = node; }}
            type="button"
            onMouseEnter={() => setHover(k)}
            onFocus={() => setHover(k)}
            onClick={() => go(k)}
            aria-label={pick(card.title, language)}
            data-ring-dot=""
            className="absolute left-1/2 top-1/2 grid h-9 w-9 place-items-center rounded-full will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:h-11 sm:w-11"
          >
            <span
              aria-hidden="true"
              className="block rounded-full transition-[width,height,box-shadow] duration-500 ease-out"
              style={{
                width: on ? 18 : 10,
                height: on ? 18 : 10,
                background: `radial-gradient(circle at 35% 30%, #fff 0 8%, rgb(${cc}) 45%)`,
                boxShadow: on ? `0 0 0 5px rgb(${cc} / 0.18), 0 0 22px rgb(${cc})` : `0 0 10px rgb(${cc} / 0.6)`,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
