"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * Global motion gate. `reducedMotion="user"` makes every Framer Motion animation
 * respect the OS prefers-reduced-motion setting automatically.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
