import { MetadataRoute } from "next";
import { flagshipCases } from "@/lib/cases-data";

const BASE = "https://www.anteyko.com";

// One entry per path with hreflang alternates for both locales. en is unprefixed;
// ru lives under /ru (matches localePrefix "as-needed").
function entry(
  path: string,
  changeFrequency: "weekly" | "monthly" | "yearly",
  priority: number
): MetadataRoute.Sitemap[number] {
  const en = `${BASE}${path}`;
  const ru = `${BASE}/ru${path}`;
  return {
    url: en,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages: { en, ru } },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    entry("", "weekly", 1),
    entry("/services", "monthly", 0.9),
    entry("/cases", "weekly", 0.9),
    entry("/process", "monthly", 0.8),
    entry("/faq", "monthly", 0.8),
    entry("/about", "monthly", 0.8),
    entry("/contact", "monthly", 0.9),
    entry("/privacy", "yearly", 0.3),
    entry("/terms", "yearly", 0.3),
  ];

  const casePages: MetadataRoute.Sitemap = flagshipCases.map((c) =>
    entry(`/cases/${c.slug}`, "monthly", 0.7)
  );

  return [...staticPages, ...casePages];
}
