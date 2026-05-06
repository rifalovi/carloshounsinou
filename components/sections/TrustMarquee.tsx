type Props = { items: string[] };

export default function TrustMarquee({ items }: Props) {
  // Duplicate items for seamless loop
  const track = [...items, ...items];

  return (
    <div
      style={{
        background: "#0E1622",
        padding: "24px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: "flex",
          gap: "64px",
          whiteSpace: "nowrap",
          alignItems: "center",
        }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "22px",
              color: "#FAF8F1",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              opacity: 0.85,
              display: "inline-flex",
              alignItems: "center",
              gap: "64px",
              flexShrink: 0,
            }}
          >
            {item}
            <span
              aria-hidden="true"
              style={{
                width: "8px",
                height: "8px",
                background: "#047857",
                borderRadius: "50%",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>

      <style>{`
        .marquee-track {
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
        @media (max-width: 600px) {
          .marquee-track span { font-size: 17px !important; gap: 36px !important; }
        }
      `}</style>
    </div>
  );
}
