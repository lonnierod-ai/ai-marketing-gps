import { AITool, MarketingGoal, SearchResult } from "@/types";

/**
 * Search utilities for ranking and matching
 */

/**
 * Calculate relevance score for a tool based on keyword matching
 */
export function calculateToolRelevance(
  tool: AITool,
  keywords: string[]
): number {
  let score = 0;
  const lowerKeywords = keywords.map((k) => k.toLowerCase());
  const toolNameLower = tool.name.toLowerCase();

  // Reconstruct the full query from keywords to check for exact/prefix matches
  const fullQuery = keywords.join(" ").toLowerCase();

  // HIGHEST PRIORITY: Exact name match (case-insensitive)
  if (toolNameLower === fullQuery) {
    score += 100;
  }

  // HIGH PRIORITY: Name starts with the query
  else if (toolNameLower.startsWith(fullQuery)) {
    score += 50;
  }

  // Check name (highest weight for partial matches)
  lowerKeywords.forEach((keyword) => {
    if (tool.name.toLowerCase().includes(keyword)) {
      score += 10;
    }
  });

  // Check tags (high weight)
  tool.tags.forEach((tag) => {
    lowerKeywords.forEach((keyword) => {
      if (tag.toLowerCase().includes(keyword)) {
        score += 5;
      }
    });
  });

  // Check description (medium weight)
  lowerKeywords.forEach((keyword) => {
    if (tool.description.toLowerCase().includes(keyword)) {
      score += 3;
    }
  });

  // Check bestFor (medium weight)
  tool.bestFor.forEach((useCase) => {
    lowerKeywords.forEach((keyword) => {
      if (useCase.toLowerCase().includes(keyword)) {
        score += 3;
      }
    });
  });

  // Check vendor (low weight)
  lowerKeywords.forEach((keyword) => {
    if (tool.vendor.toLowerCase().includes(keyword)) {
      score += 2;
    }
  });

  return score;
}

/**
 * Calculate relevance score for a goal based on keyword matching
 */
export function calculateGoalRelevance(
  goal: MarketingGoal,
  keywords: string[]
): number {
  let score = 0;
  const lowerKeywords = keywords.map((k) => k.toLowerCase());

  // Check title (highest weight)
  lowerKeywords.forEach((keyword) => {
    if (goal.title.toLowerCase().includes(keyword)) {
      score += 10;
    }
  });

  // Check tags (high weight)
  goal.tags.forEach((tag) => {
    lowerKeywords.forEach((keyword) => {
      if (tag.toLowerCase().includes(keyword)) {
        score += 5;
      }
    });
  });

  // Check description (medium weight)
  lowerKeywords.forEach((keyword) => {
    if (goal.description.toLowerCase().includes(keyword)) {
      score += 3;
    }
  });

  // Check workflow description (low weight)
  lowerKeywords.forEach((keyword) => {
    if (goal.workflow.description.toLowerCase().includes(keyword)) {
      score += 2;
    }
  });

  return score;
}

/**
 * Get matched keywords for a tool
 */
export function getMatchedKeywords(
  tool: AITool,
  keywords: string[]
): string[] {
  const matched: string[] = [];
  const lowerKeywords = keywords.map((k) => k.toLowerCase());

  lowerKeywords.forEach((keyword) => {
    if (
      tool.name.toLowerCase().includes(keyword) ||
      tool.description.toLowerCase().includes(keyword) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(keyword)) ||
      tool.vendor.toLowerCase().includes(keyword)
    ) {
      matched.push(keyword);
    }
  });

  return [...new Set(matched)]; // Remove duplicates
}

/**
 * Get matched keywords for a goal
 */
export function getMatchedGoalKeywords(
  goal: MarketingGoal,
  keywords: string[]
): string[] {
  const matched: string[] = [];
  const lowerKeywords = keywords.map((k) => k.toLowerCase());

  lowerKeywords.forEach((keyword) => {
    if (
      goal.title.toLowerCase().includes(keyword) ||
      goal.description.toLowerCase().includes(keyword) ||
      goal.tags.some((tag) => tag.toLowerCase().includes(keyword))
    ) {
      matched.push(keyword);
    }
  });

  return [...new Set(matched)]; // Remove duplicates
}

/**
 * Rank and filter search results
 */
export function rankResults(
  results: SearchResult[],
  minScore: number = 5
): SearchResult[] {
  return results
    .filter((result) => result.relevanceScore >= minScore)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Simple keyword extraction from query
 */
export function extractKeywords(query: string): string[] {
  // Remove common stop words
  const stopWords = [
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "for",
    "from",
    "has",
    "he",
    "in",
    "is",
    "it",
    "its",
    "of",
    "on",
    "that",
    "the",
    "to",
    "was",
    "will",
    "with",
    "i",
    "want",
    "need",
    "help",
    "me",
    "my",
  ];

  return query
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // Remove punctuation
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.includes(word));
}
