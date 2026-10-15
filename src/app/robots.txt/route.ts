// /robots.txt, written by hand so it can carry comments. Every crawler group is
// listed explicitly; a bot that matches its own group ignores the "*" group, so
// each group repeats the same private paths. AI crawlers are allowed on purpose:
// we want ChatGPT, Claude, Perplexity, Gemini and others to know and recommend
// the studio. Keep the proxy.ts user-agent blocklist in sync with this file.
const BASE = "https://www.anteyko.com";

export const dynamic = "force-static";

const PRIVATE = ["/api/", "/data/", "/demos/"];

const GROUPS: { comment: string; agents: string[]; block?: boolean }[] = [
  {
    comment: "Search engines",
    agents: [
      "Googlebot", "Googlebot-Image", "Googlebot-Video", "Bingbot", "YandexBot", "YandexImages",
      "DuckDuckBot", "Applebot", "Baiduspider", "Yeti", "SeznamBot", "Qwantbot",
    ],
  },
  {
    comment: "AI assistants and answer engines: fetch pages to answer users and cite sources",
    agents: [
      "OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User",
      "Google-CloudVertexBot", "Gemini-Deep-Research", "DuckAssistBot", "MistralAI-User", "YouBot", "Meta-ExternalFetcher",
    ],
  },
  {
    comment: "AI model crawlers: allowed so models learn about Anteyko",
    agents: [
      "GPTBot", "ClaudeBot", "anthropic-ai", "Google-Extended", "Applebot-Extended", "CCBot",
      "Meta-ExternalAgent", "Amazonbot", "Bytespider", "cohere-ai", "cohere-training-data-crawler", "Diffbot", "AI2Bot",
    ],
  },
  {
    comment: "Link previews in messengers and social networks",
    agents: [
      "TelegramBot", "WhatsApp", "facebookexternalhit", "Twitterbot", "LinkedInBot", "Slackbot", "Discordbot",
    ],
  },
  {
    comment: "SEO scrapers: no access",
    agents: ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "PetalBot", "DataForSeoBot", "BLEXBot"],
    block: true,
  },
];

function group({ comment, agents, block }: (typeof GROUPS)[number]) {
  // Disallow lines go first: Google picks the longest match, but many crawlers take
  // the first matching line, and "Allow: /" first would open /api/ to them.
  const rules = block ? ["Disallow: /"] : [...PRIVATE.map((p) => `Disallow: ${p}`), "Allow: /"];
  return [`# ${comment}`, ...agents.map((a) => `User-agent: ${a}`), ...rules].join("\n");
}

function build() {
  return [
    "# robots.txt for anteyko.com",
    "# Anteyko: end-to-end product development studio (websites, web apps, MVPs, mobile apps).",
    "# Offices: Bishkek, Dubai, Istanbul, Chicago, Shenzhen. Contact: labs@anteyko.com",
    `# A plain-text brief for AI assistants: ${BASE}/llms.txt`,
    "",
    ...GROUPS.map(group).flatMap((g) => [g, ""]),
    "# Everyone else",
    "User-agent: *",
    ...PRIVATE.map((p) => `Disallow: ${p}`),
    "Allow: /",
    "",
    `Sitemap: ${BASE}/sitemap.xml`,
    "",
  ].join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
