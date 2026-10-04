"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui-custom/SectionLabel";
import AnimatedCounter from "@/components/ui-custom/AnimatedCounter";

type StatItem = { label: string; value: number; description: string; bar: number };

type Props = {
  eyebrow: string;
  h2Part1: string;
  h2Emphasis: string;
  h2End: string;
  intro: string;
  items: StatItem[];
  footerLeft: string;
  footerRight: string;
};

function StatBar({ target }: { target: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setWidth(target); return; }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setTimeout(() => setWidth(target), 100);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div
      ref={ref}
      style={{ height: "3px", background: "color-mix(in srgb, var(--sp-sur-sombre) 12%, transparent)", marginBottom: "20px", position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0, left: 0,
          height: "100%",
          background: "var(--sp-or-jalon)",
          width: `${width}%`,
          transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </div>
  );
}

export default function Stats({ eyebrow, h2Part1, h2Emphasis, h2End, intro, items, footerLeft, footerRight }: Props) {
  return (
    <section
      id="stats"
      style={{
        padding: "140px 48px",
        background: "var(--sp-bleu-nuit)",
        color: "var(--sp-blanc)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, right: 0,
          width: "40%", height: "100%",
          background: "radial-gradient(circle at 70% 30%, color-mix(in srgb, var(--sp-or-jalon) 8%, transparent) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        style={{
          marginBottom: "80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "end",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <SectionLabel light>{eyebrow}</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--sp-font-sans)",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--sp-blanc)",
            }}
          >
            {h2Part1}{" "}
            <em style={{ fontStyle: "normal", color: "var(--sp-bleu-clair)" }}>
              {h2Emphasis}
            </em>
            {h2End}
          </h2>
        </div>
        <p style={{ fontSize: "16px", color: "color-mix(in srgb, var(--sp-sur-sombre) 70%, transparent)", lineHeight: 1.7, maxWidth: "480px" }}>
          {intro}
        </p>
      </motion.div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "color-mix(in srgb, var(--sp-sur-sombre) 8%, transparent)",
          borderTop: "1px solid color-mix(in srgb, var(--sp-sur-sombre) 12%, transparent)",
          borderBottom: "1px solid color-mix(in srgb, var(--sp-sur-sombre) 12%, transparent)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {items.map((item, i) => (
          <div
            key={item.label}
            style={{
              background: "var(--sp-bleu-nuit)",
              padding: "56px 32px",
              transition: "background 0.4s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--sp-bleu-nuit) 80%, var(--sp-bleu-pilotage))")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--sp-bleu-nuit)")}
          >
            <div
              style={{
                fontFamily: "var(--sp-font-mono)",
                fontSize: "11px",
                color: "var(--sp-or-jalon)",
                fontWeight: 700,
                marginBottom: "24px",
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontFamily: "var(--sp-font-sans)",
                fontSize: "clamp(60px, 7vw, 100px)",
                fontWeight: 800,
                color: "var(--sp-blanc)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              <AnimatedCounter target={item.value} />
            </div>
            <StatBar target={item.bar} />
            <div
              style={{
                fontSize: "13px",
                lineHeight: 1.5,
                color: "color-mix(in srgb, var(--sp-sur-sombre) 75%, transparent)",
                fontWeight: 400,
              }}
            >
              {item.description}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "48px",
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--sp-font-mono)",
          fontSize: "11px",
          color: "color-mix(in srgb, var(--sp-sur-sombre) 50%, transparent)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span>{footerLeft}</span>
        <span>{footerRight}</span>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #stats > div:nth-child(3) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          #stats > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 600px) {
          #stats > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
          #stats > div:last-child {
            flex-direction: column;
            gap: 8px;
          }
          #stats { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
