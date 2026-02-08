"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const isTouchRef = useRef(false);

  const cursorX = useSpring(0, { stiffness: 300, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 28 });

  useEffect(() => {
    // Detect touch device
    const onTouch = () => { isTouchRef.current = true; };
    window.addEventListener("touchstart", onTouch, { once: true });

    const onMove = (e: MouseEvent) => {
      if (isTouchRef.current) return;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => { if (!isTouchRef.current) setVisible(true); };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Detect hover targets
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], [data-cursor]");
      if (interactive) {
        setIsHovering(true);
        const label = interactive.getAttribute("data-cursor") || "";
        setHoverText(label);
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    document.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("touchstart", onTouch);
    };
  }, [cursorX, cursorY, visible]);

  if (prefersReducedMotion || typeof window === "undefined") return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: visible ? 1 : 0,
      }}
    >
      <motion.div
        className="relative flex items-center justify-center rounded-full bg-white"
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHovering ? 64 : 12,
          height: isHovering ? 64 : 12,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {hoverText && isHovering && (
          <motion.span
            className="text-[10px] font-bold uppercase tracking-wider text-black"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
