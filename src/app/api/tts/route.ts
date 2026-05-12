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

    const clean = stripMarkdown(text);
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
