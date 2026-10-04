import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import DetailCTA from "@/components/ui-custom/DetailCTA";
import { ProductBadge } from "@/components/ui-custom/ProductBadge";

type DetailItem = {
  id: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  category: string;
  status: string;
  context: string;
  challenge: string;
  approach: string[];
  results: string;
  stackDetail: string;
};

type UI = {
  back: string;
  cta: string;
  labelContext: string;
  labelChallenge: string;
  labelApproach: string;
  labelResults: string;
  labelStack: string;
};

const VALID_SLUGS = [
  "institutional-pilot",
  "incubation-platform",
  "valorisation-platform",
  "eu-platforms",
  "indicators-platform",
  "cevelab",
  "cap-citoyen",
  "operations-platform",
] as const;

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return ["fr", "en"].flatMap((locale) =>
    VALID_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!VALID_SLUGS.includes(slug as (typeof VALID_SLUGS)[number])) return {};
  const t = await getTranslations({ locale, namespace: "realisations" });
  const items = t.raw("items") as DetailItem[];
  const detail = items.find((d) => d.id === slug);
  if (!detail) return {};
  return {
    title: detail.metaTitle,
    description: detail.metaDescription,
  };
}

export default async function RealisationDetail({ params }: Props) {
  const { locale, slug } = await params;

  if (!VALID_SLUGS.includes(slug as (typeof VALID_SLUGS)[number])) notFound();

  const t = await getTranslations({ locale, namespace: "realisations" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const footer = await getTranslations({ locale, namespace: "footer" });
  const productBadge = await getTranslations({ locale, namespace: "productBadge" });

  const ui = t.raw("ui") as UI;
  const items = t.raw("items") as DetailItem[];
  const detail = items.find((d) => d.id === slug);
  if (!detail) notFound();

  const stackTags = detail.stackDetail.split(" · ");

  return (
    <>
      <Navigation
        locale={locale}
        navAbout={nav("about")}
        navFlagship={nav("flagship")}
        navExpertise={nav("expertise")}
        navContact={nav("contact")}
        navCta={nav("cta")}
        navStatus={nav("status")}
      />

      <main>
        {/* Hero — dark */}
        <div style={{ background: "var(--sp-grad-section)", padding: "120px 48px 80px", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "radial-gradient(ellipse at top right, color-mix(in srgb, var(--sp-or-jalon) 7%, transparent) 0%, transparent 60%)", pointerEvents: "none" }}/>
          <div style={{ maxWidth: "720px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <a
              href={`/${locale}/#flagship`}
              className="detail-back-link"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--sp-font-mono)", fontSize: "11px", color: "color-mix(in srgb, var(--sp-sur-sombre) 50%, transparent)", textDecoration: "none", marginBottom: "48px", letterSpacing: "0.04em" }}
            >
              {ui.back}
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--sp-font-mono)", fontSize: "10px", color: "var(--sp-or-jalon)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {detail.category}
              </span>
              <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "color-mix(in srgb, var(--sp-sur-sombre) 30%, transparent)" }}/>
              <span style={{ fontFamily: "var(--sp-font-mono)", fontSize: "10px", color: "color-mix(in srgb, var(--sp-sur-sombre) 40%, transparent)", letterSpacing: "0.04em" }}>
                {detail.status}
              </span>
            </div>
            {slug === "cap-citoyen" && (
              <div style={{ marginBottom: "20px" }}>
                <ProductBadge label={productBadge("saas")} />
              </div>
            )}
            <h1 style={{ fontFamily: "var(--sp-font-sans)", fontWeight: 800, fontSize: "clamp(28px, 5.4vw, 50px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--sp-blanc)", marginBottom: "16px" }}>
              {detail.title}
            </h1>
            <p style={{ fontFamily: "var(--sp-font-mono)", fontSize: "12px", color: "color-mix(in srgb, var(--sp-sur-sombre) 50%, transparent)", letterSpacing: "0.03em" }}>
              {detail.subtitle}
            </p>
          </div>
        </div>

        {/* Accent line */}
        <div style={{ height: "3px", background: "linear-gradient(90deg, var(--sp-or-jalon), var(--sp-or-jalon), transparent)" }}/>

        {/* Content — cream */}
        <div style={{ background: "var(--sp-blanc)", padding: "72px 48px 100px" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>

            {/* Context */}
            <Section label={ui.labelContext}>
              <p style={bodyStyle}>{detail.context}</p>
            </Section>

            {/* Challenge */}
            <Section label={ui.labelChallenge}>
              <p style={bodyStyle}>{detail.challenge}</p>
            </Section>

            {/* Approach */}
            <Section label={ui.labelApproach}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {detail.approach.map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "var(--sp-font-mono)", fontSize: "10px", color: "var(--sp-bleu-pilotage)", fontWeight: 700, flexShrink: 0, paddingTop: "3px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontSize: "15px", color: "var(--sp-texte-2)", lineHeight: 1.65 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Results */}
            <Section label={ui.labelResults}>
              <p style={bodyStyle}>{detail.results}</p>
            </Section>

            {/* Stack */}
            <Section label={ui.labelStack}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {stackTags.map((tag) => (
                  <span key={tag} style={{ fontFamily: "var(--sp-font-mono)", fontSize: "11px", padding: "5px 12px", border: "1px solid var(--sp-ligne)", borderRadius: "var(--sp-radius-pill)", color: "var(--sp-texte-2)", fontWeight: 500 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </Section>

            {/* CTA */}
            <div style={{ paddingTop: "56px", borderTop: "1px solid var(--sp-ligne)" }}>
              <DetailCTA label={ui.cta} projectTitle={detail.title} />
            </div>
          </div>
        </div>
      </main>

      <Footer
        locale={locale}
        brand={footer("brand")}
        brandName={footer("brandName")}
        copyright={footer("copyright")}
        linkedin={footer("linkedin")}
        capcit={footer("capcit")}
      />

      <style>{`
        .detail-back-link { transition: color 0.2s; }
        .detail-back-link:hover { color: var(--sp-bleu-clair) !important; }
        @media (max-width: 768px) {
          main > div:first-child { padding: 96px 24px 56px !important; }
          main > div:last-child { padding: 48px 24px 72px !important; }
        }
      `}</style>
    </>
  );
}

const bodyStyle: React.CSSProperties = {
  fontSize: "15px",
  color: "var(--sp-texte-2)",
  lineHeight: 1.75,
  textAlign: "justify",
  hyphens: "auto",
};

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "52px" }}>
      <h2 className="ds-section-title" style={{ marginBottom: "20px" }}>
        {label}
      </h2>
      {children}
    </div>
  );
}
