// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { goals } from "@/lib/data/goals";
import { getToolsByCategory } from "@/lib/data/tools";

const baseUrl = "https://www.aimarketinggps.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static core pages
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/search",
    "/goals",
    "/tools",
    "/chat",
    "/about",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1.0 : 0.7,
  }));

  // Dynamic goal pages → /goals/[slug]
  const goalRoutes: MetadataRoute.Sitemap = (goals || []).map((goal: any) => ({
    url: `${baseUrl}/goals/${goal.slug}`,
    lastModified:
      (goal.updatedAt && new Date(goal.updatedAt)) ||
      (goal.createdAt && new Date(goal.createdAt)) ||
      now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Get all tools from categories and flatten into a single list
  const toolCategories = getToolsByCategory();
  const allTools =
    toolCategories?.flatMap((category: any) => category.tools || []) || [];

  // Dynamic tool pages → /tools/[slug]
  const toolRoutes: MetadataRoute.Sitemap = allTools.map((tool: any) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified:
      (tool.updatedAt && new Date(tool.updatedAt)) ||
      (tool.createdAt && new Date(tool.createdAt)) ||
      now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...goalRoutes, ...toolRoutes];
}
