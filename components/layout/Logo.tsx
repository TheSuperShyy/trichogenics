import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Brand logo — the Trichogenics follicle mark + letter-spaced "TRICHOGENICS"
 * wordmark (2026 artwork). The logo is two-tone (white/navy lettering + blue
 * follicle strands), so a single CSS invert can't drive both states cleanly the
 * way the old monochrome mark did. Instead we stack two prepared variants and
 * cross-fade between them by `tone`: a navy version for light backgrounds and a
 * white version for dark sections — the blue strands persist in both. The header
 * sets `tone` from the section currently behind it, so the swap stays smooth and
 * theme-aware. Display height (h-9 → sm:h-10 → xl:h-12) matches the original.
 */
const LOGO_W = 2274;
const LOGO_H = 554;

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const showLight = tone === "light";
  return (
    <Link
      href="/"
      aria-label="Trichogenics home"
      className={cn("relative inline-flex items-center", className)}
    >
      {/* Navy variant — for light backgrounds (default) */}
      <Image
        src="/media/brand/logo-2026-dark.png"
        alt="Trichogenics"
        width={LOGO_W}
        height={LOGO_H}
        priority
        className={cn(
          "h-9 w-auto transition-opacity duration-300 sm:h-10 xl:h-12",
          showLight && "opacity-0",
        )}
      />
      {/* White variant — for dark sections; overlaid and cross-faded */}
      <Image
        src="/media/brand/logo-2026-light.png"
        alt=""
        aria-hidden
        width={LOGO_W}
        height={LOGO_H}
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-300",
          showLight ? "opacity-100" : "opacity-0",
        )}
      />
    </Link>
  );
}
