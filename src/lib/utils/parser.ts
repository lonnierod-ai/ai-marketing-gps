import { anthropic, MODEL } from "@/lib/anthropic";
import { ParsedIntent } from "@/types";
import { getAllTools } from "@/lib/data/tools";
import { getAllGoals } from "@/lib/data/goals";

/**
 * Parse user query with Claude to extract intent and match to goals/tools
 */
export async function parseQueryIntent(
  userQuery: string
): Promise<ParsedIntent> {
  const tools = getAllTools();
  const goals = getAllGoals();

  // Create simplified lists for Claude
  const toolsList = tools.map((t) => ({
    id: t.id,
    name: t.name,
    tags: t.tags,
  }));
  const goalsList = goals.map((g) => ({
    id: g.id,
    title: g.title,
    tags: g.tags,
  }));

  const prompt = `You are helping users find AI marketing tools from a curated toolkit.

User query: "${userQuery}"

Available tools (ID, name, tags):
${JSON.stringify(toolsList, null, 2)}

Available marketing goals (ID, title, tags):
${JSON.stringify(goalsList, null, 2)}

Analyze the user's query and return a JSON object with:
1. "intent": Primary intent (e.g., "content creation", "video production", "seo optimization")
2. "contentType": Type of content if relevant (e.g., "blog", "video", "podcast", "social media")
3. "constraints": Object with optional fields:
   - "budget": "free" | "low" | "medium" | "high"
   - "skillLevel": "beginner" | "intermediate" | "advanced"
   - "speed": "fast" | "medium" | "slow"
4. "keywords": Array of extracted keywords from the query
5. "goalIds": Array of matching goal IDs (max 5, ordered by relevance)
6. "toolIds": Array of matching tool IDs if this is a direct tool search (max 5)

IMPORTANT: Only return IDs that exist in the provided lists. Do not invent or suggest IDs not in the data.

Return ONLY valid JSON, no other text.`;

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.content[0];
    if (content.type === "text") {
      const parsed = JSON.parse(content.text);

      // Validate that all IDs exist
      const validGoalIds = parsed.goalIds?.filter((id: string) =>
        goals.some((g) => g.id === id)
      ) || [];
      const validToolIds = parsed.toolIds?.filter((id: string) =>
        tools.some((t) => t.id === id)
      ) || [];

      return {
        intent: parsed.intent || "general",
        contentType: parsed.contentType,
        constraints: parsed.constraints || {},
        keywords: parsed.keywords || [],
        goalIds: validGoalIds,
        toolIds: validToolIds,
      };
    }
  } catch (error) {
    console.error("Error parsing query intent:", error);
  }

  // Fallback: simple keyword extraction
  const keywords = userQuery
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2);

  return {
    intent: "general",
    keywords,
    goalIds: [],
    toolIds: [],
  };
}
