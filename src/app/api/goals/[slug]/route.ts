import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getGoalById } from "@/lib/data/goals";

/**
 * GET /api/Goals/[slug]
 * Get a single goal by slug/ID
 */
export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/Goals/[slug]">
) {
  try {
    // In Next.js 16, ctx.params is a Promise – we await it
    const { slug } = await ctx.params;

    const goal = await getGoalById(slug);

    if (!goal) {
      return NextResponse.json(
        { error: "Goal not found" },
        { status: 404 }
      );
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
