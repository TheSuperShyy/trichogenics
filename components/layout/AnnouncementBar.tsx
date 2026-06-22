import { useTranslations } from "next-intl";

/** Top promo bar — full-width light tint, centered message + underlined link. */
export function AnnouncementBar() {
  const t = useTranslations("announce");
  return (
    <div className="w-full bg-sky-100 text-brand-800">
      <div className="flex min-h-[44px] items-center justify-center gap-1.5 px-4 py-2 text-center text-sm">
        <span>{t("text")}</span>
        <a
          href={t("href")}
          className="font-semibold underline underline-offset-4 hover:text-accent-700"
        >
          {t("linkLabel")}
        </a>
      </div>
    </div>
  );
}
