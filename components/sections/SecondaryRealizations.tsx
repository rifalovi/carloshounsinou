"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui-custom/SectionLabel";

type Card = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
};

type Props = {
  eyebrow: string;
  h2Part1: string;
  h2Emphasis: string;
  h2End: string;
  cards: Card[];
};

export default function SecondaryRealizations({ eyebrow, h2Part1, h2Emphasis, h2End, cards }: Props) {
  return (
    <section
      id="secondary-realizations"
      style={{ padding: "120px 48px", background: "var(--sp-papier)" }}
    >
      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "64px" }}
        >
          <SectionLabel>{eyebrow}</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--sp-font-sans)",
              fontWeight: 800,
              fontSize: "clamp(26px, 3.5vw, 40px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--sp-bleu-nuit)",
              marginTop: "16px",
            }}
          >
            {h2Part1}{" "}
            <em style={{ fontStyle: "normal", color: "var(--sp-bleu-pilotage)" }}>
              {h2Emphasis}
            </em>{" "}
            {h2End}
          </h2>
        </motion.div>

        <div className="sr-grid">
          {cards.map((card, i) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="sr-card"
            >
              <div
                style={{
                  fontFamily: "var(--sp-font-mono)",
                  fontSize: "10px",
                  color: "var(--sp-or-jalon)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                {card.eyebrow}
              </div>

              <h3
                style={{
                  fontFamily: "var(--sp-font-sans)",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  letterSpacing: "-0.015em",
                  color: "var(--sp-bleu-nuit)",
                  marginBottom: "12px",
                }}
              >
                {card.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--sp-font-sans)",
                  fontSize: "14px",
                  lineHeight: 1.65,
                  color: "var(--sp-texte-3)",
                  marginBottom: "20px",
                  flexGrow: 1,
                }}
              >
                {card.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "var(--sp-font-mono)",
                      fontSize: "10px",
                      color: "var(--sp-texte-3)",
                      background: "var(--sp-papier)",
                      padding: "3px 8px",
                      borderRadius: "var(--sp-radius-pill)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .sr-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .sr-card {
          background: var(--sp-blanc);
          padding: 32px;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--sp-ligne);
          border-radius: var(--sp-radius-card);
          box-shadow: var(--sp-shadow-card);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .sr-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--sp-shadow-card-hover);
        }
        @media (max-width: 1024px) {
          .sr-grid { grid-template-columns: repeat(2, 1fr); }
          #secondary-realizations { padding: 80px 24px !important; }
        }
        @media (max-width: 640px) {
          .sr-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
