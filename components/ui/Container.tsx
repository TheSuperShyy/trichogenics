import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Width = "content" | "text" | "wide" | "prose-he";

const widths: Record<Width, string> = {
  // Wide cap so default sections sit close to the page edges (small side margin).
  content: "max-w-[1800px]",
  text: "max-w-text",
  wide: "max-w-wide",
  "prose-he": "max-w-prose-he",
};

/** Centered, gutter-padded content wrapper. */
export function Container({
  as: Tag = "div",
  width = "content",
  className,
  children,
}: {
  as?: ElementType;
  width?: Width;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn("mx-auto w-full px-gutter", widths[width], className)}>
      {children}
    </Tag>
  );
}
