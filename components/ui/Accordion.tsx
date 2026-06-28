"use client";

import { useState, useId } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/content/schema";

/**
 * FAQ accordion — card style. Each question is its own rounded card; the open
 * card lifts (white fill + soft shadow + accent border) so the list reads as a
 * deliberately designed component, not a flat divider list. A "+" toggle morphs
 * to "−" on open. Answers can carry an optional price-tier list and a closing
 * paragraph (the cost answers). The same content feeds FAQPage JSON-LD (SEO).
 *
 * Height/opacity animate via motion/react, so the global MotionConfig
 * reducedMotion="user" collapses them to instant under prefers-reduced-motion.
 */
export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-btn-${i}`;
        const panelId = `${base}-panel-${i}`;
        return (
          <div
            key={i}
            className={cn(
              "rounded-2xl border transition-colors duration-300",
              isOpen
                ? "border-accent-500/30 bg-white shadow-[0_10px_40px_-12px_rgba(7,19,49,0.18)]"
                : "border-brand-900/10 bg-white/60 hover:border-brand-900/20 hover:bg-white",
            )}
          >
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-start sm:px-6"
              >
                <span
                  className={cn(
                    "text-lg font-semibold leading-snug transition-colors",
                    isOpen ? "text-brand-900" : "text-brand-800 group-hover:text-accent-700",
                  )}
                >
                  {item.question}
                </span>
                <ToggleIcon isOpen={isOpen} />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 sm:px-6">
                    <p className="text-[0.95rem] leading-relaxed text-ink-700">{item.answer}</p>

                    {item.priceList?.length ? (
                      <dl className="mt-4 divide-y divide-brand-900/10 overflow-hidden rounded-xl border border-brand-900/10 bg-sand-50">
                        {item.priceList.map((row) => (
                          <div
                            key={row.grafts}
                            className="flex items-center justify-between gap-4 px-4 py-2.5"
                          >
                            <dt className="text-sm font-medium text-brand-800">{row.grafts}</dt>
                            <dd className="text-sm font-semibold tabular-nums text-accent-700">
                              {row.price}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}

                    {item.answerCont ? (
                      <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-700">
                        {item.answerCont}
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/** Animated "+" that morphs to "−": the vertical bar collapses when open. */
function ToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-300",
        isOpen
          ? "border-accent-500/50 text-accent-600"
          : "border-brand-900/20 text-accent-600 group-hover:border-accent-500/50",
      )}
    >
      <span className="absolute h-[1.5px] w-3 rounded bg-current" />
      <span
        className={cn(
          "absolute h-3 w-[1.5px] rounded bg-current transition-transform duration-300",
          isOpen && "scale-y-0",
        )}
      />
    </span>
  );
}
