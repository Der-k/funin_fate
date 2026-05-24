"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const LOGO_SRC = "/images/logo.png";
const NAV_ITEMS = ["Explore?", "Discover", "Eat & Drink", "Events", "Accomodation & Stay", "News"];

// Convenience: interpolate between two rgba values based on scroll state
const t = (scrolled: boolean, onHero: string, onPage: string) => scrolled ? onPage : onHero;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Derived color tokens — all switch together on scroll
const textPrimary  = t(scrolled, "#36454F",               "#F5DEB3");
 const textMuted    = t(scrolled, "rgba(54,69,79,0.7)",    "rgba(245,222,179,0.7)");
  const borderSubtle = t(scrolled, "rgba(54,69,79,0.2)",    "rgba(245,222,179,0.2)");
  const iconBg       = t(scrolled, "rgba(54,69,79,0.06)",   "rgba(245,222,179,0.06)");
  const iconColor    = t(scrolled, "rgba(54,69,79,0.55)",   "rgba(245,222,179,0.6)");
 const dividerColor = t(scrolled, "rgba(54,69,79,0.15)",   "rgba(245,222,179,0.15)");
 const logoBg = t(scrolled, "rgb(255, 255, 255)", "#F5DEB3"); // dark over hero, wheat when scrolled
  const logoBorder = t(scrolled, "1px solid rgba(255,255,255,0.15)", "none");

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50"
        style={{ pointerEvents: "auto" }}
      >
        {/* ── Backdrop ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute inset-0 backdrop-blur-xl"
            animate={{
              background: scrolled ? "rgba(54,69,79,0.92)" : "rgba(20,28,32,0.15)"  // dark smoke — over hero video
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
          {/* teal shimmer line — top, only when scrolled */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px"
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(32,178,170,0.5) 30%, rgba(32,178,170,0.8) 50%, rgba(32,178,170,0.5) 70%, transparent 100%)",
            }}
          />
          {/* bottom border */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px"
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ background: "rgba(54,69,79,0.12)" }}
          />
        </div>

        {/* ── Nav content ── */}
        <nav className="relative flex items-center justify-between px-6 md:px-12 lg:px-16 h-[80px]">

          {/* LEFT — logo + links */}
          <div className="flex items-center gap-10">
            <Link href="/" className="group flex items-center gap-2.5 select-none">
              {/* Logo pill — always wheat background */}
              <motion.div
                whileHover={{ scale: 1.07 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative flex items-center justify-center rounded-[18px] px-2.5 py-1.5 group-hover:[filter:drop-shadow(0_0_12px_rgba(32,178,170,0.4))]"
                style={{
                  background: logoBg,
                  border: logoBorder,
                  transition: "background 0.4s",
                }}
              >
                <img
                  src={LOGO_SRC}
                  alt="Fate logo"
                  width={56}
                  height={56}
                  className="h-[56px] w-auto object-contain"
                />
              </motion.div>

              {/* Wordmark */}
              <div className="leading-none">
                <p
                  className="text-[9px] uppercase tracking-[0.42em] mb-1 transition-colors duration-400"
                  style={{ color: "rgba(32,178,170,0.9)" }} // teal always
                >
                  Visit
                </p>
                <h1
                  className="text-[20px] font-black tracking-[-0.02em] leading-none"
                  style={{
                    fontFamily: "'Georgia', serif",
                    color: scrolled ? "#F5DEB3" : "#36454F",
                    transition: "color 0.4s",
                  }}
                >
                  Fate
                </h1>
              </div>
            </Link>

            {/* Desktop nav links */}
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
                    className="group relative text-[11px] uppercase tracking-[0.2em] font-semibold"
                    style={{
                      color: textMuted,
                      transition: "color 0.4s",
                    }}
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

          {/* RIGHT — actions */}
          <div className="flex items-center gap-2.5">
            <div
              className="hidden md:block w-px h-5 mr-1"
              style={{ background: dividerColor, transition: "background 0.4s" }}
            />

            {/* Search */}
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

            {/* CTA — always red, always wheat text */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex items-center justify-center px-5 h-10 rounded-full text-[10.5px] font-bold uppercase tracking-[0.22em]"
              style={{
                background: "linear-gradient(135deg, #CC4125 0%, #a8331c 100%)",
                color: "#F5DEB3",
                boxShadow: "0 0 0 1px rgba(204,65,37,0.5), 0 4px 24px rgba(204,65,37,0.3), inset 0 1px 0 rgba(245,222,179,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 0 1px rgba(204,65,37,0.7), 0 6px 32px rgba(204,65,37,0.45), inset 0 1px 0 rgba(245,222,179,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 0 1px rgba(204,65,37,0.5), 0 4px 24px rgba(204,65,37,0.3), inset 0 1px 0 rgba(245,222,179,0.15)";
              }}
            >
              Plan Your Visit
            </motion.button>

            {/* Mobile menu toggle */}
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
              onMouseEnter={(e) => (e.currentTarget.style.background = scrolled ? "rgba(54,69,79,0.1)" : "rgba(245,222,179,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = iconBg)}
            >
              {mobileOpen ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
            </button>
          </div>
        </nav>

        {/* ── Mobile drawer — always dark ── */}
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
                  className="block py-3 text-[12px] uppercase tracking-[0.2em] font-semibold border-b transition-colors duration-200"
                  style={{ color: "rgba(245,222,179,0.7)", borderColor: "rgba(245,222,179,0.07)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F5DEB3")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,222,179,0.7)")}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
            <div className="pt-4 pb-2">
              <button
                className="w-full py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.22em]"
                style={{ background: "linear-gradient(135deg, #CC4125 0%, #a8331c 100%)", color: "#F5DEB3" }}
              >
                Plan Your Visit
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>
    </>
  );
}