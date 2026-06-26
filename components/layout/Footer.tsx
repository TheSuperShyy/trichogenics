import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { SITE } from "@/lib/site";

const exploreLinks = [
  { href: "#process", key: "process" as const },
  { href: "#results", key: "results" as const },
  { href: "#doctors", key: "doctors" as const },
  { href: "#faq", key: "faq" as const },
  { href: "#consult", key: "bookConsult" as const },
];

export function Footer() {
  const t = useTranslations("footer");
  const tnav = useTranslations("nav");

  return (
    <footer className="bg-brand-900 text-sky-100">
      <Container className="grid gap-10 py-section md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm text-sky-200/80">{t("tagline")}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-sky-200/70">
            <span>ABHRS</span>
            <span aria-hidden>·</span>
            <span>ISHRS</span>
            <span aria-hidden>·</span>
            <span>World FUE Institute</span>
          </div>
        </div>

        <nav aria-label="Footer" className="text-sm">
          <h2 className="mb-4 font-semibold text-white">{t("explore")}</h2>
          <ul className="space-y-2.5">
            {exploreLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sky-200/80 transition-colors hover:text-white">
                  {tnav(l.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="mb-4 font-semibold text-white">{t("ourClinics")}</h2>
          <ul className="space-y-4 text-sky-200/80">
            <li>
              <span className="block font-medium text-white">{SITE.locations.greece.countryName}</span>
              {SITE.locations.greece.street}, {SITE.locations.greece.locality}
            </li>
            <li>
              <span className="block font-medium text-white">{SITE.locations.israel.countryName}</span>
              {SITE.locations.israel.street}, {SITE.locations.israel.locality}
            </li>
            <li>
              <a href={`tel:${SITE.phone}`} className="transition-colors hover:text-white">
                <bdi>{SITE.phoneDisplay}</bdi>
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-white">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <h2 className="mb-4 font-semibold text-white">{t("findUs")}</h2>
          <ul className="space-y-2.5 text-sky-200/80">
            <li><a href={SITE.social.instagram} className="hover:text-white" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href={SITE.social.facebook} className="hover:text-white" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href={SITE.social.youtube} className="hover:text-white" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a href={SITE.social.tiktok} className="hover:text-white" target="_blank" rel="noopener noreferrer">TikTok</a></li>
            <li><a href={SITE.social.trustpilot} className="hover:text-white" target="_blank" rel="noopener noreferrer">{t("reviews")}</a></li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-sky-200/70 sm:flex-row">
          <p>© 2026 {t("rights")}</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">{t("terms")}</a>
            <a href="#" className="hover:text-white">{t("privacy")}</a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
