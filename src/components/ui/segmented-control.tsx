"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface SegmentedOption {
  value: string;
  label: string;
}

interface SegmentedControlProps {
  id: string;
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SegmentedControl({
  id,
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps) {
  return (
    <div
      className={clsx(
        "relative inline-flex items-center rounded-2xl border border-border bg-bg-secondary/80 p-1",
        className
      )}
      role="tablist"
      aria-label="Filters"
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={clsx(
              "relative z-10 px-4 py-2 text-body-sm font-medium rounded-xl transition-colors",
              isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`${id}-indicator`}
                className="absolute inset-0 rounded-xl bg-accent-primary/20 border border-accent-primary/30"
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            )}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
