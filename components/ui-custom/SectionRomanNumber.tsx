type Props = { number: string };

export default function SectionRomanNumber({ number }: Props) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-64px",
        top: "0",
        fontFamily: "var(--font-serif)",
        fontSize: "clamp(80px, 10vw, 140px)",
        fontWeight: 300,
        color: "rgba(26,35,50,0.04)",
        lineHeight: 1,
        letterSpacing: "-0.05em",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {number}
    </div>
  );
}
