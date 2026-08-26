"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Caveat } from "next/font/google";

// ─── Dynamic content (all copy + image links live here, not in the component) ─
// Expects the JSON at: /data/accommodation-section-content.json (project root, per @/* -> ./*)
import content from "@/data/accommodation-section-content.json";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// ─── Data pulled straight from JSON (dynamic, easy to swap/CMS-drive later) ───
type Stay = {
  title: string;
  image: string;
  href: string;
  category: string;
};

const stays: Stay[] = content.stays;
const tabs: string[] = content.tabs;
const sectionCopy = content.sectionCopy;

export default function AccommodationSection() {
  return (
    <section className="bg-[#faf8f4] py-24 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Top Content */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
          <div className="max-w-3xl">

            {/* Handwritten eyebrow label */}
            <p
              className={`text-[#CC4125] text-3xl md:text-4xl mb-4 ${caveat.className}`}
            >
              {sectionCopy.eyebrow}
            </p>

            {/* Main heading */}
            <h2 className="text-[#111111] text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] mb-8">
              {sectionCopy.heading.map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i < sectionCopy.heading.length - 1 && <br />}
                </span>
              ))}
            </h2>

            {/* Body paragraph */}
            <p
              className={`text-[#4a4a4a] text-2xl md:text-[2rem] leading-relaxed max-w-2xl mb-8 ${caveat.className}`}
            >
              {sectionCopy.intro}
            </p>

            {/* Tabs */}
            <div className="flex flex-wrap gap-5 mt-6">
              {tabs.map((item, i) => (
                <button
                  key={item}
                  className={`
                    text-lg font-bold tracking-wide
                    border-b-2 border-transparent
                    hover:border-[#CC4125]
                    transition pb-1 text-[#111]
                    ${caveat.className}
                    ${i === 0 ? "border-[#CC4125]" : ""}
                  `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0 pt-2">
            <Link
              href={sectionCopy.cta.href}
              className="
                inline-flex items-center justify-center gap-2
                h-14 px-8
                bg-[#111111] text-white
                uppercase tracking-[0.18em] text-sm font-semibold
                hover:bg-[#20B2AA]
                transition-all duration-300
              "
            >
              {sectionCopy.cta.label}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Image Grid */}
        <div className="relative">

          {/* Nav Arrows */}
          <button className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-md rounded-full w-11 h-11 flex items-center justify-center transition">
            <ChevronLeft className="w-5 h-5 text-black" />
          </button>

          <button className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-md rounded-full w-11 h-11 flex items-center justify-center transition">
            <ChevronRight className="w-5 h-5 text-black" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {stays.map((stay) => (
              <Link
                key={stay.title}
                href={stay.href}
                className="group block"
              >
                <div className="relative h-[520px] overflow-hidden rounded-[24px] bg-black shadow-[0_25px_80px_rgba(0,0,0,0.12)]">

                  {/* Splash Image */}
                  <Image
                    src={stay.image}
                    alt={stay.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />

                  {/* Soft gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

                  {/* Splash badge */}
                  <div className="absolute top-5 left-5 z-10">
                    <span
                      className={`
                        px-4 py-2 rounded-full
                        bg-white/90 backdrop-blur-md
                        text-[#111]
                        text-sm font-bold tracking-wide
                        shadow-lg
                        ${caveat.className}
                      `}
                    >
                      {stay.category}
                    </span>
                  </div>

                  {/* Decorative splash glow */}
                  <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#20B2AA]/20 blur-3xl rounded-full" />
                  <div className="absolute -bottom-20 -left-16 w-44 h-44 bg-[#CC4125]/20 blur-3xl rounded-full" />

                  {/* Card content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <div className="w-14 h-[2px] bg-[#20B2AA] mb-4 group-hover:w-24 transition-all duration-500" />

                    <h3
                      className={`text-white text-2xl md:text-3xl font-bold leading-tight mb-2 ${caveat.className}`}
                    >
                      {stay.title}
                    </h3>

                    <p className="text-white/80 text-sm uppercase tracking-[0.2em]">
                      {sectionCopy.cardFooterLabel}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}