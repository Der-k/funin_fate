"use client";

import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  async function search(q: string) {
    setQuery(q);

    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();

    setResults(data);
  }

  return (
    <main className="max-w-xl mx-auto p-10">
      <input
        className="border p-3 w-full"
        placeholder="Search Funinfate..."
        value={query}
        onChange={(e) => search(e.target.value)}
      />

      <div className="mt-6">
        {results.map((r) => (
          <div key={r.item.id} className="border-b py-4">
            <h3>{r.item.title}</h3>
            <p>{r.item.description}</p>
            <small>{r.item.url}</small>
          </div>
        ))}
      </div>
    </main>
  );
}