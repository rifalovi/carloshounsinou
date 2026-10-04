"use client";

import LanguageSwitcher from "./LanguageSwitcher";

type Props = {
  locale: string;
  brand: string;
  brandName: string;
  copyright: string;
  linkedin: string;
  capcit: string;
};

export default function Footer({
  locale,
  brand,
  brandName,
  copyright,
  linkedin,
  capcit,
}: Props) {
  const socials = [
    { label: linkedin, href: "https://linkedin.com/in/carlos-hounsinou", abbr: "in" },
    { label: capcit, href: "https://cap-citoyen.fr", abbr: "cc" },
  ];

  return (
    <footer className="ds-footer" style={{ background: "var(--sp-blanc)", padding: "32px 48px" }}>
      <div
        className="footer-grid"
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
              background: "var(--sp-bleu-nuit)",
              color: "var(--sp-blanc)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "12px",
              borderRadius: "var(--sp-radius)",
              flexShrink: 0,
            }}
          >
            {brand}
          </div>
          <span style={{ color: "var(--sp-bleu-nuit)", fontSize: "15px", fontWeight: 700 }}>
            {brandName}
          </span>
        </div>

        {/* Copyright */}
        <div
          style={{
            fontFamily: "var(--sp-font-mono)",
            fontSize: "11.5px",
            color: "var(--sp-texte-3)",
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
              className="footer-social"
              style={{
                width: "36px",
                height: "36px",
                border: "1.5px solid var(--sp-bleu-pilotage)",
                borderRadius: "var(--sp-radius-pill)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--sp-bleu-pilotage)",
                textDecoration: "none",
                fontFamily: "var(--sp-font-mono)",
                fontSize: "10px",
                fontWeight: 500,
                transition: "background 0.15s ease, color 0.15s ease",
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
        .footer-social:hover { background: var(--sp-bleu-pilotage); color: var(--sp-blanc) !important; }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr !important; text-align: center; }
          .footer-grid > div:last-child { justify-content: center !important; }
        }
        @media (max-width: 480px) {
          footer { padding: 24px 20px !important; }
        }
      `}</style>
    </footer>
  );
}
