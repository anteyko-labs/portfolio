import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-cabinet",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["Inter", "system-ui", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anteyko.com"),
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
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anteyko — Product Development Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anteyko — End-to-end Product Development Studio",
    description:
      "Design, frontend, backend, admin panels, integrations, infrastructure, and launch. Web2 + Web3 — in one delivery loop.",
    images: ["/og-image.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Anteyko",
              url: "https://anteyko.com",
              description:
                "End-to-end product development studio. Design, frontend, backend, admin panels, integrations, infrastructure. Web2 + Web3. Based in Kyrgyzstan & Dubai.",
              email: "hello@anteyko.com",
              address: [
                { "@type": "PostalAddress", addressLocality: "Bishkek", addressCountry: "KG" },
                { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          {/* Skip to content — WCAG 2.4.1 */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent-primary focus:text-white focus:rounded-lg focus:text-body-sm focus:font-medium"
          >
            Skip to main content
          </a>
          {/* Noise overlay for texture */}
          <div className="noise-overlay" aria-hidden="true" />
          <main id="main-content">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
