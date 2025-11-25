/**
 * Tool Validation Script
 * Run this to check for missing Website URLs and other data quality issues
 *
 * Usage: npx tsx scripts/validate-tools.ts
 */

import { getAllTools } from "../src/lib/data/tools";
import {
  validateAllTools,
  printValidationResults,
  generateMissingWebsitesReport,
} from "../src/lib/utils/validate-tools";

console.log("🔍 Validating AI Marketing Tools...\n");

const tools = getAllTools();
const results = validateAllTools(tools);

// Print full validation report
printValidationResults(results);

// Print specific report for missing websites
if (results.summary.missingWebsites > 0) {
  console.log("\n" + generateMissingWebsitesReport(tools));
}

// Exit with error code if there are errors
if (results.errors.length > 0) {
  console.log(
    "\n❌ Validation failed. Please fix the errors above before deploying.\n"
  );
  process.exit(1);
} else {
  console.log("\n✅ Validation passed!\n");
  process.exit(0);
}
