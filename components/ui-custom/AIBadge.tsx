type AIBadgeProps = {
  variant?: "default" | "subtle";
  className?: string;
};

export function AIBadge({ variant = "default" }: AIBadgeProps) {
  const isSubtle = variant === "subtle";
  return (
    <span
      aria-label="Réalisation intégrant l'IA générative"
      className="ds-cat offre"
      style={
        isSubtle
          ? {
              background: "color-mix(in srgb, var(--sp-sur-sombre) 10%, transparent)",
              color: "var(--sp-sur-sombre)",
              border: "1px solid color-mix(in srgb, var(--sp-sur-sombre) 25%, transparent)",
            }
          : undefined
      }
    >
      <span aria-hidden="true">✦</span>
      <span>IA</span>
    </span>
  );
}
