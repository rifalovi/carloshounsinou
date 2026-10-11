import Image from "next/image";
import { TRUST_ITEMS } from "@/lib/trust";

type Props = { title: string; subtitle: string };

export default function TrustLogos({ title, subtitle }: Props) {
  // Piste dupliquée pour un défilement continu sans rupture.
  const track = [...TRUST_ITEMS, ...TRUST_ITEMS];

  return (
    <section
      id="confiance"
      aria-label={title}
      style={{
        background: "var(--sp-papier)",
        borderTop: "1px solid var(--sp-ligne)",
        borderBottom: "1px solid var(--sp-ligne)",
        padding: "40px 0 36px",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "0 24px", marginBottom: "24px", textAlign: "center" }}>
        <div className="ds-eyebrow" style={{ margin: 0 }}>
          <span className="dot" />
          {title}
        </div>
        <p style={{ margin: "8px 0 0", fontSize: "13.5px", color: "var(--sp-texte-3)" }}>{subtitle}</p>
      </div>

      <div className="trust-viewport">
        <div className="trust-track">
          {track.map((item, i) => {
            const dup = i >= TRUST_ITEMS.length;
            return item.logo && item.w && item.h ? (
              <Image
                key={`${item.id}-${i}`}
                src={item.logo}
                alt={dup ? "" : item.name}
                aria-hidden={dup || undefined}
                title={item.name}
                width={Math.round((item.w * (item.display ?? 40)) / item.h)}
                height={item.display ?? 40}
                className="trust-logo"
              />
            ) : (
              <span key={`${item.id}-${i}`} className="trust-badge" aria-hidden={dup || undefined}>
                {item.name}
              </span>
            );
          })}
        </div>
      </div>

      <style>{`
        .trust-viewport { position: relative; }
        .trust-viewport::before, .trust-viewport::after {
          content: ""; position: absolute; top: 0; bottom: 0; width: 80px; z-index: 1; pointer-events: none;
        }
        .trust-viewport::before { left: 0; background: linear-gradient(90deg, var(--sp-papier), transparent); }
        .trust-viewport::after { right: 0; background: linear-gradient(270deg, var(--sp-papier), transparent); }
        .trust-track {
          display: flex; align-items: center; gap: 56px; width: max-content; padding: 0 28px;
          animation: trust-scroll 70s linear infinite;
        }
        .trust-viewport:hover .trust-track { animation-play-state: paused; }
        .trust-logo {
          width: auto; flex-shrink: 0;
          filter: grayscale(1); opacity: 0.72;
          transition: filter 0.2s ease, opacity 0.2s ease;
        }
        .trust-logo:hover { filter: none; opacity: 1; }
        .trust-badge {
          flex-shrink: 0; white-space: nowrap;
          font-weight: 700; font-size: 15px; letter-spacing: -0.01em;
          color: var(--sp-bleu-nuit); opacity: 0.72;
          padding: 7px 16px; border: 1.5px solid var(--sp-ligne); border-radius: var(--sp-radius-pill);
          background: var(--sp-blanc);
          transition: opacity 0.2s ease, border-color 0.2s ease;
        }
        .trust-badge:hover { opacity: 1; border-color: var(--sp-bleu-pilotage); }
        @keyframes trust-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (max-width: 640px) {
          .trust-track { gap: 36px; animation-duration: 45s; }
          .trust-logo { transform: scale(0.85); }
          .trust-badge { font-size: 13.5px; padding: 6px 12px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .trust-track { animation: none; flex-wrap: wrap; justify-content: center; width: auto; gap: 24px 40px; }
          .trust-viewport::before, .trust-viewport::after { display: none; }
        }
      `}</style>
    </section>
  );
}
