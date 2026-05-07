"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

type Props = { label: string; projectTitle: string };

export default function DetailCTA({ label, projectTitle }: Props) {
  const locale = useLocale();
  const router = useRouter();

  const handleClick = () => {
    const message = `Bonjour Carlos,\n\nJe souhaite en savoir plus sur le projet « ${projectTitle} ».\n\nPouvez-vous me partager une présentation détaillée et discuter d'une éventuelle collaboration ?\n\nCordialement,`;
    sessionStorage.setItem("contactPrefill", JSON.stringify({ message, project: projectTitle }));
    router.push(`/${locale}/#contact`);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "16px 28px",
        background: "#B45309",
        color: "#F5EFE6",
        border: "none",
        borderRadius: "100px",
        fontFamily: "var(--font-mono)",
        fontSize: "13px",
        fontWeight: 500,
        cursor: "pointer",
        transition: "background 0.3s",
        letterSpacing: "0.02em",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#0A1628")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#B45309")}
    >
      {label}
      <span style={{
        width: "26px", height: "26px",
        background: "rgba(245,239,230,0.2)",
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "13px",
      }}>→</span>
    </button>
  );
}
