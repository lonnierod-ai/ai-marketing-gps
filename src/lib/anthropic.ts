import Anthropic from "@anthropic-ai/sdk";

export const MODEL = "claude-3-5-sonnet-20241022";

// Use a placeholder API key during build time
const apiKey = process.env.ANTHROPIC_API_KEY || "placeholder-key-for-build";

export const anthropic = new Anthropic({
  apiKey,
});

export function ensureApiKey() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("Missing ANTHROPIC_API_KEY environment variable");
  }
}
