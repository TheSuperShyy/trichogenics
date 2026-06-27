"use client";

import { useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/content/schema";

/** Full results page (legacy SEO URL, trailing slash). */
const RESULTS_HREF = "/hair-transplant-results/";

/**
 * Static before/after grid — the mobile / reduced-motion fallback for the
 * scroll-pinned slider. Borderless cards (ethical-style): the before/after media
 * fills each card edge-to-edge with a label chip and a bottom gradient scrim
 * carrying the testimonial, name and a teal-on-hover arrow — no glassy panel,
 * ring or padding frame. The whole card is the results link; the last-hovered/
 * focused card stays lifted (seed-style) until another is hovered. The lift is a
 * plain CSS transform on the anchor, so Motion's reveal transform doesn't fight
 * it.
 */
export function ResultsCards({
  items,
}: {
  items: NonNullable<HomeContent["beforeAfter"]>;
}) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2">
      {items.map((item, i) => {
        const isActive = active === i;
        return (
          <Reveal
            key={item.name}
            delay={i * 0.06}
            className={cn("relative h-full", isActive ? "z-20" : "z-0")}
          >
            <a
              href={RESULTS_HREF}
              aria-label={`View ${item.name}'s result`}
              onMouseEnter={() => setActive(i)}
              onFocusCapture={() => setActive(i)}
              className={cn(
                "group relative block h-full overflow-hidden bg-brand-900 outline-none transition-all duration-300 ease-out focus-visible:ring-4 focus-visible:ring-accent-500/70",
                isActive
                  ? "scale-[1.04] shadow-[0_24px_60px_-20px_rgba(7,19,49,0.45)]"
                  : "shadow-[0_12px_30px_-16px_rgba(7,19,49,0.35)]",
              )}
            >
              <div className="relative aspect-[5/3] w-full">
                {item.video ? (
                  <video
                    aria-hidden
                    className="h-full w-full object-cover"
                    autoPlay={!reduce}
                    muted
                    loop
                    playsInline
                    poster={item.image}
                    src={item.video}
                  />
                ) : (
                  <Image
                    src={item.image}
                    alt={`${item.name}, hair restoration before and after`}
                    fill
                    sizes="(max-width: 640px) 92vw, 46vw"
                    className="object-cover"
                  />
                )}

                <span className="absolute end-3 top-3 rounded-pill bg-brand-900/70 px-3 py-1 text-[0.7rem] font-medium text-white">
                  {item.label ?? "12-month result"}
                </span>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-900/90 via-brand-900/45 to-transparent px-4 pb-4 pt-20">
                  {item.quote ? (
                    <p className="text-pretty text-[0.95rem] font-semibold leading-snug text-white">
                      “{item.quote}”
                    </p>
                  ) : null}
                  <div className="mt-3 flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-white/15 text-xs font-semibold text-white ring-1 ring-white/30">
                      {initials(item.name)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-white">{item.name}</span>
                      {item.location ? (
                        <span className="block truncate text-xs text-white/70">{item.location}</span>
                      ) : null}
                    </span>
                    <span className="ms-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-white text-brand-900 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                      <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </Reveal>
        );
      })}
    </div>
  );
}

/** Up to two initials from a display name (e.g. "Nick Y." -> "NY", "Luke" -> "L"). */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
