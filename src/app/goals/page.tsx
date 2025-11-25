import Link from "next/link";
import { getAllGoals } from "@/lib/data/goals";
import { GOAL_CATEGORIES } from "@/lib/data/categories";
import GoalCard from "@/components/goals/GoalCard";

export default function GoalsPage() {
  const goals = getAllGoals();

  // Group goals by category
  const goalsByCategory = GOAL_CATEGORIES.map((category) => ({
    category,
    goals: goals.filter((goal) => goal.category === category.id),
  })).filter((group) => group.goals.length > 0);

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
            Browse All Goals
          </h1>
          <p className="text-lg text-gray-600">
            Explore {goals.length} marketing goals with step-by-step workflows
            and tool recommendations
          </p>
        </div>

        {/* Goals by Category */}
        <div className="space-y-12">
          {goalsByCategory.map(({ category, goals }) => (
            <section key={category.id}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {category.name}
                </h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
