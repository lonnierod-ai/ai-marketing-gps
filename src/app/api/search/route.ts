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
import { getAllTools, getToolById, searchTools } from "@/lib/data/tools";
import { getAllGoals, getGoalById, searchGoals } from "@/lib/data/goals";
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

    const results: SearchResult[] = [];

    if (searchType === "goal") {
      // Use the searchGoals function with TOPIC_KEYWORDS mapping
      const matchedGoals = searchGoals(query);
      
      // Convert to SearchResult format with relevance scores
      const keywords = extractKeywords(query);
      matchedGoals.forEach((goal) => {
        const score = calculateGoalRelevance(goal, keywords);
        results.push({
          type: "goal",
          item: goal,
          relevanceScore: score,
          matchedKeywords: getMatchedGoalKeywords(goal, keywords),
        });
      });
    } else {
      // Use the searchTools function for tool searches
      const matchedTools = searchTools(query);
      
      // Convert to SearchResult format with relevance scores
      const keywords = extractKeywords(query);
      matchedTools.forEach((tool) => {
        const score = calculateToolRelevance(tool, keywords);
        results.push({
          type: "tool",
          item: tool,
          relevanceScore: score,
          matchedKeywords: getMatchedKeywords(tool, keywords),
        });
      });
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
