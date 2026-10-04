"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  tag: string;
  h1Line1: string;
  h1Emphasis1: string;
  h1Line2: string;
  h1Emphasis2: string;
  h1End: string;
  signature: string;
  kpi1Label: string;
  kpi1Value: string;
  kpi2Label: string;
  kpi2Value: string;
  kpi3Label: string;
  kpi3Value: string;
  ctaPrimary: string;
  ctaSecondary: string;
  portraitQuote: string;
  portraitLocation: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export default function Hero({
  tag,
  h1Line1,
  h1Emphasis1,
  h1Line2,
  h1Emphasis2,
  h1End,
  signature,
  kpi1Label,
  kpi1Value,
  kpi2Label,
  kpi2Value,
  kpi3Label,
  kpi3Value,
  ctaPrimary,
  ctaSecondary,
  portraitQuote,
  portraitLocation,
}: Props) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        minHeight: "100vh",
        padding: "120px 48px 80px",
        position: "relative",
        background: "var(--sp-grad-section)",
        color: "var(--sp-blanc)",
      }}
    >
      {/* Main grid */}
      <div
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "7fr 5fr",
          gap: "60px",
          alignItems: "flex-start",
        }}
      >
        {/* Left */}
        <div>
          {/* Sur-titre */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="ds-eyebrow on-dark"
            style={{ marginBottom: "16px" }}
          >
            <span className="dot" />
            {tag}
          </motion.div>

          {/* H1 */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="hero-h1 ds-h1"
            style={{ color: "var(--sp-blanc)", marginBottom: 0 }}
          >
            {h1Line1}{" "}
            <span className="hl">{h1Emphasis1}</span>{" "}
            {h1Line2}{" "}
            <span className="hl">{h1Emphasis2}</span>
            {h1End}
          </motion.h1>

          {/* Signature */}
          <div
            style={{
              marginTop: "28px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                height: "3px",
                width: "26px",
                borderRadius: "3px",
                background: "var(--sp-or-jalon)",
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            <p
              className="ds-mono"
              style={{ fontSize: "12px", color: "var(--sp-sur-sombre-2)", margin: 0 }}
            >
              {signature}
            </p>
          </div>

          {/* KPIs */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="hero-kpis"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
              marginTop: "56px",
              paddingTop: "32px",
              borderTop: "1px solid color-mix(in srgb, var(--sp-sur-sombre) 18%, transparent)",
              maxWidth: "700px",
            }}
          >
            {[
              { num: "01", label: kpi1Label, value: kpi1Value },
              { num: "02", label: kpi2Label, value: kpi2Value },
              { num: "03", label: kpi3Label, value: kpi3Value },
            ].map(({ num, label, value }) => (
              <div key={num}>
                <div
                  className="ds-mono"
                  style={{ color: "var(--sp-or-jalon)", marginBottom: "8px", fontWeight: 500 }}
                >
                  {num}
                </div>
                <div
                  className="ds-mono"
                  style={{ color: "var(--sp-sur-sombre-2)", marginBottom: "6px" }}
                >
                  {label}
                </div>
                <div style={{ fontSize: "15px", color: "var(--sp-blanc)", fontWeight: 600 }}>
                  {value}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "48px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button onClick={() => scrollTo("contact")} className="ds-btn ds-btn-light">
              {ctaPrimary}
              <span
                aria-hidden="true"
                style={{
                  width: "24px",
                  height: "24px",
                  background: "var(--sp-bleu-pilotage)",
                  color: "var(--sp-blanc)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  flexShrink: 0,
                }}
              >
                →
              </span>
            </button>

            <button onClick={() => scrollTo("realisations")} className="ds-btn ds-btn-ghost">
              <span
                aria-hidden="true"
                style={{
                  width: "24px",
                  height: "24px",
                  border: "1px solid color-mix(in srgb, var(--sp-blanc) 50%, transparent)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                }}
              >
                ↓
              </span>
              {ctaSecondary}
            </button>
          </motion.div>
        </div>

        {/* Portrait modulaire */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{ position: "relative" }}
        >
          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: "8px",
              aspectRatio: "4/5",
              width: "100%",
            }}
          >
            {/* Tuile principale : 2 lignes */}
            <div
              style={{
                gridRow: "1 / 3",
                position: "relative",
                overflow: "hidden",
                borderRadius: "var(--sp-radius-card)",
              }}
            >
              <Image
                src="/images/carlos-hero-1200.webp"
                alt="Carlos Hounsinou"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
                placeholder="blur"
                blurDataURL="/images/carlos-hero-placeholder.webp"
              />
            </div>

            {/* Haut droite : citation */}
            <div
              style={{
                background: "var(--sp-ciel)",
                color: "var(--sp-bleu-nuit)",
                padding: "14px",
                borderRadius: "var(--sp-radius-card)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div className="ds-mono" style={{ color: "var(--sp-bleu-pilotage)", fontWeight: 500 }}>
                Bénin · Paris
              </div>
              <div style={{ fontSize: "15px", lineHeight: 1.25, fontWeight: 600 }}>
                {portraitQuote}
              </div>
            </div>

            {/* Bas droite : localisation */}
            <div
              style={{
                background: "var(--sp-or-jalon)",
                color: "var(--sp-bleu-nuit)",
                padding: "14px",
                borderRadius: "var(--sp-radius-card)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div className="ds-mono" style={{ fontWeight: 500, opacity: 0.8 }}>
                {portraitLocation.split(" · ")[0]}
              </div>
              <div style={{ fontSize: "16px", fontWeight: 800 }}>
                {portraitLocation.split(" · ").slice(1).join(" · ")}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero-section { overflow-x: hidden; }
        .hero-h1 { text-wrap: balance; }

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 768px) {
          .hero-section { padding: 104px 28px 60px !important; }
        }
        @media (max-width: 480px) {
          .hero-section { padding: 96px 20px 48px !important; }
          .hero-kpis { gap: 20px !important; }
        }
      `}</style>
    </section>
  );
}
