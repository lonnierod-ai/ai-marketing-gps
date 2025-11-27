"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import SearchBar from "@/components/search/SearchBar";

export default function HomePage() {
  const router = useRouter();

  const handleSearch = (query: string, searchType: "goal" | "tool") => {
    const encodedQuery = encodeURIComponent(query);
    router.push(`/search?q=${encodedQuery}&type=${searchType}`);
  };

  const quickLinks = [
    { title: "Create Blog Content", href: "/goal/create-blog-content" },
    { title: "Launch Video Marketing", href: "/goal/create-video-content" },
    { title: "Start a Podcast", href: "/goal/launch-podcast" },
    { title: "Improve SEO", href: "/goal/seo-optimization" },
  ];

  const featuredTools = [
    { name: "ChatGPT", href: "/tool/chatgpt" },
    { name: "Claude", href: "/tool/claude" },
    { name: "HeyGen", href: "/tool/heygen" },
    { name: "Notion AI", href: "/tool/notion-ai" },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top nav */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#f37021] to-[#3b658a] opacity-90" />
            <span className="text-sm font-semibold tracking-tight sm:text-base">
              AI Marketing GPS
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-700 sm:flex">
            <Link href="/goals" className="hover:text-slate-900">
              Goals
            </Link>
            <Link href="/tools" className="hover:text-slate-900">
              Tools
            </Link>
            <Link href="/about" className="hover:text-slate-900">
              About
            </Link>
            <Link
              href="/search"
              className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:border-[#f37021] hover:text-[#f37021]"
            >
              Open search
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO + SEARCH */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        {/* faint icon background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("/ai-gps-icon.png")',
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/90 to-white" />

        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              Neutral hub for AI content tools
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Your GPS for{" "}
              <span className="bg-gradient-to-r from-[#f37021] to-[#3b658a] bg-clip-text text-transparent">
                AI content tools
              </span>
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Discover AI tools for content creation, repurposing, and
              distribution — organized by marketing goal and tool type. No paid
              placements. No hype. Just a clear starting point for your next
              experiment.
            </p>
          </div>

          <div className="mt-8">
            {/* Your existing tabbed search component */}
            <SearchBar onSearch={handleSearch} />
          </div>

          <p className="mt-3 text-center text-xs text-slate-500">
            Use the tabs above to switch between searching by{" "}
            <span className="font-semibold">content marketing goal</span> or by{" "}
            <span className="font-semibold">specific AI tool</span>.
          </p>
        </div>
      </section>

      {/* QUICK LINKS & FEATURED TOOLS (minimal sections) */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14 md:flex-row">
          {/* Quick links by goal */}
          <div className="flex-1">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Popular goals
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Jump straight into common content marketing outcomes.
            </p>
            <div className="mt-4 grid gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm transition hover:border-[#f37021] hover:text-[#f37021]"
                >
                  <span>{link.title}</span>
                  <span className="text-xs">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured tools */}
          <div className="flex-1">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Example tools
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              A small snapshot of tools you might explore. Listings are neutral
              and organized by fit, not sponsorship.
            </p>
            <div className="mt-4 grid gap-3">
              {featuredTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm transition hover:border-[#3b658a] hover:text-[#3b658a]"
                >
                  <span>{tool.name}</span>
                  <span className="text-xs">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SHORT EXPLAINER */}
      <section className="bg-slate-50 pb-12 pt-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
            How AI Marketing GPS fits into your workflow
          </h2>
          <div className="mt-4 grid gap-4 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="font-semibold text-slate-900">Start with intent</p>
              <p className="mt-2 text-slate-600">
                Describe what you want to achieve: publish more, repurpose
                faster, expand into video, or improve SEO.
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="font-semibold text-slate-900">
                Explore aligned tools
              </p>
              <p className="mt-2 text-slate-600">
                See which AI tools are commonly used for that goal or workflow —
                without sponsored rankings.
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="font-semibold text-slate-900">
                Experiment & iterate
              </p>
              <p className="mt-2 text-slate-600">
                Use AI Marketing GPS as a starting point to decide what to try
                next and how it might fit into your content process.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
