import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about the project's custom font-size utilities (defined in
// tailwind.config.ts) so they're treated as font-size, NOT mistaken for text-color.
// Without this, cn("text-h2", "text-brand-800") collapses to "text-brand-800" — both
// look like `text-*` to the default config, so it drops one and the heading silently
// loses its size.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display", "h1", "h2", "h3", "h4", "lead", "body", "eyebrow"] },
      ],
    },
  },
});

/** Merge class names, de-duplicating conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
