"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type NavChild = { href: string; label: string; thumb?: string };
type NavLink = { label: string; href: string };
type NavItem = { label: string; href?: string; tab?: string; children?: NavChild[]; footer?: NavLink };

/**
 * EN primary nav — grouped dropdowns mirroring the legacy site, seed.com-style
 * (thumbnail rows + a "view all" footer). Child/footer hrefs are the legacy SEO
 * URLs (trailing slash); kept here as data (not literal JSX hrefs) so they
 * navigate as full-page loads without tripping no-html-link-for-pages. Thumbs
 * reuse existing clinic/procedure/team media until per-item art is provided.
 */
const EN_NAV: NavItem[] = [
  {
    label: "Hair Restoration Clinic Overseas",
    tab: "Overseas",
    children: [
      { href: "/hair-transplant-israel/", label: "Hair Transplant in Israel", thumb: "/media/feature/main.jpg" },
      { href: "/post/best-country-for-hair-transplant/", label: "Best Country for Hair Transplant", thumb: "/media/journey/main.jpg" },
    ],
    footer: { label: "Why go abroad", href: "/hair-transplant-israel/" },
  },
  {
    label: "Your Journey",
    tab: "Journey",
    children: [
      { href: "/the-hair-transplant-process-guide/", label: "The Hair Transplant Process Guide", thumb: "/media/video/clip-1.jpg" },
      { href: "/post/beard-transplant-everything-you-need-to-know/", label: "Beard Transplants", thumb: "/media/video/clip-3.jpg" },
      { href: "/post/hair-transplant-scars-causes-prevention-and-treatment/", label: "Hair Transplant Scars", thumb: "/media/video/clip-4.jpg" },
      { href: "/post/eyebrow-transplant/", label: "Eyebrow Transplants", thumb: "/media/video/clip-6.jpg" },
      { href: "/post/fue-hair-transplant-everything-you-need-to-know/", label: "FUE Hair Transplant", thumb: "/media/video/clip-5.jpg" },
      { href: "/post/hair-transplant-recovery-timeline/", label: "Hair Transplant Timeline and Recovery: Comprehensive Guide", thumb: "/media/results/bf1.jpg" },
    ],
    footer: { label: "See the full journey", href: "/hair-transplant-journey/" },
  },
  {
    label: "Your Team",
    tab: "Team",
    children: [
      { href: "/your-hair-transplant-team/", label: "Meet Our Team", thumb: "/media/team/dr-asi-peretz.jpg" },
      { href: "/contact-trichogenics/", label: "Contact Trichogenics", thumb: "/media/team/dr-eric-peretz.jpg" },
      { href: "/trichogenics-hair-blog/", label: "Blog", thumb: "/media/hero/hero.jpg" },
    ],
    footer: { label: "Meet the full team", href: "/your-hair-transplant-team/" },
  },
];

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
  return EN_NAV;
}

export function Header() {
  const t = useTranslations("nav");
  const nav = useNav();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // Grouped nav (EN) renders the mobile menu as seed-style tabs; the active tab's
  // section shows below. Flat nav (HE) falls back to a simple list.
  const mobileGroups = nav.filter((i) => i.children);
  const activeGroup = mobileGroups.find((g) => g.label === activeTab) ?? mobileGroups[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open desktop dropdown on outside click / Escape.
  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [openMenu]);

  // Close the mobile menu if the viewport grows to desktop (the toggle is
  // mobile-only, so this avoids a stuck-open single-pill bar after a resize).
  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth >= 1280) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  // Frosted "pill" surface — only while scrolled. At the top (max hero) the nav
  // is plain/transparent, like seed; padding stays constant to avoid a jump.
  const surface = scrolled
    ? "bg-white/70 shadow-sm ring-1 ring-brand-900/5 backdrop-blur-md"
    : "";

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto flex h-20 max-w-[1800px] items-center px-gutter">
        {open ? (
          /* OPEN (mobile): the whole navbar is ONE pill — logo mark + section tabs + close */
          <div className="flex w-full items-center gap-1.5 rounded-pill bg-slate-400/40 px-2.5 py-2 shadow-lg ring-1 ring-white/40 backdrop-blur-2xl backdrop-saturate-150 animate-pill-unfurl">
            <Link
              href="/"
              aria-label="Trichogenics — home"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-800 text-sm font-bold text-white"
            >
              T
            </Link>
            <div
              role="tablist"
              aria-label="Menu sections"
              className="flex flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {mobileGroups.map((g) => {
                const isActive = activeGroup?.label === g.label;
                return (
                  <button
                    key={g.label}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(g.label)}
                    className={cn(
                      "shrink-0 whitespace-nowrap rounded-pill px-3 py-1.5 text-sm font-semibold transition-colors",
                      isActive ? "bg-brand-900/10 text-brand-900" : "text-brand-900/55 hover:bg-brand-900/5",
                    )}
                  >
                    {g.tab ?? g.label}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              aria-label="Close menu"
              aria-expanded={true}
              aria-controls="mobile-nav"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-brand-800 transition-colors hover:bg-brand-900/5"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
        ) : (
          /* CLOSED / desktop: logo pill + actions pill */
          <div className="flex w-full items-center justify-between gap-4">
            <div className={cn("flex items-center gap-6 rounded-pill px-5 py-2.5 transition-all duration-300", surface)}>
              <Logo />
              <nav ref={navRef} aria-label="Primary" className="hidden items-center gap-5 xl:flex">
                {nav.map((item) =>
                  item.children ? (
                    <DropdownNav
                      key={item.label}
                      item={item}
                      open={openMenu === item.label}
                      onOpen={() => setOpenMenu(item.label)}
                      onClose={() => setOpenMenu((m) => (m === item.label ? null : m))}
                    />
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      className="whitespace-nowrap text-sm font-medium text-brand-800 transition-colors hover:text-accent-700"
                    >
                      {item.label}
                    </a>
                  ),
                )}
              </nav>
            </div>
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
                aria-expanded={false}
                aria-controls="mobile-nav"
                onClick={() => setOpen(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-pill text-brand-800 xl:hidden"
              >
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu — frosted panel that unfurls from the logo (left -> right) */}
      <div
        id="mobile-nav"
        className={cn(
          "absolute inset-x-3 top-[4.75rem] overflow-hidden rounded-[1.75rem] bg-slate-400/40 shadow-[0_28px_70px_-18px_rgba(7,19,49,0.5)] ring-1 ring-white/40 backdrop-blur-2xl backdrop-saturate-150 transition-[opacity,clip-path] duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)] xl:hidden",
          open
            ? "visible opacity-100 [clip-path:inset(0_0_0_0_round_1.75rem)]"
            : "invisible opacity-0 [clip-path:inset(0_100%_0_0_round_1.75rem)]",
        )}
      >
        {/* Selected section's dropdown — the tabs live up in the navbar */}
        {mobileGroups.length ? (
          <ul className="max-h-[62vh] list-none overflow-y-auto p-2 [scrollbar-color:rgba(7,19,49,0.28)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-900/25 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5">
              {activeGroup?.children?.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-white/35 active:bg-white/45"
                  >
                    {c.thumb ? (
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white/30 ring-1 ring-white/30">
                        <Image src={c.thumb} alt="" fill sizes="48px" className="object-cover" />
                      </span>
                    ) : null}
                    <span className="text-sm font-semibold leading-snug text-brand-900">{c.label}</span>
                  </a>
                </li>
              ))}
              {activeGroup?.footer ? (
                <li>
                  <a
                    href={activeGroup.footer.href}
                    onClick={() => setOpen(false)}
                    className="mt-1 flex items-center justify-center gap-2 border-t border-white/30 px-4 pb-1 pt-3 text-sm font-semibold text-brand-900 underline decoration-from-font underline-offset-4"
                  >
                    {activeGroup.footer.label}
                    <span aria-hidden>→</span>
                  </a>
                </li>
              ) : null}
          </ul>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-3 py-3 text-sm font-semibold text-brand-900 hover:bg-white/35"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between gap-3 border-t border-white/40 p-3">
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
    </header>
  );
}

/** A single top-level dropdown group — opens on hover and click, seed-style. */
function DropdownNav({
  item,
  open,
  onOpen,
  onClose,
}: {
  item: NavItem;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelId = `nav-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(onClose, 120);
  };
  useEffect(() => cancelClose, []);
  // Any close path (Escape / outside-click / link / hover-leave) clears a pending timer.
  useEffect(() => {
    if (!open) cancelClose();
  }, [open]);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        onOpen();
      }}
      onMouseLeave={scheduleClose}
      // Collapse when keyboard focus tabs out of the whole group.
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onClose();
      }}
      // Escape closes and returns focus to the trigger (APG disclosure pattern).
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          onClose();
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          cancelClose();
          if (open) onClose();
          else onOpen();
        }}
        className={cn(
          "inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors hover:text-accent-700",
          open ? "text-accent-700" : "text-brand-800",
        )}
      >
        {item.label}
        <ChevronIcon className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>

      <div
        id={panelId}
        className={cn(
          "absolute start-0 top-full z-50 mt-3 w-[19rem] max-w-[calc(100vw-2rem)] origin-top overflow-hidden rounded-[1.75rem] bg-slate-400/40 p-2 shadow-[0_28px_70px_-18px_rgba(7,19,49,0.5)] ring-1 ring-white/40 backdrop-blur-2xl backdrop-saturate-150 transition-[opacity,transform] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-1 scale-95 opacity-0",
        )}
      >
        <ul className="max-h-[20rem] list-none overflow-y-auto overflow-x-hidden pe-0.5 [scrollbar-color:rgba(7,19,49,0.28)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-900/25 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5">
          {item.children?.map((c, i) => (
            <li
              key={c.href}
              style={{ transitionDelay: open ? `${i * 75}ms` : "0ms" }}
              className={cn(
                "transition-[opacity,transform] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
              )}
            >
              <a
                href={c.href}
                onClick={() => {
                  cancelClose();
                  onClose();
                }}
                className="group flex items-center gap-3.5 rounded-2xl p-2 transition-colors duration-200 hover:bg-white/35"
              >
                {c.thumb ? (
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white/30 ring-1 ring-white/30">
                    <Image
                      src={c.thumb}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </span>
                ) : null}
                <span className="text-[0.95rem] font-semibold leading-snug text-brand-900">{c.label}</span>
              </a>
            </li>
          ))}
        </ul>
        {item.footer ? (
          <a
            href={item.footer.href}
            onClick={() => {
              cancelClose();
              onClose();
            }}
            className="mt-1 flex items-center justify-center gap-2 border-t border-white/40 px-4 pb-1.5 pt-3 text-sm font-semibold text-brand-900 underline decoration-from-font underline-offset-4 transition-colors hover:text-accent-700"
          >
            {item.footer.label}
            <span aria-hidden>→</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
