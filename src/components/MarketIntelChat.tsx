"use client";

// ============================================================
// AI Marketing GPS — Lonnie Chat Widget v3
// File: src/components/MarketIntelChat.tsx
//
// Changes from v2:
//   - Name: Lonnie (not Maya)
//   - Icon: chat bubble instead of compass
//   - Voice: capped at 300 chars for natural pacing
//   - Voice: visible STOP button while speaking
//   - Tone: casual, short responses, always asks a question
// ============================================================

import { useState, useRef, useEffect, KeyboardEvent } from "react";

type Role = "user" | "assistant";

interface Message {
  role: Role;
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What's the best free tool for short-form video?",
  "How do I repurpose my podcast into social content?",
  "Compare HeyGen vs Synthesia — which one's worth it?",
  "What AI tools actually work well together?",
  "⚡ HELP ME WRITE AN AI PROMPT",
];

function formatMessage(text: string) {
  let f = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  f = f.replace(
    /(https?:\/\/[^\s,)]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="lonnie-link">$1</a>'
  );
  f = f.replace(
    /Market Intel Ep(\d+)/gi,
    '<span class="lonnie-badge">🎙 Market Intel Ep$1</span>'
  );
  f = f.replace(/Episode (\d+)/gi, '<span class="lonnie-badge">🎙 Ep$1</span>');
  f = f.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>");
  return `<p>${f}</p>`;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/https?:\/\/[^\s,)]+/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/#{1,6}\s/g, "")
    .replace(/[-*]\s/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function MarketIntelChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  // Show nudge bubble after 5 seconds, hide after 8 seconds
  useEffect(() => {
    if (isOpen) { setShowNudge(false); return; }
    const showTimer = setTimeout(() => setShowNudge(true), 4000);
    const hideTimer = setTimeout(() => setShowNudge(false), 24000);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, [isOpen]);

  function stopSpeaking() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setSpeaking(false);
  }

  async function speakText(text: string) {
    if (!voiceOn) return;
    try {
      setSpeaking(true);

      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok || !res.body) { setSpeaking(false); return; }

      // Stream audio chunks via MediaSource API
      const mediaSource = new MediaSource();
      const url = URL.createObjectURL(mediaSource);

      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(url);
      audioRef.current = audio;
      audio.play();

      mediaSource.addEventListener("sourceopen", async () => {
        let sourceBuffer: SourceBuffer;
        try {
          sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
        } catch {
          // Fallback: buffer entire response if MediaSource fails
          const blob = await res.clone().blob().catch(() => null);
          if (!blob) { setSpeaking(false); URL.revokeObjectURL(url); return; }
          const fallbackUrl = URL.createObjectURL(blob);
          const fallback = new Audio(fallbackUrl);
          audioRef.current = fallback;
          fallback.onended = () => { setSpeaking(false); URL.revokeObjectURL(fallbackUrl); };
          fallback.onerror = () => setSpeaking(false);
          fallback.play();
          return;
        }

        const reader = res.body!.getReader();
        const pump = async (): Promise<void> => {
          const { done, value } = await reader.read();
          if (done) {
            if (!sourceBuffer.updating) {
              mediaSource.endOfStream();
            } else {
              sourceBuffer.addEventListener("updateend", () => {
                mediaSource.endOfStream();
              }, { once: true });
            }
            return;
          }
          if (sourceBuffer.updating) {
            await new Promise<void>((r) =>
              sourceBuffer.addEventListener("updateend", () => r(), { once: true })
            );
          }
          sourceBuffer.appendBuffer(value);
          await pump();
        };

        sourceBuffer.addEventListener("updateend", () => {}, { once: true });
        await pump().catch(() => {
          try { mediaSource.endOfStream("decode"); } catch {}
          setSpeaking(false);
        });
      });

      audio.onended = () => { setSpeaking(false); URL.revokeObjectURL(url); };
      audio.onerror = () => { setSpeaking(false); URL.revokeObjectURL(url); };

    } catch {
      setSpeaking(false);
    }
  }

  function copyPrompt(promptText: string, promptId: string) {
    navigator.clipboard.writeText(promptText).then(() => {
      setCopiedPrompt(promptId);
      setTimeout(() => setCopiedPrompt(null), 2000);
    });
  }

  function renderMessageContent(content: string, messageIndex: number) {
    const promptStart = content.indexOf("---PROMPT START---");
    const promptEnd = content.indexOf("---PROMPT END---");

    if (promptStart !== -1 && promptEnd !== -1) {
      const beforePrompt = content.substring(0, promptStart).trim();
      const promptText = content.substring(promptStart + 18, promptEnd).trim();
      const afterPrompt = content.substring(promptEnd + 17).trim();
      const promptId = `prompt-${messageIndex}`;

      return (
        <>
          {beforePrompt && (
            <div dangerouslySetInnerHTML={{ __html: formatMessage(beforePrompt) }} />
          )}
          <div className="lonnie-prompt-card">
            <button
              className={`lonnie-prompt-copy-btn ${copiedPrompt === promptId ? 'copied' : ''}`}
              onClick={() => copyPrompt(promptText, promptId)}
            >
              {copiedPrompt === promptId ? 'Copied! ✓' : 'Copy Prompt'}
            </button>
            <div className="lonnie-prompt-text">
              {promptText}
            </div>
          </div>
          {afterPrompt && (
            <div dangerouslySetInnerHTML={{ __html: formatMessage(afterPrompt) }} />
          )}
        </>
      );
    }

    return <div dangerouslySetInnerHTML={{ __html: formatMessage(content) }} />;
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
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      speakText(reply);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection issue. Try again in a sec." },
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

        .lonnie-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          font-family: 'Gothic A1', sans-serif;
        }

        .lonnie-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #f37021;
          border: none;
          color: #fff;
          font-size: 26px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(243,112,33,0.45);
          transition: transform 0.2s, box-shadow 0.2s;
          margin-left: auto;
        }

        .lonnie-toggle:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 28px rgba(243,112,33,0.55);
        }

        .lonnie-panel {
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
          animation: lonnie-rise 0.22s cubic-bezier(0.34,1.56,0.64,1);
        }

        @keyframes lonnie-rise {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .lonnie-header {
          background: #3b658a;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .lonnie-avatar {
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
        }

        .lonnie-header-info {
          flex: 1;
          margin-left: 10px;
        }

        .lonnie-name {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
        }

        .lonnie-status {
          font-size: 10px;
          color: #cdb39b;
          margin-top: 1px;
          font-weight: 400;
        }

        .lonnie-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .lonnie-voice-btn {
          background: none;
          border: 1.5px solid rgba(205,179,155,0.5);
          border-radius: 20px;
          color: #cdb39b;
          font-size: 11px;
          padding: 4px 10px;
          cursor: pointer;
          font-family: inherit;
          font-weight: 700;
          transition: all 0.15s;
          letter-spacing: 0.03em;
          white-space: nowrap;
        }

        .lonnie-voice-btn.speaking {
          background: rgba(243,112,33,0.15);
          border-color: #f37021;
          color: #f37021;
          animation: lonnie-pulse-border 1.5s infinite;
        }

        .lonnie-voice-btn.on {
          border-color: rgba(205,179,155,0.5);
          color: #cdb39b;
        }

        .lonnie-voice-btn.off {
          border-color: rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.35);
        }

        @keyframes lonnie-pulse-border {
          0%, 100% { border-color: #f37021; }
          50% { border-color: rgba(243,112,33,0.4); }
        }

        .lonnie-close {
          background: none;
          border: none;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          font-size: 20px;
          padding: 0;
          line-height: 1;
          transition: color 0.15s;
        }

        .lonnie-close:hover { color: #fff; }

        .lonnie-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #fdf9f6;
        }

        .lonnie-messages::-webkit-scrollbar { width: 3px; }
        .lonnie-messages::-webkit-scrollbar-track { background: transparent; }
        .lonnie-messages::-webkit-scrollbar-thumb { background: #cdb39b; border-radius: 2px; }

        .lonnie-greeting {
          background: #3b658a;
          border-radius: 12px 12px 12px 2px;
          padding: 12px 14px;
          margin-bottom: 14px;
        }

        .lonnie-greeting-text {
          font-size: 13px;
          color: #ffffff;
          line-height: 1.65;
          font-weight: 400;
        }

        .lonnie-greeting-text strong {
          color: #f37021;
        }

        .lonnie-suggestions-label {
          font-size: 10px;
          font-weight: 700;
          color: #52575b;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .lonnie-suggestions {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .lonnie-suggestion {
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

        .lonnie-suggestion:hover {
          background: #3b658a;
          border-color: #3b658a;
          color: #fff;
        }

        .lonnie-suggestion-cta {
          background: #f37021 !important;
          border-color: #f37021 !important;
          color: #fff !important;
          font-weight: 700 !important;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 13px !important;
          text-align: center !important;
        }

        .lonnie-suggestion-cta:hover {
          background: #d45f18 !important;
          border-color: #d45f18 !important;
          color: #fff !important;
        }

        /* ── Prompt card: scrollable, copy button always visible ── */
        .lonnie-prompt-card {
          background: #2d2d2d;
          border: 1.5px solid #cdb39b;
          border-radius: 8px;
          padding: 16px;
          margin: 8px 0;
          position: relative;
          word-break: break-word;
        }

        .lonnie-prompt-text {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          line-height: 1.6;
          color: #e0e0e0;
          white-space: pre-wrap;
          word-break: break-word;
          max-height: 280px;
          overflow-y: auto;
          padding-top: 36px;
          padding-right: 4px;
        }

        .lonnie-prompt-text::-webkit-scrollbar { width: 3px; }
        .lonnie-prompt-text::-webkit-scrollbar-track { background: transparent; }
        .lonnie-prompt-text::-webkit-scrollbar-thumb { background: #cdb39b; border-radius: 2px; }

        .lonnie-prompt-copy-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #f37021;
          border: none;
          color: #fff;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'Gothic A1', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          z-index: 1;
        }

        .lonnie-prompt-copy-btn:hover {
          background: #d45f18;
        }

        .lonnie-prompt-copy-btn.copied {
          background: #3b658a;
        }

        .lonnie-msg {
          display: flex;
          flex-direction: column;
        }

        .lonnie-msg-user { align-items: flex-end; }
        .lonnie-msg-assistant { align-items: flex-start; }

        .lonnie-bubble {
          max-width: 90%;
          padding: 10px 13px;
          border-radius: 12px;
          font-size: 13px;
          line-height: 1.65;
          word-break: break-word;
        }

        .lonnie-bubble-user {
          background: #3b658a;
          color: #fff;
          border-radius: 12px 12px 2px 12px;
          font-weight: 600;
        }

        .lonnie-bubble-assistant {
          background: #fff;
          color: #52575b;
          border: 1.5px solid #cdb39b;
          border-radius: 12px 12px 12px 2px;
        }

        .lonnie-bubble-assistant p { margin: 0 0 8px; }
        .lonnie-bubble-assistant p:last-child { margin-bottom: 0; }

        .lonnie-link {
          color: #f37021;
          text-decoration: underline;
          text-underline-offset: 2px;
          word-break: break-all;
          font-weight: 600;
        }

        .lonnie-badge {
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

        .lonnie-typing {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 12px 14px;
          background: #fff;
          border: 1.5px solid #cdb39b;
          border-radius: 12px 12px 12px 2px;
          width: fit-content;
        }

        .lonnie-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          animation: lonnie-bounce 1.2s infinite ease-in-out;
        }

        .lonnie-dot:nth-child(1) { background: #cdb39b; }
        .lonnie-dot:nth-child(2) { background: #3b658a; animation-delay: 0.2s; }
        .lonnie-dot:nth-child(3) { background: #f37021; animation-delay: 0.4s; }

        @keyframes lonnie-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }

        .lonnie-footer {
          border-top: 1.5px solid #e8ddd4;
          padding: 12px;
          background: #fff;
          flex-shrink: 0;
        }

        .lonnie-input-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .lonnie-input {
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
        }

        .lonnie-input:focus { border-color: #3b658a; }
        .lonnie-input::placeholder { color: #bba99a; }

        .lonnie-send {
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

        .lonnie-send:hover { background: #d45f18; transform: scale(1.05); }
        .lonnie-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

        .lonnie-powered {
          text-align: center;
          font-size: 9px;
          color: #bba99a;
          margin-top: 8px;
          letter-spacing: 0.05em;
          font-weight: 600;
          text-transform: uppercase;
        }

        @media (max-width: 480px) {
          .lonnie-panel { width: calc(100vw - 32px); }
          .lonnie-widget { right: 16px; }
        }

        .lonnie-nudge {
          position: absolute;
          bottom: 76px;
          right: 0;
          background: #3b658a;
          border: 2px solid #f37021;
          border-radius: 16px 16px 2px 16px;
          padding: 16px 20px;
          font-size: 14px;
          color: #ffffff;
          font-weight: 700;
          white-space: nowrap;
          box-shadow: 0 8px 32px rgba(59,101,138,0.35), 0 0 0 4px rgba(243,112,33,0.15);
          animation: nudge-in 0.4s cubic-bezier(0.34,1.56,0.64,1);
          cursor: pointer;
          font-family: inherit;
          display: flex;
          align-items: center;
          gap: 10px;
          letter-spacing: 0.01em;
        }

        .lonnie-nudge:hover {
          background: #f37021;
          border-color: #f37021;
          transform: scale(1.03);
          transition: all 0.15s;
        }

        .lonnie-nudge-dot {
          width: 10px;
          height: 10px;
          background: #f37021;
          border-radius: 50%;
          animation: nudge-pulse 1s infinite;
          flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(243,112,33,0.3);
        }

        .lonnie-nudge:hover .lonnie-nudge-dot {
          background: #fff;
          box-shadow: 0 0 0 3px rgba(255,255,255,0.3);
        }

        @keyframes nudge-in {
          from { opacity: 0; transform: translateY(8px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes nudge-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.6); }
        }
      `}</style>

      <div className="lonnie-widget">
        {isOpen && (
          <div className="lonnie-panel">
            {/* Header */}
            <div className="lonnie-header">
              <div className="lonnie-avatar">L</div>
              <div className="lonnie-header-info">
                <div className="lonnie-name">Lonnie</div>
                <div className="lonnie-status">AI Marketing GPS · 150 tools indexed</div>
              </div>
              <div className="lonnie-header-actions">
                {speaking ? (
                  <button
                    className="lonnie-voice-btn speaking"
                    onClick={stopSpeaking}
                  >
                    ■ STOP
                  </button>
                ) : (
                  <button
                    className={`lonnie-voice-btn ${voiceOn ? "on" : "off"}`}
                    onClick={() => setVoiceOn((v) => !v)}
                  >
                    {voiceOn ? "🔊 Voice on" : "🔇 Voice off"}
                  </button>
                )}
                <button
                  className="lonnie-close"
                  onClick={() => { setIsOpen(false); stopSpeaking(); }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="lonnie-messages">
              {isEmpty ? (
                <>
                  <div className="lonnie-greeting">
                    <div className="lonnie-greeting-text">
                      Hey — I'm <strong>Lonnie</strong>. Tell me what you're trying to do and I'll cut through the noise and point you somewhere useful. What's the goal?
                    </div>
                  </div>
                  <div className="lonnie-suggestions-label">Or pick one of these</div>
                  <div className="lonnie-suggestions">
                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                      <button
                        key={q}
                        className={idx === SUGGESTED_QUESTIONS.length - 1 ? "lonnie-suggestion lonnie-suggestion-cta" : "lonnie-suggestion"}
                        onClick={() => send(q)}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <div key={i} className={`lonnie-msg lonnie-msg-${msg.role}`}>
                      <div className={`lonnie-bubble lonnie-bubble-${msg.role}`}>
                        {msg.role === "assistant" ? (
                          renderMessageContent(msg.content, i)
                        ) : (
                          msg.content
                        )}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="lonnie-msg lonnie-msg-assistant">
                      <div className="lonnie-typing">
                        <div className="lonnie-dot" />
                        <div className="lonnie-dot" />
                        <div className="lonnie-dot" />
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="lonnie-footer">
              <div className="lonnie-input-row">
                <textarea
                  ref={inputRef}
                  className="lonnie-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="What are you trying to do?"
                  rows={1}
                />
                <button
                  className="lonnie-send"
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                >
                  ↑
                </button>
              </div>
              <div className="lonnie-powered">Powered by Claude · AI Marketing GPS</div>
            </div>
          </div>
        )}

        {/* Nudge bubble */}
        {showNudge && !isOpen && (
          <button
            className="lonnie-nudge"
            onClick={() => { setShowNudge(false); setIsOpen(true); }}
          >
            <span className="lonnie-nudge-dot" />
            Not sure where to start? Ask me.
          </button>
        )}

        {/* Toggle — chat bubble */}
        <button
          className="lonnie-toggle"
          onClick={() => { setIsOpen((o) => !o); if (isOpen) stopSpeaking(); setShowNudge(false); }}
          title="Chat with Lonnie"
        >
          {isOpen ? "×" : "💬"}
        </button>
      </div>
    </>
  );
}
