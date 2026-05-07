type AIBadgeProps = {
  variant?: "default" | "subtle";
  className?: string;
};

export function AIBadge({ variant = "default" }: AIBadgeProps) {
  const isSubtle = variant === "subtle";
  return (
    <span
      aria-label="Réalisation intégrant l'IA générative"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "4px 10px",
        borderRadius: "100px",
        fontFamily: "var(--font-mono)",
        fontSize: "0.75rem",
        fontWeight: 500,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        background: isSubtle ? "rgba(245,239,230,0.08)" : "rgba(180,83,9,0.12)",
        color: isSubtle ? "rgba(245,239,230,0.85)" : "#B45309",
        border: isSubtle ? "1px solid rgba(245,239,230,0.2)" : "1px solid rgba(180,83,9,0.35)",
      }}
    >
      <span aria-hidden="true">✦</span>
      <span>IA</span>
    </span>
  );
}
