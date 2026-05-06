"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

type Spec = { label: string; value: string };
type Action = {
  label: string;
  type: "contact" | "external" | "store";
  href?: string;
};

type Props = {
  visual: "oif" | "incubation" | "valorisation" | "ibf" | "gov" | "cap";
  badge: string;
  badgeType: "dev" | "live" | "done";
  category: string;
  role: string;
  title: string;
  subtitle?: string;
  description: string;
  specs: Spec[];
  stack: string[];
  actions: Action[];
  capImageAlt?: string;
  index?: number;
};

/* ── palette constants ── */
const CREAM = "#F5EFE6";
const COPPER = "#B45309";
const C_SOFT = "rgba(194,112,31,0.7)";
const GOLD = "#C89B3C";

/* ────────────────────────────────────────
   SVG visuals
   ──────────────────────────────────────── */

function OifVisual() {
  return (
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: "320px", height: "auto", opacity: 0.85 }}>
      <g fill="none" stroke={C_SOFT} strokeWidth="1">
        <line x1="160" y1="30" x2="60" y2="80"/>
        <line x1="160" y1="30" x2="160" y2="80"/>
        <line x1="160" y1="30" x2="260" y2="80"/>
        <line x1="60" y1="100" x2="60" y2="135"/>
        <line x1="160" y1="100" x2="160" y2="135"/>
        <line x1="260" y1="100" x2="260" y2="135"/>
        <line x1="40" y1="150" x2="280" y2="150" strokeDasharray="2,3" opacity="0.4"/>
      </g>
      <circle cx="160" cy="30" r="12" fill={COPPER}/>
      <text x="160" y="34" textAnchor="middle" fill={CREAM} fontFamily="JetBrains Mono" fontSize="8" fontWeight="500">SCS</text>
      <rect x="40" y="80" width="40" height="20" fill="rgba(245,239,230,0.1)" stroke="rgba(245,239,230,0.4)" strokeWidth="0.5"/>
      <text x="60" y="93" textAnchor="middle" fill={CREAM} fontFamily="JetBrains Mono" fontSize="8">Coord.</text>
      <rect x="140" y="80" width="40" height="20" fill="rgba(245,239,230,0.1)" stroke="rgba(245,239,230,0.4)" strokeWidth="0.5"/>
      <text x="160" y="93" textAnchor="middle" fill={CREAM} fontFamily="JetBrains Mono" fontSize="8">Partn.</text>
      <rect x="240" y="80" width="40" height="20" fill="rgba(245,239,230,0.1)" stroke="rgba(245,239,230,0.4)" strokeWidth="0.5"/>
      <text x="260" y="93" textAnchor="middle" fill={CREAM} fontFamily="JetBrains Mono" fontSize="8">Lect.</text>
      <g fontFamily="JetBrains Mono" fontSize="7" fill="rgba(245,239,230,0.6)">
        <text x="60" y="148" textAnchor="middle">Cluster A</text>
        <text x="160" y="148" textAnchor="middle">Cluster B</text>
        <text x="260" y="148" textAnchor="middle">Cluster C</text>
        <text x="160" y="170" textAnchor="middle" fill={COPPER}>Indicateurs · Architecture modulaire</text>
      </g>
    </svg>
  );
}

function IncubationVisual() {
  return (
    <svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: "280px", height: "auto", opacity: 0.85 }}>
      {/* Header line */}
      <line x1="18" y1="22" x2="262" y2="22" stroke={C_SOFT} strokeWidth="0.8"/>
      <text x="140" y="17" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6.5"
        fill={COPPER} fontWeight="500" letterSpacing="0.09em">PLATFORM ORCHESTRATION</text>
      {/* Col 1: FORMATION */}
      <rect x="18" y="28" width="72" height="124" fill="rgba(245,239,230,0.05)"
        stroke="rgba(245,239,230,0.18)" strokeWidth="0.8" rx="2"/>
      <text x="54" y="41" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6.5"
        fill={C_SOFT} fontWeight="500" letterSpacing="0.08em">FORMATION</text>
      <rect x="26" y="48" width="56" height="16" fill="rgba(194,112,31,0.22)"
        stroke="rgba(194,112,31,0.45)" strokeWidth="0.5" rx="2"/>
      <text x="54" y="59" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="rgba(245,239,230,0.65)">Module GAR</text>
      <rect x="26" y="68" width="56" height="16" fill="rgba(194,112,31,0.16)"
        stroke="rgba(194,112,31,0.35)" strokeWidth="0.5" rx="2"/>
      <text x="54" y="79" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="rgba(245,239,230,0.65)">Incubation</text>
      <rect x="26" y="88" width="56" height="16" fill="rgba(194,112,31,0.10)"
        stroke="rgba(194,112,31,0.28)" strokeWidth="0.5" rx="2"/>
      <text x="54" y="99" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="rgba(245,239,230,0.65)">SMART KPIs</text>
      <text x="54" y="142" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="13"
        fill={C_SOFT} opacity="0.55">↓</text>
      {/* Col 2: PILOTAGE */}
      <rect x="104" y="28" width="72" height="124" fill="rgba(245,239,230,0.05)"
        stroke="rgba(245,239,230,0.18)" strokeWidth="0.8" rx="2"/>
      <text x="140" y="41" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6.5"
        fill={C_SOFT} fontWeight="500" letterSpacing="0.08em">PILOTAGE</text>
      {[48, 63, 78, 93].map((y, i) => (
        <g key={y}>
          <rect x="112" y={y} width={30 + (3 - i) * 5} height="9"
            fill="rgba(194,112,31,0.28)" rx="1"/>
          <rect x={142 + (3 - i) * 5} y={y} width={28 - (3 - i) * 5} height="9"
            fill="rgba(245,239,230,0.07)" rx="1"/>
        </g>
      ))}
      <text x="140" y="142" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="13"
        fill={C_SOFT} opacity="0.55">↓</text>
      {/* Col 3: ANALYSE */}
      <rect x="190" y="28" width="72" height="124" fill="rgba(245,239,230,0.05)"
        stroke="rgba(245,239,230,0.18)" strokeWidth="0.8" rx="2"/>
      <text x="226" y="41" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6.5"
        fill={C_SOFT} fontWeight="500" letterSpacing="0.08em">ANALYSE</text>
      <circle cx="226" cy="82" r="24" fill="rgba(180,83,9,0.09)"
        stroke="rgba(194,112,31,0.4)" strokeWidth="1"/>
      <circle cx="218" cy="77" r="5" fill="rgba(194,112,31,0.45)"/>
      <circle cx="231" cy="72" r="4" fill="rgba(194,112,31,0.32)"/>
      <circle cx="234" cy="86" r="6" fill="rgba(194,112,31,0.55)"/>
      <text x="226" y="116" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.5"
        fill="rgba(245,239,230,0.4)">IA encadrée</text>
      <text x="226" y="142" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="13"
        fill={C_SOFT} opacity="0.55">↓</text>
      {/* Bottom label */}
      <text x="140" y="175" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6"
        fill={COPPER} opacity="0.65" letterSpacing="0.05em">50+ ENDPOINTS · RLS · CRON ALERTES</text>
    </svg>
  );
}

function ValorisationVisual() {
  return (
    <svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: "280px", height: "auto", opacity: 0.85 }}>
      {/* Star MVP */}
      <text x="265" y="18" textAnchor="end" fontFamily="JetBrains Mono" fontSize="7"
        fill={GOLD} fontWeight="500">★ MVP LIVRÉ</text>
      {/* Main story area */}
      <rect x="14" y="24" width="252" height="96" fill="rgba(245,239,230,0.06)"
        stroke="rgba(194,112,31,0.42)" strokeWidth="0.8" rx="3"/>
      <text x="24" y="39" fontFamily="JetBrains Mono" fontSize="7"
        fill={COPPER} fontWeight="500" letterSpacing="0.1em">PROJECT STORIES</text>
      <rect x="24" y="46" width="176" height="5" fill="rgba(245,239,230,0.18)" rx="2"/>
      <rect x="24" y="55" width="216" height="5" fill="rgba(245,239,230,0.12)" rx="2"/>
      <rect x="24" y="64" width="156" height="5" fill="rgba(245,239,230,0.10)" rx="2"/>
      <rect x="24" y="73" width="196" height="5" fill="rgba(245,239,230,0.07)" rx="2"/>
      <rect x="24" y="88" width="56" height="20" fill="rgba(194,112,31,0.2)"
        stroke="rgba(194,112,31,0.42)" strokeWidth="0.5" rx="10"/>
      <text x="52" y="101" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.5"
        fill="rgba(245,239,230,0.7)">Data story</text>
      <rect x="86" y="88" width="56" height="20" fill="rgba(194,112,31,0.14)"
        stroke="rgba(194,112,31,0.32)" strokeWidth="0.5" rx="10"/>
      <text x="114" y="101" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.5"
        fill="rgba(245,239,230,0.7)">Analytics</text>
      {/* Panel 1: Dashboard */}
      <rect x="14" y="128" width="78" height="44" fill="rgba(245,239,230,0.05)"
        stroke="rgba(194,112,31,0.3)" strokeWidth="0.7" rx="2"/>
      <circle cx="36" cy="150" r="10" fill="none" stroke="rgba(194,112,31,0.5)" strokeWidth="1.5"/>
      <path d="M36 140 A10 10 0 0 1 46 150 Z" fill="rgba(194,112,31,0.42)"/>
      <text x="56" y="153" fontFamily="JetBrains Mono" fontSize="5.5"
        fill="rgba(245,239,230,0.45)">Analytics</text>
      {/* Panel 2: Map */}
      <rect x="101" y="128" width="78" height="44" fill="rgba(245,239,230,0.05)"
        stroke="rgba(194,112,31,0.3)" strokeWidth="0.7" rx="2"/>
      <rect x="112" y="140" width="22" height="22" fill="none"
        stroke="rgba(194,112,31,0.5)" strokeWidth="0.8" rx="1"/>
      <line x1="118" y1="140" x2="118" y2="162" stroke="rgba(194,112,31,0.28)" strokeWidth="0.5"/>
      <line x1="126" y1="140" x2="126" y2="162" stroke="rgba(194,112,31,0.28)" strokeWidth="0.5"/>
      <line x1="112" y1="148" x2="134" y2="148" stroke="rgba(194,112,31,0.28)" strokeWidth="0.5"/>
      <line x1="112" y1="155" x2="134" y2="155" stroke="rgba(194,112,31,0.28)" strokeWidth="0.5"/>
      <text x="144" y="153" fontFamily="JetBrains Mono" fontSize="5.5"
        fill="rgba(245,239,230,0.45)">Cartog.</text>
      {/* Panel 3: Chat */}
      <rect x="188" y="128" width="78" height="44" fill="rgba(245,239,230,0.05)"
        stroke="rgba(194,112,31,0.3)" strokeWidth="0.7" rx="2"/>
      <rect x="200" y="139" width="22" height="14" fill="rgba(194,112,31,0.3)"
        stroke="rgba(194,112,31,0.5)" strokeWidth="0.8" rx="4"/>
      <path d="M204 153 L202 160 L210 153 Z" fill="rgba(194,112,31,0.3)"/>
      <text x="231" y="153" fontFamily="JetBrains Mono" fontSize="5.5"
        fill="rgba(245,239,230,0.45)">Assistant</text>
    </svg>
  );
}

function IbfVisual() {
  return (
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: "320px", height: "auto", opacity: 0.8 }}>
      <g fill="none" stroke="rgba(200,185,120,0.6)" strokeWidth="1">
        <rect x="20" y="20" width="120" height="70" rx="2"/>
        <rect x="180" y="20" width="120" height="70" rx="2"/>
        <rect x="100" y="110" width="120" height="50" rx="2"/>
        <line x1="80" y1="55" x2="100" y2="110"/>
        <line x1="240" y1="55" x2="220" y2="110"/>
      </g>
      <rect x="22" y="22" width="116" height="6" fill="rgba(200,185,120,0.4)" rx="1"/>
      <rect x="22" y="33" width="80" height="4" fill="rgba(245,239,230,0.2)" rx="1"/>
      <rect x="22" y="41" width="90" height="4" fill="rgba(245,239,230,0.15)" rx="1"/>
      <rect x="22" y="49" width="70" height="4" fill="rgba(245,239,230,0.15)" rx="1"/>
      <rect x="182" y="22" width="116" height="6" fill="rgba(200,185,120,0.4)" rx="1"/>
      <rect x="182" y="33" width="85" height="4" fill="rgba(245,239,230,0.2)" rx="1"/>
      <rect x="182" y="41" width="75" height="4" fill="rgba(245,239,230,0.15)" rx="1"/>
      <text x="80" y="73" textAnchor="middle" fill="rgba(200,185,120,0.9)" fontFamily="JetBrains Mono" fontSize="8">Plateforme 1</text>
      <text x="240" y="73" textAnchor="middle" fill="rgba(200,185,120,0.9)" fontFamily="JetBrains Mono" fontSize="8">Plateforme 2</text>
      <text x="160" y="140" textAnchor="middle" fill="rgba(200,185,120,0.9)" fontFamily="JetBrains Mono" fontSize="8">Reporting UE · CAD-OCDE</text>
      <circle cx="160" cy="90" r="8" fill="rgba(200,185,120,0.3)" stroke="rgba(200,185,120,0.6)" strokeWidth="1"/>
      <text x="160" y="94" textAnchor="middle" fill={CREAM} fontFamily="JetBrains Mono" fontSize="7">IBF</text>
    </svg>
  );
}

function GovVisual() {
  return (
    <svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: "280px", height: "auto", opacity: 0.85 }}>
      {/* Star MVP */}
      <text x="268" y="18" textAnchor="end" fontFamily="JetBrains Mono" fontSize="7"
        fill={GOLD} fontWeight="500">★ MVP</text>
      {/* Band 1 — Portail public */}
      <rect x="12" y="24" width="230" height="40" fill="rgba(245,239,230,0.06)"
        stroke="rgba(194,112,31,0.45)" strokeWidth="0.8" rx="3"/>
      <text x="20" y="36" fontFamily="JetBrains Mono" fontSize="7"
        fill="rgba(194,112,31,0.8)" fontWeight="500" letterSpacing="0.06em">PORTAIL PUBLIC</text>
      {/* Circle ◯ empty */}
      <circle cx="256" cy="44" r="8" fill="none" stroke={COPPER} strokeWidth="1.5"/>
      <rect x="20" y="39" width="56" height="14" fill="rgba(245,239,230,0.07)" stroke="rgba(245,239,230,0.15)" strokeWidth="0.5" rx="2"/>
      <rect x="82" y="39" width="56" height="14" fill="rgba(245,239,230,0.07)" stroke="rgba(245,239,230,0.15)" strokeWidth="0.5" rx="2"/>
      <rect x="144" y="39" width="56" height="14" fill="rgba(245,239,230,0.07)" stroke="rgba(245,239,230,0.15)" strokeWidth="0.5" rx="2"/>
      {/* Band 2 — Espace authentifié */}
      <rect x="12" y="72" width="230" height="64" fill="rgba(180,83,9,0.1)"
        stroke="rgba(194,112,31,0.6)" strokeWidth="0.8" rx="3"/>
      <text x="20" y="84" fontFamily="JetBrains Mono" fontSize="7"
        fill="rgba(194,112,31,0.8)" fontWeight="500" letterSpacing="0.05em">ESPACE AUTHENTIFIÉ</text>
      {/* Circle ◑ half filled */}
      <circle cx="256" cy="104" r="8" fill="none" stroke={COPPER} strokeWidth="1.5"/>
      <path d="M256 96 A8 8 0 0 1 256 112 Z" fill={COPPER}/>
      {/* Role nodes */}
      <circle cx="52" cy="104" r="9" fill="rgba(180,83,9,0.45)" stroke="rgba(194,112,31,0.85)" strokeWidth="1"/>
      <text x="52" y="107" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.5" fill={CREAM}>ADM</text>
      <circle cx="130" cy="104" r="9" fill="rgba(180,83,9,0.25)" stroke="rgba(194,112,31,0.6)" strokeWidth="1"/>
      <text x="130" y="107" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.5" fill={CREAM}>ÉDI</text>
      <circle cx="208" cy="104" r="9" fill="rgba(180,83,9,0.12)" stroke="rgba(194,112,31,0.4)" strokeWidth="1"/>
      <text x="208" y="107" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="5.5" fill={CREAM}>LEC</text>
      <line x1="61" y1="104" x2="121" y2="104" stroke="rgba(194,112,31,0.35)" strokeWidth="0.7" strokeDasharray="3,2"/>
      <line x1="139" y1="104" x2="199" y2="104" stroke="rgba(194,112,31,0.28)" strokeWidth="0.7" strokeDasharray="3,2"/>
      <rect x="20" y="122" width="204" height="5" fill="rgba(245,239,230,0.08)" rx="2.5"/>
      <rect x="20" y="122" width="153" height="5" fill="rgba(194,112,31,0.5)" rx="2.5"/>
      <text x="180" y="129" fontFamily="JetBrains Mono" fontSize="5.5" fill="rgba(194,112,31,0.7)">75 %</text>
      {/* Band 3 — Référentiel & audit */}
      <rect x="12" y="144" width="230" height="28" fill="rgba(245,239,230,0.04)"
        stroke="rgba(194,112,31,0.3)" strokeWidth="0.8" rx="3"/>
      {/* Circle ◉ filled */}
      <circle cx="256" cy="158" r="8" fill={COPPER} opacity="0.85"/>
      <circle cx="256" cy="158" r="3.5" fill={CREAM} opacity="0.35"/>
      <text x="20" y="155" fontFamily="JetBrains Mono" fontSize="7"
        fill="rgba(194,112,31,0.6)" fontWeight="500" letterSpacing="0.05em">RÉFÉRENTIEL &amp; AUDIT</text>
      <line x1="20" y1="162" x2="80" y2="162" stroke="rgba(194,112,31,0.28)" strokeWidth="1"/>
      <line x1="86" y1="162" x2="146" y2="162" stroke="rgba(194,112,31,0.18)" strokeWidth="1"/>
      <line x1="152" y1="162" x2="212" y2="162" stroke="rgba(194,112,31,0.10)" strokeWidth="1"/>
    </svg>
  );
}

const CAP_BLUR = "data:image/webp;base64,UklGRqAAAABXRUJQVlA4IJQAAABwBQCdASoUACsAPzmMulavKSUjsBVYAeAnCWQAwoALPFugS0KUzgCrL9BEJpJih+YITZd4AP7kBSD72FM6jIhLH/eaadxHnyVXH6KWk744CuYm3/n7LXXxWPvpPLHq+2unkJ17C43emBx1RVaVqiDRyeheCzFVtwc6JGAW+wstKqbg/7AKw2/gNsQrnC7c1aBwgAAA=";

function CapVisual({ alt }: { alt?: string }) {
  const phoneStyle: React.CSSProperties = {
    borderRadius: "16px",
    objectFit: "contain",
  };
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "14px" }}>
      <div className="cap-fan-left" style={{ position: "absolute", zIndex: 10, transform: "translateX(-58px) rotate(-10deg) scale(0.91)", transformOrigin: "bottom center", opacity: 0.93 }}>
        <Image src="/images/cap-citoyen/02-progression-600.webp" alt="Cap Citoyen — suivi de progression"
          width={76} height={164} sizes="76px"
          style={{ ...phoneStyle, boxShadow: "0 8px 24px rgba(0,0,0,0.36)" }}
          placeholder="blur" blurDataURL={CAP_BLUR}/>
      </div>
      <div style={{ position: "relative", zIndex: 20, flexShrink: 0 }}>
        <Image src="/images/cap-citoyen/01-accueil-600.webp" alt={alt ?? "Cap Citoyen — écran d'accueil"}
          width={84} height={182} sizes="84px"
          style={{ ...phoneStyle, boxShadow: "0 12px 36px rgba(0,0,0,0.44)" }}
          placeholder="blur" blurDataURL={CAP_BLUR}/>
      </div>
      <div className="cap-fan-right" style={{ position: "absolute", zIndex: 10, transform: "translateX(58px) rotate(10deg) scale(0.91)", transformOrigin: "bottom center", opacity: 0.93 }}>
        <Image src="/images/cap-citoyen/05-thematiques-600.webp" alt="Cap Citoyen — thématiques visuelles"
          width={76} height={164} sizes="76px"
          style={{ ...phoneStyle, boxShadow: "0 8px 24px rgba(0,0,0,0.36)" }}
          placeholder="blur" blurDataURL={CAP_BLUR}/>
      </div>
      <style>{`
        @media (max-width: 767px) { .cap-fan-left, .cap-fan-right { display: none !important; } }
        @media (min-width: 768px) and (max-width: 1023px) { .cap-fan-left { display: none !important; } }
      `}</style>
    </div>
  );
}

/* ── visual config ── */
const visualBg: Record<string, string> = {
  oif:          "linear-gradient(135deg, #060F1C 0%, #0A1628 100%)",
  incubation:   "linear-gradient(135deg, #0A1628 0%, #0D1B2C 55%, #060F1C 100%)",
  valorisation: "linear-gradient(135deg, #0A1628 0%, #181A0C 55%, #0C0E05 100%)",
  ibf:          "linear-gradient(135deg, #0A1628 0%, #1A2537 60%, #816A37 100%)",
  gov:          "linear-gradient(135deg, #0A1628 0%, #1A1410 60%, #0C0A06 100%)",
  cap:          "linear-gradient(135deg, #0A1628 0%, #1A2537 60%, #060F1C 100%)",
};

const badgeColors: Record<string, string> = {
  dev:  "#D97706",
  live: "#10B981",
  done: "#A88B4A",
};

/* ── contact handler ── */
function handleContactRequest(projectTitle: string) {
  const message = `Bonjour Carlos,\n\nJe souhaite en savoir plus sur le projet "${projectTitle}".\n\nPouvez-vous me partager une présentation détaillée et discuter d'une éventuelle collaboration ?\n\nCordialement,`;
  sessionStorage.setItem("contactPrefill", JSON.stringify({ message, project: projectTitle }));
  const section = document.getElementById("contact");
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      const ta = document.getElementById("contact-message") as HTMLTextAreaElement | null;
      if (ta) ta.focus();
    }, 800);
  }
}

/* ── component ── */
export default function FlagshipCard({
  visual, badge, badgeType, category, role, title, subtitle,
  description, specs, stack, actions, capImageAlt, index = 0,
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#F5EFE6",
        border: hovered ? "1px solid #B45309" : "1px solid rgba(10,22,40,0.08)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.4s ease",
        height: "100%",
      }}
    >
      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: "linear-gradient(90deg, #B45309, #C2701F)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
        zIndex: 2,
      }}/>

      {/* Visual */}
      <div style={{
        height: "220px",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(10,22,40,0.08)",
        background: visualBg[visual],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {/* Badge */}
        <div style={{
          position: "absolute", top: "16px", left: "16px",
          background: "rgba(245,239,230,0.95)",
          backdropFilter: "blur(8px)",
          padding: "5px 10px",
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          color: "#0A1628",
          fontWeight: 500,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          zIndex: 1,
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: badgeColors[badgeType], flexShrink: 0 }}/>
          {badge}
        </div>
        {visual === "oif" && <OifVisual />}
        {visual === "incubation" && <IncubationVisual />}
        {visual === "valorisation" && <ValorisationVisual />}
        {visual === "ibf" && <IbfVisual />}
        {visual === "gov" && <GovVisual />}
        {visual === "cap" && <CapVisual alt={capImageAlt} />}
      </div>

      {/* Content */}
      <div style={{ padding: "28px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", gap: "12px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#B45309", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            {category}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#475569", fontWeight: 500, flexShrink: 0 }}>
            {role}
          </span>
        </div>

        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "#0A1628", lineHeight: 1.2, letterSpacing: "-0.015em", marginBottom: "6px" }}>
          {title}
        </h3>
        {subtitle && (
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#475569", marginBottom: "14px", letterSpacing: "0.02em" }}>
            {subtitle}
          </p>
        )}

        <p style={{ fontSize: "13px", color: "#1F2937", lineHeight: 1.65, marginBottom: "20px" }}>
          {description}
        </p>

        {/* Specs */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "14px 0", marginBottom: "18px", borderTop: "1px solid rgba(10,22,40,0.08)", borderBottom: "1px solid rgba(10,22,40,0.08)" }}>
          {specs.map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#475569", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "3px", fontWeight: 500 }}>
                {label}
              </div>
              <div style={{ fontSize: "12px", color: "#0A1628", fontWeight: 500 }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Stack tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "22px" }}>
          {stack.map((tag) => (
            <span key={tag} style={{ fontFamily: "var(--font-mono)", fontSize: "9px", padding: "3px 9px", border: "1px solid rgba(10,22,40,0.18)", borderRadius: "100px", color: "#1F2937", fontWeight: 500 }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "auto", flexWrap: "wrap" }}>
          {actions.map((action, i) => {
            if (action.type === "contact") {
              return (
                <button
                  key={i}
                  onClick={() => handleContactRequest(title)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "9px 16px",
                    background: "transparent",
                    color: "#B45309",
                    border: "1.5px solid #B45309",
                    borderRadius: "100px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#B45309";
                    e.currentTarget.style.color = "#F5EFE6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#B45309";
                  }}
                >
                  {action.label}
                </button>
              );
            }
            if (action.type === "external" || action.type === "store") {
              return (
                <a
                  key={i}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "9px 16px",
                    background: i === 0 ? "#0A1628" : "transparent",
                    color: i === 0 ? "#F5EFE6" : "#0A1628",
                    border: i === 0 ? "none" : "1px solid rgba(10,22,40,0.18)",
                    borderRadius: "100px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#B45309";
                    e.currentTarget.style.color = "#F5EFE6";
                    e.currentTarget.style.borderColor = "#B45309";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = i === 0 ? "#0A1628" : "transparent";
                    e.currentTarget.style.color = i === 0 ? "#F5EFE6" : "#0A1628";
                    e.currentTarget.style.borderColor = i === 0 ? "transparent" : "rgba(10,22,40,0.18)";
                  }}
                >
                  {action.label} ↗
                </a>
              );
            }
            return null;
          })}
        </div>
      </div>
    </motion.article>
  );
}
