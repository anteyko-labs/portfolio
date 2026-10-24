"use client";

import { Fragment } from "react";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { PACKAGE_SLUGS, type PackageId, type ServiceGroup } from "@/lib/service-slugs";
import { PKG_COLOR } from "./visual-frame";

// /services hero: the headline centred on top, and under it two full-width rows
// of service cards drifting in opposite directions (CSS only: transform, paused
// on hover, off screen and under reduced motion). A click on a card opens it in
// the catalog below.

type Pkg = ReturnType<typeof useLanguage>["translations"]["packages"]["items"][number];

function Card({ p, onPick, hidden }: { p: Pkg; onPick: (g: ServiceGroup, slug?: string) => void; hidden?: boolean }) {
  const { language } = useLanguage();
  const c = PKG_COLOR[p.id];
  return (
    <button
      type="button"
      // the second copy of each row is only there to close the loop
      tabIndex={hidden ? -1 : undefined}
      aria-hidden={hidden || undefined}
      onClick={() => onPick(p.group, PACKAGE_SLUGS[p.id as PackageId])}
      className="group relative flex w-[230px] shrink-0 flex-col overflow-hidden rounded-[20px] border border-white/[0.08] p-5 text-left transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:w-[300px] sm:p-6"
      style={{ background: "linear-gradient(180deg, #16161F 0%, #0E0E15 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 50px -36px rgba(0,0,0,0.9)" }}
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px]" style={{ background: `linear-gradient(90deg, rgb(${c}), transparent 75%)` }} />
      <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(closest-side, rgb(${c} / 0.22), transparent)` }} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 ring-1 transition-opacity duration-500 group-hover:opacity-100" style={{ ["--tw-ring-color" as string]: `rgb(${c} / 0.45)` }} />
      <span className="flex items-center justify-between">
        <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: `rgb(${c})`, boxShadow: `0 0 10px rgb(${c} / 0.7)` }} />
        <span className="font-mono text-[11px] text-white/40">{pick(p.timeline, language)}</span>
      </span>
      <span className="mt-4 line-clamp-2 block min-h-[2.5em] font-brand text-[1.1rem] font-semibold leading-[1.25] text-white sm:text-[1.3rem]">{pick(p.title, language)}</span>
      <span className="mt-2 line-clamp-2 block min-h-[2.7em] text-[13px] leading-snug text-white/55">{pick(p.description, language)}</span>
      <span className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
        <span className="font-mono text-[12px] text-white/80">{pick(p.startingPrice, language)}</span>
        <span aria-hidden="true" className="text-white/40 transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </button>
  );
}

function Row({ items, onPick, dur, reverse }: { items: Pkg[]; onPick: (g: ServiceGroup, slug?: string) => void; dur: number; reverse?: boolean }) {
  return (
    <div className="sv-marquee" style={{ ["--dur" as string]: `${dur}s`, ["--dir" as string]: reverse ? "reverse" : "normal" }}>
      {[0, 1].map((copy) => (
        <div key={copy} className="sv-marquee-track">
          {items.map((p) => (
            <Card key={`${copy}-${p.id}`} p={p} onPick={onPick} hidden={copy === 1} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ServicesHero({ onPick }: { onPick: (g: ServiceGroup, slug?: string) => void }) {
  const { translations, language } = useLanguage();
  const packages = translations.packages.items;
  // two rows, interleaved so neighbouring cards differ
  const rowA = packages.filter((_, i) => i % 2 === 0);
  const rowB = packages.filter((_, i) => i % 2 === 1);
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
      <div className="hero-up mt-10 space-y-2 md:mt-14">
        <Row items={rowA} onPick={onPick} dur={80} />
        <Row items={rowB} onPick={onPick} dur={95} reverse />
      </div>
    </section>
  );
}
