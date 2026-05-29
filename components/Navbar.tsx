"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const LOGO_SRC = "/images/logo.png";

const NAV_ITEMS = [
  "Discover",
  "Eat & Drink",
  "Events",
  "Plan Your Stay",
];

const t = (scrolled: boolean, onHero: string, onPage: string) =>
  scrolled ? onPage : onHero;

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}>
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textPrimary = t(scrolled, "#36454F", "#F5DEB3");
  const textMuted = t(scrolled, "rgba(54,69,79,0.7)", "rgba(245,222,179,0.7)");
  const borderSubtle = t(scrolled, "rgba(54,69,79,0.2)", "rgba(245,222,179,0.2)");
  const iconBg = t(scrolled, "rgba(54,69,79,0.06)", "rgba(245,222,179,0.06)");
  const iconColor = t(scrolled, "rgba(54,69,79,0.55)", "rgba(245,222,179,0.6)");
  const dividerColor = t(scrolled, "rgba(54,69,79,0.15)", "rgba(245,222,179,0.15)");
  const glassBg = t(scrolled, "rgba(255,255,255,0.18)", "rgba(245,222,179,0.14)");
  const glassBorder = t(scrolled, "rgba(255,255,255,0.35)", "rgba(245,222,179,0.3)");
  const glassHighlight = t(scrolled, "rgba(255,255,255,0.55)", "rgba(245,222,179,0.45)");
  const glassShadow = t(
    scrolled,
    "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.55)",
    "0 8px 32px rgba(54,69,79,0.22), 0 2px 8px rgba(54,69,79,0.1), inset 0 1px 0 rgba(245,222,179,0.45)"
  );

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 ${quicksand.className}`}
        style={{ pointerEvents: "auto" }}
      >
        {/* BACKDROP */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute inset-0 backdrop-blur-xl"
            animate={{
              background: scrolled ? "rgba(54,69,79,0.92)" : "rgba(20,28,32,0.15)",
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-0 left-0 right-0 h-px"
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(32,178,170,0.5) 30%, rgba(32,178,170,0.8) 50%, rgba(32,178,170,0.5) 70%, transparent 100%)",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px"
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ background: "rgba(54,69,79,0.12)" }}
          />
        </div>

        {/* NAV */}
        <nav className="relative flex items-center justify-between px-6 md:px-12 lg:px-16 h-[72px] overflow-visible">

          {/* LEFT */}
          <div className="flex items-center gap-10">
            <Link href="/" className="group flex items-center gap-3 select-none">
              {/* FLOATING LOGO */}
              <motion.div
                whileHover={{ scale: 1.06, y: -2 }}
                transition={{ type: "spring", stiffness: 360, damping: 22 }}
                className="relative flex items-center justify-center rounded-[22px] px-3 py-2"
                style={{
                  transform: "translateY(14px)",
                  background: glassBg,
                  backdropFilter: "blur(18px) saturate(1.6)",
                  WebkitBackdropFilter: "blur(18px) saturate(1.6)",
                  border: `1px solid ${glassBorder}`,
                  boxShadow: glassShadow,
                  outline: `1px solid ${glassHighlight}`,
                  outlineOffset: "-2px",
                  transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s, outline-color 0.4s",
                  zIndex: 10,
                }}
              >
                <div
                  className="absolute inset-x-2 top-1 h-[40%] rounded-t-[16px] pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 100%)",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    boxShadow: "0 0 0 2px rgba(32,178,170,0.5), 0 0 24px rgba(32,178,170,0.3)",
                    transition: "opacity 0.25s ease",
                  }}
                />
                <img
                  src={LOGO_SRC}
                  alt="Fate logo"
                  width={72}
                  height={72}
                  className="h-[72px] w-auto object-contain relative z-10"
                />
              </motion.div>

              {/* WORDMARK */}
              <div className="leading-none" style={{ transform: "translateY(4px)" }}>
                <p
                  className="text-[9px] uppercase tracking-[0.42em] mb-1 font-semibold transition-colors duration-400"
                  style={{ color: "rgba(32,178,170,0.9)" }}
                >
                  Visit
                </p>
                <h1
                  className="text-[20px] font-black tracking-[-0.02em] leading-none"
                  style={{ color: scrolled ? "#F5DEB3" : "#36454F", transition: "color 0.4s" }}
                >
                  Fate
                </h1>
              </div>
            </Link>

            {/* DESKTOP NAV LINKS */}
            <div className="hidden lg:flex items-center gap-7">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                >
                  <Link
                    href="/"
                    className="group relative text-[11px] uppercase tracking-[0.2em] font-bold"
                    style={{ color: textMuted, transition: "color 0.4s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = textPrimary)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
                  >
                    {item}
                    <span
                      className="absolute left-0 -bottom-1.5 h-px w-0 group-hover:w-full transition-all duration-300 ease-out"
                      style={{ background: "#20B2AA" }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2.5">

            {/* SOCIAL ICONS — desktop only */}
            <div className="hidden md:flex items-center gap-1.5">
              {SOCIAL_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300"
                  style={{
                    border: `1px solid ${borderSubtle}`,
                    background: iconBg,
                    color: iconColor,
                    transition: "background 0.4s, color 0.4s, border-color 0.4s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(32,178,170,0.12)";
                    e.currentTarget.style.color = "#20B2AA";
                    e.currentTarget.style.borderColor = "rgba(32,178,170,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = iconBg;
                    e.currentTarget.style.color = iconColor;
                    e.currentTarget.style.borderColor = borderSubtle;
                  }}
                >
                  {item.icon}
                </Link>
              ))}
            </div>

            <div
              className="hidden md:block w-px h-5 mx-1"
              style={{ background: dividerColor, transition: "background 0.4s" }}
            />

            {/* SEARCH */}
            <button
              aria-label="Search"
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full"
              style={{
                border: `1px solid ${borderSubtle}`,
                background: iconBg,
                color: iconColor,
                transition: "background 0.4s, color 0.4s, border-color 0.4s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(32,178,170,0.12)";
                e.currentTarget.style.color = "#20B2AA";
                e.currentTarget.style.borderColor = "rgba(32,178,170,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = iconBg;
                e.currentTarget.style.color = iconColor;
                e.currentTarget.style.borderColor = borderSubtle;
              }}
            >
              <Search size={16} strokeWidth={1.75} />
            </button>

            {/* MOBILE TOGGLE */}
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((o) => !o)}
              className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full"
              style={{
                border: `1px solid ${borderSubtle}`,
                background: iconBg,
                color: textPrimary,
                transition: "background 0.4s, color 0.4s, border-color 0.4s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = scrolled
                  ? "rgba(54,69,79,0.1)"
                  : "rgba(245,222,179,0.12)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = iconBg)}
            >
              {mobileOpen ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
            </button>
          </div>
        </nav>

        {/* MOBILE DRAWER */}
        <motion.div
          initial={false}
          animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden lg:hidden"
          style={{ background: "rgba(36,48,56,0.98)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex flex-col px-6 py-4 gap-1">
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : -12 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-[12px] uppercase tracking-[0.2em] font-bold border-b transition-colors duration-200"
                  style={{ color: "rgba(245,222,179,0.7)", borderColor: "rgba(245,222,179,0.07)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F5DEB3")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,222,179,0.7)")}
                >
                  {item}
                </Link>
              </motion.div>
            ))}

            {/* SOCIAL ICONS — mobile drawer */}
            <div className="flex items-center gap-3 pt-4 mt-1">
              {SOCIAL_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300"
                  style={{
                    border: "1px solid rgba(245,222,179,0.15)",
                    color: "rgba(245,222,179,0.6)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#20B2AA";
                    e.currentTarget.style.borderColor = "rgba(32,178,170,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(245,222,179,0.6)";
                    e.currentTarget.style.borderColor = "rgba(245,222,179,0.15)";
                  }}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.header>
    </>
  );
}