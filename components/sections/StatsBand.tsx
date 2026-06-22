import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import type { HomeContent } from "@/content/schema";

export function StatsBand({ data }: { data: NonNullable<HomeContent["stats"]> }) {
  return (
    <Section tone="navy" className="py-16">
      <Container>
        <dl className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06} className="flex flex-col gap-1">
              <dt className="order-2 text-sm uppercase tracking-wide text-sky-200/70">
                {stat.label}
              </dt>
              <dd className="order-1 font-display text-5xl font-semibold text-accent-300">
                <CountUp value={stat.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
