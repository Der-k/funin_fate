"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Bebas_Neue, DM_Sans, Caveat, Quicksand } from "next/font/google";


const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/* ────────────────────────────────────────────────────────────────────────── */
/* Types */
/* ────────────────────────────────────────────────────────────────────────── */

interface FeaturedEvent {
  id: number;
  category: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  tag: string;
  image: string;
  thumbImage: string;
}

interface UpcomingEvent {
  id: number;
  title: string;
  date: string;
  category: string;
  color: string;
  image: string;
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Data */
/* ────────────────────────────────────────────────────────────────────────── */

const featuredEvents: FeaturedEvent[] = [
  {
    id: 1,
    category: "Community",
    title: "Fate Founders Day Festival",
    date: "June 14, 2025",
    time: "10:00 AM – 9:00 PM",
    venue: "Fate Community Park",
    description:
      "Our biggest annual celebration — live music, local vendors, carnival rides, fireworks, and the spirit of Fate all in one unforgettable day.",
    tag: "Free Entry",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80",
    thumbImage:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200&q=75",
  },
  {
    id: 2,
    category: "Farmers Market",
    title: "Saturday Morning Market",
    date: "Every Saturday",
    time: "7:00 AM – 12:00 PM",
    venue: "Town Square, Fate",
    description:
      "Fresh produce, artisan crafts, local baked goods, and live acoustic music every weekend. The heartbeat of our community.",
    tag: "Weekly",
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80",
    thumbImage:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=200&q=75",
  },
  {
    id: 3,
    category: "Outdoor",
    title: "Rock Wall Trail Half Marathon",
    date: "July 20, 2025",
    time: "6:30 AM Start",
    venue: "Rock Wall Sports Complex",
    description:
      "Lace up for the annual 13.1-mile run through scenic Fate trails. All skill levels welcome. Register now for early-bird pricing.",
    tag: "Register Now",
    image:
      "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200&q=80",
    thumbImage:
      "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=200&q=75",
  },
];

const upcomingEvents: UpcomingEvent[] = [
  {
    id: 1,
    title: "Summer Movie Nights",
    date: "Jun 7",
    category: "Family",
    color: "#E8A045",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=120&q=70",
  },
  {
    id: 2,
    title: "Food Truck Rodeo",
    date: "Jun 13",
    category: "Food & Drink",
    color: "#20B2AA",
    image:
      "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=120&q=70",
  },
  {
    id: 3,
    title: "Youth Art Exhibition",
    date: "Jun 18",
    category: "Arts",
    color: "#CC4125",
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=120&q=70",
  },
  {
    id: 4,
    title: "Community 5K Fun Run",
    date: "Jun 22",
    category: "Sports",
    color: "#20B2AA",
    image:
      "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=120&q=70",
  },
];

/* ────────────────────────────────────────────────────────────────────────── */
/* Decorative */
/* ────────────────────────────────────────────────────────────────────────── */

function SketchArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-7 h-3.5 ${className}`}
    >
      <path
        d="M2 7 C 9 6.5, 18 7, 27 7 M 21 2.5 C 24 4.5, 27 7, 21 11.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DiagonalRule() {
  return (
    <svg
      viewBox="0 0 120 4"
      fill="none"
      className="w-28 h-1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0"
        y1="2"
        x2="80"
        y2="2"
        stroke="#20B2AA"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="90"
        y1="2"
        x2="105"
        y2="2"
        stroke="#20B2AA"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="112"
        y1="2"
        x2="118"
        y2="2"
        stroke="#20B2AA"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Featured Tabs */
/* ────────────────────────────────────────────────────────────────────────── */

function FeaturedCard({
  event,
  isActive,
  onClick,
}: {
  event: FeaturedEvent;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden border-l-[3px] pl-5 py-5 pr-3 transition-all duration-500 text-left ${
        isActive
          ? "border-[#20B2AA] bg-white/[0.04]"
          : "border-white/10 hover:border-white/30"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] uppercase tracking-[0.28em] font-semibold"
              style={{
                color: isActive
                  ? "#20B2AA"
                  : "rgba(255,255,255,0.35)",
              }}
            >
              {event.category}
            </span>

            <span
              className="px-2 py-3 text-[9px] uppercase tracking-[0.18em] border"
              style={{
                borderColor: isActive
                  ? "rgba(32,178,170,0.25)"
                  : "rgba(255,255,255,0.08)",
                color: isActive
                  ? "#20B2AA"
                  : "rgba(255,255,255,0.3)",
              }}
            >
              {event.tag}
            </span>
          </div>

     <h3
  className={`${quicksand.className} text-xs font-normal leading-snug text-white/70`}
>
  {event.title}
</h3>
          <p className="mt-2 text-[12px] text-white/35">
            {event.date} · {event.venue}
          </p>
        </div>

        <div
          className="relative overflow-hidden shrink-0"
         style={{
  width: 48,
  height: 48,
            opacity: isActive ? 1 : 0.4,
          }}
        >
          <Image
            src={event.thumbImage}
            alt={event.title}
            fill
            className="object-cover"
            sizes="64px"
            unoptimized
          />
        </div>
      </div>
    </button>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Upcoming */
/* ────────────────────────────────────────────────────────────────────────── */

function UpcomingRow({ event }: { event: UpcomingEvent }) {
  return (
    <div className="group flex items-center gap-3 border-b border-white/[0.06] py-4 transition hover:bg-white/[0.03]">
      <div className="relative h-11 w-11 overflow-hidden shrink-0">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
          unoptimized
        />
      </div>

      <div className="w-12 shrink-0">
        <span
          className={`${bebas.className} text-lg`}
          style={{ color: event.color }}
        >
          {event.date}
        </span>
      </div>

      <p className="flex-1 text-sm text-white/65 group-hover:text-white/90 transition">
        {event.title}
      </p>

      <span className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-white/30">
        {event.category}
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Main */
/* ────────────────────────────────────────────────────────────────────────── */

export default function FateEventsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = featuredEvents[activeIndex];

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={containerRef}
      className={`relative overflow-visible ${dmSans.className}`}
      style={{
        background: "#0C1014",
      }}
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
          className="h-[42px] w-full opacity-30 blur-2xl"
          style={{
            background:
              "linear-gradient(90deg, rgba(32,178,170,0.35) 0%, rgba(204,65,37,0.35) 50%, rgba(245,222,179,0.25) 100%)",
          }}
        />
      </div>

      {/* ======================================== */}
      {/* BACKGROUND VIDEO                         */}
      {/* ======================================== */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover scale-110"
          style={{ opacity: 0.12 }}
        >
          <source
            src="/videos/fate-showcase.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* ======================================== */}
      {/* COLOR BLOBS                              */}
      {/* ======================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

        <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full bg-[#20B2AA]/10 blur-[130px]" />

        <div className="absolute bottom-0 right-0 w-[560px] h-[560px] rounded-full bg-[#CC4125]/10 blur-[120px]" />

      </div>

      {/* ======================================== */}
      {/* MAIN GRID                                */}
      {/* ======================================== */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.95fr_1.1fr]">

        {/* ======================================== */}
        {/* LEFT PANEL                               */}
        {/* ======================================== */}
        <div className="relative px-6 md:px-12 lg:px-16 py-24 border-r border-white/[0.07]">

          {/* Decorative */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#20B2AA]/10 blur-3xl" />

          {/* Eyebrow */}
          <div className="mb-10">
            <DiagonalRule />

            <p className={`mt-5 text-3xl md:text-4xl text-[#CC4125] ${caveat.className}`}>
  Discover What's Happening
</p>
          </div>

          {/* Heading */}
        <h2
  className={`${quicksand.className} leading-[0.9] uppercase mb-10 font-bold`}
  style={{
    fontSize: "clamp(4rem,8vw,7rem)",
    letterSpacing: "0.02em",
    color: "#F5DEB3",
  }}
>
            Events &
            <br />
            Experiences
          </h2>

          <p className={`max-w-xl text-white/50 text-lg leading-relaxed mb-14 ${caveat.className}`}>
            Discover concerts, community festivals, nightlife,
            outdoor experiences, local markets, and unforgettable
            moments designed around the spirit of Funinfate.
          </p>

          {/* Tabs */}
          <div className="flex flex-col gap-2">
            {featuredEvents.map((event) => (
              <FeaturedCard
                key={event.id}
                event={event}
                isActive={event.id === active.id}
                onClick={() => setActiveIndex(event.id - 1)}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12">
            <Link
              href="/events"
              className="group inline-flex items-center gap-3"
            >
              <span className="uppercase tracking-[0.24em] text-xs text-white/40 font-semibold">
                Explore Full Calendar
              </span>

              <span className="text-[#20B2AA] transition duration-300 group-hover:translate-x-1">
                <SketchArrow />
              </span>
            </Link>
          </div>
        </div>

        {/* ======================================== */}
        {/* RIGHT PANEL                              */}
        {/* ======================================== */}
        <div className="flex flex-col">

          {/* Hero Image */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden h-[420px] lg:h-[520px]"
          >
            <Image
              src={active.image}
              alt={active.title}
              fill
              priority
              unoptimized
              className="object-cover scale-[1.03]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1014] via-[#0C1014]/25 to-transparent" />

            <div className="absolute top-8 left-8 backdrop-blur-md bg-black/35 border border-white/10 px-5 py-3">
              <p className="text-xs uppercase tracking-[0.3em] text-[#20B2AA] font-semibold">
                {active.category}
              </p>
            </div>

            <div className="absolute bottom-8 left-8 max-w-2xl">

              <p
  className={`mb-3 text-[#CC4125] text-3xl md:text-4xl ${caveat.className}`}
>
                Featured Experience
              </p>

            <h3
  className={`${quicksand.className} leading-tight font-bold uppercase text-[#F5DEB3] text-3xl md:text-4xl lg:text-5xl`}
>
  {active.title}
</h3>
            </div>
          </motion.div>

          {/* Details */}
          <div className="flex-1 px-6 md:px-12 lg:px-14 py-12">

            {/* Meta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

              {[
                { label: "Date", value: active.date },
                { label: "Time", value: active.time },
                { label: "Venue", value: active.venue },
                { label: "Entry", value: active.tag },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 mb-2">
                    {item.label}
                  </p>

                  <p className="text-sm text-white/75 leading-relaxed">
                    {item.value}
                  </p>
                </div>
              ))}

            </div>

            <div className="w-full h-px bg-white/[0.07] mb-8" />

            {/* Description */}
            <p className="text-white/55 leading-relaxed text-lg max-w-3xl mb-10">
              {active.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-5">

              <Link
                href="/discover"
                className="
                  group relative overflow-hidden
                  inline-flex items-center justify-center gap-2
                  h-14 px-8
                  font-bold tracking-wide
                  transition-all duration-300
                "
                style={{
                  background:
                    "linear-gradient(135deg,#20B2AA 0%, #1cc8be 100%)",
                  color: "white",
                  boxShadow:
                    "0 12px 40px rgba(32,178,170,0.28)",
                }}
              >
                <span className="absolute inset-0 overflow-hidden">
                  <span className="absolute -left-10 top-0 h-full w-16 bg-white/20 blur-xl rotate-12 group-hover:left-[120%] transition-all duration-1000" />
                </span>

                <span className="relative z-10">
                  Explore Fate
                </span>

                <SketchArrow className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/events"
                className="
                  inline-flex items-center justify-center gap-2
                  h-14 px-8
                  border border-white/15
                  bg-white/[0.04]
                  text-white/90
                  backdrop-blur-md
                  transition-all duration-300
                  hover:bg-white/[0.08]
                "
              >
                View Events

                <SketchArrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

            </div>

          </div>

          {/* Upcoming */}
          <div className="border-t border-white/[0.08] bg-black/25">

            <div className="px-6 md:px-12 lg:px-14 py-8">

              <div className="flex items-center justify-between mb-5">

                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/25 mb-2">
                    Coming Up
                  </p>

                 <h4
  className={`${quicksand.className} text-4xl text-[#F5DEB3] uppercase font-bold`}
>
                    Upcoming Events
                  </h4>
                </div>

                <Link
                  href="/events"
                  className="hidden md:flex items-center gap-3 text-[#20B2AA] uppercase tracking-[0.22em] text-xs font-semibold"
                >
                  Full Calendar
                  <SketchArrow />
                </Link>

              </div>

              <div className="flex flex-col">
                {upcomingEvents.map((event) => (
                  <UpcomingRow
                    key={event.id}
                    event={event}
                  />
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ======================================== */}
      {/* BOTTOM GRADIENT LINE                     */}
      {/* ======================================== */}
      <div
        className="relative z-20 h-[3px]"
        style={{
          background:
            "linear-gradient(to right, #20B2AA, #1cc8be 35%, #CC4125 70%, transparent)",
        }}
      />

      {/* ======================================== */}
      {/* TORN PAPER TRANSITION                    */}
      {/* ======================================== */}
      <div className="absolute -bottom-[110px] left-0 w-full z-30 pointer-events-none">

        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="block w-full h-[160px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>

            <filter id="paperDistort">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012"
                numOctaves="3"
                seed="12"
                result="noise"
              />

              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="26"
              />
            </filter>

            <filter
              id="paperShadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="180%"
            >
              <feDropShadow
                dx="0"
                dy="12"
                stdDeviation="12"
                floodColor="#000000"
                floodOpacity="0.14"
              />
            </filter>

          </defs>

          <path
            d="
              M0,0
              L0,70

              C90,120 170,20 250,75
              C330,130 420,25 510,80
              C600,135 700,30 790,90
              C880,145 980,35 1070,85
              C1160,135 1260,40 1340,90
              C1390,120 1420,100 1440,80

              L1440,0
              Z
            "
            fill="#0C1014"
            filter="url(#paperShadow)"
          />

          <path
            d="
              M0,70

              C90,120 170,20 250,75
              C330,130 420,25 510,80
              C600,135 700,30 790,90
              C880,145 980,35 1070,85
              C1160,135 1260,40 1340,90
              C1390,120 1420,100 1440,80
            "
            fill="none"
            stroke="#11181f"
            strokeWidth="24"
            strokeLinecap="round"
            filter="url(#paperDistort)"
          />
        </svg>

      </div>
    </section>
  );
}