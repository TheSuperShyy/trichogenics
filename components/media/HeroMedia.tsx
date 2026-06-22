"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Media = {
  kind: "video" | "stock3d" | "image";
  src: string;
  poster?: string;
  alt: string;
};

/**
 * Hero media.
 * - "panel" (default): fills its container (the right side of the split hero),
 *   object-cover, no overlay.
 * - "background": legacy full-bleed background with dark overlay.
 * For video/stock3d it plays a muted autoplay loop with the poster as the LCP;
 * under prefers-reduced-motion it shows the poster/image instead.
 */
export function HeroMedia({
  media,
  variant = "panel",
}: {
  media: Media;
  variant?: "panel" | "background" | "fill";
}) {
  const reduce = useReducedMotion();
  const isVideo = media.kind === "video" || media.kind === "stock3d";
  const isBg = variant === "background";
  const isFill = variant === "fill";

  return (
    <div
      className={cn(
        "overflow-hidden bg-gradient-to-br from-sky-100 to-sky-200",
        isBg && "absolute inset-0 -z-10",
        isFill && "absolute inset-0",
        !isBg && !isFill && "h-full w-full",
      )}
    >
      {isVideo && !reduce ? (
        <video
          className={cn("h-full w-full object-cover", isBg && "opacity-80")}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={media.poster}
          aria-hidden
        >
          <source src={media.src} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.poster ?? media.src}
          alt={media.alt}
          className={cn("h-full w-full object-cover", isBg && "opacity-80")}
        />
      )}
      {isBg ? (
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 via-brand-900/55 to-brand-900/85" />
      ) : null}
    </div>
  );
}
