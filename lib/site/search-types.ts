export type SearchDocType =
  | "section"
  | "business"
  | "event"
  | "stay"
  | "amenity"
  | "category";

/**
 * Generic shape for anything searchable on the site. Sections, individual
 * businesses, events, hotels, and amenities are all normalized into this
 * same shape so the search UI only has to deal with one type.
 */
export interface SearchDocument {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  url: string;
  type: SearchDocType;
}