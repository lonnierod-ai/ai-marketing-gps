/**
 * Marketing Goal Type Definition
 * Represents a marketing objective that users want to achieve
 */
export interface MarketingGoal {
  id: string; // Slug identifier (e.g., "blog-content", "podcast-launch")
  title: string; // Display title (e.g., "Create Blog Content Faster")
  description: string; // Goal explanation and context
  category: string; // Primary category
  tags: string[]; // Keywords for matching user queries
  recommendedTools: string[]; // Tool IDs in priority order
  workflow: {
    steps: string[]; // Step-by-step process
    description: string; // Overall workflow explanation
  };
  examplePrompts?: string[]; // Starter prompts for users
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTimeframe?: string; // "2-4 weeks", "1 day", etc.
}

/**
 * Goal Category Definition
 */
export interface GoalCategory {
  id: string;
  name: string;
  description: string;
  goalCount?: number;
}
