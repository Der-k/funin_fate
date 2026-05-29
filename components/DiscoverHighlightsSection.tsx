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
// DARK sections  → CHARCOAL = #1E2328   (hero, category cards, CTA)
// LIGHT sections → WHITE    = #FFFFFF   (amenities, social feed)
// Accent teal stays, rust stays, cream used only on dark backgrounds

const GOLD    = "#20B2AA"; // teal accent
const RUST    = "#CC4125";
const CREAM   = "#F5DEB3"; // text on dark
const CHARCOAL = "#1E2328";
const WHITE   = "#FFFFFF";

// ─── Image Card Row ──────────────────────────────────────────────────────────

function CategoryCard({
  cat,
  isActive,
  onEnter,
  onLeave,
  onToggle,
}: {
  cat: (typeof categories)[0];
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
}) {
  const [discoverHovered, setDiscoverHovered] = useState(false);

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onToggle}
      className="group relative flex items-end overflow-hidden cursor-pointer"
      style={{
        height: isActive ? "480px" : "90px",
        transition: "height 600ms cubic-bezier(.16,1,.3,1)",
        flexShrink: 0,
      }}
    >
      <div className="absolute inset-0">
        <Image
          src={cat.image}
          alt={cat.title}
          fill
          className="object-cover"
          style={{
            transform: isActive ? "scale(1.04)" : "scale(1.08)",
            filter: "brightness(1)",
            transition: "transform 700ms cubic-bezier(.16,1,.3,1)",
          }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(18,32,42,0.88) 0%, rgba(18,32,42,0.15) 40%, transparent 70%)",
        }}
      />

      <div
        className="absolute top-4 left-4 w-6 h-6 pointer-events-none"
        style={{
          borderTop: `1px solid ${GOLD}`,
          borderLeft: `1px solid ${GOLD}`,
          opacity: isActive ? 0.7 : 0,
          transition: "opacity 400ms ease 100ms",
        }}
      />

      <div className="relative w-full px-7 pb-6 pt-4">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`${quicksand.className} text-sm tabular-nums`}
                style={{
                  color: isActive ? GOLD : "rgba(255,255,255,0.6)",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textShadow: "0 1px 8px rgba(0,0,0,0.8)",
                  transition: "color 300ms ease",
                }}
              >
                {cat.number}
              </span>

              <span
                className={`${quicksand.className} text-xs uppercase tracking-[0.2em]`}
                style={{
                  color: GOLD,
                  fontWeight: 700,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateX(0)" : "translateX(-6px)",
                  transition:
                    "opacity 350ms ease 80ms, transform 400ms cubic-bezier(.16,1,.3,1) 80ms",
                }}
              >
                {cat.tag}
              </span>
            </div>

            <h3
              className={`${quicksand.className} leading-tight`}
              style={{
                fontSize: isActive
                  ? "clamp(1.7rem, 2.6vw, 2.2rem)"
                  : "clamp(1.35rem, 2vw, 1.8rem)",
                color: CREAM,
                fontWeight: 700,
                textShadow: isActive
                  ? "0 2px 24px rgba(0,0,0,0.5)"
                  : "0 1px 12px rgba(10,20,28,0.95), 0 2px 4px rgba(10,20,28,0.9)",
                transition:
                  "font-size 500ms cubic-bezier(.16,1,.3,1), text-shadow 400ms ease",
              }}
            >
              {cat.title}
            </h3>

            <p
              className={`${quicksand.className} leading-relaxed mt-2`}
              style={{
                fontSize: "0.92rem",
                fontWeight: 400,
                color: "rgba(245,222,179,0.72)",
                maxHeight: isActive ? "4rem" : "0",
                opacity: isActive ? 1 : 0,
                overflow: "hidden",
                transition:
                  "max-height 500ms cubic-bezier(.16,1,.3,1), opacity 400ms ease 120ms",
              }}
            >
              {cat.description}
            </p>
          </div>

          <Link
            href={cat.href}
            onClick={(e) => e.stopPropagation()}
            className="flex-shrink-0 flex items-center justify-center gap-2 rounded-full"
            onMouseEnter={() => setDiscoverHovered(true)}
            onMouseLeave={() => setDiscoverHovered(false)}
            style={{
              padding: "0 18px",
              height: "44px",
              background: discoverHovered ? "#1A9E97" : GOLD,
              opacity: isActive ? 1 : 0,
              transform: isActive
                ? "scale(1) rotate(0deg)"
                : "scale(0.7) rotate(-15deg)",
              transition:
                "opacity 350ms ease 80ms, transform 450ms cubic-bezier(.34,1.56,.64,1) 80ms, box-shadow 200ms ease, background 200ms ease",
              pointerEvents: isActive ? "auto" : "none",
              boxShadow: discoverHovered
                ? `0 0 18px 4px ${GOLD}66, 0 0 40px 8px ${GOLD}33`
                : `0 0 0px 0px ${GOLD}00`,
              whiteSpace: "nowrap",
            }}
          >
            <span
              className={quicksand.className}
              style={{
                color: "#0D1B24",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Discover
            </span>

            <ArrowUpRight
              style={{
                color: "#0D1B24",
                width: "15px",
                height: "15px",
                flexShrink: 0,
              }}
            />
          </Link>
        </div>
      </div>

      <div
        className="absolute right-0 top-0 bottom-0"
        style={{
          width: "2px",
          background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`,
          opacity: isActive ? 0.6 : 0,
          transition: "opacity 400ms ease",
        }}
      />
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
// On the WHITE amenities section the cards keep their dark photo treatment

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
    <div
      className="relative"
      style={{ background: WHITE }}
    >
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

// ─── Social Feed — WHITE background ──────────────────────────────────────────

const socialTiles = [
  {
    user: "@fate.official",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
  },
  {
    user: "@fatedining",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop",
  },
  {
    user: "@fate.events",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop",
  },
  {
    user: "@fatearts",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=600&auto=format&fit=crop",
  },
  {
    user: "@fate.outdoors",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=600&auto=format&fit=crop",
  },
  {
    user: "@fatecommunity",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600&auto=format&fit=crop",
  },
  {
    user: "@fateculture",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=600&auto=format&fit=crop",
  },
  {
    user: "@fate.nights",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
  },
];

function IGIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="2.2"/>
      <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2.2"/>
      <circle cx="17.5" cy="6.5" r="1.1" fill="white"/>
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="rgba(255,255,255,0.25)"/>
      <polygon points="10,8 18,12 10,16" fill="white"/>
    </svg>
  );
}

function SocialTile({ tile, index }: { tile: typeof socialTiles[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex-shrink-0 overflow-hidden rounded-xl block"
      style={{
        width: "200px",
        height: "340px",
        cursor: "pointer",
        textDecoration: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={tile.image}
        alt={tile.user}
        fill
        className="object-cover"
        style={{
          transform: hovered ? "scale(1.07)" : "scale(1.0)",
          transition: "transform 600ms cubic-bezier(.16,1,.3,1)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.35) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.25) 100%)",
          transition: "background 400ms ease",
        }}
      />

      <div className="absolute top-3 left-3 flex items-center gap-1.5">
        <IGIcon />
        <span
          style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "0.7rem",
            fontWeight: 600,
            fontFamily: "inherit",
            letterSpacing: "0.02em",
            textShadow: "0 1px 4px rgba(0,0,0,0.6)",
          }}
        >
          {tile.user}
        </span>
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
      >
        <PlayIcon />
      </div>

      <div
        className="absolute bottom-3 left-0 right-0 flex justify-center"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(4px)",
          transition: "opacity 300ms ease 60ms, transform 350ms cubic-bezier(.16,1,.3,1) 60ms",
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            color: "white",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textShadow: "0 1px 6px rgba(0,0,0,0.8)",
          }}
        >
          View Post
        </span>
      </div>
    </a>
  );
}

function SocialSection() {
  return (
    <div style={{ background: WHITE, overflow: "hidden" }}>
      <div
        className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16"
        style={{ paddingTop: "5rem", paddingBottom: "2.5rem" }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2
              className={`${quicksand.className} text-center md:text-left`}
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
                color: CHARCOAL,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              It's all here.{" "}
              <span style={{ color: "rgba(30,35,40,0.4)", fontWeight: 400 }}>See for yourself.</span>
            </h2>
            <div
              className="mx-auto md:mx-0 mt-2"
              style={{ width: "48px", height: "3px", background: GOLD, borderRadius: "2px" }}
            />
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${quicksand.className} flex items-center gap-2 text-sm`}
            style={{
              color: GOLD,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke={GOLD} strokeWidth="2.2"/>
              <circle cx="12" cy="12" r="4" stroke={GOLD} strokeWidth="2.2"/>
              <circle cx="17.5" cy="6.5" r="1.1" fill={GOLD}/>
            </svg>
            Follow @fatecity
          </a>
        </div>
      </div>

      <div className="w-full" style={{ paddingBottom: "5rem" }}>
        <div
          className="flex gap-3 overflow-x-auto social-scroll"
          style={{
            paddingLeft: "clamp(1.5rem, 6vw, 8rem)",
            paddingRight: "clamp(1.5rem, 6vw, 8rem)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties}
        >
          <style>{`.social-scroll::-webkit-scrollbar { display: none; }`}</style>
          {socialTiles.map((tile, i) => (
            <SocialTile key={i} tile={tile} index={i} />
          ))}
        </div>
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
    // Outer wrapper: WHITE — the "default" background for the whole section
    <section
      className={`${quicksand.className} relative overflow-hidden`}
      style={{ backgroundColor: WHITE }}
    >
      {/* ── TOP RAINBOW RULE — stays on the charcoal hero block ── */}
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
          BLOCK 1 — CHARCOAL: Hero + Category Cards
      ══════════════════════════════════════════════════ */}
      <div style={{ background: CHARCOAL }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: active !== null
              ? `radial-gradient(ellipse at 75% 40%, ${GOLD}15 0%, transparent 55%)`
              : "none",
            transition: "background 800ms ease",
          }}
        />

        {/* Hero */}
        <div
          className="relative max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16"
          style={{ paddingTop: "7rem", paddingBottom: "4rem" }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: GOLD }} />
            <span
              className="text-sm uppercase tracking-[0.35em]"
              style={{ color: `${GOLD}AA`, fontWeight: 700 }}
            >
              Discover the City
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2
              className="leading-[0.92]"
              style={{ fontSize: "clamp(3.2rem, 8vw, 5rem)", color: CREAM, fontWeight: 700 }}
            >
              Everything <br />
              <span style={{ color: "rgba(245,222,179,0.5)" }}>that makes</span>
              <br /> Fate.
            </h2>

            <p
              className="leading-relaxed max-w-xs lg:max-w-sm lg:pb-3"
              style={{ fontSize: "1rem", color: "rgba(245,222,179,0.55)", fontWeight: 400 }}
            >
              From immersive rooftop lounges to weekend street-culture events —
              the restaurants, galleries, parks, and communities that power this city.
            </p>
          </div>

          <div className="h-px mt-10" style={{ background: "rgba(255,255,255,0.1)" }} />
        </div>

        {/* Category Cards */}
        <div
          className="relative max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16"
          style={{ paddingBottom: "3rem" }}
        >
          <div
            className="flex flex-col"
            style={{ gap: "2px", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {categories.map((cat, i) => (
              <CategoryCard
                key={cat.title}
                cat={cat}
                isActive={i === active}
                onEnter={() => handleEnter(i)}
                onLeave={handleLeave}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mt-5">
            {categories.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (intervalRef.current) clearInterval(intervalRef.current);
                  setClickedCard(i);
                }}
                style={{
                  width: i === active ? "28px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: i === active ? GOLD : "rgba(245,222,179,0.2)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 400ms cubic-bezier(.16,1,.3,1), background 300ms ease",
                }}
              />
            ))}
            <span
              className={`${quicksand.className} ml-2 text-xs`}
              style={{ color: "rgba(245,222,179,0.3)", fontWeight: 500, letterSpacing: "0.1em" }}
            >
              {String(active + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          BLOCK 2 — WHITE: Amenities
      ══════════════════════════════════════════════════ */}
      <AmenitiesSection />

      {/* ══════════════════════════════════════════════════
          BLOCK 3 — WHITE: Social Feed
      ══════════════════════════════════════════════════ */}
      <SocialSection />

      {/* ══════════════════════════════════════════════════
          BLOCK 4 — CHARCOAL: CTA
      ══════════════════════════════════════════════════ */}
      <div style={{ background: CHARCOAL }}>
        {/* Thin divider between white and charcoal */}
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

        {/* Bottom rule */}
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