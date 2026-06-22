"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string };

function useNav(): NavItem[] {
  const locale = useLocale();
  const t = useTranslations("nav");
  if (locale === "he") {
    return [
      { href: "#what", label: "מהי השתלה" },
      { href: "#cost", label: "עלויות" },
      { href: "#choose", label: "בחירת קליניקה" },
      { href: "#faq", label: t("faq") },
    ];
  }
  return [
    { href: "#process", label: t("process") },
    { href: "#doctors", label: t("doctors") },
    { href: "#results", label: t("results") },
    { href: "#locations", label: t("locations") },
    { href: "#faq", label: t("faq") },
  ];
}

export function Header() {
  const t = useTranslations("nav");
  const nav = useNav();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Frosted "pill" surface — only while scrolled. At the top (max hero) the nav
  // is plain/transparent, like seed; padding stays constant to avoid a jump.
  const surface = scrolled
    ? "bg-white/70 shadow-sm ring-1 ring-brand-900/5 backdrop-blur-md"
    : "";

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto flex h-20 max-w-[1800px] items-center justify-between gap-4 px-gutter">
        {/* Left group: logo + nav (becomes a pill on scroll) */}
        <div className={cn("flex items-center gap-7 rounded-pill px-5 py-2.5 transition-all duration-300", surface)}>
          <Logo />
          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.95rem] font-medium text-brand-800 transition-colors hover:text-accent-700"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right group: language + CTA (+ mobile menu) */}
        <div className={cn("flex items-center gap-2 rounded-pill p-1.5 transition-all duration-300 sm:gap-3 sm:ps-4", surface)}>
          <span className="hidden sm:inline-flex">
            <LanguageSwitcher />
          </span>
          <a href="#consult" className={buttonVariants({ variant: "dark", size: "sm" })}>
            {t("bookConsult")}
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-pill text-brand-800 lg:hidden"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="mx-4 mt-2 rounded-lg border border-sand-200 bg-white p-4 shadow-md lg:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-brand-800 hover:bg-sand-100"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-sand-200 pt-4">
              <LanguageSwitcher />
              <a
                href="#consult"
                onClick={() => setOpen(false)}
                className={buttonVariants({ variant: "dark", size: "sm" })}
              >
                {t("bookConsult")}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}
