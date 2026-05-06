"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui-custom/SectionLabel";
import Timeline from "./Timeline";

type TimelineItem = { period: string; title: string; org: string; description: string; tags: string[]; accent: string };

type Props = {
  eyebrow: string;
  h2Part1: string;
  h2Emphasis: string;
  h2End: string;
  p1: string;
  p2Part1: string;
  p2Org: string;
  p2Part2: string;
  timeline: TimelineItem[];
};

export default function About({
  eyebrow,
  h2Part1,
  h2Emphasis,
  h2End,
  p1,
  p2Part1,
  p2Org,
  p2Part2,
  timeline,
}: Props) {
  return (
    <section
      id="parcours"
      style={{
        padding: "140px 48px",
        background: "#F5EFE6",
        position: "relative",
      }}
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
          marginBottom: "100px",
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

        <div>
          {/* Drop-cap paragraph */}
          <p
            style={{
              fontSize: "17px",
              color: "#1F2937",
              lineHeight: 1.75,
              marginBottom: "22px",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                float: "left",
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(60px, 7vw, 80px)",
                lineHeight: 0.8,
                fontStyle: "italic",
                color: "#A88B4A",
                marginRight: "8px",
                marginTop: "6px",
              }}
            >
              {p1[0]}
            </span>
            {p1.slice(1)}
          </p>
          <p style={{ fontSize: "17px", color: "#1F2937", lineHeight: 1.75 }}>
            {p2Part1}
            <strong
              style={{
                color: "#0A1628",
                fontWeight: 600,
                background: "linear-gradient(transparent 60%, #FEF3E7 60%)",
                padding: "0 2px",
              }}
            >
              {p2Org}
            </strong>
            {p2Part2}
          </p>
        </div>
      </motion.div>

      {/* Timeline */}
      <Timeline items={timeline} />

      <style>{`
        @media (max-width: 1024px) {
          #parcours > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 768px) {
          #parcours {
            padding: 80px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
