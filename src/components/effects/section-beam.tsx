"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

/**
 * SectionBeam — a thin vertical "energy line" that threads sections together,
 * promoting the logo-fusion beam motif into a reusable site-wide connector.
 *
 * A static gradient line (transparent -> indigo -> transparent) is always
 * rendered. A subtle indigo pulse/spark travels DOWN the line, its position
 * scroll-linked to the element's progress through the viewport, so the energy
 * appears to flow as the user scrolls past.
 *
 * Subtle on light backgrounds (low opacity); more present on dark surfaces
 * (the `.section-dark` scope bumps the line via CSS). Under
 * prefers-reduced-motion ONLY the static line renders — no traveling pulse.
 *
 * Decorative only: rendered aria-hidden with pointer-events none.
 *
 * Placement: drop inside a `relative` container. By default it centers itself
 * horizontally (left-1/2 -translate-x-1/2); pass `className` to offset it
 * (e.g. "left-8" or "right-12 left-auto") or to constrain its width.
 *
 * @example
 *   <div className="relative">
 *     <SectionBeam height="lg" />
 *     ...section content...
 *   </div>
 */

type SectionBeamVariant = "default" | "dark";

interface SectionBeamProps {
  /** Vertical extent. Tokens map to fixed heights; "full" spans the parent. */
  height?: "sm" | "md" | "lg" | "full";
  /** "dark" pre-brightens the line for dark surfaces (also auto-applied
   *  via the `.section-dark` CSS scope). Defaults to "default". */
  variant?: SectionBeamVariant;
  /** Extra classes — use to offset horizontally or set z-index. */
  className?: string;
}

const HEIGHT_MAP: Record<NonNullable<SectionBeamProps["height"]>, string> = {
  sm: "h-24",
  md: "h-40",
  lg: "h-64",
  full: "h-full",
};

export function SectionBeam({
  height = "md",
  variant = "default",
  className = "",
}: SectionBeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track this element's progress through the viewport: 0 when its top
  // enters the bottom of the screen, 1 when its bottom leaves the top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Pulse travels from just above the line (-10%) to just below it (110%).
  const rawTop = useTransform(scrollYProgress, [0, 1], ["-10%", "110%"]);
  // Smooth the scroll-linked motion so the spark glides rather than jitters.
  const pulseTop = useSpring(rawTop, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });
  // Fade the pulse in at the edges of the scroll window so it doesn't pop.
  const pulseOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1],
    [0, 1, 1, 0]
  );

  const isDark = variant === "dark";
  const sparkColor = isDark
    ? "rgba(129, 140, 248, 0.9)"
    : "rgba(99, 102, 241, 0.75)";
  const sparkGlow = isDark
    ? "0 0 12px 2px rgba(129, 140, 248, 0.6)"
    : "0 0 10px 2px rgba(99, 102, 241, 0.4)";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${HEIGHT_MAP[height]} ${className}`}
    >
      {/* Always-visible static track */}
      <span
        className="section-beam-line left-1/2 -translate-x-1/2"
        style={isDark ? { ["--beam-opacity" as string]: "0.45", width: "2px" } : undefined}
      />

      {/* Traveling pulse — suppressed under reduced motion */}
      {!prefersReducedMotion && (
        <motion.span
          className="absolute left-1/2 h-8 w-px -translate-x-1/2 rounded-full"
          style={{
            top: pulseTop,
            opacity: pulseOpacity,
            background: `linear-gradient(180deg, transparent, ${sparkColor}, transparent)`,
            boxShadow: sparkGlow,
          }}
        />
      )}
    </div>
  );
}
