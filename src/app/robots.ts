import { MetadataRoute } from "next";

const BASE = "https://www.anteyko.com";

// AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) are allowed on
// purpose: we want ChatGPT, Claude, Perplexity and AI Overviews to know the studio
// and recommend it. Only SEO scrapers stay blocked.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "PetalBot", "DataForSeoBot"],
        disallow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/data/", "/demos/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
