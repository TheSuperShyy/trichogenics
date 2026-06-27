"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * "Slow blur whisper" reveal: content drifts in out of a soft blur when scrolled
 * into view — a gentle, premium entrance distinct from the snappier `Reveal`.
 * Drift direction is configurable via `x` (sides) and/or `y` (vertical); pass a
 * negative `x` to enter from the start side, positive to enter from the end side.
 * Once only. Explicitly gated on prefers-reduced-motion: under it the element
 * renders fully resolved (no blur, no travel). Pair with `delay` to stagger lines.
 *
 * NOTE: `x` is a PHYSICAL offset (not RTL-flipped). Use it only in LTR-only
 * sections (e.g. the EN-only MethodSection); prefer `y` where RTL parity matters.
 */
export function BlurReveal({
  children,
  delay = 0,
  className,
  as = "div",
  duration = 1.6,
  x = 0,
  y = 0,
  blur = 12,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "p" | "h2" | "li" | "span";
  duration?: number;
  x?: number;
  y?: number;
  blur?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, x, y, filter: `blur(${blur}px)` }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}
