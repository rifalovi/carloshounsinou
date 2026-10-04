type Props = { children: React.ReactNode; light?: boolean };

export default function SectionLabel({ children, light = false }: Props) {
  return (
    <div className={light ? "ds-eyebrow on-dark" : "ds-eyebrow"} style={{ marginBottom: "28px" }}>
      <span className="dot" />
      {children}
    </div>
  );
}
