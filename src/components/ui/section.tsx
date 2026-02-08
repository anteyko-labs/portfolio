"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useReducedMotion } from "@/lib/hooks";
import { fadeInUp, staggerContainer, viewport } from "@/lib/motion";

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"> {
  children: ReactNode;
  background?: "primary" | "secondary" | "tertiary" | "gradient";
  padding?: "none" | "sm" | "md" | "lg" | "xl" | "xl-top" | "compact";
  container?: boolean;
  animate?: boolean;
}

const backgrounds = {
  primary: "bg-bg-primary",
  secondary: "bg-bg-secondary",
  tertiary: "bg-bg-tertiary",
  gradient: "bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary",
};

const paddings: Record<NonNullable<SectionProps["padding"]>, string> = {
  none: "",
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-16 sm:py-24 md:py-32",
  xl: "py-20 sm:py-32 md:py-40",
  "xl-top": "pt-20 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32",
  compact: "py-16 md:py-20",
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      background = "primary",
      padding = "lg",
      container = true,
      animate = true,
      className,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    const content = container ? (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    ) : (
      children
    );

    if (!animate || prefersReducedMotion) {
      return (
        <section
          ref={ref}
          className={clsx(backgrounds[background], paddings[padding], className)}
          {...props}
        >
          {content}
        </section>
      );
    }

    return (
      <motion.section
        ref={ref}
        className={clsx(backgrounds[background], paddings[padding], className)}
        initial="initial"
        whileInView="animate"
        viewport={viewport}
        variants={staggerContainer}
        {...props}
      >
        {content}
      </motion.section>
    );
  }
);

Section.displayName = "Section";

// Section header component
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
  animate?: boolean;
  size?: "default" | "lg";
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = "left",
  animate = true,
  size = "default",
}: SectionHeaderProps) {
  const prefersReducedMotion = useReducedMotion();

  const alignClasses = align === "center" ? "text-center mx-auto" : "";

  const content = (
    <div className={clsx("relative", alignClasses)}>
      {/* Eyebrow label */}
      {eyebrow && (
        <div className={clsx(
          "flex items-center gap-3 mb-4",
          align === "center" && "justify-center"
        )}>
          <span className="w-8 h-px bg-accent-primary" />
          <span className="text-caption font-medium uppercase tracking-[0.15em] text-accent-primary">
            {eyebrow}
          </span>
          {align !== "center" && <span className="flex-1 h-px bg-border/50" />}
        </div>
      )}

      {/* Title */}
      <h2
        className={clsx(
          "font-display font-semibold tracking-tight text-text-primary",
          size === "lg"
            ? "text-display-md md:text-display-lg"
            : "text-display-sm md:text-display-md"
        )}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={clsx(
            "mt-4 md:mt-5 text-body-lg md:text-body-lg text-text-secondary max-w-2xl leading-relaxed",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );

  if (!animate || prefersReducedMotion) {
    return <div className="mb-12 md:mb-16">{content}</div>;
  }

  return (
    <motion.div className="mb-12 md:mb-16" variants={fadeInUp}>
      {content}
    </motion.div>
  );
}

// Animated wrapper for section items
interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedItem({ children, className, delay = 0 }: AnimatedItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
