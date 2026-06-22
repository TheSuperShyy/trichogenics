import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import type { HomeContent } from "@/content/schema";

export function Faq({
  data,
  eyebrow,
}: {
  data: NonNullable<HomeContent["faq"]>;
  eyebrow?: string;
}) {
  return (
    <Section id="faq">
      <Container width="text">
        <SectionHeading eyebrow={eyebrow} title={data.heading} />
        <div className="mt-8">
          <Accordion items={data.items} />
        </div>
      </Container>
    </Section>
  );
}
