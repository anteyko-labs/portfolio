"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { useReducedMotion } from "@/lib/hooks";
import { EASE } from "@/components/motion/kit";
import { ButtonLink } from "@/components/ui/link";
import { Link as NextLink } from "@/i18n/navigation";
import { PACKAGE_SLUGS, SERVICE_GROUPS, type PackageId, type ServiceGroup } from "@/lib/service-slugs";
import { PackageVisual } from "./package-visuals";
import { PKG_COLOR } from "./visual-frame";

// The service catalog as a card index: one folder tab per direction, and the
// folder's services laid out as index cards. Every card stays in the HTML (the
// other folders are only hidden), so crawlers read all of them; a link like
// /services#parking-system opens the right folder and scrolls to the card.

type Pkg = ReturnType<typeof useLanguage>["translations"]["packages"]["items"][number];

function IndexCard({ p, n, total, i, animate }: { p: Pkg; n: number; total: number; i: number; animate: boolean }) {
  const { language } = useLanguage();
  const color = PKG_COLOR[p.id];
  const slug = PACKAGE_SLUGS[p.id as PackageId];
  return (
    <motion.article
      id={slug}
      className="group relative flex scroll-mt-32 flex-col rounded-2xl border border-border bg-bg-primary p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(15,15,30,0.35)] sm:p-5"
      style={{ ["--c" as string]: color }}
      initial={animate ? { opacity: 0, y: 24, rotate: i % 2 ? 1.2 : -1.2 } : false}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.55, delay: animate ? i * 0.07 : 0, ease: EASE }}
    >
      {/* colour rim on hover */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 transition-opacity duration-300 group-hover:opacity-100" style={{ ["--tw-ring-color" as string]: `rgb(${color} / 0.45)` }} />
      <div className="overflow-hidden rounded-xl">
        <PackageVisual id={p.id} />
      </div>
      <div className="mt-5 flex items-center justify-between font-mono text-caption tracking-[0.14em] text-text-tertiary">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: `rgb(${color})` }} />
          {String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span>{pick(p.timeline, language)}</span>
      </div>
      <h3 className="mt-3 font-brand text-2xl font-semibold tracking-[-0.02em] text-text-primary">
        <NextLink href={`/services/${slug}`} className="transition-colors after:absolute after:inset-0 after:rounded-2xl after:content-[''] group-hover:text-[rgb(var(--c))] focus-visible:outline-none">{pick(p.title, language)}</NextLink>
      </h3>
      <p className="mt-2 text-body-md text-text-secondary">{pick(p.description, language)}</p>
      <ul className="mt-4 space-y-1.5">
        {p.deliverables[language].slice(0, 3).map((x) => (
          <li key={x} className="flex gap-2 text-body-sm text-text-secondary">
            <span aria-hidden="true" className="mt-2 h-1 w-3 shrink-0 rounded-full" style={{ background: `rgb(${color})` }} />
            {x}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <p className="font-brand text-2xl font-semibold" style={{ color: `rgb(${color})` }}>{pick(p.startingPrice, language)}</p>
        {/* above the card-wide link */}
        <ButtonLink href={`/contact?package=${p.id}`} buttonVariant="secondary" size="sm" className="relative z-10">
          {pick({ en: "Discuss", ru: "Обсудить", zh: "咨询", tr: "Görüşelim", ar: "ناقشها" }, language)}
        </ButtonLink>
      </div>
    </motion.article>
  );
}

export function ServiceCabinet() {
  const { translations, language } = useLanguage();
  const reduced = useReducedMotion();
  const packages = translations.packages.items;
  const groups = SERVICE_GROUPS.map((g) => ({ ...g, items: packages.filter((p) => p.group === g.id) })).filter((g) => g.items.length);
  const [tab, setTab] = useState<ServiceGroup>(groups[0].id);
  // cards animate in when a folder is opened, not on first paint
  const [opened, setOpened] = useState(false);

  // /services#<slug>: open that card's folder and bring the card into view
  useEffect(() => {
    const slug = decodeURIComponent(location.hash.slice(1));
    const pkg = packages.find((p) => PACKAGE_SLUGS[p.id as PackageId] === slug);
    if (!pkg) return;
    setTab(pkg.group);
    requestAnimationFrame(() => document.getElementById(slug)?.scrollIntoView({ block: "start" }));
    // packages come from static data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const open = (id: ServiceGroup) => {
    setOpened(true);
    setTab(id);
  };

  let offset = 0;
  return (
    <section id="catalog" className="scroll-mt-20 bg-bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className="font-brand text-3xl font-semibold tracking-[-0.02em] text-text-primary md:text-5xl">
            {pick({ en: "The catalog", ru: "Картотека услуг", zh: "服务目录", tr: "Hizmet kataloğu", ar: "دليل الخدمات" }, language)}
          </h2>
          <p className="max-w-md text-body-md text-text-secondary">
            {pick({ en: "Pick a direction, then a card. Each one opens a page with the process, capabilities and answers.", ru: "Выберите направление, затем карточку. В каждой — страница с этапами работы, возможностями и ответами на вопросы.", zh: "先选方向，再选卡片。每张卡片都有详细页面：流程、功能与常见问题。", tr: "Önce bir alan, sonra bir kart seçin. Her kart süreç, özellikler ve yanıtlarla bir sayfa açar.", ar: "اختر المجال ثم البطاقة. كل بطاقة تفتح صفحة فيها مراحل العمل والإمكانات والإجابات." }, language)}
          </p>
        </div>

        {/* folder tabs */}
        <div role="tablist" aria-label={pick({ en: "Directions", ru: "Направления", zh: "方向", tr: "Alanlar", ar: "المجالات" }, language)} className="scrollbar-hide -mb-px flex gap-1 overflow-x-auto">
          {groups.map((g) => {
            const on = g.id === tab;
            return (
              <button
                key={g.id}
                type="button"
                role="tab"
                id={`tab-${g.id}`}
                aria-selected={on}
                aria-controls={`panel-${g.id}`}
                onClick={() => open(g.id)}
                className={clsx(
                  "relative shrink-0 rounded-t-2xl border border-b-0 px-5 py-3.5 text-left transition-colors",
                  on ? "border-border bg-bg-primary text-text-primary" : "border-transparent text-text-secondary hover:text-text-primary"
                )}
              >
                {on && <motion.span layoutId="cabinet-tab" aria-hidden="true" className="absolute inset-x-5 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-accent-primary to-fuchsia-500" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
                <span className="block whitespace-nowrap text-body-md font-medium">{pick(g.label, language)}</span>
                <span className="mt-0.5 flex items-center gap-1.5">
                  {g.items.map((p) => (
                    <span key={p.id} aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: `rgb(${PKG_COLOR[p.id]})`, opacity: on ? 1 : 0.5 }} />
                  ))}
                  <span className="ml-1 font-mono text-[11px] text-text-tertiary">{g.items.length}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* folders */}
        <div className="rounded-b-3xl rounded-tr-3xl border border-border bg-bg-primary/60 p-3 sm:p-5 md:p-6">
          {groups.map((g) => {
            const start = offset;
            offset += g.items.length;
            const on = g.id === tab;
            return (
              <div key={g.id} role="tabpanel" id={`panel-${g.id}`} aria-labelledby={`tab-${g.id}`} hidden={!on}>
                <div className={clsx("grid gap-4 sm:gap-5 md:grid-cols-2", g.items.length !== 4 && "xl:grid-cols-3")}>
                  {g.items.map((p, i) => (
                    <IndexCard key={`${p.id}-${on && opened ? tab : "x"}`} p={p} n={start + i + 1} total={packages.length} i={i} animate={on && opened && !reduced} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
