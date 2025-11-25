/**
 * AI Tool Type Definition
 * Represents an AI marketing tool from the curated toolkit
 *
 * IMPORTANT: As of November 2025, the 'url' field is REQUIRED for all NEW tools.
 * Existing tools without URLs should be updated to include them.
 * Use the validation utility in src/lib/utils/validate-tools.ts to check for missing URLs.
 */
export interface AITool {
  id: string; // Slug identifier (e.g., "chatgpt", "heygen")
  name: string; // Display name (e.g., "ChatGPT", "HeyGen")
  vendor: string; // Company name (e.g., "OpenAI", "HeyGen Technology Limited")
  category: string; // Primary category from toolkit
  subcategory?: string; // Optional subcategory
  description: string; // "What it does" section from toolkit
  bestFor: string[]; // Array of use cases from "Best for" section
  proTip?: string; // Q'dUp Pro Tip if available
  pricing?: string; // Pricing information when available
  features?: string[]; // Key features
  relatedTools: string[]; // IDs of related tools
  tags: string[]; // Searchable keywords
  url?: string; // REQUIRED for new tools (Nov 2025+) - Official website URL
  lastUpdated?: string; // Data freshness (e.g., "November 2025")
}

/**
 * Tool Category Definition
 */
export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  toolCount?: number;
}
