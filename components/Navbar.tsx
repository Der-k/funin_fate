"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Menu } from "lucide-react";

/* ── Brand palette ─────────────────────────────────────────────── */
// #36454F  charcoal    — backdrop base
// #20B2AA  teal        — accents, underlines, hover
// #CC4125  red         — CTA button
// #F5DEB3  wheat       — primary text, wordmark

/* ── Swap this path for your own logo file ─────────────────────── */
const LOGO_SRC = "/images/logo.png"; // e.g. .png, .svg, .webp

/* ── Nav items ─────────────────────────────────────────────────── */
const NAV_ITEMS = ["Explore?","Discover", "Eat & Drink", "Events", "Accomodation & Stay", "News"];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50"
    >
      {/* ── Layered backdrop ───────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* charcoal glass base */}
        <div
          className="absolute inset-0 backdrop-blur-xl"
          style={{ background: "rgba(54,69,79,0.85)" }}
        />
        {/* top-edge teal shimmer */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(32,178,170,0.45) 30%, rgba(32,178,170,0.7) 50%, rgba(32,178,170,0.45) 70%, transparent 100%)",
          }}
        />
        {/* bottom border — wheat tint */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "rgba(245,222,179,0.1)" }}
        />
      </div>

      {/* ── Nav content ────────────────────────────────────────── */}
      <nav className="relative flex items-center justify-between px-6 md:px-12 lg:px-16 h-[96px]">

        {/* LEFT ─ logo + nav links */}
        <div className="flex items-center gap-12">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 select-none">
            {/* Logo image */}
           <motion.div
  whileHover={{ scale: 1.07 }}
  transition={{ type: "spring", stiffness: 400, damping: 20 }}
  className="
    relative
    flex
    items-center
    justify-center

    rounded-[22px]

    px-3
    py-2

    bg-[#F5DEB3]

    transition-all
    duration-500

    group-hover:[filter:drop-shadow(0_0_12px_rgba(32,178,170,0.35))]
  "
>
  <img
    src={LOGO_SRC}
    alt="Fate logo"
    width={72}
    height={72}
    className="h-[72px] md:h-[86px] w-auto object-contain"
  />
</motion.div>

            {/* Wordmark */}
            <div className="leading-none">
              <p
                className="text-[9px] uppercase tracking-[0.42em] mb-1"
                style={{ color: "rgba(32,178,170,0.8)" }}
              >
                Visit
              </p>
              <h1
                className="text-[22px] font-black tracking-[-0.02em] leading-none transition-colors duration-300"
                style={{
                  fontFamily: "'Georgia', serif",
                  color: "#F5DEB3",
                }}
              >
                Fate
              </h1>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
              >
                <Link
                  href="/"
                  className="group relative text-[11.5px] uppercase tracking-[0.2em] font-semibold transition-colors duration-200"
                  style={{ color: "rgba(245,222,179,0.65)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F5DEB3")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,222,179,0.65)")}
                >
                  {item}
                  {/* teal animated underline */}
                  <span
                    className="absolute left-0 -bottom-1.5 h-px w-0 group-hover:w-full transition-all duration-300 ease-out"
                    style={{ background: "#20B2AA" }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT ─ actions */}
        <div className="flex items-center gap-2.5">

          {/* Divider */}
          <div
            className="hidden md:block w-px h-5 mr-1"
            style={{ background: "rgba(245,222,179,0.15)" }}
          />

          {/* Search */}
          <button
            aria-label="Search"
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
            style={{
              border: "1px solid rgba(245,222,179,0.15)",
              background: "rgba(245,222,179,0.04)",
              color: "rgba(245,222,179,0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(32,178,170,0.12)";
              e.currentTarget.style.color = "#20B2AA";
              e.currentTarget.style.borderColor = "rgba(32,178,170,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(245,222,179,0.04)";
              e.currentTarget.style.color = "rgba(245,222,179,0.5)";
              e.currentTarget.style.borderColor = "rgba(245,222,179,0.15)";
            }}
          >
            <Search size={16} strokeWidth={1.75} />
          </button>

          {/* CTA — red */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:flex items-center justify-center px-5 h-10 rounded-full text-[10.5px] font-bold uppercase tracking-[0.22em] transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #CC4125 0%, #a8331c 100%)",
              color: "#F5DEB3",
              boxShadow:
                "0 0 0 1px rgba(204,65,37,0.5), 0 4px 24px rgba(204,65,37,0.3), inset 0 1px 0 rgba(245,222,179,0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 0 1px rgba(204,65,37,0.7), 0 6px 32px rgba(204,65,37,0.45), inset 0 1px 0 rgba(245,222,179,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 0 1px rgba(204,65,37,0.5), 0 4px 24px rgba(204,65,37,0.3), inset 0 1px 0 rgba(245,222,179,0.15)";
            }}
          >
            Plan Your Visit
          </motion.button>

          {/* Mobile menu */}
          <button
            aria-label="Open menu"
            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
            style={{
              border: "1px solid rgba(245,222,179,0.15)",
              background: "rgba(245,222,179,0.04)",
              color: "#F5DEB3",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245,222,179,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(245,222,179,0.04)")}
          >
            <Menu size={18} strokeWidth={1.75} />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}