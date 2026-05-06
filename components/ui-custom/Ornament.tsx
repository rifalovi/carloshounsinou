type Props = { className?: string };

export default function Ornament({ className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        color: "#A88B4A",
        fontSize: "20px",
        margin: "32px 0",
      }}
    >
      <span
        style={{
          flex: 1,
          height: "1px",
          background: "linear-gradient(90deg, transparent, #A88B4A)",
          maxWidth: "120px",
        }}
      />
      <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>❦</span>
      <span
        style={{
          flex: 1,
          height: "1px",
          background: "linear-gradient(90deg, #A88B4A, transparent)",
          maxWidth: "120px",
        }}
      />
    </div>
  );
}
