"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type SearchResult = {
  id: string;
  title: string;
  description?: string;
  type: string;
  url: string;
};

export default function SearchTestPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );

        const data = await res.json();

        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <main className="max-w-3xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">
        Search Test
      </h1>

      <input
        className="w-full border rounded-lg p-4 text-lg"
        placeholder="Search anything..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <p className="mt-3 text-gray-500">
        Searching for: <strong>{query || "Nothing yet"}</strong>
      </p>

      {loading && (
        <p className="mt-6">Searching...</p>
      )}

      {!loading && results.length > 0 && (
        <div className="mt-8 space-y-4">
          {results.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="block border rounded-lg p-5 hover:bg-gray-50"
            >
              <h2 className="text-xl font-semibold">
                {item.title}
              </h2>

              <p className="text-sm text-blue-600 uppercase mt-1">
                {item.type}
              </p>

              {item.description && (
                <p className="mt-2 text-gray-600">
                  {item.description}
                </p>
              )}

              <p className="mt-3 text-sm text-gray-400">
                {item.url}
              </p>
            </Link>
          ))}
        </div>
      )}

      {!loading && query && results.length === 0 && (
        <div className="mt-10 text-center text-gray-500">
          No results found.
        </div>
      )}
    </main>
  );
}