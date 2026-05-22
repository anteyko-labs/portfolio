"use client";

import { ReactNode } from "react";
import clsx from "clsx";
import { useLanguage } from "@/lib/language-context";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "info";
  size?: "sm" | "md";
  className?: string;
}

const variants = {
  default: "bg-bg-tertiary text-text-secondary border-border",
  primary: "bg-accent-primary/10 text-accent-primary border-accent-primary/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  info: "bg-accent-secondary/10 text-accent-secondary border-accent-secondary/20",
};

const sizes = {
  sm: "px-2 py-0.5 text-caption",
  md: "px-3 py-1 text-body-sm",
};

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

// Category badge for cases
interface CategoryBadgeProps {
  category: "web" | "product" | "web3" | "infrastructure";
  size?: "sm" | "md";
}

const categoryColors = {
  web: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  product: "bg-green-500/10 text-green-700 border-green-500/20",
  web3: "bg-purple-500/10 text-purple-700 border-purple-500/20",
  infrastructure: "bg-orange-500/10 text-orange-700 border-orange-500/20",
};

const categoryLabels = {
  web: { en: "Web", ru: "Веб" },
  product: { en: "Product", ru: "Продукт" },
  web3: { en: "Web3", ru: "Web3" },
  infrastructure: { en: "Infrastructure", ru: "Инфраструктура" },
};

export function CategoryBadge({ category, size = "sm" }: CategoryBadgeProps) {
  const { language } = useLanguage();
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border font-medium",
        categoryColors[category],
        sizes[size]
      )}
    >
      {categoryLabels[category][language]}
    </span>
  );
}
