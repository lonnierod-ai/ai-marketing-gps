"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/search/SearchBar";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();

  const handleSearch = (query: string, searchType: "goal" | "tool") => {
    // Encode the query and navigate to search results page
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
    { name: "NotebookLM", href: "/tool/notebooklm" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-sand/10 to-white">

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center pt-8 pb-8 sm:pt-12 sm:pb-10 lg:pt-16 lg:pb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4">
            Find the Right AI Tools for Your Marketing Goals
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-brand-dark/70 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto">
            Tell us what you want to achieve, and we'll guide you to the AI
            tools that help you get there—based on our curated AI Marketing
            Toolkit.
          </p>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* How It Works */}
        <section className="py-8 sm:py-12 lg:py-16 border-t border-brand-sand/30">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-brand-dark mb-8 sm:mb-10 lg:mb-12">
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-brand-blue rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl font-bold text-white">1</span>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-brand-dark mb-2">
                Describe Your Goal
              </h4>
              <p className="text-sm sm:text-base text-brand-dark/70">
                Tell us what you want to achieve in natural language. No
                technical jargon needed.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brand-blue rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl font-bold text-white">2</span>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-brand-dark mb-2">
                Get Matched to Tools
              </h4>
              <p className="text-sm sm:text-base text-brand-dark/70">
                Our AI analyzes your goal and recommends the best tools from our
                curated toolkit.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brand-blue rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl font-bold text-white">3</span>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-brand-dark mb-2">
                Follow the Workflow
              </h4>
              <p className="text-sm sm:text-base text-brand-dark/70">
                Get step-by-step guidance, example prompts, and pro tips to
                achieve your goal.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-8 sm:py-12 lg:py-16 border-t border-brand-sand/30">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-brand-dark mb-6 sm:mb-8">
            Popular Goals
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block p-4 sm:p-6 bg-white border border-brand-sand/40 rounded-lg hover:shadow-md hover:border-brand-orange/30 transition-all text-center min-h-[60px] flex items-center justify-center"
              >
                <span className="text-base sm:text-lg font-semibold text-brand-dark">
                  {link.title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Tools */}
        <section className="py-8 sm:py-12 lg:py-16 border-t border-brand-sand/30">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-brand-dark mb-6 sm:mb-8">
            Featured Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-2xl mx-auto">
            {featuredTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-brand-blue/10 text-brand-blue rounded-full hover:bg-brand-orange hover:text-white transition-colors font-medium text-sm sm:text-base"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-sand/30 mt-8 sm:mt-12 lg:mt-16 py-6 sm:py-8 bg-brand-sand/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-brand-dark/60">
          <p className="mb-2 text-sm sm:text-base">
            Data curated from Q'dUp Content Marketing Agency's AI Toolkit
            (November 2025)
          </p>
          <p className="text-xs sm:text-sm">
            AI tools and features are subject to change. Always verify current
            information with vendors.
          </p>
        </div>
      </footer>
    </div>
  );
}
