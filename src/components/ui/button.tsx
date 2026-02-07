"use client";

import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import clsx from "clsx";
import { useReducedMotion } from "@/lib/hooks";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: `
    bg-accent-primary text-white
    hover:bg-accent-secondary
    shadow-glow-sm hover:shadow-glow-md
    border border-accent-primary/50
  `,
  secondary: `
    bg-bg-elevated text-text-primary
    hover:bg-bg-tertiary
    border border-border hover:border-border-hover
  `,
  outline: `
    bg-transparent text-text-primary
    border border-border hover:border-accent-primary
    hover:text-accent-primary
  `,
  ghost: `
    bg-transparent text-text-secondary
    hover:text-text-primary hover:bg-bg-tertiary
  `,
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-body-sm gap-1.5",
  md: "px-6 py-3 text-body-md gap-2",
  lg: "px-8 py-4 text-body-lg gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      isLoading = false,
      fullWidth = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    const baseClasses = `
      relative inline-flex items-center justify-center
      font-medium rounded-xl
      transition-colors duration-200
      focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const motionProps: HTMLMotionProps<"button"> = prefersReducedMotion
      ? {}
      : {
          whileHover: disabled ? {} : { scale: 1.02 },
          whileTap: disabled ? {} : { scale: 0.98 },
          transition: { duration: 0.15, ease: "easeOut" },
        };

    return (
      <motion.button
        ref={ref}
        className={clsx(
          baseClasses,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...motionProps}
        {...(props as HTMLMotionProps<"button">)}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        <span
          className={clsx(
            "flex items-center gap-[inherit]",
            isLoading && "invisible"
          )}
        >
          {icon && iconPosition === "left" && (
            <span className="shrink-0">{icon}</span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <span className="shrink-0">{icon}</span>
          )}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
