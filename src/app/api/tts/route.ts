import { NextRequest, NextResponse } from "next/server";

// ============================================================
// AI Marketing GPS — ElevenLabs TTS Route
// POST /api/tts
// Converts Maya's text responses to audio using Lonnie's voice clone
//
// ENV REQUIRED: ELEVENLABS_API_KEY in Vercel environment variables
// VOICE ID: 8JvhNdsw7A5KtUA0z2gr (Lonnie's voice clone / Maya)
// ============================================================

const VOICE_ID = "8JvhNdsw7A5KtUA0z2gr";

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")        // bold
    .replace(/\*(.*?)\*/g, "$1")              // italic
    .replace(/`(.*?)`/g, "$1")                 // code
    .replace(/https?:\/\/[^\s,)]+/g, "")    // URLs
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // markdown links
    .replace(/#{1,6}\s/g, "")                 // headers
    .replace(/[-*]\s/g, "")                   // list items
    .replace(/\n{3,}/g, "\n\n")              // excess newlines
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const cleanText = stripMarkdown(text).slice(0, 2500); // ElevenLabs limit safety

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
          text: cleanText,
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
