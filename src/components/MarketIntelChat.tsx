"use client";

// ============================================================
// AI Marketing GPS — Chat Widget
// File: src/components/MarketIntelChat.tsx
//
// Usage: Import and drop anywhere in your Next.js app
//   import MarketIntelChat from "@/components/MarketIntelChat";
//   <MarketIntelChat />
//
// Requires: /src/app/api/chat/route.ts to be present
// Requires: ANTHROPIC_API_KEY in .env.local
// ============================================================

import { useState, useRef, useEffect, KeyboardEvent } from "react";

type Role = "user" | "assistant";

interface Message {
  role: Role;
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What's the best free tool for repurposing podcast episodes?",
  "Compare HeyGen vs Synthesia for SMBs",
  "What changed with Canva AI recently?",
  "Best AI tools for creating vertical video content",
  "How do I get started with AI avatars on a budget?",
];

function formatMessage(text: string) {
  // Bold **text**
  let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Convert URLs to links (tool URLs)
  formatted = formatted.replace(
    /(https?:\/\/[^\s,)]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="gps-link">$1</a>'
  );
  // Episode citation badge — "Ep06" or "Episode 6" pattern
  formatted = formatted.replace(
    /Market Intel Ep(\d+)/g,
    '<span class="gps-badge">🎙 Market Intel Ep$1</span>'
  );
  formatted = formatted.replace(
    /Episode (\d+)/g,
    '<span class="gps-badge">🎙 Ep$1</span>'
  );
  // Line breaks
  formatted = formatted.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>");
  return `<p>${formatted}</p>`;
}

export default function MarketIntelChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  async function send(text?: string) {
    const query = (text ?? input).trim();
    if (!query || loading) return;

    const userMessage: Message = { role: "user", content: query };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });

      const data = await res.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message || "Sorry, something went wrong. Try again.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Check your API key and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <>
      <style>{`
        .gps-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          font-family: 'IBM Plex Mono', 'Courier New', monospace;
        }

        .gps-toggle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #0f0f0f;
          border: 2px solid #333;
          color: #f5f5f0;
          font-size: 22px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          transition: transform 0.2s, background 0.2s;
          margin-left: auto;
        }

        .gps-toggle:hover {
          background: #1a1a1a;
          transform: scale(1.05);
        }

        .gps-panel {
          width: 400px;
          height: 560px;
          background: #fafaf8;
          border: 1.5px solid #d4d4c8;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.15);
          margin-bottom: 12px;
          animation: gps-slide-up 0.2s ease-out;
        }

        @keyframes gps-slide-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .gps-header {
          background: #0f0f0f;
          color: #f5f5f0;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .gps-header-title {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .gps-header-sub {
          font-size: 10px;
          color: #888;
          margin-top: 2px;
          letter-spacing: 0.04em;
        }

        .gps-close {
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
          font-size: 18px;
          padding: 0;
          line-height: 1;
          transition: color 0.15s;
        }

        .gps-close:hover { color: #f5f5f0; }

        .gps-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .gps-messages::-webkit-scrollbar {
          width: 4px;
        }

        .gps-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .gps-messages::-webkit-scrollbar-thumb {
          background: #d4d4c8;
          border-radius: 2px;
        }

        .gps-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 20px 16px 0;
        }

        .gps-empty-title {
          font-size: 13px;
          font-weight: 600;
          color: #0f0f0f;
          margin-bottom: 4px;
          letter-spacing: 0.02em;
        }

        .gps-empty-sub {
          font-size: 11px;
          color: #777;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .gps-suggestions {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .gps-suggestion {
          background: #fff;
          border: 1px solid #e0e0d8;
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 11px;
          color: #444;
          cursor: pointer;
          text-align: left;
          transition: border-color 0.15s, background 0.15s;
          line-height: 1.4;
          font-family: inherit;
        }

        .gps-suggestion:hover {
          border-color: #0f0f0f;
          background: #f0f0eb;
          color: #0f0f0f;
        }

        .gps-msg {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .gps-msg-user {
          align-items: flex-end;
        }

        .gps-msg-assistant {
          align-items: flex-start;
        }

        .gps-bubble {
          max-width: 88%;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 12px;
          line-height: 1.6;
          word-break: break-word;
        }

        .gps-bubble-user {
          background: #0f0f0f;
          color: #f5f5f0;
          border-radius: 8px 8px 2px 8px;
        }

        .gps-bubble-assistant {
          background: #fff;
          color: #1a1a1a;
          border: 1px solid #e0e0d8;
          border-radius: 8px 8px 8px 2px;
        }

        .gps-bubble-assistant p {
          margin: 0 0 8px;
        }

        .gps-bubble-assistant p:last-child {
          margin-bottom: 0;
        }

        .gps-link {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 2px;
          word-break: break-all;
        }

        .gps-badge {
          display: inline-block;
          background: #f0f0eb;
          border: 1px solid #d4d4c8;
          border-radius: 4px;
          padding: 1px 6px;
          font-size: 10px;
          color: #555;
          margin: 0 2px;
          white-space: nowrap;
        }

        .gps-typing {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 10px 12px;
          background: #fff;
          border: 1px solid #e0e0d8;
          border-radius: 8px 8px 8px 2px;
          width: fit-content;
        }

        .gps-dot {
          width: 6px;
          height: 6px;
          background: #bbb;
          border-radius: 50%;
          animation: gps-bounce 1.2s infinite ease-in-out;
        }

        .gps-dot:nth-child(2) { animation-delay: 0.2s; }
        .gps-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes gps-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }

        .gps-footer {
          border-top: 1px solid #e0e0d8;
          padding: 12px;
          background: #fafaf8;
          flex-shrink: 0;
        }

        .gps-input-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .gps-input {
          flex: 1;
          background: #fff;
          border: 1.5px solid #d4d4c8;
          border-radius: 8px;
          padding: 9px 12px;
          font-size: 12px;
          font-family: inherit;
          color: #1a1a1a;
          resize: none;
          outline: none;
          max-height: 90px;
          line-height: 1.5;
          transition: border-color 0.15s;
        }

        .gps-input:focus {
          border-color: #0f0f0f;
        }

        .gps-input::placeholder {
          color: #aaa;
        }

        .gps-send {
          background: #0f0f0f;
          border: none;
          color: #f5f5f0;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.15s, opacity 0.15s;
          font-size: 14px;
        }

        .gps-send:hover { background: #333; }
        .gps-send:disabled { opacity: 0.4; cursor: not-allowed; }

        .gps-powered {
          text-align: center;
          font-size: 9px;
          color: #bbb;
          margin-top: 8px;
          letter-spacing: 0.04em;
        }

        @media (max-width: 480px) {
          .gps-panel {
            width: calc(100vw - 32px);
            right: 0;
          }
          .gps-widget {
            right: 16px;
          }
        }
      `}</style>

      <div className="gps-widget">
        {isOpen && (
          <div className="gps-panel">
            {/* Header */}
            <div className="gps-header">
              <div>
                <div className="gps-header-title">AI Tool Finder</div>
                <div className="gps-header-sub">150 tools · Market Intel indexed</div>
              </div>
              <button className="gps-close" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="gps-messages">
              {isEmpty ? (
                <div className="gps-empty">
                  <div className="gps-empty-title">Find the right AI tool.</div>
                  <div className="gps-empty-sub">
                    Ask about any tool, use case, or workflow. No paid placements — just straight answers.
                  </div>
                  <div className="gps-suggestions">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        className="gps-suggestion"
                        onClick={() => send(q)}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`gps-msg gps-msg-${msg.role}`}
                    >
                      <div className={`gps-bubble gps-bubble-${msg.role}`}>
                        {msg.role === "assistant" ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: formatMessage(msg.content),
                            }}
                          />
                        ) : (
                          msg.content
                        )}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="gps-msg gps-msg-assistant">
                      <div className="gps-typing">
                        <div className="gps-dot" />
                        <div className="gps-dot" />
                        <div className="gps-dot" />
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="gps-footer">
              <div className="gps-input-row">
                <textarea
                  ref={inputRef}
                  className="gps-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about tools, pricing, use cases…"
                  rows={1}
                />
                <button
                  className="gps-send"
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                >
                  ↑
                </button>
              </div>
              <div className="gps-powered">Powered by Claude · AI Marketing GPS</div>
            </div>
          </div>
        )}

        {/* Toggle button */}
        <button className="gps-toggle" onClick={() => setIsOpen((o) => !o)}>
          {isOpen ? "×" : "🧭"}
        </button>
      </div>
    </>
  );
}
