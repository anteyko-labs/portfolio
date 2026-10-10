"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion, useDebounce } from "@/lib/hooks";
import type { CatalogFilter, CatalogSort } from "@/lib/catalog";
import { matchesFilter, searchEntries, sortEntries } from "@/lib/catalog-utils";
import { useCaseData } from "@/lib/case-data-context";
import { CatalogCard, type CardSize } from "./catalog-card";
import { CatalogList } from "./catalog-list";
import { FILTER_LABEL, SORT_LABEL, plural } from "./labels";
import { pick } from "@/lib/i18n-text";

const FILTERS: CatalogFilter[] = ["all", "motion", "web", "mobile", "product", "web3", "infrastructure"];
const SORTS: CatalogSort[] = ["featured", "newest", "oldest", "az"];
type View = "grid" | "list";

// Bento rhythm on a 12-column grid: a wide + a half card, then three thirds,
// mirrored on the next cycle so the page never settles into a plain table.
const RHYTHM: { span: string; size: CardSize }[][] = [
  [
    { span: "md:col-span-7", size: "wide" },
    { span: "md:col-span-5", size: "half" },
    { span: "md:col-span-6 lg:col-span-4", size: "third" },
    { span: "md:col-span-6 lg:col-span-4", size: "third" },
    { span: "md:col-span-12 lg:col-span-4", size: "third" },
  ],
  [
    { span: "md:col-span-5", size: "half" },
    { span: "md:col-span-7", size: "wide" },
    { span: "md:col-span-6 lg:col-span-4", size: "third" },
    { span: "md:col-span-6 lg:col-span-4", size: "third" },
    { span: "md:col-span-12 lg:col-span-4", size: "third" },
  ],
];
function slot(i: number, total: number): { span: string; size: CardSize } {
  // Stretch the last row so the grid never ends with a gap
  const cycleStart = i - (i % 5);
  const inLastCycle = total - cycleStart < 5;
  if (inLastCycle) {
    const left = total - cycleStart; // cards in the unfinished cycle
    const pos = i % 5;
    if (left === 1 || (left === 3 && pos === 2)) return { span: "md:col-span-12", size: "wide" };
    if (left === 4 && pos >= 2) return { span: "md:col-span-6", size: "half" };
  }
  return RHYTHM[Math.floor(i / 5) % 2][i % 5];
}

function readParams(): { filter?: CatalogFilter; sort?: CatalogSort; view?: View; q?: string } {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const filter = p.get("type") as CatalogFilter | null;
  const sort = p.get("sort") as CatalogSort | null;
  const view = p.get("view") as View | null;
  return {
    filter: filter && FILTERS.includes(filter) ? filter : undefined,
    sort: sort && SORTS.includes(sort) ? sort : undefined,
    view: view === "list" || view === "grid" ? view : undefined,
    q: p.get("q") ?? undefined,
  };
}

export function Catalog() {
  const { catalogEntries } = useCaseData();
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<CatalogFilter>("all");
  const [sort, setSort] = useState<CatalogSort>("featured");
  const [view, setView] = useState<View>("grid");
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 180);
  const restored = useRef(false);

  // Restore state from the URL so a filtered view can be shared as a link
  useEffect(() => {
    // Next frame, after hydration: the server always renders the default view
    const id = requestAnimationFrame(() => {
      const p = readParams();
      if (p.filter) setFilter(p.filter);
      if (p.sort) setSort(p.sort);
      if (p.view) setView(p.view);
      if (p.q) setQuery(p.q);
      restored.current = true;
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    // Don't overwrite incoming params before they have been read
    if (!restored.current) return;
    const p = new URLSearchParams(window.location.search);
    const set = (k: string, v: string, def: string) => (v && v !== def ? p.set(k, v) : p.delete(k));
    set("type", filter, "all");
    set("sort", sort, "featured");
    set("view", view, "grid");
    set("q", debounced.trim(), "");
    const qs = p.toString();
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  }, [filter, sort, view, debounced]);

  const searched = useMemo(() => searchEntries(catalogEntries, debounced, language), [catalogEntries, debounced, language]);
  const counts = useMemo(
    () => Object.fromEntries(FILTERS.map((f) => [f, searched.filter((e) => matchesFilter(e, f)).length])) as Record<CatalogFilter, number>,
    [searched]
  );
  const list = useMemo(
    () => sortEntries(searched.filter((e) => matchesFilter(e, filter)), sort, language),
    [searched, filter, sort, language]
  );

  const reset = () => {
    setFilter("all");
    setQuery("");
  };

  return (
    <section id="catalog" className="relative scroll-mt-16 bg-bg-primary pb-20 md:pb-28" aria-labelledby="catalog-title">
      {/* Toolbar — sticks under the header */}
      <div className="sticky top-14 z-30 border-b border-border bg-bg-primary/95 md:top-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:gap-6">
            <h2 id="catalog-title" className="sr-only">
              {pick({ en: "Catalog of work", ru: "Каталог работ", zh: "作品目录", tr: "İş kataloğu", ar: "كتالوج الأعمال" }, language)}
            </h2>

            <div
              className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-0.5 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:flex-1"
              role="group"
              aria-label={pick({ en: "Filter by type", ru: "Фильтр по типу", zh: "按类型筛选", tr: "Türe göre filtrele", ar: "تصفية حسب النوع" }, language)}
            >
              {FILTERS.map((f) => {
                const on = filter === f;
                const empty = counts[f] === 0 && !on;
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={on}
                    disabled={empty}
                    onClick={() => setFilter(f)}
                    className={clsx(
                      "relative inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-body-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary",
                      on ? "text-white" : "text-text-secondary hover:text-text-primary",
                      empty && "opacity-40"
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="catalog-chip"
                        className="absolute inset-0 rounded-full bg-text-primary"
                        transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    {!on && <span className="absolute inset-0 rounded-full border border-border" />}
                    <span className="relative">{FILTER_LABEL[f][language]}</span>
                    <span className={clsx("relative font-mono text-[11px] tabular-nums", on ? "text-white/60" : "text-text-muted")}>
                      {counts[f]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <label className="relative min-w-0 flex-1 lg:w-40 lg:flex-none 2xl:w-56">
                <span className="sr-only">{pick({ en: "Search work", ru: "Поиск по работам", zh: "搜索作品", tr: "İşlerde ara", ar: "البحث في الأعمال" }, language)}</span>
                <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={pick({ en: "Search…", ru: "Поиск…", zh: "搜索…", tr: "Ara…", ar: "بحث…" }, language)}
                  className="h-9 w-full rounded-full border border-border bg-bg-secondary pl-9 pr-3 text-body-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-glow"
                />
              </label>

              <label className="relative">
                <span className="sr-only">{pick({ en: "Sort", ru: "Сортировка", zh: "排序", tr: "Sırala", ar: "ترتيب" }, language)}</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as CatalogSort)}
                  className="h-9 cursor-pointer appearance-none rounded-full border border-border bg-bg-secondary pl-3.5 pr-8 text-body-sm font-medium text-text-primary focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-glow"
                >
                  {SORTS.map((s) => (
                    <option key={s} value={s}>
                      {SORT_LABEL[s][language]}
                    </option>
                  ))}
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </label>

              <div className="flex h-9 shrink-0 rounded-full border border-border bg-bg-secondary p-0.5" role="group" aria-label={pick({ en: "View", ru: "Вид", zh: "视图", tr: "Görünüm", ar: "العرض" }, language)}>
                {(["grid", "list"] as View[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={view === v}
                    aria-label={v === "grid" ? (pick({ en: "Grid", ru: "Плитка", zh: "网格", tr: "Izgara", ar: "شبكة" }, language)) : pick({ en: "List", ru: "Список", zh: "列表", tr: "Liste", ar: "قائمة" }, language)}
                    onClick={() => setView(v)}
                    className={clsx(
                      "grid w-9 place-items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary",
                      view === v ? "bg-bg-primary text-text-primary shadow-sm" : "text-text-tertiary hover:text-text-primary"
                    )}
                  >
                    {v === "grid" ? (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <rect x="3" y="3" width="7" height="7" rx="1.5" />
                        <rect x="14" y="3" width="7" height="7" rx="1.5" />
                        <rect x="3" y="14" width="7" height="7" rx="1.5" />
                        <rect x="14" y="14" width="7" height="7" rx="1.5" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 sm:px-6 md:pt-10 lg:px-8">
        <p className="mb-6 font-mono text-caption uppercase tracking-[0.16em] text-text-tertiary" aria-live="polite">
          {`${list.length} ${
            language === "ru"
              ? plural(list.length, ["проект", "проекта", "проектов"])
              : pick(list.length === 1 ? { en: "project", ru: "проект", zh: "个项目", tr: "proje", ar: "مشروع" } : { en: "projects", ru: "проекты", zh: "个项目", tr: "proje", ar: "مشاريع" }, language)
          }`}
          {debounced.trim() && pick({ en: ` for “${debounced.trim()}”`, ru: ` по запросу «${debounced.trim()}»`, zh: `，搜索“${debounced.trim()}”`, tr: ` “${debounced.trim()}” için`, ar: ` عن «${debounced.trim()}»` }, language)}
        </p>

        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="text-body-lg text-text-secondary">
              {pick({ en: "Nothing matches — try another word or filter.", ru: "Ничего не нашлось — попробуйте другое слово или фильтр.", zh: "没有匹配结果——换个关键词或筛选条件试试。", tr: "Eşleşen bir şey yok — başka bir kelime veya filtre deneyin.", ar: "لا توجد نتائج مطابقة — جرّب كلمة أو فلترًا آخر." }, language)}
            </p>
            <button type="button" onClick={reset} className="mt-4 text-body-sm font-medium text-accent-primary hover:text-accent-secondary">
              {pick({ en: "Show all work", ru: "Показать все работы", zh: "显示全部作品", tr: "Tüm işleri göster", ar: "عرض جميع الأعمال" }, language)}
            </button>
          </div>
        ) : view === "grid" ? (
          <LayoutGroup>
            <motion.div layout={!reduced} className="grid grid-cols-1 gap-5 md:grid-cols-12 lg:gap-6">
              <AnimatePresence mode="popLayout" initial={false}>
                {list.map((entry, i) => {
                  const s = slot(i, list.length);
                  return (
                    <motion.div
                      key={entry.slug}
                      layout={!reduced}
                      className={`${s.span} [content-visibility:auto] [contain-intrinsic-size:auto_640px]`}
                      initial={reduced ? false : { opacity: 0, y: 40, scale: 0.97 }}
                      whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
                      animate={reduced ? { opacity: 1 } : undefined}
                      exit={reduced ? undefined : { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 5) * 0.05 }}
                    >
                      <CatalogCard entry={entry} index={i} size={s.size} priority={i < 2} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        ) : (
          <AnimatePresence mode="popLayout">
            <CatalogList entries={list} />
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
