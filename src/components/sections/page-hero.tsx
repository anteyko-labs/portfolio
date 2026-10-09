"use client";

import { ReactNode, useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Link as NextLink } from "@/i18n/navigation";
import { useReducedMotion } from "@/lib/hooks";

interface PageHeroMetric {
  label: string;
  value: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  metric?: PageHeroMetric;
  rightSlot?: ReactNode;
  align?: "left" | "center";
  backgroundImage?: string;
  backLink?: { href: string; label: string };
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** "40+" counts up from 0; values without a leading number are shown as is */
function MetricValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const m = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
    const el = ref.current;
    if (!m || !el || reduced) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(",", "."));
    const decimals = /[.,]/.test(num) ? num.split(/[.,]/)[1].length : 0;
    const c = animate(0, target, { duration: 1.4, delay: 0.5, ease: EASE, onUpdate: (v) => (el.textContent = `${pre}${v.toFixed(decimals)}${post}`) });
    return () => c.stop();
  }, [value, reduced]);
  return <span ref={ref}>{value}</span>;
}

/**
 * Inner-page hero in the home-page language: dark aurora stage, a grid that
 * fades out at the edges, the title revealed word by word and an optional
 * floating side card that tilts towards the pointer.
 */
export function PageHero({
  title,
  subtitle,
  eyebrow,
  metric,
  rightSlot,
  align = "center",
  backgroundImage,
  backLink,
}: PageHeroProps) {
  const reduced = useReducedMotion();
  const isSplit = Boolean(rightSlot);
  const center = align === "center" && !isSplit;
  const words = title.split(" ");

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const rotY = useTransform(sx, [-1, 1], [6, -6]);
  const rotX = useTransform(sy, [-1, 1], [-5, 5]);

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !isSplit) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <section onPointerMove={onMove} className="relative isolate overflow-hidden bg-[#06060B] pb-16 pt-16 text-white md:pb-24 md:pt-20">
      <div aria-hidden="true" className="home-aurora pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "64px 64px" }}
      />
      {backgroundImage && (
        <div className="absolute inset-0 -z-10">
          <Image src={backgroundImage} alt="" fill priority className="object-cover opacity-25 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06060B] via-[#06060B]/70 to-[#06060B]/30" />
        </div>
      )}

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className={isSplit ? "grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]" : center ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
          <div>
            {backLink && (
              <motion.div initial={reduced ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                <NextLink
                  href={backLink.href}
                  className="group mb-8 inline-flex items-center gap-2 font-mono text-caption uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-white"
                >
                  <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">←</span>
                  {backLink.label}
                </NextLink>
              </motion.div>
            )}

            {eyebrow && (
              <motion.p
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 backdrop-blur"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {eyebrow}
              </motion.p>
            )}

            <h1 className="mt-6 font-brand text-4xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl md:text-6xl">
              {words.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <motion.span
                    className={i === 0 ? "home-gradient-text inline-block" : "inline-block"}
                    initial={reduced ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.08 + i * 0.05, ease: EASE }}
                  >
                    {w}
                    {i < words.length - 1 ? " " : ""}
                  </motion.span>
                </span>
              ))}
            </h1>

            {subtitle && (
              <motion.p
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                className={`mt-6 text-body-lg text-white/60 ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
              >
                {subtitle}
              </motion.p>
            )}

            {metric && (
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                className={`mt-8 flex items-baseline gap-3 ${center ? "justify-center" : ""}`}
              >
                <span className="home-gradient-text font-brand text-5xl font-semibold tabular-nums">
                  <MetricValue value={metric.value} />
                </span>
                <span className="text-body-md text-white/60">{metric.label}</span>
              </motion.div>
            )}
          </div>

          {rightSlot && (
            <div className="[perspective:1400px]">
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
                style={reduced ? undefined : { rotateY: rotY, rotateX: rotX }}
                className="relative"
              >
                <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-indigo-500/30 via-fuchsia-500/20 to-cyan-400/20 blur-2xl" />
                <div className="rounded-2xl bg-bg-primary text-text-primary shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">{rightSlot}</div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
