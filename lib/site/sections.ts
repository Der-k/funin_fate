import type { ComponentType } from "react";
import {
  orderedSectionConfig,
  DEFAULT_SCROLL_MARGIN_TOP,
  type SectionMeta,
} from "./section-config";
import { sectionComponents } from "./section-components";

/**
 * Full section registry: metadata + the component that renders it.
 * This is the single source of truth the HOMEPAGE renders from.
 *
 * Anything that only needs metadata (search, navbar, command palette) should
 * import from `section-config.ts` instead — see the note there.
 */
export interface Section extends SectionMeta {
  component: ComponentType;
}

function buildSections(): Section[] {
  return orderedSectionConfig.map((meta) => {
    const component = sectionComponents[meta.id];

    if (!component) {
      // Fails fast at build/dev time rather than silently rendering a blank
      // section — much easier to debug than a missing chunk of the homepage.
      throw new Error(
        `[sections registry] No component registered for section "${meta.id}". ` +
          `Add it to lib/site/section-components.tsx.`
      );
    }

    return { ...meta, component };
  });
}

export const sections: Section[] = buildSections();

export function getSection(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}

export { DEFAULT_SCROLL_MARGIN_TOP };