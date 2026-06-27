import { MosaicSection } from "./MosaicSection";
import type { MosaicContent } from "@/content/schema";

/**
 * Mosaic — a decorative, scroll-driven WebGL interlude (autoplaying clinic clips
 * scatter from a cluster into a mosaic while a "deeper look" line zooms through,
 * background white → navy). Server-component entry, safe to import in the page; the
 * actual scene + three.js are isolated in a client-only, code-split chunk
 * (MosaicSection → dynamic MosaicCanvas, ssr:false) and gated behind
 * prefers-reduced-motion. Scroll is driven by framer-motion (no Lenis/GSAP).
 */
export function Mosaic({ content }: { content: MosaicContent }) {
  return <MosaicSection content={content} />;
}
