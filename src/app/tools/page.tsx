import Link from "next/link";
import { getAllTools } from "@/lib/data/tools";
import { TOOL_CATEGORIES } from "@/lib/data/categories";
import ToolCard from "@/components/tools/ToolCard";

export default function ToolsPage() {
  const tools = getAllTools();

  // Group tools by category
  const toolsByCategory = TOOL_CATEGORIES.map((category) => ({
    category,
    tools: tools.filter((tool) => tool.category === category.id),
  })).filter((group) => group.tools.length > 0);

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Browse All Tools
          </h1>
          <p className="text-lg text-gray-600">
            Explore {tools.length} AI marketing tools organized by category
          </p>
        </div>

        {/* Tools by Category */}
        <div className="space-y-12">
          {toolsByCategory.map(({ category, tools }) => (
            <section key={category.id}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {category.name}
                </h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
