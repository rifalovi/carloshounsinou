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
      style={{ padding: "140px 48px", background: "#F5EFE6" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
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
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: "clamp(40px, 5.5vw, 76px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#0A1628",
            }}
          >
            {h2Part1}{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "#B45309" }}>
              {h2Emphasis}
            </em>
            {h2End}
          </h2>
        </div>
        <p style={{ fontSize: "16px", color: "#475569", lineHeight: 1.75 }}>{intro}</p>
      </motion.div>

      {/* Mosaic: 1 feature (spans 2 rows) + 4 small tiles */}
      <div
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          style={{
            gridRow: "1 / 3",
            background: "#0A1628",
            border: "1px solid #0A1628",
            color: "#F5EFE6",
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#C2701F", fontWeight: 500, marginBottom: "12px" }}>
              {feature.label}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "44px",
                fontWeight: 400,
                color: "#F5EFE6",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              {feature.title}
            </h3>
            <p style={{ fontSize: "16px", color: "rgba(245,239,230,0.75)", lineHeight: 1.65, maxWidth: "380px", marginBottom: "24px" }}>
              {feature.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "32px" }}>
              {feature.tags.map((tag) => (
                <span key={tag} style={{ fontFamily: "var(--font-mono)", fontSize: "10px", padding: "4px 10px", border: "1px solid rgba(245,239,230,0.25)", borderRadius: "100px", color: "#F5EFE6", fontWeight: 500 }}>
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
              border: "1px solid rgba(10,22,40,0.08)",
              background: "#F5EFE6",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.4s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#E5DAC4";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#F5EFE6";
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#B45309", fontWeight: 500, marginBottom: "12px" }}>
                {tile.label}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "22px",
                  fontWeight: 400,
                  color: "#0A1628",
                  lineHeight: 1.2,
                  letterSpacing: "-0.015em",
                  marginBottom: "12px",
                }}
              >
                {tile.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.65, marginBottom: "16px" }}>
                {tile.description}
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {tile.tags.map((tag) => (
                <span key={tag} style={{ fontFamily: "var(--font-mono)", fontSize: "10px", padding: "4px 10px", border: "1px solid rgba(10,22,40,0.18)", borderRadius: "100px", color: "#1F2937", fontWeight: 500 }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #expertise > div:last-child {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
            min-height: 0 !important;
          }
          #expertise > div:last-child > div:first-child {
            grid-row: auto !important;
            padding: 36px !important;
          }
          #expertise > div:last-child > div:first-child h3 {
            font-size: 32px !important;
          }
          #expertise > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          #expertise { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
