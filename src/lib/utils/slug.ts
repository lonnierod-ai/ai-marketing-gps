/**
 * Utility functions for slug generation and normalization
 */

/**
 * Generate a URL-friendly slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Normalize a slug for comparison
 */
export function normalizeSlug(slug: string): string {
  return slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "");
}

/**
 * Check if two slugs match (fuzzy matching)
 */
export function slugsMatch(slug1: string, slug2: string): boolean {
  return normalizeSlug(slug1) === normalizeSlug(slug2);
}
