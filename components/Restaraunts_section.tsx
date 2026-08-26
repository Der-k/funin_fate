"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Quicksand, Caveat } from "next/font/google";
import { useState } from "react";

// ─── Dynamic content (all copy + image links live here, not in the component) ─
// Expects the JSON at: /data/restaurant-showcase-content.json (project root, per @/* -> ./*)
import content from "@/data/restaurant-showcase-content.json";

const TEAL     = "#20B2AA";
const RUST     = "#CC4125";
const WHEAT    = "#F5DEB3";
const CHARCOAL = "#36454F";
const WHITE    = "#FFFFFF";

type RestaurantImage = {
  id: number;
  title: string;
  tag: string;
  image: string;
};

const restaurantImages: RestaurantImage[] = content.restaurantImages;
const sectionCopy = content.sectionCopy;
const featuredCard = content.featuredCard;

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function RestaurantImageCard({
  title,
  tag,
  image,
}: {
  title: string;
  tag: string;
  image: string;
}) {
  return (
    <div className="group relative overflow-hidden">
      <div className="relative h-[320px] sm:h-[380px] lg:h-[440px] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Ring */}
        <div className="absolute inset-0 ring-1 ring-white/10 group-hover:ring-[#CC4125]/50 transition duration-500" />

        <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
          <p
            className={`text-sm uppercase tracking-[0.25em] text-[#20B2AA] ${quicksand.className}`}
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}
          >
            {tag}
          </p>
          <h3
            className={`mt-1 text-2xl sm:text-3xl font-black text-[#F5DEB3] ${quicksand.className}`}
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
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
      className="relative overflow-hidden p-6 sm:p-8 shadow-xl h-full"
      style={{
        background: CHARCOAL,
        border: `1px solid rgba(32,178,170,0.2)`,
      }}
    >
      <div
        className="absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl pointer-events-none"
        style={{ background: `${TEAL}25` }}
      />
      <div
        className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: `${RUST}30` }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{ background: `radial-gradient(circle at 50% 50%, ${WHEAT}, transparent 70%)` }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: TEAL }} />
          <p
            className={`text-sm uppercase tracking-[0.35em] font-bold ${quicksand.className}`}
            style={{ color: TEAL }}
          >
            {featuredCard.eyebrow}
          </p>
        </div>

        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-[0.95] ${quicksand.className}`}
          style={{ color: WHEAT }}
        >
          {featuredCard.heading.lines.map((line: string, i: number) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
          <span style={{ color: TEAL }}>{featuredCard.heading.highlight}</span>
        </h2>

        <div
          className="mt-4 h-[3px] w-20 rounded-full"
          style={{ background: `linear-gradient(to right, ${TEAL}, ${RUST}, transparent)` }}
        />

        <p
          className={`mt-5 sm:mt-6 max-w-md text-xl sm:text-2xl leading-relaxed ${caveat.className}`}
          style={{ color: `${WHEAT}99` }}
        >
          {featuredCard.body}
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4">
          <Link
            href={featuredCard.primaryCta.href}
            onMouseEnter={() => setExploreHovered(true)}
            onMouseLeave={() => setExploreHovered(false)}
            className={`group relative inline-flex items-center justify-center overflow-hidden h-12 md:h-14 px-7 md:px-8 gap-2 ${quicksand.className}`}
            style={{
              background: TEAL,
              color: "#0D1B24",
              borderRadius: 0,
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
              {featuredCard.primaryCta.label}
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

          <Link
            href={featuredCard.secondaryCta.href}
            onMouseEnter={() => setExpHovered(true)}
            onMouseLeave={() => setExpHovered(false)}
            className={`inline-flex items-center justify-center h-12 md:h-14 px-7 md:px-8 ${quicksand.className}`}
            style={{
              border: `1px solid ${WHEAT}55`,
              borderRadius: 0,
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
            {featuredCard.secondaryCta.label}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RestaurantShowcaseSection() {
  return (
    <section className="relative overflow-hidden px-4 sm:px-6 py-14 sm:py-20 md:px-10 lg:px-16 bg-white">

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 sm:mb-16 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#CC4125]" />
            <p className={`text-sm sm:text-base uppercase tracking-[0.25em] sm:tracking-[0.35em] text-black/45 ${quicksand.className}`}>
              {sectionCopy.eyebrow}
            </p>
          </div>

          <h2
            className={`mt-4 text-4xl sm:text-5xl font-black uppercase leading-[0.95] text-black md:text-7xl ${quicksand.className}`}
          >
            {sectionCopy.heading.map((line: string, i: number) => (
              <span key={i}>
                {line}
                {i < sectionCopy.heading.length - 1 && <br />}
              </span>
            ))}
          </h2>

          <div className="mt-4 h-[3px] w-20 sm:w-24 rounded-full bg-gradient-to-r from-[#CC4125] via-[#20B2AA] to-transparent" />

          <p className={`mt-5 sm:mt-6 text-xl sm:text-2xl leading-relaxed text-black/60 ${caveat.className}`}>
            {sectionCopy.intro}
          </p>
        </div>

        {/* Mobile featured card */}
        <div className="mb-5 lg:hidden">
          <FeaturedCard />
        </div>

        {/* Mobile 2-col image grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
          {restaurantImages.map((img) => (
            <RestaurantImageCard key={img.id} title={img.title} tag={img.tag} image={img.image} />
          ))}
        </div>

        {/* Desktop: left images | center card | right images */}
        <div className="hidden lg:grid grid-cols-[1fr_1.2fr_1fr] gap-5">

          {/* Left column */}
          <div className="flex flex-col gap-5">
            <RestaurantImageCard title={restaurantImages[0].title} tag={restaurantImages[0].tag} image={restaurantImages[0].image} />
            <RestaurantImageCard title={restaurantImages[1].title} tag={restaurantImages[1].tag} image={restaurantImages[1].image} />
            <RestaurantImageCard title={restaurantImages[2].title} tag={restaurantImages[2].tag} image={restaurantImages[2].image} />
          </div>

          {/* Centre — Featured card */}
          <div className="flex">
            <FeaturedCard />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            <RestaurantImageCard title={restaurantImages[3].title} tag={restaurantImages[3].tag} image={restaurantImages[3].image} />
            <RestaurantImageCard title={restaurantImages[4].title} tag={restaurantImages[4].tag} image={restaurantImages[4].image} />
            <RestaurantImageCard title={restaurantImages[5].title} tag={restaurantImages[5].tag} image={restaurantImages[5].image} />
          </div>

        </div>
      </div>
    </section>
  );
}