"use client";

import clsx from "clsx";

interface StepperItem {
  title: string;
  description?: string;
}

interface StepperProps {
  items: StepperItem[];
  className?: string;
}

export function Stepper({ items, className }: StepperProps) {
  return (
    <div className={clsx("space-y-5", className)}>
      {items.map((item, index) => (
        <div key={`${item.title}-${index}`} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <span className="w-8 h-8 rounded-full border border-accent-primary/40 bg-accent-primary/10 text-accent-primary flex items-center justify-center text-caption font-medium">
              {String(index + 1).padStart(2, "0")}
            </span>
            {index < items.length - 1 && (
              <span className="w-px h-8 bg-border/70 mt-2" aria-hidden />
            )}
          </div>
          <div>
            <p className="text-body-sm text-text-primary font-medium">{item.title}</p>
            {item.description && (
              <p className="text-caption text-text-secondary mt-1">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
