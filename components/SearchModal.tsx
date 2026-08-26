"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { searchSite, type SearchDocument } from "@/lib/site/search-index";
import { DEFAULT_SCROLL_MARGIN_TOP } from "@/lib/site/section-config";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

function scrollToHash(hash: string) {
  const target = document.getElementById(hash);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - DEFAULT_SCROLL_MARGIN_TOP;
  window.scrollTo({ top, behavior: "smooth" });
  window.history.pushState(null, "", `/#${hash}`);
}

const TYPE_LABELS: Record<SearchDocument["type"], string> = {
  section: "Section",
  business: "Business",
  event: "Event",
  stay: "Stay",
  amenity: "Amenity",
  category: "Highlight",
};

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Every result here comes from lib/site/search-index.ts, which combines
  // section metadata with the actual page content (businesses, events,
  // stays, amenities) read from data/*.json. Add/edit an item in one of
  // those JSON files and it's searchable here automatically.
  const results: SearchDocument[] = useMemo(() => {
    if (!query.trim()) return [];
    return searchSite(query);
  }, [query]);

  // Reset + focus whenever the modal opens.
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Close on Escape even if focus isn't in the input.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleSelect = (doc: SearchDocument) => {
    const hash = doc.url.split("#")[1];
    onClose();

    if (pathname === "/" && hash) {
      // Already on the homepage — smooth-scroll straight there.
      requestAnimationFrame(() => scrollToHash(hash));
    } else {
      // From another route: navigate home, then let PendingScrollHandler
      // (mounted on the homepage) finish the scroll once it's rendered.
      if (hash) sessionStorage.setItem("pendingSectionScroll", hash);
      router.push(doc.url);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const doc = results[activeIndex];
      if (doc) handleSelect(doc);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-24 sm:pt-32"
      style={{ background: "rgba(10,18,24,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl shadow-2xl"
        style={{ background: "#36454F", border: "1px solid rgba(32,178,170,0.25)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center gap-3 border-b px-4 py-3"
          style={{ borderColor: "rgba(245,222,179,0.12)" }}
        >
          <Search className="h-4 w-4 flex-shrink-0" style={{ color: "#20B2AA" }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search Fate — dining, events, stays..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-white/30"
            style={{ color: "#F5DEB3" }}
          />
          <button onClick={onClose} aria-label="Close search" className="flex-shrink-0">
            <X className="h-4 w-4" style={{ color: "rgba(245,222,179,0.5)" }} />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto py-2">
          {query.trim() && results.length === 0 && (
            <p
              className="px-4 py-6 text-center text-sm"
              style={{ color: "rgba(245,222,179,0.45)" }}
            >
              No matches for &ldquo;{query}&rdquo;.
            </p>
          )}

          {results.map((doc, i) => (
            <button
              key={doc.id}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => handleSelect(doc)}
              className="flex w-full flex-col gap-0.5 px-4 py-3 text-left transition-colors"
              style={{
                background: i === activeIndex ? "rgba(32,178,170,0.12)" : "transparent",
              }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="text-sm font-bold uppercase tracking-wide"
                  style={{ color: "#F5DEB3" }}
                >
                  {doc.title}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{
                    color: "#20B2AA",
                    background: "rgba(32,178,170,0.14)",
                  }}
                >
                  {TYPE_LABELS[doc.type]}
                </span>
              </span>
              <span className="text-xs" style={{ color: "rgba(245,222,179,0.55)" }}>
                {doc.description}
              </span>
            </button>
          ))}

          {!query.trim() && (
            <p
              className="px-4 py-6 text-center text-sm"
              style={{ color: "rgba(245,222,179,0.4)" }}
            >
              Start typing to search sections of the site.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}