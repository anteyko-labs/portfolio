"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Count up animation hook. Returns the current displayed value.
 * Extracts numeric part from strings like "40+", "87%", "24h", "6".
 */
export function useCountUp(
  target: string,
  inView: boolean,
  duration = 1500
): string {
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(target);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || prefersReducedMotion) return;
    hasAnimated.current = true;

    // Extract number and suffix from target (e.g. "40+" -> 40, "+")
    const match = target.match(/^(\d+\.?\d*)(.*)/);
    if (!match) {
      setDisplay(target);
      return;
    }

    const end = parseFloat(match[1]);
    const suffix = match[2] || "";
    const isFloat = match[1].includes(".");
    const start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // EaseOutExpo for natural deceleration
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = start + (end - start) * eased;

      if (isFloat) {
        setDisplay(`${current.toFixed(1)}${suffix}`);
      } else {
        setDisplay(`${Math.round(current)}${suffix}`);
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [inView, target, duration, prefersReducedMotion]);

  return display;
}

/**
 * Hook that returns true when element is in viewport.
 * Uses IntersectionObserver with configurable threshold.
 */
export function useInViewOnce(threshold = 0.3): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/**
 * Mouse position relative to an element (normalized -1 to 1).
 */
export function useRelativeMouse(ref: React.RefObject<HTMLElement | null>) {
  const [pos, setPos] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
        active: true,
      });
    };

    const onLeave = () => setPos((p) => ({ ...p, active: false }));

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref]);

  return pos;
}
