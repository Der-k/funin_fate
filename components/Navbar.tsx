"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const LOGO_SRC = "/images/logo.png";

const NAV_ITEMS = [
  { label: "Discover",       href: "/discover" },
  { label: "Eat & Drink",    href: "/dining" },
  { label: "Events",         href: "/events" },
  { label: "Plan Your Stay", href: "/stay" },
];

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
        <nav className="relative flex items-center justify-between px-6 md:px-12 lg:px-16 h-[76px]">

          {/* ════ LEFT: LOGO ════ */}
          <Link href="/" className="group flex items-center gap-4 select-none">
            {/* Logo container — drops below navbar like a hanging badge */}
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              transition={{ type: "spring", stiffness: 340, damping: 20 }}
              className="relative flex items-center justify-center"
              style={{
                // Drops 20px below the nav top so it "hangs" prominently
                marginTop: "20px",
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: scrolled
                  ? `${CHARCOAL}`
                  : "rgba(245,222,179,0.12)",
                backdropFilter: "blur(16px) saturate(1.5)",
                WebkitBackdropFilter: "blur(16px) saturate(1.5)",
                border: `2px solid ${scrolled ? TEAL : WHEAT}55`,
                boxShadow: scrolled
                  ? `0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px ${TEAL}30, inset 0 1px 0 rgba(255,255,255,0.1)`
                  : `0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px ${WHEAT}25, inset 0 1px 0 rgba(245,222,179,0.2)`,
                transition: "all 0.4s ease",
                zIndex: 10,
              }}
            >
              {/* Teal glow ring on hover */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  boxShadow: `0 0 0 3px ${TEAL}55, 0 0 28px ${TEAL}40`,
                  transition: "opacity 0.3s ease",
                }}
              />
              {/* Rust accent dot — bottom right of logo circle */}
              <div
                className="absolute bottom-1 right-1 w-3 h-3 rounded-full"
                style={{ background: RUST, border: `2px solid ${scrolled ? CHARCOAL : "rgba(20,28,32,0.5)"}`, zIndex: 2 }}
              />
              <img
                src={LOGO_SRC}
                alt="Fate logo"
                width={64}
                height={64}
                className="h-[64px] w-auto object-contain relative z-10"
              />
            </motion.div>

            {/* Wordmark */}
            <div className="leading-none flex flex-col gap-0.5" style={{ marginTop: "6px" }}>
              <p
                className="text-[9px] uppercase tracking-[0.45em] font-bold"
                style={{ color: TEAL }}
              >
                Visit
              </p>
              <h1
                className="text-[22px] font-black tracking-[-0.02em] leading-none uppercase"
                style={{
                  color: scrolled ? WHEAT : CHARCOAL,
                  transition: "color 0.4s",
                  textShadow: scrolled ? "none" : `0 1px 12px rgba(245,222,179,0.4)`,
                }}
              >
                Fate
              </h1>
              {/* Tiny gradient bar under wordmark — matches section style */}
              <div
                className="h-[2px] w-8 rounded-full mt-1"
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
                  className="group relative flex flex-col items-center gap-1"
                  onMouseEnter={() => setActiveItem(item.label)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <span
                    className="text-[11px] uppercase tracking-[0.22em] font-bold transition-all duration-300"
                    style={{
                      color: activeItem === item.label
                        ? (scrolled ? WHEAT : CHARCOAL)
                        : scrolled ? `${WHEAT}80` : `${CHARCOAL}80`,
                    }}
                  >
                    {item.label}
                  </span>
                  {/* Animated underline — teal, matches section buttons */}
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
                    border: `1px solid ${scrolled ? `${WHEAT}25` : `${CHARCOAL}25`}`,
                    color: scrolled ? `${WHEAT}60` : `${CHARCOAL}60`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${TEAL}18`;
                    e.currentTarget.style.color = TEAL;
                    e.currentTarget.style.borderColor = `${TEAL}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = scrolled ? `${WHEAT}60` : `${CHARCOAL}60`;
                    e.currentTarget.style.borderColor = scrolled ? `${WHEAT}25` : `${CHARCOAL}25`;
                  }}
                >
                  {item.icon}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div
              className="hidden md:block w-px h-5 mx-1"
              style={{ background: scrolled ? `${WHEAT}20` : `${CHARCOAL}20`, transition: "background 0.4s" }}
            />

            {/* Search button */}
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((o) => !o)}
              className="hidden md:flex items-center gap-2 h-9 px-4 rounded-none transition-all duration-300 group relative overflow-hidden"
              style={{
                border: `1px solid ${scrolled ? `${WHEAT}30` : `${CHARCOAL}30`}`,
                color: scrolled ? `${WHEAT}80` : `${CHARCOAL}80`,
                background: "transparent",
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = scrolled ? WHEAT : CHARCOAL;
                el.style.borderColor = TEAL;
                el.style.background = `${TEAL}12`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = scrolled ? `${WHEAT}80` : `${CHARCOAL}80`;
                el.style.borderColor = scrolled ? `${WHEAT}30` : `${CHARCOAL}30`;
                el.style.background = "transparent";
              }}
            >
              <Search size={13} strokeWidth={2} />
              <span className={quicksand.className}>Search</span>
            </button>

            {/* CTA button — standardised style: rust fill → teal slide-in */}
            <Link
              href="/discover"
              className={`group relative hidden lg:inline-flex items-center justify-center overflow-hidden h-9 px-5 ${quicksand.className}`}
              style={{
                background: RUST,
                color: WHITE,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                fontSize: "0.68rem",
                fontWeight: 700,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const slide = e.currentTarget.querySelector(".cta-slide") as HTMLElement;
                if (slide) slide.style.transform = "scaleX(1)";
              }}
              onMouseLeave={(e) => {
                const slide = e.currentTarget.querySelector(".cta-slide") as HTMLElement;
                if (slide) slide.style.transform = "scaleX(0)";
              }}
            >
              <span
                className="cta-slide absolute inset-0"
                style={{
                  background: TEAL,
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 500ms cubic-bezier(.16,1,.3,1)",
                }}
              />
              <span style={{ position: "relative", zIndex: 1 }}>Explore</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((o) => !o)}
              className="flex lg:hidden items-center justify-center w-10 h-10 transition-all duration-300"
              style={{
                border: `1px solid ${scrolled ? `${WHEAT}30` : `${CHARCOAL}30`}`,
                color: scrolled ? WHEAT : CHARCOAL,
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
                      onClick={() => setMobileOpen(false)}
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

                  {/* Mobile CTA — same standardised button style */}
                  <Link
                    href="/discover"
                    onClick={() => setMobileOpen(false)}
                    className={`group relative inline-flex items-center justify-center overflow-hidden h-10 px-6 ${quicksand.className}`}
                    style={{ background: RUST, color: WHITE, textTransform: "uppercase", letterSpacing: "0.18em", fontSize: "0.7rem", fontWeight: 700, textDecoration: "none" }}
                    onMouseEnter={(e) => {
                      const slide = e.currentTarget.querySelector(".mob-cta-slide") as HTMLElement;
                      if (slide) slide.style.transform = "scaleX(1)";
                    }}
                    onMouseLeave={(e) => {
                      const slide = e.currentTarget.querySelector(".mob-cta-slide") as HTMLElement;
                      if (slide) slide.style.transform = "scaleX(0)";
                    }}
                  >
                    <span className="mob-cta-slide absolute inset-0" style={{ background: TEAL, transform: "scaleX(0)", transformOrigin: "left", transition: "transform 500ms cubic-bezier(.16,1,.3,1)" }} />
                    <span style={{ position: "relative", zIndex: 1 }}>Explore City</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}