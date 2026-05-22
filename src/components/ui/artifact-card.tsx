"use client";

import { ReactNode } from "react";
import clsx from "clsx";

type ArtifactTone = "primary" | "success" | "warning";

const toneClasses: Record<ArtifactTone, string> = {
  primary: "border-accent-primary/30 bg-accent-primary/5 text-accent-primary",
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
};

interface ArtifactCardProps {
  title: string;
  subtitle?: string;
  meta?: string;
  icon?: ReactNode;
  tone?: ArtifactTone;
  className?: string;
}

export function ArtifactCard({
  title,
  subtitle,
  meta,
  icon,
  tone = "primary",
  className,
}: ArtifactCardProps) {
  return (
    <article
      className={clsx(
        "flex items-start gap-3 p-4 rounded-xl border border-border bg-bg-secondary",
        "transition-colors hover:border-border-hover",
        className
      )}
    >
      <div
        className={clsx(
          "w-10 h-10 rounded-lg border flex items-center justify-center shrink-0",
          toneClasses[tone]
        )}
      >
        {icon}
      </div>
      <div className="min-w-0 overflow-hidden">
        <p className="text-body-sm text-text-primary font-medium break-words hyphens-auto">{title}</p>
        {subtitle && (
          <p className="font-mono text-caption text-text-muted mt-0.5 truncate">{subtitle}</p>
        )}
        {meta && <p className="text-caption text-text-tertiary mt-2">{meta}</p>}
      </div>
    </article>
  );
}
