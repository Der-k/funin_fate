"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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



const GOLD = "#20B2AA";
const RUST = "#CC4125";
const WHEAT = "#F5DEB3";
const SLATE = "#36454F";
const CREAM = "#F5DEB3";

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
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onToggle}
      className="group relative flex items-end overflow-hidden cursor-pointer"
      style={{
        height: isActive ? "280px" : "120px",
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
            style={{
              padding: "0 18px",
              height: "44px",
              background: GOLD,
              opacity: isActive ? 1 : 0,
              transform: isActive
                ? "scale(1) rotate(0deg)"
                : "scale(0.7) rotate(-15deg)",
              transition:
                "opacity 350ms ease 80ms, transform 450ms cubic-bezier(.34,1.56,.64,1) 80ms, box-shadow 200ms ease, background 200ms ease",
              pointerEvents: isActive ? "auto" : "none",
              boxShadow: `0 0 0px 0px ${GOLD}00`,
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 18px 4px ${GOLD}66, 0 0 40px 8px ${GOLD}33`;
              e.currentTarget.style.background = "#1A9E97";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0px 0px ${GOLD}00`;
              e.currentTarget.style.background = GOLD;
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

// ─── Story of Fate ────────────────────────────────────────────────────────────

function StorySection() {
  return (
    <div
      className="relative max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16"
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
    >
    

      <div className="mt-12 h-px" style={{ background: "rgba(255,255,255,0.09)" }} />
    </div>
  );
}

// ─── Community Amenities ──────────────────────────────────────────────────────

function AmenitiesSection() {
  return (
    <div
      className="relative max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16"
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-px" style={{ background: GOLD }} />
        <span
          className={`${quicksand.className} text-sm uppercase tracking-[0.35em]`}
          style={{ color: `${GOLD}AA`, fontWeight: 700 }}
        >
          Business directories
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <h2
          className={`${quicksand.className} leading-[0.94]`}
          style={{
            fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
            color: CREAM,
            fontWeight: 700,
          }}
        >
          Everything you need,
          <br />
          <span style={{ color: "rgba(245,222,179,0.3)" }}>already here.</span>
        </h2>

        <p
          className={`${quicksand.className} lg:pb-2`}
          style={{
            fontSize: "0.95rem",
            color: "rgba(245,222,179,0.45)",
            fontWeight: 400,
            maxWidth: "34ch",
          }}
        >
          Fate was built with community at its core. Every amenity exists to
          make daily life extraordinary.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {amenities.map((a, i) => {
          const Icon = a.icon;
          return (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl"
              style={{ background: "#1B2A35", minHeight: "320px" }}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={a.image}
                  alt={a.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ transform: "scale(1.02)" }}
                />
              </div>

              {/* Dark vignette — stronger at bottom */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(6,12,18,0.85) 0%, rgba(6,12,18,0.3) 45%, transparent 70%)",
                }}
              />

              {/* Teal top accent line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
                }}
              />

              {/* Corner bracket top-left */}
              <div
                className="absolute top-4 left-4 w-5 h-5 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                style={{
                  borderTop: `1px solid ${GOLD}`,
                  borderLeft: `1px solid ${GOLD}`,
                }}
              />

              {/* Content pinned to bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
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
                  {a.label}
                </p>

                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    width: "36px",
                    height: "36px",
                    border: `1px solid ${GOLD}50`,
                    background: `${GOLD}20`,
                  }}
                >
                  <Icon style={{ width: "16px", height: "16px", color: GOLD }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 h-px" style={{ background: "rgba(255,255,255,0.09)" }} />
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function DiscoverFateSection() {
  const [active, setActive] = useState<number | null>(null);

  const handleToggle = (i: number) => {
    setActive((prev) => (prev === i ? null : i));
  };

  return (
    <section
      className={`${quicksand.className} relative overflow-hidden`}
      style={{ backgroundColor: "#1B2A35" }}
    >
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

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: active !== null
            ? `radial-gradient(ellipse at 75% 40%, ${GOLD}15 0%, transparent 55%)`
            : "none",
          transition: "background 800ms ease",
        }}
      />

      {/* ── STORY OF FATE ── */}
      <StorySection />

      {/* ── HERO ── */}
      <div
        className="relative max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16"
        style={{ paddingTop: "2rem", paddingBottom: "4rem" }}
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
            style={{ fontSize: "clamp(3.2rem, 8vw, 6rem)", color: CREAM, fontWeight: 700 }}
          >
            Everything <br />
            <span style={{ color: "rgba(245,222,179,0.35)" }}>that makes</span>
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

      {/* ── CATEGORY CARDS ── */}
      <div
        className="relative max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16"
        style={{ paddingBottom: "2rem" }}
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
              onEnter={() => setActive(i)}
              onLeave={() => setActive(null)}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </div>

      {/* ── COMMUNITY AMENITIES ── */}
      <AmenitiesSection />

      {/* ── CTA SECTION ── */}
      <div className="relative overflow-hidden" style={{ marginTop: "4rem" }}>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop"
            alt="City of Fate"
            fill
            className="object-cover"
            style={{ filter: "brightness(0.25)" }}
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, #1B2A35 0%, transparent 30%, transparent 70%, #1B2A35 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${GOLD}18 0%, transparent 50%)` }}
        />

        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${GOLD}40, transparent)` }}
        />

        <div
          className="relative max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-10"
          style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
        >
          {/* LEFT + REGISTER ROW */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
            {/* LEFT */}
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

            {/* RIGHT REGISTER CARD */}
            <div
              className="w-full lg:w-auto lg:min-w-[340px] flex-shrink-0 relative p-8 rounded-[28px]"
              style={{
                border: `1px solid ${GOLD}45`,
                background: "rgba(27,42,53,0.85)",
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
                  className="w-full bg-transparent text-sm outline-none rounded-full"
                  style={{
                    border: `1px solid rgba(32,178,170,0.3)`,
                    padding: "14px 18px",
                    color: CREAM,
                    fontSize: "0.94rem",
                  }}
                />
              </div>

              <Link
                href="/register"
                className="group w-full flex items-center justify-between px-5 py-4 text-sm rounded-full"
                style={{
                  background: GOLD,
                  color: "#0D1B24",
                  letterSpacing: "0.04em",
                  fontWeight: 700,
                  transition: "background 300ms ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1A9E97")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = GOLD)}
              >
                <span>Register for Free</span>
                <ArrowUpRight
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  style={{ width: "16px", height: "16px" }}
                />
              </Link>

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
    </section>
  );
}