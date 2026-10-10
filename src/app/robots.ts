import { MetadataRoute } from "next";

const BASE = "https://www.anteyko.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // AI training / answer-engine crawlers and SEO scrapers: no access
      {
        userAgent: [
          "GPTBot", "ChatGPT-User", "OAI-SearchBot", "CCBot", "ClaudeBot", "Claude-Web", "anthropic-ai",
          "Google-Extended", "Applebot-Extended", "Bytespider", "PerplexityBot", "Amazonbot", "Diffbot",
          "cohere-ai", "Meta-ExternalAgent", "AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "PetalBot",
          "DataForSeoBot",
        ],
        disallow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/data/", "/demos/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/data/", "/demos/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
