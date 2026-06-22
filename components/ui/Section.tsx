import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "muted" | "navy";

const tones: Record<Tone, string> = {
  default: "bg-sand-50 text-ink-700",
  muted: "bg-sand-100 text-ink-700",
  navy: "bg-brand-800 text-sky-100",
};

/** A full-width page section with vertical rhythm and an optional tone. */
export function Section({
  id,
  tone = "default",
  className,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn("py-section scroll-mt-24", tones[tone], className)}
    >
      {children}
    </section>
  );
}
