import { anthropic, MODEL, ensureApiKey } from "@/lib/anthropic";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    ensureApiKey();
    const { message } = await request.json();

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    return NextResponse.json({
      content: response.content[0].type === "text" ? response.content[0].text : "",
    });
  } catch (error) {
    console.error("Error calling Anthropic API:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
