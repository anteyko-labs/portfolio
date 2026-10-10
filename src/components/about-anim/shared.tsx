"use client";

import "./about-anim.css";
import { ReactNode, useMemo, useRef } from "react";
import { motion, MotionValue, useInView, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";

/** A section whose CSS loops run only while it is near the screen */
export function RunScope({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "80px" });
  return (
    <section ref={ref} id={id} data-run={inView ? "true" : "false"} className={`ab-scope ${className}`}>
      {children}
    </section>
  );
}

/** Eyebrow + heading whose words rise in when scrolled into view; the last `gradient` words shimmer */
export function RevealTitle({ eyebrow, title, dark = false, gradient = 1, className = "" }: { eyebrow?: string; title: string; dark?: boolean; gradient?: number; className?: string }) {
  const reduced = useReducedMotion();
  const words = title.split(" ");
  return (
    <div className={className}>
      {eyebrow && (
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`inline-flex items-center gap-2 font-mono text-caption uppercase tracking-[0.2em] ${dark ? "text-indigo-200/70" : "text-text-tertiary"}`}
        >
          <span className="h-px w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={reduced ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        transition={{ staggerChildren: 0.06 }}
        className={`mt-4 font-brand text-3xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-4xl md:text-5xl ${dark ? "text-white" : "text-text-primary"}`}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block ${i >= words.length - gradient ? (dark ? "home-gradient-text" : "bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent") : ""}`}
              variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 0.75, ease: EASE } } }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </motion.h2>
    </div>
  );
}

function Word({ children, progress, range, dim }: { children: string; progress: MotionValue<number>; range: [number, number]; dim: number }) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

const MARKER = "linear-gradient(90deg, rgba(129,140,248,0.38), rgba(232,121,249,0.32), rgba(252,211,77,0.45))";

/** A key phrase: a marker sweeps under it (across line breaks) as it is read */
function Phrase({ children, progress, range }: { children: ReactNode; progress: MotionValue<number>; range: [number, number] }) {
  const size = useTransform(progress, range, ["0% 0.5em", "100% 0.5em"]);
  return (
    <motion.span
      className="font-medium text-text-primary"
      style={{ backgroundImage: MARKER, backgroundRepeat: "no-repeat", backgroundPosition: "0 88%", backgroundSize: size, WebkitBoxDecorationBreak: "slice", boxDecorationBreak: "slice" }}
    >
      {children}
    </motion.span>
  );
}

/**
 * A paragraph that brightens word by word as it scrolls through the viewport;
 * phrases in `highlights` get a marker sweep. Static and fully bright with
 * reduced motion.
 */
export function ScrollWords({ text, highlights = [], className = "", dim = 0.16 }: { text: string; highlights?: string[]; className?: string; dim?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 55%"] });

  const words = useMemo(() => {
    const ranges = highlights
      .map((h) => {
        const at = text.indexOf(h);
        return at < 0 ? null : [at, at + h.length];
      })
      .filter(Boolean) as [number, number][];
    const out: { w: string; hl: boolean }[] = [];
    const re = /\S+/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      const at = m.index;
      out.push({ w: m[0], hl: ranges.some(([a, b]) => at >= a && at < b) });
    }
    return out;
  }, [text, highlights]);

  if (reduced) {
    return (
      <p ref={ref} className={className}>
        {words.map((w, i) => (
          <span key={i} className={w.hl ? "font-medium text-text-primary" : undefined}>
            {w.w}{" "}
          </span>
        ))}
      </p>
    );
  }

  const n = words.length;
  const range = (i: number): [number, number] => [i / n, Math.min(1, (i + 3) / n)];
  // group consecutive highlighted words into phrases
  const groups: { start: number; items: string[]; hl: boolean }[] = [];
  words.forEach((w, i) => {
    const last = groups[groups.length - 1];
    if (w.hl && last?.hl) last.items.push(w.w);
    else groups.push({ start: i, items: [w.w], hl: w.hl });
  });
  return (
    <p ref={ref} className={className}>
      {groups.map((g) =>
        g.hl ? (
          <span key={g.start}>
            <Phrase progress={scrollYProgress} range={[g.start / n, Math.min(1, (g.start + g.items.length + 4) / n)]}>
              {g.items.map((w, k) => (
                <span key={k}>
                  <Word progress={scrollYProgress} range={range(g.start + k)} dim={dim}>
                    {w}
                  </Word>
                  {k < g.items.length - 1 ? " " : ""}
                </span>
              ))}
            </Phrase>{" "}
          </span>
        ) : (
          <span key={g.start}>
            <Word progress={scrollYProgress} range={range(g.start)} dim={dim}>
              {g.items[0]}
            </Word>{" "}
          </span>
        ),
      )}
    </p>
  );
}
