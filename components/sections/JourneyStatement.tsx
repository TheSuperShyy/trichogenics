import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";

/**
 * "It's more than hair" — seed.com "You are more than human" style: a split
 * statement section with a bold heading, paragraph, and a "Discover" play-CTA on
 * the start side, and a large visual on the end side.
 */
export function JourneyStatement() {
  return (
    <section className="bg-sand-50 py-12 lg:min-h-[calc(100dvh-44px)]">
      <div className="mx-auto grid w-full max-w-[1800px] items-center gap-12 px-gutter lg:min-h-[calc(100dvh-44px)] lg:grid-cols-2 lg:content-center lg:gap-16">
        {/* Statement + CTA — vertically centred, start side */}
        <Reveal className="max-w-xl">
          <p className="text-eyebrow font-semibold uppercase text-accent-700">The journey</p>
          <h2 className="mt-3 font-seed text-[clamp(1.875rem,3vw,2.5rem)] font-normal leading-[1.1] tracking-tight text-brand-800">
            It&apos;s more than hair.
          </h2>
          <p className="mt-5 text-base text-ink-700">
            A hair transplant is a journey, from your first consultation to your results a year
            later. Our American board-certified surgeons and concierge team guide every step, so you
            can focus on the outcome.
          </p>
          <a
            href="#consult"
            className={buttonVariants({ variant: "dark", size: "lg", className: "mt-8 gap-2.5" })}
          >
            Discover the journey
            <PlayIcon className="h-5 w-5" />
          </a>
        </Reveal>

        {/* Visual */}
        <Reveal delay={0.1}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-sand-100 shadow-sm">
            <Image
              src="/media/journey/main.jpg"
              alt="A Trichogenics surgeon designing a patient's new hairline"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 8.3l5.2 3.7-5.2 3.7z" fill="currentColor" />
    </svg>
  );
}
