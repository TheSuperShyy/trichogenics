"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/content/schema";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 7000;

/**
 * Technology — a single-slide carousel migrated from the live site's "Why a
 * follicular unit restoration clinic abroad..." deck. Each slide pairs a
 * device / method (title + description) with a clinical image; prev/next arrows
 * flank the stage and dots track position. It autoplays (pausing on hover or
 * focus) and is fully keyboard-operable. EN-only — the HE landing omits
 * `technology` — so the directional slide uses physical x. Reduced motion → an
 * instant swap with no autoplay.
 */
export function TechnologyCarousel({
  data,
  eyebrow,
}: {
  data: NonNullable<HomeContent["technology"]>;
  eyebrow: string;
}) {
  const items = data.items;
  const count = items.length;
  const reduce = useReducedMotion();
  // [activeIndex, direction] — direction (-1 prev / +1 next) drives the slide.
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const active = items[index]!;

  const paginate = useCallback(
    (delta: number) => setState(([i]) => [(i + delta + count) % count, delta]),
    [count],
  );
  const goTo = useCallback(
    (target: number) =>
      setState(([i]) => (target === i ? [i, 0] : [target, target > i ? 1 : -1])),
    [],
  );

  // Autoplay — restarts on every change (manual or auto); off when paused or reduced.
  useEffect(() => {
    if (reduce || paused || count < 2) return;
    const t = window.setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [reduce, paused, count, paginate, index]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      paginate(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      paginate(1);
    }
  };

  const offset = 48;
  const variants = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * offset }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : -d * offset }),
  };

  return (
    <section id="technology" className="scroll-mt-24 bg-sand-50 pt-section pb-0">
      <Container>
        <Reveal className="mx-auto max-w-6xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          {/* Wider cap (vs max-w-3xl) so the long heading lands on 2 lines, not 3. */}
          <h2 className="mt-4 text-balance font-seed text-h2 font-normal text-brand-800">
            {data.heading}
          </h2>
        </Reveal>

        <div
          className="relative mx-auto mt-12 max-w-5xl lg:mt-16"
          role="group"
          aria-roledescription="carousel"
          aria-label="Our technology"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <Arrow side="prev" onClick={() => paginate(-1)} />
          <Arrow side="next" onClick={() => paginate(1)} />

          <div className="px-12 sm:px-14 lg:px-16">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div
                  key={index}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                  className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
                >
                  <div className="order-2 md:order-1">
                    <h3 className="font-seed text-h3 font-semibold text-brand-800">
                      {active.title}
                    </h3>
                    <p className="mt-4 text-lg italic leading-relaxed text-ink-700">
                      {active.body}
                    </p>
                  </div>
                  <figure className="order-1 overflow-hidden rounded-2xl bg-sand-200 shadow-[0_8px_24px_rgba(7,19,49,0.08)] md:order-2">
                    <div className="relative aspect-[4/3]">
                      {active.image ? (
                        <Image
                          src={active.image}
                          alt={active.alt ?? active.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                  </figure>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div
            className="mt-10 flex justify-center gap-2.5"
            role="tablist"
            aria-label="Choose slide"
          >
            {items.map((item, i) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={item.title}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  i === index
                    ? "w-7 bg-accent-500"
                    : "w-2.5 bg-brand-800/20 hover:bg-brand-800/40",
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Circular prev/next control sitting in the stage's side gutter (≥44px target). */
function Arrow({ side, onClick }: { side: "prev" | "next"; onClick: () => void }) {
  const isPrev = side === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous slide" : "Next slide"}
      className={cn(
        "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-brand-800/15 bg-sand-50/85 text-brand-800 shadow-sm backdrop-blur transition hover:border-accent-500 hover:bg-accent-500 hover:text-sand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50",
        isPrev ? "start-0" : "end-0",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="h-5 w-5 rtl:rotate-180"
      >
        <path d={isPrev ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
      </svg>
    </button>
  );
}
