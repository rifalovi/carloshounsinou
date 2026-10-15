"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui-custom/SectionLabel";
import Timeline from "./Timeline";

type TimelineItem = { period: string; title: string; org: string; description: string; tags: string[]; accent: string };
type BriefItem = { label: string; value: string };

type Props = {
  eyebrow: string;
  h2Part1: string;
  h2Emphasis: string;
  h2End: string;
  p1: string;
  p2Part1: string;
  p2Org: string;
  p2Part2: string;
  brief: BriefItem[];
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
  brief,
  timeline,
}: Props) {
  return (
    <section
      id="parcours"
      style={{
        padding: "140px 48px",
        background: "var(--sp-blanc)",
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
          marginBottom: "120px",
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

          {/* En bref : repères clés du dossier, dans l'espace libre sous le titre */}
          <dl className="about-brief">
            {brief.map((b) => (
              <div key={b.label} className="about-brief-row">
                <dt>{b.label}</dt>
                <dd>{b.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          {/* Drop-cap paragraph */}
          <p
            className="prose-justify"
            style={{
              fontSize: "17px",
              color: "var(--sp-texte-2)",
              lineHeight: 1.75,
              marginBottom: "22px",
            }}
          >
            {p1}
          </p>
          <p className="prose-justify" style={{ fontSize: "17px", color: "var(--sp-texte-2)", lineHeight: 1.75 }}>
            {p2Part1}
            <strong
              style={{
                color: "var(--sp-bleu-nuit)",
                fontWeight: 600,
                background: "linear-gradient(transparent 60%, var(--sp-statut-dev-bg) 60%)",
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
        .about-brief {
          margin-top: 36px;
          border-top: 1px solid var(--sp-ligne);
        }
        .about-brief-row {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 16px;
          padding: 12px 0;
          border-bottom: 1px solid var(--sp-ligne);
        }
        .about-brief dt {
          font-family: var(--sp-font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--sp-or-jalon);
          padding-top: 2px;
        }
        .about-brief dd {
          margin: 0;
          font-size: 14.5px;
          line-height: 1.55;
          color: var(--sp-texte-2);
          min-width: 0;
          overflow-wrap: anywhere;
        }
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
          .about-brief { margin-top: 28px; }
          .about-brief-row { grid-template-columns: 92px 1fr; gap: 12px; padding: 10px 0; }
        }
      `}</style>
    </section>
  );
}
