# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Aithello (formerly AI Marketing GPS) is Lonnie Rodriguez's AI consulting site, with a curated AI tool directory for small business owners and creators. It is a Next.js 16 application using the App Router, TypeScript, and Tailwind CSS. A front-end redesign is in progress on the redesign branch; see the Aithello redesign section below.

## Development Commands

### Running the application
```bash
npm run dev          # Start development server at http://localhost:3000
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler checks without emitting files
```

### Installing dependencies
```bash
npm install          # Install all dependencies
npm install <pkg>    # Add a new dependency
```

## Architecture

### App Router Structure
This project uses Next.js 16 App Router (not Pages Router). All routes are defined in `src/app/`:
- `src/app/page.tsx` - Home page (Server Component by default)
- `src/app/layout.tsx` - Root layout wrapping all pages
- `src/app/api/` - API route handlers (Route Handlers, not API routes)

### Server vs Client Components
- By default, all components in `src/app/` are Server Components
- Use `'use client'` directive at the top of files that need client-side interactivity (hooks, event handlers, browser APIs)
- Server Components can directly access environment variables and make API calls
- Client Components should call API routes in `src/app/api/` instead of calling external APIs directly

### Anthropic Claude Integration
- The Anthropic client is initialized in `src/lib/anthropic.ts`
- API calls to Claude are made through Next.js API routes (e.g., `src/app/api/chat/route.ts`)
- Never expose the API key to the client - all Claude API calls must happen server-side
- The current model is defined in src/lib/anthropic.ts. Check that file rather than relying on a model name written here.

### Environment Variables
- Store in `.env.local` (never commit this file)
- Template available in `.env.example`
- Required: `ANTHROPIC_API_KEY`
- Server-only variables are accessed via `process.env.*`
- Public client variables must be prefixed with `NEXT_PUBLIC_`

### Styling
- Uses Tailwind CSS with configuration in `tailwind.config.ts`
- Global styles in `src/app/globals.css`
- The redesign uses a single light theme (spec section 5). Do not add dark-mode styles. The existing dark-mode block in globals.css will be removed during the foundation step.

### TypeScript Configuration
- Strict mode enabled
- Path aliases configured: `@/*` maps to `src/*`
- Import using `@/` prefix: `import { x } from "@/lib/utils"`

## Code Patterns

### API Route Structure
API routes in `src/app/api/` should follow this pattern:
```typescript
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Process request
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: "Message" }, { status: 500 });
  }
}
```

### Calling Claude API
Always use the initialized client from `@/lib/anthropic`:
```typescript
import { anthropic, MODEL } from "@/lib/anthropic";

const response = await anthropic.messages.create({
  model: MODEL,
  max_tokens: 1024,
  messages: [{ role: "user", content: "..." }],
});
```

## File Organization

- `src/app/` - Pages, layouts, and API routes
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions and third-party service integrations
- `src/types/` - Shared TypeScript type definitions
- `public/` - Static assets (images, fonts, etc.)

## Important Notes

- This is a full-stack application - both frontend and backend live in the same codebase
- API routes run on the server and can safely use secrets
- The Anthropic SDK should only be imported in server-side code (API routes or Server Components)
- When adding new features that use Claude, create a dedicated API route rather than calling the Anthropic API directly from components

## Aithello redesign
- The design source of truth is docs/Aithello_Site_Design_Spec.md. Read the relevant section before any design or front-end work. If a request conflicts with the spec, say so before building.
- Work only on the redesign branch. Never commit to or push to main.
- Do not modify src/lib/data/tools.ts, src/lib/data/goals.ts, or src/lib/data/categories.ts.
- Run npx tsc --noEmit before every commit. It must pass clean.
- Ask before deleting files or rewriting git history.
- Plan first. Wait for my approval before editing files.
- Colors and type come only from spec sections 5 and 6. Never use #F37021 or #5B9BD5. Never use orange for text. Quattrocento Sans at weights 400 and 700 only.
- No em dashes anywhere in site copy. Keep all user-facing language plain, friendly, and non-technical.
- The Market Intel chat widget (src/components/MarketIntelChat.tsx and src/app/api/chat/route.ts) is being replaced by the prompt builder described in spec section 9. Do not extend or restyle it.
