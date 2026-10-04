"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui-custom/SectionLabel";

type Tile = { label: string; title: string; description: string; tags: string[] };
type FeatureTile = Tile & { cta: string };

type Props = {
  eyebrow: string;
  h2Part1: string;
  h2Emphasis: string;
  h2End: string;
  intro: string;
  feature: FeatureTile;
  tiles: Tile[];
};

export default function Expertise({ eyebrow, h2Part1, h2Emphasis, h2End, intro, feature, tiles }: Props) {
  return (
    <section
      id="expertise"
      style={{ padding: "140px 48px", background: "var(--sp-blanc)" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="expertise-header"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          marginBottom: "80px",
          alignItems: "end",
        }}
      >
        <div>
          <SectionLabel>{eyebrow}</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--sp-font-sans)",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--sp-bleu-nuit)",
            }}
          >
            {h2Part1}{" "}
            <em style={{ fontStyle: "normal", color: "var(--sp-bleu-pilotage)" }}>
              {h2Emphasis}
            </em>
            {h2End}
          </h2>
        </div>
        <p style={{ fontSize: "16px", color: "var(--sp-texte-3)", lineHeight: 1.75 }}>{intro}</p>
      </motion.div>

      {/* Mosaic: 1 feature (spans 2 rows) + 4 small tiles */}
      <div
        className="expertise-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "16px",
          minHeight: "720px",
        }}
      >
        {/* Feature tile */}
        <motion.div
          className="expertise-feature"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          style={{
            gridRow: "1 / 3",
            background: "var(--sp-grad-section)",
            borderRadius: "var(--sp-radius-card)",
            color: "var(--sp-blanc)",
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div>
            <div style={{ fontFamily: "var(--sp-font-mono)", fontSize: "11px", color: "var(--sp-or-jalon)", fontWeight: 700, marginBottom: "12px" }}>
              {feature.label}
            </div>
            <h3
              style={{
                fontFamily: "var(--sp-font-sans)",
                fontSize: "clamp(26px, 3vw, 36px)",
                fontWeight: 800,
                color: "var(--sp-blanc)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              {feature.title}
            </h3>
            <p style={{ fontSize: "16px", color: "color-mix(in srgb, var(--sp-sur-sombre) 75%, transparent)", lineHeight: 1.65, maxWidth: "380px", marginBottom: "24px" }}>
              {feature.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "32px" }}>
              {feature.tags.map((tag) => (
                <span key={tag} style={{ fontFamily: "var(--sp-font-mono)", fontSize: "10px", padding: "4px 10px", border: "1px solid color-mix(in srgb, var(--sp-sur-sombre) 25%, transparent)", borderRadius: "var(--sp-radius-pill)", color: "var(--sp-blanc)", fontWeight: 500 }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 4 small tiles */}
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (i + 1) * 0.1 }}
            style={{
              padding: "32px",
              border: "1px solid var(--sp-ligne)",
              background: "var(--sp-blanc)",
              borderRadius: "var(--sp-radius-card)",
              boxShadow: "var(--sp-shadow-card)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.4s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement; el.style.boxShadow = "var(--sp-shadow-card-hover)"; el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement; el.style.boxShadow = "var(--sp-shadow-card)"; el.style.transform = "translateY(0)";
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--sp-font-mono)", fontSize: "11px", color: "var(--sp-or-jalon)", fontWeight: 700, marginBottom: "12px" }}>
                {tile.label}
              </div>
              <h3
                style={{
                  fontFamily: "var(--sp-font-sans)",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "var(--sp-bleu-nuit)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.015em",
                  marginBottom: "12px",
                }}
              >
                {tile.title}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--sp-texte-3)", lineHeight: 1.65, marginBottom: "16px" }}>
                {tile.description}
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {tile.tags.map((tag) => (
                <span key={tag} style={{ fontFamily: "var(--sp-font-mono)", fontSize: "10px", padding: "4px 10px", border: "1px solid var(--sp-ligne)", borderRadius: "var(--sp-radius-pill)", color: "var(--sp-texte-2)", fontWeight: 500 }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .expertise-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
            min-height: 0 !important;
          }
          .expertise-feature {
            grid-row: auto !important;
            padding: 36px !important;
          }
          .expertise-feature h3 {
            font-size: 32px !important;
          }
          .expertise-header {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          #expertise { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
