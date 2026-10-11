"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import type { DemoShot } from "@/lib/demo-shots";

/** Width of the page the demo was captured at; speeds below are in its pixels, matching the live iframe. */
const DEMO_W = 1440;
/** Live preview scrolls down at 0.42 demo-px per millisecond while active */
const ACTIVE_SPEED = 0.42;

/**
 * Stand-in for a live demo iframe on touch devices: one stitched screenshot that pans
 * like the iframe scrolled, with the demo's sticky header pinned on top.
 *
 * mode="loop"   — scrolls down and back forever (home hero), as a CSS animation so it
 *                 pauses with the rest of an off-screen section. It moves the background
 *                 position, not a transform: inside the hero's 3D-tilted stage, WebKit stops
 *                 clipping a transformed child to its rounded frame, and the screenshot
 *                 spilled out over the phone. A painted background cannot escape.
 * mode="active" — scrolls down while `active`, eases back when it is not (catalog cards).
 */
export function ScrollShot({
  shot,
  mode,
  active = false,
  sizes,
  onReady,
}: {
  shot: DemoShot;
  mode: "loop" | "active";
  active?: boolean;
  sizes: string;
  onReady?: () => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  const [boxW, setBoxW] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (!w) return;
      setBoxW(w);
      setShift(Math.max(0, (w * shot.height) / shot.width - el.clientHeight));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [shot.width, shot.height]);

  // Time the live iframe needed to scroll the same distance
  const downMs = boxW ? (shift * DEMO_W) / boxW / ACTIVE_SPEED : 0;

  if (mode === "loop") {
    return (
      <div ref={box} className="absolute inset-0 overflow-hidden">
        {/* preload so onReady fires once the frames are decoded */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={shot.webp} alt="" className="hidden" decoding="async" onLoad={onReady} />
        <div
          className={clsx("absolute inset-0 bg-no-repeat", shift > 0 && "scroll-shot-loop")}
          style={
            {
              backgroundImage: `url(${shot.webp})`,
              backgroundSize: "100% auto",
              backgroundPosition: "0 0",
              ["--shot-shift" as string]: `${-shift}px`,
            } as React.CSSProperties
          }
        />
        <Image src={shot.header} alt="" width={shot.width} height={shot.headerHeight} sizes={sizes} className="absolute inset-x-0 top-0 h-auto w-full" />
      </div>
    );
  }

  return (
    <div ref={box} className="absolute inset-0 overflow-hidden">
      <Image
        src={shot.src}
        alt=""
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        onLoad={onReady}
        className="absolute left-0 top-0 h-auto w-full"
        style={{
          transform: `translate3d(0, ${active ? -shift : 0}px, 0)`,
          transition: active ? `transform ${downMs}ms linear` : "transform 1.1s cubic-bezier(.2,.8,.2,1)",
        }}
      />
      <Image
        src={shot.header}
        alt=""
        width={shot.width}
        height={shot.headerHeight}
        sizes={sizes}
        className="absolute inset-x-0 top-0 h-auto w-full"
      />
    </div>
  );
}
