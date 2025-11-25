import { NextResponse } from "next/server";
import { getToolById } from "@/lib/data/tools";

/**
 * GET /api/tools/[slug]
 * Get a single tool by slug/ID
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const tool = getToolById(params.slug);

    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    return NextResponse.json({ tool });
  } catch (error) {
    console.error("Error fetching tool:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching tool" },
      { status: 500 }
    );
  }
}
