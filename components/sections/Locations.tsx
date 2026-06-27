import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/schema";

export function Locations({
  data,
  eyebrow,
}: {
  data: NonNullable<HomeContent["locations"]>;
  eyebrow: string;
}) {
  return (
    <Section id="locations" className="!pt-4">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={data.heading} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {data.items.map((loc, i) => (
            <Reveal
              key={loc.name}
              delay={i * 0.08}
              className="overflow-hidden border border-sand-200 bg-white shadow-sm"
            >
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-sky-100 to-sky-200">
                {loc.video ? (
                  <>
                    <video
                      className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      poster={loc.poster}
                      aria-hidden
                    >
                      <source src={loc.video} type="video/mp4" />
                    </video>
                    {loc.poster ? (
                      <Image
                        src={loc.poster}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="hidden object-cover motion-reduce:block"
                      />
                    ) : null}
                  </>
                ) : loc.image ? (
                  <Image
                    src={loc.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-brand-700/50">
                    <PinIcon className="h-10 w-10" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <p className="text-eyebrow font-semibold uppercase text-accent-700">
                  {loc.countryName}
                </p>
                <h3 className="mt-1 text-h4 font-semibold text-brand-800">{loc.name}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
