"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Caveat, Quicksand } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const slides = [
  {
    title: "Top Experiences in Funinfate",
    description:
      "Explore curated adventures, immersive showcases, and unforgettable experiences happening across Funinfate.",
    href: "/experiences",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
    category: "Immersive Events",
  },
  {
    title: "Creator & Community Highlights",
    description:
      "Meet the creators, innovators, and communities shaping the future of entertainment and culture.",
    href: "/community",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
    category: "Community Culture",
  },
  {
    title: "Weekend Event Guide",
    description:
      "Find the best events, exhibitions, performances, and activities happening this weekend.",
    href: "/events",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1600&auto=format&fit=crop",
    category: "Weekend Picks",
  },
  {
    title: "Live Entertainment Showcase",
    description:
      "Discover concerts, performances, and immersive live experiences from across the region.",
    href: "/showcase",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1600&auto=format&fit=crop",
    category: "Live Entertainment",
  },
  {
    title: "Family & Lifestyle Activities",
    description:
      "Enjoy activities, family-friendly experiences, and lifestyle destinations for every age.",
    href: "/lifestyle",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1600&auto=format&fit=crop",
    category: "Lifestyle & Family",
  },
];

export default function TogetherSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSlide = (offset: number) =>
    slides[(activeIndex + offset) % slides.length];

  const visibleSlides = [getSlide(0), getSlide(1), getSlide(2)];

  return (
    <section className="relative bg-[#36454F] py-8 md:py-12 overflow-hidden -mt-[110px] md:-mt-[120px] z-10">

      {/* Ambient splash glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#20B2AA]/15 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#CC4125]/15 blur-3xl rounded-full pointer-events-none" />

      {/* OUTER WRAPPER */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 pt-28 md:pt-36">

        {/* IMAGE GRID */}
        <div className="relative rounded-[24px] md:rounded-[36px] overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.35)] mt-6 md:mt-10">

          {/* INDICATORS */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-40 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 md:h-2.5 rounded-full transition-all duration-500 ${
                  index === activeIndex
                    ? "w-8 md:w-10 bg-[#F5DEB3]"
                    : "w-2 md:w-2.5 bg-[#F5DEB3]/40 hover:bg-[#F5DEB3]"
                }`}
              />
            ))}
          </div>

          {/* MOBILE LAYOUT */}
          <div className="lg:hidden flex flex-col">

            {/* Main image — no overlapping card */}
            <div className="relative w-full h-[280px] sm:h-[360px]">
              {slides.map((slide, index) => (
                <div
                  key={slide.image}
                  className={`absolute inset-0 transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    index === activeIndex
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-110 z-0"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/10" />

                  {/* Category badge — top-left, well clear of indicators */}
                  <div className="absolute top-4 left-4 z-20">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-[#F5DEB3] text-xs tracking-wide font-bold border border-white/10 ${caveat.className}`}
                    >
                      {slide.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* "Let's Come Together" card — full width, below image on mobile */}
            <div className="relative bg-[#2a3a42] border-t border-white/10 px-5 py-6 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#20B2AA]/20 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-[#CC4125]/20 blur-3xl rounded-full pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between gap-4">
                <div>
                  <span
                    className={`block text-[#20B2AA] text-xl font-bold ${quicksand.className}`}
                  >
                    Let&apos;s Come
                  </span>
                  <h2
                    className={`text-[#F5DEB3] text-[32px] font-black uppercase leading-[0.95] tracking-tight ${quicksand.className}`}
                  >
                    Together
                  </h2>
                  <div className="w-12 h-[3px] bg-[#20B2AA] mt-3" />
                </div>
                <ChevronDown
                  className="text-[#20B2AA] animate-bounce shrink-0"
                  size={32}
                  strokeWidth={2.5}
                />
              </div>
            </div>

            {/* Right stack — horizontal pair on mobile */}
            <div className="grid grid-cols-2 h-[160px] sm:h-[200px] border-t border-white/10">
              {[1, 2].map((offset) => (
                <div
                  key={offset}
                  className={`relative overflow-hidden ${offset === 2 ? "border-l border-white/10" : ""}`}
                >
                  {slides.map((slide, index) => {
                    const active =
                      index === (activeIndex + offset) % slides.length;
                    return (
                      <div
                        key={slide.image}
                        className={`absolute inset-0 transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          active
                            ? "opacity-100 scale-100 z-10"
                            : "opacity-0 scale-110 z-0"
                        }`}
                      >
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="absolute bottom-3 left-3 z-20">
                          <span
                            className={`px-2 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] tracking-wide font-bold border border-white/10 ${caveat.className}`}
                          >
                            {slide.category}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP LAYOUT (unchanged) */}
          <div className="hidden lg:grid grid-cols-12 min-h-[680px]">

            {/* LEFT MAIN IMAGE */}
            <div className="relative col-span-7 min-h-[680px]">
              {slides.map((slide, index) => (
                <div
                  key={slide.image}
                  className={`absolute inset-0 transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    index === activeIndex
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-110 z-0"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
                  <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-[#20B2AA]/20 blur-3xl rounded-full" />
                </div>
              ))}

              {/* FLOATING TEXT PANEL — desktop only */}
              <div className="absolute z-30 left-8 bottom-8 bg-[#36454F]/90 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 w-[380px] shadow-2xl overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#20B2AA]/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#CC4125]/20 blur-3xl rounded-full" />

                <div className="relative z-10">
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-[#F5DEB3] text-sm tracking-wide font-bold border border-white/10 ${caveat.className}`}
                    >
                      {slides[activeIndex].category}
                    </span>
                  </div>

                  <span
                    className={`block text-[#20B2AA] text-3xl font-bold ${quicksand.className}`}
                  >
                    Let&apos;s Come
                  </span>
                  <h2
                    className={`text-[#F5DEB3] text-[50px] font-black uppercase leading-[0.95] tracking-tight mt-1 ${quicksand.className}`}
                  >
                    Together
                  </h2>

                  <div className="w-16 h-[3px] bg-[#20B2AA] mt-5 mb-5" />

                  <div className="mt-5 flex justify-center">
                    <ChevronDown
                      className="text-[#20B2AA] animate-bounce"
                      size={36}
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT STACK — desktop */}
            <div className="col-span-5 grid grid-cols-2 min-h-[680px]">
              {[1, 2].map((offset) => (
                <div
                  key={offset}
                  className="relative overflow-hidden border-white/5"
                >
                  {slides.map((slide, index) => {
                    const active =
                      index === (activeIndex + offset) % slides.length;
                    return (
                      <div
                        key={slide.image}
                        className={`absolute inset-0 transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          active
                            ? "opacity-100 scale-100 z-10"
                            : "opacity-0 scale-110 z-0"
                        }`}
                      >
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/25" />
                        <div className="absolute top-4 left-4 z-20">
                          <span
                            className={`px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-xs tracking-wide font-bold border border-white/10 ${caveat.className}`}
                          >
                            {slide.category}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM CONTENT */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 px-2 md:px-4 py-8 md:py-14">
            {visibleSlides.map((item, index) => (
              <div
                key={`${item.title}-${activeIndex}`}
                className={`relative ${
                  index !== 0
                    ? "lg:border-l lg:border-[#F5DEB3]/15 lg:pl-10 border-t border-[#F5DEB3]/10 pt-6 lg:pt-0 lg:border-t-0"
                    : ""
                }`}
              >
                <div className="animate-[fadeIn_0.8s_ease]">
                  <p
                    className={`text-[#20B2AA] text-xl md:text-2xl mb-2 md:mb-3 font-bold ${caveat.className}`}
                  >
                    {item.category}
                  </p>

                  <h3
                    className={`text-[#F5DEB3] text-2xl md:text-3xl lg:text-4xl leading-tight mb-4 md:mb-5 font-bold ${quicksand.className}`}
                  >
                    {item.title}
                  </h3>

                  <div className="w-14 h-[2px] bg-[#CC4125] mb-4 md:mb-5" />

                  <p
                    className={`text-[#F5DEB3]/75 text-sm md:text-base lg:text-lg leading-relaxed max-w-[520px] ${caveat.className}`}
                  >
                    {item.description}
                  </p>

                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 mt-5 md:mt-6 text-[#CC4125] hover:text-[#20B2AA] font-semibold transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CENTER NOTCH */}
          <div className="absolute left-1/2 -bottom-[18px] -translate-x-1/2 w-0 h-0 border-l-[34px] border-r-[34px] border-t-[18px] border-l-transparent border-r-transparent border-t-[#36454F]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  );
}