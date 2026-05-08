"use client";

import { motion } from "framer-motion";

type Props = { quote: string; author: string; role: string };

export default function Testimonial({ quote, author, role }: Props) {
  return (
    <section id="testimonial" style={{ padding: "100px 48px", background: "#EDE5D6" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        style={{
          background: "#F5EFE6",
          border: "1px solid rgba(10,22,40,0.08)",
          padding: "64px",
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "48px",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Opening mark */}
        <div
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "140px",
            color: "#B45309",
            lineHeight: 0.6,
            fontStyle: "italic",
            userSelect: "none",
          }}
        >
          "
        </div>

        <div>
          <blockquote
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(20px, 2.5vw, 28px)",
              fontWeight: 400,
              lineHeight: 1.45,
              color: "#0A1628",
              marginBottom: "28px",
              letterSpacing: "-0.01em",
            }}
          >
            {quote}
          </blockquote>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "#475569",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <span
              aria-hidden="true"
              style={{ width: "30px", height: "1px", background: "#B45309", flexShrink: 0 }}
            />
            <span>{author} · {role}</span>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 1024px) {
          section > div[style*="grid-template-columns: auto 1fr"] {
            padding: 36px !important;
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          section > div[style*="font-size: 140px"] {
            font-size: 80px !important;
          }
        }
        @media (max-width: 768px) {
          section[style*="100px 48px"] { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
