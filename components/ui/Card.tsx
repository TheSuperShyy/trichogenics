import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A soft surface with hairline border and ambient shadow. */
export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-sand-200 bg-white p-6 shadow-sm sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
