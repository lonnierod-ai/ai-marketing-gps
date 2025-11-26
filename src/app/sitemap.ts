// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { getGoalsByCategory } from "@/lib/data/goals";
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

  // ----- Goals -----
  // getGoalsByCategory returns categories; flatten them into a list of goals
  const goalCategories = (getGoalsByCategory as any)();

  const allGoals =
    goalCategories?.flatMap((category: any) => category.goals || []) || [];

  const goalRoutes: MetadataRoute.Sitemap = allGoals.map((goal: any) => ({
    url: `${baseUrl}/goals/${goal.slug}`,
    lastModified:
      (goal.updatedAt && new Date(goal.updatedAt)) ||
      (goal.createdAt && new Date(goal.createdAt)) ||
      now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // ----- Tools -----
  const toolCategories = (getToolsByCategory as any)();
  const allTools =
    toolCategories?.flatMap((category: any) => category.tools || []) || [];

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
