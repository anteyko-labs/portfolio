"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface PrincipleCardProps {
  title: string;
  description: string;
  evidence?: string;
  icon?: ReactNode;
  className?: string;
}

export function PrincipleCard({
  title,
  description,
  evidence,
  icon,
  className,
}: PrincipleCardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-border bg-bg-secondary p-6",
        "transition-colors hover:border-border-hover",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="w-10 h-10 rounded-lg border border-accent-primary/20 bg-accent-primary/10 text-accent-primary flex items-center justify-center">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-heading-sm font-medium text-text-primary mb-2">{title}</h3>
          <p className="text-body-sm text-text-secondary">{description}</p>
          {evidence && (
            <p className="text-caption text-text-tertiary mt-3">{evidence}</p>
          )}
        </div>
      </div>
    </div>
  );
}
