import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";

/**
 * "Expert care" feature section — seed.com "Daily essentials" layout: left
 * column (badge pill + heading + description + dark CTA), right column (large
 * feature image with floating label pills + a 3-thumbnail row). Light section,
 * full-width gutter to match the hero/results.
 */
const thumbs = [
  { src: "/media/feature/thumb-1.jpg", alt: "Trichogenics surgeons during a procedure" },
  { src: "/media/feature/thumb-2.jpg", alt: "Hair restoration technique close up" },
  { src: "/media/feature/thumb-3.jpg", alt: "Trichogenics clinic team" },
];

export function FeatureCare() {
  return (
    <section className="relative -mt-10 rounded-t-[2.5rem] bg-sand-50 pb-12 pt-12">
      <div className="mx-auto grid w-full max-w-[1800px] items-center gap-12 px-gutter lg:grid-cols-2 lg:gap-16">
        {/* Copy + CTA (left) */}
        <Reveal className="max-w-xl">
          <span className="inline-block rounded-pill bg-accent-50 px-4 py-1.5 text-sm font-semibold text-accent-700">
            Board-certified · all-inclusive
          </span>
          <h2 className="mt-5 font-seed text-[clamp(1.875rem,3vw,2.5rem)] font-normal leading-[1.1] tracking-tight text-brand-800">
            Expert care, from first consultation to final result.
          </h2>
          <p className="mt-5 text-base text-ink-700">
            American board-certified surgeons, advanced FUE &amp; DHI technology, and a concierge
            experience, with travel, accommodation, and aftercare coordinated so you can focus on your
            result.
          </p>
          <a href="#consult" className={buttonVariants({ variant: "dark", size: "lg", className: "mt-8" })}>
            Book a Free Consultation
          </a>
        </Reveal>

        {/* Feature image + thumbnails (right) */}
        <Reveal delay={0.1} className="flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-lg bg-sand-100 shadow-sm">
            <div className="relative aspect-[4/3]">
              <Image
                src="/media/feature/main.jpg"
                alt="Trichogenics board-certified surgeons performing a hair restoration"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <span className="absolute start-5 top-5 rounded-pill bg-white/90 px-3 py-1 text-xs font-semibold text-brand-800 shadow-sm ring-1 ring-brand-900/5 backdrop-blur">
              ABHRS Diplomates
            </span>
            <span className="absolute end-5 top-16 rounded-pill bg-white/90 px-3 py-1 text-xs font-semibold text-brand-800 shadow-sm ring-1 ring-brand-900/5 backdrop-blur">
              FUE &amp; DHI
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {thumbs.map((t) => (
              <div key={t.src} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sand-100 shadow-sm">
                <Image src={t.src} alt={t.alt} fill sizes="(max-width: 1024px) 30vw, 18vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
