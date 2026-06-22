import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/content/schema";

/** Alternating editorial image/text rows (replaces the cramped legacy carousel). */
export function Technology({
  data,
  eyebrow,
}: {
  data: NonNullable<HomeContent["technology"]>;
  eyebrow: string;
}) {
  return (
    <Section id="technology" tone="muted">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={data.heading} />
        <div className="mt-12 flex flex-col gap-12">
          {data.items.map((item, i) => (
            <Reveal
              key={item.title}
              className={cn(
                "grid items-center gap-8 md:grid-cols-2",
                i % 2 === 1 && "md:[&>figure]:order-2",
              )}
            >
              <figure className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sand-200">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : null}
              </figure>
              <div>
                <h3 className="text-h3 font-semibold text-brand-800">{item.title}</h3>
                <p className="mt-3 text-lead text-ink-700">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
