import { NextResponse } from "next/server";
import { getAllTools, getToolsByCategory } from "@/lib/data/tools";

/**
 * GET /api/tools
 * Get all tools or filter by category
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let tools;
    if (category) {
      tools = getToolsByCategory(category);
    } else {
      tools = getAllTools();
    }

    return NextResponse.json({
      tools,
      total: tools.length,
    });
  } catch (error) {
    console.error("Error fetching tools:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching tools" },
      { status: 500 }
    );
  }
}
