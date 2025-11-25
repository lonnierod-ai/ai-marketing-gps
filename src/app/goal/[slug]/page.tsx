import { notFound } from "next/navigation";
import Link from "next/link";
import { getGoalById, getAllGoals } from "@/lib/data/goals";
import { getToolById } from "@/lib/data/tools";
import Badge from "@/components/ui/Badge";
import ToolCard from "@/components/tools/ToolCard";

export async function generateStaticParams() {
  const goals = getAllGoals();
  return goals.map((goal) => ({
    slug: goal.id,
  }));
}

export default async function GoalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const goal = getGoalById(slug);

  if (!goal) {
    notFound();
  }

  // Get recommended tools
  const recommendedTools = goal.recommendedTools
    .map((id) => getToolById(id))
    .filter(Boolean);

  const difficultyColors = {
    beginner: "success",
    intermediate: "primary",
    advanced: "secondary",
  } as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            AI Marketing GPS
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/goals" className="text-blue-600 hover:underline">
            Goals
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{goal.title}</span>
        </nav>

        {/* Goal Header */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl font-bold text-gray-900">{goal.title}</h1>
            <Badge variant={difficultyColors[goal.difficulty]}>
              {goal.difficulty}
            </Badge>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed">
            {goal.description}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-600">
            {goal.estimatedTimeframe && (
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
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
                <span>Timeframe: {goal.estimatedTimeframe}</span>
              </div>
            )}
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
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
              <span>{goal.recommendedTools.length} recommended tools</span>
            </div>
          </div>
        </div>

        {/* Workflow */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Step-by-Step Workflow
          </h2>
          <p className="text-gray-600 mb-6">{goal.workflow.description}</p>

          <div className="space-y-4">
            {goal.workflow.steps.map((step, idx) => (
              <div key={idx} className="flex">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Example Prompts */}
        {goal.examplePrompts && goal.examplePrompts.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Example Prompts
            </h2>
            <p className="text-gray-600 mb-4">
              Use these prompts to get started with AI tools for this goal:
            </p>
            <div className="space-y-3">
              {goal.examplePrompts.map((prompt, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm"
                >
                  {prompt}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Tools */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recommended Tools
          </h2>
          <p className="text-gray-600 mb-6">
            These tools are specifically recommended for achieving this goal:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedTools.map((tool, idx) =>
              tool ? (
                <div key={tool.id} className="relative">
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                    {idx + 1}
                  </div>
                  <ToolCard tool={tool} />
                </div>
              ) : null
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 text-sm">
          <p>
            Data curated from Q'dUp Content Marketing Agency's AI Toolkit
            (November 2025)
          </p>
        </div>
      </footer>
    </div>
  );
}
