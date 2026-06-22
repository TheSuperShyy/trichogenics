import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small uppercase label above a heading. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-eyebrow font-semibold uppercase text-accent-700",
        className,
      )}
    >
      {children}
    </p>
  );
}
