"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Counts up the numeric part of a value (e.g. "1,500+", "4.9★", "2M+") when it
 * scrolls into view. Non-numeric prefix/suffix are preserved. Runs once; snaps
 * to the final value under prefers-reduced-motion.
 */
export function CountUp({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  const match = value.match(/([^\d.,]*)([\d.,]+)(.*)/);
  const prefix = match?.[1] ?? "";
  const numeric = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = parseFloat(numeric.replace(/,/g, ""));
  const decimals = numeric.includes(".") ? (numeric.split(".")[1]?.length ?? 0) : 0;

  useEffect(() => {
    if (!inView || !match || Number.isNaN(target)) {
      return;
    }
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = (target * eased).toFixed(decimals);
      const formatted = Number(current).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target, decimals, duration, prefix, suffix, value, match]);

  return (
    <span ref={ref}>
      <bdi>{display}</bdi>
    </span>
  );
}
