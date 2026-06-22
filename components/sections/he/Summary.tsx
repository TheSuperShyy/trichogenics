import { Reveal } from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import type { HomeContent } from "@/content/schema";

export function Summary({
  data,
  cta,
}: {
  data: NonNullable<HomeContent["summary"]>;
  cta: { label: string; href: string };
}) {
  return (
    <section id="summary" className="scroll-mt-28">
      <Reveal className="rounded-xl bg-sand-100 p-6 sm:p-10">
        <h2 className="text-h2 text-brand-800">{data.heading}</h2>
        {data.paragraphs.map((p, i) => (
          <p key={i} className="mt-4 text-body leading-8 text-ink-700">
            {p}
          </p>
        ))}
        <a href={cta.href} className={buttonVariants({ size: "lg", className: "mt-6" })}>
          {cta.label}
        </a>
      </Reveal>
    </section>
  );
}
