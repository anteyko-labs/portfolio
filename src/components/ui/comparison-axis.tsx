"use client";

import clsx from "clsx";

interface ComparisonItem {
  id: string;
  label: string;
  value: number; // 1..3
}

interface ComparisonAxisProps {
  label: string;
  items: ComparisonItem[];
  className?: string;
}

export function ComparisonAxis({ label, items, className }: ComparisonAxisProps) {
  return (
    <div className={clsx("grid gap-4", className)}>
      <p className="text-caption uppercase tracking-wider text-text-tertiary">{label}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-border bg-bg-secondary p-3">
            <div className="text-body-sm text-text-secondary mb-2">{item.label}</div>
            <div className="h-2 rounded-full bg-bg-tertiary overflow-hidden">
              <div
                className="h-full rounded-full bg-accent-primary"
                style={{ width: `${Math.min(Math.max(item.value, 1), 3) * 33.3}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
