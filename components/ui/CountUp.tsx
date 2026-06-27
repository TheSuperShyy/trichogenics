"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

  // Parse once per `value`. Deriving these inline produced a fresh `match` array
  // on every render; listed as an effect dep, that restarted the rAF loop on each
  // counted frame, leaving the number stuck near 0. Memoising keeps the deps
  // stable so the count runs to completion.
  const { prefix, suffix, target, decimals, valid } = useMemo(() => {
    const m = value.match(/([^\d.,]*)([\d.,]+)(.*)/);
    const numeric = m?.[2] ?? "";
    const t = parseFloat(numeric.replace(/,/g, ""));
    return {
      prefix: m?.[1] ?? "",
      suffix: m?.[3] ?? "",
      target: t,
      decimals: numeric.includes(".") ? (numeric.split(".")[1]?.length ?? 0) : 0,
      valid: Boolean(m) && !Number.isNaN(t),
    };
  }, [value]);

  useEffect(() => {
    if (!inView || !valid) {
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
  }, [inView, reduce, valid, target, decimals, duration, prefix, suffix, value]);

  return (
    <span ref={ref}>
      <bdi>{display}</bdi>
    </span>
  );
}
