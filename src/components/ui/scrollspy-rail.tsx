"use client";

import { useEffect, useState, useCallback } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActive = useCallback(
    (id: string) => {
      setActiveId(id);
      const idx = items.findIndex((item) => item.id === id);
      if (idx !== -1) setActiveIndex(idx);
    },
    [items]
  );

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateActive(entry.target.id);
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
  }, [items, updateActive]);

  const progress = items.length > 1 ? (activeIndex / (items.length - 1)) * 100 : 0;

  if (mode === "fixed") {
    return (
      <>
        {/* ---- Desktop 2xl+: full sidebar with labels ---- */}
        <nav
          className={clsx(
            "hidden 2xl:flex flex-col gap-2 z-50",
            position === "left" ? "fixed top-28 left-6" : "fixed top-28 right-6",
            className
          )}
          aria-label="Section navigation"
        >
          <div className="flex flex-col gap-0.5 rounded-xl bg-bg-secondary/80 backdrop-blur-md border border-border/60 px-3 py-3">
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={clsx(
                    "flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-all text-caption",
                    isActive
                      ? "text-accent-primary font-medium bg-accent-primary/5"
                      : "text-text-tertiary hover:text-text-primary hover:bg-bg-tertiary/40"
                  )}
                >
                  <span
                    className={clsx(
                      "shrink-0 rounded-full transition-all duration-200",
                      isActive
                        ? "w-1.5 h-1.5 bg-accent-primary shadow-[0_0_6px_rgba(99,102,241,0.4)]"
                        : "w-1 h-1 bg-text-tertiary/40"
                    )}
                  />
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>

        {/* ---- Below 2xl: horizontal floating progress bar pinned to top ---- */}
        <div className="2xl:hidden fixed top-[68px] left-0 right-0 z-40">
          {/* Thin progress track */}
          <div className="h-0.5 bg-border/30">
            <div
              className="h-full bg-accent-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Floating pill showing current section */}
          <div className="flex justify-center pointer-events-none">
            <nav
              className="pointer-events-auto mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-bg-secondary/90 backdrop-blur-md border border-border/60 shadow-md"
              aria-label="Section navigation"
            >
              {items.map((item, i) => {
                const isActive = item.id === activeId;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="relative flex items-center justify-center w-[44px] h-[44px] -mx-[18px]"
                    title={item.label}
                    aria-label={item.label}
                  >
                    <span
                      className={clsx(
                        "block rounded-full transition-all duration-200",
                        isActive
                          ? "w-2.5 h-2.5 bg-accent-primary shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                          : i <= activeIndex
                            ? "w-1.5 h-1.5 bg-accent-primary/40"
                            : "w-1.5 h-1.5 bg-text-tertiary/30"
                      )}
                    />
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </>
    );
  }

  // Sticky mode (original)
  return (
    <nav
      className={clsx(
        "hidden lg:flex flex-col gap-3 sticky top-24",
        "border-l border-border/70 pl-4",
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
