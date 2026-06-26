import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/content/schema";

/**
 * "Proud members of:" — professional credential badges (ABHRS, ISHRS, World FUE
 * Institute) migrated from the live trichogenics.com. Unlike the muted press
 * strip these render in full colour at a uniform height: they are marks of
 * surgical authority, not logos to tuck away. Heading is an <h2> to preserve the
 * live site's heading hierarchy.
 */
export function MemberLogos({
  logos,
  label,
}: {
  logos: NonNullable<HomeContent["memberLogos"]>;
  label: string;
}) {
  return (
    <section className="border-t border-sand-200 bg-sand-50 pt-12 pb-2 sm:pt-14 sm:pb-3">
      <Container>
        <Reveal className="flex flex-col items-center gap-9">
          <h2 className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-ink-700/60">
            {label}
          </h2>
          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-9 sm:gap-x-20">
            {logos.map((logo) => (
              <li key={logo.name} className="flex items-center">
                <Image
                  src={logo.src!}
                  alt={logo.name}
                  width={logo.width ?? 200}
                  height={logo.height ?? 100}
                  className="h-[4.5rem] w-auto object-contain opacity-90 transition duration-300 hover:opacity-100 sm:h-20"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
