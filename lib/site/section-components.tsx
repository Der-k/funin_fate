import type { ComponentType } from "react";

/**
 * The ONLY file allowed to import the actual section components.
 *
 * Keeping this isolated from section-config.ts is what prevents circular
 * imports and keeps non-rendering consumers (search, navbar) from pulling in
 * component code. If a section component ever needs registry data, it must
 * NOT import from `sections.ts` or this file — pass data down as props from
 * the page instead.
 */

import DiscoverHighlightsSection from "@/components/DiscoverHighlightsSection";
import Restarauntssection from "@/components/Restaraunts_section";
import Fateventsection from "@/components/Fateeventssection";
import AccommodationSection from "@/components/AccommodationSection";

/**
 * Maps each SectionMeta.id -> the component that renders it.
 * Keys must exactly match the `id` values in section-config.ts.
 */
export const sectionComponents: Record<string, ComponentType> = {
  discover: DiscoverHighlightsSection,
  dining: Restarauntssection,
  events: Fateventsection,
  stay: AccommodationSection,
};