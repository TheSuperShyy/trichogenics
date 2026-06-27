"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { StandoutContent } from "@/content/schema";

const EASE = [0.22, 1, 0.36, 1] as const;
// Auto-advance pacing: PROGRESS_STEP% every TICK_MS → ~5s per feature.
const TICK_MS = 100;
const PROGRESS_STEP = 2;

/**
 * "What makes Trichogenics stand out" — an auto-advancing list of
 * differentiators paired with a synced image. Each feature is a real button
 * (click / keyboard selectable, `aria-pressed`); the active one fills a progress
 * bar then hands off to the next. On mobile the list is a horizontal snap
 * carousel that auto-centres the active card; on desktop it's a stacked column
 * beside the image.
 *
 * Motion (auto-advance, progress fill, image cross-fade, auto-scroll) is gated
 * by `prefers-reduced-motion`: under reduced motion nothing auto-plays, the
 * active bar shows full, and selection/image swaps are instant. All copy renders
 * in the DOM regardless of state, so it stays crawlable.
 */
export function Standout({ data }: { data: StandoutContent }) {
  const { eyebrow, heading, intro, features } = data;
  const count = features.length;

  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const featureRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Drive the progress fill of the active feature.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + PROGRESS_STEP));
    }, TICK_MS);
    return () => clearInterval(id);
  }, [reduce]);

  // When the bar completes, advance to the next feature.
  useEffect(() => {
    if (reduce || progress < 100) return;
    const t = setTimeout(() => {
      setActive((a) => (a + 1) % count);
      setProgress(0);
    }, 200);
    return () => clearTimeout(t);
  }, [progress, reduce, count]);

  // Keep the active card centred in the mobile horizontal scroller (no-op on the
  // desktop column, which doesn't overflow). EN-only section, so LTR scroll math.
  useEffect(() => {
    const el = featureRefs.current[active];
    const container = containerRef.current;
    if (!el || !container) return;
    container.scrollTo({
      left: el.offsetLeft - (container.clientWidth - el.clientWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active, reduce]);

  const select = (i: number) => {
    setActive(i);
    setProgress(0);
  };

  const current = features[active] ?? features[0];

  return (
    <section id="why-trichogenics" className="scroll-mt-24 bg-sand-100 py-section">
      <div className="mx-auto w-full max-w-[1800px] px-gutter">
        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-eyebrow font-semibold uppercase text-accent-700">{eyebrow}</p>
          <h2 className="mt-4 font-seed text-h2 font-normal text-brand-800">{heading}</h2>
          {intro ? <p className="mt-6 text-base text-ink-700">{intro}</p> : null}
        </Reveal>

        <div className="mt-12 grid items-center gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          {/* Image — top on mobile, end side on desktop */}
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-[3/2] w-full max-w-2xl overflow-hidden rounded-lg bg-sand-200 shadow-lg">
              {current ? (
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                >
                  <Image
                    src={current.image}
                    alt={current.alt ?? current.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </motion.div>
              ) : null}
            </div>
          </Reveal>

          {/* Feature list — horizontal snap carousel on mobile, column on desktop */}
          <div
            ref={containerRef}
            className="no-scrollbar order-2 -mx-gutter flex snap-x snap-mandatory scroll-smooth flex-row gap-4 overflow-x-auto px-gutter pb-2 lg:order-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {features.map((feature, i) => {
              const isActive = i === active;
              return (
                <button
                  key={feature.title}
                  type="button"
                  ref={(el) => {
                    featureRefs.current[i] = el;
                  }}
                  onClick={() => select(i)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex w-[80%] shrink-0 snap-center items-start gap-4 rounded-lg p-4 text-start transition-colors duration-300 sm:w-[22rem] lg:w-full lg:max-w-2xl",
                    isActive
                      ? "bg-white shadow-md ring-1 ring-brand-900/5"
                      : "bg-transparent hover:bg-white/60",
                  )}
                >
                  <span
                    className={cn(
                      "hidden shrink-0 rounded-pill p-3 transition-colors duration-300 sm:block",
                      isActive ? "bg-accent-500 text-white" : "bg-accent-50 text-accent-700",
                    )}
                  >
                    <StandoutIcon name={feature.icon} className="h-6 w-6" />
                  </span>

                  <span className="flex-1">
                    <span
                      className={cn(
                        "block text-h4 font-medium transition-colors duration-300",
                        isActive ? "text-brand-800" : "text-brand-700/80",
                      )}
                    >
                      {feature.title}
                    </span>
                    <span
                      className={cn(
                        "mt-2 block text-sm transition-colors duration-300",
                        isActive ? "text-ink-700" : "text-ink-700/70",
                      )}
                    >
                      {feature.body}
                    </span>

                    <span className="mt-4 block h-1 w-full overflow-hidden rounded-pill bg-brand-900/10">
                      {isActive ? (
                        reduce ? (
                          <span className="block h-full w-full bg-accent-500" />
                        ) : (
                          <motion.span
                            className="block h-full bg-accent-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: "linear" }}
                          />
                        )
                      ) : null}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Inline icon set keyed by the content's `icon` field (no icon dependency). */
const ICON_PATHS: Record<string, ReactNode> = {
  technique: (
    <>
      <path d="M4 20 14 10" />
      <path d="m16 3 1 2.4 2.4 1-2.4 1L16 11l-1-2.6-2.4-1 2.4-1z" />
    </>
  ),
  surgeon: (
    <>
      <path d="M12 3 19 6v5c0 4.2-3 7.4-7 8.5-4-1.1-7-4.3-7-8.5V6z" />
      <path d="m8.5 12 2.2 2.2L15.5 9.4" />
    </>
  ),
  care: <path d="M12 20s-6.5-4.2-6.5-9A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 6.5 2c0 4.8-6.5 10-6.5 10Z" />,
  results: (
    <>
      <path d="M3 16.5 9 10.5l3.5 3.5L21 5.5" />
      <path d="M15 5.5h6v6" />
    </>
  ),
  equipment: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
      <path d="M9 3v3.5M15 3v3.5M9 17.5V21M15 17.5V21M3 9h3.5M3 15h3.5M17.5 9H21M17.5 15H21" />
    </>
  ),
};

function StandoutIcon({ name, className }: { name?: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {(name && ICON_PATHS[name]) || <circle cx="12" cy="12" r="3" />}
    </svg>
  );
}
