type ProductBadgeProps = {
  label: string;
};

export function ProductBadge({ label }: ProductBadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 12px",
        borderRadius: "100px",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        background: "rgba(180,83,9,0.10)",
        color: "#B45309",
        border: "1px solid rgba(180,83,9,0.30)",
      }}
    >
      <span aria-hidden="true" style={{ fontSize: "8px", lineHeight: 1 }}>◆</span>
      {label}
    </span>
  );
}
