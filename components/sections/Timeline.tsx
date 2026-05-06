"use client";

import { motion } from "framer-motion";

type TimelineItem = { period: string; role: string; org: string };
type Props = { items: TimelineItem[] };

export default function Timeline({ items }: Props) {
  return (
    <div
      style={{
        position: "relative",
        paddingTop: "60px",
        paddingBottom: "30px",
      }}
    >
      {/* Horizontal line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "80px",
          left: 0,
          right: 0,
          height: "1px",
          background: "rgba(15,20,25,0.18)",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
          gap: "24px",
        }}
      >
        {items.map((item, i) => {
          const [startYear] = item.period.split(" — ");
          const sub = item.period.includes("—") ? "— " + item.period.split("— ")[1] : "";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ position: "relative", paddingTop: "100px" }}
            >
              {/* Dot on the line */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "73px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "14px",
                  height: "14px",
                  background: "#FAF8F1",
                  border: "2px solid #047857",
                  borderRadius: "50%",
                  transition: "all 0.3s",
                }}
              />

              {/* Year */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontFamily: "var(--font-serif)",
                  fontSize: "28px",
                  color: "#1A2332",
                  fontWeight: 400,
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                {startYear}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "#525B66",
                    fontWeight: 500,
                    display: "block",
                    textAlign: "center",
                    marginTop: "4px",
                  }}
                >
                  {sub}
                </span>
              </div>

              {/* Content */}
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#1A2332",
                  marginBottom: "6px",
                  lineHeight: 1.35,
                }}
              >
                {item.role}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#525B66",
                  lineHeight: 1.5,
                }}
              >
                {item.org}
              </div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .timeline-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
