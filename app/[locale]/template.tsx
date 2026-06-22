"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Subtle page transition. template.tsx re-mounts on navigation, so this fades
 * each route in. Reduced motion is honored via the global MotionConfig.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
