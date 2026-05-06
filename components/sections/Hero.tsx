"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  eyebrowLeft: string;
  eyebrowCenter: string;
  eyebrowRight: string;
  tag: string;
  h1Line1: string;
  h1Emphasis1: string;
  h1Line2: string;
  h1Emphasis2: string;
  h1End: string;
  portraitQuote: string;
  portraitLocation: string;
  kpi1Label: string;
  kpi1Value: string;
  kpi2Label: string;
  kpi2Value: string;
  kpi3Label: string;
  kpi3Value: string;
  ctaPrimary: string;
  ctaSecondary: string;
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
  eyebrowLeft,
  eyebrowCenter,
  eyebrowRight,
  tag,
  h1Line1,
  h1Emphasis1,
  h1Line2,
  h1Emphasis2,
  h1End,
  portraitQuote,
  portraitLocation,
  kpi1Label,
  kpi1Value,
  kpi2Label,
  kpi2Value,
  kpi3Label,
  kpi3Value,
  ctaPrimary,
  ctaSecondary,
}: Props) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "130px 48px 80px",
        position: "relative",
        background: "#F5EFE6",
      }}
    >
      {/* Top meta bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "#475569",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "60px",
          paddingBottom: "20px",
          borderBottom: "1px solid rgba(10,22,40,0.08)",
        }}
      >
        <span>
          <span style={{ color: "#B45309", fontWeight: 500 }}>FR · 33</span>
          {" · "}
          {eyebrowLeft.replace("FR · 33 ", "")}
        </span>
        <span>{eyebrowCenter}</span>
        <span>{eyebrowRight}</span>
      </div>

      {/* Main grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "7fr 5fr",
          gap: "60px",
          alignItems: "end",
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
              marginBottom: "36px",
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
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: "clamp(56px, 8vw, 112px)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "#0A1628",
              marginBottom: 0,
            }}
          >
            {h1Line1}
            <br />
            <span>des </span>
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "#B45309",
              }}
            >
              {h1Emphasis1}
            </em>
            <br />
            {h1Line2}<em
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "#B45309",
              }}
            >{h1Emphasis2}</em>
            {h1End}
          </motion.h1>

          {/* KPIs */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
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
        @media (max-width: 1024px) {
          section > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          section > div:last-child > div:first-child > h1 {
            font-size: 56px !important;
          }
        }
      `}</style>
    </section>
  );
}
