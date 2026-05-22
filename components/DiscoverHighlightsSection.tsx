"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Caveat, Quicksand } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "600", "700"] });
const quicksand = Quicksand({ subsets: ["latin"], weight: ["300", "400", "600", "700"] });

const slides = [
  {
    title: "Top Experiences in Fate",
    description:
      "Immersive adventures and curated experiences shaping the identity of the city.",
    href: "/experiences",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
    accent: "#20B2AA",
  },
  {
    title: "Culture & Community",
    description:
      "Meet creators, innovators, and communities driving the cultural pulse of Fate.",
    href: "/community",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
    accent: "#CC4125",
  },
  {
    title: "Weekend Energy",
    description:
      "Events, nightlife, and weekend discoveries across the city.",
    href: "/events",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1600&auto=format&fit=crop",
    accent: "#F5DEB3",
  },
];

export default function DiscoverFateSection() {
  const [active, setActive] = useState(0);

  const activeSlide = slides[active];

  return (
    <section
      className="relative transition-all duration-700 py-28 overflow-hidden"
      style={{
        background: `radial-gradient(circle at top left, ${activeSlide.accent}22, #2f3f47 55%)`,
      }}
    >
      {/* ambient glow that reacts */}
      <div
        className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] blur-3xl rounded-full transition-all duration-700"
        style={{ backgroundColor: activeSlide.accent + "33" }}
      />
      <div
        className="absolute bottom-[-160px] right-[-160px] w-[500px] h-[500px] blur-3xl rounded-full transition-all duration-700"
        style={{ backgroundColor: activeSlide.accent + "22" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">

        {/* HEADER */}
        <div className="mb-14">
          <p className={`${caveat.className} text-2xl`} style={{ color: activeSlide.accent }}>
            Discover the rhythm of Fate
          </p>

          <h2
            className={`${quicksand.className} text-6xl md:text-7xl font-black text-[#F5DEB3]`}
          >
            DISCOVER FATE
          </h2>

          <p className="mt-4 text-white/70 max-w-2xl">
            Hover across experiences to shift the city’s mood, reveal stories,
            and explore what defines Fate.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* BIG FEATURE IMAGE */}
          <div className="lg:col-span-2 relative h-[520px] md:h-[650px] rounded-[28px] overflow-hidden border border-white/10">

            {slides.map((slide, i) => (
              <div
                key={slide.image}
                onMouseEnter={() => setActive(i)}
                className={`absolute inset-0 transition-all duration-700 cursor-pointer ${
                  i === active
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-110"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover transition-transform duration-700"
                />

                {/* dynamic overlay tint */}
                <div
                  className="absolute inset-0 transition-all duration-700"
                  style={{
                    background: `linear-gradient(to top, ${activeSlide.accent}55, transparent 60%)`,
                  }}
                />

                {/* content */}
                <div className="absolute bottom-8 left-8 max-w-lg">
                  <span
                    className="text-sm px-3 py-1 rounded-full bg-black/40 border border-white/10"
                    style={{ color: activeSlide.accent }}
                  >
                    {slide.accent}
                  </span>

                  <h3 className="text-4xl md:text-5xl font-bold text-white mt-4">
                    {slide.title}
                  </h3>

                  <p className="text-white/75 mt-4">{slide.description}</p>

                  <Link
                    href={slide.href}
                    className="inline-flex items-center gap-2 mt-6 text-white font-semibold group"
                    style={{ color: activeSlide.accent }}
                  >
                    Explore Story
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* SIDE LIST (INTERACTIVE NAV) */}
          <div className="flex flex-col gap-5">

            {slides.map((slide, i) => (
              <div
                key={slide.title}
                onMouseEnter={() => setActive(i)}
                className={`group relative p-5 rounded-[18px] border transition-all duration-500 cursor-pointer ${
                  i === active
                    ? "border-white/30 bg-white/10"
                    : "border-white/10 bg-white/5"
                }`}
              >

                {/* IMAGE THUMB */}
                <div className="relative h-[120px] rounded-[14px] overflow-hidden mb-4">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      i === active ? "scale-110" : "scale-100 opacity-70"
                    }`}
                  />
                </div>

                {/* TEXT */}
                <p
                  className="text-sm font-semibold"
                  style={{
                    color: i === active ? activeSlide.accent : "#F5DEB3",
                  }}
                >
                  {slide.title}
                </p>

                <p className="text-white/60 text-sm mt-1 line-clamp-2">
                  {slide.description}
                </p>

                {/* LINK WITH HOVER UNDERLINE */}
                <Link
                  href={slide.href}
                  className="inline-block mt-3 text-sm font-semibold relative"
                  style={{ color: activeSlide.accent }}
                >
                  Explore
                  <span
                    className="absolute left-0 bottom-[-2px] h-[2px] w-0 group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: activeSlide.accent }}
                  />
                </Link>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}