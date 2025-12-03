"use client";
export const dynamic = "force-dynamic";


import { Suspense,useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";
import { SearchResponse } from "@/types";
import Link from "next/link";

function SearchPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = searchParams.get("q") || "";
  const searchType = (searchParams.get("type") as "goal" | "tool") || "goal";

  useEffect(() => {
    if (!query) {
      router.push("/");
      return;
    }

    const performSearch = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, searchType }),
        });

        if (!response.ok) {
          throw new Error("Search failed");
        }

        const data: SearchResponse = await response.json();
        setResults(data);
      } catch (err) {
        setError("An error occurred while searching. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query, searchType, router]);

  const handleNewSearch = (newQuery: string, newSearchType: "goal" | "tool") => {
    const encodedQuery = encodeURIComponent(newQuery);
    router.push(`/search?q=${encodedQuery}&type=${newSearchType}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* REMOVED DUPLICATE HEADER - layout.tsx already has the main header */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Search Bar */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <SearchBar
            onSearch={handleNewSearch}
            defaultSearchType={searchType}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Results */}
        {!loading && !error && results && (
          <SearchResults
            results={results.results}
            query={results.query}
            searchType={results.searchType}
            onNewSearch={() => router.push("/")}
          />
        )}
      </main>
    </div>
  );
}
export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageInner />
    </Suspense>
  );
}
