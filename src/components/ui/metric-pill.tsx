"use client";

import clsx from "clsx";

type MetricTone = "primary" | "muted";

const toneClasses: Record<MetricTone, string> = {
  primary: "border-accent-primary/30 bg-accent-primary/10 text-accent-primary",
  muted: "border-border bg-bg-secondary text-text-secondary",
};

interface MetricPillProps {
  label: string;
  value: string;
  tone?: MetricTone;
  className?: string;
}

export function MetricPill({ label, value, tone = "muted", className }: MetricPillProps) {
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-caption",
        toneClasses[tone],
        className
      )}
    >
      <span className="font-medium tabular-nums">{value}</span>
      <span className="text-text-tertiary">{label}</span>
    </div>
  );
}
