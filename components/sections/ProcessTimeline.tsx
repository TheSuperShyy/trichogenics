import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/schema";

/** Transparent step-by-step journey — reduces medical-travel uncertainty. */
export function ProcessTimeline({
  steps,
  eyebrow,
  heading,
}: {
  steps: NonNullable<HomeContent["process"]>;
  eyebrow: string;
  heading: string;
}) {
  return (
    <Section id="process" tone="muted">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={heading} />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.step}>
              <Reveal delay={i * 0.05} className="flex h-full gap-4 rounded-lg bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-accent-500 font-display text-lg font-semibold text-white">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-h4 font-semibold text-brand-800">{step.title}</h3>
                  <p className="mt-1.5 text-body text-ink-700">{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
