import { MetadataRoute } from "next";
import { getAllTools } from "@/lib/data/tools";
import { getAllGoals } from "@/lib/data/goals";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.aimarketinggps.com";
  const now = new Date();

  const tools = getAllTools();
  const goals = getAllGoals();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/goals`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tool/${tool.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Goal pages
  const goalPages: MetadataRoute.Sitemap = goals.map((goal) => ({
    url: `${baseUrl}/goal/${goal.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...toolPages, ...goalPages];
}
