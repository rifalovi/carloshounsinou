"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui-custom/SectionLabel";

type FormStrings = {
  step1Label: string; step1Question: string; step1Placeholder: string;
  step2Label: string; step2Question: string; step2Placeholder: string;
  step3Label: string; step3Question: string; step3Chips: string[];
  step4Label: string; step4Question: string; step4Placeholder: string;
  submit: string;
};

type Props = {
  eyebrow: string;
  h2Part1: string;
  h2Emphasis: string;
  h2End: string;
  intro: string;
  email: string;
  phone: string;
  linkedin: string;
  form: FormStrings;
};

export default function Contact({
  eyebrow, h2Part1, h2Emphasis, h2End, intro,
  email, phone, linkedin, form,
}: Props) {
  const channels = [
    { label: "Email", value: email, href: `mailto:${email}` },
    { label: "Téléphone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    { label: "LinkedIn", value: linkedin, href: `https://${linkedin}` },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: "140px 48px",
        background: "#0E1622",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Halo */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, right: 0,
          width: "60%", height: "100%",
          background: "radial-gradient(ellipse at top right, rgba(16,185,129,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "5fr 7fr",
          gap: "80px",
          position: "relative",
          zIndex: 1,
          maxWidth: "1300px",
          margin: "0 auto",
        }}
      >
        {/* Left — text + channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel light>{eyebrow}</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: "clamp(40px, 5.5vw, 76px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#FAF8F1",
              marginBottom: "32px",
            }}
          >
            {h2Part1}{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "#10B981" }}>
              {h2Emphasis}
            </em>
            {h2End}
          </h2>

          <p style={{ fontSize: "16px", color: "rgba(250,248,241,0.7)", lineHeight: 1.7, marginBottom: "40px" }}>
            {intro}
          </p>

          {/* Direct channels */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "36px",
              borderTop: "1px solid rgba(250,248,241,0.1)",
            }}
          >
            {channels.map(({ label, value, href }) => (
              <a
                key={label}
                href={href}
                target={label === "LinkedIn" ? "_blank" : undefined}
                rel={label === "LinkedIn" ? "noopener noreferrer" : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 0",
                  borderBottom: "1px solid rgba(250,248,241,0.06)",
                  textDecoration: "none",
                  transition: "padding-left 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = "8px")}
                onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = "0")}
              >
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#10B981", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500, marginBottom: "2px" }}>
                    {label}
                  </div>
                  <div style={{ fontSize: "15px", color: "#FAF8F1", fontWeight: 500 }}>{value}</div>
                </div>
                <div
                  aria-hidden="true"
                  style={{
                    width: "32px", height: "32px",
                    border: "1px solid rgba(250,248,241,0.2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FAF8F1",
                    fontSize: "12px",
                    transition: "all 0.3s",
                    flexShrink: 0,
                  }}
                >
                  →
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — form (visual only, logic in Session 3) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            background: "#FAF8F1",
            padding: "48px",
            position: "relative",
          }}
        >
          {/* Top accent */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", top: 0, left: 0,
              width: "100%", height: "4px",
              background: "linear-gradient(90deg, #047857, #10B981)",
            }}
          />

          {/* Steps */}
          {[
            { label: form.step1Label, question: form.step1Question, type: "input", placeholder: form.step1Placeholder },
            { label: form.step2Label, question: form.step2Question, type: "input", placeholder: form.step2Placeholder },
            { label: form.step3Label, question: form.step3Question, type: "chips", chips: form.step3Chips },
            { label: form.step4Label, question: form.step4Question, type: "textarea", placeholder: form.step4Placeholder },
          ].map(({ label, question, type, placeholder, chips }, i) => (
            <div key={i} style={{ marginBottom: "36px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "14px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "#047857",
                    fontWeight: 500,
                    background: "#ECFDF5",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    flexShrink: 0,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "18px",
                    color: "#1A2332",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {question}
                </span>
              </div>

              {type === "chips" && chips ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px" }}>
                  {chips.map((chip) => (
                    <span
                      key={chip}
                      style={{
                        padding: "8px 14px",
                        border: "1px solid rgba(15,20,25,0.18)",
                        borderRadius: "100px",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#2C3640",
                        fontFamily: "var(--font-sans)",
                        cursor: "pointer",
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              ) : type === "textarea" ? (
                <div
                  style={{
                    width: "100%",
                    paddingBottom: "14px",
                    borderBottom: "1px solid rgba(15,20,25,0.18)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    color: "#7B8290",
                    fontStyle: "italic",
                  }}
                >
                  {placeholder}
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    paddingBottom: "14px",
                    borderBottom: "1px solid rgba(15,20,25,0.18)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    color: "#7B8290",
                    fontStyle: "italic",
                  }}
                >
                  {placeholder}
                </div>
              )}
            </div>
          ))}

          {/* Submit button */}
          <button
            disabled
            style={{
              width: "100%",
              background: "#1A2332",
              color: "#FAF8F1",
              padding: "18px",
              border: "none",
              borderRadius: "100px",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginTop: "16px",
              opacity: 0.7,
            }}
          >
            {form.submit}
            <span
              style={{
                width: "24px", height: "24px",
                background: "#FAF8F1",
                color: "#1A2332",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
              }}
            >
              →
            </span>
          </button>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #contact > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          #contact { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
