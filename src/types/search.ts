import { AITool } from "./tool";
import { MarketingGoal } from "./goal";

/**
 * Search Result Type
 * Represents a single search result (either a tool or goal)
 */
export interface SearchResult {
  type: "tool" | "goal";
  item: AITool | MarketingGoal;
  relevanceScore: number; // 0-1 for ranking
  matchedKeywords: string[]; // Keywords that triggered this result
}

/**
 * Search Response from API
 */
export interface SearchResponse {
  query: string;
  results: SearchResult[];
  totalResults: number;
  searchType: "goal" | "tool";
}

/**
 * Parsed Query Intent
 * Extracted information from user's search query
 */
export interface ParsedIntent {
  intent: string; // Primary intent (e.g., "content creation", "video production")
  contentType?: string; // Type of content (e.g., "blog", "video", "podcast")
  constraints?: {
    budget?: "free" | "low" | "medium" | "high";
    skillLevel?: "beginner" | "intermediate" | "advanced";
    speed?: "fast" | "medium" | "slow";
  };
  keywords: string[]; // Extracted keywords
  goalIds?: string[]; // Matched goal IDs
  toolIds?: string[]; // Matched tool IDs (if direct tool search)
}
