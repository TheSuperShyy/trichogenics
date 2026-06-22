import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getHomeContent } from "@/content";
import { HomeEn } from "@/components/pages/HomeEn";
import { HomeHe } from "@/components/pages/HomeHe";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { buildGraph } from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = getHomeContent(locale);
  return buildMetadata({ locale, meta: content.meta });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getHomeContent(locale);

  const graph = buildGraph({
    locale,
    canonicalPath: content.meta.canonicalPath,
    name: content.meta.title,
    description: content.meta.description,
    faq: content.faq?.items,
  });

  return (
    <>
      <JsonLd schema={graph} />
      {locale === "he" ? <HomeHe content={content} /> : <HomeEn content={content} />}
    </>
  );
}
