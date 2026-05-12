import { NextRequest } from "next/server";

// ============================================================
// AI Marketing GPS — ElevenLabs TTS Streaming Route
// POST /api/tts
// Streams audio directly from ElevenLabs to browser
// Bypasses Vercel timeout by piping chunks as they arrive
// ENV REQUIRED: ELEVENLABS_API_KEY
// ============================================================

const VOICE_ID = "8JvhNdsw7A5KtUA0z2gr";

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

function normalizeForSpeech(text: string): string {
  const productNames: [RegExp, string][] = [
    [/NotebookLM/gi, "Notebook L M"],
    [/ChatGPT/gi, "Chat G P T"],
    [/GPT-(\d+\.?\d*)/gi, "G P T $1"],
    [/GPT(\d+\.?\d*)/gi, "G P T $1"],
    [/OpenAI/gi, "Open A I"],
    [/ElevenLabs/gi, "Eleven Labs"],
    [/HeyGen/gi, "Hey Gen"],
    [/TikTok/gi, "Tick Tock"],
    [/YouTube/gi, "You Tube"],
    [/LinkedIn/gi, "Linked In"],
    [/CapCut/gi, "Cap Cut"],
    [/OpusClip/gi, "Opus Clip"],
    [/Midjourney/gi, "Mid Journey"],
    [/RunwayML/gi, "Runway M L"],
    [/Avatar\s?V\b/gi, "Avatar Five"],
    [/Avatar\s?IV\b/gi, "Avatar Four"],
    [/v(\d+\.?\d*)\b/g, "version $1"],
    [/\bAI\b/g, "A I"],
    [/SEO/gi, "S E O"],
    [/API/gi, "A P I"],
    [/SMB/gi, "S M B"],
    [/ROI/gi, "R O I"],
    [/LLM/gi, "L L M"],
    [/SaaS/gi, "sass"],
  ];

  let result = text;
  for (const [pattern, replacement] of productNames) {
    result = result.replace(pattern, replacement);
  }

  return result
    .replace(/\$(\d+(?:\.\d+)?)[-–](\d+(?:\.\d+)?)/g, "$1 to $2 dollars")
    .replace(/\$(\d+(?:\.\d+)?)\/month/g, "$1 dollars a month")
    .replace(/\$(\d+(?:\.\d+)?)\/mo/g, "$1 dollars a month")
    .replace(/\$(\d+(?:\.\d+)?)\/year/g, "$1 dollars a year")
    .replace(/\$(\d+(?:\.\d+)?)/g, "$1 dollars")
    .replace(/(\d+)%/g, "$1 percent")
    .replace(/(\d+)¢\/(\w+)/g, "$1 cents per $2")
    .replace(/(\d+):(\d+)/g, "$1 by $2")
    .replace(/(\d+)K\b/g, "$1 thousand")
    .replace(/(\d+)M\b/g, "$1 million")
    .replace(/\+/g, " plus")
    .replace(/&/g, "and")
    .replace(/[#@^*~|]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function capAtSentence(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;

  const raw = text.match(/[^.!?]+[.!?]+/g) || [text];
  const sentences = raw.map((s) => s.trim()).filter(Boolean);

  if (sentences.length <= 1) return text.trim();

  const lastSentence = sentences[sentences.length - 1];
  let built = "";
  for (let i = 0; i < sentences.length - 1; i++) {
    const next = (built + " " + sentences[i]).trim();
    if (next.length + 1 + lastSentence.length <= maxChars * 1.6) {
      built = next;
    } else {
      break;
    }
  }

  return (built + " " + lastSentence).trim();
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) {
      return new Response(JSON.stringify({ error: "No text provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const clean = normalizeForSpeech(stripMarkdown(text));
    const capped = capAtSentence(clean, 600);

    const elevenRes = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY || "",
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: capped,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.65,
            similarity_boost: 0.80,
            style: 0.0,
            use_speaker_boost: true,
            speed: 1.0,
          },
        }),
      }
    );

    if (!elevenRes.ok) {
      const error = await elevenRes.text();
      console.error("ElevenLabs error:", error);
      return new Response(JSON.stringify({ error: "TTS failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Pipe ElevenLabs stream directly to browser — no buffering
    return new Response(elevenRes.body, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("TTS route error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
