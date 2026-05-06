import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("hero");
  const nav = useTranslations("nav");

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        fontFamily: "var(--font-sans)",
        background: "#FAF8F1",
        color: "#0F1419",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2rem, 5vw, 4rem)",
          fontWeight: 300,
          letterSpacing: "-0.02em",
          color: "#1A2332",
        }}
      >
        Hello, Carlos.
      </h1>

      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.875rem",
          color: "#047857",
          letterSpacing: "-0.02em",
        }}
      >
        {t("tag")}
      </p>

      <nav
        style={{
          display: "flex",
          gap: "1.5rem",
          fontFamily: "var(--font-sans)",
          fontSize: "0.875rem",
        }}
      >
        <Link href="/fr" style={{ color: "#047857", textDecoration: "none" }}>
          FR — Français
        </Link>
        <span style={{ color: "#7B8290" }}>·</span>
        <Link href="/en" style={{ color: "#047857", textDecoration: "none" }}>
          EN — English
        </Link>
      </nav>

      <div
        style={{
          marginTop: "1rem",
          padding: "1rem 2rem",
          border: "1px solid rgba(15,20,25,0.08)",
          borderRadius: "4px",
          background: "#F5F1E8",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "#525B66",
          maxWidth: "420px",
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        {nav("cta")} — Session 1 ✓ Bootstrap complet
      </div>
    </main>
  );
}
