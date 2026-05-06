"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

type Spec = { label: string; value: string };

type Props = {
  visual: "oif" | "cap" | "ibf";
  badge: string;
  badgeType: "dev" | "live" | "done";
  category: string;
  role: string;
  title: string;
  description: string;
  specs: Spec[];
  stack: string[];
  cta?: string;
  ctaHref?: string;
  ctaSecondary?: string;
  ctaSecondaryHref?: string;
  capImageAlt?: string;
  index?: number;
};

/* ── SVG visuals ── */
function OifVisual() {
  return (
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: "320px", height: "auto", opacity: 0.85 }}>
      <g fill="none" stroke="rgba(16,185,129,0.7)" strokeWidth="1">
        <line x1="160" y1="30" x2="60" y2="80"/>
        <line x1="160" y1="30" x2="160" y2="80"/>
        <line x1="160" y1="30" x2="260" y2="80"/>
        <line x1="60" y1="100" x2="60" y2="135"/>
        <line x1="160" y1="100" x2="160" y2="135"/>
        <line x1="260" y1="100" x2="260" y2="135"/>
        <line x1="40" y1="150" x2="280" y2="150" strokeDasharray="2,3" opacity="0.4"/>
      </g>
      <circle cx="160" cy="30" r="12" fill="#10B981"/>
      <text x="160" y="34" textAnchor="middle" fill="#FAF8F1" fontFamily="JetBrains Mono" fontSize="9" fontWeight="500">SCS</text>
      <rect x="40" y="80" width="40" height="20" fill="rgba(250,248,241,0.1)" stroke="rgba(250,248,241,0.4)" strokeWidth="0.5"/>
      <text x="60" y="93" textAnchor="middle" fill="#FAF8F1" fontFamily="JetBrains Mono" fontSize="8">Coord.</text>
      <rect x="140" y="80" width="40" height="20" fill="rgba(250,248,241,0.1)" stroke="rgba(250,248,241,0.4)" strokeWidth="0.5"/>
      <text x="160" y="93" textAnchor="middle" fill="#FAF8F1" fontFamily="JetBrains Mono" fontSize="8">Partn.</text>
      <rect x="240" y="80" width="40" height="20" fill="rgba(250,248,241,0.1)" stroke="rgba(250,248,241,0.4)" strokeWidth="0.5"/>
      <text x="260" y="93" textAnchor="middle" fill="#FAF8F1" fontFamily="JetBrains Mono" fontSize="8">Lect.</text>
      <g fontFamily="JetBrains Mono" fontSize="7" fill="rgba(250,248,241,0.6)">
        <text x="60" y="148" textAnchor="middle">Cluster A</text>
        <text x="160" y="148" textAnchor="middle">Cluster B</text>
        <text x="260" y="148" textAnchor="middle">Cluster C</text>
        <text x="160" y="170" textAnchor="middle" fill="#10B981">Indicateurs · Architecture modulaire</text>
      </g>
    </svg>
  );
}

function CapVisual({ alt }: { alt?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "16px",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "184px",
          width: "85px",
          filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.32))",
          flexShrink: 0,
        }}
      >
        <Image
          src="/images/cap-citoyen/cap-citoyen-iphone-600.webp"
          alt={alt ?? "Cap Citoyen app"}
          fill
          sizes="(max-width: 600px) 200px, 300px"
          style={{ objectFit: "contain" }}
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRqAAAABXRUJQVlA4IJQAAABwBQCdASoUACsAPzmMulavKSUjsBVYAeAnCWQAwoALPFugS0KUzgCrL9BEJpJih+YITZd4AP7kBSD72FM6jIhLH/eaadxHnyVXH6KWk744CuYm3/n7LXXxWPvpPLHq+2unkJ17C43emBx1RVaVqiDRyeheCzFVtwc6JGAW+wstKqbg/7AKw2/gNsQrnC7c1aBwgAAA="
        />
      </div>
    </div>
  );
}

function IbfVisual() {
  return (
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: "320px", height: "auto", opacity: 0.8 }}>
      <g fill="none" stroke="rgba(200,185,120,0.6)" strokeWidth="1">
        <rect x="20" y="20" width="120" height="70" rx="2"/>
        <rect x="180" y="20" width="120" height="70" rx="2"/>
        <rect x="100" y="110" width="120" height="50" rx="2"/>
        <line x1="80" y1="55" x2="100" y2="110"/>
        <line x1="240" y1="55" x2="220" y2="110"/>
      </g>
      <rect x="22" y="22" width="116" height="6" fill="rgba(200,185,120,0.4)" rx="1"/>
      <rect x="22" y="33" width="80" height="4" fill="rgba(250,248,241,0.2)" rx="1"/>
      <rect x="22" y="41" width="90" height="4" fill="rgba(250,248,241,0.15)" rx="1"/>
      <rect x="22" y="49" width="70" height="4" fill="rgba(250,248,241,0.15)" rx="1"/>
      <rect x="182" y="22" width="116" height="6" fill="rgba(200,185,120,0.4)" rx="1"/>
      <rect x="182" y="33" width="85" height="4" fill="rgba(250,248,241,0.2)" rx="1"/>
      <rect x="182" y="41" width="75" height="4" fill="rgba(250,248,241,0.15)" rx="1"/>
      <text x="80" y="73" textAnchor="middle" fill="rgba(200,185,120,0.9)" fontFamily="JetBrains Mono" fontSize="8">Plateforme 1</text>
      <text x="240" y="73" textAnchor="middle" fill="rgba(200,185,120,0.9)" fontFamily="JetBrains Mono" fontSize="8">Plateforme 2</text>
      <text x="160" y="140" textAnchor="middle" fill="rgba(200,185,120,0.9)" fontFamily="JetBrains Mono" fontSize="8">Reporting UE · CAD-OCDE</text>
      <circle cx="160" cy="90" r="8" fill="rgba(200,185,120,0.3)" stroke="rgba(200,185,120,0.6)" strokeWidth="1"/>
      <text x="160" y="94" textAnchor="middle" fill="#FAF8F1" fontFamily="JetBrains Mono" fontSize="7">IBF</text>
    </svg>
  );
}

const visualBg: Record<string, string> = {
  oif: "linear-gradient(135deg, #0E1622 0%, #1A2332 100%)",
  cap: "linear-gradient(135deg, #1A2332 0%, #2A3445 60%, #0E1622 100%)",
  ibf: "linear-gradient(135deg, #1A2332 0%, #2A3445 60%, #816A37 100%)",
};

const badgeColors: Record<string, string> = {
  dev: "#B45309",
  live: "#10B981",
  done: "#047857",
};

export default function FlagshipCard({
  visual,
  badge,
  badgeType,
  category,
  role,
  title,
  description,
  specs,
  stack,
  cta,
  ctaHref,
  ctaSecondary,
  ctaSecondaryHref,
  capImageAlt,
  index = 0,
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#FAF8F1",
        border: hovered ? "1px solid #047857" : "1px solid rgba(15,20,25,0.08)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.4s ease",
      }}
    >
      {/* Top accent line on hover */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #047857, #10B981)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s",
          zIndex: 2,
        }}
      />

      {/* Visual */}
      <div
        style={{
          height: "220px",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid rgba(15,20,25,0.08)",
          background: visualBg[visual],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Badge */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            background: "rgba(250,248,241,0.95)",
            backdropFilter: "blur(8px)",
            padding: "5px 10px",
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "#1A2332",
            fontWeight: 500,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            zIndex: 1,
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: badgeColors[badgeType],
              flexShrink: 0,
            }}
          />
          {badge}
        </div>

        {visual === "oif" && <OifVisual />}
        {visual === "cap" && <CapVisual alt={capImageAlt} />}
        {visual === "ibf" && <IbfVisual />}
      </div>

      {/* Content */}
      <div
        style={{
          padding: "32px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "#047857",
              fontWeight: 500,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {category}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "#525B66",
              fontWeight: 500,
            }}
          >
            {role}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "26px",
            fontWeight: 400,
            color: "#1A2332",
            lineHeight: 1.15,
            letterSpacing: "-0.015em",
            marginBottom: "14px",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontSize: "14px",
            color: "#2C3640",
            lineHeight: 1.65,
            marginBottom: "24px",
          }}
        >
          {description}
        </p>

        {/* Specs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            padding: "18px 0",
            marginBottom: "24px",
            borderTop: "1px solid rgba(15,20,25,0.08)",
            borderBottom: "1px solid rgba(15,20,25,0.08)",
          }}
        >
          {specs.map(({ label, value }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "#525B66",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  marginBottom: "4px",
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
              <div style={{ fontSize: "13px", color: "#1A2332", fontWeight: 500 }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Stack tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "28px" }}>
          {stack.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                padding: "4px 10px",
                border: "1px solid rgba(15,20,25,0.18)",
                borderRadius: "100px",
                color: "#2C3640",
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            marginTop: "auto",
            flexWrap: "wrap",
          }}
        >
          {ctaHref ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                background: "#1A2332",
                color: "#FAF8F1",
                borderRadius: "100px",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#047857")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#1A2332")}
            >
              {cta} ↗
            </a>
          ) : (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                background: "transparent",
                color: "#525B66",
                border: "1px dashed rgba(15,20,25,0.18)",
                borderRadius: "100px",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              {cta}
            </span>
          )}

          {ctaSecondaryHref && ctaSecondary && (
            <a
              href={ctaSecondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                background: "transparent",
                color: "#1A2332",
                border: "1px solid rgba(15,20,25,0.18)",
                borderRadius: "100px",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#047857";
                e.currentTarget.style.color = "#047857";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(15,20,25,0.18)";
                e.currentTarget.style.color = "#1A2332";
              }}
            >
              {ctaSecondary} ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
