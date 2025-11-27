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

     {/* HERO + SEARCH */}
<section className="relative overflow-hidden border-b border-slate-200 bg-white">
  
  {/* HERO BACKGROUND ICON */}
  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
    <div
      className="opacity-25"
      style={{
        backgroundImage: 'url("/ai-gps-hero.png")',
        backgroundSize: "800px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "800px",
        height: "800px",
      }}
    ></div>
  </div>

  {/* Soft overlay for readability */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-white/70 to-white"></div>

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
        Discover AI tools for content creation, repurposing, and distribution —
        organized by marketing goal and tool type. No paid placements. No hype.
        Just a clear starting point for your next experiment.
      </p>
    </div>

    <div className="mt-8">
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
            <p className="mt-1 text-sm text-slate-600 min-h-[40px]">
              Jump straight into common content marketing outcomes.
            </p>
            <div className="mt-6 grid gap-3">
              ...
            </div>
          </div>

          {/* Featured tools */}
          <div className="flex-1">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Example tools
            </h2>
            <p className="mt-1 text-sm text-slate-600 min-h-[40px]">
              A small snapshot of tools you might explore. Listings are neutral
              and organized by fit.
            </p>
            <div className="mt-6 grid gap-3">
              ...
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
