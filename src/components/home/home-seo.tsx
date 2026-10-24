"use client";

import { Link as NextLink } from "@/i18n/navigation";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { HOME_SEO } from "@/lib/home-seo";

// "About the studio" text at the foot of the home page: what Anteyko builds and
// where, in plain prose with links to every service page. Fully visible (small,
// quiet type), so search engines count it the same way people read it.
export function HomeSeo() {
  const { language } = useLanguage();
  return (
    <section className="border-t border-border bg-bg-secondary py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-brand text-2xl font-semibold tracking-[-0.02em] text-text-primary md:text-3xl">{pick(HOME_SEO.title, language)}</h2>
        <p className="mt-4 max-w-3xl text-body-md leading-relaxed text-text-secondary">{pick(HOME_SEO.intro, language)}</p>

        <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {HOME_SEO.sections.map((s) => (
            <div key={s.title.en}>
              <h3 className="text-body-lg font-semibold text-text-primary">{pick(s.title, language)}</h3>
              <p className="mt-2 text-body-sm leading-relaxed text-text-secondary">{pick(s.text, language)}</p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                {s.links.map((l) => (
                  <li key={l.href}>
                    <NextLink href={l.href} className="text-body-sm text-accent-primary underline-offset-4 hover:underline">
                      {pick(l.label, language)}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-body-sm leading-relaxed text-text-tertiary">{pick(HOME_SEO.outro, language)}</p>
      </div>
    </section>
  );
}
