import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Brand logo — the Trichogenics artwork (follicle mark + letter-spaced
 * "TRICHOGENICS" wordmark). We use a brand-navy monochrome PNG (the original's
 * silver wordmark was invisible on light backgrounds) so `tone` can drive both
 * states cleanly: "dark" (default) shows it navy for light backgrounds; "light"
 * flips it to solid white (via filter) for dark sections. The header sets `tone`
 * from the section currently behind it.
 */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Trichogenics — home"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src="/media/brand/logo-navy.png"
        alt="Trichogenics"
        width={303}
        height={86}
        priority
        className={cn(
          "h-9 w-auto transition-[filter] duration-300 sm:h-10 xl:h-12",
          tone === "light" && "brightness-0 invert",
        )}
      />
    </Link>
  );
}
