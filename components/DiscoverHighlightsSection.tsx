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

  {/* TORN PAPER EDGE HERE */}

  <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 md:pt-24">

</div>
      {/* Ambient splash glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#20B2AA]/15 blur-3xl rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#CC4125]/15 blur-3xl rounded-full" />

      {/* OUTER WRAPPER */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 pt-28 md:pt-36">

        {/* IMAGE GRID */}
        <div className="relative rounded-[36px] overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.35)] mt-6 md:mt-10">

          {/* INDICATORS */}
          <div className="absolute top-6 right-6 z-40 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  index === activeIndex
                    ? "w-10 bg-[#F5DEB3]"
                    : "w-2.5 bg-[#F5DEB3]/40 hover:bg-[#F5DEB3]"
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">

            {/* LEFT MAIN IMAGE */}
            <div className="relative lg:col-span-7 min-h-[420px] lg:min-h-[680px]">

              {slides.map((slide, index) => (
                <div
                  key={slide.image}
                  className={`absolute inset-0 transition-all duration-[1800ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${
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

                  {/* cinematic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />

                  {/* splash glow */}
                  <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-[#20B2AA]/20 blur-3xl rounded-full" />
                </div>
              ))}

              {/* FLOATING TEXT PANEL */}
              <div className="absolute z-30 left-5 bottom-5 md:left-8 md:bottom-8 bg-[#36454F]/90 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 md:p-8 w-[290px] md:w-[380px] shadow-2xl overflow-hidden">

                {/* decorative glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#20B2AA]/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#CC4125]/20 blur-3xl rounded-full" />

                <div className="relative z-10">

                  {/* category */}
                  <div className="mb-4">
                    <span
                      className={`
                        inline-flex items-center
                        px-4 py-2 rounded-full
                        bg-white/10 backdrop-blur-md
                        text-[#F5DEB3]
                        text-sm tracking-wide font-bold
                        border border-white/10
                        ${caveat.className}
                      `}
                    >
                      {slides[activeIndex].category}
                    </span>
                  </div>

                  <span
  className={`block text-[#20B2AA] text-2xl md:text-3xl font-bold ${quicksand.className}`}
>
  Let&apos;s Come
</span>

<h2
  className={`text-[#F5DEB3] text-[34px] md:text-[50px] font-black uppercase leading-[0.95] tracking-tight mt-1 ${quicksand.className}`}
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

            {/* RIGHT STACK */}
            <div className="lg:col-span-5 grid grid-cols-2 min-h-[260px] lg:min-h-[680px]">

              {[1, 2].map((offset) => (
                <div
                  key={offset}
                  className="relative overflow-hidden border-t lg:border-t-0 border-white/5"
                >
                  {slides.map((slide, index) => {
                    const active =
                      index === (activeIndex + offset) % slides.length;

                    return (
                      <div
                        key={slide.image}
                        className={`absolute inset-0 transition-all duration-[1800ms]
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                        ${
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

                        {/* overlays */}
                        <div className="absolute inset-0 bg-black/25" />

                        {/* floating category */}
                        <div className="absolute top-4 left-4 z-20">
                          <span
                            className={`
                              px-3 py-1.5 rounded-full
                              bg-black/40 backdrop-blur-md
                              text-white text-xs tracking-wide font-bold
                              border border-white/10
                              ${caveat.className}
                            `}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 px-2 md:px-4 py-10 md:py-14">

            {visibleSlides.map((item, index) => (
              <div
                key={`${item.title}-${activeIndex}`}
                className={`relative ${
                  index !== 0
                    ? "lg:border-l lg:border-[#F5DEB3]/15 lg:pl-10"
                    : ""
                }`}
              >
                <div className="animate-[fadeIn_0.8s_ease]">

                  {/* mini category */}
                  <p
                    className={`text-[#20B2AA] text-2xl mb-3 font-bold ${caveat.className}`}
                  >
                    {item.category}
                  </p>

                  <h3
                    className={`text-[#F5DEB3] text-3xl md:text-4xl leading-tight mb-5 font-bold ${quicksand.className}`}
                  >
                    {item.title}
                  </h3>

                  <div className="w-14 h-[2px] bg-[#CC4125] mb-5" />

                  <p
  className={`text-[#F5DEB3]/75 text-base md:text-lg leading-relaxed max-w-[520px] ${caveat.className}`}
>
                    {item.description}
                  </p>

                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 mt-6 text-[#CC4125] hover:text-[#20B2AA] font-semibold transition-colors"
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