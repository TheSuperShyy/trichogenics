import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/schema";

/** "As featured in" — credibility row. Text wordmarks until logo assets land. */
export function PressLogos({
  logos,
  label,
}: {
  logos: NonNullable<HomeContent["pressLogos"]>;
  label: string;
}) {
  return (
    <section className="border-y border-sand-200 bg-sand-50 py-10">
      <Container>
        <Reveal className="flex flex-col items-center gap-6">
          <p className="text-eyebrow font-semibold uppercase text-ink-700/60">{label}</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {logos.map((logo) => (
              <li
                key={logo.name}
                className="font-display text-lg font-semibold text-brand-800/45 grayscale transition-all hover:text-brand-800/70"
              >
                {logo.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
