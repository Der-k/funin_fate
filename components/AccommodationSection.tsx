"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const stays = [
  {
    title: "Kigali Marriott Hotel",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1400&auto=format&fit=crop",
    href: "/accommodation/kigali-marriott",
    category: "Luxury Hotel",
  },
  {
    title: "Radisson Blu Kigali",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1400&auto=format&fit=crop",
    href: "/accommodation/radisson-blu",
    category: "Conference Stay",
  },
  {
    title: "Four Points by Sheraton",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1400&auto=format&fit=crop",
    href: "/accommodation/four-points",
    category: "Business Hotel",
  },
  {
    title: "The Retreat Kigali",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop",
    href: "/accommodation/the-retreat",
    category: "Boutique Escape",
  },
];

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
              Stay & Relax
            </p>

            {/* Main heading */}
            <h2 className="text-[#111111] text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] mb-8">
              The Funinfate
              <br />
              Accommodation
              <br />
              Experience
            </h2>

            {/* Body paragraph */}
            <p
              className={`text-[#4a4a4a] text-2xl md:text-[2rem] leading-relaxed max-w-2xl mb-8 ${caveat.className}`}
            >
              Discover premium hotels, boutique stays, and comfortable
              accommodation options carefully selected for your Funinfate
              experience.
            </p>

            {/* Tabs */}
            <div className="flex flex-wrap gap-5 mt-6">
              {[
                "Luxury Hotels",
                "Boutique Stays",
                "Apartments",
                "Conference Hotels",
                "City Escapes",
              ].map((item, i) => (
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
              href="/accommodation"
              className="
                inline-flex items-center justify-center gap-2
                h-14 px-8
                bg-[#111111] text-white
                uppercase tracking-[0.18em] text-sm font-semibold
                hover:bg-[#20B2AA]
                transition-all duration-300
              "
            >
              Explore Hotels
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
                      Funinfate Preferred Stay
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