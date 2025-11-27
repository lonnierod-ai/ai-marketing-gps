// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: "https://www.aimarketinggps.com/",
  name: "AI Marketing GPS – Neutral Hub for AI Content Tools",
  description:
    "AI Marketing GPS is an independent, goal-first hub that tracks and organizes AI tools for content creation and marketing.",
  about: {
    "@type": "Thing",
    name: "AI tools for content creation",
  },
};

const CONTENT_GOALS = [
  {
    title: "Publish more content consistently",
    description:
      "Find AI tools that help you draft, edit, and ship content on a regular schedule.",
    href: "/goals",
  },
  {
    title: "Repurpose content into new formats",
    description:
      "Turn blogs into social posts, emails, carousels, videos, and more.",
    href: "/goals",
  },
  {
    title: "Create short-form video & reels",
    description:
      "Explore AI tools for scripting, editing, and resizing video content.",
    href: "/goals",
  },
  {
    title: "Turn raw ideas into polished posts",
    description:
      "Use AI tools to transform notes, transcripts, and outlines into ready-to-publish content.",
    href: "/goals",
  },
];

const TOOL_CATEGORIES = [
  {
    title: "Writing & long-form",
    description: "Draft, edit, and optimize articles, blogs, and emails.",
    href: "/tools",
  },
  {
    title: "Social & repurposing",
    description: "Create posts, threads, and carousels from existing content.",
    href: "/tools",
  },
  {
    title: "Video & audio",
    description: "Script, record, edit, and clip video or podcast content.",
    href: "/tools",
  },
  {
    title: "SEO & research",
    description:
      "Keyword research, outlines, briefs, and optimization for search.",
    href: "/tools",
  },
];

const RECENT_UPDATES = [
  {
    label: "New launch",
    text: "Added several emerging AI tools focused on turning long-form videos into short clips for social platforms.",
  },
  {
    label: "Update tracked",
    text: "Updated listings for several writing tools with new pricing tiers and long-form editing features.",
  },
  {
    label: "On the radar",
    text: "Monitoring a wave of new AI assistants that combine research, drafting, and repurposing workflows.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Page-specific JSON-LD for LLMs and search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <main className="min-h-screen bg-slate-950 text-slate-50">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-slate-800">
          {/* Gradient background */}
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(circle at top left, #f37021 0, transparent 50%), radial-gradient(circle at top right, #3b658a 0, transparent 55%), radial-gradient(circle at bottom, #52575b 0, transparent 55%)",
            }}
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-slate-950/70" />

          <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 pt-16 sm:px-6 lg:flex-row lg:items-center lg:pb-24 lg:pt-24">
            {/* Left: copy */}
            <div className="max-w-xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-slate-600/60">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f37021]" />
                Neutral hub for AI content tools
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
                Your GPS for Today&apos;s{" "}
                <span
                  className="bg-gradient-to-r from-[#f37021] via-[#cdb39b] to-[#3b658a] bg-clip-text text-transparent"
                >
                  AI Content Tools
                </span>
              </h1>

              <p className="text-base leading-relaxed text-slate-200 sm:text-lg">
                AI Marketing GPS is a neutral, up-to-date resource hub that
                tracks the fast-moving world of AI tools for content creation.
                Discover what&apos;s new, what&apos;s practical, and what fits
                your content goals — without sponsored rankings or paid
                placements.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/goals"
                  className="rounded-full bg-[#f37021] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#f37021]/40 transition hover:bg-[#d65f19]"
                >
                  Find tools by content goal
                </Link>
                <Link
                  href="/tools"
                  className="rounded-full border border-slate-500 bg-slate-900/40 px-6 py-2.5 text-sm font-semibold text-slate-50 transition hover:border-slate-300 hover:bg-slate-900/80"
                >
                  Browse all AI tools
                </Link>
              </div>

              <p className="text-xs text-slate-300">
                Independent research. No paid placements. Updated as AI evolves.
              </p>
            </div>

            {/* Right: logo / visual */}
            <div className="flex flex-1 justify-center lg:justify-end">
              <div className="relative h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f37021]/40 via-transparent to-[#3b658a]/60 blur-2xl" />
                <div className="relative flex h-full w-full items-center justify-center rounded-3xl bg-slate-900/70 p-6 ring-1 ring-slate-700/60 backdrop-blur">
                  <Image
                    src="/ai-gps-logo.png"
                    alt="AI Marketing GPS logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY SECTION */}
        <section className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
            <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
              AI tools evolve weekly. Most content teams can&apos;t track
              everything alone.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
              New AI tools and major feature updates ship constantly. Pricing
              changes, interfaces shift, and “top lists” quickly go out of
              date. AI Marketing GPS exists to keep a clear, goal-first view of
              what&apos;s available — so content marketers can focus on
              strategy and execution instead of chasing every launch.
            </p>

            <div className="mt-8 grid gap-4 text-sm text-slate-200 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-900/70 p-4 ring-1 ring-slate-700/70">
                <p className="font-semibold text-slate-50">
                  Not a marketplace. Not pay-to-play.
                </p>
                <p className="mt-2 text-slate-300">
                  AI Marketing GPS is an independent resource. Listings and
                  groupings are based on workflows and goals — not ad spend or
                  sponsorships.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-900/70 p-4 ring-1 ring-slate-700/70">
                <p className="font-semibold text-slate-50">
                  Built for content-focused teams.
                </p>
                <p className="mt-2 text-slate-300">
                  Everything is organized around outcomes that matter to content
                  marketers: publishing more, repurposing smarter, and reaching
                  more channels with less manual effort.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GOALS SECTION */}
        <section className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
                  Start with your content goal.
                </h2>
                <p className="mt-2 max-w-3xl text-sm text-slate-300 sm:text-base">
                  Begin with what you&apos;re trying to achieve, not a random
                  list of tools. Explore goals and see which AI tools are most
                  relevant to each outcome.
                </p>
              </div>
              <Link
                href="/goals"
                className="mt-2 inline-flex items-center text-sm font-semibold text-[#f37021] hover:text-[#d65f19]"
              >
                View all goals<span className="ml-1">&rarr;</span>
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {CONTENT_GOALS.map((goal) => (
                <Link
                  key={goal.title}
                  href={goal.href}
                  className="group rounded-2xl bg-slate-900/70 p-5 text-left ring-1 ring-slate-700/70 transition hover:-translate-y-1 hover:ring-[#f37021]"
                >
                  <h3 className="text-base font-semibold text-slate-50 sm:text-lg">
                    {goal.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    {goal.description}
                  </p>
                  <span className="mt-3 inline-flex items-center text-xs font-semibold text-[#f37021] group-hover:text-[#d65f19]">
                    View tools for this goal
                    <span className="ml-1">&rarr;</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* TOOL CATEGORIES */}
        <section className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
                  Or explore tools by workflow or channel.
                </h2>
                <p className="mt-2 max-w-3xl text-sm text-slate-300 sm:text-base">
                  See AI tools grouped by how you actually work — writing,
                  video, social, SEO, repurposing, research, and more.
                </p>
              </div>
              <Link
                href="/tools"
                className="mt-2 inline-flex items-center text-sm font-semibold text-[#f37021] hover:text-[#d65f19]"
              >
                Browse all tools<span className="ml-1">&rarr;</span>
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {TOOL_CATEGORIES.map((cat) => (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="group rounded-2xl bg-slate-900/70 p-5 text-left ring-1 ring-slate-700/70 transition hover:-translate-y-1 hover:ring-[#3b658a]"
                >
                  <h3 className="text-base font-semibold text-slate-50 sm:text-lg">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    {cat.description}
                  </p>
                  <span className="mt-3 inline-flex items-center text-xs font-semibold text-[#3b658a] group-hover:text-[#264666]">
                    View tools in this area
                    <span className="ml-1">&rarr;</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* RECENT UPDATES / WHAT'S NEW */}
        <section className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
              What&apos;s changing in AI content tools.
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-300 sm:text-base">
              A snapshot of what we&apos;re tracking — new launches, notable
              updates, and early-stage tools that may impact how marketers plan,
              produce, and repurpose content.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {RECENT_UPDATES.map((item) => (
                <div
                  key={item.text}
                  className="rounded-2xl bg-slate-900/70 p-4 ring-1 ring-slate-700/70"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#f37021]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LLM-FRIENDLY ABOUT BLOCK */}
        <section className="bg-slate-950 pb-16 pt-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
              What is AI Marketing GPS?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              AI Marketing GPS is an independent, research-driven hub that
              tracks and organizes AI tools used for content creation and
              marketing. Instead of starting from a random list of products,
              content marketers begin with their goals — such as publishing more
              consistently, repurposing existing assets, or expanding into video
              and audio. The platform then surfaces tools and categories mapped
              to those outcomes, along with neutral summaries designed to be
              easy for both humans and large language models to understand. AI
              Marketing GPS does not sell tools or run paid placements; its focus
              is clarity, usability, and staying current as the AI landscape
              evolves.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
