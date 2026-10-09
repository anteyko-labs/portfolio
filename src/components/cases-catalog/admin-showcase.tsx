"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import type { ShowcaseItem } from "@/lib/showcase-data";

const STEP = 4200;

/**
 * Back-office section on a case page: the admin screen sits tilted in
 * perspective and straightens as it scrolls in; tabs cycle through the screens.
 */
export function AdminShowcase({ item }: { item: ShowcaseItem }) {
  const { language } = useLanguage();
  const en = language === "en";
  const reduced = useReducedMotion();
  const screens = item.admin ?? [];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [26, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  useEffect(() => {
    if (screens.length < 2 || paused || reduced) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % screens.length), STEP);
    return () => window.clearTimeout(id);
  }, [index, paused, reduced, screens.length]);

  if (screens.length === 0) return null;
  const accent = item.palette[2];

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0A0A0F] py-20 text-white md:py-28">
      {/* glow in the project's accent colour */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[620px] w-[900px] -translate-x-1/2 rounded-full opacity-35 blur-[120px]"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 65%)` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "56px 56px" }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-caption uppercase tracking-[0.16em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
            {en ? "Admin panel" : "Админ-панель"}
          </p>
          <h2 className="mt-5 font-brand text-3xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl">
            {en ? "The back office behind the storefront" : "Админка, в которой работает команда"}
          </h2>
          <p className="mt-4 text-body-lg text-white/60">
            {en
              ? "Customers see the site; the team runs the business here — orders, catalog, people and numbers in one place."
              : "Клиенты видят сайт, а бизнес управляется здесь: заказы, каталог, люди и цифры в одном месте."}
          </p>
        </div>

        <div className="mt-12 [perspective:1600px] md:mt-16">
          <motion.div
            style={reduced ? undefined : { rotateX, scale, y, transformOrigin: "50% 100%" }}
            className="relative mx-auto max-w-5xl"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
          >
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#14141c] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]">
              <div className="flex h-10 items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4">
                <span className="flex gap-1.5" aria-hidden="true">
                  <i className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                  <i className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                  <i className="h-3 w-3 rounded-full bg-[#28C840]" />
                </span>
                <span className="mx-auto truncate rounded-md bg-white/5 px-4 py-0.5 font-mono text-caption text-white/50">
                  {item.domain} / admin
                </span>
                <span className="w-[52px]" aria-hidden="true" />
              </div>
              <div className="relative aspect-[16/10] bg-[#0f0f15]">
                {screens.map((s, i) => (
                  <Image
                    key={s.src}
                    src={s.src}
                    alt={s.title[language]}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className={clsx(
                      "object-cover object-top transition-[opacity,transform] duration-700 ease-out",
                      i === index ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"
                    )}
                  />
                ))}
                {/* sheen passing over the screen */}
                <span className="admin-sheen pointer-events-none absolute inset-0" aria-hidden="true" />
              </div>
            </div>
            {/* reflection on the "desk" */}
            <div
              aria-hidden="true"
              className="mx-auto h-10 w-[92%] rounded-[50%] opacity-60 blur-2xl"
              style={{ background: `radial-gradient(closest-side, ${accent}66, transparent)` }}
            />
          </motion.div>
        </div>

        {screens.length > 1 ? (
          <div className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-3" role="tablist" aria-label={en ? "Admin screens" : "Экраны админки"}>
            {screens.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className={clsx(
                  "group relative w-full overflow-hidden rounded-xl border px-4 py-3 text-left sm:w-80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
                  i === index ? "border-white/30 bg-white/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                )}
              >
                <span className="font-mono text-caption text-white/40">{String(i + 1).padStart(2, "0")}</span>
                <span className={clsx("mt-1 block text-body-sm font-medium", i === index ? "text-white" : "text-white/70")}>
                  {s.title[language]}
                </span>
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
                  <span
                    key={`${index}-${paused}`}
                    className="block h-full"
                    style={{
                      background: accent,
                      width: i !== index ? "0%" : paused || reduced ? "100%" : undefined,
                      animation: i === index && !paused && !reduced ? `admin-progress ${STEP}ms linear forwards` : undefined,
                    }}
                  />
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="mx-auto mt-6 max-w-5xl text-center text-body-md text-white/70">{screens[0].title[language]}</p>
        )}
      </div>
    </section>
  );
}
