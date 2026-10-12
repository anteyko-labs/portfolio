"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { useReducedMotion } from "@/lib/hooks";
import type { translations } from "@/lib/translations";
import { PACKAGE_SLUGS } from "@/lib/service-slugs";
import { EASE, SpotlightCard } from "@/components/motion/kit";
import { ButtonLink, Link } from "@/components/ui/link";
import { CheckList, Price, ShineBadge } from "./parts";
import { PKG_COLOR } from "./package-visuals";

type Package = (typeof translations)["packages"]["items"][number];

const SHOWN = 5;

export type TierEntrance = "flip" | "curtain";

const ENTRANCE: Record<TierEntrance, { initial: Record<string, number | string>; animate: Record<string, number | string> }> = {
  // hinged at the top edge, flips up toward the viewer
  flip: { initial: { opacity: 0, rotateX: -70, y: 30 }, animate: { opacity: 1, rotateX: 0, y: 0 } },
  // a curtain lifts from the bottom edge
  curtain: { initial: { clipPath: "inset(100% 0 0 0 round 16px)", y: 24 }, animate: { clipPath: "inset(0% 0 0 0 round 16px)", y: 0 } },
};

/**
 * A tier on the /pricing price board. Price first, no illustration (those are
 * the /services chapters). Each price group enters its own way (`entrance`),
 * then the price counts up.
 */
export function PriceTier({ pkg, index, recommended, entrance = "flip" }: { pkg: Package; index: number; recommended: boolean; entrance?: TierEntrance }) {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const color = PKG_COLOR[pkg.id];
  const items = pkg.deliverables[language];
  const more = items.length - SHOWN;

  const card = (
    <SpotlightCard
      color={color}
      className={clsx(
        "flex h-full flex-col rounded-2xl bg-bg-primary p-6",
        recommended ? "border border-transparent" : "border border-border"
      )}
    >
      <div className="flex min-h-7 flex-wrap items-center gap-2">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: `rgb(${color})` }} />
        <h2 className="text-heading-md font-display font-bold text-text-primary">{pkg.title[language]}</h2>
        {recommended && <ShineBadge>{pick({ en: "Popular", ru: "Популярный", zh: "热门", tr: "Popüler", ar: "الأكثر طلبًا" }, language)}</ShineBadge>}
        {pkg.id === "web3-addon" && <ShineBadge tone="soft">Add-on</ShineBadge>}
      </div>

      <p className="mt-6 font-brand text-4xl font-semibold tracking-[-0.03em] text-text-primary">
        <Price value={pkg.startingPrice[language]} />
      </p>
      <p className="mt-1 text-body-sm text-text-muted">{pkg.timeline[language]}</p>

      <div className="my-6 h-px bg-border" />

      <CheckList items={items.slice(0, SHOWN)} className="flex-1 space-y-2" />
      {more > 0 && (
        <Link href={`/services/${PACKAGE_SLUGS[pkg.id as keyof typeof PACKAGE_SLUGS]}`} variant="underline" className="mt-3 text-body-sm">
          {pick({ en: `+ ${more} more in the details`, ru: `+ ещё ${more} в описании услуги`, zh: `另有 ${more} 项，见服务详情`, tr: `+ ${more} madde daha, ayrıntılarda`, ar: `+ ${more} بنود أخرى في التفاصيل` }, language)}
        </Link>
      )}

      <ButtonLink
        href={`/contact?package=${pkg.id}`}
        buttonVariant={recommended ? "primary" : "secondary"}
        size="md"
        className="mt-8 w-full justify-center"
      >
        {pick({ en: "Get an estimate", ru: "Получить оценку", zh: "获取报价", tr: "Teklif al", ar: "احصل على تقدير" }, language)}
      </ButtonLink>
    </SpotlightCard>
  );

  return (
    <motion.div
      className="h-full [transform-origin:50%_0%]"
      initial={reduced ? false : ENTRANCE[entrance].initial}
      whileInView={ENTRANCE[entrance].animate}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: EASE }}
      style={{ transformPerspective: 1200 }}
    >
      {recommended ? (
        <div className="sv-ring isolate h-full rounded-2xl p-[1.5px] lg:-translate-y-3" style={{ ["--sv-c" as string]: color }}>
          {card}
        </div>
      ) : (
        card
      )}
    </motion.div>
  );
}

/**
 * Modules and support on /pricing: wide rows instead of tiers. Each row slides
 * in from the side while its accent rule draws down the left edge.
 */
export function PriceRow({ pkg, index }: { pkg: Package; index: number }) {
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();
  const color = PKG_COLOR[pkg.id];
  return (
    <motion.li
      className="relative grid gap-6 overflow-hidden rounded-2xl border border-border bg-bg-primary p-6 md:grid-cols-[1.1fr_1.4fr_auto] md:items-center md:gap-10 md:p-8"
      initial={reduced ? false : { opacity: 0, x: index % 2 ? 60 : -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 origin-top"
        style={{ background: `rgb(${color})` }}
        initial={reduced ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3 + index * 0.1, ease: EASE }}
      />
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-heading-md font-display font-bold text-text-primary">{pkg.title[language]}</h3>
          {pkg.id === "web3-addon" && <ShineBadge tone="soft">Add-on</ShineBadge>}
        </div>
        <p className="mt-3 font-brand text-3xl font-semibold tracking-[-0.03em] text-text-primary">
          <Price value={pkg.startingPrice[language]} />
        </p>
        <p className="mt-1 text-body-sm text-text-muted">{pkg.timeline[language]}</p>
      </div>
      <CheckList items={pkg.deliverables[language].slice(0, 4)} className="grid gap-2 sm:grid-cols-2" />
      <div className="flex flex-col gap-3 md:items-end">
        <ButtonLink href={`/contact?package=${pkg.id}`} buttonVariant="secondary" size="md" className="justify-center">
          {pick({ en: "Get an estimate", ru: "Получить оценку", zh: "获取报价", tr: "Teklif al", ar: "احصل على تقدير" }, language)}
        </ButtonLink>
        <Link href={`/services/${PACKAGE_SLUGS[pkg.id as keyof typeof PACKAGE_SLUGS]}`} variant="underline" className="text-body-sm">
          {t("cta.learnMore")}
        </Link>
      </div>
    </motion.li>
  );
}
