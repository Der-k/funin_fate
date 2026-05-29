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

// ─── Social SVG Icons ─────────────────────────────────────────────────────────

function InstagramIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
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

const socialLinks = [
  {
    label: "Instagram",
    handle: "@discoverfate",
    followers: "128K",
    Icon: InstagramIcon,
    href: "https://instagram.com",
    color: "#E1306C",
  },
  {
    label: "Twitter / X",
    handle: "@fateofficial",
    followers: "64K",
    Icon: XIcon,
    href: "https://twitter.com",
    color: "#e7e9ea",
  },
  {
    label: "YouTube",
    handle: "Fate City Guide",
    followers: "42K",
    Icon: YoutubeIcon,
    href: "https://youtube.com",
    color: "#FF0000",
  },
  {
    label: "Facebook",
    handle: "Fate Community",
    followers: "91K",
    Icon: FacebookIcon,
    href: "https://facebook.com",
    color: "#1877F2",
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

const storyMilestones = [
  { year: "2018", event: "Fate breaks ground as a bold urban vision" },
  { year: "2020", event: "First 10,000 residents call Fate home" },
  { year: "2022", event: "Cultural district and arts quarter open" },
  { year: "2024", event: "Named #1 emerging city destination" },
  { year: "Now", event: "A living, breathing city of 200,000+" },
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
      {/* Section label */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-6 h-px" style={{ background: GOLD }} />
        <span
          className={`${quicksand.className} text-sm uppercase tracking-[0.35em]`}
          style={{ color: `${GOLD}AA`, fontWeight: 700 }}
        >
          Our Story
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left — editorial text block */}
        <div className="lg:w-[45%] flex-shrink-0">
          <h2
            className={`${quicksand.className} leading-[0.95]`}
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
              color: CREAM,
              fontWeight: 700,
              marginBottom: "1.5rem",
            }}
          >
            Welcome to{" "}
            <span style={{ color: RUST }}>Fate</span>
           
          </h2>

          <p
            className={`${quicksand.className} leading-relaxed`}
            style={{
              fontSize: "0.82rem",
              color: "rgba(245,222,179,0.4)",
              fontWeight: 400,
              maxWidth: "36ch",
            }}
          >
            A city conceived from scratch — designed around people first, built for those bold enough to call it home.
          </p>

          <Link
            href="/story"
            className={`${quicksand.className} inline-flex items-center gap-2 mt-8`}
            style={{
              color: GOLD,
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Read the full story
            <ArrowUpRight style={{ width: "14px", height: "14px" }} />
          </Link>
        </div>

        {/* Right — timeline */}
        <div className="flex-1 relative">
          {/* Vertical line */}
          <div
            className="absolute left-[22px] top-3 bottom-3"
            style={{
              width: "1px",
              background: `linear-gradient(to bottom, transparent, ${GOLD}40, transparent)`,
            }}
          />

          <div className="flex flex-col gap-8">
            {storyMilestones.map((m, i) => (
              <div key={i} className="flex items-start gap-6">
                {/* Node */}
                <div className="relative flex-shrink-0 flex items-center justify-center" style={{ width: "44px", height: "44px" }}>
                  <div
                    style={{
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      background: i === storyMilestones.length - 1 ? GOLD : "transparent",
                      border: `1px solid ${GOLD}`,
                      boxShadow:
                        i === storyMilestones.length - 1
                          ? `0 0 12px ${GOLD}80`
                          : "none",
                    }}
                  />
                </div>

                <div style={{ paddingTop: "10px" }}>
                  <span
                    className={`${quicksand.className} text-xs uppercase tracking-[0.25em]`}
                    style={{
                      color: i === storyMilestones.length - 1 ? GOLD : `${GOLD}70`,
                      fontWeight: 700,
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {m.year}
                  </span>
                  <p
                    className={`${quicksand.className}`}
                    style={{
                      fontSize: "0.96rem",
                      color:
                        i === storyMilestones.length - 1
                          ? CREAM
                          : "rgba(245,222,179,0.5)",
                      fontWeight: i === storyMilestones.length - 1 ? 600 : 400,
                    }}
                  >
                    {m.event}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom rule */}
      <div
        className="mt-12 h-px"
        style={{ background: "rgba(255,255,255,0.09)" }}
      />
    </div>
  );
}

// ─── Social Media Links ───────────────────────────────────────────────────────

function SocialSection({ inline = false }: { inline?: boolean }) {
  return (
    <div
      className={inline ? "relative w-full" : "relative max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16"}
      style={inline ? {} : { paddingBottom: "3rem" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px" style={{ background: GOLD }} />
            <span
              className={`${quicksand.className} text-sm uppercase tracking-[0.35em]`}
              style={{ color: `${GOLD}AA`, fontWeight: 700 }}
            >
              Follow Along
            </span>
          </div>
          <p
            className={`${quicksand.className}`}
            style={{
              fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
              color: CREAM,
              fontWeight: 700,
            }}
          >
            Join the conversation
          </p>
        </div>

        <p
          className={`${quicksand.className}`}
          style={{
            fontSize: "0.9rem",
            color: "rgba(245,222,179,0.4)",
            fontWeight: 400,
            maxWidth: "28ch",
            paddingBottom: "4px",
          }}
        >
          Daily moments, event drops, and city stories — live from Fate.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {socialLinks.map((s) => {
          const { Icon } = s;
          return (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl"
              style={{
                padding: "22px 22px 20px",
                border: `1px solid rgba(32,178,170,0.12)`,
                background: "rgba(255,255,255,0.04)",
                transition: "border-color 300ms ease, background 300ms ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${GOLD}40`;
                (e.currentTarget as HTMLElement).style.background = "rgba(32,178,170,0.09)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(32,178,170,0.45)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              }}
            >
              {/* Subtle background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 20% 20%, ${s.color}12, transparent 60%)`,
                  transition: "opacity 400ms ease",
                }}
              />

              <div className="relative flex items-start justify-between mb-6">
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: `${s.color}18`,
                    border: `1px solid ${s.color}30`,
                  }}
                >
                  <Icon
                    style={{ width: "18px", height: "18px", color: s.color }}
                  />
                </div>

                <ArrowUpRight
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  style={{
                    width: "16px",
                    height: "16px",
                    color: `${GOLD}50`,
                    marginTop: "2px",
                  }}
                />
              </div>

              <div className="relative">
                <p
                  className={`${quicksand.className}`}
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(245,222,179,0.4)",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    marginBottom: "2px",
                  }}
                >
                  {s.handle}
                </p>
                <p
                  className={`${quicksand.className}`}
                  style={{
                    fontSize: "1rem",
                    color: CREAM,
                    fontWeight: 700,
                  }}
                >
                  {s.label}
                </p>
                <p
                  className={`${quicksand.className} mt-1`}
                  style={{
                    fontSize: "0.78rem",
                    color: `${GOLD}80`,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  }}
                >
                  {s.followers} followers
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div
        className="mt-12 h-px"
        style={{ background: "rgba(255,255,255,0.09)" }}
      />
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
      {/* Section label */}
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

      {/* Amenity grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
        {amenities.map((a, i) => {
          const Icon = a.icon;
          return (
            <div
              key={i}
              className="group relative overflow-hidden"
              style={{
                background: "#1B2A35",
                minHeight: "220px",
              }}
            >
              {/* Background image */}
              <div className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: 1 }}
              >
                <Image
                  src={a.image}
                  alt={a.label}
                  fill
                  className="object-cover transition-transform duration-700"
                  style={{ transform: "scale(1.06)" }}
                />
              </div>

              {/* Bottom text legibility gradient only */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(10,16,20,0.78) 0%, rgba(10,16,20,0.1) 40%, transparent 65%)",
                }}
              />

              {/* Hover accent line top */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(to right, transparent, ${GOLD}60, transparent)`,
                  transition: "opacity 300ms ease",
                }}
              />

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col h-full" style={{ minHeight: "220px" }}>
                <div
                  className="flex items-center justify-center rounded-xl mb-auto"
                  style={{
                    width: "44px",
                    height: "44px",
                    border: `1px solid ${GOLD}35`,
                    background: `${GOLD}15`,
                    flexShrink: 0,
                  }}
                >
                  <Icon style={{ width: "20px", height: "20px", color: GOLD }} />
                </div>

                <div
                  style={{
                    marginTop: "48px",
                    background: "rgba(10,16,20,0.6)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    borderRadius: "10px",
                    padding: "10px 12px",
                  }}
                >
                  <p
                    className={`${quicksand.className}`}
                    style={{
                      fontSize: "0.95rem",
                      color: CREAM,
                      fontWeight: 700,
                      marginBottom: "4px",
                    }}
                  >
                    {a.label}
                  </p>

                  <p
                    className={`${quicksand.className}`}
                    style={{
                      fontSize: "0.82rem",
                      color: "rgba(245,222,179,0.75)",
                      fontWeight: 400,
                      lineHeight: "1.5",
                    }}
                  >
                    {a.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom rule */}
      <div
        className="mt-12 h-px"
        style={{ background: "rgba(255,255,255,0.09)" }}
      />
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
      {/* ======================================== */}
      {/* TOP GRADIENT ACCENT                     */}
      {/* ======================================== */}
      <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
        <div
          className="h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg, #20B2AA 0%, #CC4125 50%, #F5DEB3 100%)",
          }}
        />
        <div
          className="h-[42px] w-full opacity-40 blur-2xl"
          style={{
            background:
              "linear-gradient(90deg, rgba(32,178,170,0.35) 0%, rgba(204,65,37,0.35) 50%, rgba(245,222,179,0.35) 100%)",
          }}
        />
      </div>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            active !== null
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
            style={{
              fontSize: "clamp(3.2rem, 8vw, 6rem)",
              color: CREAM,
              fontWeight: 700,
            }}
          >
            Everything <br />
            <span style={{ color: "rgba(245,222,179,0.35)" }}>that makes</span>
            <br /> Fate.
          </h2>

          <p
            className="leading-relaxed max-w-xs lg:max-w-sm lg:pb-3"
            style={{
              fontSize: "1rem",
              color: "rgba(245,222,179,0.55)",
              fontWeight: 400,
            }}
          >
            From immersive rooftop lounges to weekend street-culture events —
            the restaurants, galleries, parks, and communities that power this
            city.
          </p>
        </div>

        <div
          className="h-px mt-10"
          style={{ background: "rgba(255,255,255,0.1)" }}
        />
      </div>

      {/* ── CATEGORY CARDS ── */}
      <div
        className="relative max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16"
        style={{ paddingBottom: "2rem" }}
      >
        <div
          className="flex flex-col"
          style={{
            gap: "2px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
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
            background:
              "linear-gradient(to bottom, #1B2A35 0%, transparent 30%, transparent 70%, #1B2A35 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${GOLD}18 0%, transparent 50%)`,
          }}
        />

        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${GOLD}40, transparent)`,
          }}
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
              style={{
                fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
                color: CREAM,
                fontWeight: 700,
              }}
            >
              Come experience <br />
              <span style={{ color: RUST }}>Fate for yourself.</span>
            </h2>

            <p
              className="leading-relaxed mt-6"
              style={{
                fontSize: "1rem",
                color: "rgba(245,222,179,0.5)",
                maxWidth: "36ch",
                fontWeight: 400,
              }}
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
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#1A9E97")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = GOLD)
              }
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
          </div>{/* end left+register row */}

          {/* ── SOCIAL MEDIA ── */}
          <div className="w-full pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}>
            <SocialSection inline />
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
    </section>
  );
}