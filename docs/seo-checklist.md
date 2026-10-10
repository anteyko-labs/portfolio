# SEO checklist

Run before and after every release. The crawler checks most of it automatically:

```bash
python3 scripts/seo-audit.py                       # production
python3 scripts/seo-audit.py http://localhost:3000 # local `npm run build && npm start`
```

## Basics

| Item | Where it lives / how to check |
| --- | --- |
| sitemap.xml | `src/app/sitemap.ts`. Every page and case (flagship, showcase, micro), with hreflang for all locales |
| robots.txt | `src/app/robots.ts`. AI crawlers are blocked; `/api`, `/data` and `/demos` are disallowed. Never block JS/CSS needed for rendering |
| No stray noindex | Production must not send `noindex` (meta or `X-Robots-Tag`). Vercel previews send it on purpose |
| canonical | `seo()` in `src/i18n/metadata.ts`, always `https://www.anteyko.com/...`, never localhost or `*.vercel.app` |
| meta title / description | `seo(locale, path, { title, description })` in each page's `generateMetadata`, translated for every locale |
| One H1 per page | The crawler reports `h1 xN` |
| Heading order H1→H2→H3 | The crawler reports `skip 1->3` |
| Image alt text | `next/image` with `alt`; decorative images get `alt=""` |
| Schema markup | JSON-LD: Organization (layout), WebSite (home), Article/Service/FAQPage/BreadcrumbList on pages |
| Internal links | The catalog links every case; the crawler checks that every internal link returns 200 |
| No broken links | The crawler's "non-200" list |
| Compressed images | Use `next/image` (AVIF/WebP, sized per viewport). Avoid raw `<img>` for photos and screenshots |
| Core Web Vitals | Lighthouse mobile or PageSpeed Insights. Don't import case data into client components; server pages pass it through `localize()` (one language) |
| Mobile responsive | Check at 390px with no horizontal scroll |
| HTTPS forced | `http://` returns 308 to `https://`, plus an HSTS header |
| Clean URL slugs | `/cases/<slug>`, `/ru/...`; no hash routes or query-only pages |
| og:image | `seo()` sets the default `/og-image.png`; cases have `opengraph-image.tsx` |
| Search Console | Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (and `NEXT_PUBLIC_YANDEX_VERIFICATION`) in Vercel, redeploy, then verify |
| Backlinks | Off-site work: directories, partner sites, Clutch/Behance/Dribbble, guest posts |

## Edge cases

- **Cloudflare challenge blocking Googlebot.** The site sits behind Cloudflare. Bot Fight Mode / "Block AI bots" must not challenge Googlebot; check with Search Console → URL Inspection → Live test.
- **Our own bot filter.** `src/proxy.ts` returns 403 to scrapers by user agent. It must never match Googlebot, Bingbot, YandexBot or link-preview bots.
- **CSR render.** Pages are SSG, so the raw HTML already contains the text (`curl -A Googlebot` shows the H1).
- **Hash routing.** Not used; every page has a real path.
- **Soft 404.** Unknown URLs must return status 404 (`[...rest]` → `notFound()`), not 200.
- **Canonical on localhost.** The canonical is hard-coded to production in `src/i18n/metadata.ts`.
- **noindex on Vercel previews.** This is normal for previews; check that production has none.
- **Geo-blocks.** Googlebot crawls from the US; nothing in the app or Cloudflare should block US traffic.
- **Cloudflare email obfuscation.** It rewrites `mailto:` links into `/cdn-cgi/l/email-protection`, which bots see as a 404 link. Keep it off (Cloudflare → Scrape Shield).
- **Apex redirect.** `anteyko.com → www.anteyko.com` should be permanent (308), not 307 (Vercel → Domains).
