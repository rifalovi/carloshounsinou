type Props = { size?: number; initials?: string };

/* Monogramme sur les tokens du design system : carré arrondi bleu pilotage,
   initiales Manrope 800, filet or (le « jalon ») en pied. */
export default function BrandMark({ size = 36, initials = "CH" }: Props) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "var(--sp-radius)",
        background: "var(--sp-bleu-pilotage)",
        color: "var(--sp-blanc)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--sp-font-sans)",
        fontWeight: 800,
        fontSize: Math.round(size * 0.42),
        letterSpacing: "-0.02em",
        lineHeight: 1,
        paddingBottom: Math.round(size * 0.1),
        flexShrink: 0,
      }}
    >
      {initials}
      <span
        style={{
          position: "absolute",
          left: "50%",
          bottom: Math.round(size * 0.14),
          transform: "translateX(-50%)",
          width: Math.round(size * 0.4),
          height: 3,
          borderRadius: 3,
          background: "var(--sp-or-jalon)",
        }}
      />
    </span>
  );
}
