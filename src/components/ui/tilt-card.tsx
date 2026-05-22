"use client";

import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useMouseInElement, useReducedMotion } from "@/lib/hooks";

const TILT_MAX_DEFAULT = 8;

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  variant?: "bordered" | "gradient";
  hoverGradientBorder?: boolean;
  noiseHover?: boolean;
  /** Угол наклона при hover (по умолчанию 8; для кейсов можно 12) */
  tiltAmount?: number;
  /** Opacity шума при hover (по умолчанию 0.03; для кейсов 0.05) */
  noiseHoverOpacity?: number;
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function TiltCard({
  children,
  className,
  padding = "md",
  variant = "bordered",
  hoverGradientBorder = true,
  noiseHover = true,
  tiltAmount = TILT_MAX_DEFAULT,
  noiseHoverOpacity = 0.03,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useMouseInElement(ref, true);
  const prefersReducedMotion = useReducedMotion();

  const tiltX = prefersReducedMotion ? 0 : -mouse.y * tiltAmount;
  const tiltY = prefersReducedMotion ? 0 : mouse.x * tiltAmount;

  const cardFaceClasses =
    variant === "gradient"
      ? "bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-border"
      : "bg-bg-secondary border border-border";

  return (
    <motion.div
      ref={ref}
      className={clsx(
        "group rounded-2xl transition-shadow duration-300 cursor-pointer",
        "hover:shadow-card-hover hover:border-border-hover",
        className
      )}
      style={{ perspective: 1000 }}
    >
      {/* Tilt wrapper — rotates the whole card face on hover */}
      <motion.div
        className={clsx(
          cardFaceClasses,
          paddings[padding],
          "relative h-full rounded-2xl overflow-hidden"
        )}
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          ["--noise-opacity" as string]: noiseHoverOpacity,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Cursor-following highlight — subtle neutral sheen */}
        {hoverGradientBorder && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${(mouse.x + 1) * 50}% ${(mouse.y + 1) * 50}%, rgba(10,10,10,0.04) 0%, transparent 60%)`,
            }}
            aria-hidden
          />
        )}
        {noiseHover && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-[var(--noise-opacity)] transition-opacity duration-300 pointer-events-none rounded-2xl z-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />
        )}
        {children}
      </motion.div>
    </motion.div>
  );
}
