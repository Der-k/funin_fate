"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const newsSlides = [
  {
    id: 1,
    title: "FESTIVAL LIGHTS UP THE CITY OF FATE",
    description:
      "Thousands gather in the City of Fate for the annual lantern celebration, bringing music, culture, and unforgettable nightlife experiences.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "Latest Events",
    button: "Discover Events",
    href: "/events",
    category: "Night Festival",
  },
  {
    id: 2,
    title: "NEW SKY DISTRICT NOW OPEN",
    description:
      "The futuristic Sky District introduces rooftop dining, luxury shopping, and immersive digital art experiences in the heart of Fate.",
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "City Updates",
    button: "Explore District",
    href: "/discover",
    category: "Urban Experience",
  },
  {
    id: 3,
    title: "WATERFRONT REVIVAL ATTRACTS TOURISTS",
    description:
      "The redesigned waterfront has become one of the city's most visited destinations with entertainment zones and breathtaking skyline views.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "Destinations",
    button: "Visit Waterfront",
    href: "/destinations",
    category: "Coastal Escape",
  },
];

export default function FateNewsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % newsSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[760px] overflow-hidden bg-[#36454F]">

      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={newsSlides[current].id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <Image
            src={newsSlides[current].image}
            alt={newsSlides[current].title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Main overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/75 via-[#36454F]/45 to-[#111111]/30" />

          {/* Cinematic vignette */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Splash glows */}
          <div className="absolute top-[-10%] left-[-5%] w-[420px] h-[420px] bg-[#20B2AA]/20 blur-3xl rounded-full" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[420px] h-[420px] bg-[#CC4125]/20 blur-3xl rounded-full" />
        </motion.div>
      </AnimatePresence>

      {/* Floating decorative shapes */}
      <div className="absolute top-16 right-20 w-32 h-32 border border-white/10 rounded-full z-10" />
      <div className="absolute bottom-20 left-20 w-20 h-20 border border-white/10 rounded-full z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-end h-full px-6 md:px-20 pb-16">

        <AnimatePresence mode="wait">
          <motion.div
            key={newsSlides[current].title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="
              relative overflow-hidden
              bg-[#F5DEB3]/95 backdrop-blur-xl
              w-full max-w-[520px]
              shadow-[0_35px_120px_rgba(0,0,0,0.35)]
              rounded-[28px]
              border border-white/20
            "
          >

            {/* Top splash accent */}
            <div
              className="h-[5px] w-full"
              style={{
                background:
                  "linear-gradient(90deg, #20B2AA 0%, #CC4125 50%, #36454F 100%)",
              }}
            />

            {/* Decorative glow */}
            <div className="absolute -top-16 -right-10 w-40 h-40 bg-[#20B2AA]/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-16 -left-10 w-40 h-40 bg-[#CC4125]/20 blur-3xl rounded-full" />

            <div className="relative p-8 md:p-10">

              {/* Category pill */}
              <div className="mb-6">
                <span
                  className={`
                    inline-flex items-center
                    px-4 py-2 rounded-full
                    bg-white/80 backdrop-blur-md
                    text-[#36454F]
                    text-sm tracking-wide font-bold
                    shadow-md
                    ${caveat.className}
                  `}
                >
                  {newsSlides[current].category}
                </span>
              </div>

              <div className="space-y-6">

                {/* Eyebrow */}
                <p
                  className={`text-[#CC4125] text-3xl font-bold ${caveat.className}`}
                >
                  {newsSlides[current].eyebrow}
                </p>

                {/* Heading */}
                <h2 className="text-[#36454F] text-3xl md:text-[3rem] font-black uppercase leading-[0.92] tracking-tight">
                  {newsSlides[current].title}
                </h2>

                {/* Decorative line */}
                <div className="w-20 h-[3px] bg-[#20B2AA]" />

                {/* Description */}
                <p
                  className={`text-[#36454F]/80 text-xl md:text-2xl leading-relaxed ${caveat.className}`}
                >
                  {newsSlides[current].description}
                </p>

                {/* CTA */}
                <Link
                  href={newsSlides[current].href}
                  className="
                    group inline-flex items-center justify-center gap-3
                    w-full h-14
                    bg-[#36454F] text-[#F5DEB3]
                    uppercase tracking-[0.18em] text-sm font-semibold
                    rounded-xl
                    hover:bg-[#20B2AA]
                    transition-all duration-300
                  "
                >
                  {newsSlides[current].button}

                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-3">
        {newsSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${
              current === index
                ? "w-12 h-3 bg-[#CC4125]"
                : "w-3 h-3 bg-[#F5DEB3]/50 hover:bg-[#F5DEB3]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}