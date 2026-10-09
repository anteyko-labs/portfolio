import { ImageResponse } from "next/og";
import {
  getFlagshipCaseBySlug,
  getMicroCaseById,
  flagshipCases,
  microCases,
} from "@/lib/cases-data";
import { getShowcaseItem, visibleShowcaseItems } from "@/lib/showcase-data";

export const alt = "Anteyko — case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pre-render an OG card for every case at build time.
export function generateStaticParams() {
  return [
    ...flagshipCases.map((c) => ({ slug: c.slug })),
    ...microCases.map((c) => ({ slug: c.id })),
    ...visibleShowcaseItems.map((s) => ({ slug: s.slug })),
  ];
}

const INK = "#0A0A0B";
const MUTED = "#6B7280";
const ACCENT = "#4F46E5";
const BG = "#FAFAF9";

const CATEGORY_LABEL: Record<string, string> = {
  web: "Web",
  product: "Product",
  web3: "Web3",
  infrastructure: "Infrastructure",
};

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const flagship = getFlagshipCaseBySlug(slug);
  const micro = flagship ? null : getMicroCaseById(slug);
  const showcase = flagship || micro ? null : getShowcaseItem(slug);
  const item = flagship ?? micro ?? showcase;

  const title = item?.title.en ?? "Case study";
  const category = item ? CATEGORY_LABEL[item.category] ?? "" : "";
  const year = flagship ? String(flagship.year) : showcase ? String(showcase.year) : "";
  const industry = flagship ? flagship.industry.en : showcase ? showcase.sphere.en : "";
  const metaLine = [category, industry, year].filter(Boolean).join("   ·   ");
  const titleSize = title.length > 46 ? 60 : title.length > 30 ? 72 : 82;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: BG,
          backgroundImage: `radial-gradient(circle at 85% 15%, rgba(79,70,229,0.10), transparent 55%)`,
        }}
      >
        {/* Top row: wordmark + label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                background: ACCENT,
                marginRight: 16,
              }}
            />
            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: 3,
                color: INK,
              }}
            >
              ANTEYKO
            </div>
          </div>
          <div style={{ fontSize: 24, color: MUTED, letterSpacing: 1 }}>
            CASE STUDY
          </div>
        </div>

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 800,
              color: INK,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          {metaLine ? (
            <div style={{ fontSize: 30, color: MUTED, marginTop: 28 }}>
              {metaLine}
            </div>
          ) : null}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 26, color: MUTED }}>anteyko.com</div>
          <div style={{ fontSize: 26, color: ACCENT, fontWeight: 600 }}>
            End-to-end product studio
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
