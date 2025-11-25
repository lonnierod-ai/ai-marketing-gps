import { NextResponse } from "next/server";
import { getAllGoals, getGoalsByCategory } from "@/lib/data/goals";

/**
 * GET /api/goals
 * Get all goals or filter by category
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let goals;
    if (category) {
      goals = getGoalsByCategory(category);
    } else {
      goals = getAllGoals();
    }

    return NextResponse.json({
      goals,
      total: goals.length,
    });
  } catch (error) {
    console.error("Error fetching goals:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching goals" },
      { status: 500 }
    );
  }
}
