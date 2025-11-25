# AI Marketing GPS

An AI-powered marketing guidance system built with Next.js and Anthropic's Claude API.

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager
- Anthropic API key

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file and add your Anthropic API key:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API key:
```
ANTHROPIC_API_KEY=your_actual_api_key_here
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API
- **Runtime**: Node.js

## Project Structure

```
ai-marketing-gps/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   ├── lib/              # Utility libraries
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
└── package.json          # Project dependencies
```
# ai-marketing-gps
