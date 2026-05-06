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
        background: scrolled ? "rgba(250,248,241,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(15,20,25,0.08)" : "none",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            background: "#1A2332",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-serif)",
            color: "#FAF8F1",
            fontSize: "16px",
            fontWeight: 500,
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
              background: "#047857",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "17px",
            fontWeight: 500,
            color: "#1A2332",
            letterSpacing: "-0.01em",
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
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 500,
                color: "#2C3640",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#047857")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#2C3640")}
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
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "#525B66",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10B981",
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
          style={{
            background: "#1A2332",
            color: "#FAF8F1",
            padding: "11px 20px",
            border: "none",
            borderRadius: "100px",
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#047857")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1A2332")}
        >
          {navCta} →
        </button>
      </div>

      <style>{`
        @keyframes navPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
          50% { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }
        @media (max-width: 1024px) {
          nav ul { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
