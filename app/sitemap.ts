import { MetadataRoute } from "next";

const BASE_URL = "https://carloshounsinou.com";
const LOCALES = ["fr", "en"];
const SLUGS = [
  "institutional-pilot",
  "incubation-platform",
  "valorisation-platform",
  "eu-platforms",
  "indicators-platform",
  "cevelab",
  "cap-citoyen",
  "operations-platform",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Home pages per locale
  const homePages: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1.0,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE_URL}/${l}`])
      ),
    },
  }));

  // Réalisation detail pages
  const detailPages: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    SLUGS.map((slug) => ({
      url: `${BASE_URL}/${locale}/realisations/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${BASE_URL}/${l}/realisations/${slug}`])
        ),
      },
    }))
  );

  return [...homePages, ...detailPages];
}
