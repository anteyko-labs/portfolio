import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../fonts.css";
import "../globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { OffscreenPause } from "@/components/effects/offscreen-pause";
import { CONSENT_HEAD_SCRIPT, CookieConsent } from "@/components/cookie-consent";
import { AnalyticsBootstrap } from "@/components/analytics-bootstrap";
import { CrmWidget } from "@/components/crm-widget";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { OFFICES } from "@/lib/locations";
import { translations } from "@/lib/translations";
import { PACKAGE_SLUGS, type PackageId } from "@/lib/service-slugs";
import { PortalTransition } from "@/components/effects/portal-transition";
import { isRtl, pick, type Language } from "@/lib/i18n-text";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/i18n/site-copy";
import { localeAlternates } from "@/i18n/metadata";

// Type: Manrope (UI and display), Unbounded (brand headings) and Noto Sans
// Arabic are self-hosted in src/app/fonts.css; Chinese uses system CJK fonts;
// Geist Mono for technical labels. See the font stacks in globals.css.

// The page scale is locked: no pinch or double-tap zoom.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale as Language;

  const title = pick(SITE_TITLE, lang);
  const description = pick(SITE_DESCRIPTION, lang);
  const ogDescription = pick(
    {
      en: "Design, frontend, backend, admin panels, integrations, infrastructure, and launch. Web2 + Web3 — in one delivery loop.",
      ru: "Дизайн, фронтенд, бэкенд, админ-панели, интеграции, инфраструктура и запуск. Web2 + Web3 — в одном цикле поставки.",
      zh: "设计、前端、后端、管理后台、系统集成、基础设施到上线。Web2 + Web3——同一交付闭环。",
      tr: "Tasarım, frontend, backend, yönetim panelleri, entegrasyonlar, altyapı ve lansman. Web2 + Web3 — tek bir teslimat döngüsünde.",
      ar: "التصميم، الواجهة الأمامية، الواجهة الخلفية، لوحات الإدارة، التكاملات، البنية التحتية، والإطلاق. Web2 + Web3 — في دورة تسليم واحدة.",
    },
    lang
  );
  const ogLocale = { en: "en_US", ru: "ru_RU", zh: "zh_CN", tr: "tr_TR", ar: "ar_AE" };

  return {
  metadataBase: new URL("https://www.anteyko.com"),
  title: {
    default: title,
    template: "%s | Anteyko",
  },
  description,
  keywords: [
    "web development",
    "MVP development",
    "startup development",
    "Web3 development",
    "product studio",
    "full-stack development",
    "custom software development",
    "DeFi development",
    "smart contract development",
    "SaaS development",
    "enterprise software",
    "UI/UX design",
    "Kyrgyzstan",
    "Dubai",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "blockchain",
    "Solidity",
  ],
  authors: [{ name: "Anteyko" }],
  creator: "Anteyko",
  publisher: "Anteyko",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: ogLocale[lang],
    alternateLocale: Object.values(ogLocale).filter((l) => l !== ogLocale[lang]),
    url: localeAlternates(locale, "/").canonical,
    siteName: "Anteyko",
    title,
    description: ogDescription,
    images: [
      {
        url: "https://www.anteyko.com/og-image.png",
        width: 1024,
        height: 682,
        alt: "Anteyko — Product Development Studio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: ogDescription,
    images: ["https://www.anteyko.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Search Console / Yandex Webmaster ownership: set the tokens in Vercel env
  verification: {
    // Google Search Console (HTML tag method); an env value, if set, is added too
    google: ["rAEhc8r9bbDBMtW5wJdSAO6aM7j8AluOfPR5W4Z3Kr0", ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? [process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION] : [])],
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    // Bing Webmaster Tools (also feeds ChatGPT search)
    other: { "msvalidate.01": "96892F4F071DE61B8F00B429406397C1" },
  },
  };
}

// Validate analytics IDs from env. Only allow alphanumeric and hyphen — these IDs
// are set by the project owner via NEXT_PUBLIC_* env vars, but we still validate
// strictly to prevent any possibility of injection if env is misconfigured.
/** "From $800" / "From $3k" → a schema.org minimum price; "By agreement" → nothing */
function fromPrice(label: string) {
  const m = label.match(/\$(\d+(?:\.\d+)?)(k?)/i);
  if (!m) return {};
  const value = Number(m[1]) * (m[2] ? 1000 : 1);
  return { priceSpecification: { "@type": "PriceSpecification", minPrice: value, priceCurrency: "USD" } };
}

const GTM_ID_PATTERN = /^GTM-[A-Z0-9]{4,20}$/;
const YM_ID_PATTERN = /^\d{6,12}$/;

function safeGtmId(): string | null {
  const id = process.env.NEXT_PUBLIC_GTM_ID;
  return id && GTM_ID_PATTERN.test(id) ? id : null;
}

function safeYmId(): string | null {
  const id = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  return id && YM_ID_PATTERN.test(id) ? id : null;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enable static rendering for this locale.
  setRequestLocale(locale);

  const GTM_ID = safeGtmId();
  const YM_ID = safeYmId();

  return (
    <html lang={locale} dir={isRtl(locale) ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        {/* the self-hosted fonts the first screen uses (fonts.css) */}
        <link rel="preload" href="/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/manrope-cyrillic-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/unbounded-cyrillic-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/unbounded-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* favicon.ico / icon.png / apple-icon.png live in src/app/ and are wired by Next App Router. */}
        <link rel="manifest" href="/manifest.json" />
        {/* Blocks zoom, context menu, copying and dev-tools shortcuts (also loaded by every /demos page) */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        {/* defer: runs before DOMContentLoaded without blocking the first paint */}
        <script src="/guard.js" defer />
        {/* Hides the cookie banner before first paint for visitors who already answered */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_HEAD_SCRIPT }} />

        {/* Google Tag Manager — only if validated NEXT_PUBLIC_GTM_ID is set */}
        {GTM_ID ? (
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            // GTM_ID strictly matches /^GTM-[A-Z0-9]{4,20}$/, no user input — safe injection
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html:
                "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':" +
                "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0]," +
                "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=" +
                "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);" +
                "})(window,document,'script','dataLayer'," + JSON.stringify(GTM_ID) + ");",
            }}
          />
        ) : null}

        {/* Yandex.Metrika — only if validated NEXT_PUBLIC_YANDEX_METRIKA_ID is set */}
        {YM_ID ? (
          <Script
            id="ym-init"
            strategy="afterInteractive"
            // YM_ID strictly matches /^\d{6,12}$/, no user input — safe injection
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html:
                "(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};" +
                "m[i].l=1*new Date();" +
                "for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}" +
                "k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})" +
                "(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');" +
                "ym(" + YM_ID + ", 'init', { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });",
            }}
          />
        ) : null}

        <script
          type="application/ld+json"
          // Static org data, no user input — XSS impossible
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.anteyko.com/#organization",
              name: "Anteyko",
              alternateName: ["Anteyko Labs", "Антейко", "Anteiko", "Anteiko Labs", "Антейко Лабс"],
              url: "https://www.anteyko.com",
              logo: "https://www.anteyko.com/icon-512.png",
              description:
                "End-to-end product development studio. Design, frontend, backend, admin panels, integrations, infrastructure. Web2 + Web3. Offices in Bishkek, Dubai, Istanbul, Chicago and Shenzhen.",
              email: "labs@anteyko.com",
              address: OFFICES.map((o) => ({ "@type": "PostalAddress", addressLocality: o.city.en, addressCountry: o.countryCode })),
              areaServed: "Worldwide",
              sameAs: ["https://www.linkedin.com/company/anteyko", "https://github.com/anteyko-labs", "https://t.me/anteyko_labs"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: "labs@anteyko.com",
                url: "https://www.anteyko.com/contact",
                availableLanguage: ["English", "Russian", "Chinese", "Turkish", "Arabic"],
              },
              knowsAbout: [
                "Website development", "Web application development", "MVP development", "Mobile app development",
                "UI/UX design", "Branding", "Next.js", "React", "Admin panels", "API integrations",
                "Cloud infrastructure", "Web3", "Smart contracts", "Fintech", "IT support",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Services",
                itemListElement: translations.packages.items.map((p) => ({
                  "@type": "Offer",
                  url: `https://www.anteyko.com/services/${PACKAGE_SLUGS[p.id as PackageId]}`,
                  itemOffered: { "@type": "Service", name: p.title.en, description: p.description.en },
                  ...fromPrice(p.startingPrice.en),
                })),
              },
            }),
          }}
        />
      </head>
      <body
        className={`${GeistMono.variable} font-sans antialiased`}
      >
        {/* GTM noscript fallback */}
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}

        <NextIntlClientProvider>
          <LanguageProvider>
          {/* Skip to content — WCAG 2.4.1 + 2.5.5 (44x44 min touch target) */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:inline-flex focus:items-center focus:px-5 focus:py-3 focus:min-h-[44px] focus:bg-accent-primary focus:text-white focus:rounded-lg focus:text-body-sm focus:font-medium"
          >
            {pick({ en: "Skip to main content", ru: "Перейти к содержимому", zh: "跳至主要内容", tr: "Ana içeriğe geç", ar: "تخطَّ إلى المحتوى الرئيسي" }, locale)}
          </a>
          {/* Noise overlay for texture */}
          <div className="noise-overlay" aria-hidden="true" />
          <CustomCursor />
          <OffscreenPause />
          <main id="main-content">
            {children}
          </main>
          <CookieConsent />
          <AnalyticsBootstrap />
          <WhatsAppButton />
          <CrmWidget />
          <PortalTransition />
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
