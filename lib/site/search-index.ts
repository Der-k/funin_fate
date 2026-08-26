import { sectionConfig } from "./section-config";
import { getContentSearchIndex } from "./content-index";
import type { SearchDocument } from "./search-types";

export type { SearchDocument };

/** Section-level entries only (Discover, Dining, Events, Stay). */
export function getSectionSearchIndex(): SearchDocument[] {
  return sectionConfig
    .filter((section) => section.searchable)
    .map((section) => ({
      id: `section:${section.id}`,
      title: section.title,
      description: section.description,
      keywords: section.keywords,
      url: `/#${section.id}`,
      type: "section" as const,
    }));
}

/**
 * The full search index: section-level entries PLUS every individual piece
 * of content (businesses, events, stays, amenities, category tiles) pulled
 * from content-index.ts. This is what the search UI should query against.
 *
 * Built once at module load rather than on every keystroke — the underlying
 * data is static JSON, so there's no reason to re-flatten it per query.
 */
const FULL_INDEX: SearchDocument[] = [
  ...getSectionSearchIndex(),
  ...getContentSearchIndex(),
];

export function getFullSearchIndex(): SearchDocument[] {
  return FULL_INDEX;
}

/**
 * Flat substring search across title, description, and keywords for every
 * document in the full index. Swap the internals here (Fuse.js, a real
 * backend, etc.) later without touching any call sites.
 */
export function searchSite(query: string): SearchDocument[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return FULL_INDEX.filter((doc) => {
    const haystack = [doc.title, doc.description, ...doc.keywords]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

/** @deprecated use searchSite — kept so any earlier call sites still work. */
export const searchSections = searchSite;