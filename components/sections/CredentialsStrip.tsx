import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/schema";

/** Early medical-trust strip: ABHRS / ISHRS / World FUE / doctors-not-technicians. */
export function CredentialsStrip({
  items,
}: {
  items: NonNullable<HomeContent["credentials"]>;
}) {
  return (
    <section className="bg-white py-12">
      <Container>
        <ul className="grid gap-px overflow-hidden rounded-lg border border-sand-200 bg-sand-200 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <li key={item.title} className="bg-white p-6">
              <Reveal delay={i * 0.06} className="flex flex-col gap-1">
                <span className="font-display text-h4 font-semibold text-brand-800">
                  {item.title}
                </span>
                {item.subtitle ? (
                  <span className="text-sm text-ink-700/80">{item.subtitle}</span>
                ) : null}
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
