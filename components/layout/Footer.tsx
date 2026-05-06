"use client";

import LanguageSwitcher from "./LanguageSwitcher";

type Props = {
  locale: string;
  brand: string;
  brandName: string;
  copyright: string;
  linkedin: string;
  suiviprojet: string;
  capcit: string;
};

export default function Footer({
  locale,
  brand,
  brandName,
  copyright,
  linkedin,
  suiviprojet,
  capcit,
}: Props) {
  const socials = [
    { label: linkedin, href: "https://linkedin.com/in/carlos-hounsinou", abbr: "in" },
    { label: suiviprojet, href: "https://suivi-projet.org", abbr: "sp" },
    { label: capcit, href: "https://cap-citoyen.fr", abbr: "cc" },
  ];

  return (
    <footer
      style={{
        background: "#0E1622",
        borderTop: "1px solid rgba(250,248,241,0.1)",
        padding: "32px 48px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "32px",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              background: "#FAF8F1",
              color: "#1A2332",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "13px",
              flexShrink: 0,
            }}
          >
            {brand}
          </div>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              color: "#FAF8F1",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            {brandName}
          </span>
        </div>

        {/* Copyright */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "rgba(250,248,241,0.4)",
            textAlign: "center",
            letterSpacing: "0.04em",
          }}
        >
          {copyright}
        </div>

        {/* Social + lang */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {socials.map(({ label, href, abbr }) => (
            <a
              key={abbr}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: "36px",
                height: "36px",
                border: "1px solid rgba(250,248,241,0.18)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FAF8F1",
                textDecoration: "none",
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                fontWeight: 500,
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#047857";
                el.style.borderColor = "#047857";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.borderColor = "rgba(250,248,241,0.18)";
              }}
            >
              {abbr.toUpperCase()}
            </a>
          ))}
          <div style={{ marginLeft: "6px" }}>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          footer > div {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          footer > div > div:last-child {
            justify-content: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
