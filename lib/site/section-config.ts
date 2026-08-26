/**
 * Single source of truth for landing-page section METADATA.
 *
 * This file intentionally contains no React/component imports. It should stay
 * safe to import from anywhere — server components, API routes, search
 * indexers, the navbar, a future command palette — without pulling in the
 * (potentially large) client-component bundles that render each section.
 *
 * To add a new section:
 *   1. Add an entry here.
 *   2. Register its component in `section-components.tsx`.
 * That's it — the homepage, navbar, and search index all update automatically.
 */

export interface SectionMeta {
  /** Stable identifier. Used as the DOM id, the URL hash (#id), and the
   *  registry key. Must be unique and should never change once published
   *  (search results / bookmarks / navbar links depend on it). */
  id: string;

  /** Heading shown in the section itself and used as the search-result title. */
  title: string;

  /** Short description used for search results and meta/SEO purposes. */
  description: string;

  /** Extra terms a search engine or chatbot should match against, beyond
   *  the title/description (synonyms, related concepts, etc). */
  keywords: string[];

  /** Whether this section should be included in the generated search index. */
  searchable: boolean;

  /** Whether this section should appear as a navbar link.
   *  Defaults to true when omitted. */
  showInNav?: boolean;

  /** Optional override for navbar link text, if it should differ from `title`
   *  (e.g. title "Discover the City" but navLabel "Discover"). */
  navLabel?: string;

  /** Optional override for the sticky-header scroll offset (px) used as
   *  `scrollMarginTop` when the section is linked to via #hash. Falls back
   *  to DEFAULT_SCROLL_MARGIN_TOP if omitted. */
  scrollMarginTop?: number;

  /** Controls render/nav order. Lower numbers render first. Falls back to
   *  the array's declaration order when omitted — kept explicit here so
   *  reordering doesn't depend on remembering to physically move entries. */
  order: number;
}

export const DEFAULT_SCROLL_MARGIN_TOP = 110;

export const sectionConfig: SectionMeta[] = [
  {
    id: "discover",
    title: "Discover",
    description: "Explore attractions, experiences and hidden gems around Fate.",
    keywords: ["discover", "explore", "things to do", "attractions", "experiences", "culture"],
    searchable: true,
    navLabel: "Discover",
    order: 0,
  },
  {
    id: "dining",
    title: "Dining",
    description: "Restaurants, rooftop lounges and nightlife across Fate.",
    keywords: ["food", "restaurants", "dining", "nightlife", "drinks", "bars", "cocktails"],
    searchable: true,
    navLabel: "Eat & Drink",
    order: 1,
  },
  {
    id: "events",
    title: "Events",
    description: "Upcoming festivals, concerts and city happenings.",
    keywords: ["events", "calendar", "festivals", "concerts", "things happening", "nightlife"],
    searchable: true,
    navLabel: "Events",
    order: 2,
  },
  {
    id: "stay",
    title: "Stay",
    description: "Hotels, boutique stays and accommodation options.",
    keywords: ["hotels", "accommodation", "stay", "lodging", "rooms", "booking"],
    searchable: true,
    navLabel: "Plan Your Stay",
    order: 3,
  },
];

/** Config sorted by `order`, ready for anything that renders/lists sections
 *  in sequence (homepage, navbar). Sorting once here means every consumer
 *  gets a consistent order without re-sorting themselves. */
export const orderedSectionConfig: SectionMeta[] = [...sectionConfig].sort(
  (a, b) => a.order - b.order
);