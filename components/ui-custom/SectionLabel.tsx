type Props = { children: React.ReactNode; light?: boolean };

export default function SectionLabel({ children, light = false }: Props) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        color: light ? "#10B981" : "#047857",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: "28px",
        fontWeight: 500,
      }}
    >
      <span
        style={{
          width: "24px",
          height: "1px",
          background: light ? "#10B981" : "#047857",
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  );
}
