"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";

const COPY = {
  label: { en: "Selected work", ru: "Избранные работы", zh: "精选作品", tr: "Seçilmiş işler", ar: "أعمال مختارة" },
  line1: { en: "See", ru: "Смотреть", zh: "查看", tr: "Tüm", ar: "شاهد" },
  line2: { en: "all cases", ru: "все кейсы", zh: "全部案例", tr: "projeler", ar: "كل المشاريع" },
  text: {
    en: "Live previews, case studies and the techniques behind every product we shipped.",
    ru: "Живые превью, разборы и приёмы каждого продукта, который мы запустили.",
    zh: "实时预览、案例解析，以及我们交付的每个产品背后的设计手法。",
    tr: "Yayına aldığımız her ürünün canlı önizlemesi, analizi ve teknikleri.",
    ar: "معاينات حيّة وتحليلات وتقنيات كل منتج أطلقناه.",
  },
  cta: { en: "Open cases", ru: "Открыть кейсы", zh: "打开案例", tr: "Projeleri aç", ar: "افتح المشاريع" },
};

/**
 * Entry to the /cases catalog instead of the cards themselves: a fan of real
 * covers opens on hover, a round button follows the cursor, and the click
 * plays the "portal" transition (see components/effects/portal-transition.tsx).
 */
export type HomeWorkProps = {
  /** Top featured covers, title already in the page language */
  covers: { slug: string; cover: string; title: string }[];
  /** Every catalog domain, for the marquee */
  domains: string[];
};

export function HomeWork({ covers, domains }: HomeWorkProps) {
  const { language } = useLanguage();
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        el.style.setProperty("--tx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        el.style.setProperty("--ty", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
    };
    el.addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <section className="border-t border-border bg-bg-secondary px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <NextLink href="/cases" data-portal="" ref={ref} className="cases-gate container mx-auto block">
        <span className="cases-gate__marquee" aria-hidden="true">
          <span>
            {[0, 1].map((k) => (
              <span key={k}>{domains.join("  ·  ")}  ·  </span>
            ))}
          </span>
        </span>

        <span className="cases-gate__in">
          <span className="cases-gate__label">
            <span>{pick(COPY.label, language)}</span>
            <span>{String(domains.length).padStart(2, "0")}</span>
          </span>

          <span className="cases-gate__title">
            <span className="cases-gate__line">{pick(COPY.line1, language)}</span>
            <span className="cases-gate__line cases-gate__line--accent">{pick(COPY.line2, language)}</span>
          </span>

          <span className="cases-gate__text">{pick(COPY.text, language)}</span>

          <span className="cases-gate__stack" aria-hidden="true">
            {covers.map((e, i) => (
              <span key={e.slug} className="cases-gate__card" style={{ ["--i" as string]: i - 2 }}>
                <Image src={e.cover} alt="" fill sizes="(max-width: 768px) 45vw, 22vw" className="object-cover object-top" />
                <span className="cases-gate__card-name">{e.title}</span>
              </span>
            ))}
          </span>

          <span className="cases-gate__cta">
            {pick(COPY.cta, language)}
            <span className="cases-gate__arrow" aria-hidden="true">→</span>
          </span>
        </span>

        <span className="cases-gate__orb" aria-hidden="true">
          <span>{pick(COPY.cta, language)}</span>
          <span className="cases-gate__arrow">→</span>
        </span>
      </NextLink>
    </section>
  );
}
