import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getHomeContent } from "@/content";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/site";

/**
 * Meet-the-team page (legacy URL: /your-hair-transplant-team/). Minimal scaffold
 * — reuses the homepage doctor content but shows the full bios + credentials.
 * NOTE: full hreflang/sitemap parity for sub-pages is a later migration phase.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical =
    locale === "he" ? "/he/your-hair-transplant-team/" : "/your-hair-transplant-team/";
  const title = "Meet Your Hair Transplant Team | Trichogenics";
  const description =
    "Meet the ABHRS board-certified surgeons behind Trichogenics — Dr. Asi Peretz and Dr. Eric Peretz, operating in Greece and Israel.";
  return {
    metadataBase: new URL(SITE.baseUrl),
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
  };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getHomeContent(locale);
  const doctors = content.doctors;

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Your team"
          title="Meet your hair transplant team"
          intro={doctors?.intro}
        />
        {doctors ? (
          <div className="mt-12 grid gap-10 sm:gap-12 lg:grid-cols-2">
            {doctors.people.map((doc) => (
              <article
                key={doc.name}
                className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6"
              >
                {doc.photo ? (
                  <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-2xl bg-sand-200">
                    <Image src={doc.photo} alt={doc.name} fill sizes="192px" className="object-cover" />
                  </div>
                ) : null}
                <div className="sm:pt-1">
                  <p className="text-sm font-medium text-accent-700">{doc.title}</p>
                  <h2 className="mt-1 text-h3 text-brand-800">{doc.name}</h2>
                  {doc.credentials.length || doc.memberships?.length ? (
                    <p className="mt-1 text-xs text-ink-700/70">
                      {[...doc.credentials, ...(doc.memberships ?? [])].join(" · ")}
                    </p>
                  ) : null}
                  <p className="mt-3 text-body text-ink-700">{doc.bio}</p>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
