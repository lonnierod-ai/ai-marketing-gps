"use client";

import { SearchResult } from "@/types";
import ToolCard from "@/components/tools/ToolCard";
import GoalCard from "@/components/goals/GoalCard";
import EmptyState from "@/components/ui/EmptyState";
import { AITool, MarketingGoal } from "@/types";

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  searchType: "goal" | "tool";
  onNewSearch?: () => void;
}

export default function SearchResults({
  results,
  query,
  searchType,
  onNewSearch,
}: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <EmptyState
        title="No results found"
        description={`We couldn't find any ${searchType === "goal" ? "goals" : "tools"} matching "${query}". Try different keywords or switch search types.`}
        action={
          onNewSearch
            ? {
                label: "Try Another Search",
                onClick: onNewSearch,
              }
            : undefined
        }
      />
    );
  }

  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {results.length} {results.length === 1 ? "Result" : "Results"} for "
          {query}"
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Showing {searchType === "goal" ? "marketing goals" : "AI tools"} that
          match your search
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {results.map((result, idx) => (
          <div key={idx}>
            {result.type === "tool" ? (
              <ToolCard tool={result.item as AITool} />
            ) : (
              <GoalCard goal={result.item as MarketingGoal} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
