"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

interface ScrollProgressItem {
  id: string;
  label: string;
}

interface ScrollProgressRailProps {
  items: ScrollProgressItem[];
  className?: string;
}

export function ScrollProgressRail({ items, className }: ScrollProgressRailProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <aside
      className={clsx(
        "hidden lg:flex flex-col gap-6 sticky top-28 self-start",
        className
      )}
      aria-label="Process navigation"
    >
      {items.map((item, index) => {
        const isActive = item.id === activeId;
        return (
          <a key={item.id} href={`#${item.id}`} className="flex items-start gap-4 group">
            <div className="flex flex-col items-center">
              <span
                className={clsx(
                  "w-3 h-3 rounded-full border",
                  isActive
                    ? "bg-accent-primary border-accent-primary"
                    : "bg-bg-secondary border-border group-hover:border-border-hover"
                )}
              />
              {index < items.length - 1 && (
                <span className="w-px h-12 bg-border/70 mt-2" aria-hidden />
              )}
            </div>
            <span
              className={clsx(
                "text-body-sm",
                isActive ? "text-accent-primary" : "text-text-tertiary group-hover:text-text-primary"
              )}
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </aside>
  );
}
