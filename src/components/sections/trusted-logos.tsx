import type { SVGProps } from "react";

// Abstract monochrome industry marks used as silhouette "logos" in the
// Trusted-by strip. These represent the industries we serve (not specific
// client brands), so they are honest placeholders. Replace with real client
// logos (or NDA silhouettes) when available.

type MarkProps = SVGProps<SVGSVGElement>;

const base = (props: MarkProps): SVGProps<SVGSVGElement> => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

// Web3 / DeFi — hexagon block
export const Web3Mark = (p: MarkProps) => (
  <svg {...base(p)}>
    <path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" />
    <path d="M12 7l4.33 2.5v5L12 17l-4.33-2.5v-5z" />
  </svg>
);

// Fintech — card + chip
export const FintechMark = (p: MarkProps) => (
  <svg {...base(p)}>
    <rect x="2" y="5" width="20" height="14" rx="2.5" />
    <path d="M2 10h20" />
    <path d="M6 15h4" />
  </svg>
);

// SaaS — stacked layers / cloud platform
export const SaasMark = (p: MarkProps) => (
  <svg {...base(p)}>
    <path d="M12 3l9 5-9 5-9-5z" />
    <path d="M3 13l9 5 9-5" />
    <path d="M3 17l9 5 9-5" opacity="0.5" />
  </svg>
);

// Startups — upward trajectory / rocket
export const StartupMark = (p: MarkProps) => (
  <svg {...base(p)}>
    <path d="M5 19c-1 1-2 4-2 4s3-1 4-2a2.5 2.5 0 0 0-2-2z" />
    <path d="M13 16l-5-5a16 16 0 0 1 9-9c1.5 1.5 1.5 6-1 9a16 16 0 0 1-3 5z" />
    <circle cx="14.5" cy="9.5" r="1.5" />
  </svg>
);

// Enterprise — building / grid
export const EnterpriseMark = (p: MarkProps) => (
  <svg {...base(p)}>
    <rect x="4" y="3" width="7" height="18" rx="1" />
    <rect x="13" y="8" width="7" height="13" rx="1" />
    <path d="M7 7v.01M7 11v.01M7 15v.01M16.5 12v.01M16.5 16v.01" />
  </svg>
);

// Mobile / Consumer apps — phone
export const MobileMark = (p: MarkProps) => (
  <svg {...base(p)}>
    <rect x="6" y="2" width="12" height="20" rx="3" />
    <path d="M10 18h4" />
  </svg>
);
