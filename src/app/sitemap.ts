// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { getGoalsByCategory } from "@/lib/data/goals";
import { getToolsByCategory } from "@/lib/data/tools";

const BASE_URL = "https://www.aimarketinggps.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ----- Static routes -----
  const staticRoutes: MetadataRoute.Sitemap = [
    "", // home
    "/search",
    "/goals",
    "/tools",
    "/chat",
    "/about",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  // ----- Goals -----
  const goalCategories = await (getGoalsByCategory as any)();
  const allGoals =
    goalCategories?.flatMap((category: any) => category.goals || []) ?? [];

  const goalRoutes: MetadataRoute.Sitemap = allGoals
    .map((goal: any) => {
      const slug =
        goal?.slug ||
        goal?.id ||
        goal?.key ||
        (goal?.name &&
          String(goal.name).toLowerCase().replace(/\s+/g, "-"));

      if (!slug) return null;

      return {
        url: `${BASE_URL}/goals/${slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      };
    })
    .filter(Boolean) as MetadataRoute.Sitemap;

  // ----- Tools -----
  const toolCategories = await (getToolsByCategory as any)();
  const allTools =
    toolCategories?.flatMap((category: any) => category.tools || []) ?? [];

  const toolRoutes: MetadataRoute.Sitemap = allTools
    .map((tool: any) => {
      const slug =
        tool?.slug ||
        tool?.id ||
        tool?.key ||
        (tool?.name &&
          String(tool.name).toLowerCase().replace(/\s+/g, "-"));

      if (!slug) return null;

      return {
        url: `${BASE_URL}/tools/${slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      };
    })
    .filter(Boolean) as MetadataRoute.Sitemap;

  // Return full sitemap
  return [...staticRoutes, ...goalRoutes, ...toolRoutes];
}
