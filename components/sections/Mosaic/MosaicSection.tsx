"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import type { MosaicContent } from "@/content/schema";
import { MosaicStatic } from "./MosaicStatic";

// three.js lives ONLY in this lazily-loaded, client-only chunk → out of the initial
// bundle + the SSR'd HTML. ssr:false is valid here because this module is a Client
// Component. loading renders null so SSR and the first client paint match.
const MosaicCanvas = dynamic(() => import("./MosaicCanvas"), { ssr: false, loading: () => null });

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

/**
 * Mosaic interlude. Gating mirrors ResultsSlider EXACTLY (pure CSS, no JS swap): the
 * static brand band shows by default and under reduced-motion; the scroll-driven
 * WebGL track shows only on `motion-safe` + `lg`. BOTH subtrees are server-rendered,
 * so the SSR HTML equals the hydrated tree — no post-hydration layout shift, and the
 * intro copy is always present in the (crawlable) static node. The WebGL scene never
 * mounts on mobile or reduced-motion: its track is `display:none` there, so the
 * in-view check in MosaicMotion never fires.
 */
export function MosaicSection({ content }: { content: MosaicContent }) {
  return (
    <section className="relative">
      {/* Mobile (any), and desktop under reduced motion → calm static brand band. */}
      <div className="block motion-safe:lg:hidden">
        <MosaicStatic content={content} />
      </div>
      {/* Desktop + motion-allowed → the tall scroll track + pinned WebGL stage. */}
      <div className="hidden motion-safe:lg:block">
        <MosaicMotion content={content} />
      </div>
    </section>
  );
}

function MosaicMotion({ content }: { content: MosaicContent }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Mount the WebGL chunk only once the stage nears the viewport (NOT at hydration,
  // deep down the page) — so the six clips never eager-fetch on load. once:true keeps
  // it mounted after the first approach; the canvas's own IntersectionObserver then
  // pauses rendering + video decode whenever the stage scrolls out of view. On mobile
  // / reduced-motion this element is display:none, so it never intersects → never
  // mounts the scene.
  const nearView = useInView(stageRef, { once: true, margin: "300px 0px" });

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  // Smooth the scrub (the buttery feel the lab got from Lenis) via the same useSpring
  // the results slider uses (over-damped, no bounce). No Lenis/GSAP.
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.0005 });

  // Background white → brand navy. Driven by RAW scroll (not the lagging spring) and
  // mapped to complete by 0.9, so the stage is deterministically full navy at the
  // unpin point — no half-transitioned band sliding away against the white section
  // below. Lives in the DOM (not the canvas) so it transitions even while the WebGL
  // chunk is still loading; the canvas is transparent over it.
  const background = useTransform(scrollYProgress, [0, 0.9], ["#FAFAF8", "#071331"]);
  // Intro line: accelerating zoom INTO its own centre + fade — you "fly through" the
  // text into the forming mosaic (ported from the lab's smoothstep zoom).
  const introScale = useTransform(progress, (p) => {
    const zt = smoothstep(0, 0.18, p);
    return 1 + zt * zt * 6.5;
  });
  const introOpacity = useTransform(progress, (p) => 1 - smoothstep(0.06, 0.18, p));

  // Tall scroll track measured by useScroll; the inner stage pins. dvh on both the
  // track and the stage so the pin length matches the track on mobile browsers.
  return (
    <div ref={trackRef} className="relative h-[300dvh]">
      <motion.div
        ref={stageRef}
        className="sticky top-0 flex min-h-dvh items-center justify-center overflow-hidden"
        style={{ backgroundColor: background }}
      >
        {nearView ? <MosaicCanvas progress={progress} tiles={content.tiles} /> : null}

        {/* Intro overlay — real DOM text (not in the canvas). mix-blend difference
            keeps white text legible across the white→navy background. Decorative
            (no heading semantics); the section's indexed copy is the static node
            above, which is permanently in the DOM. */}
        <motion.div
          className="pointer-events-none relative z-10 px-gutter text-center text-white [mix-blend-mode:difference]"
          style={{ scale: introScale, opacity: introOpacity }}
        >
          <p className="text-eyebrow font-semibold uppercase tracking-[0.22em] text-white/70">
            {content.eyebrow}
          </p>
          <p className="mt-4 font-seed text-[clamp(2rem,5vw,4.75rem)] font-bold leading-[1.02] tracking-tight">
            {content.heading}
            {content.emphasis ? (
              <>
                {" "}
                <em className="italic">{content.emphasis}</em>
              </>
            ) : null}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
