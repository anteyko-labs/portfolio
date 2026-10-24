import { EASE } from "@/components/motion/kit";

// Shared pieces of the per-service scenes (package-visuals.tsx, industry-visuals.tsx).

/** Accent colour per package as "r g b" (for rgb(var() / a) and SpotlightCard) */
export const PKG_COLOR: Record<string, string> = {
  "launch-site": "6 182 212",
  "mvp-sprint": "99 102 241",
  "startup-key": "236 72 153",
  "web3-addon": "139 92 246",
  "mobile-app": "249 115 22",
  "ai-bots": "163 230 53",
  "telegram-bots": "56 189 248",
  "time-access": "20 184 166",
  parking: "14 165 233",
  cctv: "239 68 68",
  "conference-av": "217 70 239",
  fintech: "234 179 8",
  "carbon-credits": "34 197 94",
  "it-support": "59 130 246",
  branding: "244 63 94",
};

export const r2 = (n: number) => Math.round(n * 100) / 100;
export const T = { duration: 0.6, ease: EASE };

export function Frame({ id, label, children, svgRef, className = "" }: { id: string; label: string; children: React.ReactNode; svgRef: React.RefObject<HTMLDivElement | null>; className?: string }) {
  return (
    <div ref={svgRef} role="img" aria-label={label} className={`sv-scene w-full rounded-xl ${className}`} style={{ ["--sv-c" as string]: PKG_COLOR[id] }}>
      <svg viewBox="0 0 320 150" className="relative z-10 block h-auto w-full" aria-hidden="true">
        {children}
      </svg>
    </div>
  );
}

