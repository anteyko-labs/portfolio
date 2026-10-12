"use client";

import { motion } from "framer-motion";
import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { useReducedMotion } from "@/lib/hooks";
import { pick } from "@/lib/i18n-text";
import { EASE } from "@/components/motion/kit";
import { PACKAGE_SLUGS, SERVICE_GROUPS } from "@/lib/service-slugs";
import { PKG_COLOR } from "@/components/services-anim/visual-frame";
import { RevealTitle } from "./shared";

/**
 * What the studio does, by direction. Columns unfold one after another from
 * their top rule; each service drops out from under the column header.
 */
export function Directions() {
  const { translations, language } = useLanguage();
  const reduced = useReducedMotion();
  const packages = translations.packages.items;

  return (
    <div>
      <RevealTitle
        eyebrow={pick({ en: "What we do", ru: "Что мы делаем", zh: "我们做什么", tr: "Ne yapıyoruz", ar: "ماذا نفعل" }, language)}
        title={pick({ en: "Nine services, three directions", ru: "Девять услуг, три направления", zh: "九项服务，三大方向", tr: "Dokuz hizmet, üç yön", ar: "تسع خدمات وثلاثة اتجاهات" }, language)}
      />
      <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        {SERVICE_GROUPS.map((group, g) => {
          const items = packages.filter((p) => p.group === group.id);
          return (
            <motion.div
              key={group.id}
              className="origin-top"
              initial={reduced ? false : { opacity: 0, scaleY: 0.6 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: g * 0.15, ease: EASE }}
            >
              <div className="flex items-baseline gap-3 border-t-2 border-text-primary pt-4">
                <span className="font-mono text-caption text-text-tertiary">{String(g + 1).padStart(2, "0")}</span>
                <h3 className="font-brand text-xl font-semibold tracking-[-0.02em] text-text-primary">{pick(group.label, language)}</h3>
              </div>
              <ul className="mt-4 overflow-hidden">
                {items.map((pkg, i) => (
                  <motion.li
                    key={pkg.id}
                    initial={reduced ? false : { opacity: 0, y: -16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35 + g * 0.15 + i * 0.08, ease: EASE }}
                  >
                    <NextLink
                      href={`/services/${PACKAGE_SLUGS[pkg.id as keyof typeof PACKAGE_SLUGS]}`}
                      className="group flex items-center gap-3 border-b border-border py-3.5 text-body-md text-text-primary transition-colors hover:text-accent-primary"
                    >
                      <span className="h-2 w-2 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150" style={{ background: `rgb(${PKG_COLOR[pkg.id]})` }} />
                      <span className="flex-1">{pkg.title[language]}</span>
                      <span aria-hidden="true" className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">→</span>
                    </NextLink>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
