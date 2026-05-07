"use client";

import { motion } from "framer-motion";

type AICard = {
  label: string;
  title: string;
  description: string;
  tags: string[];
};

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: AICard[];
};

export default function AICapabilities({ eyebrow, title, subtitle, cards }: Props) {
  return (
    <section
      id="ai-capabilities"
      style={{ padding: "120px 48px", background: "#060F1C", position: "relative", overflow: "hidden" }}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "100%",
          background: "radial-gradient(ellipse at top center, rgba(180,83,9,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1300px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "64px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                width: "32px",
                height: "1px",
                background: "#B45309",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "#B45309",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 500,
              }}
            >
              {eyebrow}
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: "clamp(32px, 4vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#F5EFE6",
              marginBottom: "20px",
            }}
          >
            {title}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "16px",
              color: "rgba(245,239,230,0.65)",
              lineHeight: 1.7,
              maxWidth: "640px",
            }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* 2×2 grid */}
        <div className="ai-grid">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="ai-card"
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "#B45309",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 500,
                  borderBottom: "1px solid rgba(180,83,9,0.3)",
                  paddingBottom: "10px",
                  marginBottom: "18px",
                }}
              >
                {card.label}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  lineHeight: 1.25,
                  letterSpacing: "-0.015em",
                  color: "#F5EFE6",
                  marginBottom: "14px",
                }}
              >
                {card.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.95rem",
                  lineHeight: 1.65,
                  color: "rgba(245,239,230,0.65)",
                  flexGrow: 1,
                  marginBottom: "20px",
                }}
              >
                {card.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      color: "rgba(245,239,230,0.55)",
                      background: "rgba(245,239,230,0.06)",
                      border: "1px solid rgba(245,239,230,0.12)",
                      padding: "3px 9px",
                      borderRadius: "100px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .ai-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .ai-card {
          background: rgba(245,239,230,0.04);
          border: 1px solid rgba(245,239,230,0.1);
          padding: 32px;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .ai-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(180,83,9,0.12);
          border-color: rgba(180,83,9,0.35);
        }
        @media (max-width: 768px) {
          .ai-grid { grid-template-columns: 1fr; }
          #ai-capabilities { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
