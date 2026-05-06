"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui-custom/SectionLabel";
import FlagshipCard from "./FlagshipCard";

type CardData = {
  category: string;
  role: string;
  status: string;
  title: string;
  description: string;
  spec1Label: string; spec1Value: string;
  spec2Label: string; spec2Value: string;
  spec3Label: string; spec3Value: string;
  spec4Label: string; spec4Value: string;
  stack: string[];
  cta?: string;
  ctaWebsite?: string;
  ctaPlay?: string;
  capImageAlt?: string;
};

type Props = {
  eyebrow: string;
  h2Part1: string;
  h2Emphasis: string;
  h2End: string;
  intro: string;
  card1: CardData;
  card2: CardData;
  card3: CardData;
  card4: CardData;
};

const statusType = (status: string): "dev" | "live" | "done" => {
  if (status.toLowerCase().includes("développement") || status.toLowerCase().includes("development")) return "dev";
  if (status.toLowerCase().includes("production") || status.toLowerCase().includes("live")) return "live";
  return "done";
};

export default function Flagship({ eyebrow, h2Part1, h2Emphasis, h2End, intro, card1, card2, card3, card4 }: Props) {
  return (
    <section
      id="realisations"
      style={{ padding: "140px 48px", background: "#EDE5D6", position: "relative" }}
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
        <p style={{ fontSize: "16px", color: "#475569", lineHeight: 1.75, maxWidth: "480px" }}>
          {intro}
        </p>
      </motion.div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {[
          { data: card1, visual: "oif" as const },
          { data: card2, visual: "cap" as const },
          { data: card3, visual: "ibf" as const },
          { data: card4, visual: "gov" as const },
        ].map(({ data, visual }, i) => (
          <FlagshipCard
            key={visual}
            index={i}
            visual={visual}
            badge={data.status}
            badgeType={statusType(data.status)}
            category={data.category}
            role={data.role}
            title={data.title}
            description={data.description}
            specs={[
              { label: data.spec1Label, value: data.spec1Value },
              { label: data.spec2Label, value: data.spec2Value },
              { label: data.spec3Label, value: data.spec3Value },
              { label: data.spec4Label, value: data.spec4Value },
            ]}
            stack={data.stack}
            cta={data.cta ?? data.ctaWebsite}
            ctaHref={visual === "cap" ? "https://cap-citoyen.fr" : undefined}
            ctaSecondary={visual === "cap" ? data.ctaPlay : undefined}
            ctaSecondaryHref={visual === "cap" ? "https://play.google.com/store/apps/details?id=fr.capcitoyen.app" : undefined}
            capImageAlt={visual === "cap" ? data.capImageAlt : undefined}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 1280px) {
          #realisations > div:last-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 1024px) {
          #realisations > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 768px) {
          #realisations > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #realisations {
            padding: 80px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
