"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = [
  {
    title: "Top Experiences",
    tag: "Must-Do",
    number: "01",
    description:
      "Immersive adventures and curated experiences shaping the identity of the city.",
    href: "/experiences",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Culture & Community",
    tag: "Local Life",
    number: "02",
    description:
      "Meet creators, innovators, and communities driving the cultural pulse of Fate.",
    href: "/community",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Weekend Energy",
    tag: "Events",
    number: "03",
    description: "Events, nightlife, and weekend discoveries across the city.",
    href: "/events",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Food & Drink",
    tag: "Dining",
    number: "04",
    description:
      "Hidden kitchens, rooftop bars, and the flavors that define Fate's palate.",
    href: "/dining",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Art & Design",
    tag: "Creative",
    number: "05",
    description:
      "Galleries, murals, studios, and the makers reshaping Fate's visual language.",
    href: "/art",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Outdoors & Nature",
    tag: "Escape",
    number: "06",
    description:
      "Parks, trails, and green spaces where the city breathes and slows down.",
    href: "/outdoors",
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1600&auto=format&fit=crop",
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

// ─── Palette ──────────────────────────────────────────────────────────────────
const GOLD     = "#20B2AA";
const RUST     = "#CC4125";
const CREAM    = "#F5DEB3";
const CHARCOAL = "#1E2328";
const WHITE    = "#FFFFFF";

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

// ─── Social Links Section ─────────────────────────────────────────────────────

const socialLinks = [
  {
    icon: <XIcon />,
    href: "https://x.com/VisitFate",
    label: "X (Twitter)",
    handle: "@VisitFate",
    desc: "News, updates & city buzz",
    index: "01",
  },
  {
    icon: <InstagramIcon />,
    href: "https://www.instagram.com/visitfate/",
    label: "Instagram",
    handle: "@visitfate",
    desc: "Visual stories from the city",
    index: "02",
  },
  {
    icon: <FacebookIcon />,
    href: "https://web.facebook.com/profile.php/?id=61589634350805&_rdc=1&_rdr",
    label: "Facebook",
    handle: "Fate City",
    desc: "Events, community & more",
    index: "03",
  },
];

function SocialLinkRow({ link, isLast }: { link: typeof socialLinks[0]; isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group flex items-center justify-between py-6 gap-6"
        style={{ textDecoration: "none", transition: "all 200ms ease" }}
      >
        {/* Left: number + icon + text */}
        <div className="flex items-center gap-6 min-w-0">
          <span
            className={`${quicksand.className} tabular-nums flex-shrink-0`}
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              color: hovered ? GOLD : "rgba(30,35,40,0.3)",
              transition: "color 250ms ease",
            }}
          >
            {link.index}
          </span>

          <div
            className="flex-shrink-0 flex items-center justify-center rounded-full"
            style={{
              width: "44px",
              height: "44px",
              border: `1px solid ${hovered ? GOLD : "rgba(30,35,40,0.15)"}`,
              background: hovered ? `${GOLD}12` : "transparent",
              color: hovered ? GOLD : "rgba(30,35,40,0.5)",
              transition: "all 300ms ease",
            }}
          >
            {link.icon}
          </div>

          <div className="min-w-0">
            <p
              className={`${quicksand.className}`}
              style={{
                fontSize: "1.15rem",
                fontWeight: 700,
                color: hovered ? CHARCOAL : "rgba(30,35,40,0.75)",
                transition: "color 250ms ease",
                letterSpacing: "-0.01em",
              }}
            >
              {link.label}
            </p>
            <p
              className={`${quicksand.className}`}
              style={{
                fontSize: "0.82rem",
                fontWeight: 400,
                color: "rgba(30,35,40,0.4)",
                marginTop: "1px",
              }}
            >
              {link.desc}
            </p>
          </div>
        </div>

        {/* Right: handle + arrow */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <span
            className={`${quicksand.className} hidden sm:block`}
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: hovered ? GOLD : "rgba(30,35,40,0.35)",
              letterSpacing: "0.04em",
              transition: "color 250ms ease",
            }}
          >
            {link.handle}
          </span>

          <div
            className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{
              width: "36px",
              height: "36px",
              background: hovered ? GOLD : "transparent",
              border: `1px solid ${hovered ? GOLD : "rgba(30,35,40,0.15)"}`,
              transition: "all 300ms ease",
            }}
          >
            <ArrowUpRight
              style={{
                width: "15px",
                height: "15px",
                color: hovered ? "#0D1B24" : "rgba(30,35,40,0.4)",
                transform: hovered ? "translate(1px, -1px)" : "none",
                transition: "all 250ms ease",
              }}
            />
          </div>
        </div>
      </a>

      {!isLast && (
        <div style={{ height: "1px", background: "rgba(30,35,40,0.08)" }} />
      )}
    </>
  );
}

function SocialSection() {
  return (
    <div style={{ background: WHITE }}>
      <div
        className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16"
        style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px" style={{ background: GOLD }} />
              <span
                className={`${quicksand.className} text-sm uppercase tracking-[0.35em]`}
                style={{ color: GOLD, fontWeight: 700 }}
              >
                Follow Along
              </span>
            </div>

            <h2
              className={`${quicksand.className} leading-[0.94]`}
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: CHARCOAL,
                fontWeight: 700,
              }}
            >
              Stay connected
              <br />
              <span style={{ color: "rgba(30,35,40,0.32)" }}>wherever you are.</span>
            </h2>
          </div>

          <p
            className={`${quicksand.className}`}
            style={{
              fontSize: "0.95rem",
              color: "rgba(30,35,40,0.5)",
              fontWeight: 400,
              maxWidth: "32ch",
              lineHeight: 1.7,
            }}
          >
            Join the Fate community across platforms — real-time updates, local stories, and everything in between.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(30,35,40,0.1)", marginBottom: "0" }} />

        {/* Link rows */}
        <div>
          {socialLinks.map((link, i) => (
            <SocialLinkRow key={link.label} link={link} isLast={i === socialLinks.length - 1} />
          ))}
        </div>

        {/* Bottom divider */}
        <div style={{ height: "1px", background: "rgba(30,35,40,0.1)", marginTop: "0" }} />
      </div>
    </div>
  );
}

// ─── Accordion Slice (one image strip in the right panel) ────────────────────

function AccordionSlice({
  cat,
  index,
  isActive,
  onEnter,
  onLeave,
  onToggle,
  isFirst,
  isLast,
}: {
  cat: (typeof categories)[0];
  index: number;
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
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        flex: isActive ? "5 1 0%" : "1 1 0%",
        transition: "flex 650ms cubic-bezier(.16,1,.3,1)",
        borderRadius: isFirst ? "20px 0 0 20px" : isLast ? "0 20px 20px 0" : "0",
        minWidth: 0,
      }}
    >
      {/* Photo */}
      <Image
        src={cat.image}
        alt={cat.title}
        fill
        className="object-cover"
        style={{
          transform: isActive ? "scale(1.04)" : "scale(1.12)",
          transition: "transform 700ms cubic-bezier(.16,1,.3,1)",
          objectPosition: "center",
        }}
      />

      {/* Base darkening */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: isActive
            ? "linear-gradient(to top, rgba(10,18,24,0.82) 0%, rgba(10,18,24,0.1) 45%, transparent 70%)"
            : "linear-gradient(to top, rgba(10,18,24,0.75) 0%, rgba(10,18,24,0.55) 60%, rgba(10,18,24,0.35) 100%)",
          transition: "background 500ms ease",
        }}
      />

      {/* Teal top-edge glow when active */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
          opacity: isActive ? 1 : 0,
          transition: "opacity 400ms ease",
        }}
      />

      {/* ── COLLAPSED STATE: rotated label ── */}
      <div
        style={{
          position: "absolute",
          bottom: "50%",
          left: "50%",
          transform: "translateX(-50%) translateY(50%) rotate(-90deg)",
          whiteSpace: "nowrap",
          opacity: isActive ? 0 : 1,
          transition: "opacity 300ms ease",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          className={quicksand.className}
          style={{
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(245,222,179,0.45)",
          }}
        >
          {cat.number}
        </span>
        <span
          className={quicksand.className}
          style={{
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: "rgba(245,222,179,0.6)",
          }}
        >
          {cat.title}
        </span>
      </div>

      {/* ── ACTIVE STATE: full content ── */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 22px 22px",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 400ms ease 150ms, transform 450ms cubic-bezier(.16,1,.3,1) 150ms",
          pointerEvents: isActive ? "auto" : "none",
        }}
      >
        {/* Tag pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: `${GOLD}22`,
            border: `1px solid ${GOLD}50`,
            borderRadius: "100px",
            padding: "4px 12px",
            marginBottom: "10px",
          }}
        >
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: GOLD, display: "inline-block", flexShrink: 0 }} />
          <span
            className={quicksand.className}
            style={{ color: GOLD, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}
          >
            {cat.tag}
          </span>
        </div>

        {/* Title */}
        <h3
          className={quicksand.className}
          style={{
            fontSize: "clamp(1.4rem, 2vw, 1.85rem)",
            fontWeight: 700,
            color: CREAM,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            marginBottom: "8px",
            textShadow: "0 2px 16px rgba(0,0,0,0.5)",
          }}
        >
          {cat.title}
        </h3>

        {/* Description */}
        <p
          className={quicksand.className}
          style={{
            fontSize: "0.82rem",
            color: "rgba(245,222,179,0.6)",
            fontWeight: 400,
            lineHeight: 1.6,
            marginBottom: "16px",
            maxWidth: "28ch",
          }}
        >
          {cat.description}
        </p>

        {/* CTA */}
        <Link
          href={cat.href}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "0 18px",
            height: "40px",
            borderRadius: "100px",
            background: btnHovered ? "#1A9E97" : GOLD,
            color: "#0D1B24",
            fontWeight: 700,
            fontSize: "0.73rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "background 220ms ease, box-shadow 220ms ease",
            boxShadow: btnHovered ? `0 0 24px ${GOLD}55` : "none",
            whiteSpace: "nowrap",
          }}
        >
          <span className={quicksand.className}>Explore</span>
          <ArrowUpRight style={{ width: "13px", height: "13px", flexShrink: 0 }} />
        </Link>
      </div>

      {/* Corner bracket active indicator */}
      <div
        style={{
          position: "absolute", top: "14px", right: "14px",
          width: "16px", height: "16px",
          borderTop: `1.5px solid ${GOLD}`,
          borderRight: `1.5px solid ${GOLD}`,
          opacity: isActive ? 0.7 : 0,
          transition: "opacity 350ms ease 100ms",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ─── Discover Block (Split-Screen Editorial) ──────────────────────────────────

function DiscoverBlock({
  active,
  onEnter,
  onLeave,
  onToggle,
}: {
  active: number;
  onEnter: (i: number) => void;
  onLeave: () => void;
  onToggle: (i: number) => void;
}) {
  const cat = categories[active];
  const [animating, setAnimating] = useState(false);
  const [prevActive, setPrevActive] = useState(active);
  const [discoverHovered, setDiscoverHovered] = useState(false);

  useEffect(() => {
    if (active !== prevActive) {
      setAnimating(true);
      const t = setTimeout(() => {
        setPrevActive(active);
        setAnimating(false);
      }, 420);
      return () => clearTimeout(t);
    }
  }, [active, prevActive]);

  return (
    <div
      style={{
        background: CHARCOAL,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.035,
          mixBlendMode: "overlay",
        }}
      />

      {/* Teal glow blob */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GOLD}22 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          transition: "all 1000ms cubic-bezier(.16,1,.3,1)",
          filter: "blur(40px)",
        }}
      />

      {/* Section label bar */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop: "6rem", paddingBottom: "2rem" }}>
        <div className="flex items-center gap-3">
          <div style={{ width: "28px", height: "1px", background: GOLD }} />
          <span
            className={quicksand.className}
            style={{ color: `${GOLD}BB`, fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.38em", textTransform: "uppercase" }}
          >
            Discover the City
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          <span
            className={quicksand.className}
            style={{ color: "rgba(245,222,179,0.2)", fontWeight: 500, fontSize: "0.72rem", letterSpacing: "0.12em" }}
          >
            {String(active + 1).padStart(2, "0")} — {String(categories.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ── TITLE BLOCK — centered, animates on change ── */}
      <div
        className="relative z-20"
        style={{
          textAlign: "center",
          padding: "0 clamp(1.5rem, 4vw, 4rem)",
          paddingBottom: "2.5rem",
        }}
      >
        {/* Tag pill + number */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "1.2rem",
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(6px)" : "translateY(0)",
            transition: "opacity 350ms ease, transform 350ms ease",
          }}
        >
          <span
            className={quicksand.className}
            style={{
              color: "rgba(245,222,179,0.25)",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
            }}
          >
            {cat.number}
          </span>
          <span
            style={{
              width: "3px", height: "3px", borderRadius: "50%",
              background: `${GOLD}60`, display: "inline-block",
            }}
          />
          <span
            className={quicksand.className}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: `${GOLD}18`,
              border: `1px solid ${GOLD}45`,
              borderRadius: "100px",
              padding: "4px 14px",
              fontSize: "0.68rem",
              fontWeight: 700,
              color: GOLD,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: GOLD, display: "inline-block" }} />
            {cat.tag}
          </span>
        </div>

        {/* Giant animated title */}
        <h2
          className={quicksand.className}
          style={{
            fontSize: "clamp(3.2rem, 6.5vw, 6rem)",
            fontWeight: 700,
            lineHeight: 0.88,
            letterSpacing: "-0.025em",
            marginBottom: "1.2rem",
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(14px)" : "translateY(0)",
            transition: "opacity 420ms ease 50ms, transform 480ms cubic-bezier(.16,1,.3,1) 50ms",
          }}
        >
          {cat.title.split(" ").map((word, wi, arr) => (
            <span
              key={wi}
              style={{
                display: "inline",
                marginRight: wi < arr.length - 1 ? "0.25em" : 0,
                color: wi === arr.length - 1 ? "transparent" : CREAM,
                WebkitTextStroke: wi === arr.length - 1 ? `1.5px ${CREAM}` : "none",
              }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Description + CTA row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(8px)" : "translateY(0)",
            transition: "opacity 380ms ease 100ms, transform 440ms cubic-bezier(.16,1,.3,1) 100ms",
          }}
        >
          <p
            className={quicksand.className}
            style={{
              fontSize: "0.95rem",
              color: "rgba(245,222,179,0.48)",
              fontWeight: 400,
              lineHeight: 1.65,
              maxWidth: "48ch",
            }}
          >
            {cat.description}
          </p>

          <Link
            href={cat.href}
            onMouseEnter={() => setDiscoverHovered(true)}
            onMouseLeave={() => setDiscoverHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
              padding: "0 24px",
              height: "48px",
              borderRadius: "100px",
              background: discoverHovered ? "#1A9E97" : GOLD,
              color: "#0D1B24",
              fontWeight: 700,
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 220ms ease, box-shadow 220ms ease, transform 200ms ease",
              boxShadow: discoverHovered ? `0 0 28px ${GOLD}55` : "none",
              transform: discoverHovered ? "translateY(-1px)" : "none",
              whiteSpace: "nowrap",
            }}
          >
            <span className={quicksand.className}>Explore Now</span>
            <ArrowUpRight style={{ width: "15px", height: "15px" }} />
          </Link>
        </div>
      </div>

      {/* Full-width accordion */}
      <div
        className="relative z-20"
        style={{ padding: "0 clamp(1.5rem, 4vw, 4rem)", paddingBottom: "5rem" }}
      >
        <div
          style={{
            width: "100%",
            height: "clamp(480px, 68vh, 780px)",
            display: "flex",
            gap: "4px",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          {categories.map((c, i) => (
            <AccordionSlice
              key={c.title}
              cat={c}
              index={i}
              isActive={i === active}
              onEnter={() => onEnter(i)}
              onLeave={onLeave}
              onToggle={() => onToggle(i)}
              isFirst={i === 0}
              isLast={i === categories.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Register Button ──────────────────────────────────────────────────────────

function RegisterButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full flex items-center justify-between px-5 py-4 text-sm rounded-full cursor-pointer"
      style={{
        background: hovered ? "#1A9E97" : GOLD,
        color: "#0D1B24",
        letterSpacing: "0.04em",
        fontWeight: 700,
        border: "none",
        transition: "background 300ms ease",
      }}
    >
      <span>Register for Free</span>
      <ArrowUpRight
        style={{
          width: "16px",
          height: "16px",
          transform: hovered ? "translate(1px, -1px)" : "translate(0, 0)",
          transition: "transform 200ms ease",
        }}
      />
    </button>
  );
}

// ─── Amenity Card ─────────────────────────────────────────────────────────────

function AmenityCard({ amenity }: { amenity: (typeof amenities)[0] }) {
  const [hovered, setHovered] = useState(false);
  const Icon = amenity.icon;

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{ background: CHARCOAL, aspectRatio: "3/4" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0">
        <Image
          src={amenity.image}
          alt={amenity.label}
          fill
          className="object-cover"
          style={{
            transform: hovered ? "scale(1.07)" : "scale(1.02)",
            transition: "transform 700ms cubic-bezier(.16,1,.3,1)",
          }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(6,12,18,0.92) 0%, rgba(6,12,18,0.45) 55%, transparent 75%)"
            : "linear-gradient(to top, rgba(6,12,18,0.85) 0%, rgba(6,12,18,0.3) 45%, transparent 70%)",
          transition: "background 400ms ease",
        }}
      />

      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
      />

      <div
        className="absolute top-4 left-4 w-5 h-5"
        style={{
          borderTop: `1px solid ${GOLD}`,
          borderLeft: `1px solid ${GOLD}`,
          opacity: hovered ? 0.7 : 0,
          transition: "opacity 300ms ease",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p
          className={`${quicksand.className} leading-snug mb-2`}
          style={{
            fontSize: "0.78rem",
            color: "rgba(245,222,179,0.65)",
            fontWeight: 400,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(5px)",
            transition: "opacity 300ms ease 60ms, transform 350ms cubic-bezier(.16,1,.3,1) 60ms",
          }}
        >
          {amenity.desc}
        </p>

        <div className="flex items-end justify-between">
          <p
            className={`${quicksand.className}`}
            style={{
              fontSize: "1rem",
              color: CREAM,
              fontWeight: 700,
              letterSpacing: "0.01em",
              textShadow: "0 1px 8px rgba(0,0,0,0.8)",
            }}
          >
            {amenity.label}
          </p>

          <div
            className="flex-shrink-0 flex items-center justify-center rounded-xl"
            style={{
              width: "36px",
              height: "36px",
              border: `1px solid ${GOLD}50`,
              background: `${GOLD}20`,
              opacity: hovered ? 1 : 0.8,
              transition: "opacity 300ms ease",
            }}
          >
            <Icon style={{ width: "16px", height: "16px", color: GOLD }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Community Amenities — WHITE background ───────────────────────────────────

function AmenitiesSection() {
  return (
    <div className="relative" style={{ background: WHITE }}>
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px" style={{ background: GOLD }} />
          <span
            className={`${quicksand.className} text-sm uppercase tracking-[0.35em]`}
            style={{ color: GOLD, fontWeight: 700 }}
          >
            Business directories
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <h2
            className={`${quicksand.className} leading-[0.94]`}
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              color: CHARCOAL,
              fontWeight: 700,
            }}
          >
            Everything you need,
            <br />
            <span style={{ color: "rgba(30,35,40,0.38)" }}>already here.</span>
          </h2>

          <p
            className={`${quicksand.className} lg:pb-2`}
            style={{
              fontSize: "0.95rem",
              color: "rgba(30,35,40,0.5)",
              fontWeight: 400,
              maxWidth: "34ch",
            }}
          >
            Fate was built with community at its core. Every amenity exists to
            make daily life extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {amenities.map((a, i) => (
            <AmenityCard key={i} amenity={a} />
          ))}
        </div>

        <div className="mt-12 h-px" style={{ background: "rgba(30,35,40,0.1)" }} />
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function DiscoverFateSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [clickedCard, setClickedCard] = useState<number | null>(null);
  const [autoCard, setAutoCard] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const active = clickedCard !== null ? clickedCard : hoveredCard !== null ? hoveredCard : autoCard;

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setAutoCard((prev) => (prev + 1) % categories.length);
    }, 2800);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleEnter = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setHoveredCard(i);
  };

  const handleLeave = () => {
    setHoveredCard(null);
    if (clickedCard === null) startInterval();
  };

  const handleToggle = (i: number) => {
    setClickedCard((prev) => {
      if (prev === i) {
        startInterval();
        return null;
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
      return i;
    });
  };

  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    const params = email.trim()
      ? `?email=${encodeURIComponent(email.trim())}`
      : "";
    router.push(`/register${params}`);
  };

  return (
  <section
  className={`${quicksand.className} relative`}
  style={{ backgroundColor: WHITE }}
>
      {/* ── TOP RAINBOW RULE ── */}
      <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
        <div
          className="h-[2px] w-full"
          style={{
            background: "linear-gradient(90deg, #20B2AA 0%, #CC4125 50%, #F5DEB3 100%)",
          }}
        />
        <div
          className="h-[42px] w-full opacity-40 blur-2xl"
          style={{
            background: "linear-gradient(90deg, rgba(32,178,170,0.35) 0%, rgba(204,65,37,0.35) 50%, rgba(245,222,179,0.35) 100%)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════
          BLOCK 1 — CHARCOAL: Discover Split-Screen
      ══════════════════════════════════════════════════ */}
      <DiscoverBlock
        active={active}
        onEnter={handleEnter}
        onLeave={handleLeave}
        onToggle={handleToggle}
      />

      {/* ══════════════════════════════════════════════════
          BLOCK 2 — WHITE: Amenities
      ══════════════════════════════════════════════════ */}
      <AmenitiesSection />

      {/* ══════════════════════════════════════════════════
          BLOCK 3 — WHITE: Social Links
      ══════════════════════════════════════════════════ */}
      <SocialSection />

      {/* ══════════════════════════════════════════════════
          BLOCK 4 — CHARCOAL: CTA
      ══════════════════════════════════════════════════ */}
      <div style={{ background: CHARCOAL }}>
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${GOLD}50, ${RUST}50, transparent)`,
          }}
        />

        <div className="relative overflow-hidden" style={{ marginTop: "0" }}>
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop"
              alt="City of Fate"
              fill
              className="object-cover"
              style={{ filter: "brightness(0.18)" }}
            />
          </div>

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${CHARCOAL} 0%, transparent 20%, transparent 80%, ${CHARCOAL} 100%)`,
            }}
          />

          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${GOLD}12 0%, transparent 50%)` }}
          />

          <div
            className="relative max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-10"
            style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-px" style={{ background: GOLD }} />
                  <span
                    className="text-sm uppercase tracking-[0.35em]"
                    style={{ color: `${GOLD}AA`, fontWeight: 700 }}
                  >
                    Plan Your Visit
                  </span>
                </div>

                <h2
                  className="leading-[0.92]"
                  style={{ fontSize: "clamp(2.6rem, 6vw, 4.8rem)", color: CREAM, fontWeight: 700 }}
                >
                  Come experience <br />
                  <span style={{ color: RUST }}>Fate for yourself.</span>
                </h2>

                <p
                  className="leading-relaxed mt-6"
                  style={{ fontSize: "1rem", color: "rgba(245,222,179,0.5)", maxWidth: "36ch", fontWeight: 400 }}
                >
                  Register now to get early access to events, curated itineraries,
                  and exclusive experiences available only in Fate.
                </p>
              </div>

              <div
                className="w-full lg:w-auto lg:min-w-[340px] flex-shrink-0 relative p-8 rounded-[28px]"
                style={{
                  border: `1px solid ${GOLD}45`,
                  background: "rgba(20,26,30,0.85)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <p
                  className="text-xs uppercase tracking-[0.25em] mb-2"
                  style={{ color: `${GOLD}90`, fontWeight: 700 }}
                >
                  Free Registration
                </p>

                <h3
                  className="leading-tight mb-1"
                  style={{ fontSize: "1.6rem", color: CREAM, fontWeight: 700 }}
                >
                  Join Fate
                </h3>

                <p
                  className="text-sm mb-7"
                  style={{ color: "rgba(245,222,179,0.45)", fontWeight: 400 }}
                >
                  Get early access. No spam, ever.
                </p>

                <div className="relative mb-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                    className="w-full bg-transparent text-sm outline-none rounded-full"
                    style={{
                      border: `1px solid rgba(32,178,170,0.3)`,
                      padding: "14px 18px",
                      color: CREAM,
                      fontSize: "0.94rem",
                    }}
                  />
                </div>

                <RegisterButton onClick={handleRegister} />

                <p
                  className="text-xs mt-4 text-center"
                  style={{ color: "rgba(245,222,179,0.25)", fontWeight: 400 }}
                >
                  By registering you agree to our Terms & Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="h-px"
          style={{
            background: "linear-gradient(90deg, transparent, #20B2AA40, #CC412540, transparent)",
          }}
        />
      </div>
    </section>
  );
}