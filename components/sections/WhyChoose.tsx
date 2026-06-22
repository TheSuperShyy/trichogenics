import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/schema";

export function WhyChoose({
  data,
  eyebrow,
}: {
  data: NonNullable<HomeContent["whyChoose"]>;
  eyebrow: string;
}) {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={data.heading} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 0.05}
              className="rounded-lg border border-sand-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 h-1 w-10 rounded-pill bg-accent-500" />
              <h3 className="text-h4 font-semibold text-brand-800">{f.title}</h3>
              <p className="mt-2 text-body text-ink-700">{f.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
