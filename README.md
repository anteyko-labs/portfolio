# Anteyko Labs — Portfolio

Marketing site and portfolio for Anteyko Labs ([www.anteyko.com](https://www.anteyko.com)).
Bilingual (EN/RU), content-driven, with a custom commercial-proposal (`/kp`) system.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** (CSS-first config — see gotchas below)
- **framer-motion 12** for scroll/interaction animation
- **next-intl** for EN/RU routing and translations
- **TypeScript** (strict)

## Getting started

```bash
npm install
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
npm run kp:new   # scaffold a new commercial proposal (/kp) — scripts/new-kp.mjs
```

## Gotchas for contributors (read before you edit)

- **Design tokens live in `src/app/globals.css`, inside the `@theme` block — NOT in `tailwind.config.ts`.**
  Under Tailwind v4 the JS config is *not* auto-detected (there is no `@config` directive),
  so `tailwind.config.ts` does not affect the build. Colors, the type scale (`text-display-*`,
  `text-heading-*`, etc.), and fonts (`font-sans` / `font-display` / `font-mono` / `font-brand`)
  are all generated from the `--color-*`, `--text-*`, and `--font-*` variables in `@theme`.
  Add or change tokens there.

- **The middleware file is `src/proxy.ts`** (Next.js 16 renamed `middleware.ts` → `proxy.ts`).
  It powers next-intl locale routing. The i18n setup lives in `src/i18n/`.

- **Pushing to `main` auto-deploys to Vercel.** Treat `main` as production.

- **Design system is "Refined Light":** white background, near-black text (`#0A0A0A`),
  indigo accent (`#4F46E5`) used sparingly, Manrope + Geist Mono, hairline borders,
  `rounded-2xl`, restrained motion. Respect `prefers-reduced-motion` for every animation.

## Project layout

```
src/
  app/[locale]/   App Router pages (EN/RU)
  app/globals.css Tailwind v4 @theme tokens + global styles
  components/     UI and section components
  i18n/           next-intl routing/config
  lib/            hooks, language context, helpers
  proxy.ts        Next 16 middleware (locale routing)
scripts/
  new-kp.mjs      backs `npm run kp:new`
docs/             internal docs (audit-findings.md is the current source of truth)
```
