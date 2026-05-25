import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { LogoFusionEffect } from "@/components/effects/logo-fusion";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { CookieConsent } from "@/components/cookie-consent";
import { AnalyticsBootstrap } from "@/components/analytics-bootstrap";

// Refined-light type system: Manrope (geometric grotesque, RU+EN, premium)
// for both UI and display weights; Geist Mono for technical labels.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.anteyko.com"),
  title: {
    default: "Anteyko — End-to-end Product Development Studio",
    template: "%s | Anteyko",
  },
  description:
    "Design, frontend, backend, admin panels, integrations, infrastructure, and launch. Web2 + Web3 — in one delivery loop. Based in Kyrgyzstan & Dubai.",
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
    locale: "en_US",
    alternateLocale: "ru_RU",
    url: "https://anteyko.com",
    siteName: "Anteyko",
    title: "Anteyko — End-to-end Product Development Studio",
    description:
      "Design, frontend, backend, admin panels, integrations, infrastructure, and launch. Web2 + Web3 — in one delivery loop.",
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
    title: "Anteyko — End-to-end Product Development Studio",
    description:
      "Design, frontend, backend, admin panels, integrations, infrastructure, and launch. Web2 + Web3 — in one delivery loop.",
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
  // verification: { google: "..." } — add when using Search Console
};

// Validate analytics IDs from env. Only allow alphanumeric and hyphen — these IDs
// are set by the project owner via NEXT_PUBLIC_* env vars, but we still validate
// strictly to prevent any possibility of injection if env is misconfigured.
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
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />

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
              name: "Anteyko",
              url: "https://anteyko.com",
              description:
                "End-to-end product development studio. Design, frontend, backend, admin panels, integrations, infrastructure. Web2 + Web3. Based in Kyrgyzstan & Dubai.",
              email: "labs@anteyko.com",
              address: [
                { "@type": "PostalAddress", addressLocality: "Bishkek", addressCountry: "KG" },
                { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${manrope.variable} ${GeistMono.variable} font-sans antialiased`}
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
            Skip to main content
          </a>
          {/* Noise overlay for texture */}
          <div className="noise-overlay" aria-hidden="true" />
          <LogoFusionEffect />
          <CustomCursor />
          <main id="main-content">
            {children}
          </main>
          <CookieConsent />
          <AnalyticsBootstrap />
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
