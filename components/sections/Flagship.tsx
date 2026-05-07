"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui-custom/SectionLabel";
import FlagshipCard from "./FlagshipCard";

type Spec = { label: string; value: string };
type Action = { label: string; type: "contact" | "external" | "store" | "detail"; href?: string };

export type CardData = {
  id: string;
  visual: "oif" | "incubation" | "valorisation" | "ibf" | "gov" | "cap" | "operations";
  hasAI?: boolean;
  category: string;
  role: string;
  title: string;
  subtitle?: string;
  status: string;
  statusType: "dev" | "live" | "done";
  description: string;
  specs: Spec[];
  stack: string[];
  actions: Action[];
  capImageAlt?: string;
};

type Props = {
  eyebrow: string;
  h2Part1: string;
  h2Emphasis: string;
  h2End: string;
  intro: string;
  cards: CardData[];
};

export default function Flagship({ eyebrow, h2Part1, h2Emphasis, h2End, intro, cards }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute("data-idx") ?? "0", 10);
            setActiveIndex(idx);
          }
        });
      },
      { root: track, threshold: 0.5 }
    );
    track.querySelectorAll("[data-idx]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToIndex = useCallback(
    (idx: number) => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.querySelector(`[data-idx="${idx}"]`) as HTMLElement | null;
      if (card) {
        card.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    },
    [reducedMotion]
  );

  const prev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const next = () => scrollToIndex(Math.min(cards.length - 1, activeIndex + 1));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  const navBtn = (side: "left" | "right"): React.CSSProperties => ({
    position: "absolute",
    top: "50%",
    [side]: "12px",
    transform: "translateY(-50%)",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#060F1C",
    border: "1px solid rgba(245,239,230,0.18)",
    color: "#F5EFE6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "16px",
    zIndex: 10,
    transition: "background 0.3s, border-color 0.3s",
    padding: 0,
  });

  return (
    <section
      id="realisations"
      role="region"
      aria-roledescription="carousel"
      aria-label={eyebrow}
      style={{ padding: "140px 0", background: "#EDE5D6", position: "relative" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: reducedMotion ? 0 : 0.7 }}
        style={{ padding: "0 48px", marginBottom: "60px" }}
        className="flagship-header"
      >
        <div className="flagship-header-inner">
          <div>
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(40px, 5.5vw, 76px)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: "#0A1628",
              }}
            >
              {h2Part1}{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "#B45309" }}>
                {h2Emphasis}
              </em>
              {h2End}
            </h2>
          </div>
          <p style={{ fontSize: "16px", color: "#475569", lineHeight: 1.75, maxWidth: "480px" }}>
            {intro}
          </p>
        </div>
      </motion.div>

      {/* Carousel */}
      <div style={{ position: "relative" }}>
        {/* Track wrapper (buttons positioned relative to this) */}
        <div style={{ position: "relative" }}>
          <button
            onClick={prev}
            aria-label="Projet précédent"
            disabled={activeIndex === 0}
            style={navBtn("left")}
            className="flagship-nav-btn"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#B45309";
              e.currentTarget.style.borderColor = "#B45309";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#060F1C";
              e.currentTarget.style.borderColor = "rgba(245,239,230,0.18)";
            }}
          >
            ←
          </button>

          <div
            ref={trackRef}
            role="list"
            tabIndex={0}
            aria-live="polite"
            aria-atomic="false"
            onKeyDown={handleKeyDown}
            className="flagship-track"
            style={{
              display: "flex",
              gap: "24px",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              padding: "8px 64px 32px",
              outline: "none",
            }}
          >
            {cards.map((card, i) => (
              <div
                key={card.id}
                data-idx={i}
                role="listitem"
                aria-label={`Réalisation ${i + 1} sur ${cards.length} : ${card.title}`}
                className="flagship-card-wrapper"
                style={{ flexShrink: 0, scrollSnapAlign: "start" }}
              >
                <FlagshipCard
                  index={i}
                  visual={card.visual}
                  badge={card.status}
                  badgeType={card.statusType}
                  hasAI={card.hasAI}
                  category={card.category}
                  role={card.role}
                  title={card.title}
                  subtitle={card.subtitle}
                  description={card.description}
                  specs={card.specs}
                  stack={card.stack}
                  actions={card.actions}
                  capImageAlt={card.capImageAlt}
                />
              </div>
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Projet suivant"
            disabled={activeIndex === cards.length - 1}
            style={navBtn("right")}
            className="flagship-nav-btn"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#B45309";
              e.currentTarget.style.borderColor = "#B45309";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#060F1C";
              e.currentTarget.style.borderColor = "rgba(245,239,230,0.18)";
            }}
          >
            →
          </button>
        </div>

        {/* Dots */}
        <div
          role="tablist"
          aria-label="Navigation par projet"
          style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "8px" }}
        >
          {cards.map((card, i) => (
            <button
              key={card.id}
              role="tab"
              aria-selected={activeIndex === i}
              aria-label={`Projet ${i + 1} : ${card.title}`}
              onClick={() => scrollToIndex(i)}
              className="flagship-dot"
              style={{
                width: activeIndex === i ? "24px" : "8px",
                height: "8px",
                background: activeIndex === i ? "#B45309" : "#E5DAC4",
                opacity: activeIndex === i ? 1 : 0.4,
                borderRadius: "100px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .flagship-track { scrollbar-width: none; -ms-overflow-style: none; }
        .flagship-track::-webkit-scrollbar { display: none; }

        .flagship-card-wrapper { width: clamp(320px, 38vw, 460px); }

        .flagship-header-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: end;
          max-width: 1400px;
          margin: 0 auto;
        }

        .flagship-dot:focus-visible { outline: 2px solid #B45309; outline-offset: 2px; }
        .flagship-nav-btn:focus-visible { outline: 2px solid #B45309; outline-offset: 2px; }
        button[disabled].flagship-nav-btn { opacity: 0.25; pointer-events: none; }

        @media (max-width: 1279px) {
          .flagship-card-wrapper { width: clamp(300px, 75vw, 380px); }
        }

        @media (max-width: 767px) {
          .flagship-card-wrapper { width: 86vw; }
          .flagship-nav-btn { display: none !important; }
          .flagship-track { padding: 8px 16px 24px !important; }
          #realisations { padding: 80px 0 !important; }
          .flagship-header { padding: 0 24px !important; }
          .flagship-header-inner {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .flagship-header-inner {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .flagship-track { scroll-behavior: auto; }
          .flagship-dot, .flagship-nav-btn { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
