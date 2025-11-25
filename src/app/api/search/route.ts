import { NextResponse } from "next/server";
import { parseQueryIntent } from "@/lib/utils/parser";
import {
  calculateToolRelevance,
  calculateGoalRelevance,
  getMatchedKeywords,
  getMatchedGoalKeywords,
  rankResults,
  extractKeywords,
} from "@/lib/utils/search";
import { getAllTools, getToolById } from "@/lib/data/tools";
import { getAllGoals, getGoalById } from "@/lib/data/goals";
import { SearchResponse, SearchResult } from "@/types";

/**
 * POST /api/search
 * Search for tools or goals based on user query
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, searchType = "goal" } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query is required and must be a string" },
        { status: 400 }
      );
    }

    // Parse query intent with Claude
    const parsedIntent = await parseQueryIntent(query);

    const results: SearchResult[] = [];

    if (searchType === "goal") {
      // Search for marketing goals
      const goals = getAllGoals();

      // First, try to use Claude's matched goal IDs
      if (parsedIntent.goalIds && parsedIntent.goalIds.length > 0) {
        parsedIntent.goalIds.forEach((goalId) => {
          const goal = getGoalById(goalId);
          if (goal) {
            const score = calculateGoalRelevance(goal, parsedIntent.keywords);
            results.push({
              type: "goal",
              item: goal,
              relevanceScore: score,
              matchedKeywords: getMatchedGoalKeywords(
                goal,
                parsedIntent.keywords
              ),
            });
          }
        });
      }

      // If no results from Claude, fall back to keyword matching
      if (results.length === 0) {
        const keywords = extractKeywords(query);
        goals.forEach((goal) => {
          const score = calculateGoalRelevance(goal, keywords);
          if (score > 0) {
            results.push({
              type: "goal",
              item: goal,
              relevanceScore: score,
              matchedKeywords: getMatchedGoalKeywords(goal, keywords),
            });
          }
        });
      }
    } else {
      // Search for tools
      const tools = getAllTools();

      // First, try to use Claude's matched tool IDs
      if (parsedIntent.toolIds && parsedIntent.toolIds.length > 0) {
        parsedIntent.toolIds.forEach((toolId) => {
          const tool = getToolById(toolId);
          if (tool) {
            const score = calculateToolRelevance(tool, parsedIntent.keywords);
            results.push({
              type: "tool",
              item: tool,
              relevanceScore: score,
              matchedKeywords: getMatchedKeywords(tool, parsedIntent.keywords),
            });
          }
        });
      }

      // If no results from Claude, fall back to keyword matching
      if (results.length === 0) {
        const keywords = extractKeywords(query);
        tools.forEach((tool) => {
          const score = calculateToolRelevance(tool, keywords);
          if (score > 0) {
            results.push({
              type: "tool",
              item: tool,
              relevanceScore: score,
              matchedKeywords: getMatchedKeywords(tool, keywords),
            });
          }
        });
      }
    }

    // Rank and filter results
    const rankedResults = rankResults(results);

    const response: SearchResponse = {
      query,
      results: rankedResults,
      totalResults: rankedResults.length,
      searchType,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "An error occurred while searching" },
      { status: 500 }
    );
  }
}
