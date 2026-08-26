import type { SearchDocument } from "./search-types";
import discoverContent from "@/data/discover-fate-content.json";
import restaurantContent from "@/data/restaurant-showcase-content.json";
import eventsContent from "@/data/events-section-content.json";
import accommodationContent from "@/data/accommodation-section-content.json";

/**
 * Flattens the actual page CONTENT — business names, event titles, hotel
 * names, category blurbs — into search documents. This is what lets search
 * match real words on the site ("brisket", "yoga", "lantern festival")
 * instead of only the four section titles/descriptions.
 *
 * Each data file below is already the single source of truth for its
 * section's copy — this just re-reads the same JSON, nothing is duplicated.
 * If you rename/add/remove an item in one of those files, search picks up
 * the change automatically.
 */

function fromDiscoverContent(): SearchDocument[] {
  const docs: SearchDocument[] = [];

  // "Discover the City" category tiles (Top Experiences, Culture & Community, ...)
  for (const cat of discoverContent.categories) {
    docs.push({
      id: `category:${cat.title}`,
      title: cat.title,
      description: cat.description,
      keywords: [cat.tag],
      url: "/#discover",
      type: "category",
    });
  }

  // Local businesses grouped under Discover (dining, wellness, retail, beauty, services)
  for (const group of discoverContent.businessGroups) {
    for (const biz of group.businesses) {
      docs.push({
        id: `business:${biz.name}`,
        title: biz.name,
        description: biz.blurb,
        keywords: [biz.type, group.category, biz.address],
        url: biz.href,
        type: "business",
      });
    }
  }

  // City amenities (Free City Wi-Fi, Fitness Centers, ...)
  for (const amenity of discoverContent.amenities) {
    docs.push({
      id: `amenity:${amenity.label}`,
      title: amenity.label,
      description: `${amenity.tag} amenity available across Fate.`,
      keywords: [amenity.tag],
      url: "/#discover",
      type: "amenity",
    });
  }

  return docs;
}

function fromRestaurantContent(): SearchDocument[] {
  return restaurantContent.restaurantImages.map((img) => ({
    id: `dining-highlight:${img.title}`,
    title: img.title,
    description: `${img.tag} experience at Funinfate.`,
    keywords: [img.tag],
    url: "/#dining",
    type: "category" as const,
  }));
}

function fromEventsContent(): SearchDocument[] {
  return eventsContent.events.map((event) => ({
    id: `event:${event.title}`,
    title: event.title,
    description: `${event.category} — ${event.date} at ${event.location}.`,
    keywords: [event.category, event.location, event.date],
    url: "/#events",
    type: "event" as const,
  }));
}

function fromAccommodationContent(): SearchDocument[] {
  return accommodationContent.stays.map((stay) => ({
    id: `stay:${stay.title}`,
    title: stay.title,
    description: `${stay.category} in Fate.`,
    keywords: [stay.category],
    url: stay.href,
    type: "stay" as const,
  }));
}

export function getContentSearchIndex(): SearchDocument[] {
  return [
    ...fromDiscoverContent(),
    ...fromRestaurantContent(),
    ...fromEventsContent(),
    ...fromAccommodationContent(),
  ];
}