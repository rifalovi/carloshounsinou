import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { sourceSerif, inter, mono } from "@/app/fonts";
import "@/app/globals.css";
import ChatBot from "@/components/chat/ChatBot";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = (messages as { metadata: { title: string; description: string; keywords: string } }).metadata;
  return {
    metadataBase: new URL("https://carloshounsinou.com"),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      url: "https://carloshounsinou.com",
      siteName: "Carlos HOUNSINOU",
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Carlos HOUNSINOU — Stratège qui sait bâtir",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.jpg"],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${sourceSerif.variable} ${inter.variable} ${mono.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <ChatBot />
      </body>
    </html>
  );
}
