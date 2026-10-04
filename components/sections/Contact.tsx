"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui-custom/SectionLabel";

type FormStrings = {
  step1Label: string; step1Question: string; step1Placeholder: string;
  step2Label: string; step2Question: string; step2Placeholder: string;
  step3Label: string; step3Question: string; step3Chips: string[];
  step4Label: string; step4Question: string; step4Placeholder: string;
  submit: string;
  success: string;
  error: string;
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
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [project, setProject] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const raw = sessionStorage.getItem("contactPrefill");
    if (raw) {
      try {
        const prefill = JSON.parse(raw) as { message?: string; project?: string };
        if (prefill.message) setMessage(prefill.message);
        if (prefill.project) setProject(prefill.project);
      } catch {}
      sessionStorage.removeItem("contactPrefill");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contactEmail) return;
    if (honeypot) { setStatus("success"); return; }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: contactEmail, topic, message, project }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const channels = [
    { label: "Email", value: email, href: `mailto:${email}` },
    { label: "Téléphone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    { label: "LinkedIn", value: linkedin, href: `https://${linkedin}` },
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--sp-ligne)",
    paddingBottom: "12px",
    fontFamily: "var(--sp-font-sans)",
    fontSize: "15px",
    color: "var(--sp-bleu-nuit)",
    outline: "none",
  };

  return (
    <section
      id="contact"
      style={{ padding: "140px 48px", background: "var(--sp-grad-bandeau)", position: "relative", overflow: "hidden" }}
    >
      <div aria-hidden="true" style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "100%", background: "radial-gradient(ellipse at top right, color-mix(in srgb, var(--sp-or-jalon) 6%, transparent) 0%, transparent 60%)", pointerEvents: "none" }}/>

      <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "80px", position: "relative", zIndex: 1, maxWidth: "1300px", margin: "0 auto" }}>
        {/* Left */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }}>
          <SectionLabel light>{eyebrow}</SectionLabel>
          <h2 style={{ fontFamily: "var(--sp-font-sans)", fontWeight: 800, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--sp-blanc)", marginBottom: "32px" }}>
            {h2Part1}{" "}
            <em style={{ fontStyle: "normal", color: "var(--sp-bleu-clair)" }}>{h2Emphasis}</em>
            {h2End}
          </h2>
          <p style={{ fontSize: "16px", color: "color-mix(in srgb, var(--sp-sur-sombre) 70%, transparent)", lineHeight: 1.7, marginBottom: "40px" }}>{intro}</p>
          <div style={{ display: "flex", flexDirection: "column", paddingTop: "36px", borderTop: "1px solid color-mix(in srgb, var(--sp-sur-sombre) 10%, transparent)" }}>
            {channels.map(({ label, value, href }) => (
              <a key={label} href={href}
                target={label === "LinkedIn" ? "_blank" : undefined}
                rel={label === "LinkedIn" ? "noopener noreferrer" : undefined}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0", borderBottom: "1px solid color-mix(in srgb, var(--sp-sur-sombre) 6%, transparent)", textDecoration: "none", transition: "padding-left 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = "8px")}
                onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = "0")}
              >
                <div>
                  <div style={{ fontFamily: "var(--sp-font-mono)", fontSize: "10px", color: "var(--sp-or-jalon)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: "2px" }}>{label}</div>
                  <div style={{ fontSize: "15px", color: "var(--sp-blanc)", fontWeight: 500 }}>{value}</div>
                </div>
                <div aria-hidden="true" style={{ width: "32px", height: "32px", border: "1px solid color-mix(in srgb, var(--sp-sur-sombre) 20%, transparent)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sp-blanc)", fontSize: "12px", transition: "all 0.3s", flexShrink: 0 }}>→</div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: 0.15 }}
          className="contact-form"
          style={{ background: "var(--sp-blanc)", padding: "48px", position: "relative", borderRadius: "var(--sp-radius-card)", boxShadow: "var(--sp-shadow-card)", overflow: "hidden" }}
        >
          <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: "linear-gradient(90deg, var(--sp-or-jalon), var(--sp-or-jalon))" }}/>

          {status === "success" ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", minHeight: "300px" }}>
              <p style={{ fontFamily: "var(--sp-font-sans)", fontSize: "20px", color: "var(--sp-bleu-nuit)", fontWeight: 600, textAlign: "center", lineHeight: 1.6 }}>{form.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Honeypot — invisible to users, bots fill it */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", opacity: 0, height: 0, width: 0, pointerEvents: "none" }}
              />
              {/* Step 1 */}
              <div style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "var(--sp-font-mono)", fontSize: "11px", color: "var(--sp-statut-dev-fg)", fontWeight: 700, background: "var(--sp-statut-dev-bg)", padding: "3px 10px", borderRadius: "var(--sp-radius-pill)", flexShrink: 0 }}>{form.step1Label}</span>
                  <label htmlFor="contact-name" style={{ fontFamily: "var(--sp-font-sans)", fontSize: "18px", color: "var(--sp-bleu-nuit)", fontWeight: 700, letterSpacing: "-0.01em" }}>{form.step1Question}</label>
                </div>
                <input id="contact-name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder={form.step1Placeholder} required autoComplete="name"
                  style={{ ...inputStyle }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--sp-bleu-pilotage)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--sp-ligne)")}
                />
              </div>

              {/* Step 2 */}
              <div style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "var(--sp-font-mono)", fontSize: "11px", color: "var(--sp-statut-dev-fg)", fontWeight: 700, background: "var(--sp-statut-dev-bg)", padding: "3px 10px", borderRadius: "var(--sp-radius-pill)", flexShrink: 0 }}>{form.step2Label}</span>
                  <label htmlFor="contact-email" style={{ fontFamily: "var(--sp-font-sans)", fontSize: "18px", color: "var(--sp-bleu-nuit)", fontWeight: 700, letterSpacing: "-0.01em" }}>{form.step2Question}</label>
                </div>
                <input id="contact-email" name="email" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                  placeholder={form.step2Placeholder} required autoComplete="email"
                  style={{ ...inputStyle }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--sp-bleu-pilotage)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--sp-ligne)")}
                />
              </div>

              {/* Step 3 — chips */}
              <div style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "var(--sp-font-mono)", fontSize: "11px", color: "var(--sp-statut-dev-fg)", fontWeight: 700, background: "var(--sp-statut-dev-bg)", padding: "3px 10px", borderRadius: "var(--sp-radius-pill)", flexShrink: 0 }}>{form.step3Label}</span>
                  <span style={{ fontFamily: "var(--sp-font-sans)", fontSize: "18px", color: "var(--sp-bleu-nuit)", fontWeight: 700, letterSpacing: "-0.01em" }}>{form.step3Question}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {form.step3Chips.map((chip) => (
                    <button key={chip} type="button" onClick={() => setTopic(chip === topic ? "" : chip)}
                      style={{
                        padding: "8px 14px",
                        border: topic === chip ? "1px solid var(--sp-bleu-pilotage)" : "1px solid var(--sp-ligne)",
                        borderRadius: "var(--sp-radius-pill)",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: topic === chip ? "var(--sp-bleu-pilotage)" : "var(--sp-texte-2)",
                        background: topic === chip ? "var(--sp-ciel)" : "transparent",
                        fontFamily: "var(--sp-font-sans)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4 — textarea with prefill */}
              <div style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "var(--sp-font-mono)", fontSize: "11px", color: "var(--sp-statut-dev-fg)", fontWeight: 700, background: "var(--sp-statut-dev-bg)", padding: "3px 10px", borderRadius: "var(--sp-radius-pill)", flexShrink: 0 }}>{form.step4Label}</span>
                  <label htmlFor="contact-message" style={{ fontFamily: "var(--sp-font-sans)", fontSize: "18px", color: "var(--sp-bleu-nuit)", fontWeight: 700, letterSpacing: "-0.01em" }}>{form.step4Question}</label>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={form.step4Placeholder}
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", paddingTop: "4px", borderBottom: "1px solid var(--sp-ligne)" }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--sp-bleu-pilotage)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--sp-ligne)")}
                />
              </div>

              {status === "error" && (
                <p style={{ fontSize: "13px", color: "var(--sp-rouge)", marginBottom: "16px" }}>{form.error}</p>
              )}

              <button type="submit" disabled={status === "sending"}
                className="ds-btn ds-btn-gold"
                style={{ width: "100%", marginTop: "8px", cursor: status === "sending" ? "wait" : "pointer", opacity: status === "sending" ? 0.7 : 1 }}
              >
                {status === "sending" ? "…" : form.submit}
                <span aria-hidden="true" style={{ width: "24px", height: "24px", background: "var(--sp-bleu-nuit)", color: "var(--sp-blanc)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>→</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          #contact { padding: 80px 24px !important; }
        }
        @media (max-width: 480px) {
          .contact-form { padding: 24px !important; }
        }
      `}</style>
    </section>
  );
}
