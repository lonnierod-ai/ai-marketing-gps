# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Marketing GPS is a Next.js 16 application that uses Anthropic's Claude API to provide AI-powered marketing guidance. The project uses the App Router architecture with TypeScript and Tailwind CSS.

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
- Current model: `claude-3-5-sonnet-20241022` (defined in `src/lib/anthropic.ts`)

### Environment Variables
- Store in `.env.local` (never commit this file)
- Template available in `.env.example`
- Required: `ANTHROPIC_API_KEY`
- Server-only variables are accessed via `process.env.*`
- Public client variables must be prefixed with `NEXT_PUBLIC_`

### Styling
- Uses Tailwind CSS with configuration in `tailwind.config.ts`
- Global styles in `src/app/globals.css`
- CSS variables for theming defined in `:root` and supports dark mode via `prefers-color-scheme`

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
