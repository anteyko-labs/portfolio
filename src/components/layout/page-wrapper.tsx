"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";
import { Header } from "./header";
import { Footer } from "./footer";

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
      <a
        href="#main-content"
        className="absolute -left-[9999px] top-4 z-[100] px-4 py-2 rounded-xl bg-accent-primary text-white font-medium focus:left-4 focus:outline-none focus-visible:left-4"
      >
        Skip to main content
      </a>
      <Header />
      <motion.main
        id="main-content"
        className="flex-1 pt-18 md:pt-22"
        tabIndex={-1}
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
