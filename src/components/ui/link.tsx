"use client";

import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { forwardRef, AnchorHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useReducedMotion } from "@/lib/hooks";

interface LinkProps extends NextLinkProps {
  children: ReactNode;
  className?: string;
  external?: boolean;
  variant?: "default" | "nav" | "footer" | "underline";
}

const variants = {
  default: "text-text-secondary hover:text-text-primary transition-colors",
  nav: "text-text-secondary hover:text-text-primary transition-colors font-medium",
  footer: "text-text-tertiary hover:text-text-secondary transition-colors text-body-sm",
  underline:
    "text-accent-primary hover:text-accent-secondary transition-colors underline underline-offset-4",
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, external = false, variant = "default", ...props }, ref) => {
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <NextLink
        ref={ref}
        className={clsx(variants[variant], className)}
        {...externalProps}
        {...props}
      >
        {children}
        {external && (
          <svg
            className="inline-block ml-1 w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </NextLink>
    );
  }
);

Link.displayName = "Link";

// Animated link with underline effect
interface AnimatedLinkProps extends LinkProps {
  underlineColor?: string;
}

export function AnimatedLink({
  children,
  className,
  underlineColor = "bg-accent-primary",
  ...props
}: AnimatedLinkProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <NextLink
      className={clsx(
        "relative group text-text-primary hover:text-accent-primary transition-colors",
        className
      )}
      {...props}
    >
      {children}
      {!prefersReducedMotion && (
        <span
          className={clsx(
            "absolute left-0 bottom-0 w-full h-px",
            underlineColor,
            "scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
          )}
        />
      )}
    </NextLink>
  );
}

// Button-styled link
interface ButtonLinkProps extends LinkProps {
  buttonVariant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const buttonVariants = {
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

const buttonSizes = {
  sm: "px-4 py-2 text-body-sm gap-1.5",
  md: "px-6 py-3 text-body-md gap-2",
  lg: "px-8 py-4 text-body-lg gap-2.5",
};

export function ButtonLink({
  children,
  className,
  buttonVariant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  ...props
}: ButtonLinkProps) {
  const prefersReducedMotion = useReducedMotion();

  const baseClasses = `
    relative inline-flex items-center justify-center
    font-medium rounded-xl
    transition-all duration-200
    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
  `;

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <NextLink
        className={clsx(
          baseClasses,
          buttonVariants[buttonVariant],
          buttonSizes[size],
          className
        )}
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span className="shrink-0">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="shrink-0">{icon}</span>
        )}
      </NextLink>
    </motion.div>
  );
}
