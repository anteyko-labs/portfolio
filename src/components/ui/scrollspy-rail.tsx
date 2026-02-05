"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

interface ScrollSpyItem {
  id: string;
  label: string;
}

interface ScrollSpyRailProps {
  items: ScrollSpyItem[];
  className?: string;
  mode?: "sticky" | "fixed";
  position?: "left" | "right";
}

export function ScrollSpyRail({ items, className, mode = "sticky", position = "right" }: ScrollSpyRailProps) {
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
    <nav
      className={clsx(
        "hidden lg:flex flex-col gap-3",
        mode === "fixed" 
          ? position === "left" 
            ? "fixed top-28 left-8" 
            : "fixed top-28 right-8"
          : "sticky top-24",
        position === "left" 
          ? "border-l border-border/70 pl-4" 
          : "border-l border-border/70 pl-4",
        "text-body-sm",
        className
      )}
      aria-label="Section navigation"
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={clsx(
              "transition-colors",
              isActive ? "text-accent-primary" : "text-text-tertiary hover:text-text-primary"
            )}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
