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
      className="hero-section"
      style={{
        minHeight: "100vh",
        padding: "100px 48px 80px",
        position: "relative",
        background: "#F5EFE6",
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
          {/* Tag */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 14px",
              background: "#E5DAC4",
              borderRadius: "100px",
              fontSize: "12px",
              fontWeight: 500,
              color: "#1F2937",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#B45309",
                flexShrink: 0,
              }}
            />
            {tag}
          </motion.div>

          {/* H1 */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="hero-h1"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: "clamp(26px, 6vw, 80px)",
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              color: "#0A1628",
              marginBottom: 0,
            }}
          >
            {h1Line1}{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "#B45309" }}>
              {h1Emphasis1}
            </em>{" "}
            {h1Line2}{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "#B45309" }}>
              {h1Emphasis2}
            </em>
            {h1End}
          </motion.h1>

          {/* Signature monospace */}
          <div
            style={{
              marginTop: "32px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                height: "2px",
                width: "48px",
                background: "rgba(180,83,9,0.7)",
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "rgba(6,15,28,0.8)",
                margin: 0,
              }}
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
              borderTop: "1px solid rgba(10,22,40,0.08)",
              maxWidth: "700px",
            }}
          >
            {[
              { num: "— 01", label: kpi1Label, value: kpi1Value },
              { num: "— 02", label: kpi2Label, value: kpi2Value },
              { num: "— 03", label: kpi3Label, value: kpi3Value },
            ].map(({ num, label, value }) => (
              <div key={num}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "#B45309",
                    marginBottom: "8px",
                    fontWeight: 500,
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#475569",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    color: "#0A1628",
                    fontWeight: 500,
                  }}
                >
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
            <button
              onClick={() => scrollTo("contact")}
              style={{
                background: "#0A1628",
                color: "#F5EFE6",
                padding: "18px 28px",
                border: "none",
                borderRadius: "100px",
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "14px",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#B45309";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0A1628";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {ctaPrimary}
              <span
                style={{
                  width: "24px",
                  height: "24px",
                  background: "#F5EFE6",
                  color: "#0A1628",
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

            <button
              onClick={() => scrollTo("realisations")}
              style={{
                background: "none",
                border: "none",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                color: "#1F2937",
                cursor: "pointer",
                padding: "18px 0",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#B45309")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#1F2937")}
            >
              <span
                style={{
                  width: "24px",
                  height: "24px",
                  border: "1px solid rgba(10,22,40,0.18)",
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

        {/* Right — Portrait modulaire */}
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
            {/* Main tile — spans 2 rows */}
            <div
              style={{
                gridRow: "1 / 3",
                position: "relative",
                overflow: "hidden",
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

            {/* Top-right — quote */}
            <div
              style={{
                background: "#E5DAC4",
                padding: "14px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "#B45309",
                  fontWeight: 500,
                }}
              >
                Bénin · Paris
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "16px",
                  color: "#0A1628",
                  lineHeight: 1.2,
                  fontStyle: "italic",
                }}
              >
                {portraitQuote}
              </div>
            </div>

            {/* Bottom-right — location */}
            <div
              style={{
                background: "#B45309",
                color: "#F5EFE6",
                padding: "14px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 500,
                  opacity: 0.85,
                }}
              >
                {portraitLocation.split(" · ")[0]}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
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
          .hero-section { padding: 88px 28px 60px !important; }
        }
        @media (max-width: 480px) {
          .hero-section { padding: 72px 20px 48px !important; }
          .hero-kpis { gap: 20px !important; }
        }
      `}</style>
    </section>
  );
}
