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

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    track("chatbot_question", {
      question: text.slice(0, 100),
      timestamp: new Date().toISOString(),
    });

    const userMsg: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const apiMessages = updatedMessages
        .filter((m) => m !== INITIAL_MESSAGE)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue.");
        if (data.rateLimited) setRemaining(0);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
        if (typeof data.remaining === "number") setRemaining(data.remaining);
      }
    } catch {
      setError("Impossible de contacter le service. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
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
          background: #0A1628;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(10,22,40,0.35);
          z-index: 1000;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .chatbot-btn:hover {
          transform: scale(1.07);
          box-shadow: 0 6px 28px rgba(10,22,40,0.45);
        }
        .chatbot-modal {
          position: fixed;
          bottom: 96px;
          right: 28px;
          width: 400px;
          max-width: calc(100vw - 40px);
          height: 560px;
          max-height: calc(100vh - 120px);
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 8px 40px rgba(10,22,40,0.25);
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
          background: #0A1628;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .chat-header-title {
          font-family: var(--font-sans, sans-serif);
          font-size: 14px;
          font-weight: 600;
          color: #F5EFE6;
          letter-spacing: 0.02em;
        }
        .chat-header-sub {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          color: #B45309;
          letter-spacing: 0.08em;
          margin-top: 2px;
          text-transform: uppercase;
        }
        .chat-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #F5EFE6;
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
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 2px; }
        .msg-bubble {
          max-width: 84%;
          padding: 10px 14px;
          border-radius: 12px;
          font-family: var(--font-sans, sans-serif);
          font-size: 13.5px;
          line-height: 1.55;
        }
        .msg-assistant {
          background: #F8F8F6;
          color: #1e293b;
          align-self: flex-start;
          border-bottom-left-radius: 4px;
        }
        .msg-user {
          background: #0A1628;
          color: #F5EFE6;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }
        .msg-error {
          background: #fef2f2;
          color: #b91c1c;
          align-self: flex-start;
          border-bottom-left-radius: 4px;
          font-size: 13px;
        }
        .chat-typing {
          align-self: flex-start;
          display: flex;
          gap: 4px;
          padding: 12px 14px;
          background: #F8F8F6;
          border-radius: 12px;
          border-bottom-left-radius: 4px;
        }
        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #94a3b8;
          animation: bounce 1.2s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        .chat-input-area {
          border-top: 1px solid #f1f5f9;
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
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px 12px;
          font-family: var(--font-sans, sans-serif);
          font-size: 13.5px;
          color: #1e293b;
          outline: none;
          min-height: 38px;
          max-height: 100px;
          line-height: 1.4;
          transition: border-color 0.15s;
        }
        .chat-textarea:focus { border-color: #0A1628; }
        .chat-textarea::placeholder { color: #94a3b8; }
        .chat-send-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #0A1628;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.15s;
        }
        .chat-send-btn:hover:not(:disabled) { background: #1a2f4a; }
        .chat-send-btn:disabled { background: #cbd5e1; cursor: default; }
        .chat-footer {
          padding: 6px 16px 10px;
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          color: #94a3b8;
          letter-spacing: 0.04em;
          text-align: center;
          line-height: 1.4;
        }
        /* Markdown rendering */
        .md p { margin-bottom: 0.5em; }
        .md p:last-child { margin-bottom: 0; }
        .md strong { font-weight: 600; color: #0A1628; }
        .md em { font-style: italic; color: #B45309; }
        .md ul { list-style: disc; padding-left: 1.2em; margin-bottom: 0.5em; }
        .md ol { list-style: decimal; padding-left: 1.2em; margin-bottom: 0.5em; }
        .md li { margin-bottom: 0.2em; line-height: 1.5; }
        .md h1, .md h2, .md h3 {
          font-family: var(--font-serif, serif);
          font-weight: 600;
          color: #0A1628;
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
        .md thead { background: #F5EFE6; }
        .md th {
          text-align: left;
          padding: 5px 8px;
          font-weight: 600;
          color: #0A1628;
          border-bottom: 1px solid rgba(10,22,40,0.15);
        }
        .md td {
          padding: 5px 8px;
          color: #1e293b;
          border-bottom: 1px solid rgba(10,22,40,0.07);
        }
        .md tr:last-child td { border-bottom: none; }
        .md code {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          padding: 1px 5px;
          border-radius: 4px;
          background: #F5EFE6;
          color: #B45309;
        }
        .md a { color: #B45309; text-decoration: underline; }
        .md blockquote {
          border-left: 2px solid #B45309;
          padding-left: 10px;
          margin: 0.4em 0;
          font-style: italic;
          color: #475569;
        }
        @media (max-width: 480px) {
          .chatbot-btn { bottom: 20px; right: 16px; }
          .chatbot-modal { right: 16px; bottom: 88px; width: calc(100vw - 32px); }
        }
      `}</style>

      {/* Floating button */}
      <button
        className="chatbot-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="#F5EFE6" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4 7h14M4 11h10M4 15h7" stroke="#F5EFE6" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="19" cy="18" r="3" fill="#B45309"/>
          </svg>
        )}
      </button>

      {/* Modal */}
      {open && (
        <div className="chatbot-modal" role="dialog" aria-label="Assistant IA de Carlos Hounsinou">
          <div className="chat-header">
            <div>
              <div className="chat-header-title">Assistant IA · Carlos Hounsinou</div>
              <div className="chat-header-sub">Parcours · Expertise · Réalisations</div>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Fermer">
              ×
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`msg-bubble ${msg.role === "user" ? "msg-user" : "msg-assistant"}`}
              >
                {msg.role === "user" ? (
                  msg.content
                ) : (
                  <div className="md">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
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
            <div ref={messagesEndRef} />
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
                  <path d="M2 8h12M10 4l4 4-4 4" stroke="#F5EFE6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
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
