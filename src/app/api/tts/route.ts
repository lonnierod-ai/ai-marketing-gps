import { NextRequest, NextResponse } from "next/server";

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
  // Product name pronunciation fixes — must run before other replacements
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
    [/Canva/gi, "Can-va"],
    [/CapCut/gi, "Cap Cut"],
    [/OpusClip/gi, "Opus Clip"],
    [/Midjourney/gi, "Mid Journey"],
    [/RunwayML/gi, "Runway M L"],
    [/Runway/gi, "Runway"],
    [/Veo\s?(\d+\.?\d*)/gi, "Veo $1"],
    [/Gen-(\d+\.?\d*)/gi, "Gen $1"],
    [/Gen(\d+\.?\d*)/gi, "Gen $1"],
    [/Avatar\s?V\b/gi, "Avatar Five"],
    [/Avatar\s?IV\b/gi, "Avatar Four"],
    [/v(\d+\.?\d*)\b/g, "version $1"],
    [/AI\b/g, "A I"],
    [/SEO/gi, "S E O"],
    [/API/gi, "A P I"],
    [/SMB/gi, "S M B"],
    [/ROI/gi, "R O I"],
    [/CRM/gi, "C R M"],
    [/SaaS/gi, "sass"],
    [/RAG/gi, "R A G"],
    [/LLM/gi, "L L M"],
  ];

  let result = text;
  for (const [pattern, replacement] of productNames) {
    result = result.replace(pattern, replacement);
  }
  return result
    // Currency: $29/month → 29 dollars a month
    .replace(/\$(\d+(?:\.\d+)?)\/month/g, "$1 dollars a month")
    .replace(/\$(\d+(?:\.\d+)?)\/mo/g, "$1 dollars a month")
    .replace(/\$(\d+(?:\.\d+)?)\/year/g, "$1 dollars a year")
    .replace(/\$(\d+(?:\.\d+)?)\/yr/g, "$1 dollars a year")
    .replace(/\$(\d+(?:\.\d+)?)/g, "$1 dollars")
    // Percentages: 67% → 67 percent
    .replace(/(\d+)%/g, "$1 percent")
    // Per: 40¢/video → 40 cents per video
    .replace(/(\d+)¢\/(\w+)/g, "$1 cents per $2")
    // Slash combos: 9:16 → 9 by 16
    .replace(/(\d+):(\d+)/g, "$1 by $2")
    // K shorthand: 10K → 10 thousand
    .replace(/(\d+)K\b/g, "$1 thousand")
    // M shorthand: 1M → 1 million
    .replace(/(\d+)M\b/g, "$1 million")
    // Plus sign
    .replace(/\+/g, " plus")
    // Ampersand
    .replace(/&/g, "and")
    // Remove remaining special chars that confuse TTS
    .replace(/[#@^*~|]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function capAtSentence(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  
  // Find the last sentence ending (. ? !) before maxChars
  const chunk = text.slice(0, maxChars);
  const lastSentenceEnd = Math.max(
    chunk.lastIndexOf(". "),
    chunk.lastIndexOf("? "),
    chunk.lastIndexOf("! "),
    chunk.lastIndexOf(".\n"),
    chunk.lastIndexOf("?\n"),
    chunk.lastIndexOf("!\n")
  );

  if (lastSentenceEnd > 50) {
    // Return up to and including the punctuation
    return text.slice(0, lastSentenceEnd + 1).trim();
  }

  // Fallback: cut at last space before maxChars
  const lastSpace = chunk.lastIndexOf(" ");
  return text.slice(0, lastSpace > 0 ? lastSpace : maxChars).trim();
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const clean = normalizeForSpeech(stripMarkdown(text));
    const capped = capAtSentence(clean, 300);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY || "",
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: capped,
          model_id: "eleven_turbo_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.3,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("ElevenLabs error:", error);
      return NextResponse.json({ error: "TTS failed" }, { status: 500 });
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("TTS route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
