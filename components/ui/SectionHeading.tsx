import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/** Eyebrow + heading + optional intro, revealed on scroll. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "start",
  tone = "dark",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "start" | "center";
  tone?: "dark" | "light";
  id?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-start",
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className={cn("text-h2", tone === "light" ? "text-white" : "text-brand-800")}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            "max-w-2xl text-base",
            tone === "light" ? "text-sky-100/85" : "text-ink-700",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
