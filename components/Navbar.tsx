"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Quicksand } from "next/font/google";
import { orderedSectionConfig } from "@/lib/site/section-config";
import { DEFAULT_SCROLL_MARGIN_TOP } from "@/lib/site/section-config";
import SearchModal from "@/components/SearchModal";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Nav items are derived from the section registry (lib/site/section-config.ts)
// instead of a hardcoded array — add/reorder/rename a section there and this
// navbar updates automatically, with no separate list to keep in sync.
const NAV_ITEMS = orderedSectionConfig
  .filter((section) => section.showInNav !== false)
  .map((section) => ({
    label: section.navLabel ?? section.title,
    href: `/#${section.id}`,
  }));

// Height to offset scroll position by so content doesn't land under the fixed navbar.
// Falls back to the same default the homepage uses for scrollMarginTop, so the two
// never drift out of sync.
const NAV_SCROLL_OFFSET = DEFAULT_SCROLL_MARGIN_TOP;

// ─── Palette ──────────────────────────────────────────────────────────────────
const TEAL     = "#20B2AA";
const RUST     = "#CC4125";
const WHEAT    = "#F5DEB3";
const CHARCOAL = "#36454F";
const WHITE    = "#FFFFFF";

// ─── Social Icons ─────────────────────────────────────────────────────────────
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={13} height={13}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={13} height={13}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={13} height={13}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const SOCIAL_LINKS = [
  { icon: <XIcon />, href: "https://x.com/VisitFate", label: "X (Twitter)" },
  { icon: <InstagramIcon />, href: "https://www.instagram.com/visitfate/", label: "Instagram" },
  { icon: <FacebookIcon />, href: "https://web.facebook.com/profile.php/?id=61589634350805&_rdc=1&_rdr", label: "Facebook" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Global search shortcuts: Cmd/Ctrl+K always works; "/" works as long as
  // the user isn't already typing in another input/textarea.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isTypingTarget =
        e.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA"].includes(e.target.tagName);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "/" && !isTypingTarget) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Intercepts nav clicks when we're already on the homepage so the section
  // scrolls smoothly into view instead of doing a hard hash jump.
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.split("#")[1];
    if (!hash) return;

    if (typeof window !== "undefined" && window.location.pathname === "/") {
      const target = document.getElementById(hash);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 ${quicksand.className}`}
      >
        {/* ── RAINBOW TOP RULE — same as sections ── */}
        <div className="absolute top-0 inset-x-0 pointer-events-none z-10">
          <motion.div
            className="h-[2px] w-full"
            animate={{ opacity: scrolled ? 1 : 0.6 }}
            transition={{ duration: 0.4 }}
            style={{
              background: `linear-gradient(90deg, ${TEAL} 0%, ${RUST} 50%, ${WHEAT} 100%)`,
            }}
          />
        </div>

        {/* ── BACKDROP ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: scrolled
                ? `${CHARCOAL}F0`
                : "rgba(20,28,32,0.08)",
              backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "blur(8px)",
            }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          />
          {/* Bottom border on scroll */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px"
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ background: `${TEAL}30` }}
          />
        </div>

        {/* ── NAV BAR ── */}
        <nav className="relative flex items-center justify-between px-6 md:px-12 lg:px-16 h-[76px] overflow-visible">

          {/* ════ LEFT: WORDMARK (logo removed, heading enlarged, hangs below navbar for breathing room) ════ */}
          <Link
            href="/"
            className="group relative flex items-start select-none z-10"
            style={{ marginTop: "34px", paddingLeft: "clamp(1rem, 3vw, 2.5rem)" }}
          >
            <div className="flex flex-col gap-1.5">
              <p
                className="text-[15px] md:text-[17px] uppercase tracking-[0.38em] font-bold leading-none"
                style={{ color: TEAL }}
              >
                Visit
              </p>
              <h1
                className="text-[40px] md:text-[50px] lg:text-[58px] font-black tracking-[-0.01em] uppercase whitespace-nowrap"
                style={{
                  // Always WHEAT — readable on both transparent and scrolled dark backgrounds
                  color: WHEAT,
                  lineHeight: 1,
                  textShadow: scrolled
                    ? `0 1px 10px rgba(0,0,0,0.45)`
                    : `0 2px 18px rgba(0,0,0,0.55), 0 1px 5px rgba(0,0,0,0.7)`,
                  transition: "text-shadow 0.4s",
                }}
              >
                Fate
                <sup
                  style={{
                    fontSize: "0.32em",
                    fontWeight: 700,
                    letterSpacing: "0",
                    marginLeft: "2px",
                    top: "-0.9em",
                  }}
                >
                  TM
                </sup>
              </h1>
              {/* Gradient bar under wordmark */}
              <div
                className="h-[3px] w-14 rounded-full"
                style={{ background: `linear-gradient(to right, ${TEAL}, ${RUST})` }}
              />
            </div>
          </Link>

          {/* ════ CENTER: NAV LINKS ════ */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="group relative flex flex-col items-center gap-1"
                  onMouseEnter={() => setActiveItem(item.label)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <span
                    className="text-[11px] uppercase tracking-[0.22em] font-bold transition-all duration-300"
                    style={{
                      color: activeItem === item.label
                        ? (scrolled ? WHEAT : WHITE)
                        : scrolled ? `${WHEAT}80` : `${WHITE}90`,
                    }}
                  >
                    {item.label}
                  </span>
                  {/* Animated underline */}
                  <span
                    className="h-[2px] rounded-full transition-all duration-350"
                    style={{
                      width: activeItem === item.label ? "100%" : "0%",
                      background: `linear-gradient(to right, ${TEAL}, ${RUST})`,
                      display: "block",
                    }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* ════ RIGHT: ACTIONS ════ */}
          <div className="flex items-center gap-2">

            {/* Social icons — desktop */}
            <div className="hidden md:flex items-center gap-1.5 mr-1">
              {SOCIAL_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="group flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300"
                  style={{
                    border: `1px solid ${scrolled ? `${WHEAT}25` : `${WHITE}30`}`,
                    color: scrolled ? `${WHEAT}60` : `${WHITE}70`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${TEAL}18`;
                    e.currentTarget.style.color = TEAL;
                    e.currentTarget.style.borderColor = `${TEAL}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = scrolled ? `${WHEAT}60` : `${WHITE}70`;
                    e.currentTarget.style.borderColor = scrolled ? `${WHEAT}25` : `${WHITE}30`;
                  }}
                >
                  {item.icon}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div
              className="hidden md:block w-px h-5 mx-1"
              style={{ background: scrolled ? `${WHEAT}20` : `${WHITE}25`, transition: "background 0.4s" }}
            />

            {/* Search button */}
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300"
              style={{
                border: `1px solid ${scrolled ? `${WHEAT}25` : `${WHITE}30`}`,
                color: scrolled ? `${WHEAT}60` : `${WHITE}70`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${TEAL}18`;
                e.currentTarget.style.color = TEAL;
                e.currentTarget.style.borderColor = `${TEAL}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = scrolled ? `${WHEAT}60` : `${WHITE}70`;
                e.currentTarget.style.borderColor = scrolled ? `${WHEAT}25` : `${WHITE}30`;
              }}
            >
              <Search size={14} strokeWidth={2} />
            </button>

            {/* Mobile hamburger */}
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((o) => !o)}
              className="flex lg:hidden items-center justify-center w-10 h-10 transition-all duration-300"
              style={{
                border: `1px solid ${scrolled ? `${WHEAT}30` : `${WHITE}35`}`,
                color: scrolled ? WHEAT : WHITE,
                background: "transparent",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={18} strokeWidth={1.75} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={18} strokeWidth={1.75} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* ── MOBILE DRAWER ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden lg:hidden"
              style={{ background: `${CHARCOAL}F8`, backdropFilter: "blur(24px)" }}
            >
              {/* Teal top rule in drawer */}
              <div className="h-[1px] w-full" style={{ background: `linear-gradient(to right, ${TEAL}, ${RUST}, transparent)` }} />

              <div className="flex flex-col px-6 py-5 gap-0">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="group flex items-center justify-between py-3.5 border-b transition-colors duration-200"
                      style={{ borderColor: `${WHEAT}10` }}
                      onMouseEnter={(e) => {
                        const label = e.currentTarget.querySelector(".mob-label") as HTMLElement;
                        if (label) label.style.color = WHEAT;
                        const arrow = e.currentTarget.querySelector(".mob-arrow") as HTMLElement;
                        if (arrow) arrow.style.opacity = "1";
                      }}
                      onMouseLeave={(e) => {
                        const label = e.currentTarget.querySelector(".mob-label") as HTMLElement;
                        if (label) label.style.color = `${WHEAT}70`;
                        const arrow = e.currentTarget.querySelector(".mob-arrow") as HTMLElement;
                        if (arrow) arrow.style.opacity = "0";
                      }}
                    >
                      <span
                        className={`mob-label text-[12px] uppercase tracking-[0.22em] font-bold transition-colors duration-200 ${quicksand.className}`}
                        style={{ color: `${WHEAT}70` }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="mob-arrow text-xs transition-opacity duration-200"
                        style={{ color: TEAL, opacity: 0, fontSize: "0.7rem", fontWeight: 700 }}
                      >
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}

                {/* Bottom row: socials + CTA */}
                <div className="flex items-center justify-between pt-5 mt-1">
                  <div className="flex items-center gap-2.5">
                    {SOCIAL_LINKS.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300"
                        style={{ border: `1px solid ${WHEAT}20`, color: `${WHEAT}55` }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = TEAL;
                          e.currentTarget.style.borderColor = `${TEAL}50`;
                          e.currentTarget.style.background = `${TEAL}12`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = `${WHEAT}55`;
                          e.currentTarget.style.borderColor = `${WHEAT}20`;
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {item.icon}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}