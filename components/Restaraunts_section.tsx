"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Quicksand } from "next/font/google";
import { useState } from "react";
 
// ─── Palette ──────────────────────────────────────────────────────────────────
const TEAL     = "#20B2AA";
const RUST     = "#CC4125";
const WHEAT    = "#F5DEB3";
const CHARCOAL = "#36454F";
const WHITE    = "#FFFFFF";
const restaurantImages = [
  {
    id: 1,
    title: "Rooftop Dining",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Luxury Interior",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Chef Experience",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Signature Cocktails",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Fine Dining",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Private Events",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop",
  },
];

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

function RestaurantImageCard({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[20px] sm:rounded-[28px]">
      <div className="relative h-[180px] sm:h-[200px] lg:h-[240px] w-full overflow-hidden rounded-[20px] sm:rounded-[28px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#36454F] via-[#36454F]/30 to-transparent" />

        {/* Ring */}
        <div className="absolute inset-0 rounded-[20px] sm:rounded-[28px] ring-1 ring-white/10 group-hover:ring-[#CC4125]/50 transition duration-500" />

        <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
          <p
            className={`text-sm uppercase tracking-[0.25em] text-[#20B2AA] ${quicksand.className}`}
          >
            Dining
          </p>
          {/* ✅ Card title: white */}
          <h3
            className={`mt-1 text-2xl sm:text-3xl font-black text-white ${quicksand.className}`}
          >
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

function FeaturedCard() {
  const [exploreHovered, setExploreHovered] = useState(false);
  const [expHovered, setExpHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-xl h-full"
      style={{
        background: CHARCOAL,
        border: `1px solid rgba(32,178,170,0.2)`,
      }}
    >
      {/* Teal glow top-right */}
      <div
        className="absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl pointer-events-none"
        style={{ background: `${TEAL}25` }}
      />
      {/* Rust glow bottom-left */}
      <div
        className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: `${RUST}30` }}
      />
      {/* Wheat subtle center tone */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{ background: `radial-gradient(circle at 50% 50%, ${WHEAT}, transparent 70%)` }}
      />

      <div className="relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: TEAL }} />
          <p
            className={`text-sm uppercase tracking-[0.35em] font-bold ${quicksand.className}`}
            style={{ color: `${TEAL}` }}
          >
            Culinary Experiences
          </p>
        </div>

        {/* Title */}
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-[0.95] ${quicksand.className}`}
          style={{ color: WHEAT }}
        >
          Taste The
          <br />
          Future Of
          <br />
          <span style={{ color: TEAL }}>Funinfate.</span>
        </h2>

        {/* Gradient bar — teal → rust */}
        <div
          className="mt-4 h-[3px] w-20 rounded-full"
          style={{ background: `linear-gradient(to right, ${TEAL}, ${RUST}, transparent)` }}
        />

        {/* Body */}
        <p
          className={`mt-5 sm:mt-6 max-w-md text-xl sm:text-2xl leading-relaxed ${quicksand.className}`}
          style={{ color: `${WHEAT}99` }}
        >
          From immersive rooftop lounges to curated chef experiences,
          discover the restaurants, nightlife, and social spaces powering
          the energy of Funinfate.
        </p>

        {/* ── STANDARDISED BUTTONS ── */}
        <div className="mt-6 sm:mt-8 flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4">
          {/* Primary: teal fill → rust slide-in */}
          <Link
            href="/restaurants"
            onMouseEnter={() => setExploreHovered(true)}
            onMouseLeave={() => setExploreHovered(false)}
            className={`group relative inline-flex items-center justify-center overflow-hidden h-12 md:h-14 px-7 md:px-8 gap-2 ${quicksand.className}`}
            style={{
              background: TEAL,
              color: "#0D1B24",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontSize: "0.75rem",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                background: RUST,
                transform: exploreHovered ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 500ms cubic-bezier(.16,1,.3,1)",
              }}
            />
            <span
              style={{
                position: "relative",
                zIndex: 1,
                color: exploreHovered ? WHITE : "#0D1B24",
                transition: "color 300ms ease",
              }}
            >
              Explore Dining
            </span>
            <ArrowRight
              style={{
                position: "relative",
                zIndex: 1,
                width: "16px",
                height: "16px",
                color: exploreHovered ? WHITE : "#0D1B24",
                transition: "color 300ms ease, transform 300ms ease",
                transform: exploreHovered ? "translateX(3px)" : "translateX(0)",
              }}
            />
          </Link>

          {/* Secondary: wheat border → fills charcoal-dark on hover */}
          <Link
            href="/experience"
            onMouseEnter={() => setExpHovered(true)}
            onMouseLeave={() => setExpHovered(false)}
            className={`inline-flex items-center justify-center h-12 md:h-14 px-7 md:px-8 ${quicksand.className}`}
            style={{
              border: `1px solid ${WHEAT}55`,
              color: expHovered ? CHARCOAL : WHEAT,
              background: expHovered ? WHEAT : "transparent",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontSize: "0.75rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 300ms ease",
            }}
          >
            View Experiences
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RestaurantShowcaseSection() {
  return(
    /* ✅ Background: white */
    <section className="relative overflow-hidden px-4 sm:px-6 py-14 sm:py-20 md:px-10 lg:px-16 bg-white">

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 sm:mb-16 max-w-3xl">
          <div className="flex items-center gap-3">
            {/* Rust dot */}
            <span className="h-2 w-2 rounded-full bg-[#CC4125]" />
            <p className={`text-sm sm:text-base uppercase tracking-[0.25em] sm:tracking-[0.35em] text-black/45 ${quicksand.className}`}>
              Restaurants &amp; Nightlife
            </p>
          </div>

          {/* ✅ Section heading: black */}
          <h2
            className={`mt-4 text-4xl sm:text-5xl font-black uppercase leading-[0.95] text-black md:text-7xl ${quicksand.className}`}
          >
            Eat and
            <br />
            Drink.
          </h2>

          {/* Gradient bar */}
          <div className="mt-4 h-[3px] w-20 sm:w-24 rounded-full bg-gradient-to-r from-[#CC4125] via-[#20B2AA] to-transparent" />

          {/* ✅ Section description: black/60 */}
          <p className={`mt-5 sm:mt-6 text-xl sm:text-2xl leading-relaxed text-black/60 ${quicksand.className}`}>
            Discover premium dining destinations, social venues,
            networking lounges, and curated culinary experiences
            designed around the energy of Funinfate.
          </p>
        </div>

        {/* Mobile featured card — hidden on lg+ */}
        <div className="mb-5 lg:hidden">
          <FeaturedCard />
        </div>

        {/* Mobile 2-col image grid — hidden on lg+ */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
          {restaurantImages.map((img) => (
            <RestaurantImageCard key={img.id} title={img.title} image={img.image} />
          ))}
        </div>

        {/* Desktop 3-column layout — hidden below lg */}
        <div className="hidden lg:grid grid-cols-3 gap-5">

          {/* Left column */}
          <div className="flex flex-col gap-5">
            <RestaurantImageCard title={restaurantImages[0].title} image={restaurantImages[0].image} />
            <RestaurantImageCard title={restaurantImages[1].title} image={restaurantImages[1].image} />
            <RestaurantImageCard title={restaurantImages[2].title} image={restaurantImages[2].image} />
          </div>

          {/* Centre — Featured card */}
          <div className="flex">
            <FeaturedCard />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            <RestaurantImageCard title={restaurantImages[3].title} image={restaurantImages[3].image} />
            <RestaurantImageCard title={restaurantImages[4].title} image={restaurantImages[4].image} />
            <RestaurantImageCard title={restaurantImages[5].title} image={restaurantImages[5].image} />
          </div>

        </div>
      </div>
    </section>
  );
}