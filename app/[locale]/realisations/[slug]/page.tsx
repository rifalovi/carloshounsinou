import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import DetailCTA from "@/components/ui-custom/DetailCTA";

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
        <div style={{ background: "#060F1C", padding: "120px 48px 80px", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "radial-gradient(ellipse at top right, rgba(180,83,9,0.07) 0%, transparent 60%)", pointerEvents: "none" }}/>
          <div style={{ maxWidth: "720px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <a
              href={`/${locale}/#flagship`}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgba(245,239,230,0.5)", textDecoration: "none", marginBottom: "48px", letterSpacing: "0.04em", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C2701F")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,239,230,0.5)")}
            >
              {ui.back}
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#C2701F", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {detail.category}
              </span>
              <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(245,239,230,0.3)" }}/>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "rgba(245,239,230,0.4)", letterSpacing: "0.04em" }}>
                {detail.status}
              </span>
            </div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#F5EFE6", marginBottom: "16px" }}>
              {detail.title}
            </h1>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "rgba(245,239,230,0.5)", letterSpacing: "0.03em" }}>
              {detail.subtitle}
            </p>
          </div>
        </div>

        {/* Accent line */}
        <div style={{ height: "3px", background: "linear-gradient(90deg, #B45309, #C2701F, transparent)" }}/>

        {/* Content — cream */}
        <div style={{ background: "#F5EFE6", padding: "72px 48px 100px" }}>
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
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#B45309", fontWeight: 500, flexShrink: 0, paddingTop: "3px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontSize: "15px", color: "#1F2937", lineHeight: 1.65 }}>{item}</span>
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
                  <span key={tag} style={{ fontFamily: "var(--font-mono)", fontSize: "11px", padding: "5px 12px", border: "1px solid rgba(10,22,40,0.18)", borderRadius: "100px", color: "#1F2937", fontWeight: 500 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </Section>

            {/* CTA */}
            <div style={{ paddingTop: "56px", borderTop: "1px solid rgba(10,22,40,0.08)" }}>
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
        suiviprojet={footer("suiviprojet")}
        capcit={footer("capcit")}
      />

      <style>{`
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
  color: "#1F2937",
  lineHeight: 1.75,
};

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "52px" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#B45309", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid rgba(10,22,40,0.08)" }}>
        {label}
      </div>
      {children}
    </div>
  );
}
