"use client";

// ============================================================
// AI Marketing GPS — Maya Chat Widget v2
// File: src/components/MarketIntelChat.tsx
//
// Replace the previous version with this file.
// Requires:
//   /src/app/api/chat/route.ts   — Claude API route
//   /src/app/api/tts/route.ts    — ElevenLabs TTS route
//   ANTHROPIC_API_KEY            — Vercel env var
//   ELEVENLABS_API_KEY           — Vercel env var
// ============================================================

import { useState, useRef, useEffect, KeyboardEvent } from "react";

type Role = "user" | "assistant";

interface Message {
  role: Role;
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What's the best free tool for short-form video?",
  "Compare HeyGen vs Synthesia for SMBs",
  "How do I repurpose my podcast into social content?",
  "What AI tools work best together for content marketing?",
  "What changed with Canva AI recently?",
];

function formatMessage(text: string) {
  let f = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  f = f.replace(
    /(https?:\/\/[^\s,)]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="maya-link">$1</a>'
  );
  f = f.replace(
    /Market Intel Ep(\d+)/gi,
    '<span class="maya-badge">🎙 Market Intel Ep$1</span>'
  );
  f = f.replace(
    /Episode (\d+)/gi,
    '<span class="maya-badge">🎙 Ep$1</span>'
  );
  f = f.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>");
  return `<p>${f}</p>`;
}

export default function MarketIntelChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  async function speakText(text: string) {
    if (!voiceOn) return;
    try {
      setSpeaking(true);
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) { setSpeaking(false); return; }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => { setSpeaking(false); URL.revokeObjectURL(url); };
      audio.onerror = () => setSpeaking(false);
      audio.play();
    } catch {
      setSpeaking(false);
    }
  }

  function stopSpeaking() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setSpeaking(false);
  }

  async function send(text?: string) {
    const query = (text ?? input).trim();
    if (!query || loading) return;

    const userMsg: Message = { role: "user", content: query };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    stopSpeaking();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      const reply = data.message || "Something went wrong — try again.";
      const assistantMsg: Message = { role: "assistant", content: reply };
      setMessages((prev) => [...prev, assistantMsg]);
      speakText(reply);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection issue. Please try again." },
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
        @import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@400;600;700;900&display=swap');

        .maya-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          font-family: 'Gothic A1', sans-serif;
        }

        .maya-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #f37021;
          border: none;
          color: #fff;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(243,112,33,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
          margin-left: auto;
        }

        .maya-toggle:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 28px rgba(243,112,33,0.5);
        }

        .maya-panel {
          width: 380px;
          height: 560px;
          background: #ffffff;
          border: 1.5px solid #cdb39b;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 12px 48px rgba(59,101,138,0.18);
          margin-bottom: 12px;
          animation: maya-rise 0.22s cubic-bezier(0.34,1.56,0.64,1);
        }

        @keyframes maya-rise {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .maya-header {
          background: #3b658a;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .maya-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #f37021;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 16px;
          color: #fff;
          flex-shrink: 0;
          letter-spacing: -0.5px;
        }

        .maya-header-info {
          flex: 1;
          margin-left: 10px;
        }

        .maya-name {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.02em;
        }

        .maya-status {
          font-size: 10px;
          color: #cdb39b;
          margin-top: 1px;
          font-weight: 400;
        }

        .maya-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .maya-voice-btn {
          background: none;
          border: 1.5px solid rgba(205,179,155,0.5);
          border-radius: 20px;
          color: #cdb39b;
          font-size: 13px;
          padding: 3px 10px;
          cursor: pointer;
          font-family: inherit;
          font-weight: 600;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .maya-voice-btn.active {
          background: rgba(243,112,33,0.2);
          border-color: #f37021;
          color: #f37021;
        }

        .maya-voice-btn:hover {
          border-color: #f37021;
          color: #f37021;
        }

        .maya-close {
          background: none;
          border: none;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          font-size: 20px;
          padding: 0;
          line-height: 1;
          transition: color 0.15s;
        }

        .maya-close:hover { color: #fff; }

        .maya-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #fdf9f6;
        }

        .maya-messages::-webkit-scrollbar { width: 3px; }
        .maya-messages::-webkit-scrollbar-track { background: transparent; }
        .maya-messages::-webkit-scrollbar-thumb { background: #cdb39b; border-radius: 2px; }

        .maya-empty {
          display: flex;
          flex-direction: column;
        }

        .maya-greeting {
          background: #3b658a;
          border-radius: 12px 12px 12px 2px;
          padding: 12px 14px;
          margin-bottom: 14px;
        }

        .maya-greeting-text {
          font-size: 13px;
          color: #ffffff;
          line-height: 1.6;
          font-weight: 400;
        }

        .maya-greeting-text strong {
          color: #f37021;
        }

        .maya-suggestions-label {
          font-size: 10px;
          font-weight: 700;
          color: #52575b;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .maya-suggestions {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .maya-suggestion {
          background: #fff;
          border: 1.5px solid #cdb39b;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 12px;
          color: #3b658a;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s;
          font-family: inherit;
          font-weight: 600;
          line-height: 1.4;
        }

        .maya-suggestion:hover {
          background: #3b658a;
          border-color: #3b658a;
          color: #fff;
        }

        .maya-msg {
          display: flex;
          flex-direction: column;
        }

        .maya-msg-user { align-items: flex-end; }
        .maya-msg-assistant { align-items: flex-start; }

        .maya-bubble {
          max-width: 90%;
          padding: 10px 13px;
          border-radius: 12px;
          font-size: 13px;
          line-height: 1.65;
          word-break: break-word;
        }

        .maya-bubble-user {
          background: #3b658a;
          color: #fff;
          border-radius: 12px 12px 2px 12px;
          font-weight: 600;
        }

        .maya-bubble-assistant {
          background: #fff;
          color: #52575b;
          border: 1.5px solid #cdb39b;
          border-radius: 12px 12px 12px 2px;
        }

        .maya-bubble-assistant p {
          margin: 0 0 8px;
        }

        .maya-bubble-assistant p:last-child { margin-bottom: 0; }

        .maya-link {
          color: #f37021;
          text-decoration: underline;
          text-underline-offset: 2px;
          word-break: break-all;
          font-weight: 600;
        }

        .maya-badge {
          display: inline-block;
          background: rgba(59,101,138,0.08);
          border: 1px solid rgba(59,101,138,0.2);
          border-radius: 4px;
          padding: 1px 7px;
          font-size: 10px;
          color: #3b658a;
          font-weight: 700;
          margin: 0 2px;
          white-space: nowrap;
        }

        .maya-typing {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 12px 14px;
          background: #fff;
          border: 1.5px solid #cdb39b;
          border-radius: 12px 12px 12px 2px;
          width: fit-content;
        }

        .maya-dot {
          width: 7px;
          height: 7px;
          background: #cdb39b;
          border-radius: 50%;
          animation: maya-bounce 1.2s infinite ease-in-out;
        }

        .maya-dot:nth-child(2) { animation-delay: 0.2s; background: #3b658a; }
        .maya-dot:nth-child(3) { animation-delay: 0.4s; background: #f37021; }

        @keyframes maya-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }

        .maya-speaking-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: #f37021;
          font-weight: 700;
          margin-top: 4px;
          padding-left: 2px;
          letter-spacing: 0.04em;
        }

        .maya-speaking-dot {
          width: 6px;
          height: 6px;
          background: #f37021;
          border-radius: 50%;
          animation: maya-pulse 1s infinite;
        }

        @keyframes maya-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        .maya-footer {
          border-top: 1.5px solid #e8ddd4;
          padding: 12px;
          background: #fff;
          flex-shrink: 0;
        }

        .maya-input-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .maya-input {
          flex: 1;
          background: #fdf9f6;
          border: 1.5px solid #cdb39b;
          border-radius: 10px;
          padding: 10px 13px;
          font-size: 13px;
          font-family: inherit;
          color: #52575b;
          resize: none;
          outline: none;
          max-height: 90px;
          line-height: 1.5;
          transition: border-color 0.15s;
          font-weight: 400;
        }

        .maya-input:focus { border-color: #3b658a; }
        .maya-input::placeholder { color: #bba99a; }

        .maya-send {
          background: #f37021;
          border: none;
          color: #fff;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 16px;
          transition: background 0.15s, transform 0.1s;
          font-weight: 900;
        }

        .maya-send:hover { background: #d45f18; transform: scale(1.05); }
        .maya-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

        .maya-powered {
          text-align: center;
          font-size: 9px;
          color: #bba99a;
          margin-top: 8px;
          letter-spacing: 0.05em;
          font-weight: 600;
          text-transform: uppercase;
        }

        @media (max-width: 480px) {
          .maya-panel { width: calc(100vw - 32px); }
          .maya-widget { right: 16px; }
        }
      `}</style>

      <div className="maya-widget">
        {isOpen && (
          <div className="maya-panel">
            {/* Header */}
            <div className="maya-header">
              <div className="maya-avatar">M</div>
              <div className="maya-header-info">
                <div className="maya-name">Maya</div>
                <div className="maya-status">AI Marketing GPS · 150 tools indexed</div>
              </div>
              <div className="maya-header-actions">
                <button
                  className={`maya-voice-btn ${voiceOn ? "active" : ""}`}
                  onClick={() => {
                    if (voiceOn) stopSpeaking();
                    setVoiceOn((v) => !v);
                  }}
                  title={voiceOn ? "Turn off voice" : "Turn on voice"}
                >
                  {voiceOn ? "🔊" : "🔇"}
                </button>
                <button className="maya-close" onClick={() => { setIsOpen(false); stopSpeaking(); }}>
                  ×
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="maya-messages">
              {isEmpty ? (
                <div className="maya-empty">
                  <div className="maya-greeting">
                    <div className="maya-greeting-text">
                      Hey! I'm <strong>Maya</strong> — your AI tool guide. Tell me what you're trying to do and I'll point you to the right tools. No fluff, no paid placements.
                    </div>
                  </div>
                  <div className="maya-suggestions-label">Try asking me…</div>
                  <div className="maya-suggestions">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button key={q} className="maya-suggestion" onClick={() => send(q)}>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <div key={i} className={`maya-msg maya-msg-${msg.role}`}>
                      <div className={`maya-bubble maya-bubble-${msg.role}`}>
                        {msg.role === "assistant" ? (
                          <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                        ) : (
                          msg.content
                        )}
                      </div>
                      {msg.role === "assistant" && speaking && i === messages.length - 1 && (
                        <div className="maya-speaking-indicator">
                          <div className="maya-speaking-dot" />
                          Maya is speaking…
                        </div>
                      )}
                    </div>
                  ))}
                  {loading && (
                    <div className="maya-msg maya-msg-assistant">
                      <div className="maya-typing">
                        <div className="maya-dot" />
                        <div className="maya-dot" />
                        <div className="maya-dot" />
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="maya-footer">
              <div className="maya-input-row">
                <textarea
                  ref={inputRef}
                  className="maya-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about tools, pricing, workflows…"
                  rows={1}
                />
                <button
                  className="maya-send"
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                >
                  ↑
                </button>
              </div>
              <div className="maya-powered">Powered by Claude · AI Marketing GPS</div>
            </div>
          </div>
        )}

        {/* Toggle */}
        <button className="maya-toggle" onClick={() => { setIsOpen((o) => !o); if (isOpen) stopSpeaking(); }}>
          {isOpen ? "×" : "🧭"}
        </button>
      </div>
    </>
  );
}
