"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/content/schema";

/** Sticky table of contents with scroll-spy for the HE long-form page. */
export function TableOfContents({ items }: { items: NonNullable<HomeContent["toc"]> }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-24">
      <ul className="space-y-1 border-s-2 border-sand-200 ps-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block py-1 text-sm transition-colors",
                active === item.id
                  ? "font-semibold text-accent-700"
                  : "text-ink-700/70 hover:text-brand-800",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
