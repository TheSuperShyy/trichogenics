import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { HubSpotForm } from "@/components/integrations/HubSpotForm";
import { SITE } from "@/lib/site";

/**
 * Final conversion section. The form is the live HubSpot embed (portal 49196064,
 * hero form) so leads flow straight into the CRM; the trust/contact column sits
 * alongside it.
 */
export function ConsultCta() {
  const t = useTranslations("consult");

  return (
    <section id="consult" className="scroll-mt-24 bg-brand-800 py-section text-white">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-eyebrow font-semibold uppercase text-accent-300">{t("eyebrow")}</p>
          <h2 className="mt-3 text-h2 text-white">{t("heading")}</h2>
          <p className="mt-4 max-w-md text-lead text-sky-100/85">{t("subhead")}</p>
          <p className="mt-6 text-sm text-sky-100/70">{t("trust")}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <a href={`tel:${SITE.phone}`} className="font-medium text-white underline underline-offset-4">
              {t("orCall")}: <bdi>{SITE.phoneDisplay}</bdi>
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-300 underline underline-offset-4"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div id="consult-form" className="rounded-xl bg-white p-6 text-ink-700 shadow-lg sm:p-8">
          <HubSpotForm formId={SITE.integrations.hubspot.heroFormId} />
          <p className="mt-4 text-center text-xs text-ink-700/60">{t("privacy")}</p>
        </div>
      </Container>
    </section>
  );
}
