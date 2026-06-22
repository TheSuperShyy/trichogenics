import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Wordmark logo (text-based for now; swap for the processed brand mark later).
 * `tone` adapts the color for the transparent-over-hero header state.
 */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="Trichogenics — home"
      className={cn(
        "font-display text-xl font-semibold tracking-tight transition-colors",
        tone === "light" ? "text-white" : "text-brand-800",
      )}
    >
      Tricho<span className="text-accent-500">genics</span>
    </Link>
  );
}
