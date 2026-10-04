"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

type Props = {
  locale: string;
  navAbout: string;
  navFlagship: string;
  navExpertise: string;
  navContact: string;
  navCta: string;
  navStatus: string;
};

export default function Navigation({
  locale,
  navAbout,
  navFlagship,
  navExpertise,
  navContact,
  navCta,
  navStatus,
}: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Navigation principale"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "14px 48px" : "24px 48px",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: "40px",
        transition: "all 0.4s ease",
        background: "color-mix(in srgb, var(--sp-blanc) 88%, transparent)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--sp-ligne)",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            background: "var(--sp-bleu-nuit)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--sp-font-sans)",
            color: "var(--sp-blanc)",
            fontSize: "16px",
            fontWeight: 800,
            position: "relative",
            flexShrink: 0,
          }}
        >
          CH
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-3px",
              right: "-3px",
              width: "12px",
              height: "12px",
              background: "var(--sp-or-jalon)",
            }}
          />
        </div>
        <span
          className="nav-brand"
          style={{
            fontFamily: "var(--sp-font-sans)",
            fontSize: "17px",
            fontWeight: 700,
            color: "var(--sp-bleu-nuit)",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
          }}
        >
          Carlos Hounsinou
        </span>
      </div>

      {/* Nav links */}
      <ul
        style={{
          display: "flex",
          gap: "30px",
          listStyle: "none",
          justifyContent: "center",
          margin: 0,
          padding: 0,
        }}
      >
        {[
          { label: navAbout, id: "parcours" },
          { label: navFlagship, id: "realisations" },
          { label: navExpertise, id: "expertise" },
          { label: navContact, id: "contact" },
        ].map(({ label, id }) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              style={{
                background: "none",
                border: "none",
                fontFamily: "var(--sp-font-sans)",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--sp-texte-2)",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sp-bleu-pilotage)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sp-texte-2)")}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* Status */}
        <div
          className="nav-status"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--sp-font-mono)",
            fontSize: "12px",
            color: "var(--sp-texte-3)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--sp-statut-prod)",
              position: "relative",
              flexShrink: 0,
              animation: "navPulse 2s ease-in-out infinite",
            }}
          />
          {navStatus}
        </div>

        <LanguageSwitcher locale={locale} />

        {/* CTA */}
        <button
          onClick={() => scrollTo("contact")}
          aria-label={navCta}
          className="ds-btn ds-btn-blue"
          style={{ padding: "10px 18px", fontSize: "13px" }}
        >
          {navCta} →
        </button>
      </div>

      <style>{`
        @keyframes navPulse {
          0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--sp-statut-prod) 40%, transparent); }
          50% { box-shadow: 0 0 0 5px transparent; }
        }
        @media (max-width: 1024px) {
          nav ul { display: none !important; }
        }
        @media (max-width: 768px) {
          nav[aria-label="Navigation principale"] { padding: 12px 16px !important; }
          .nav-status { display: none !important; }
        }
        @media (max-width: 640px) {
          nav[aria-label="Navigation principale"] { gap: 12px !important; }
          .nav-brand { font-size: 14px !important; }
        }
      `}</style>
    </nav>
  );
}
