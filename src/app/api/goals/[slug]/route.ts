import { NextResponse } from "next/server";
import { getGoalById } from "@/lib/data/goals";

/**
 * GET /api/goals/[slug]
 * Get a single goal by slug/ID
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const goal = getGoalById(params.slug);

    if (!goal) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    return NextResponse.json({ goal });
  } catch (error) {
    console.error("Error fetching goal:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching goal" },
      { status: 500 }
    );
  }
}
