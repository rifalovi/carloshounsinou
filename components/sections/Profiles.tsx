"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui-custom/SectionLabel";
import { CREDENTIAL_LOGOS } from "@/lib/trust";

type ProfileItem = { label: string; title: string; points: string[] };
type Credential = { logo: string; label: string; detail: string };

type Props = {
  eyebrow: string;
  h2Part1: string;
  h2Emphasis: string;
  h2End: string;
  intro: string;
  items: ProfileItem[];
  credentialsTitle: string;
  credentials: Credential[];
};

export default function Profiles({ eyebrow, h2Part1, h2Emphasis, h2End, intro, items, credentialsTitle, credentials }: Props) {
  return (
    <section id="profils" style={{ padding: "120px 48px", background: "var(--sp-papier)" }}>
      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="profiles-header"
        >
          <div>
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2
              style={{
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--sp-bleu-nuit)",
              }}
            >
              {h2Part1}{" "}
              <em style={{ fontStyle: "normal", color: "var(--sp-bleu-pilotage)" }}>{h2Emphasis}</em>
              {h2End}
            </h2>
          </div>
          <p style={{ fontSize: "16px", color: "var(--sp-texte-3)", lineHeight: 1.75, maxWidth: "480px" }}>{intro}</p>
        </motion.div>

        <div className="profiles-grid">
          {items.map((item, i) => (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="profile-card"
            >
              <div
                style={{
                  fontFamily: "var(--sp-font-mono)",
                  fontSize: "10px",
                  color: "var(--sp-or-jalon)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                {item.label}
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                  color: "var(--sp-bleu-pilotage)",
                  marginBottom: "14px",
                }}
              >
                {item.title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {item.points.map((p) => (
                  <li key={p} style={{ display: "flex", gap: "10px", fontSize: "13.5px", lineHeight: 1.55, color: "var(--sp-texte-2)" }}>
                    <span aria-hidden="true" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--sp-or-jalon)", flexShrink: 0, marginTop: "7px" }} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <h3 className="ds-section-title" style={{ marginTop: "56px", marginBottom: "20px" }}>
          {credentialsTitle}
        </h3>
        <div className="credentials-row">
          {credentials.map((c) => {
            const l = CREDENTIAL_LOGOS[c.logo];
            return (
              <div key={c.label} className="credential">
                {l && (
                  <Image
                    src={l.logo}
                    alt={c.label}
                    width={Math.round((l.w * l.display) / l.h)}
                    height={l.display}
                    className="credential-logo"
                  />
                )}
                <div style={{ minWidth: 0, overflowWrap: "anywhere" }}>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--sp-bleu-nuit)" }}>{c.label}</div>
                  <div style={{ fontSize: "12px", color: "var(--sp-texte-3)", lineHeight: 1.45 }}>{c.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .profiles-header { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: end; margin-bottom: 56px; }
        .profiles-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .profile-card {
          min-width: 0;
          background: var(--sp-blanc); border: 1px solid var(--sp-ligne); border-radius: var(--sp-radius-card);
          box-shadow: var(--sp-shadow-card); padding: 26px 24px; display: flex; flex-direction: column;
          transition: box-shadow 0.15s ease, transform 0.15s ease;
        }
        .profile-card:hover { box-shadow: var(--sp-shadow-card-hover); transform: translateY(-2px); }
        .credentials-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px 32px; }
        .credential {
          min-width: 0;
          display: flex; align-items: center; gap: 14px; padding: 14px 16px;
          background: var(--sp-blanc); border: 1px solid var(--sp-ligne); border-radius: var(--sp-radius-card);
        }
        .credential-logo { width: auto; flex-shrink: 0; max-width: 45%; height: auto; filter: grayscale(1); opacity: 0.8; }
        .credential:hover .credential-logo { filter: none; opacity: 1; }
        @media (max-width: 1100px) { .profiles-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 1024px) {
          .profiles-header { grid-template-columns: 1fr; gap: 32px; }
          .credentials-row { grid-template-columns: repeat(2, 1fr); }
          #profils { padding: 80px 24px !important; }
        }
        @media (max-width: 640px) {
          .profiles-grid, .credentials-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
