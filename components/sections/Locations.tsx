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
    <Section id="locations">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={data.heading} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {data.items.map((loc, i) => (
            <Reveal
              key={loc.name}
              delay={i * 0.08}
              className="overflow-hidden rounded-lg border border-sand-200 bg-white shadow-sm"
            >
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-sky-100 to-sky-200 text-brand-700/50">
                <PinIcon className="h-10 w-10" />
              </div>
              <div className="p-6">
                <p className="text-eyebrow font-semibold uppercase text-accent-700">
                  {loc.countryName}
                </p>
                <h3 className="mt-1 text-h4 font-semibold text-brand-800">{loc.name}</h3>
                <p className="mt-1 text-body text-ink-700">{loc.address}</p>
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
