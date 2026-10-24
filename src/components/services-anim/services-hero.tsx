"use client";

import { Fragment } from "react";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";

// /services hero: the headline centred on top, and under it two full-width rows
// of abstract cards drifting in opposite directions, each card gently bobbing
// with a slow sheen. Decorative only (the services are listed right below).
// CSS only: transforms, paused off screen and under reduced motion.

// Decorative only: abstract cards (no text) in the accent colours of the site.
const PALETTE = ["6 182 212", "99 102 241", "236 72 153", "249 115 22", "163 230 53", "56 189 248", "244 63 94", "20 184 166", "139 92 246", "234 179 8"];

function GhostCard({ k }: { k: number }) {
  const c = PALETTE[k % PALETTE.length];
  // a few varied "text" lines so neighbouring cards don't look identical
  const w = [[62, 88, 48], [74, 56, 80], [50, 82, 64], [86, 44, 70]][k % 4];
  const wide = k % 3 === 1;
  return (
    <div
      className="sv-ghost relative h-[150px] shrink-0 overflow-hidden rounded-[20px] border border-white/[0.07] sm:h-[170px]"
      style={{
        width: wide ? 300 : 220,
        background: "linear-gradient(180deg, rgba(24,24,34,0.9) 0%, rgba(13,13,20,0.9) 100%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 50px -36px rgba(0,0,0,0.9)",
        ["--bob" as string]: `${-(k * 0.9) % 6}s`,
      }}
    >
      <span className="absolute inset-x-0 top-0 h-[2px]" style={{ background: `linear-gradient(90deg, rgb(${c}), transparent 75%)` }} />
      <span className="absolute -right-12 -top-12 h-32 w-32 rounded-full" style={{ background: `radial-gradient(closest-side, rgb(${c} / 0.16), transparent)` }} />
      <span className="absolute left-5 top-5 h-2 w-2 rounded-full" style={{ background: `rgb(${c})`, boxShadow: `0 0 10px rgb(${c} / 0.7)` }} />
      <span className="absolute right-5 top-5 h-1.5 w-10 rounded-full bg-white/[0.08]" />
      <span className="absolute left-5 top-11 h-3 rounded-full bg-white/[0.14]" style={{ width: `${w[0] * 0.7}%` }} />
      <span className="absolute left-5 top-[4.6rem] h-1.5 rounded-full bg-white/[0.07]" style={{ width: `${w[1] * 0.8}%` }} />
      <span className="absolute left-5 top-[5.4rem] h-1.5 rounded-full bg-white/[0.07]" style={{ width: `${w[2] * 0.8}%` }} />
      <span className="absolute inset-x-5 bottom-5 flex items-center justify-between border-t border-white/[0.06] pt-3">
        <span className="h-1.5 w-12 rounded-full" style={{ background: `rgb(${c} / 0.5)` }} />
        <span className="h-1.5 w-4 rounded-full bg-white/[0.12]" />
      </span>
      <span className="sv-ghost-sheen absolute inset-0" />
    </div>
  );
}

function Row({ count, offset, dur, reverse }: { count: number; offset: number; dur: number; reverse?: boolean }) {
  return (
    <div className="sv-marquee" style={{ ["--dur" as string]: `${dur}s`, ["--dir" as string]: reverse ? "reverse" : "normal" }}>
      {[0, 1].map((copy) => (
        <div key={copy} className="sv-marquee-track">
          {Array.from({ length: count }, (_, i) => <GhostCard key={i} k={i + offset} />)}
        </div>
      ))}
    </div>
  );
}

export function ServicesHero() {
  const { language } = useLanguage();
  const lines = [
    pick({ en: "Services", ru: "Услуги", zh: "服务", tr: "Hizmetler", ar: "الخدمات" }, language),
    pick({ en: "end to end", ru: "под ключ", zh: "全流程交付", tr: "uçtan uca", ar: "من البداية إلى النهاية" }, language),
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#06060B] pb-14 pt-14 text-white md:pb-20 md:pt-16">
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
      </div>

      {/* full width, edge to edge */}
      <div aria-hidden="true" className="hero-up pointer-events-none mt-10 space-y-2 md:mt-14">
        <Row count={9} offset={0} dur={70} />
        <Row count={9} offset={5} dur={85} reverse />
      </div>
    </section>
  );
}
