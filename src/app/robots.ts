import { MetadataRoute } from "next";

const BASE = "https://www.anteyko.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/data/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/data/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
