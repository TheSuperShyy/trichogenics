import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter, Heebo } from "next/font/google";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { Gtm } from "@/components/integrations/Gtm";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  // Enable static rendering for this locale.
  setRequestLocale(locale);

  const dir = locale === "he" ? "rtl" : "ltr";
  const messages = await getMessages();
  const t = await getTranslations("common");

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${heebo.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Gtm />
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-brand-800 focus:shadow-md"
            >
              {t("skipToContent")}
            </a>
            <AnnouncementBar />
            <Header />
            {children}
            <Footer />
            <WhatsAppFab />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
