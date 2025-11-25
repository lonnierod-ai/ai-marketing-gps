# AI Marketing GPS - Content Update Guide

**Last Updated:** November 2025

This guide explains how to update the AI Marketing GPS application with new tools, update existing tools, and manage marketing goals. These updates flow directly into the search functionality and tool detail pages.

---

## Table of Contents

1. [How Updates Flow Into the App](#how-updates-flow-into-the-app)
2. [Adding a New AI Tool](#adding-a-new-ai-tool)
3. [Updating an Existing AI Tool](#updating-an-existing-ai-tool)
4. [Adding or Updating Marketing Goals](#adding-or-updating-marketing-goals)
5. [Required Fields Reference](#required-fields-reference)
6. [Weekly Update Checklist](#weekly-update-checklist)

---

## How Updates Flow Into the App

When you update `docs/ai_toolkit_tools.md`:

1. **Search by Goal** - The AI reads tool descriptions and use cases to recommend the right tools for marketing goals
2. **Search by Tool Name** - Users can search directly for tools like "ChatGPT" or "HeyGen"
3. **Tool Detail Pages** - Each tool gets a dedicated page showing:
   - Name, vendor, and official website
   - Full description ("What it does")
   - Best use cases ("Best for")
   - Pro tips from Q'dUp experts
   - Related tools and marketing goals

**Important:** After updating the documentation, a developer must manually extract the changes and update the application code. The app does not automatically read from the markdown file.

---

## Adding a New AI Tool

### Step 1: Copy the New Tool Template

See the **New Tool Template** section at the end of this document or use this format:

```markdown
## Tool Name
**Vendor:** Company Name
**Website:** https://tool-website.com
**Category:** [Content Creation | Video Generation | Voice & Audio | etc.]

**What it does:**
[2-3 sentence description of what the tool does and its key features]

**Best for:**
- [Specific use case 1]
- [Specific use case 2]
- [Specific use case 3]
- [Additional use cases as needed]

**💡 Q'dUp Pro Tip:**
[Practical advice for getting the most out of this tool]

**Pricing:** [Optional - only if you have pricing info]
Free tier available | Starting at $X/month | Enterprise pricing

**Related Tools:**
- Tool Name 1
- Tool Name 2
- Tool Name 3
```

### Step 2: Determine the Category

Place your new tool under the appropriate section heading in `ai_toolkit_tools.md`:

- **# AI Tools for Content Creation** - Writing, blogging, copywriting
- **# AI Tools for Video Generation & Editing** - Video creation and editing
- **# AI Avatars & Digital Humans** - Avatar and digital spokesperson tools
- **# AI Tools for Voice & Audio** - Voice generation, cloning, audio production
- **# AI Tools for Visual Content Creation** - Image generation, graphic design
- **# Vibe Coding & No-Code AI Development** - App building without coding
- **# AI Tools for Research & SEO** - Research, SEO optimization, content analysis
- **# AI Tools for Social Media & Productivity** - Social management, automation
- **# AI Tools for Podcast Production** - Podcast recording, editing, repurposing
- **# Marketing Automation & Distribution Tools** - Email, CRM, workflows
- **# AI Tools for Analytics & Intelligence** - Analytics and business intelligence

### Step 3: Fill Out All Required Fields

✅ **Required Fields:**
- Tool Name
- Vendor
- **Website** (This is MANDATORY as of November 2025)
- Category
- What it does
- Best for (at least 3 use cases)

✅ **Recommended Fields:**
- Q'dUp Pro Tip
- Pricing (if known)
- Related Tools

### Step 4: Add to the Document

Insert your new tool entry in alphabetical order within its category section in `docs/ai_toolkit_tools.md`.

---

## Updating an Existing AI Tool

### What You Can Update:

1. **Website** - Add if missing, or update if changed
2. **Description** - Update "What it does" with new features or capabilities
3. **Use Cases** - Add new use cases to "Best for" list
4. **Pro Tip** - Update with new insights or better advice
5. **Pricing** - Add or update pricing information
6. **Related Tools** - Add newly discovered related tools

### How to Update:

1. **Find the tool** in `docs/ai_toolkit_tools.md` (use Ctrl+F or Cmd+F)
2. **Make your changes** following the same format as the original entry
3. **Ensure Website field exists** - If it's missing, ADD IT (this is now required)
4. **Keep the same structure** - Don't change the markdown headings or format
5. **Save the file**

### Example Update:

**Before:**
```markdown
## ChatGPT
**Vendor:** OpenAI

**What it does:**
Conversational AI assistant for writing blog posts and brainstorming content ideas.

**Best for:**
- Blog content ideation
- First drafts
```

**After:**
```markdown
## ChatGPT
**Vendor:** OpenAI
**Website:** https://chat.openai.com
**Category:** Content Creation

**What it does:**
Conversational AI assistant for writing blog posts, brainstorming content ideas, drafting social media captions, creating video scripts, answering questions, and assisting with research.

**Best for:**
- Blog content ideation
- Outline creation
- First drafts
- Email copywriting
- Social media content
- Content strategy brainstorming

**💡 Q'dUp Pro Tip:**
Use ChatGPT to generate multiple content angles for a single topic, then refine the best approach. Excellent for overcoming writer's block.
```

---

## Adding or Updating Marketing Goals

Marketing goals are **curated separately** by the development team based on common use cases found in the toolkit. However, you can suggest new goals or updates by:

### Suggesting a New Goal:

Add a note at the top of `docs/ai_toolkit_tools.md` like this:

```markdown
---
**SUGGESTED MARKETING GOAL:**
Title: Create AI-Powered Email Campaigns
Description: Automate email marketing with AI-generated subject lines, personalized content, and optimal send times.
Recommended Tools: HubSpot AI, Mailchimp AI, ChatGPT, Claude
---
```

The development team will review and potentially add this to the goals database.

### Goal Structure (For Reference):

Marketing goals in the app include:
- **Title** - What the goal achieves (e.g., "Create Blog Content Faster")
- **Description** - Explanation of the goal
- **Category** - Content Marketing, Video Marketing, Audio Marketing, Social Media, SEO & Research, or Automation
- **Recommended Tools** - List of tool IDs from the toolkit
- **Workflow** - Step-by-step process with tool assignments
- **Example Prompts** - Starter prompts to copy and paste
- **Difficulty** - Beginner, Intermediate, or Advanced
- **Estimated Timeframe** - How long it takes to achieve

---

## Required Fields Reference

### For All AI Tools (Mandatory):

| Field | Required | Format | Example |
|-------|----------|--------|---------|
| Tool Name | ✅ Yes | Plain text | `ChatGPT` |
| Vendor | ✅ Yes | Plain text | `OpenAI` |
| **Website** | ✅ **YES** | Full URL | `https://chat.openai.com` |
| Category | ✅ Yes | Section heading | `Content Creation` |
| What it does | ✅ Yes | 2-3 sentences | Full description of capabilities |
| Best for | ✅ Yes | Bullet list | Minimum 3 use cases |

### Optional But Recommended:

| Field | Optional | Format | Example |
|-------|----------|--------|---------|
| Pro Tip | Recommended | Paragraph | Practical advice |
| Pricing | Optional | Text | `$20/month` or `Free tier available` |
| Related Tools | Recommended | Bullet list | 2-5 related tool names |

---

## Weekly Update Checklist

Use this checklist when making weekly updates to the AI toolkit:

### Before You Start:
- [ ] Review recent AI tool launches and updates
- [ ] Check vendor websites for pricing changes
- [ ] Identify any new use cases or workflows

### For Each New Tool:
- [ ] Tool name and vendor confirmed
- [ ] **Website URL added** (REQUIRED)
- [ ] Category identified
- [ ] "What it does" written (2-3 sentences)
- [ ] "Best for" has at least 3 use cases
- [ ] Pro tip written (practical, specific advice)
- [ ] Pricing researched (if available)
- [ ] Related tools identified (2-5 tools)
- [ ] Added to correct category section
- [ ] Alphabetically ordered within category

### For Tool Updates:
- [ ] Found existing tool entry
- [ ] **Website field added if missing** (REQUIRED)
- [ ] Description updated with new features
- [ ] New use cases added to "Best for"
- [ ] Pro tip updated or improved
- [ ] Pricing updated (if changed)
- [ ] Related tools expanded

### After Updates:
- [ ] File saved: `docs/ai_toolkit_tools.md`
- [ ] Changes documented (optional: keep change log)
- [ ] Notify development team for code updates
- [ ] Review changes in app after deployment

---

## Templates

Copy and paste these templates when adding new content:

### New Tool Template

```markdown
## [Tool Name]
**Vendor:** [Company Name]
**Website:** [https://tool-website.com]
**Category:** [Category Name]

**What it does:**
[2-3 sentence description of the tool's main purpose and key features. Be specific about what it actually does, not just marketing fluff.]

**Best for:**
- [Specific use case or audience 1]
- [Specific use case or audience 2]
- [Specific use case or audience 3]
- [Additional use cases as needed]

**💡 Q'dUp Pro Tip:**
[Practical, actionable advice for getting the best results from this tool. Should be specific and immediately useful.]

**Pricing:** [Optional]
[Free tier info | Starting price | Enterprise pricing]

**Related Tools:**
- [Related Tool 1]
- [Related Tool 2]
- [Related Tool 3]
```

### Tool Update Template

When updating an existing tool, ensure these fields are present and current:

```markdown
## [Existing Tool Name]
**Vendor:** [Verify company name]
**Website:** [ADD IF MISSING - Required as of Nov 2025]
**Category:** [Verify category placement]

**What it does:**
[Update with any new features, capabilities, or changes since last update]

**Best for:**
- [Keep existing use cases that are still relevant]
- [Add new use cases based on new features]
- [Remove outdated use cases]

**💡 Q'dUp Pro Tip:**
[Update tip if you have better advice or new insights]

**Pricing:** [Update if pricing has changed]
[New pricing information]

**Related Tools:**
- [Add newly discovered related tools]
- [Keep existing related tools]
```

### Marketing Goal Suggestion Template

```markdown
---
**SUGGESTED MARKETING GOAL**

**Title:** [Clear, action-oriented goal title]

**Description:**
[1-2 sentences explaining what this goal achieves and why it matters]

**Category:** [Content Marketing | Video Marketing | Audio Marketing | Social Media | SEO & Research | Automation]

**Recommended Tools:**
1. [Primary Tool] - [Why it's recommended]
2. [Secondary Tool] - [Why it's recommended]
3. [Additional Tool] - [Why it's recommended]

**Suggested Workflow:**
1. [Step 1 with tool assignment]
2. [Step 2 with tool assignment]
3. [Step 3 with tool assignment]

**Difficulty:** [Beginner | Intermediate | Advanced]

**Estimated Timeframe:** [How long to achieve this goal]
---
```

---

## Important Notes

### Website Field is Now Required
As of November 2025, **every tool MUST include a Website field**. This allows users to:
- Visit the official tool website directly from the app
- Verify pricing and features
- Sign up for accounts
- Get official support

If you add a tool without a Website field, it will be flagged as incomplete.

### How Changes Appear in the App

After you update `docs/ai_toolkit_tools.md`:

1. **Developer extracts changes** - A developer manually updates the tool database in the code
2. **Search gets updated** - New tools appear in search results
3. **Detail pages created** - New tools get dedicated detail pages
4. **Related content updated** - Related tools and goals are linked

This is not automatic - coordinate with your development team for deployments.

### Quality Guidelines

- **Be Specific:** Avoid vague descriptions like "helps with marketing"
- **Be Accurate:** Verify all information before adding
- **Be Helpful:** Focus on practical use cases, not marketing hype
- **Be Current:** Include the most recent features and pricing
- **Be Consistent:** Follow the exact format in the templates

---

## Questions or Issues?

If you encounter any issues or have questions about updating content:

1. Check the templates in this document
2. Look at existing tool entries for examples
3. Contact the development team for clarification

**Remember:** The Website field is now REQUIRED for all tools. Don't skip it!

---

*Last updated: November 2025*
*AI Marketing GPS Content Team*
