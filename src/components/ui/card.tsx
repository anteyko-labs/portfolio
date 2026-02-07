"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import clsx from "clsx";
import { useReducedMotion } from "@/lib/hooks";

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"> {
  variant?: "default" | "elevated" | "bordered" | "gradient";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  children: ReactNode;
}

const variants = {
  default: "bg-bg-secondary",
  elevated: "bg-bg-elevated shadow-card",
  bordered: "bg-bg-secondary border border-border",
  gradient: "bg-gradient-to-br from-bg-secondary via-bg-tertiary to-bg-secondary border border-border/50",
};

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", hover = false, padding = "md", children, className, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    const baseClasses = "rounded-2xl overflow-clip transition-all duration-300";

    const hoverClasses = hover
      ? "hover:shadow-card-hover hover:border-border-hover cursor-pointer"
      : "";

    const motionProps: HTMLMotionProps<"div"> =
      hover && !prefersReducedMotion
        ? {
            whileHover: { y: -4, scale: 1.01 },
            transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
          }
        : {};

    return (
      <motion.div
        ref={ref}
        className={clsx(
          baseClasses,
          variants[variant],
          paddings[padding],
          hoverClasses,
          className
        )}
        {...motionProps}
        {...(props as HTMLMotionProps<"div">)}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

// Re-export TiltCard from dedicated module for backwards compatibility
// The actual TiltCard with real 3D effect is in tilt-card.tsx
export { TiltCard } from "./tilt-card";
