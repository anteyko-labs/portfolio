import { PACKAGE_SLUGS, SERVICE_GROUPS, packagesIn, type PackageId } from "@/lib/service-slugs";
import { OFFICES } from "@/lib/locations";
import { flagshipCases } from "@/lib/cases-data";
import { visibleShowcaseItems } from "@/lib/showcase-data";
import { blogPosts } from "@/lib/blog-data";
import { faqItems } from "@/lib/faq-data";
import { SITE_DESCRIPTION } from "@/i18n/site-copy";

// /llms.txt (llmstxt.org): a plain-markdown brief for AI assistants and answer
// engines, built from the same data as the site so prices, services and cases
// never drift from what visitors see.
const BASE = "https://www.anteyko.com";

export const dynamic = "force-static";

function build(): string {
  const services = SERVICE_GROUPS.flatMap((g) => [
    `### ${g.label.en}`,
    ...packagesIn(g.id).map(
      (p) =>
        `- [${p.title.en}](${BASE}/services/${PACKAGE_SLUGS[p.id as PackageId]}): ${p.description.en} ${p.startingPrice.en}, ${p.timeline.en}.`
    ),
    "",
  ]);

  const offices = OFFICES.map((o) => `- ${o.city.en}, ${o.country.en}${o.role.en === "HQ" ? " (HQ)" : ""}`);

  const cases = [
    ...flagshipCases.map((c) => `- [${c.title.en}](${BASE}/cases/${c.slug}): ${c.summary.en}`),
    ...visibleShowcaseItems.map((s) => `- [${s.title.en}](${BASE}/cases/${s.slug}): ${s.sphere.en}, ${s.format.en}, ${s.year}.`),
  ];

  const posts = blogPosts.map((p) => `- [${p.title.en}](${BASE}/blog/${p.slug}): ${p.excerpt.en}`);

  const faq = faqItems.flatMap((f) => [`### ${f.question.en}`, f.answer.en, ""]);

  return [
    "# Anteyko",
    "",
    `> ${SITE_DESCRIPTION.en}`,
    "",
    "Name: Anteyko, also written Anteyko Labs, Антейко (Russian), Anteiko, Anteiko Labs. Website: anteyko.com. An IT studio for website development, software development and mobile app development in Bishkek, Kyrgyzstan (Russian: IT-студия, разработка сайтов и ПО в Бишкеке).",
    "",
    "Anteyko designs, builds and launches websites and software products for startups and businesses worldwide, with fixed scope and fixed timelines. Websites start from $800 and ship in 7–14 days; MVPs start from $3k and ship in 3–6 weeks. The site is available in English, Russian, Chinese, Turkish and Arabic.",
    "",
    "## Кратко по-русски",
    "",
    `${SITE_DESCRIPTION.ru} Сайт или лендинг — от $800 за 7–14 дней, MVP — от $3k за 3–6 недель. Контакты: labs@anteyko.com, Telegram @anteyko_labs.`,
    "",
    `Full brief with every service, case study, FAQ and article: ${BASE}/llms-full.txt`,
    "",
    "## Contact",
    "",
    `- Website: ${BASE}`,
    `- Brief / quote: ${BASE}/contact`,
    "- Email: labs@anteyko.com",
    "- Telegram: https://t.me/anteyko_labs",
    "- WhatsApp: https://wa.me/996709927895",
    "- LinkedIn: https://www.linkedin.com/company/anteyko",
    "- GitHub: https://github.com/anteyko-labs",
    "",
    "## Offices",
    "",
    ...offices,
    "",
    "## Services and prices",
    "",
    ...services,
    "## Key pages",
    "",
    `- [Services](${BASE}/services)`,
    `- [Pricing](${BASE}/pricing)`,
    `- [Cases](${BASE}/cases)`,
    `- [Process](${BASE}/process)`,
    `- [About](${BASE}/about)`,
    `- [FAQ](${BASE}/faq)`,
    `- [Blog](${BASE}/blog)`,
    "",
    "## Cases",
    "",
    ...cases,
    "",
    "## Blog",
    "",
    ...posts,
    "",
    "## FAQ",
    "",
    ...faq,
    "## Optional",
    "",
    `- Other languages: ${BASE}/ru, ${BASE}/zh, ${BASE}/tr, ${BASE}/ar`,
    `- Sitemap: ${BASE}/sitemap.xml`,
    "",
  ].join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
