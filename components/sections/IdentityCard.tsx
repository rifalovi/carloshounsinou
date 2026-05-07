"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

type IdentityCardProps = {
  photoSrc: string;
};

const sectionStyle = {
  padding: "14px 24px",
  borderBottom: "1px solid rgba(10,22,40,0.1)",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "9px",
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: "rgba(10,22,40,0.5)",
  marginBottom: "6px",
  margin: "0 0 6px",
};

const valueStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "rgba(10,22,40,0.85)",
  margin: 0,
};

export function IdentityCard({ photoSrc }: IdentityCardProps) {
  const t = useTranslations("identityCard");
  const photoAlt = `Carlos Hounsinou — ${t("role")}`;

  return (
    <aside
      style={{
        width: "100%",
        background: "#F5EFE6",
        border: "1px solid rgba(10,22,40,0.1)",
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      {/* Photo */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4/5",
          background: "rgba(10,22,40,0.05)",
        }}
      >
        <Image
          src={photoSrc}
          alt={photoAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
          priority
          placeholder="blur"
          blurDataURL="/images/carlos-hero-placeholder.webp"
        />
      </div>

      {/* Nom + rôle */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid rgba(10,22,40,0.1)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "20px",
            color: "#0A1628",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          Carlos Hounsinou
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#B45309",
            margin: "8px 0 0",
          }}
        >
          {t("role")}
        </p>
      </div>

      {/* Disponibilité */}
      <div style={sectionStyle}>
        <p style={labelStyle}>─── {t("availabilityLabel")}</p>
        <p
          style={{
            ...valueStyle,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10B981",
              flexShrink: 0,
            }}
          />
          {t("availabilityValue")}
        </p>
      </div>

      {/* Localisation */}
      <div style={sectionStyle}>
        <p style={labelStyle}>─── {t("locationLabel")}</p>
        <p style={valueStyle}>{t("locationValue")}</p>
      </div>

      {/* Domaines */}
      <div style={sectionStyle}>
        <p style={labelStyle}>─── {t("domainsLabel")}</p>
        <p style={valueStyle}>{t("domainsValue")}</p>
      </div>

      {/* Bailleurs */}
      <div
        style={{
          padding: "14px 24px",
          background: "#B45309",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "rgba(245,239,230,0.7)",
            margin: "0 0 6px",
          }}
        >
          ─── {t("fundersLabel")}
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "#F5EFE6",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {t("fundersValue")}
        </p>
      </div>
    </aside>
  );
}
