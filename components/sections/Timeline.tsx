"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type TimelineItem = {
  period: string;
  title: string;
  org: string;
  description: string;
  tags: string[];
  accent: string;
};

type Props = { items: TimelineItem[] };

const ACCENT: Record<string, string> = {
  primary: "#B45309",
  secondary: "#A88B4A",
  tertiary: "#475569",
};

function Card({
  item,
  isLeft,
  index,
}: {
  item: TimelineItem;
  isLeft: boolean;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const color = ACCENT[item.accent] ?? "#C2701F";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" as const }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "24px",
        background: hovered ? "#EDE5D6" : "transparent",
        border: `1px solid ${hovered ? color + "55" : "rgba(10,22,40,0.08)"}`,
        boxShadow: hovered ? "0 4px 24px rgba(0,0,0,0.07)" : "none",
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        maxWidth: "420px",
        width: "100%",
      }}
    >
      {/* Corner ornament — top-left for odd (left) items, top-right for even (right) items */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: isLeft ? 0 : undefined,
          right: isLeft ? undefined : 0,
          width: "14px",
          height: "14px",
          borderTop: `2px solid ${color}`,
          borderLeft: isLeft ? `2px solid ${color}` : undefined,
          borderRight: isLeft ? undefined : `2px solid ${color}`,
        }}
      />

      {/* Period */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          fontWeight: 600,
          color,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "10px",
        }}
      >
        {item.period}
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "20px",
          fontWeight: 500,
          color: "#0A1628",
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
          marginBottom: "8px",
        }}
      >
        {item.title}
      </div>

      {/* Org */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "#475569",
          lineHeight: 1.5,
          marginBottom: "14px",
        }}
      >
        — {item.org}
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          color: "#1F2937",
          lineHeight: 1.7,
          margin: "0 0 18px",
        }}
      >
        {item.description}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        {item.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 600,
              padding: "3px 10px",
              border: "1px solid rgba(10,22,40,0.18)",
              borderRadius: "100px",
              color: "#1F2937",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Timeline({ items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} style={{ position: "relative", maxWidth: "960px", margin: "0 auto" }}>
      {/* Static axis (faint background) */}
      <div
        aria-hidden="true"
        className="tl-axis"
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "1px",
          background: "rgba(10,22,40,0.06)",
          transform: "translateX(-50%)",
        }}
      />

      {/* Animated progress line */}
      <motion.div
        aria-hidden="true"
        className="tl-axis"
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "1px",
          transform: "translateX(-50%)",
          scaleY: prefersReducedMotion ? 1 : lineScaleY,
          transformOrigin: "top",
          background: "linear-gradient(to bottom, #A88B4A 0%, rgba(180,83,9,0.5) 60%, rgba(71,86,105,0.3) 100%)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {items.map((item, i) => {
          const isLeft = i % 2 === 0;
          const accentColor = ACCENT[item.accent] ?? "#C2701F";

          return (
            <div
              key={i}
              className="tl-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 32px 1fr",
                alignItems: "center",
              }}
            >
              {/* Left slot — desktop only */}
              <div
                className="tl-slot-left"
                style={{
                  paddingRight: "28px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {isLeft && <Card item={item} isLeft={true} index={i} />}
              </div>

              {/* Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.15 + 0.2,
                  ease: "backOut" as const,
                }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "#F5EFE6",
                    border: `2.5px solid ${accentColor}`,
                    flexShrink: 0,
                    boxShadow: `0 0 0 4px ${accentColor}18`,
                  }}
                />
              </motion.div>

              {/* Right slot */}
              <div className="tl-slot-right" style={{ paddingLeft: "28px" }}>
                {/* Desktop: right-side items */}
                {!isLeft && <Card item={item} isLeft={false} index={i} />}
                {/* Mobile only: left-side items re-rendered on right */}
                {isLeft && (
                  <div className="tl-mobile-card">
                    <Card item={item} isLeft={false} index={i} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .tl-mobile-card { display: none; }

        @media (max-width: 1024px) {
          .tl-axis { left: 20px !important; transform: none !important; }
          .tl-row { grid-template-columns: 40px 1fr !important; }
          .tl-slot-left { display: none !important; }
          .tl-mobile-card { display: block !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tl-axis { opacity: 1 !important; }
        }
      `}</style>
    </div>
  );
}
