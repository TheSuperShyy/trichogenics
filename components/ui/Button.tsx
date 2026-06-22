import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "secondary" | "tertiary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-all " +
  "duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50";

const variants: Record<Variant, string> = {
  // The only high-saturation element on the page — the primary action.
  primary:
    "rounded-pill bg-accent-500 text-white shadow-cta hover:-translate-y-0.5 " +
    "hover:scale-[1.02] hover:bg-accent-600 active:scale-[0.98]",
  // Solid navy pill (seed-style dark CTA) for hero/header.
  dark:
    "rounded-pill bg-brand-800 text-white hover:-translate-y-0.5 " +
    "hover:scale-[1.02] hover:bg-brand-700 active:scale-[0.98]",
  secondary:
    "rounded-pill border-[1.5px] border-brand-800 text-brand-800 " +
    "hover:bg-brand-800 hover:text-white",
  tertiary:
    "text-accent-700 underline decoration-from-font underline-offset-4 " +
    "hover:text-accent-600",
  ghost:
    "rounded-pill bg-sand-100 text-brand-800 hover:bg-sand-200",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

/** Class string for the button styles — use on a `Link` for navigation CTAs. */
export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  const v = variant === "tertiary" ? variants.tertiary : cn(variants[variant], sizes[size]);
  return cn(base, v, className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

/** Native `<button>` (form submits, JS actions). For links use `buttonVariants`. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonVariants({ variant, size, className })} {...props} />
  );
}
