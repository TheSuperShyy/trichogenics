import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/content/schema";

/**
 * Per-logo optical sizing. Capping every logo at the same *height* makes wide
 * wordmarks (NY Post, Yahoo) look huge and stacked marks (TODAY, SheFinds) look
 * tiny. We instead normalise by area: render height scales with 1/sqrt(aspect)
 * around a reference aspect, so each logo occupies a similar visual footprint.
 * Clamped so square logos don't tower. Returns a multiplier on `--logo-h`.
 */
function opticalScale(width?: number, height?: number) {
  if (!width || !height) return 1;
  const aspect = width / height;
  const REFERENCE_ASPECT = 3.8; // a typical wordmark -> scale ~1
  const raw = Math.sqrt(REFERENCE_ASPECT / aspect);
  // Wide range so stacked/near-square marks (TODAY, SheFinds) grow enough to
  // match the visual weight of the wide wordmarks instead of reading as tiny.
  return Math.min(1.55, Math.max(0.85, raw));
}

/**
 * "As featured in" — credibility row migrated from the live trichogenics.com
 * press strip. Logos render as muted marks (optically uniform, see above) that
 * lift to full on hover; a missing `src` falls back to a text wordmark.
 *
 * `tone="dark"` inverts the logos to white for placement on a dark band.
 * `embedded` drops the standalone <section>/background wrapper so the row can be
 * nested inside another section (e.g. below the before/after cards).
 */
export function PressLogos({
  logos,
  label,
  tone = "light",
  embedded = false,
}: {
  logos: NonNullable<HomeContent["pressLogos"]>;
  label: string;
  tone?: "light" | "dark";
  embedded?: boolean;
}) {
  const dark = tone === "dark";

  const row = (
    <Reveal className="flex flex-col items-center gap-7">
      <p
        className={cn(
          "text-eyebrow font-semibold uppercase tracking-[0.18em]",
          dark ? "text-sky-100/55" : "text-ink-700/55",
        )}
      >
        {label}
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 [--logo-h:26px] sm:gap-x-14 sm:[--logo-h:32px]">
        {logos.map((logo) =>
          logo.src ? (
            <li key={logo.name} className="flex items-center">
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width ?? 200}
                height={logo.height ?? 50}
                style={{
                  height: `calc(var(--logo-h) * ${opticalScale(logo.width, logo.height).toFixed(3)})`,
                  width: "auto",
                }}
                className={cn(
                  "object-contain transition duration-300",
                  dark
                    ? "opacity-70 brightness-0 invert hover:opacity-100"
                    : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0",
                )}
              />
            </li>
          ) : (
            <li
              key={logo.name}
              className={cn(
                "font-display text-lg font-semibold transition-all",
                dark
                  ? "text-white/50 hover:text-white/80"
                  : "text-brand-800/45 grayscale hover:text-brand-800/70",
              )}
            >
              {logo.name}
            </li>
          ),
        )}
      </ul>
    </Reveal>
  );

  // Nested inside another section (e.g. on the dark results band).
  if (embedded) return row;

  // Standalone light strip.
  return (
    <section className="border-y border-sand-200 bg-sand-50 py-10">
      <Container>{row}</Container>
    </section>
  );
}
