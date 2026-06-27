import Image from "next/image";
import { Container } from "@/components/ui/Container";
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
  return Math.min(1.55, Math.max(0.85, raw));
}

/**
 * "As featured in" — press credibility strip migrated from the live
 * trichogenics.com. A seamless, continuously scrolling marquee: the logo set is
 * rendered twice and the track is translated -50% on an infinite linear loop, so
 * it wraps with no visible seam (and pauses on hover). Logos are muted/grayscale
 * (optically uniform, see above) and lift to full colour on hover.
 *
 * Pure CSS, so this stays a server component; the global `prefers-reduced-motion`
 * rule in globals.css freezes the scroll for users who ask for it. The second
 * (duplicated) copy is `aria-hidden` so screen readers announce each outlet once.
 */
export function PressLogos({
  logos,
  label,
}: {
  logos: NonNullable<HomeContent["pressLogos"]>;
  label: string;
}) {
  // Render the set twice — the -50% translate then lands exactly on the seam.
  const track = [...logos, ...logos];

  return (
    <section className="overflow-hidden border-y border-sand-200 bg-white py-10">
      <Container>
        <p className="mb-7 text-center text-eyebrow font-semibold uppercase tracking-[0.18em] text-ink-700/55">
          {label}
        </p>
      </Container>

      <div className="group marquee-mask relative">
        <ul className="animate-marquee flex w-max items-center [--gap:2.75rem] [--logo-h:26px] group-hover:[animation-play-state:paused] sm:[--gap:4rem] sm:[--logo-h:30px]">
          {track.map((logo, i) => {
            const dup = i >= logos.length;
            return (
              <li key={`${logo.name}-${i}`} aria-hidden={dup} className="flex shrink-0 items-center pe-[--gap]">
                {logo.src ? (
                  <Image
                    src={logo.src}
                    alt={dup ? "" : logo.name}
                    width={logo.width ?? 200}
                    height={logo.height ?? 50}
                    style={{
                      height: `calc(var(--logo-h) * ${opticalScale(logo.width, logo.height).toFixed(3)})`,
                      width: "auto",
                    }}
                    className="object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                ) : (
                  <span className="font-display text-lg font-semibold text-brand-800/45 grayscale">{logo.name}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
