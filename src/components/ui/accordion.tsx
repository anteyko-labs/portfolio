"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useReducedMotion } from "@/lib/hooks";

interface AccordionItemProps {
  title: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  defaultOpen?: boolean;
  /** Optional number indicator (e.g. "01") */
  number?: string;
  /** Visual variant */
  variant?: "default" | "card";
}

export function AccordionItem({
  title,
  children,
  isOpen: controlledIsOpen,
  onToggle,
  defaultOpen = false,
  number,
  variant = "default",
}: AccordionItemProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const prefersReducedMotion = useReducedMotion();

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (isControlled) {
      onToggle?.();
    } else {
      setInternalIsOpen((prev) => !prev);
    }
  };

  if (variant === "card") {
    return (
      <div
        className={clsx(
          "rounded-xl border transition-all duration-200",
          isOpen
            ? "border-accent-primary/30 bg-bg-secondary shadow-lg shadow-accent-primary/5"
            : "border-border/60 bg-bg-secondary/50 hover:border-border hover:bg-bg-secondary/80"
        )}
      >
        <button
          type="button"
          onClick={handleToggle}
          className={clsx(
            "w-full px-5 py-4 md:px-6 md:py-5 flex items-center gap-4",
            "text-left",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-inset rounded-xl"
          )}
          aria-expanded={isOpen}
        >
          {number && (
            <span
              className={clsx(
                "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-caption font-bold font-mono transition-colors duration-200",
                isOpen
                  ? "bg-accent-primary text-white"
                  : "bg-bg-tertiary text-text-tertiary"
              )}
            >
              {number}
            </span>
          )}
          <span
            className={clsx(
              "flex-1 text-heading-sm font-medium transition-colors duration-200",
              isOpen ? "text-text-primary" : "text-text-secondary"
            )}
          >
            {title}
          </span>
          <motion.span
            className={clsx(
              "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200",
              isOpen
                ? "bg-accent-primary/10 text-accent-primary"
                : "bg-bg-tertiary/50 text-text-tertiary"
            )}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className={clsx("px-5 pb-5 md:px-6 md:pb-6", number && "pl-14 md:pl-[5rem]")}>
                <div className="text-text-secondary text-body-md leading-relaxed">
                  {children}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Default variant (backward compatible)
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={handleToggle}
        className={clsx(
          "w-full py-5 flex items-center justify-between gap-4",
          "text-left text-text-primary",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-inset"
        )}
        aria-expanded={isOpen}
      >
        <span className="text-heading-sm font-medium">{title}</span>
        <motion.span
          className="shrink-0 text-text-secondary"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-text-secondary text-body-md leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: { id: string; title: string; content: ReactNode }[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="divide-y divide-border border-t border-border">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openIds.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
