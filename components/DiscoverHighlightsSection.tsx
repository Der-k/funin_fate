"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { DM_Serif_Display, DM_Sans } from "next/font/google";

const serif = DM_Serif_Display({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"] });
const sans  = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

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

const GOLD = "#C8A97E";
const CREAM = "#F5EDE0";

// ─── Image Card Row ──────────────────────────────────────────────────────────

function CategoryCard({
  cat,
  isActive,
  onEnter,
  onLeave,
}: {
  cat: (typeof categories)[0];
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <Link
      href={cat.href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative flex items-end overflow-hidden"
      style={{
        height: isActive ? "280px" : "120px",
        transition: "height 600ms cubic-bezier(.16,1,.3,1)",
        flexShrink: 0,
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={cat.image}
          alt={cat.title}
          fill
          className="object-cover"
          style={{
            transform: isActive ? "scale(1.04)" : "scale(1.08)",
            filter: isActive ? "brightness(0.75)" : "brightness(0.9)",
            transition: "transform 700ms cubic-bezier(.16,1,.3,1), filter 500ms ease",
          }}
        />
      </div>

      {/* Bottom gradient — only enough for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(8,10,11,0.82) 0%, rgba(8,10,11,0.1) 40%, transparent 70%)",
        }}
      />

      {/* Gold tint wash on active */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${GOLD}22 0%, transparent 55%)`,
          opacity: isActive ? 1 : 0,
          transition: "opacity 500ms ease",
        }}
      />

      {/* Top-left corner bracket */}
      <div
        className="absolute top-4 left-4 w-6 h-6 pointer-events-none"
        style={{
          borderTop: `1px solid ${GOLD}`,
          borderLeft: `1px solid ${GOLD}`,
          opacity: isActive ? 0.7 : 0,
          transition: "opacity 400ms ease 100ms",
        }}
      />

      {/* Content */}
      <div className="relative w-full px-7 pb-6 pt-4">
        <div className="flex items-end justify-between gap-4">

          {/* Left: number + title + description */}
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`${sans.className} text-sm tabular-nums`}
                style={{
                  color: isActive ? GOLD : "rgba(255,255,255,0.6)",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textShadow: "0 1px 8px rgba(0,0,0,0.8)",
                  transition: "color 300ms ease",
                }}
              >
                {cat.number}
              </span>
              <span
                className={`${sans.className} text-xs uppercase tracking-[0.2em]`}
                style={{
                  color: GOLD,
                  fontWeight: 500,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateX(0)" : "translateX(-6px)",
                  transition: "opacity 350ms ease 80ms, transform 400ms cubic-bezier(.16,1,.3,1) 80ms",
                }}
              >
                {cat.tag}
              </span>
            </div>

            <h3
              className={`${serif.className} leading-tight`}
              style={{
                fontSize: isActive ? "clamp(1.9rem, 3vw, 2.5rem)" : "clamp(1.6rem, 2.5vw, 2.1rem)",
                color: CREAM,
                textShadow: isActive
                  ? "0 2px 24px rgba(0,0,0,0.5)"
                  : "0 1px 12px rgba(0,0,0,0.95), 0 2px 4px rgba(0,0,0,0.9)",
                transition: "font-size 500ms cubic-bezier(.16,1,.3,1), text-shadow 400ms ease",
              }}
            >
              {cat.title}
            </h3>

            <p
              className={`${sans.className} font-300 leading-relaxed mt-2`}
              style={{
                fontSize: "1rem",
                color: "rgba(245,237,224,0.5)",
                maxHeight: isActive ? "4rem" : "0",
                opacity: isActive ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 500ms cubic-bezier(.16,1,.3,1), opacity 400ms ease 120ms",
              }}
            >
              {cat.description}
            </p>
          </div>

          {/* Right: arrow */}
          <div
            className="flex-shrink-0 flex items-center justify-center"
            style={{
              width: "44px",
              height: "44px",
              border: `1px solid ${GOLD}`,
              opacity: isActive ? 1 : 0,
              transform: isActive ? "scale(1) rotate(0deg)" : "scale(0.7) rotate(-15deg)",
              transition: "opacity 350ms ease 80ms, transform 450ms cubic-bezier(.34,1.56,.64,1) 80ms",
            }}
          >
            <ArrowUpRight style={{ color: GOLD, width: "18px", height: "18px" }} />
          </div>
        </div>
      </div>

      {/* Right-side thin accent bar */}
      <div
        className="absolute right-0 top-0 bottom-0"
        style={{
          width: "2px",
          background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`,
          opacity: isActive ? 0.6 : 0,
          transition: "opacity 400ms ease",
        }}
      />
    </Link>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function DiscoverFateSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#0C0E0F" }}>

      {/* Gold top rule */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}55, transparent)` }} />

      {/* Ambient glow from active image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: active !== null
            ? `radial-gradient(ellipse at 75% 40%, ${GOLD}12 0%, transparent 55%)`
            : "none",
          transition: "background 800ms ease",
        }}
      />

      {/* ── HERO HEADING ── */}
      <div
        className="relative max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16"
        style={{ paddingTop: "6rem", paddingBottom: "4rem" }}
      >
        {/* Label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-6 h-px" style={{ background: GOLD }} />
          <span
            className={`${sans.className} text-sm uppercase tracking-[0.35em]`}
            style={{ color: `${GOLD}AA`, fontWeight: 500 }}
          >
            Discover the City
          </span>
        </div>

        {/* Main heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <h2
            className={`${serif.className} leading-[0.92]`}
            style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)", color: CREAM }}
          >
            Everything <br />
            <em style={{ color: "rgba(245,237,224,0.35)" }}>that makes</em>
            <br /> Fate.
          </h2>

          <p
            className={`${sans.className} font-300 leading-relaxed max-w-xs lg:max-w-sm lg:pb-3`}
            style={{ fontSize: "1.0625rem", color: "rgba(245,237,224,0.45)" }}
          >
            From immersive rooftop lounges to weekend street-culture events — the restaurants,
            galleries, parks, and communities that power this city.
          </p>
        </div>

        {/* Rule */}
        <div className="h-px mt-10" style={{ background: "rgba(255,255,255,0.07)" }} />
      </div>

      {/* ── CATEGORY CARDS ── */}
      <div
        className="relative max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16"
        style={{ paddingBottom: "2rem" }}
      >
        <div
          className="flex flex-col"
          style={{ gap: "2px", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.title}
              cat={cat}
              isActive={i === active}
              onEnter={() => setActive(i)}
              onLeave={() => setActive(null)}
            />
          ))}
        </div>
      </div>

      {/* ── CTA SECTION ── */}
      <div
        className="relative overflow-hidden"
        style={{ marginTop: "5rem" }}
      >
        {/* CTA background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop"
            alt="City of Fate"
            fill
            className="object-cover"
            style={{ filter: "brightness(0.25)" }}
          />
        </div>

        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, #0C0E0F 0%, transparent 30%, transparent 70%, #0C0E0F 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${GOLD}18 0%, transparent 50%)` }}
        />

        {/* Gold top rule */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}40, transparent)` }} />

        <div
          className="relative max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10"
          style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
        >
          {/* Left text */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px" style={{ background: GOLD }} />
              <span
                className={`${sans.className} text-sm uppercase tracking-[0.35em]`}
                style={{ color: `${GOLD}AA`, fontWeight: 500 }}
              >
                Plan Your Visit
              </span>
            </div>

            <h2
              className={`${serif.className} leading-[0.92]`}
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: CREAM }}
            >
              Come experience <br />
              <em style={{ color: `${GOLD}CC` }}>Fate for yourself.</em>
            </h2>

            <p
              className={`${sans.className} font-300 leading-relaxed mt-6`}
              style={{ fontSize: "1.0625rem", color: "rgba(245,237,224,0.45)", maxWidth: "36ch" }}
            >
              Register now to get early access to events, curated itineraries,
              and exclusive experiences available only in Fate.
            </p>

            {/* Decorative stat row */}
            <div className="flex items-center gap-8 mt-10">
              {[["200+", "Events yearly"], ["60+", "Local venues"], ["12", "Neighbourhoods"]].map(([num, label]) => (
                <div key={label}>
                  <p
                    className={`${serif.className}`}
                    style={{ fontSize: "2rem", color: GOLD, lineHeight: 1 }}
                  >
                    {num}
                  </p>
                  <p
                    className={`${sans.className} text-sm mt-1`}
                    style={{ color: "rgba(245,237,224,0.35)", fontWeight: 300, letterSpacing: "0.03em" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: register card */}
          <div
            className="w-full lg:w-auto lg:min-w-[340px] flex-shrink-0 relative p-8"
            style={{
              border: `1px solid ${GOLD}30`,
              background: "rgba(12,14,15,0.75)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            {/* Corner accents */}
            {[
              { top: 0, left: 0, borderTop: true, borderLeft: true },
              { top: 0, right: 0, borderTop: true, borderRight: true },
              { bottom: 0, left: 0, borderBottom: true, borderLeft: true },
              { bottom: 0, right: 0, borderBottom: true, borderRight: true },
            ].map((corner, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 pointer-events-none"
                style={{
                  top: corner.top !== undefined ? "-1px" : undefined,
                  bottom: corner.bottom !== undefined ? "-1px" : undefined,
                  left: corner.left !== undefined ? "-1px" : undefined,
                  right: corner.right !== undefined ? "-1px" : undefined,
                  borderTop: corner.borderTop ? `2px solid ${GOLD}` : undefined,
                  borderBottom: corner.borderBottom ? `2px solid ${GOLD}` : undefined,
                  borderLeft: corner.borderLeft ? `2px solid ${GOLD}` : undefined,
                  borderRight: corner.borderRight ? `2px solid ${GOLD}` : undefined,
                }}
              />
            ))}

            <p
              className={`${sans.className} text-xs uppercase tracking-[0.25em] mb-2`}
              style={{ color: `${GOLD}90`, fontWeight: 500 }}
            >
              Free Registration
            </p>

            <h3
              className={`${serif.className} leading-tight mb-1`}
              style={{ fontSize: "1.6rem", color: CREAM }}
            >
              Join Fate
            </h3>
            <p
              className={`${sans.className} font-300 text-sm mb-7`}
              style={{ color: "rgba(245,237,224,0.35)" }}
            >
              Get early access. No spam, ever.
            </p>

            {/* Email input */}
            <div className="relative mb-4">
              <input
                type="email"
                placeholder="Your email address"
                className={`${sans.className} w-full bg-transparent text-sm outline-none`}
                style={{
                  border: `1px solid rgba(200,169,126,0.2)`,
                  padding: "14px 16px",
                  color: CREAM,
                  fontSize: "0.9375rem",
                  letterSpacing: "0.01em",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = `${GOLD}55`)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(200,169,126,0.2)")}
              />
            </div>

            {/* CTA button */}
            <Link
              href="/register"
              className={`${sans.className} group w-full flex items-center justify-between px-5 py-4 text-sm font-500`}
              style={{
                background: GOLD,
                color: "#0C0E0F",
                letterSpacing: "0.04em",
                fontWeight: 600,
                transition: "background 300ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#D9BC96")}
              onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
            >
              <span>Register for Free</span>
              <ArrowUpRight
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                style={{ width: "16px", height: "16px" }}
              />
            </Link>

            <p
              className={`${sans.className} text-xs mt-4 text-center`}
              style={{ color: "rgba(245,237,224,0.2)", fontWeight: 300 }}
            >
              By registering you agree to our Terms & Privacy Policy
            </p>
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}30, transparent)` }} />
    </section>
  );
}