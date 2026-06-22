"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/content/schema";

/**
 * Before/after cards with a "selected" card that stays lifted (seed-style): the
 * last-hovered card remains scaled up until another card is hovered (no revert
 * on mouse-leave). The first card is selected by default. The lift is plain CSS
 * transform on the inner <article> (not the Motion reveal wrapper), so it isn't
 * overridden by Motion's inline transform.
 */
export function ResultsCards({
  items,
}: {
  items: NonNullable<HomeContent["beforeAfter"]>;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => {
        const isActive = active === i;
        return (
          <Reveal
            key={item.name}
            delay={i * 0.06}
            className={cn("relative h-full", isActive ? "z-20" : "z-0")}
          >
            <article
              onMouseEnter={() => setActive(i)}
              onFocusCapture={() => setActive(i)}
              className={cn(
                "flex h-full flex-col rounded-xl p-4 ring-1 transition-all duration-300 ease-out",
                isActive
                  ? "scale-[1.06] bg-white/10 shadow-2xl ring-white/20"
                  : "bg-white/5 ring-white/10",
              )}
            >
              <span className="mx-auto rounded-pill px-3 py-1 text-xs text-sky-100/80 ring-1 ring-white/20">
                {item.label ?? "12-month result"}
              </span>
              <h3 className="mt-3 text-center font-seed text-h4 font-semibold text-white">
                {item.name}
              </h3>

              <div className="relative mt-4 aspect-[5/3] overflow-hidden rounded-lg bg-brand-800">
                {item.video ? (
                  <video
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={item.image}
                    src={item.video}
                  />
                ) : (
                  <Image
                    src={item.image}
                    alt={`${item.name} — hair restoration before and after`}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                    className="object-cover"
                  />
                )}
              </div>

              {/* Button first, then quote (swapped). */}
              <a
                href="/hair-transplant-results/"
                className={cn(
                  "mx-auto mt-5 inline-flex items-center gap-1.5 rounded-pill px-5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white text-brand-900 hover:bg-sky-100"
                    : "bg-brand-700 text-white hover:bg-brand-600",
                )}
              >
                View result
                <ArrowIcon
                  className={cn(
                    "h-4 w-4 transition-all duration-300 rtl:rotate-180",
                    isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0",
                  )}
                />
              </a>

              {item.quote ? (
                <p className="mt-4 text-center text-sm text-sky-100/70">“{item.quote}”</p>
              ) : null}
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
