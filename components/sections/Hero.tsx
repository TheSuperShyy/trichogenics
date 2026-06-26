import { HeroMedia } from "@/components/media/HeroMedia";
import { FadeIn } from "@/components/ui/FadeIn";
import { buttonVariants } from "@/components/ui/Button";
import type { HomeContent } from "@/content/schema";

/**
 * Full-bleed hero (seed.com-style): one lifestyle image across the whole width
 * with a light scrim on the inline-start side so the dark text reads clearly.
 * The sticky transparent header floats over the top; `-mt-20` slides the image
 * up behind it. Mirrors automatically in RTL.
 */
export function Hero({ hero }: { hero: HomeContent["hero"] }) {
  return (
    <section className="relative z-10 -mt-20 min-h-[calc(100vh-44px)] overflow-hidden rounded-b-[2.5rem] bg-sand-50">
      {/* Full-bleed media */}
      <HeroMedia media={hero.media} variant="fill" />

      {/* Scrim — mobile: a flat translucent veil so the video shows through
          evenly behind the text (no gradient). Desktop: light on the start side,
          image on the end side. Cool brand-50 tint (not warm sand) so it sits in
          the navy palette. */}
      <div className="absolute inset-0 bg-brand-50/75 lg:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-brand-50 via-brand-50/85 to-transparent rtl:bg-gradient-to-l lg:block" />

      {/* Padding matches the header (px-5/8/16) so the headline's start edge
          aligns with the logo; items-start anchors the block to the top like seed. */}
      <div className="relative mx-auto flex min-h-[calc(100vh-44px)] max-w-[1800px] items-start px-gutter pb-16 pt-24">
        <FadeIn className="-ms-[3px] max-w-lg">
          <h1 className="max-w-[32rem] font-seed text-[clamp(2.125rem,1.4rem+3.6vw,3rem)] font-normal leading-[1.08] tracking-tight text-brand-800">
            {hero.h1}
          </h1>
          <p className="mt-5 max-w-md font-seed text-lg text-ink-700">{hero.subhead}</p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a href={hero.ctaPrimary.href} className={buttonVariants({ variant: "dark", size: "md" })}>
              {hero.ctaPrimary.label}
            </a>
            {hero.ctaSecondary ? (
              <a
                href={hero.ctaSecondary.href}
                className="group inline-flex items-center gap-2 font-medium text-brand-800 underline decoration-from-font underline-offset-4 hover:text-accent-700"
              >
                {hero.ctaSecondary.label}
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </a>
            ) : null}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
