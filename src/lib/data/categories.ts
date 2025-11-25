import { ToolCategory, GoalCategory } from "@/types";

/**
 * Tool Categories
 * Based on the structure from the AI toolkit documentation
 */
export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: "core-concepts",
    name: "Core AI Concepts",
    description: "Foundational AI concepts and terminology for content marketers",
  },
  {
    id: "content-creation",
    name: "Content Creation",
    description: "AI tools for writing, brainstorming, and creating text content",
  },
  {
    id: "video-generation",
    name: "Video Generation & Editing",
    description: "AI-powered video creation, editing, and enhancement tools",
  },
  {
    id: "avatars",
    name: "AI Avatars & Digital Humans",
    description: "Create photorealistic digital spokespersons and avatar videos",
  },
  {
    id: "voice-audio",
    name: "Voice & Audio",
    description: "AI voice generation, cloning, and audio production tools",
  },
  {
    id: "visual-content",
    name: "Visual Content Creation",
    description: "AI image generation and graphic design tools",
  },
  {
    id: "vibe-coding",
    name: "Vibe Coding & No-Code Development",
    description: "Build applications using natural language with AI",
  },
  {
    id: "research-seo",
    name: "Research & SEO",
    description: "AI-powered research, SEO optimization, and content analysis",
  },
  {
    id: "social-productivity",
    name: "Social Media & Productivity",
    description: "Social media management and productivity automation tools",
  },
  {
    id: "podcast-production",
    name: "Podcast Production",
    description: "End-to-end podcast creation and editing tools",
  },
  {
    id: "marketing-automation",
    name: "Marketing Automation & Distribution",
    description: "Email marketing, CRM, and workflow automation platforms",
  },
  {
    id: "analytics",
    name: "Analytics & Intelligence",
    description: "Data analytics and business intelligence tools",
  },
  {
    id: "compliance",
    name: "Platform Policies & Compliance",
    description: "Legal compliance and content disclosure requirements",
  },
];

/**
 * Goal Categories
 */
export const GOAL_CATEGORIES: GoalCategory[] = [
  {
    id: "content-marketing",
    name: "Content Marketing",
    description: "Blog posts, articles, and written content goals",
  },
  {
    id: "video-marketing",
    name: "Video Marketing",
    description: "Video production and distribution goals",
  },
  {
    id: "audio-marketing",
    name: "Audio Marketing",
    description: "Podcast and audio content goals",
  },
  {
    id: "social-media",
    name: "Social Media",
    description: "Social media content and management goals",
  },
  {
    id: "seo-research",
    name: "SEO & Research",
    description: "Search optimization and content research goals",
  },
  {
    id: "automation",
    name: "Marketing Automation",
    description: "Workflow automation and efficiency goals",
  },
];
