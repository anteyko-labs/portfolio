"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { useReducedMotion } from "@/lib/hooks";
import { EASE } from "@/components/motion/kit";
import { PACKAGE_SLUGS, SERVICE_GROUPS, type PackageId } from "@/lib/service-slugs";
import { PKG_COLOR } from "./visual-frame";

// A slim horizontal index of every service under the /services hero. It sticks
// under the header while the chapters scroll past, marks the one in view with a
// sliding pill, and jumps to a chapter on click, so nobody has to scroll the
// whole page to find "parking" or "branding". Chapters carry id={slug}.

export function ServicesStrip() {
  const { translations, language } = useLanguage();
  const reduced = useReducedMotion();
  const packages = translations.packages.items;
  const groups = SERVICE_GROUPS.map((g) => packages.filter((p) => p.group === g.id)).filter((g) => g.length);
  const slugs = packages.map((p) => PACKAGE_SLUGS[p.id as PackageId]);
  const [active, setActive] = useState<string | null>(null);
  const track = useRef<HTMLDivElement>(null);

  // Which chapter is in the middle band of the screen
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const s of slugs) {
      const el = document.getElementById(s);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
    // slugs come from static data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the active pill in view inside the strip (the page itself doesn't move)
  useEffect(() => {
    const box = track.current;
    const pill = active ? box?.querySelector<HTMLElement>(`[data-slug="${active}"]`) : null;
    if (!box || !pill) return;
    box.scrollTo({ left: pill.offsetLeft - box.clientWidth / 2 + pill.clientWidth / 2, behavior: reduced ? "auto" : "smooth" });
  }, [active, reduced]);

  const go = (e: React.MouseEvent, slug: string) => {
    const el = document.getElementById(slug);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${slug}`);
  };

  let n = 0;
  return (
    <nav
      aria-label={pick({ en: "All services", ru: "Все услуги", zh: "全部服务", tr: "Tüm hizmetler", ar: "جميع الخدمات" }, language)}
      className="sticky top-14 z-30 border-y border-border bg-bg-primary/90 backdrop-blur-md md:top-16"
    >
      <div
        ref={track}
        className="scrollbar-hide container mx-auto flex items-center gap-1.5 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8 [mask-image:linear-gradient(90deg,transparent,#000_24px,#000_calc(100%-24px),transparent)]"
      >
        {groups.map((items, g) => (
          <Fragment key={g}>
            {g > 0 && <span aria-hidden="true" className="mx-1.5 h-5 w-px shrink-0 bg-border" />}
            {items.map((p) => {
              const slug = PACKAGE_SLUGS[p.id as PackageId];
              const on = active === slug;
              const color = PKG_COLOR[p.id];
              const i = n++;
              return (
                <motion.a
                  key={p.id}
                  href={`#${slug}`}
                  data-slug={slug}
                  onClick={(e) => go(e, slug)}
                  aria-current={on ? "true" : undefined}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.035, ease: EASE }}
                  className="group relative inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 text-body-sm text-text-secondary transition-colors hover:text-text-primary aria-[current]:text-text-primary"
                >
                  {on && (
                    <motion.span
                      layoutId="svc-strip-pill"
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-full border"
                      style={{ background: `rgb(${color} / 0.12)`, borderColor: `rgb(${color} / 0.45)` }}
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span aria-hidden="true" className="h-2 w-2 rounded-full transition-transform group-hover:scale-125" style={{ background: `rgb(${color})` }} />
                  {pick(p.title, language)}
                  <span className="text-caption text-text-tertiary">{pick(p.startingPrice, language)}</span>
                </motion.a>
              );
            })}
          </Fragment>
        ))}
      </div>
    </nav>
  );
}
