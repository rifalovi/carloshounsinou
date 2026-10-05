"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { track } from "@vercel/analytics";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Bonjour, je suis l'assistant IA développé par Carlos. Je peux répondre à vos questions sur son parcours, ses domaines d'expertise et ses réalisations. Pour échanger directement avec lui, le formulaire Contact reste à votre disposition.",
};

function extractNumberedChoices(content: string): {
  textBefore: string;
  choices: string[];
  textAfter: string;
} | null {
  const lines = content.split("\n");
  let firstChoiceIndex = -1;
  let lastChoiceIndex = -1;
  const choices: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^(\d+)\.\s+(.+)/);
    if (match) {
      const choiceNumber = parseInt(match[1]);
      if (choices.length === 0 && choiceNumber === 1) {
        firstChoiceIndex = i;
      }
      if (choices.length + 1 === choiceNumber) {
        choices.push(match[2].trim());
        lastChoiceIndex = i;
      }
    } else if (choices.length > 0 && lines[i].trim() !== "") {
      break;
    }
  }

  if (choices.length < 2) return null;
  if (choices.some((c) => c.length > 80)) return null;

  return {
    textBefore: lines.slice(0, firstChoiceIndex).join("\n").trim(),
    choices,
    textAfter: lines.slice(lastChoiceIndex + 1).join("\n").trim(),
  };
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Défilement limité au conteneur des messages : scrollIntoView ferait aussi
  // défiler la page derrière la fenêtre sur mobile.
  useEffect(() => {
    const el = messagesRef.current;
    if (open && el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  // Focus automatique sur desktop seulement : sur mobile il ouvrirait le
  // clavier dès l'ouverture de la fenêtre.
  useEffect(() => {
    if (open && inputRef.current && !window.matchMedia("(max-width: 640px)").matches) {
      inputRef.current.focus();
    }
  }, [open]);

  // Mobile : feuille plein écran calée sur le viewport visuel (qui suit le
  // clavier sur iOS, contrairement à 100vh) et page bloquée derrière.
  useEffect(() => {
    if (!open || !window.matchMedia("(max-width: 640px)").matches) return;
    const modal = modalRef.current;
    const vv = window.visualViewport;
    const body = document.body;
    const scrollY = window.scrollY;
    const prev = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    const fit = () => {
      if (!modal || !vv) return;
      modal.style.height = `${vv.height}px`;
      modal.style.top = `${vv.offsetTop}px`;
    };
    fit();
    vv?.addEventListener("resize", fit);
    vv?.addEventListener("scroll", fit);
    return () => {
      vv?.removeEventListener("resize", fit);
      vv?.removeEventListener("scroll", fit);
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo({ top: scrollY, behavior: "instant" });
    };
  }, [open]);

  async function sendMessage(text: string) {
    if (!text || loading) return;

    track("chatbot_question", {
      question: text.slice(0, 100),
      timestamp: new Date().toISOString(),
    });

    const prevMessages = messages;
    const userMsg: Message = { role: "user", content: text };
    setMessages([...prevMessages, userMsg]);
    setLoading(true);
    setError(null);

    try {
      const apiMessages = [...prevMessages, userMsg]
        .filter((m) => m !== INITIAL_MESSAGE)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        // On retire le tour en échec de l'historique pour éviter deux messages
        // "user" consécutifs (rejetés par l'API) et on rend la question à
        // l'utilisateur pour un nouvel essai immédiat.
        setMessages(prevMessages);
        setInput(text);
        setError(data.error || "Une erreur est survenue.");
        if (data.rateLimited) setRemaining(0);
      } else {
        setMessages([
          ...prevMessages,
          userMsg,
          { role: "assistant", content: data.message },
        ]);
        if (typeof data.remaining === "number") setRemaining(data.remaining);
      }
    } catch {
      setMessages(prevMessages);
      setInput(text);
      setError("Impossible de contacter le service. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    await sendMessage(text);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function renderAssistantContent(content: string) {
    const parsed = extractNumberedChoices(content);
    if (parsed) {
      return (
        <div className="md">
          {parsed.textBefore && (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {parsed.textBefore}
            </ReactMarkdown>
          )}
          <div className="choice-buttons">
            {parsed.choices.map((choice, idx) => (
              <button
                key={idx}
                className="choice-button"
                onClick={() => sendMessage(choice)}
                disabled={loading || remaining === 0}
              >
                {choice}
              </button>
            ))}
          </div>
          {parsed.textAfter && (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {parsed.textAfter}
            </ReactMarkdown>
          )}
        </div>
      );
    }
    return (
      <div className="md">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .chatbot-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--sp-bleu-pilotage);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--sp-shadow-btn);
          z-index: 1000;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .chatbot-btn:hover {
          transform: scale(1.07);
          box-shadow: var(--sp-shadow-btn);
        }
        .chatbot-modal {
          position: fixed;
          bottom: 96px;
          right: 28px;
          width: 400px;
          max-width: calc(100vw - 40px);
          height: 560px;
          max-height: calc(100vh - 120px);
          background: var(--sp-blanc);
          border-radius: var(--sp-radius-card);
          box-shadow: 0 8px 40px color-mix(in srgb, var(--sp-bleu-nuit) 25%, transparent);
          z-index: 999;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.2s ease;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .chat-header {
          background: var(--sp-grad-bandeau);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .chat-header-title {
          font-family: var(--sp-font-sans);
          font-size: 14px;
          font-weight: 600;
          color: var(--sp-blanc);
          letter-spacing: 0.02em;
        }
        .chat-header-sub {
          font-family: var(--sp-font-mono);
          font-size: 10px;
          color: var(--sp-or-jalon);
          letter-spacing: 0.08em;
          margin-top: 2px;
          text-transform: uppercase;
        }
        .chat-close {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--sp-blanc);
          padding: 4px;
          opacity: 0.7;
          line-height: 1;
          font-size: 18px;
          transition: opacity 0.1s;
        }
        .chat-close:hover { opacity: 1; }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-thumb { background: var(--sp-ligne); border-radius: 2px; }
        .msg-bubble {
          max-width: 84%;
          padding: 10px 14px;
          border-radius: var(--sp-radius);
          font-family: var(--sp-font-sans);
          font-size: 13.5px;
          line-height: 1.55;
        }
        .msg-assistant {
          background: var(--sp-papier);
          color: var(--sp-texte);
          align-self: flex-start;
          border-bottom-left-radius: 4px;
        }
        .msg-user {
          background: var(--sp-bleu-pilotage);
          color: var(--sp-blanc);
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }
        .msg-error {
          background: var(--sp-rouge-bg);
          color: var(--sp-rouge);
          align-self: flex-start;
          border-bottom-left-radius: 4px;
          font-size: 13px;
        }
        .chat-typing {
          align-self: flex-start;
          display: flex;
          gap: 4px;
          padding: 12px 14px;
          background: var(--sp-papier);
          border-radius: var(--sp-radius);
          border-bottom-left-radius: 4px;
        }
        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--sp-texte-3);
          animation: bounce 1.2s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        .chat-input-area {
          border-top: 1px solid var(--sp-ligne);
          padding: 12px 16px;
          flex-shrink: 0;
        }
        .chat-input-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }
        .chat-textarea {
          flex: 1;
          resize: none;
          border: 1px solid var(--sp-ligne);
          border-radius: var(--sp-radius);
          padding: 8px 12px;
          font-family: var(--sp-font-sans);
          font-size: 13.5px;
          color: var(--sp-texte);
          outline: none;
          min-height: 38px;
          max-height: 100px;
          line-height: 1.4;
          transition: border-color 0.15s;
        }
        .chat-textarea:focus { border-color: var(--sp-bleu-pilotage); }
        .chat-textarea::placeholder { color: var(--sp-texte-3); }
        .chat-send-btn {
          width: 36px;
          height: 36px;
          border-radius: var(--sp-radius);
          background: var(--sp-bleu-pilotage);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.15s;
        }
        .chat-send-btn:hover:not(:disabled) { background: color-mix(in srgb, var(--sp-bleu-pilotage) 75%, var(--sp-bleu-nuit)); }
        .chat-send-btn:disabled { background: var(--sp-gris-clair); cursor: default; }
        .chat-footer {
          padding: 6px 16px 10px;
          font-family: var(--sp-font-mono);
          font-size: 10px;
          color: var(--sp-texte-3);
          letter-spacing: 0.04em;
          text-align: center;
          line-height: 1.4;
        }
        /* Markdown rendering */
        .md p { margin-bottom: 0.5em; }
        .md p:last-child { margin-bottom: 0; }
        .md strong { font-weight: 600; color: var(--sp-bleu-nuit); }
        .md em { font-style: italic; color: var(--sp-bleu-pilotage); }
        .md ul { list-style: disc; padding-left: 1.2em; margin-bottom: 0.5em; }
        .md ol { list-style: decimal; padding-left: 1.2em; margin-bottom: 0.5em; }
        .md li { margin-bottom: 0.2em; line-height: 1.5; }
        .md h1, .md h2, .md h3 {
          font-family: var(--sp-font-sans);
          font-weight: 600;
          color: var(--sp-bleu-nuit);
          margin: 0.6em 0 0.3em;
        }
        .md h1 { font-size: 15px; }
        .md h2 { font-size: 14px; }
        .md h3 { font-size: 13.5px; }
        .md table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
          margin: 0.5em 0;
        }
        .md thead { background: var(--sp-blanc); }
        .md th {
          text-align: left;
          padding: 5px 8px;
          font-weight: 600;
          color: var(--sp-bleu-nuit);
          border-bottom: 1px solid color-mix(in srgb, var(--sp-bleu-nuit) 15%, transparent);
        }
        .md td {
          padding: 5px 8px;
          color: var(--sp-texte);
          border-bottom: 1px solid color-mix(in srgb, var(--sp-bleu-nuit) 7%, transparent);
        }
        .md tr:last-child td { border-bottom: none; }
        .md code {
          font-family: var(--sp-font-mono);
          font-size: 12px;
          padding: 1px 5px;
          border-radius: var(--sp-radius);
          background: var(--sp-blanc);
          color: var(--sp-bleu-pilotage);
        }
        .md a { color: var(--sp-bleu-pilotage); text-decoration: underline; }
        .md blockquote {
          border-left: 2px solid var(--sp-or-jalon);
          padding-left: 10px;
          margin: 0.4em 0;
          font-style: italic;
          color: var(--sp-texte-3);
        }
        .choice-buttons {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin: 8px 0;
        }
        .choice-button {
          background: var(--sp-ciel);
          border: 1px solid color-mix(in srgb, var(--sp-bleu-pilotage) 35%, transparent);
          color: var(--sp-bleu-pilotage);
          padding: 8px 12px;
          border-radius: var(--sp-radius);
          font-size: 12.5px;
          text-align: left;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: var(--sp-font-sans);
          line-height: 1.4;
        }
        .choice-button:hover:not(:disabled) {
          background: color-mix(in srgb, var(--sp-bleu-pilotage) 12%, var(--sp-blanc));
          border-color: color-mix(in srgb, var(--sp-bleu-pilotage) 55%, transparent);
          transform: translateY(-1px);
        }
        .choice-button:active:not(:disabled) { transform: translateY(0); }
        .choice-button:disabled { opacity: 0.5; cursor: default; }
        @media (max-width: 640px) {
          .chatbot-btn { bottom: 20px; right: 16px; }
          .chatbot-btn.is-open { display: none; }
          .chatbot-modal {
            top: 0; left: 0; right: 0; bottom: auto;
            width: 100%; max-width: 100%;
            height: 100dvh; max-height: none;
            border-radius: 0;
            animation: none;
          }
          .chat-textarea { font-size: 16px; }
        }
      `}</style>

      {/* Floating button */}
      <button
        className={`chatbot-btn${open ? " is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="var(--sp-blanc)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4 4.5h14a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-7.5L6 19.5V16H4a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2z" stroke="var(--sp-blanc)" strokeWidth="1.6" strokeLinejoin="round"/>
            <circle cx="15" cy="10.5" r="2" fill="var(--sp-or-jalon)"/>
          </svg>
        )}
      </button>

      {/* Modal */}
      {open && (
        <div ref={modalRef} className="chatbot-modal" role="dialog" aria-label="Assistant IA de Carlos Hounsinou">
          <div className="chat-header">
            <div>
              <div className="chat-header-title">Assistant IA · Carlos Hounsinou</div>
              <div className="chat-header-sub">Parcours · Expertise · Réalisations</div>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Fermer">
              ×
            </button>
          </div>

          <div ref={messagesRef} className="chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`msg-bubble ${msg.role === "user" ? "msg-user" : "msg-assistant"}`}
              >
                {msg.role === "user" ? (
                  msg.content
                ) : (
                  renderAssistantContent(msg.content)
                )}
              </div>
            ))}
            {loading && (
              <div className="chat-typing">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            )}
            {error && (
              <div className="msg-bubble msg-error">{error}</div>
            )}
          </div>

          <div className="chat-input-area">
            <div className="chat-input-row">
              <textarea
                ref={inputRef}
                className="chat-textarea"
                placeholder="Votre question…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading || remaining === 0}
                rows={1}
              />
              <button
                className="chat-send-btn"
                onClick={send}
                disabled={!input.trim() || loading || remaining === 0}
                aria-label="Envoyer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h12M10 4l4 4-4 4" stroke="var(--sp-blanc)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="chat-footer">
            Assistant IA · {remaining !== null ? `${remaining} message${remaining !== 1 ? "s" : ""} restant${remaining !== 1 ? "s" : ""}` : "10 messages/jour"} · Pour échanger : formulaire Contact
          </div>
        </div>
      )}
    </>
  );
}
