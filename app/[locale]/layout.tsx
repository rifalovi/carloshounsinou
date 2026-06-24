import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { mono } from "@/app/fonts";
import "@/app/globals.css";
import ChatBot from "@/components/chat/ChatBot";
import { Analytics } from "@vercel/analytics/next";
import SectionTracker from "@/components/analytics/SectionTracker";

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
          alt: "Carlos HOUNSINOU — Chef d'orchestre de programmes",
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

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Carlos Hounsinou",
    "url": "https://carloshounsinou.com",
    "jobTitle": locale === "fr"
      ? "Chargé d'Ingénierie de Projet · Expert Suivi-Évaluation"
      : "Project Engineering Officer · M&E Expert",
    "worksFor": {
      "@type": "Organization",
      "name": "Organisation Internationale de la Francophonie",
      "url": "https://francophonie.org",
    },
    "sameAs": ["https://www.linkedin.com/in/carloshounsinou"],
    "description": locale === "fr"
      ? "Carlos Hounsinou — expert chevronné du Suivi-Évaluation, de la planification stratégique et de la gestion de programmes de développement. 13 ans d'expérience pour l'OIF, l'UE, l'AFD, la GIZ, la Fondation Bill & Melinda Gates."
      : "Carlos Hounsinou — seasoned expert in Monitoring & Evaluation, strategic planning and development programme management. 13 years for OIF, EU, AFD, GIZ, Bill & Melinda Gates Foundation.",
    "knowsAbout": [
      "Suivi-Évaluation", "Monitoring and Evaluation", "Gestion de programmes",
      "Programme management", "Architecture systèmes augmentés IA",
      "Planification stratégique", "Strategic planning",
    ],
  };

  return (
    <html
      lang={locale}
      className={`${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <ChatBot />
        <SectionTracker />
        <Analytics />
      </body>
    </html>
  );
}
