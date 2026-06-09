"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Wifi,
  Dumbbell,
  Trees,
  ShoppingBag,
  Car,
  Coffee,
  Shield,
  Waves,
} from "lucide-react";
import { Quicksand } from "next/font/google";
import { motion } from "framer-motion";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// ─── Palette ──────────────────────────────────────────────────────────────────
const TEAL     = "#20B2AA";
const RUST     = "#CC4125";
const WHEAT    = "#F5DEB3";
const CHARCOAL = "#36454F";
const WHITE    = "#FFFFFF";

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = [
  {
    title: "Top Experiences",
    tag: "Must-Do",
    number: "01",
    description: "Immersive adventures and curated experiences shaping the identity of the city.",
    href: "/experiences",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Culture & Community",
    tag: "Local Life",
    number: "02",
    description: "Meet creators, innovators, and communities driving the cultural pulse of Fate.",
    href: "/community",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Weekend Energy",
    tag: "Events",
    number: "03",
    description: "Events, nightlife, and weekend discoveries across the city.",
    href: "/events",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Food & Drink",
    tag: "Dining",
    number: "04",
    description: "Hidden kitchens, rooftop bars, and the flavors that define Fate's palate.",
    href: "/dining",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Art & Design",
    tag: "Creative",
    number: "05",
    description: "Galleries, murals, studios, and the makers reshaping Fate's visual language.",
    href: "/art",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Outdoors & Nature",
    tag: "Escape",
    number: "06",
    description: "Parks, trails, and green spaces where the city breathes and slows down.",
    href: "/outdoors",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1600&auto=format&fit=crop",
  },
];

const amenities = [
  {
    icon: Wifi,
    label: "Free City Wi-Fi",
    desc: "High-speed public internet across all major districts",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Dumbbell,
    label: "Fitness Centers",
    desc: "12 world-class gyms and wellness studios",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Trees,
    label: "Green Corridors",
    desc: "Over 40km of landscaped parks and walking trails",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: ShoppingBag,
    label: "Retail Districts",
    desc: "Curated boutiques, markets, and flagship stores",
    image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Car,
    label: "Smart Parking",
    desc: "Real-time availability across 8,000+ spaces",
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Coffee,
    label: "Social Lounges",
    desc: "Co-working cafés and communal gathering spaces",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Shield,
    label: "24/7 Security",
    desc: "Continuous monitoring and rapid response teams",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Waves,
    label: "Aquatic Facilities",
    desc: "Three Olympic pools and a beachfront club",
    image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800&auto=format&fit=crop",
  },
];

// ─── Social Icons ─────────────────────────────────────────────────────────────

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

const socialLinks = [
  { icon: <XIcon />, href: "https://x.com/VisitFate", label: "X (Twitter)", handle: "@VisitFate", index: "01" },
  { icon: <InstagramIcon />, href: "https://www.instagram.com/visitfate/", label: "Instagram", handle: "@visitfate", index: "02" },
  { icon: <FacebookIcon />, href: "https://web.facebook.com/profile.php/?id=61589634350805&_rdc=1&_rdr", label: "Facebook", handle: "Fate City", index: "03" },
];

// ─── Social Section ───────────────────────────────────────────────────────────

function SocialSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div style={{ background: WHITE }}>
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop: "1.75rem", paddingBottom: "1.75rem" }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-px flex-shrink-0" style={{ background: "rgba(204,65,37,0.5)" }} />
            <span className={quicksand.className} style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.06em", color: "rgba(80,30,15,0.6)" }}>
              Follow Fate on
            </span>
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.map((link, i) => (
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
                  padding: "7px 14px 7px 10px", borderRadius: "100px",
                  border: `1px solid ${hoveredIdx === i ? RUST : "rgba(204,65,37,0.25)"}`,
                  background: hoveredIdx === i ? RUST : "rgba(255,255,255,0.35)",
                  color: hoveredIdx === i ? WHITE : CHARCOAL,
                  textDecoration: "none", transition: "all 220ms ease", whiteSpace: "nowrap",
                }}
              >
                <span style={{ display: "flex", flexShrink: 0 }}>{link.icon}</span>
                <span className={quicksand.className} style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.02em", color: hoveredIdx === i ? WHITE : "rgba(30,35,40,0.75)", transition: "color 220ms ease" }}>
                  {link.handle}
                </span>
              </a>
            ))}
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
  cat: (typeof categories)[0];
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
      <Image src={cat.image} alt={cat.title} fill className="object-cover"
        style={{ transform: isActive ? "scale(1.02)" : "scale(1.08)", transition: "transform 700ms cubic-bezier(.16,1,.3,1)", objectPosition: "center" }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: isActive
          ? "linear-gradient(to top, rgba(10,18,24,0.72) 0%, rgba(10,18,24,0.05) 35%, transparent 55%)"
          : "linear-gradient(to top, rgba(10,18,24,0.5) 0%, transparent 40%)",
        transition: "background 500ms ease",
      }} />
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: `linear-gradient(to right, transparent, ${TEAL}, transparent)`,
        opacity: isActive ? 1 : 0, transition: "opacity 400ms ease",
      }} />
      {/* Collapsed label */}
      <div style={{
        position: "absolute", bottom: "50%", left: "50%",
        transform: "translateX(-50%) translateY(50%) rotate(-90deg)",
        whiteSpace: "nowrap", opacity: isActive ? 0 : 1,
        transition: "opacity 300ms ease", pointerEvents: "none",
        display: "flex", alignItems: "center", gap: "8px",
      }}>
        <span className={quicksand.className} style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>{cat.number}</span>
        <span className={quicksand.className} style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.75)", textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>{cat.title}</span>
      </div>
      {/* Active content */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: `0 22px 26px ${isFirst ? "clamp(1.5rem, 4vw, 4rem)" : "22px"}`,
        opacity: isActive ? 1 : 0,
        transform: isActive ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 400ms ease 150ms, transform 450ms cubic-bezier(.16,1,.3,1) 150ms",
        pointerEvents: isActive ? "auto" : "none",
      }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: `${TEAL}28`, border: `1px solid ${TEAL}60`, borderRadius: "100px", padding: "4px 12px", marginBottom: "10px", backdropFilter: "blur(8px)" }}>
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: TEAL, display: "inline-block", flexShrink: 0 }} />
          <span className={quicksand.className} style={{ color: TEAL, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>{cat.tag}</span>
        </div>
        <h3 className={quicksand.className} style={{ fontSize: "clamp(1.4rem, 2vw, 1.85rem)", fontWeight: 700, color: WHITE, lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: "8px", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>{cat.title}</h3>
        <p className={quicksand.className} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", fontWeight: 400, lineHeight: 1.6, marginBottom: "16px", maxWidth: "28ch", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>{cat.description}</p>
        <Link
          href={cat.href}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          className="group relative inline-flex items-center justify-center overflow-hidden"
          style={{ height: "40px", padding: "0 18px", background: TEAL, color: "#0D1B24", fontWeight: 700, fontSize: "0.73rem", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", gap: "7px", whiteSpace: "nowrap" }}
        >
          <span style={{ position: "absolute", inset: 0, background: RUST, transform: btnHovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 500ms cubic-bezier(.16,1,.3,1)" }} />
          <span className={quicksand.className} style={{ position: "relative", zIndex: 1, color: btnHovered ? WHITE : "#0D1B24", transition: "color 300ms ease" }}>Explore</span>
          <ArrowUpRight style={{ position: "relative", zIndex: 1, width: "13px", height: "13px", flexShrink: 0, color: btnHovered ? WHITE : "#0D1B24", transition: "color 300ms ease" }} />
        </Link>
      </div>
      <div style={{ position: "absolute", top: "14px", right: "14px", width: "16px", height: "16px", borderTop: `1.5px solid ${TEAL}`, borderRight: `1.5px solid ${TEAL}`, opacity: isActive ? 0.7 : 0, transition: "opacity 350ms ease 100ms", pointerEvents: "none" }} />
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
    <div style={{ background: WHITE, position: "relative", overflow: "hidden" }}>
      {/* Teal glow blob */}
      <div className="absolute pointer-events-none z-0" style={{ width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, ${TEAL}10 0%, transparent 70%)`, top: "50%", left: "50%", transform: "translate(-50%, -50%)", filter: "blur(60px)" }} />

      {/* Full-width accordion */}
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

      {/* ── STANDARDISED HEADING BANNER — slides up from accordion bottom ── */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ y: -200 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
          style={{ background: TEAL }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="max-w-4xl mx-auto text-center px-6 py-12">
              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-3">
                {/* White dot on teal bg */}
                <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: WHITE }} />
                <p className={`text-sm sm:text-base uppercase tracking-[0.25em] sm:tracking-[0.35em] ${quicksand.className}`}
                  style={{ color: "rgba(255,255,255,0.65)" }}>
                  Discover the City
                </p>
                <span className={quicksand.className} style={{ color: "rgba(255,255,255,0.45)", fontWeight: 500, fontSize: "0.72rem", letterSpacing: "0.12em", opacity: animating ? 0 : 1, transition: "opacity 300ms ease" }}>
                  {String(active + 1).padStart(2, "0")} — {String(categories.length).padStart(2, "0")}
                </span>
              </div>

              {/* Animated title — white on teal */}
              <h2
                className={`mt-4 text-4xl sm:text-5xl font-black uppercase leading-[0.95] md:text-7xl ${quicksand.className}`}
                style={{
                  color: WHITE,
                  opacity: animating ? 0 : 1,
                  transform: animating ? "translateY(14px)" : "translateY(0)",
                  transition: "opacity 420ms ease 50ms, transform 480ms cubic-bezier(.16,1,.3,1) 50ms",
                }}
              >
                {cat.title.split(" ").map((word, wi, arr) => (
                  <span key={wi} style={{
                    display: "inline",
                    marginRight: wi < arr.length - 1 ? "0.25em" : 0,
                    color: wi === arr.length - 1 ? "transparent" : WHITE,
                    WebkitTextStroke: wi === arr.length - 1 ? `2px ${WHITE}` : "none",
                  }}>
                    {word}
                  </span>
                ))}
              </h2>

              {/* Gradient bar — white → rust → transparent */}
              <div className="mt-4 h-[3px] w-20 sm:w-24 rounded-full mx-auto"
                style={{ background: `linear-gradient(to right, ${WHITE}, ${RUST}, transparent)` }} />

              {/* Description */}
              <p
                className={`mt-5 sm:mt-6 text-xl sm:text-2xl leading-relaxed ${quicksand.className}`}
                style={{
                  color: "rgba(255,255,255,0.75)",
                  opacity: animating ? 0 : 1,
                  transform: animating ? "translateY(8px)" : "translateY(0)",
                  transition: "opacity 380ms ease 100ms, transform 440ms cubic-bezier(.16,1,.3,1) 100ms",
                }}
              >
                {cat.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-5 mt-8"
                style={{ opacity: animating ? 0 : 1, transition: "opacity 380ms ease 120ms" }}>
                {/* Primary: dark fill → rust slide-in */}
                <Link
                  href={cat.href}
                  onMouseEnter={() => setExploreHovered(true)}
                  onMouseLeave={() => setExploreHovered(false)}
                  className={`group relative inline-flex items-center justify-center overflow-hidden h-12 md:h-14 px-7 md:px-8 ${quicksand.className}`}
                  style={{ background: "#111111", color: WHITE, textTransform: "uppercase", letterSpacing: "0.18em", fontSize: "0.75rem", fontWeight: 600, textDecoration: "none", gap: "8px" }}
                >
                  <span style={{ position: "absolute", inset: 0, background: RUST, transform: exploreHovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 500ms cubic-bezier(.16,1,.3,1)" }} />
                  <span style={{ position: "relative", zIndex: 1 }}>Explore More</span>
                </Link>
                {/* Secondary: white border → fills white */}
                <Link
                  href="/events"
                  onMouseEnter={() => setEventsHovered(true)}
                  onMouseLeave={() => setEventsHovered(false)}
                  className={`inline-flex items-center justify-center h-12 md:h-14 px-7 md:px-8 ${quicksand.className}`}
                  style={{
                    border: `1px solid ${WHITE}`,
                    color: eventsHovered ? TEAL : WHITE,
                    background: eventsHovered ? WHITE : "transparent",
                    textTransform: "uppercase", letterSpacing: "0.18em",
                    fontSize: "0.75rem", fontWeight: 600,
                    textDecoration: "none", transition: "all 300ms ease",
                  }}
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

// ─── Amenity Card — tall horizontal, vibrant accents ─────────────────────────

// Alternate accent per card: teal / rust / teal / rust …
const CARD_ACCENTS = [TEAL, RUST, TEAL, RUST, TEAL, RUST, TEAL, RUST];

function AmenityCard({ amenity, accent }: { amenity: (typeof amenities)[0]; accent: string }) {
  const [hovered, setHovered] = useState(false);
  const Icon = amenity.icon;

  return (
    <div
      className="relative overflow-hidden flex-shrink-0"
      style={{
        background: CHARCOAL,
        // Wider cards, taller — spread out horizontally
        width: "clamp(220px, 22vw, 300px)",
        height: "clamp(340px, 40vh, 480px)",
        borderRadius: "20px",
        cursor: "pointer",
        border: `1px solid ${accent}22`,
        transition: "border-color 350ms ease, transform 350ms cubic-bezier(.16,1,.3,1), box-shadow 350ms ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 24px 60px ${accent}30, 0 8px 20px rgba(0,0,0,0.3)` : "0 4px 16px rgba(0,0,0,0.15)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo */}
      <div className="absolute inset-0">
        <Image src={amenity.image} alt={amenity.label} fill className="object-cover"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1.02)", transition: "transform 750ms cubic-bezier(.16,1,.3,1)" }}
        />
      </div>

      {/* Gradient — stronger on hover */}
      <div className="absolute inset-0" style={{
        background: hovered
          ? `linear-gradient(to top, rgba(6,12,18,0.96) 0%, rgba(6,12,18,0.55) 50%, rgba(6,12,18,0.1) 80%, transparent 100%)`
          : `linear-gradient(to top, rgba(6,12,18,0.88) 0%, rgba(6,12,18,0.35) 55%, transparent 80%)`,
        transition: "background 450ms ease",
      }} />

      {/* Accent top bar — always visible, pulses on hover */}
      <div className="absolute top-0 left-0 right-0" style={{
        height: hovered ? "4px" : "2px",
        background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
        transition: "height 300ms ease, opacity 300ms ease",
        opacity: hovered ? 1 : 0.5,
      }} />

      {/* Icon badge — top right, accent-colored */}
      <div
        className="absolute top-4 right-4 flex items-center justify-center"
        style={{
          width: "44px", height: "44px",
          borderRadius: "12px",
          background: hovered ? accent : `${accent}25`,
          border: `1px solid ${accent}60`,
          transition: "background 350ms ease, transform 350ms ease",
          transform: hovered ? "scale(1.1) rotate(-5deg)" : "scale(1)",
        }}
      >
        <Icon style={{ width: "20px", height: "20px", color: hovered ? (accent === TEAL ? "#0D1B24" : WHITE) : accent }} />
      </div>

      {/* Number badge — top left */}
      <div className="absolute top-4 left-4">
        <span className={quicksand.className} style={{
          fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.2em",
          color: `${accent}99`, textTransform: "uppercase",
        }}>
          {String(amenities.findIndex(a => a.label === amenity.label) + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {/* Accent pill tag */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "5px",
          background: `${accent}22`, border: `1px solid ${accent}50`,
          borderRadius: "100px", padding: "3px 10px", marginBottom: "10px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 300ms ease 80ms, transform 350ms cubic-bezier(.16,1,.3,1) 80ms",
        }}>
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: accent, display: "inline-block" }} />
          <span className={quicksand.className} style={{ color: accent, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>City Perk</span>
        </div>

        {/* Description */}
        <p className={quicksand.className} style={{
          fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", fontWeight: 400,
          lineHeight: 1.55, marginBottom: "10px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 300ms ease 40ms, transform 380ms cubic-bezier(.16,1,.3,1) 40ms",
        }}>{amenity.desc}</p>

        {/* Label */}
        <p className={quicksand.className} style={{
          fontSize: "1.15rem", color: WHITE, fontWeight: 800,
          letterSpacing: "0.01em", lineHeight: 1.2,
          textShadow: "0 2px 10px rgba(0,0,0,0.9)",
        }}>{amenity.label}</p>

        {/* Accent underline that expands on hover */}
        <div style={{
          marginTop: "8px", height: "2px", borderRadius: "2px",
          background: accent,
          width: hovered ? "40px" : "16px",
          transition: "width 400ms cubic-bezier(.16,1,.3,1)",
          opacity: 0.8,
        }} />
      </div>
    </div>
  );
}

// ─── Amenities / Business Directories Section — WHEAT background ──────────────

function AmenitiesSection() {
  const [dirHovered, setDirHovered] = useState(false);
  const [allHovered, setAllHovered] = useState(false);

  return (
    <div className="relative overflow-hidden" style={{ background: WHEAT }}>
      {/* Rust glow — top left */}
      <div className="absolute -top-40 -left-40 h-[550px] w-[550px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: `${RUST}20` }} />
      {/* Teal glow — bottom right */}
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: `${TEAL}22` }} />
      {/* Center warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: `${RUST}08` }} />

      {/* Heading — full-bleed padded */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop: "5rem" }}>
        {/* ── STANDARDISED SECTION HEADING ── */}
        <div className="mb-10 sm:mb-14 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: RUST }} />
            <p className={`text-sm sm:text-base uppercase tracking-[0.25em] sm:tracking-[0.35em] ${quicksand.className}`}
              style={{ color: `${CHARCOAL}99` }}>
              Business Directories
            </p>
          </div>

          <h2 className={`mt-4 text-4xl sm:text-5xl font-black uppercase leading-[0.95] md:text-7xl ${quicksand.className}`}
            style={{ color: CHARCOAL }}>
            Everything
            <br />
            <span style={{ color: RUST }}>Already Here.</span>
          </h2>

          <div className="mt-4 h-[3px] w-20 sm:w-24 rounded-full"
            style={{ background: `linear-gradient(to right, ${RUST}, ${CHARCOAL}, transparent)` }} />

          <p className={`mt-5 sm:mt-6 text-xl sm:text-2xl leading-relaxed ${quicksand.className}`}
            style={{ color: `${CHARCOAL}B3` }}>
            Fate was built with community at its core. Every business exists to
            make daily life extraordinary — discover what's available in your district.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-5 mt-8">
            <Link
              href="/directory"
              onMouseEnter={() => setDirHovered(true)}
              onMouseLeave={() => setDirHovered(false)}
              className={`group relative inline-flex items-center justify-center overflow-hidden h-12 md:h-14 px-7 md:px-8 ${quicksand.className}`}
              style={{ background: CHARCOAL, color: WHITE, textTransform: "uppercase", letterSpacing: "0.18em", fontSize: "0.75rem", fontWeight: 600, textDecoration: "none" }}
            >
              <span style={{ position: "absolute", inset: 0, background: TEAL, transform: dirHovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 500ms cubic-bezier(.16,1,.3,1)" }} />
              <span style={{ position: "relative", zIndex: 1 }}>Browse Directory</span>
            </Link>
            <Link
              href="/amenities"
              onMouseEnter={() => setAllHovered(true)}
              onMouseLeave={() => setAllHovered(false)}
              className={`inline-flex items-center justify-center h-12 md:h-14 px-7 md:px-8 ${quicksand.className}`}
              style={{
                border: `1px solid ${RUST}`,
                color: allHovered ? WHITE : RUST,
                background: allHovered ? RUST : "transparent",
                textTransform: "uppercase", letterSpacing: "0.18em",
                fontSize: "0.75rem", fontWeight: 600,
                textDecoration: "none", transition: "all 300ms ease",
              }}
            >
              View All
            </Link>
          </div>
        </div>
      </div>

      {/* ── FULL-BLEED HORIZONTAL SCROLL STRIP ── */}
      <div
        className="relative"
        style={{ paddingBottom: "4rem" }}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${WHEAT}, transparent)` }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${WHEAT}, transparent)` }} />

        <div
          className="flex gap-5 overflow-x-auto px-6 md:px-12 lg:px-16 pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {amenities.map((a, i) => (
            <AmenityCard key={i} amenity={a} accent={CARD_ACCENTS[i]} />
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pb-10">
        <div className="h-px" style={{ background: `${CHARCOAL}22` }} />
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function DiscoverFateSection() {
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
    <section className={`${quicksand.className} relative`} style={{ backgroundColor: WHITE }}>
      {/* Top rainbow rule */}
      <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
        <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${TEAL} 0%, ${RUST} 50%, ${WHEAT} 100%)` }} />
        <div className="h-[42px] w-full opacity-40 blur-2xl" style={{ background: `linear-gradient(90deg, rgba(32,178,170,0.35) 0%, rgba(204,65,37,0.35) 50%, rgba(245,222,179,0.35) 100%)` }} />
      </div>

      <DiscoverBlock active={active} onEnter={handleEnter} onLeave={handleLeave} onToggle={handleToggle} />
      <AmenitiesSection />
      <SocialSection />
    </section>
  );
}