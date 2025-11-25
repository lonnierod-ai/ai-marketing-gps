import { AITool } from "@/types";

/**
 * Validation utility for AI tools
 * Checks for required fields and data quality
 */

export interface ValidationIssue {
  toolId: string;
  toolName: string;
  severity: "error" | "warning";
  field: string;
  message: string;
}

/**
 * Validate a single tool for required fields and quality
 */
export function validateTool(tool: AITool): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // REQUIRED: Website URL (as of November 2025)
  if (!tool.url || tool.url.trim() === "") {
    issues.push({
      toolId: tool.id,
      toolName: tool.name,
      severity: "error",
      field: "url",
      message: `REQUIRED: Tool "${tool.name}" is missing a Website URL. This is mandatory as of November 2025.`,
    });
  }

  // Validate URL format if present
  if (tool.url && tool.url.trim() !== "") {
    if (!tool.url.startsWith("http://") && !tool.url.startsWith("https://")) {
      issues.push({
        toolId: tool.id,
        toolName: tool.name,
        severity: "warning",
        field: "url",
        message: `Website URL for "${tool.name}" should start with http:// or https://`,
      });
    }
  }

  // Check for other required fields
  if (!tool.name || tool.name.trim() === "") {
    issues.push({
      toolId: tool.id,
      toolName: tool.id,
      severity: "error",
      field: "name",
      message: `Tool "${tool.id}" is missing a name`,
    });
  }

  if (!tool.vendor || tool.vendor.trim() === "") {
    issues.push({
      toolId: tool.id,
      toolName: tool.name,
      severity: "error",
      field: "vendor",
      message: `Tool "${tool.name}" is missing vendor information`,
    });
  }

  if (!tool.description || tool.description.trim() === "") {
    issues.push({
      toolId: tool.id,
      toolName: tool.name,
      severity: "error",
      field: "description",
      message: `Tool "${tool.name}" is missing a description`,
    });
  }

  if (!tool.bestFor || tool.bestFor.length === 0) {
    issues.push({
      toolId: tool.id,
      toolName: tool.name,
      severity: "error",
      field: "bestFor",
      message: `Tool "${tool.name}" is missing "Best for" use cases (minimum 3 required)`,
    });
  } else if (tool.bestFor.length < 3) {
    issues.push({
      toolId: tool.id,
      toolName: tool.name,
      severity: "warning",
      field: "bestFor",
      message: `Tool "${tool.name}" has only ${tool.bestFor.length} use cases. Recommended minimum is 3.`,
    });
  }

  // Recommended fields
  if (!tool.proTip || tool.proTip.trim() === "") {
    issues.push({
      toolId: tool.id,
      toolName: tool.name,
      severity: "warning",
      field: "proTip",
      message: `Tool "${tool.name}" is missing a Pro Tip (recommended)`,
    });
  }

  if (!tool.relatedTools || tool.relatedTools.length === 0) {
    issues.push({
      toolId: tool.id,
      toolName: tool.name,
      severity: "warning",
      field: "relatedTools",
      message: `Tool "${tool.name}" has no related tools listed (recommended: 2-5)`,
    });
  }

  return issues;
}

/**
 * Validate all tools in the database
 */
export function validateAllTools(tools: AITool[]): {
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  summary: {
    totalTools: number;
    toolsWithErrors: number;
    toolsWithWarnings: number;
    missingWebsites: number;
  };
} {
  const allIssues = tools.flatMap((tool) => validateTool(tool));

  const errors = allIssues.filter((issue) => issue.severity === "error");
  const warnings = allIssues.filter((issue) => issue.severity === "warning");

  const toolsWithErrors = new Set(errors.map((e) => e.toolId)).size;
  const toolsWithWarnings = new Set(warnings.map((w) => w.toolId)).size;
  const missingWebsites = errors.filter((e) => e.field === "url").length;

  return {
    errors,
    warnings,
    summary: {
      totalTools: tools.length,
      toolsWithErrors,
      toolsWithWarnings,
      missingWebsites,
    },
  };
}

/**
 * Print validation results to console
 */
export function printValidationResults(
  results: ReturnType<typeof validateAllTools>
): void {
  console.log("\n=== AI Tools Validation Report ===\n");

  console.log(`Total Tools: ${results.summary.totalTools}`);
  console.log(`Tools with Errors: ${results.summary.toolsWithErrors}`);
  console.log(`Tools with Warnings: ${results.summary.toolsWithWarnings}`);
  console.log(
    `Tools Missing Website URL: ${results.summary.missingWebsites} ⚠️\n`
  );

  if (results.errors.length > 0) {
    console.log("🚨 ERRORS (Must be fixed):");
    results.errors.forEach((error) => {
      console.log(`  - [${error.toolName}] ${error.message}`);
    });
    console.log("");
  }

  if (results.warnings.length > 0) {
    console.log("⚠️  WARNINGS (Recommended to fix):");
    results.warnings.forEach((warning) => {
      console.log(`  - [${warning.toolName}] ${warning.message}`);
    });
    console.log("");
  }

  if (results.errors.length === 0 && results.warnings.length === 0) {
    console.log("✅ All tools pass validation!");
  }

  console.log("=== End of Report ===\n");
}

/**
 * Get tools missing Website URLs
 */
export function getToolsMissingWebsites(tools: AITool[]): AITool[] {
  return tools.filter((tool) => !tool.url || tool.url.trim() === "");
}

/**
 * Generate a report of tools missing websites
 */
export function generateMissingWebsitesReport(tools: AITool[]): string {
  const missingTools = getToolsMissingWebsites(tools);

  if (missingTools.length === 0) {
    return "✅ All tools have Website URLs!";
  }

  let report = `⚠️  ${missingTools.length} tools are missing Website URLs (REQUIRED as of November 2025):\n\n`;

  missingTools.forEach((tool, index) => {
    report += `${index + 1}. ${tool.name} (${tool.vendor})\n`;
    report += `   ID: ${tool.id}\n`;
    report += `   Category: ${tool.category}\n`;
    report += `   Action: Add Website field to this tool\n\n`;
  });

  report += `\nPlease update these tools with their official website URLs.\n`;
  report += `See docs/CONTENT_UPDATE.md for the update template.`;

  return report;
}
