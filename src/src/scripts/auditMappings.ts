// Use CommonJS-style requires so ts-node can load our TS modules easily
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getAllGoals } = require("../../lib/data/goals");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getAllTools } = require("../../lib/data/tools");

function runAudit() {
  const goals = getAllGoals();
  const tools = getAllTools();

  const errors: string[] = [];
  const warnings: string[] = [];
  const info: string[] = [];

  // Index tools by ID
  const toolMap = Object.fromEntries(tools.map((t) => [t.id, t]));

  // =====================================================
  // 1. AUDIT GOAL → TOOL MAPPINGS
  // =====================================================
  goals.forEach((goal) => {
    goal.recommendedTools.forEach((toolId) => {
      if (!toolMap[toolId]) {
        errors.push(
          `❌ Goal "${goal.title}" references missing tool: ${toolId}`
        );
      }
    });

    if (!goal.examplePrompts || goal.examplePrompts.length === 0) {
      warnings.push(`⚠️ Goal "${goal.title}" has NO examplePrompts.`);
    }

    if (!goal.tags || goal.tags.length === 0) {
      warnings.push(`⚠️ Goal "${goal.title}" has NO tags.`);
    }
  });

  // =====================================================
  // 2. AUDIT TOOL → GOAL MAPPINGS
  // =====================================================
  tools.forEach((tool) => {
    const matchedGoals = goals.filter((goal) =>
      goal.recommendedTools.includes(tool.id)
    );

    if (matchedGoals.length === 0) {
      warnings.push(`⚠️ Tool "${tool.name}" is NOT used by any goals.`);
    }

    if (!tool.tags || tool.tags.length === 0) {
      warnings.push(`⚠️ Tool "${tool.name}" has NO tags.`);
    }
  });

  // =====================================================
  // 3. SEARCH TAG CONSISTENCY
  // =====================================================
  goals.forEach((goal) => {
    const text =
      `${goal.title} ${goal.description} ${goal.tags.join(" ")}`.toLowerCase();

    goal.tags.forEach((tag) => {
      if (!text.includes(tag.toLowerCase())) {
        warnings.push(
          `⚠️ Tag mismatch: goal "${goal.title}" includes tag "${tag}" but it does NOT appear in the title/description.`
        );
      }
    });
  });

  // =====================================================
  // 4. SUMMARY OUTPUT
  // =====================================================
  console.log("=== AI Marketing GPS – AUDIT REPORT ===\n");

  if (errors.length === 0) console.log("No critical errors found.\n");
  else {
    console.log("❌ ERRORS:");
    errors.forEach((e) => console.log(" - " + e));
    console.log("");
  }

  if (warnings.length === 0) console.log("No warnings.\n");
  else {
    console.log("⚠️ WARNINGS:");
    warnings.forEach((w) => console.log(" - " + w));
    console.log("");
  }

  console.log("Audit complete.\n");
}

runAudit();
