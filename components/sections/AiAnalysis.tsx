import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HairGenWidget } from "@/components/integrations/HairGenWidget";

/** Free AI hair-analysis section (HairGen widget) — the low-friction lead path. */
export function AiAnalysis({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <Section id="ai-analysis" tone="muted">
      <Container width="text">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} align="center" />
        <div className="mt-10 rounded-xl border border-sand-200 bg-white p-4 shadow-sm sm:p-6">
          <HairGenWidget />
        </div>
      </Container>
    </Section>
  );
}
