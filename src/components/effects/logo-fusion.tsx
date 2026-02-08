"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const THRESHOLD = 1350; // distance in px to start effect
const SPARK_COUNT = 24;
const ACCENT = "99, 102, 241"; // accent-primary RGB

export function LogoFusionEffect() {
  const [intensity, setIntensity] = useState(0); // 0..1
  const [headerRect, setHeaderRect] = useState<DOMRect | null>(null);
  const [footerRect, setFooterRect] = useState<DOMRect | null>(null);
  const [fused, setFused] = useState(false);
  const fusedTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const rafRef = useRef<number>(undefined);

  const tick = useCallback(() => {
    const headerLogo = document.querySelector("[data-logo='header']");
    const footerLogo = document.querySelector("[data-logo='footer']");
    if (!headerLogo || !footerLogo) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    const hRect = headerLogo.getBoundingClientRect();
    const fRect = footerLogo.getBoundingClientRect();
    setHeaderRect(hRect);
    setFooterRect(fRect);

    // Distance between bottom of header logo and top of footer logo
    const dist = fRect.top - hRect.bottom;

    if (dist < THRESHOLD && dist > 0) {
      const raw = 1 - dist / THRESHOLD;
      setIntensity(Math.min(1, raw * raw)); // easeIn curve
      setFused(false);
    } else if (dist <= 0) {
      setIntensity(1);
      if (!fused) {
        setFused(true);
        // Auto-reset fusion after burst
        clearTimeout(fusedTimeoutRef.current);
        fusedTimeoutRef.current = setTimeout(() => setFused(false), 2000);
      }
    } else {
      setIntensity(0);
      setFused(false);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [fused]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(fusedTimeoutRef.current);
    };
  }, [tick]);

  if (intensity <= 0 || !headerRect || !footerRect) return null;

  const topY = headerRect.bottom;
  const bottomY = footerRect.top;
  const centerX = (headerRect.left + headerRect.right) / 2;
  const midY = (topY + bottomY) / 2;
  const beamHeight = Math.max(0, bottomY - topY);

  // Beam width grows with intensity
  const beamWidth = 2 + intensity * 40;
  // Glow radius grows
  const glowRadius = 20 + intensity * 80;
  // Spark intensity
  const sparkOpacity = Math.min(1, intensity * 1.5);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9998 }}
      aria-hidden="true"
    >
      {/* Energy beam between logos */}
      <div
        className="absolute transition-none"
        style={{
          left: centerX - beamWidth / 2,
          top: topY,
          width: beamWidth,
          height: beamHeight,
          background: `linear-gradient(
            180deg,
            rgba(${ACCENT}, ${intensity * 0.1}) 0%,
            rgba(${ACCENT}, ${intensity * 0.6}) 30%,
            rgba(${ACCENT}, ${intensity * 0.8}) 50%,
            rgba(${ACCENT}, ${intensity * 0.6}) 70%,
            rgba(${ACCENT}, ${intensity * 0.1}) 100%
          )`,
          borderRadius: beamWidth / 2,
          filter: `blur(${2 + intensity * 4}px)`,
        }}
      />

      {/* Outer glow */}
      <div
        className="absolute"
        style={{
          left: centerX - glowRadius,
          top: midY - glowRadius,
          width: glowRadius * 2,
          height: glowRadius * 2,
          background: `radial-gradient(circle, rgba(${ACCENT}, ${intensity * 0.3}) 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: `blur(${glowRadius / 2}px)`,
        }}
      />

      {/* Top node glow (header logo) */}
      <div
        className="absolute"
        style={{
          left: centerX - 20 - intensity * 15,
          top: topY - 10 - intensity * 5,
          width: 40 + intensity * 30,
          height: 20 + intensity * 10,
          background: `radial-gradient(ellipse, rgba(${ACCENT}, ${intensity * 0.7}) 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: `blur(${6 + intensity * 8}px)`,
        }}
      />

      {/* Bottom node glow (footer logo) */}
      <div
        className="absolute"
        style={{
          left: centerX - 20 - intensity * 15,
          top: bottomY - 10 - intensity * 5,
          width: 40 + intensity * 30,
          height: 20 + intensity * 10,
          background: `radial-gradient(ellipse, rgba(${ACCENT}, ${intensity * 0.7}) 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: `blur(${6 + intensity * 8}px)`,
        }}
      />

      {/* Sparks */}
      {intensity > 0.15 && (
        <div className="absolute inset-0">
          {Array.from({ length: Math.round(SPARK_COUNT * intensity) }).map((_, i) => {
            const progress = (i / SPARK_COUNT + (Date.now() / 3000 * (i % 3 + 1))) % 1;
            const sparkY = topY + beamHeight * progress;
            const offsetX = (Math.sin(i * 2.7 + progress * Math.PI * 4) * (beamWidth + intensity * 30));
            const size = 1.5 + Math.random() * 2 * intensity;
            const opacity = sparkOpacity * (0.3 + 0.7 * Math.sin(progress * Math.PI));

            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: centerX + offsetX,
                  top: sparkY,
                  width: size,
                  height: size,
                  backgroundColor: `rgba(${ACCENT}, ${opacity})`,
                  boxShadow: `0 0 ${4 + intensity * 6}px rgba(${ACCENT}, ${opacity * 0.8})`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Fusion burst — AirDrop-style pulse */}
      <AnimatePresence>
        {fused && (
          <>
            {/* Ring 1 */}
            <motion.div
              className="absolute rounded-full border-2"
              style={{
                borderColor: `rgba(${ACCENT}, 0.8)`,
                left: centerX,
                top: topY,
              }}
              initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                width: 300,
                height: 300,
                x: -150,
                y: -150,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            {/* Ring 2 */}
            <motion.div
              className="absolute rounded-full border"
              style={{
                borderColor: `rgba(${ACCENT}, 0.5)`,
                left: centerX,
                top: topY,
              }}
              initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                width: 500,
                height: 500,
                x: -250,
                y: -250,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            />
            {/* Flash */}
            <motion.div
              className="absolute"
              style={{
                left: centerX - 60,
                top: topY - 60,
                width: 120,
                height: 120,
                background: `radial-gradient(circle, rgba(${ACCENT}, 0.9) 0%, rgba(${ACCENT}, 0.3) 40%, transparent 70%)`,
                borderRadius: "50%",
              }}
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
