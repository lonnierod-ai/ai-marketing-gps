"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string, searchType: "goal" | "tool") => void;
  placeholder?: string;
  defaultSearchType?: "goal" | "tool";
}

export default function SearchBar({
  onSearch,
  placeholder = "What marketing goal do you want to achieve?",
  defaultSearchType = "goal",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<"goal" | "tool">(
    defaultSearchType
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), searchType);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      {/* Search Type Toggle */}
      <div className="flex flex-col sm:flex-row justify-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setSearchType("goal")}
          className={`w-full sm:w-auto px-4 py-3 sm:py-2 rounded-lg text-sm font-medium transition-colors ${
            searchType === "goal"
              ? "bg-brand-blue text-white"
              : "bg-white border border-brand-sand text-brand-dark hover:bg-brand-sand/20"
          }`}
        >
          Search by Goal
        </button>
        <button
          type="button"
          onClick={() => setSearchType("tool")}
          className={`w-full sm:w-auto px-4 py-3 sm:py-2 rounded-lg text-sm font-medium transition-colors ${
            searchType === "tool"
              ? "bg-brand-blue text-white"
              : "bg-white border border-brand-sand text-brand-dark hover:bg-brand-sand/20"
          }`}
        >
          Search by Tool Name
        </button>
      </div>

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            searchType === "goal"
              ? placeholder
              : "Search for a tool (e.g., ChatGPT, HeyGen)..."
          }
          className="w-full px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg border-2 border-brand-sand rounded-xl focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-colors"
        />
        <button
          type="submit"
          className="w-full sm:w-auto sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 bg-brand-orange text-white px-6 py-3 sm:py-2 rounded-lg hover:bg-[#d96419] transition-colors font-medium shadow-sm"
        >
          Search
        </button>
      </div>

      {/* Example Queries */}
      <div className="mt-3 text-xs sm:text-sm text-brand-dark/60">
        {searchType === "goal" ? (
          <div className="flex flex-wrap gap-x-1">
            <span>Try:</span>
            <button
              type="button"
              onClick={() => setQuery("create blog posts faster")}
              className="text-brand-blue hover:text-brand-orange hover:underline"
            >
              "create blog posts faster"
            </button>
            <span>,</span>
            <button
              type="button"
              onClick={() => setQuery("launch a podcast")}
              className="text-brand-blue hover:text-brand-orange hover:underline"
            >
              "launch a podcast"
            </button>
            <span>,</span>
            <button
              type="button"
              onClick={() => setQuery("make social media videos")}
              className="text-brand-blue hover:text-brand-orange hover:underline"
            >
              "make social media videos"
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-x-1">
            <span>Try:</span>
            <button
              type="button"
              onClick={() => setQuery("ChatGPT")}
              className="text-brand-blue hover:text-brand-orange hover:underline"
            >
              "ChatGPT"
            </button>
            <span>,</span>
            <button
              type="button"
              onClick={() => setQuery("HeyGen")}
              className="text-brand-blue hover:text-brand-orange hover:underline"
            >
              "HeyGen"
            </button>
            <span>,</span>
            <button
              type="button"
              onClick={() => setQuery("NotebookLM")}
              className="text-brand-blue hover:text-brand-orange hover:underline"
            >
              "NotebookLM"
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
