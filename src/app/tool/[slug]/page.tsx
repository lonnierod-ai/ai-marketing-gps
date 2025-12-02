import { notFound } from "next/navigation";
import Link from "next/link";
import { getToolById, getAllTools } from "@/lib/data/tools";
import { getAllGoals } from "@/lib/data/goals";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProTip from "@/components/ui/ProTip";
import ToolCard from "@/components/tools/ToolCard";
import Card from "@/components/ui/Card";

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({
    slug: tool.id,
  }));
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolById(slug);

  if (!tool) {
    notFound();
  }

  // Get related tools
  const relatedTools = tool.relatedTools
    .map((id) => getToolById(id))
    .filter(Boolean)
    .slice(0, 3);

  // Find goals that recommend this tool
  const goals = getAllGoals();
  const relevantGoals = goals.filter((goal) =>
    goal.recommendedTools.includes(tool.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/tools" className="text-blue-600 hover:underline">
            Tools
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{tool.name}</span>
        </nav>

        {/* Tool Header */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {tool.name}
              </h1>
              <p className="text-lg text-gray-600">{tool.vendor}</p>
            </div>
            <Badge variant="primary">
              {tool.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {tool.description}
          </p>

          {/* Visit Website Button */}
          {tool.url && (
            <div className="mb-4">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="primary" size="lg">
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Visit Website
                </Button>
              </a>
            </div>
          )}

          {/* Pricing */}
          {tool.pricing && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-700">
                Pricing: {tool.pricing}
              </p>
            </div>
          )}
        </div>

        {/* Best For */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Best For</h2>
          <ul className="space-y-2">
            {tool.bestFor.map((useCase, idx) => (
              <li key={idx} className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">{useCase}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pro Tip */}
        {tool.proTip && (
          <div className="mb-6">
            <ProTip>{tool.proTip}</ProTip>
          </div>
        )}

        {/* This Tool Helps With */}
        {relevantGoals.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              This Tool Helps With
            </h2>
            <div className="space-y-3">
              {relevantGoals.map((goal) => (
                <Link
                  key={goal.id}
                  href={`/goal/${goal.id}`}
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {goal.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {goal.description.slice(0, 120)}...
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-blue-600"
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
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Related Tools
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedTools.map((relatedTool) =>
                relatedTool ? (
                  <ToolCard key={relatedTool.id} tool={relatedTool} />
                ) : null
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {tool.tags && tool.tags.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 text-sm">
          <p>Last updated: {tool.lastUpdated || "November 2025"}</p>
        </div>
      </footer>
    </div>
  );
}
