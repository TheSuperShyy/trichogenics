"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

/**
 * Trustpilot TrustBox widget. Requires a Trustpilot business-unit id (and a
 * template id) — add them when available. Until then the site links to the
 * public Trustpilot review page (see Footer / Testimonials).
 *
 * Usage: <Trustpilot businessUnitId="..." templateId="..." locale="en-US" />
 */
export function Trustpilot({
  businessUnitId,
  templateId = "5419b6ffb0d04a076446a9af",
  locale = "en-US",
  height = "130px",
}: {
  businessUnitId: string;
  templateId?: string;
  locale?: string;
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = window as unknown as { Trustpilot?: { loadFromElement: (el: HTMLElement, b?: boolean) => void } };
    if (w.Trustpilot && ref.current) {
      w.Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);

  return (
    <>
      <Script
        src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="lazyOnload"
      />
      <div
        ref={ref}
        className="trustpilot-widget"
        data-locale={locale}
        data-template-id={templateId}
        data-businessunit-id={businessUnitId}
        data-style-height={height}
        data-style-width="100%"
      />
    </>
  );
}
