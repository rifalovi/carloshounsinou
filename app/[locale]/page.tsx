import { getTranslations } from "next-intl/server";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustMarquee from "@/components/sections/TrustMarquee";
import About from "@/components/sections/About";
import Flagship from "@/components/sections/Flagship";
import Stats from "@/components/sections/Stats";
import Expertise from "@/components/sections/Expertise";
import SecondaryRealizations from "@/components/sections/SecondaryRealizations";
import Contact from "@/components/sections/Contact";

type Props = { params: Promise<{ locale: string }> };
type Card = { id: string; eyebrow: string; title: string; description: string; tags: string[] };

export default async function Home({ params }: Props) {
  const { locale } = await params;

  const nav = await getTranslations({ locale, namespace: "nav" });
  const hero = await getTranslations({ locale, namespace: "hero" });
  const marquee = await getTranslations({ locale, namespace: "marquee" });
  const about = await getTranslations({ locale, namespace: "about" });
  const flagship = await getTranslations({ locale, namespace: "flagship" });
  const stats = await getTranslations({ locale, namespace: "stats" });
  const expertise = await getTranslations({ locale, namespace: "expertise" });
  const secondaryRealizations = await getTranslations({ locale, namespace: "secondaryRealizations" });
  const contact = await getTranslations({ locale, namespace: "contact" });
  const footer = await getTranslations({ locale, namespace: "footer" });

  const marqueeItems = marquee.raw("items") as string[];
  const aboutTimeline = about.raw("timeline") as { period: string; title: string; org: string; description: string; tags: string[]; accent: string }[];
  const statsItems = stats.raw("items") as { label: string; value: number; description: string; bar: number }[];
  const expertiseTiles = expertise.raw("tiles") as { label: string; title: string; description: string; tags: string[] }[];
  const featureRaw = expertise.raw("feature") as { label: string; title: string; description: string; tags: string[]; cta: string };
  const contactForm = contact.raw("form") as {
    step1Label: string; step1Question: string; step1Placeholder: string;
    step2Label: string; step2Question: string; step2Placeholder: string;
    step3Label: string; step3Question: string; step3Chips: string[];
    step4Label: string; step4Question: string; step4Placeholder: string;
    submit: string;
    success: string;
    error: string;
  };

  return (
    <>
      {/* Skip link */}
      <a href="#main-content" className="skip-link">
        {locale === "fr" ? "Aller au contenu principal" : "Skip to main content"}
      </a>

      <Navigation
        locale={locale}
        navAbout={nav("about")}
        navFlagship={nav("flagship")}
        navExpertise={nav("expertise")}
        navContact={nav("contact")}
        navCta={nav("cta")}
        navStatus={nav("status")}
      />

      <main id="main-content">
        <Hero
          eyebrowLeft={hero("eyebrowLeft")}
          eyebrowCenter={hero("eyebrowCenter")}
          eyebrowRight={hero("eyebrowRight")}
          tag={hero("tag")}
          h1Line1={hero("h1Line1")}
          h1Emphasis1={hero("h1Emphasis1")}
          h1Line2={hero("h1Line2")}
          h1Emphasis2={hero("h1Emphasis2")}
          h1End={hero("h1End")}
          portraitQuote={hero("portraitQuote")}
          portraitLocation={hero("portraitLocation")}
          kpi1Label={hero("kpi1Label")}
          kpi1Value={hero("kpi1Value")}
          kpi2Label={hero("kpi2Label")}
          kpi2Value={hero("kpi2Value")}
          kpi3Label={hero("kpi3Label")}
          kpi3Value={hero("kpi3Value")}
          ctaPrimary={hero("ctaPrimary")}
          ctaSecondary={hero("ctaSecondary")}
        />

        <TrustMarquee items={marqueeItems} />

        <About
          eyebrow={about("eyebrow")}
          h2Part1={about("h2Part1")}
          h2Emphasis={about("h2Emphasis")}
          h2End={about("h2End")}
          p1={about("p1")}
          p2Part1={about("p2Part1")}
          p2Org={about("p2Org")}
          p2Part2={about("p2Part2")}
          timeline={aboutTimeline}
        />

        <Flagship
          eyebrow={flagship("eyebrow")}
          h2Part1={flagship("h2Part1")}
          h2Emphasis={flagship("h2Emphasis")}
          h2End={flagship("h2End")}
          intro={flagship("intro")}
          cards={flagship.raw("cards") as Parameters<typeof Flagship>[0]["cards"]}
        />

        <Stats
          eyebrow={stats("eyebrow")}
          h2Part1={stats("h2Part1")}
          h2Emphasis={stats("h2Emphasis")}
          h2End={stats("h2End")}
          intro={stats("intro")}
          items={statsItems}
          footerLeft={stats("footerLeft")}
          footerRight={stats("footerRight")}
        />

        <Expertise
          eyebrow={expertise("eyebrow")}
          h2Part1={expertise("h2Part1")}
          h2Emphasis={expertise("h2Emphasis")}
          h2End={expertise("h2End")}
          intro={expertise("intro")}
          feature={featureRaw}
          tiles={expertiseTiles}
        />

        <SecondaryRealizations
          eyebrow={secondaryRealizations("eyebrow")}
          h2Part1={secondaryRealizations("h2Part1")}
          h2Emphasis={secondaryRealizations("h2Emphasis")}
          h2End={secondaryRealizations("h2End")}
          cards={secondaryRealizations.raw("cards") as Card[]}
        />

        <Contact
          eyebrow={contact("eyebrow")}
          h2Part1={contact("h2Part1")}
          h2Emphasis={contact("h2Emphasis")}
          h2End={contact("h2End")}
          intro={contact("intro")}
          email={contact("email")}
          phone={contact("phone")}
          linkedin={contact("linkedin")}
          form={contactForm}
        />
      </main>

      <Footer
        locale={locale}
        brand={footer("brand")}
        brandName={footer("brandName")}
        copyright={footer("copyright")}
        linkedin={footer("linkedin")}
        suiviprojet={footer("suiviprojet")}
        capcit={footer("capcit")}
      />
    </>
  );
}
