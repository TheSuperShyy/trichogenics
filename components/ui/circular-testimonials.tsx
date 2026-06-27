"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface CircularTestimonialItem {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface CircularTestimonialsProps {
  testimonials: CircularTestimonialItem[];
  autoplay?: boolean;
  autoplayMs?: number;
  /** Sizing/aspect classes for the image deck container (default: portrait 4:5). */
  imageContainerClassName?: string;
  /** Extra classes for the text column (e.g. a min-height to stop slide-to-slide jump). */
  contentClassName?: string;
  /** Reveal the quote word-by-word (good for short quotes) vs a single fade (long copy). */
  wordReveal?: boolean;
  colors?: {
    name?: string;
    designation?: string;
    testimony?: string;
    arrowBackground?: string;
    arrowForeground?: string;
    arrowHoverBackground?: string;
  };
  fontSizes?: { name?: string; designation?: string; quote?: string };
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Circular testimonials — a fanned deck of portraits on one side, the active
 * quote (word-by-word reveal) + name + designation and prev/next arrows on the
 * other. Autoplays through the deck. `colors`/`fontSizes` keep the component
 * theme-agnostic so callers pass brand values.
 *
 * All motion (autoplay, deck rotation, word reveal) is gated by
 * `prefers-reduced-motion`: under reduced motion it shows a static active card,
 * no autoplay, instant swaps. Arrows are real buttons with labels.
 */
export function CircularTestimonials({
  testimonials,
  autoplay = true,
  autoplayMs = 6000,
  imageContainerClassName = "aspect-[4/5] max-w-sm",
  contentClassName,
  wordReveal = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) {
  const c = {
    name: colors.name ?? "#0a0a0a",
    designation: colors.designation ?? "#454545",
    testimony: colors.testimony ?? "#171717",
    arrowBackground: colors.arrowBackground ?? "#141414",
    arrowForeground: colors.arrowForeground ?? "#f1f1f7",
    arrowHoverBackground: colors.arrowHoverBackground ?? "#00A6FB",
  };
  const f = {
    name: fontSizes.name ?? "1.5rem",
    designation: fontSizes.designation ?? "0.95rem",
    quote: fontSizes.quote ?? "1.125rem",
  };

  const count = testimonials.length;
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<"prev" | "next" | null>(null);
  const reduce = useReducedMotion();

  const next = useCallback(() => setActive((p) => (p + 1) % count), [count]);
  const prev = useCallback(() => setActive((p) => (p - 1 + count) % count), [count]);

  // Autoplay; `active` in deps resets the timer after any manual navigation.
  useEffect(() => {
    if (!autoplay || reduce || count <= 1) return;
    const id = setInterval(next, autoplayMs);
    return () => clearInterval(id);
  }, [autoplay, reduce, count, next, autoplayMs, active]);

  const activeItem = testimonials[active];
  if (!activeItem) return null;

  return (
    <div className="grid w-full items-center gap-10 md:grid-cols-2 md:gap-16">
      {/* Image deck */}
      <div className={cn("relative mx-auto w-full [perspective:1200px]", imageContainerClassName)}>
        {testimonials.map((t, i) => {
          const offset = i - active;
          const isActive = i === active;
          return (
            <motion.div
              key={t.src}
              className="absolute inset-0 [transform-style:preserve-3d]"
              initial={false}
              animate={{
                opacity: Math.abs(offset) <= 1 ? (isActive ? 1 : 0.22) : 0,
                scale: isActive ? 1 : 0.9,
                rotateY: isActive ? 0 : offset > 0 ? -16 : 16,
                x: isActive ? "0%" : offset > 0 ? "11%" : "-11%",
                zIndex: count - Math.abs(offset),
              }}
              transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE }}
            >
              <Image
                src={t.src}
                alt={t.name}
                fill
                sizes="(max-width: 768px) 80vw, 24rem"
                className="rounded-lg object-cover shadow-lg"
                draggable={false}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Active quote */}
      <div className={cn("flex flex-col", contentClassName)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
          >
            <p className="font-semibold leading-tight" style={{ color: c.name, fontSize: f.name }}>
              {activeItem.name}
            </p>
            {activeItem.designation ? (
              <p
                className="mt-1 font-semibold uppercase tracking-wide"
                style={{ color: c.designation, fontSize: f.designation }}
              >
                {activeItem.designation}
              </p>
            ) : null}
            <blockquote className="mt-6 font-medium leading-relaxed" style={{ color: c.testimony, fontSize: f.quote }}>
              {reduce || !wordReveal
                ? activeItem.quote
                : activeItem.quote.split(" ").map((word, wi) => (
                    <motion.span
                      key={`${active}-${wi}`}
                      className="inline-block"
                      initial={{ opacity: 0, filter: "blur(4px)", y: 6 }}
                      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                      transition={{ duration: 0.3, ease: EASE, delay: 0.018 * wi }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
            </blockquote>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        {count > 1 ? (
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={prev}
              onMouseEnter={() => setHovered("prev")}
              onMouseLeave={() => setHovered(null)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-pill transition-colors duration-300"
              style={{
                backgroundColor: hovered === "prev" ? c.arrowHoverBackground : c.arrowBackground,
                color: c.arrowForeground,
              }}
            >
              <ChevronIcon className="h-5 w-5 rotate-180 rtl:rotate-0" />
            </button>
            <button
              type="button"
              onClick={next}
              onMouseEnter={() => setHovered("next")}
              onMouseLeave={() => setHovered(null)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-pill transition-colors duration-300"
              style={{
                backgroundColor: hovered === "next" ? c.arrowHoverBackground : c.arrowBackground,
                color: c.arrowForeground,
              }}
            >
              <ChevronIcon className="h-5 w-5 rtl:rotate-180" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
