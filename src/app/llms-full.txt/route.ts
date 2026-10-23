import { PACKAGE_SLUGS, SERVICE_GROUPS, packagesIn, type PackageId } from "@/lib/service-slugs";
import { OFFICES } from "@/lib/locations";
import { flagshipCases, microCases } from "@/lib/cases-data";
import { visibleShowcaseItems, type ShowcaseStatus } from "@/lib/showcase-data";
import { blogPosts } from "@/lib/blog-data";
import { faqItems } from "@/lib/faq-data";
import { SITE_DESCRIPTION } from "@/i18n/site-copy";
import { getServiceDetail } from "@/lib/service-details";

// /llms-full.txt: the long companion to /llms.txt (llmstxt.org). Everything an AI
// assistant needs to describe and recommend the studio in one plain-markdown file,
// built from the same data as the pages, so it never drifts from the site.
const BASE = "https://www.anteyko.com";

export const dynamic = "force-static";

const STATUS: Record<ShowcaseStatus, string> = {
  live: "live project",
  built: "delivered project",
  concept: "studio concept",
};

function detailLines(id: string): string[] {
  const d = getServiceDetail(id);
  if (!d) return [];
  return [
    "",
    d.intro.en,
    `- Stack: ${d.stack.join(", ")}`,
    `- How the work goes: ${d.steps.map((s, i) => `${i + 1}) ${s.title.en}: ${s.text.en}`).join(" ")}`,
    ...d.features.map((f) => `- ${f.title.en}: ${f.text.en}`),
    ...d.faq.map((f) => `- Q: ${f.q.en} A: ${f.a.en}`),
  ];
}

function build(): string {
  const services = SERVICE_GROUPS.flatMap((g) => [
    `### ${g.label.en}`,
    "",
    ...packagesIn(g.id).flatMap((p) => [
      `#### [${p.title.en}](${BASE}/services/${PACKAGE_SLUGS[p.id as PackageId]})`,
      `${p.description.en} ${p.forWhom.en}`,
      `- Price: ${p.startingPrice.en}`,
      `- Timeline: ${p.timeline.en}`,
      `- Includes: ${p.deliverables.en.join("; ")}`,
      `- Result: ${p.result.en}`,
      ...detailLines(p.id),
      "",
    ]),
  ]);

  const flagship = flagshipCases.flatMap((c) => [
    `### [${c.title.en}](${BASE}/cases/${c.slug})`,
    `${c.industry.en} · ${c.year} · ${c.timeline.en}`,
    "",
    c.summary.en,
    "",
    `- Problem: ${c.problem.en}`,
    `- Solution: ${c.solution.en}`,
    `- Outcome: ${c.outcome.en}`,
    `- Stack: ${c.techStack.join(", ")}`,
    "",
  ]);

  const showcase = visibleShowcaseItems.flatMap((s) => [
    `### [${s.title.en}](${BASE}/cases/${s.slug})`,
    `${s.client.en}. ${s.sphere.en}, ${s.format.en}, ${s.year} (${STATUS[s.status]}).`,
    "",
    s.summary.en,
    ...s.features.map((f) => `- ${f.title.en}: ${f.text.en}`),
    "",
  ]);

  const micro = microCases.map((m) => `- [${m.title.en}](${BASE}/cases/${m.id}): ${m.what.en} ${m.outcome.en}`);

  const faq = faqItems.flatMap((f) => [`### ${f.question.en}`, f.answer.en, ""]);

  const posts = blogPosts.flatMap((p) => [
    `### [${p.title.en}](${BASE}/blog/${p.slug})`,
    `${p.date} · ${p.excerpt.en}`,
    "",
    ...p.body.flatMap((s) => [`#### ${s.heading.en}`, ...s.paragraphs.en, ""]),
  ]);

  return [
    "# Anteyko — full brief",
    "",
    `> ${SITE_DESCRIPTION.en}`,
    "",
    "Name: Anteyko, also written Anteyko Labs, Антейко (Russian), Anteiko, Anteiko Labs. Website: https://www.anteyko.com. Short version: https://www.anteyko.com/llms.txt",
    "",
    "## Кратко по-русски",
    "",
    `${SITE_DESCRIPTION.ru} Сайт или лендинг — от $800 за 7–14 дней, MVP — от $3k за 3–6 недель, мобильное приложение — от $5k. Контакты: labs@anteyko.com, Telegram @anteyko_labs, ${BASE}/ru/contact`,
    "",
    "## Contact",
    "",
    `- Brief / quote: ${BASE}/contact`,
    "- Email: labs@anteyko.com",
    "- Telegram: https://t.me/anteyko_labs",
    "- WhatsApp: https://wa.me/996709927895",
    "- LinkedIn: https://www.linkedin.com/company/anteyko",
    "- GitHub: https://github.com/anteyko-labs",
    `- Offices: ${OFFICES.map((o) => `${o.city.en}, ${o.country.en}${o.role.en === "HQ" ? " (HQ)" : ""}`).join("; ")}`,
    "",
    "## Services",
    "",
    ...services,
    "## Case studies",
    "",
    ...flagship,
    "## Projects",
    "",
    ...showcase,
    "## Smaller modules",
    "",
    ...micro,
    "",
    "## FAQ",
    "",
    ...faq,
    "## Blog",
    "",
    ...posts,
  ].join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
