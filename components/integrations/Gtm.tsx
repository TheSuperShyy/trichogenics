import { GoogleTagManager } from "@next/third-parties/google";
import { SITE } from "@/lib/site";

/** Google Tag Manager (GTM-PP645VH). Injected once in the root layout. */
export function Gtm() {
  return <GoogleTagManager gtmId={SITE.integrations.gtmId} />;
}
