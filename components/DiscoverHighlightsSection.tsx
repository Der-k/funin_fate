"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Quicksand } from "next/font/google";
import { motion } from "framer-motion";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// ─── Palette ──────────────────────────────────────────────────────────────────
const TEAL     = "#20B2AA";
const RUST     = "#CC4125";
const CREAM    = "#F5DEB3";
const SLATE    = "#36454F";
const WHITE    = "#FFFFFF";

// ─── Data ─────────────────────────────────────────────────────────────────────
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
    label: "Free City Wi-Fi",
    tag: "Connectivity",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Fitness Centers",
    tag: "Wellness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Green Corridors",
    tag: "Outdoors",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Retail Districts",
    tag: "Shopping",
    image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Smart Parking",
    tag: "Transport",
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Social Lounges",
    tag: "Community",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "24/7 Security",
    tag: "Safety",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Aquatic Facilities",
    tag: "Recreation",
    image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=1200&auto=format&fit=crop",
  },
];

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

const socialLinks = [
  { icon: <XIcon />, href: "https://x.com/VisitFate", label: "X (Twitter)", handle: "@VisitFate" },
  { icon: <InstagramIcon />, href: "https://www.instagram.com/visitfate/", label: "Instagram", handle: "@visitfate" },
  { icon: <FacebookIcon />, href: "https://web.facebook.com/profile.php/?id=61589634350805&_rdc=1&_rdr", label: "Facebook", handle: "Fate City" },
];

// ─── Social Section ───────────────────────────────────────────────────────────
function SocialSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div style={{ background: SLATE, boxShadow: "0 8px 40px rgba(32,178,170,0.12), 0 2px 12px rgba(54,69,79,0.15)" }} className="relative overflow-hidden">
      <div
        className="absolute left-[-80px] bottom-[-80px] h-[200px] w-[200px] rounded-full blur-3xl pointer-events-none"
        style={{ background: `${TEAL}20` }}
      />
      <div
        className="absolute right-[-60px] top-[-60px] h-[180px] w-[180px] rounded-full blur-3xl pointer-events-none"
        style={{ background: `${CREAM}10` }}
      />

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
                Follow Fate On
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
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
                    padding: "9px 18px 9px 14px", borderRadius: "100px",
                    border: `1px solid ${hoveredIdx === i ? TEAL : "rgba(245,222,179,0.2)"}`,
                    background: hoveredIdx === i ? TEAL : "rgba(255,255,255,0.06)",
                    color: hoveredIdx === i ? WHITE : `rgba(245,222,179,0.7)`,
                    textDecoration: "none", transition: "all 220ms ease", whiteSpace: "nowrap",
                    backdropFilter: "blur(8px)",
                    boxShadow: hoveredIdx === i ? `0 4px 18px ${TEAL}50` : "none",
                  }}
                >
                  <span style={{ display: "flex", flexShrink: 0 }}>{link.icon}</span>
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
              ))}
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
        className="absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-400"
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
        <span
          className={quicksand.className}
          style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
        >
          {cat.number}
        </span>
        <span
          className={quicksand.className}
          style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.75)", textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
        >
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
          <span
            className={quicksand.className}
            style={{ color: TEAL, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}
          >
            {cat.tag}
          </span>
        </div>

        <h3
          className={quicksand.className}
          style={{ fontSize: "clamp(1.4rem, 2vw, 1.85rem)", fontWeight: 700, color: WHITE, lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: "8px", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
        >
          {cat.title}
        </h3>

        <p
          className={quicksand.className}
          style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", fontWeight: 400, lineHeight: 1.6, marginBottom: "16px", maxWidth: "28ch", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
        >
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
          <span
            className={quicksand.className}
            style={{ position: "relative", zIndex: 1, color: btnHovered ? WHITE : "#0D1B24", transition: "color 300ms ease" }}
          >
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
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="max-w-4xl mx-auto text-center px-6 py-12">
              <div className="flex items-center justify-center gap-3">
                <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: RUST }} />
             <p
  style={{
    fontFamily: "'Caveat', cursive",
    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
    fontWeight: 600,
    letterSpacing: "0.03em",
    color: "rgba(245,222,179,0.6)",
    textTransform: "none",
    margin: 0,
  }}
>
                  Discover the City
                </p>
                <span
                  className={quicksand.className}
                  style={{
                    color: "rgba(245,222,179,0.35)", fontWeight: 500,
                    fontSize: "0.72rem", letterSpacing: "0.12em",
                    opacity: animating ? 0 : 1, transition: "opacity 300ms ease",
                  }}
                >
                  {String(active + 1).padStart(2, "0")} — {String(categories.length).padStart(2, "0")}
                </span>
              </div>

              <h2
                className={`mt-4 text-3xl sm:text-4xl font-black uppercase leading-[0.95] md:text-5xl ${quicksand.className}`}
                style={{
                  color: CREAM,
                  opacity: animating ? 0 : 1,
                  transform: animating ? "translateY(14px)" : "translateY(0)",
                  transition: "opacity 420ms ease 50ms, transform 480ms cubic-bezier(.16,1,.3,1) 50ms",
                }}
              >
                {cat.title}
              </h2>

              <div
                className="mt-4 h-[3px] w-20 sm:w-24 rounded-full mx-auto"
                style={{ background: `linear-gradient(to right, ${WHITE}, ${RUST}, transparent)` }}
              />

              <p
                className={`mt-5 sm:mt-6 text-xl sm:text-2xl leading-relaxed ${quicksand.className}`}
                style={{
                  color: "rgba(245,222,179,0.65)",
                  opacity: animating ? 0 : 1,
                  transform: animating ? "translateY(8px)" : "translateY(0)",
                  transition: "opacity 380ms ease 100ms, transform 440ms cubic-bezier(.16,1,.3,1) 100ms",
                }}
              >
                {cat.description}
              </p>

              <div
                className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-5 mt-8"
                style={{ opacity: animating ? 0 : 1, transition: "opacity 380ms ease 120ms" }}
              >
                <Link
                  href={cat.href}
                  onMouseEnter={() => setExploreHovered(true)}
                  onMouseLeave={() => setExploreHovered(false)}
                  className={`group relative inline-flex items-center justify-center overflow-hidden h-12 md:h-14 px-7 md:px-8 ${quicksand.className}`}
                  style={{
                    background: CREAM, color: SLATE,
                    textTransform: "uppercase", letterSpacing: "0.18em",
                    fontSize: "0.75rem", fontWeight: 600, textDecoration: "none", gap: "8px",
                  }}
                >
                  <span style={{
                    position: "absolute", inset: 0, background: TEAL,
                    transform: exploreHovered ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 500ms cubic-bezier(.16,1,.3,1)",
                  }} />
                  <span style={{ position: "relative", zIndex: 1, color: exploreHovered ? WHITE : SLATE, transition: "color 300ms ease" }}>Explore More</span>
                </Link>

                <Link
                  href="/events"
                  onMouseEnter={() => setEventsHovered(true)}
                  onMouseLeave={() => setEventsHovered(false)}
                  className={`inline-flex items-center justify-center h-12 md:h-14 px-7 md:px-8 ${quicksand.className}`}
                  style={{
                    border: `1px solid ${CREAM}`,
                    color: eventsHovered ? SLATE : CREAM,
                    background: eventsHovered ? CREAM : "transparent",
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

// ─── Amenity Card ─────────────────────────────────────────────────────────────
function AmenityCard({ amenity }: { amenity: (typeof amenities)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ flexShrink: 0, width: "clamp(340px, 32vw, 480px)" }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image — taller at 620px, no tag pill */}
      <div style={{ position: "relative", width: "100%", height: "620px", overflow: "hidden", background: "#ddd", border: "1px solid rgba(54,69,79,0.08)" }}>
        <Image
          src={amenity.image}
          alt={amenity.label}
          fill
          className="object-cover"
          style={{
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 1400ms cubic-bezier(.16,1,.3,1)",
          }}
        />

        <div style={{
          position: "absolute", inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 60%)",
          transition: "background 500ms ease",
        }} />

        {/* Teal top-edge glow on hover */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "3px",
          background: `linear-gradient(to right, transparent, ${TEAL}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 400ms ease",
        }} />
      </div>

      {/* Label row */}
      <div style={{
        paddingTop: "10px", paddingBottom: "4px",
        borderBottom: `3px solid ${hovered ? RUST : TEAL}`,
        transition: "border-color 300ms ease",
      }}>
        <p
          className={quicksand.className}
          style={{ fontSize: "1rem", fontWeight: 800, color: SLATE, letterSpacing: "0.01em", lineHeight: 1.2, margin: 0 }}
        >
          {amenity.label}
        </p>
      </div>
    </div>
  );
}

// ─── Amenities Section ────────────────────────────────────────────────────────

function AmenitiesSection() {
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
    <div style={{ background: WHITE, paddingTop: "0", paddingBottom: "4rem", boxShadow: "0 8px 40px rgba(32,178,170,0.10), 0 2px 12px rgba(54,69,79,0.10)" }} className="relative overflow-hidden">
      <div
        className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full blur-3xl pointer-events-none"
        style={{ background: `${TEAL}12` }}
      />
      <div
        className="absolute bottom-[-160px] right-[-100px] h-[300px] w-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: `${CREAM}18` }}
      />

      {/* ── Caveat intro paragraph ── */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop: "3.5rem", paddingBottom: "2rem" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&display=swap');`}</style>
        <p style={{
  fontFamily: "'Caveat', cursive",
  fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)",
  fontWeight: 500,
  color: "#000000",
  lineHeight: 1.65,
  maxWidth: "780px",
  margin: "0 0 0 auto", // pushes it to the right
  textAlign: "left",
  letterSpacing: "0.01em",
}}>
          From free city-wide Wi-Fi and world-class fitness centers to lush green corridors and vibrant retail districts — Fate is designed for living well. Every corner of this city is built around the people who call it home, offering smart infrastructure, safe streets, social spaces, and recreational facilities that make everyday life feel anything but ordinary.
        </p>
      </div>

      {/* ── Carousel first ── */}
      <div style={{ position: "relative", marginTop: "0" }}>
        <div
          ref={scrollRef}
          style={{
            display: "flex", gap: "20px",
            overflowX: "auto", scrollbarWidth: "none",
            paddingTop: "40px",
          }}
        >
          {amenities.map((a) => (
            <AmenityCard key={a.label} amenity={a} />
          ))}
        </div>
      </div>

      {/* ── Stylish nav bar directly below images ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
        marginTop: "28px", paddingBottom: "4px",
      }}>
        {/* Decorative line */}
        <div style={{ flex: 1, maxWidth: "120px", height: "1px", background: `linear-gradient(to right, transparent, ${TEAL}60)` }} />

        {/* Left arrow pill */}
        <button
          onClick={() => scroll("left")}
          onMouseEnter={() => setLeftHovered(true)}
          onMouseLeave={() => setLeftHovered(false)}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 22px", borderRadius: "100px",
            background: leftHovered ? SLATE : "transparent",
            border: `1.5px solid ${leftHovered ? SLATE : "rgba(54,69,79,0.3)"}`,
            color: leftHovered ? WHITE : SLATE,
            cursor: "pointer", transition: "all 250ms ease",
            boxShadow: leftHovered ? "0 4px 16px rgba(54,69,79,0.18)" : "none",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className={quicksand.className} style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>Prev</span>
        </button>

        {/* Teal dot divider */}
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: TEAL, opacity: 0.6 }} />

        {/* Right arrow pill */}
        <button
          onClick={() => scroll("right")}
          onMouseEnter={() => setRightHovered(true)}
          onMouseLeave={() => setRightHovered(false)}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 22px", borderRadius: "100px",
            background: rightHovered ? TEAL : "transparent",
            border: `1.5px solid ${rightHovered ? TEAL : "rgba(54,69,79,0.3)"}`,
            color: rightHovered ? WHITE : SLATE,
            cursor: "pointer", transition: "all 250ms ease",
            boxShadow: rightHovered ? `0 4px 16px ${TEAL}40` : "none",
          }}
        >
          <span className={quicksand.className} style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>Next</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Decorative line */}
        <div style={{ flex: 1, maxWidth: "120px", height: "1px", background: `linear-gradient(to left, transparent, ${RUST}60)` }} />
      </div>

      {/* ── Heading + tabs below ── */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16" style={{ marginTop: "3.5rem" }}>
        <div className="mb-10 sm:mb-14 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: RUST }} />
            <p
              className={`text-sm sm:text-base uppercase tracking-[0.25em] sm:tracking-[0.35em] ${quicksand.className}`}
              style={{ color: "rgba(54,69,79,0.45)" }}
            >
              City Amenities
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginTop: "1rem" }}>
            <div>
              <h2
                className={`text-4xl sm:text-5xl font-black uppercase leading-[0.95] md:text-6xl ${quicksand.className}`}
                style={{ color: SLATE, margin: 0 }}
              >
                The Fate
                <br />
                Experience.
              </h2>

              <div
                className="mt-4 h-[3px] w-20 sm:w-24 rounded-full"
                style={{ background: `linear-gradient(to right, ${RUST}, ${TEAL}, transparent)` }}
              />

              <p
                className={`mt-5 sm:mt-6 text-lg sm:text-xl leading-relaxed ${quicksand.className}`}
                style={{ color: "rgba(54,69,79,0.65)" }}
              >
                What makes Fate, Fate? Discover the businesses and amenities that define life here.
              </p>
            </div>

            <Link
              href="/directory"
              onMouseEnter={() => setDirHovered(true)}
              onMouseLeave={() => setDirHovered(false)}
              className={`inline-flex items-center gap-2 h-12 md:h-14 px-7 md:px-8 ${quicksand.className}`}
              style={{
                flexShrink: 0, alignSelf: "center",
                border: `1px solid ${dirHovered ? RUST : SLATE}`,
                color: dirHovered ? RUST : SLATE,
                background: "transparent",
                textTransform: "uppercase", letterSpacing: "0.18em",
                fontSize: "0.73rem", fontWeight: 700,
                textDecoration: "none", transition: "all 250ms ease", whiteSpace: "nowrap",
              }}
            >
              Browse Directory <ArrowUpRight style={{ width: "13px", height: "13px" }} />
            </Link>

          
          </div>
          
        </div>
          <div
  style={{
    marginTop: "5rem",
    display: "grid",
    gridTemplateColumns: "1fr 1.45fr",
    minHeight: "470px",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
  }}
>
  {/* Left Panel */}
  <div
    style={{
      background: "#C95A28",
      color: "#fff",
      padding: "clamp(2rem,5vw,4rem)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Decorative Circle */}
    <div
      style={{
        position: "absolute",
        width: "340px",
        height: "340px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.05)",
        right: "-120px",
        bottom: "-120px",
      }}
    />

    <p
      className={quicksand.className}
      style={{
        fontSize: ".75rem",
        letterSpacing: ".25em",
        textTransform: "uppercase",
        opacity: .75,
        marginBottom: "1rem",
      }}
    >
      Featured Destination
    </p>

    <h2
      className={quicksand.className}
      style={{
        fontSize: "clamp(2.2rem,4vw,3.6rem)",
        fontWeight: 800,
        lineHeight: 1,
        marginBottom: "1.5rem",
      }}
    >
      Find
      <br />
      Businesses
      <br />
      Fate Has
      <br />
      To Offer
    </h2>

    <p
      className={quicksand.className}
      style={{
        fontSize: "1rem",
        lineHeight: 1.8,
        opacity: .9,
        maxWidth: "420px",
      }}
    >
      Discover local restaurants, boutique shopping,
      beautiful parks and vibrant community spaces that
      make Fate one of the most welcoming cities in Texas.
    </p>

    <Link
      href="/discover"
      className={quicksand.className}
      style={{
        marginTop: "2rem",
        display: "inline-flex",
        alignItems: "center",
        gap: ".6rem",
        color: "#fff",
        fontWeight: 700,
        letterSpacing: ".15em",
        textTransform: "uppercase",
        textDecoration: "none",
      }}
    >
      Explore Fate
      <ArrowUpRight size={18} />
    </Link>
  </div>

  {/* Right Image */}
  <div
    style={{
      position: "relative",
      minHeight: "470px",
    }}
  >
    <Image
      src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000&auto=format&fit=crop"
      alt="Explore Fate"
      fill
      className="object-cover"
    />
  </div>
</div>



        <div style={{ height: "1px", background: "rgba(54,69,79,0.12)", marginTop: "2.5rem" }} />
      </div>
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────
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
    <section className={`${quicksand.className} relative`} style={{ backgroundColor: WHITE, width: "100%", maxWidth: "100%", margin: 0, padding: 0 }}>
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