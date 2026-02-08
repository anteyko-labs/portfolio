"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [label, setLabel] = useState("");
  const isTouchRef = useRef(false);

  const cursorX = useSpring(0, { stiffness: 250, damping: 22 });
  const cursorY = useSpring(0, { stiffness: 250, damping: 22 });

  useEffect(() => {
    const onTouch = () => { isTouchRef.current = true; };
    window.addEventListener("touchstart", onTouch, { once: true });

    const onMove = (e: MouseEvent) => {
      if (isTouchRef.current) return;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check what's under the cursor
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!el) { setLabel(""); return; }

      // Explicit data-cursor label takes priority
      const dataCursor = el.closest("[data-cursor]");
      if (dataCursor) {
        setLabel(dataCursor.getAttribute("data-cursor") || "");
        return;
      }

      // Buttons get "Tap"
      const btn = el.closest("button") || el.closest("[role='button']") || el.closest("input[type='submit']");
      if (btn) {
        setLabel("Tap");
        return;
      }

      setLabel("");
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouch);
    };
  }, [cursorX, cursorY]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{ x: cursorX, y: cursorY, opacity: label ? 1 : 0 }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-accent-primary/90 backdrop-blur-sm shadow-lg shadow-accent-primary/30"
        style={{ translateX: 14, translateY: -20 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: label ? 1 : 0,
          opacity: label ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <span className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white whitespace-nowrap">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}
