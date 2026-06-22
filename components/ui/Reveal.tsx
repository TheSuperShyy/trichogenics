"use client";

import type { ReactNode } from "react";
import { motion, type TargetAndTransition } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-reveal wrapper: fade + 16px rise, once, when scrolled into view.
 * Y-only motion so it behaves identically in LTR and RTL. Gated by the global
 * MotionConfig reducedMotion="user".
 *
 * `whileHover` is driven through Motion (not CSS) on purpose: Motion sets an
 * inline transform for the reveal, which would override a Tailwind hover:scale
 * class — so transform-based hover effects must go through Motion too.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  whileHover,
  y = 16,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
  whileHover?: TargetAndTransition;
  y?: number;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={whileHover}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}
