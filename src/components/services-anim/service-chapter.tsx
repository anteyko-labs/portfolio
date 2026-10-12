"use client";

import { useRef } from "react";
import clsx from "clsx";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { useReducedMotion } from "@/lib/hooks";
import type { translations } from "@/lib/translations";
import { PACKAGE_SLUGS } from "@/lib/service-slugs";
import { EASE } from "@/components/motion/kit";
import { ButtonLink, Link } from "@/components/ui/link";
import { CheckList, ShineBadge } from "./parts";
import { PKG_COLOR, PackageVisual } from "./package-visuals";

type Package = (typeof translations)["packages"]["items"][number];

/**
 * One service on /services as a chapter, not a card: the visual is revealed by a
 * wipe from alternating sides, the text sharpens out of a blur, and a rail next
 * to the number fills while the chapter scrolls by. Prices live on /pricing only,
 * which animates its tiers differently (a flip-in price board).
 */
export function ServiceChapter({ pkg, index }: { pkg: Package; index: number }) {
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  const flip = index % 2 === 1;
  const color = PKG_COLOR[pkg.id];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 40%"] });
  const rail = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  // One trigger for the whole chapter: a fully clipped visual never counts as
  // "in view" for its own observer, so on phones it stayed hidden
  const shown = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const reveal = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, filter: "blur(10px)", y: 14 },
          animate: shown ? { opacity: 1, filter: "blur(0px)", y: 0 } : undefined,
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <li ref={ref} className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      {/* visual: wipes in from the outer edge */}
      <motion.div
        className={clsx("relative lg:sticky lg:top-28", flip && "lg:order-2")}
        initial={reduced ? false : { clipPath: flip ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
        animate={shown ? { clipPath: "inset(0 0% 0 0%)" } : undefined}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-60 blur-2xl"
          style={{ background: `radial-gradient(60% 60% at 50% 50%, rgb(${color} / 0.22), transparent 70%)` }}
        />
        <div className="rounded-2xl border border-border bg-bg-primary p-4 shadow-[0_30px_60px_-35px_rgba(10,10,10,0.35)] sm:p-6">
          <PackageVisual id={pkg.id} />
        </div>
      </motion.div>

      {/* text */}
      <div className="relative flex gap-5 sm:gap-8">
        <div className="flex shrink-0 flex-col items-center">
          <motion.span
            className="font-brand text-4xl font-semibold leading-none tabular-nums sm:text-5xl"
            style={{ color: `rgb(${color})` }}
            {...reveal(0)}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
          <span className="relative mt-4 w-px flex-1 overflow-hidden bg-border" aria-hidden="true">
            <motion.span
              className="absolute inset-0 origin-top"
              style={{ scaleY: reduced ? 1 : rail, background: `rgb(${color})` }}
            />
          </span>
        </div>

        <div className="min-w-0 flex-1 pb-2">
          <motion.div className="flex flex-wrap items-center gap-3" {...reveal(0.05)}>
            <h2 className="font-brand text-3xl font-semibold tracking-[-0.02em] text-text-primary md:text-4xl">{pkg.title[language]}</h2>
            {pkg.id === "web3-addon" && <ShineBadge tone="soft">Add-on</ShineBadge>}
          </motion.div>
          <motion.p className="mt-2 font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary" {...reveal(0.1)}>
            {pkg.timeline[language]}
          </motion.p>
          <motion.p className="mt-5 text-body-lg text-text-secondary" {...reveal(0.15)}>
            {pkg.description[language]}
          </motion.p>

          <motion.div className="mt-6 rounded-xl border border-border bg-bg-primary/70 p-4" {...reveal(0.2)}>
            <p className="mb-1 text-caption uppercase tracking-wider text-text-muted">
              {pick({ en: "Best for", ru: "Подходит для", zh: "适用于", tr: "En uygun olduğu durum", ar: "الأنسب لـ" }, language)}
            </p>
            <p className="text-body-sm text-text-primary">{pkg.forWhom[language]}</p>
          </motion.div>

          <div className="mt-6">
            <p className="mb-3 text-caption uppercase tracking-wider text-text-muted">
              {pick({ en: "What you get", ru: "Что получите", zh: "您将获得", tr: "Neler alırsınız", ar: "ما ستحصل عليه" }, language)}
            </p>
            <CheckList items={pkg.deliverables[language].slice(0, 5)} />
          </div>

          <motion.p className="mt-6 border-l-2 pl-4 text-body-sm text-text-primary" style={{ borderColor: `rgb(${color})` }} {...reveal(0.25)}>
            {pkg.result[language]}
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href={`/services/${PACKAGE_SLUGS[pkg.id as keyof typeof PACKAGE_SLUGS]}`} buttonVariant="secondary" size="md">
              {pick({ en: "Learn more", ru: "Подробнее", zh: "了解更多", tr: "Daha fazla bilgi", ar: "اعرف المزيد" }, language)}
            </ButtonLink>
            <Link href={`/contact?package=${pkg.id}`} variant="underline" className="text-body-sm">
              {t("cta.secondary")}
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
