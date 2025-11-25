import Link from "next/link";
import { MarketingGoal } from "@/types";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface GoalCardProps {
  goal: MarketingGoal;
}

export default function GoalCard({ goal }: GoalCardProps) {
  const difficultyColors = {
    beginner: "success",
    intermediate: "primary",
    advanced: "secondary",
  } as const;

  return (
    <Link href={`/goal/${goal.id}`}>
      <Card hover className="p-4 sm:p-6 h-full">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="mb-3">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-lg sm:text-xl font-semibold text-brand-dark">
                {goal.title}
              </h3>
              <Badge variant={difficultyColors[goal.difficulty]}>
                {goal.difficulty}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-brand-dark/60">
              {goal.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-brand-dark/80 mb-4 line-clamp-3 flex-grow">
            {goal.description}
          </p>

          {/* Metadata */}
          <div className="space-y-2 text-sm">
            {goal.estimatedTimeframe && (
              <div className="flex items-center text-brand-dark/70">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {goal.estimatedTimeframe}
              </div>
            )}
            <div className="flex items-center text-brand-dark/70">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {goal.recommendedTools.length} recommended tools
            </div>
            <div className="flex items-center text-brand-dark/70">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              {goal.workflow.steps.length} step workflow
            </div>
          </div>

          {/* Arrow icon */}
          <div className="mt-4 flex justify-end">
            <svg
              className="w-5 h-5 text-brand-blue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Card>
    </Link>
  );
}
