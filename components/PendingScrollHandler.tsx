"use client";

import { useEffect } from "react";
import { DEFAULT_SCROLL_MARGIN_TOP } from "@/lib/site/section-config";

/**
 * Handles the "searched from a different route" case: SearchModal stores the
 * target section id in sessionStorage before navigating home, then this
 * component (mounted on the homepage) picks it up on mount and finishes the
 * scroll — since the browser's default hash-jump doesn't know about the
 * fixed navbar's height (see DEFAULT_SCROLL_MARGIN_TOP).
 *
 * Renders nothing; just runs the effect once on mount.
 */
export default function PendingScrollHandler() {
  useEffect(() => {
    const hash = sessionStorage.getItem("pendingSectionScroll");
    if (!hash) return;
    sessionStorage.removeItem("pendingSectionScroll");

    requestAnimationFrame(() => {
      const target = document.getElementById(hash);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - DEFAULT_SCROLL_MARGIN_TOP;
      window.scrollTo({ top, behavior: "smooth" });
    });
  }, []);

  return null;
}