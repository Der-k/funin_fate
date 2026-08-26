"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import type { ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";
import { Quicksand } from "next/font/google";
import { motion } from "framer-motion";

// ─── Dynamic content (all copy + image links live here, not in the component) ─
// Expects the JSON at: /data/discover-fate-content.json (project root, per @/* -> ./*)
import content from "@/data/discover-fate-content.json";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// ─── Palette ──────────────────────────────────────────────────────────────────
const TEAL  = "#20B2AA";
const RUST  = "#CC4125";
const CREAM = "#F5DEB3";
const SLATE = "#36454F";
const WHITE = "#FFFFFF";

// ─── Types (mirror the JSON shape) ─────────────────────────────────────────────
type Category = {
  title: string;
  tag: string;
  number: string;
  description: string;
  href: string;
  image: string;
};

type Amenity = {
  label: string;
  tag: string;
  image: string;
};

type Business = {
  name: string;
  type: string;
  address: string;
  blurb: string;
  hours: string;
  img: string;
  href: string;
};

type BusinessGroup = {
  category: string;
  icon: string;
  businesses: Business[];
};

type SocialLink = {
  icon: "x" | "instagram" | "facebook";
  href: string;
  label: string;
  handle: string;
};

// ─── Data pulled straight from JSON (dynamic, easy to swap/CMS-drive later) ───
const categories: Category[] = content.categories;
const amenities: Amenity[] = content.amenities;
const businessGroups: BusinessGroup[] = content.businessGroups;
const socialLinks: SocialLink[] = content.socialLinks as SocialLink[];
const copy = content.sectionCopy;

// ─── Social Icons ─────────────────────────────────────────────────────────────
function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

// Map JSON "icon" string -> actual icon component
const SOCIAL_ICON_MAP: Record<SocialLink["icon"], ComponentType> = {
  x: XIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
};

// ─── Social Section ───────────────────────────────────────────────────────────
function SocialSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div style={{ background: SLATE, boxShadow: "0 8px 40px rgba(32,178,170,0.12), 0 2px 12px rgba(54,69,79,0.15)" }} className="relative overflow-hidden">
      <div className="absolute left-[-80px] bottom-[-80px] h-[200px] w-[200px] rounded-full blur-3xl pointer-events-none" style={{ background: `${TEAL}20` }} />
      <div className="absolute right-[-60px] top-[-60px] h-[180px] w-[180px] rounded-full blur-3xl pointer-events-none" style={{ background: `${CREAM}10` }} />

      <div className="relative max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16 py-10">
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(245,222,179,0.1)",
          borderRadius: "16px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
          padding: "28px 36px",
          backdropFilter: "blur(12px)",
        }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: RUST }} />
              <p
                className={`text-sm sm:text-base uppercase tracking-[0.25em] sm:tracking-[0.35em] ${quicksand.className}`}
                style={{ color: "rgba(245,222,179,0.5)" }}
              >
                {copy.social.eyebrow}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((link, i) => {
                const Icon = SOCIAL_ICON_MAP[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    title={link.label}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "7px",
                      padding: "9px 18px 9px 14px", borderRadius: "100px",
                      border: `1px solid ${hoveredIdx === i ? TEAL : "rgba(245,222,179,0.2)"}`,
                      background: hoveredIdx === i ? TEAL : "rgba(255,255,255,0.06)",
                      color: hoveredIdx === i ? WHITE : `rgba(245,222,179,0.7)`,
                      textDecoration: "none", transition: "all 220ms ease", whiteSpace: "nowrap",
                      backdropFilter: "blur(8px)",
                      boxShadow: hoveredIdx === i ? `0 4px 18px ${TEAL}50` : "none",
                    }}
                  >
                    <span style={{ display: "flex", flexShrink: 0 }}><Icon /></span>
                    <span
                      className={quicksand.className}
                      style={{
                        fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.02em",
                        color: hoveredIdx === i ? WHITE : "rgba(245,222,179,0.7)",
                        transition: "color 220ms ease",
                      }}
                    >
                      {link.handle}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Accordion Slice ──────────────────────────────────────────────────────────
function AccordionSlice({
  cat, isActive, onEnter, onLeave, onToggle, isFirst,
}: {
  cat: Category;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onToggle}
      style={{
        position: "relative", overflow: "hidden", cursor: "pointer",
        flex: isActive ? "5 1 0%" : "1 1 0%",
        transition: "flex 650ms cubic-bezier(.16,1,.3,1)",
        minWidth: 0,
      }}
    >
      <Image
        src={cat.image}
        alt={cat.title}
        fill
        className="object-cover"
        style={{
          transform: isActive ? "scale(1.02)" : "scale(1.08)",
          transition: "transform 700ms cubic-bezier(.16,1,.3,1)",
          objectPosition: "center",
        }}
      />

      <div style={{
        position: "absolute", inset: 0,
        background: isActive
          ? "linear-gradient(to top, rgba(10,18,24,0.72) 0%, rgba(10,18,24,0.05) 35%, transparent 55%)"
          : "linear-gradient(to top, rgba(10,18,24,0.5) 0%, transparent 40%)",
        transition: "background 500ms ease",
      }} />

      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background: `linear-gradient(to right, transparent, ${TEAL}, transparent)`,
          opacity: isActive ? 1 : 0,
          transition: "opacity 400ms ease",
        }}
      />

      <div style={{
        position: "absolute", bottom: "50%", left: "50%",
        transform: "translateX(-50%) translateY(50%) rotate(-90deg)",
        whiteSpace: "nowrap",
        opacity: isActive ? 0 : 1,
        transition: "opacity 300ms ease",
        pointerEvents: "none",
        display: "flex", alignItems: "center", gap: "8px",
      }}>
        <span className={quicksand.className} style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>
          {cat.number}
        </span>
        <span className={quicksand.className} style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.75)", textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>
          {cat.title}
        </span>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: `0 22px 26px ${isFirst ? "clamp(1.5rem, 4vw, 4rem)" : "22px"}`,
        opacity: isActive ? 1 : 0,
        transform: isActive ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 400ms ease 150ms, transform 450ms cubic-bezier(.16,1,.3,1) 150ms",
        pointerEvents: isActive ? "auto" : "none",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: `${TEAL}28`, border: `1px solid ${TEAL}60`,
          borderRadius: "100px", padding: "4px 12px", marginBottom: "10px",
          backdropFilter: "blur(8px)",
        }}>
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: TEAL, display: "inline-block", flexShrink: 0 }} />
          <span className={quicksand.className} style={{ color: TEAL, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            {cat.tag}
          </span>
        </div>

        <h3 className={quicksand.className} style={{ fontSize: "clamp(1.4rem, 2vw, 1.85rem)", fontWeight: 700, color: WHITE, lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: "8px", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
          {cat.title}
        </h3>

        <p className={quicksand.className} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", fontWeight: 400, lineHeight: 1.6, marginBottom: "16px", maxWidth: "28ch", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>
          {cat.description}
        </p>

        <Link
          href={cat.href}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          className="group relative inline-flex items-center justify-center overflow-hidden"
          style={{
            height: "40px", padding: "0 18px",
            background: TEAL, color: "#0D1B24",
            fontWeight: 700, fontSize: "0.73rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            textDecoration: "none", gap: "7px", whiteSpace: "nowrap",
          }}
        >
          <span style={{
            position: "absolute", inset: 0, background: RUST,
            transform: btnHovered ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 500ms cubic-bezier(.16,1,.3,1)",
          }} />
          <span className={quicksand.className} style={{ position: "relative", zIndex: 1, color: btnHovered ? WHITE : "#0D1B24", transition: "color 300ms ease" }}>
            Explore
          </span>
          <ArrowUpRight style={{ position: "relative", zIndex: 1, width: "13px", height: "13px", flexShrink: 0, color: btnHovered ? WHITE : "#0D1B24", transition: "color 300ms ease" }} />
        </Link>
      </div>

      <div style={{
        position: "absolute", top: "14px", right: "14px",
        width: "16px", height: "16px",
        borderTop: `1.5px solid ${TEAL}`,
        borderRight: `1.5px solid ${TEAL}`,
        opacity: isActive ? 0.7 : 0,
        transition: "opacity 350ms ease 100ms",
        pointerEvents: "none",
      }} />
    </div>
  );
}

// ─── Discover Block ───────────────────────────────────────────────────────────
function DiscoverBlock({ active, onEnter, onLeave, onToggle }: {
  active: number;
  onEnter: (i: number) => void;
  onLeave: () => void;
  onToggle: (i: number) => void;
}) {
  const cat = categories[active];
  const [animating, setAnimating] = useState(false);
  const [prevActive, setPrevActive] = useState(active);
  const [exploreHovered, setExploreHovered] = useState(false);
  const [eventsHovered, setEventsHovered] = useState(false);

  useEffect(() => {
    if (active !== prevActive) {
      setAnimating(true);
      const t = setTimeout(() => { setPrevActive(active); setAnimating(false); }, 420);
      return () => clearTimeout(t);
    }
  }, [active, prevActive]);

  return (
    <div style={{ background: WHITE, position: "relative", overflow: "hidden", boxShadow: "0 8px 40px rgba(32,178,170,0.10), 0 2px 12px rgba(54,69,79,0.10)" }}>
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: "600px", height: "600px", borderRadius: "50%",
          background: `radial-gradient(circle, ${TEAL}10 0%, transparent 70%)`,
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          filter: "blur(60px)",
        }}
      />

      <div
        className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16"
        style={{ paddingTop: "clamp(4rem, 9vh, 7rem)", paddingBottom: "clamp(2rem, 4vh, 3rem)" }}
      >
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: RUST }} />
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, letterSpacing: "0.03em", color: "#000000", textTransform: "none", margin: 0 }}>
            {copy.discoverBlock.eyebrow}
          </p>
        </div>

        <div style={{
          marginTop: "14px", height: "4px", width: "clamp(220px, 26vw, 340px)",
          background: `linear-gradient(90deg, ${TEAL} 0%, ${RUST} 55%, ${CREAM} 100%)`,
          borderRadius: "4px", transform: "skewX(-18deg) translateX(6px)", transformOrigin: "left",
        }} />
      </div>

      <div className="relative z-20">
        <div style={{ width: "100%", height: "clamp(560px, 80vh, 920px)", display: "flex", gap: "3px", overflow: "hidden" }}>
          {categories.map((c, i) => (
            <AccordionSlice
              key={c.title} cat={c} isActive={i === active}
              onEnter={() => onEnter(i)} onLeave={onLeave} onToggle={() => onToggle(i)}
              isFirst={i === 0} isLast={i === categories.length - 1}
            />
          ))}
        </div>
      </div>

      <div className="relative z-20 w-full">
        <motion.div
          initial={{ y: -200 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
          style={{ background: SLATE }}
        >
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}>
            <div className="max-w-4xl mx-auto text-center px-6 py-12">
              <div className="flex items-center justify-center gap-3">
                <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: RUST }} />
                <span className={quicksand.className} style={{ color: "rgba(245,222,179,0.35)", fontWeight: 500, fontSize: "0.72rem", letterSpacing: "0.12em", opacity: animating ? 0 : 1, transition: "opacity 300ms ease" }}>
                  {String(active + 1).padStart(2, "0")} — {String(categories.length).padStart(2, "0")}
                </span>
              </div>

              <h2
                className={`mt-4 text-3xl sm:text-4xl font-black uppercase leading-[0.95] md:text-5xl ${quicksand.className}`}
                style={{ color: CREAM, opacity: animating ? 0 : 1, transform: animating ? "translateY(14px)" : "translateY(0)", transition: "opacity 420ms ease 50ms, transform 480ms cubic-bezier(.16,1,.3,1) 50ms" }}
              >
                {cat.title}
              </h2>

              <div className="mt-4 h-[3px] w-20 sm:w-24 rounded-full mx-auto" style={{ background: `linear-gradient(to right, ${WHITE}, ${RUST}, transparent)` }} />

              <p
                className={`mt-5 sm:mt-6 text-xl sm:text-2xl leading-relaxed ${quicksand.className}`}
                style={{ color: "rgba(245,222,179,0.65)", opacity: animating ? 0 : 1, transform: animating ? "translateY(8px)" : "translateY(0)", transition: "opacity 380ms ease 100ms, transform 440ms cubic-bezier(.16,1,.3,1) 100ms" }}
              >
                {cat.description}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-5 mt-8" style={{ opacity: animating ? 0 : 1, transition: "opacity 380ms ease 120ms" }}>
                <Link
                  href={cat.href}
                  onMouseEnter={() => setExploreHovered(true)}
                  onMouseLeave={() => setExploreHovered(false)}
                  className={`group relative inline-flex items-center justify-center overflow-hidden h-12 md:h-14 px-7 md:px-8 ${quicksand.className}`}
                  style={{ background: CREAM, color: SLATE, textTransform: "uppercase", letterSpacing: "0.18em", fontSize: "0.75rem", fontWeight: 600, textDecoration: "none", gap: "8px" }}
                >
                  <span style={{ position: "absolute", inset: 0, background: TEAL, transform: exploreHovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 500ms cubic-bezier(.16,1,.3,1)" }} />
                  <span style={{ position: "relative", zIndex: 1, color: exploreHovered ? WHITE : SLATE, transition: "color 300ms ease" }}>Explore More</span>
                </Link>

                <Link
                  href="/events"
                  onMouseEnter={() => setEventsHovered(true)}
                  onMouseLeave={() => setEventsHovered(false)}
                  className={`inline-flex items-center justify-center h-12 md:h-14 px-7 md:px-8 ${quicksand.className}`}
                  style={{ border: `1px solid ${CREAM}`, color: eventsHovered ? SLATE : CREAM, background: eventsHovered ? CREAM : "transparent", textTransform: "uppercase", letterSpacing: "0.18em", fontSize: "0.75rem", fontWeight: 600, textDecoration: "none", transition: "all 300ms ease" }}
                >
                  View Events
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Amenity Card ─────────────────────────────────────────────────────────────
function AmenityCard({ amenity }: { amenity: Amenity }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ flexShrink: 0, width: "clamp(340px, 32vw, 480px)" }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: "relative", width: "100%", height: "620px", overflow: "hidden", background: "#ddd", border: "1px solid rgba(54,69,79,0.08)" }}>
        <Image
          src={amenity.image}
          alt={amenity.label}
          fill
          className="object-cover"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 1400ms cubic-bezier(.16,1,.3,1)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: hovered ? "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" : "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 60%)", transition: "background 500ms ease" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(to right, transparent, ${TEAL}, transparent)`, opacity: hovered ? 1 : 0, transition: "opacity 400ms ease" }} />
      </div>

      <div style={{ paddingTop: "10px", paddingBottom: "4px", borderBottom: `3px solid ${hovered ? RUST : TEAL}`, transition: "border-color 300ms ease" }}>
        <p className={quicksand.className} style={{ fontSize: "1rem", fontWeight: 800, color: SLATE, letterSpacing: "0.01em", lineHeight: 1.2, margin: 0 }}>
          {amenity.label}
        </p>
      </div>
    </div>
  );
}

// ─── Individual Business Card ─────────────────────────────────────────────────
function BusinessCard({ biz }: { biz: Business }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={biz.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: "clamp(320px, 28vw, 400px)",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        border: `1px solid ${hovered ? TEAL : "rgba(54,69,79,0.12)"}`,
        transition: "border-color 280ms ease, box-shadow 280ms ease",
        boxShadow: hovered ? `0 8px 32px rgba(32,178,170,0.14)` : "0 2px 8px rgba(0,0,0,0.04)",
        background: WHITE,
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "260px", overflow: "hidden", flexShrink: 0 }}>
        <Image
          src={biz.img}
          alt={biz.name}
          fill
          sizes="(max-width: 768px) 90vw, 340px"
          className="object-cover"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)", transition: "transform 900ms cubic-bezier(.16,1,.3,1)", objectPosition: "center top" }}
        />
        {/* Teal top bar on hover */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "3px",
          background: `linear-gradient(to right, ${TEAL}, ${RUST})`,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 450ms cubic-bezier(.16,1,.3,1)",
        }} />
        {/* Type badge */}
        <div style={{
          position: "absolute", bottom: "12px", left: "12px",
          display: "inline-flex", alignItems: "center", gap: "5px",
          background: "rgba(10,18,24,0.72)",
          border: `1px solid ${TEAL}50`,
          borderRadius: "3px", padding: "4px 10px",
          backdropFilter: "blur(8px)",
        }}>
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: TEAL, flexShrink: 0 }} />
          <span className={quicksand.className} style={{ color: TEAL, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            {biz.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Name */}
        <h3 className={quicksand.className} style={{
          fontSize: "1.05rem", fontWeight: 800, color: SLATE,
          lineHeight: 1.1, letterSpacing: "-0.01em", margin: "0 0 6px",
        }}>
          {biz.name}
        </h3>

        {/* Address */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "10px" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={RUST} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span className={quicksand.className} style={{ fontSize: "0.68rem", color: "#000000", fontWeight: 500, letterSpacing: "0.02em" }}>
            {biz.address}
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(54,69,79,0.08)", marginBottom: "10px" }} />

        {/* Blurb */}
        <p className={quicksand.className} style={{
          fontSize: "0.8rem", color: "#000000", lineHeight: 1.65,
          fontWeight: 400, margin: "0 0 14px", flex: 1,
        }}>
          {biz.blurb}
        </p>

        {/* Footer row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span className={quicksand.className} style={{ fontSize: "0.65rem", color: "#000000", fontWeight: 500 }}>
              {biz.hours}
            </span>
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            color: hovered ? RUST : TEAL, transition: "color 250ms ease",
          }}>
            <span className={quicksand.className} style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              View
            </span>
            <ArrowUpRight style={{ width: "11px", height: "11px" }} />
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div style={{
        height: "3px", background: hovered ? RUST : "transparent",
        transition: "background 300ms ease",
        flexShrink: 0,
      }} />
    </Link>
  );
}

// ─── Business Directory Panel ─────────────────────────────────────────────────
function BusinessDirectoryPanel() {
  const [activeCat, setActiveCat] = useState(0);
  const [dirHovered, setDirHovered] = useState(false);
  const bizScrollRef = useRef<HTMLDivElement>(null);
  const [bizLeft, setBizLeft] = useState(false);
  const [bizRight, setBizRight] = useState(false);

  const scrollBiz = (dir: "left" | "right") => {
    bizScrollRef.current?.scrollBy({ left: dir === "right" ? 360 : -360, behavior: "smooth" });
  };

  const group = businessGroups[activeCat];

  return (
    <>
      {/* Header */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: RUST, flexShrink: 0 }} />
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.3rem, 2vw, 1.8rem)", fontWeight: 600, color: "#000000", margin: 0, letterSpacing: "0.02em" }}>
                {copy.businessDirectory.eyebrow}
              </p>
            </div>
            <h2 className={quicksand.className} style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, color: SLATE, margin: "0 0 4px", lineHeight: 1 }}>
              {copy.businessDirectory.heading}
            </h2>
            <div style={{ height: "3px", width: "80px", background: `linear-gradient(to right, ${TEAL}, ${RUST})`, borderRadius: "2px" }} />
          </div>
          <Link
            href={copy.businessDirectory.fullDirectoryHref}
            onMouseEnter={() => setDirHovered(true)}
            onMouseLeave={() => setDirHovered(false)}
            className={quicksand.className}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              height: "44px", padding: "0 22px",
              border: `1px solid ${dirHovered ? RUST : SLATE}`,
              color: dirHovered ? RUST : SLATE, background: "transparent",
              textTransform: "uppercase", letterSpacing: "0.18em", fontSize: "0.7rem", fontWeight: 700,
              textDecoration: "none", transition: "all 250ms ease", whiteSpace: "nowrap",
              alignSelf: "center",
            }}
          >
            {copy.businessDirectory.fullDirectoryLabel} <ArrowUpRight style={{ width: "12px", height: "12px" }} />
          </Link>
        </div>

        {/* Category sub-tabs */}
        <div style={{ display: "flex", gap: "8px", marginTop: "2rem", flexWrap: "wrap" }}>
          {businessGroups.map((g, i) => {
            const isActive = i === activeCat;
            return (
              <button
                key={g.category}
                onClick={() => setActiveCat(i)}
                className={quicksand.className}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "8px 18px", borderRadius: "100px", cursor: "pointer",
                  background: isActive ? SLATE : "transparent",
                  border: `1.5px solid ${isActive ? SLATE : "rgba(54,69,79,0.25)"}`,
                  color: isActive ? WHITE : "#000000",
                  fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                  transition: "all 220ms ease",
                }}
              >
                <i className={g.icon} style={{ fontSize: "15px" }} aria-hidden="true" />
                {g.category}
              </button>
            );
          })}
        </div>

        {/* Active category label + count */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "1.75rem", marginBottom: "0.25rem" }}>
          <span className={quicksand.className} style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: TEAL }}>
            {group.category}
          </span>
          <span style={{ width: "1px", height: "12px", background: "rgba(54,69,79,0.2)" }} />
          <span className={quicksand.className} style={{ fontSize: "0.68rem", fontWeight: 500, color: "#000000", letterSpacing: "0.08em" }}>
            {group.businesses.length} businesses
          </span>
        </div>
      </div>

      {/* Horizontally scrollable business card row */}
      <div style={{ position: "relative", width: "100%", marginTop: "1.25rem" }}>
        <div
          ref={bizScrollRef}
          style={{
            display: "flex", gap: "16px", overflowX: "auto", scrollbarWidth: "none",
            paddingLeft: "clamp(1.5rem, 4vw, 4rem)", paddingRight: "clamp(1.5rem, 4vw, 4rem)",
            paddingBottom: "8px",
          }}
        >
          {group.businesses.map((biz) => (
            <BusinessCard key={biz.name} biz={biz} />
          ))}

          {/* "See all" card */}
          <Link
            href={`/directory?cat=${group.category.toLowerCase()}`}
            style={{
              flexShrink: 0, width: "clamp(200px, 16vw, 240px)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: "14px", textDecoration: "none",
              border: `1.5px dashed ${TEAL}60`,
              background: `${TEAL}06`,
              transition: "background 250ms ease",
              padding: "24px",
            }}
          >
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: TEAL, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ArrowUpRight style={{ width: "20px", height: "20px", color: WHITE }} />
            </div>
            <span className={quicksand.className} style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: TEAL, textAlign: "center" }}>
              See All {group.category}
            </span>
          </Link>
        </div>
      </div>

      {/* Scroll nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "20px" }}>
        <div style={{ flex: 1, maxWidth: "100px", height: "1px", background: `linear-gradient(to right, transparent, ${TEAL}50)` }} />
        <button
          onClick={() => scrollBiz("left")}
          onMouseEnter={() => setBizLeft(true)}
          onMouseLeave={() => setBizLeft(false)}
          style={{
            display: "flex", alignItems: "center", gap: "7px", padding: "9px 18px", borderRadius: "100px",
            background: bizLeft ? SLATE : "transparent",
            border: `1.5px solid ${bizLeft ? SLATE : "rgba(54,69,79,0.25)"}`,
            color: bizLeft ? WHITE : SLATE, cursor: "pointer", transition: "all 240ms ease",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
          <span className={quicksand.className} style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>Prev</span>
        </button>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: TEAL, opacity: 0.5 }} />
        <button
          onClick={() => scrollBiz("right")}
          onMouseEnter={() => setBizRight(true)}
          onMouseLeave={() => setBizRight(false)}
          style={{
            display: "flex", alignItems: "center", gap: "7px", padding: "9px 18px", borderRadius: "100px",
            background: bizRight ? TEAL : "transparent",
            border: `1.5px solid ${bizRight ? TEAL : "rgba(54,69,79,0.25)"}`,
            color: bizRight ? WHITE : SLATE, cursor: "pointer", transition: "all 240ms ease",
          }}
        >
          <span className={quicksand.className} style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>Next</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
        <div style={{ flex: 1, maxWidth: "100px", height: "1px", background: `linear-gradient(to left, transparent, ${RUST}50)` }} />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div style={{ height: "1px", background: "rgba(54,69,79,0.10)", marginTop: "2.5rem" }} />
      </div>
    </>
  );
}

// ─── City Amenities Tab Content ────────────────────────────────────────────────
function CityAmenitiesContent() {
  const [dirHovered, setDirHovered] = useState(false);
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop: "2.5rem" }}>
        <p style={{
          fontFamily: "'Caveat', cursive", fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)", fontWeight: 500,
          color: "#000000", lineHeight: 1.65, maxWidth: "780px", margin: "0 0 0 auto",
          textAlign: "left", letterSpacing: "0.01em",
        }}>
          {copy.amenities.intro}
        </p>
      </div>

      <div style={{ position: "relative", marginTop: "0", width: "100%" }}>
        <div
          ref={scrollRef}
          style={{ display: "flex", gap: "20px", overflowX: "auto", scrollbarWidth: "none", paddingTop: "40px", paddingLeft: "clamp(1.5rem, 4vw, 4rem)" }}
        >
          {amenities.map((a) => (
            <AmenityCard key={a.label} amenity={a} />
          ))}
        </div>
      </div>

      {/* Carousel Nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "28px", paddingBottom: "4px" }}>
        <div style={{ flex: 1, maxWidth: "120px", height: "1px", background: `linear-gradient(to right, transparent, ${TEAL}60)` }} />
        <button
          onClick={() => scroll("left")}
          onMouseEnter={() => setLeftHovered(true)}
          onMouseLeave={() => setLeftHovered(false)}
          style={{
            display: "flex", alignItems: "center", gap: "8px", padding: "10px 22px", borderRadius: "100px",
            background: leftHovered ? SLATE : "transparent",
            border: `1.5px solid ${leftHovered ? SLATE : "rgba(54,69,79,0.3)"}`,
            color: leftHovered ? WHITE : SLATE, cursor: "pointer", transition: "all 250ms ease",
            boxShadow: leftHovered ? "0 4px 16px rgba(54,69,79,0.18)" : "none",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
          <span className={quicksand.className} style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>Prev</span>
        </button>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: TEAL, opacity: 0.6 }} />
        <button
          onClick={() => scroll("right")}
          onMouseEnter={() => setRightHovered(true)}
          onMouseLeave={() => setRightHovered(false)}
          style={{
            display: "flex", alignItems: "center", gap: "8px", padding: "10px 22px", borderRadius: "100px",
            background: rightHovered ? TEAL : "transparent",
            border: `1.5px solid ${rightHovered ? TEAL : "rgba(54,69,79,0.3)"}`,
            color: rightHovered ? WHITE : SLATE, cursor: "pointer", transition: "all 250ms ease",
            boxShadow: rightHovered ? `0 4px 16px ${TEAL}40` : "none",
          }}
        >
          <span className={quicksand.className} style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>Next</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
        <div style={{ flex: 1, maxWidth: "120px", height: "1px", background: `linear-gradient(to left, transparent, ${RUST}60)` }} />
      </div>

      {/* Heading + Directory CTA */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16" style={{ marginTop: "3.5rem" }}>
        <div className="mb-10 sm:mb-14 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: RUST }} />
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", fontWeight: 600, letterSpacing: "0.02em", color: "#000000", textTransform: "none", margin: 0 }}>
              {copy.amenities.eyebrow}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginTop: "1rem" }}>
            <div>
              <h2 className={`text-4xl sm:text-5xl font-black uppercase leading-[0.95] md:text-6xl ${quicksand.className}`} style={{ color: SLATE, margin: 0 }}>
                {copy.amenities.heading}
              </h2>
              <div className="mt-4 h-[3px] w-20 sm:w-24 rounded-full" style={{ background: `linear-gradient(to right, ${RUST}, ${TEAL}, transparent)` }} />
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.5rem, 2.6vw, 2.2rem)", fontWeight: 500, letterSpacing: "0.01em", lineHeight: 1.5, color: "#000000", marginTop: "1.5rem", marginBottom: 0, maxWidth: "44ch" }}>
                {copy.amenities.subheading}
              </p>
            </div>

            <Link
              href={copy.amenities.directoryHref}
              onMouseEnter={() => setDirHovered(true)}
              onMouseLeave={() => setDirHovered(false)}
              className={`inline-flex items-center gap-2 h-12 md:h-14 px-7 md:px-8 ${quicksand.className}`}
              style={{
                flexShrink: 0, alignSelf: "center",
                border: `1px solid ${dirHovered ? RUST : SLATE}`,
                color: dirHovered ? RUST : SLATE, background: "transparent",
                textTransform: "uppercase", letterSpacing: "0.18em", fontSize: "0.73rem", fontWeight: 700,
                textDecoration: "none", transition: "all 250ms ease", whiteSpace: "nowrap",
              }}
            >
              {copy.amenities.directoryCtaLabel} <ArrowUpRight style={{ width: "13px", height: "13px" }} />
            </Link>
          </div>
        </div>
        <div style={{ height: "1px", background: "rgba(54,69,79,0.12)", marginTop: "2.5rem" }} />
      </div>
    </>
  );
}

// ─── Tab Section Registry ──────────────────────────────────────────────────────
// Tab labels/icons come from JSON (content.sectionCopy.tabs); the renderer for
// each tab still lives in code and is looked up by the tab's "key".
type TabSection = {
  key: string;
  label: string;
  icon: string;
  Content: ComponentType;
};

const TAB_CONTENT_MAP: Record<string, ComponentType> = {
  amenities: CityAmenitiesContent,
  businesses: BusinessDirectoryPanel,
};

const tabSections: TabSection[] = copy.tabs.map((tab) => ({
  ...tab,
  Content: TAB_CONTENT_MAP[tab.key],
}));

const AUTOPLAY_DURATION_MS = 7000;
const CROSSFADE_MS = 380;

// ─── Amenities Section (Auto-Rotating Tabs) ────────────────────────────────────
function AmenitiesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [displayedTab, setDisplayedTab] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [autoplayOn, setAutoplayOn] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance through tabs
  useEffect(() => {
    if (!autoplayOn || isPaused) return;
    intervalRef.current = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabSections.length);
    }, AUTOPLAY_DURATION_MS);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [autoplayOn, isPaused, activeTab]);

  // Crossfade content when the active tab changes
  useEffect(() => {
    if (activeTab !== displayedTab) {
      setAnimating(true);
      const t = setTimeout(() => {
        setDisplayedTab(activeTab);
        setAnimating(false);
      }, CROSSFADE_MS);
      return () => clearTimeout(t);
    }
  }, [activeTab, displayedTab]);

  const handleTabClick = (i: number) => {
    if (i === activeTab) return;
    setActiveTab(i);
    setAutoplayOn(false); // manual selection takes over; stop auto-rotating
  };

  const ActiveContent = tabSections[displayedTab].Content;

  return (
    <div
      style={{ background: WHITE, paddingTop: "0", paddingBottom: "4rem", boxShadow: "0 8px 40px rgba(32,178,170,0.10), 0 2px 12px rgba(54,69,79,0.10)" }}
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full blur-3xl pointer-events-none" style={{ background: `${TEAL}12` }} />
      <div className="absolute bottom-[-160px] right-[-100px] h-[300px] w-[300px] rounded-full blur-3xl pointer-events-none" style={{ background: `${CREAM}18` }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.47.0/tabler-icons.min.css');
        @keyframes tabAutoplayProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      {/* ── Tab Bar ── */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop: "3.5rem" }}>
        <div style={{ display: "flex", borderBottom: `2px solid rgba(54,69,79,0.12)`, marginBottom: "0" }}>
          {tabSections.map((tab, i) => {
            const isActive = i === activeTab;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabClick(i)}
                className={quicksand.className}
                style={{
                  position: "relative",
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "12px 28px", background: "transparent", border: "none",
                  borderBottom: `3px solid ${isActive ? TEAL : "transparent"}`,
                  marginBottom: "-2px", cursor: "pointer",
                  fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
                  color: isActive ? SLATE : "#000000",
                  transition: "color 220ms ease, border-color 220ms ease",
                }}
              >
                <i className={tab.icon} style={{ fontSize: "18px", color: isActive ? TEAL : "rgba(54,69,79,0.35)", transition: "color 220ms ease" }} aria-hidden="true" />
                {tab.label}

                {/* Autoplay progress indicator, only on the active tab while autoplay is running */}
                {isActive && autoplayOn && (
                  <span
                    key={`${tab.key}-${activeTab}`}
                    style={{
                      position: "absolute", bottom: "-3px", left: 0, height: "3px",
                      background: RUST, borderRadius: "2px",
                      animation: `tabAutoplayProgress ${AUTOPLAY_DURATION_MS}ms linear forwards`,
                      animationPlayState: isPaused ? "paused" : "running",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Crossfading tab content ── */}
      <div
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(12px)" : "translateY(0)",
          transition: `opacity ${CROSSFADE_MS}ms ease, transform ${CROSSFADE_MS + 60}ms cubic-bezier(.16,1,.3,1)`,
        }}
      >
        <ActiveContent />
      </div>
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────
export default function DiscoverHighlightsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [clickedCard, setClickedCard] = useState<number | null>(null);
  const [autoCard, setAutoCard] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const active = clickedCard !== null ? clickedCard : hoveredCard !== null ? hoveredCard : autoCard;

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setAutoCard((prev) => (prev + 1) % categories.length), 2800);
  };

  useEffect(() => {
    startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleEnter = (i: number) => { if (intervalRef.current) clearInterval(intervalRef.current); setHoveredCard(i); };
  const handleLeave = () => { setHoveredCard(null); if (clickedCard === null) startInterval(); };
  const handleToggle = (i: number) => {
    setClickedCard((prev) => {
      if (prev === i) { startInterval(); return null; }
      if (intervalRef.current) clearInterval(intervalRef.current);
      return i;
    });
  };

  return (
    <section className={`${quicksand.className} relative`} style={{ backgroundColor: WHITE, width: "100%", maxWidth: "100%", margin: 0, padding: 0 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');`}</style>
      <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
        <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${TEAL} 0%, ${RUST} 50%, ${CREAM} 100%)` }} />
        <div className="h-[42px] w-full opacity-40 blur-2xl" style={{ background: `linear-gradient(90deg, rgba(32,178,170,0.35) 0%, rgba(204,65,37,0.35) 50%, rgba(245,222,179,0.35) 100%)` }} />
      </div>

      <DiscoverBlock active={active} onEnter={handleEnter} onLeave={handleLeave} onToggle={handleToggle} />
      <AmenitiesSection />
      <SocialSection />
    </section>
  );
}