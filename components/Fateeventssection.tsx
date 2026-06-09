"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// ─── Palette ──────────────────────────────────────────────────────────────────
const TEAL    = "#20B2AA";
const RUST    = "#CC4125";
const CREAM   = "#F5DEB3";
const SLATE   = "#36454F";

// ─── Data ─────────────────────────────────────────────────────────────────────
const events = [
  {
    title: "Neon Rooftop Nights",
    category: "Music & Nightlife",
    date: "JUL 18",
    location: "Skyline District",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Fate Street Food Carnival",
    category: "Food Festival",
    date: "AUG 02",
    location: "Old Town Market",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Sunset Lantern Festival",
    category: "Culture",
    date: "SEP 11",
    location: "Riverwalk Gardens",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Midnight Art Parade",
    category: "Creative Arts",
    date: "OCT 05",
    location: "Central Avenue",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1600&auto=format&fit=crop",
  },
];

// ─── Event Card ───────────────────────────────────────────────────────────────
function EventCard({ event }: { event: (typeof events)[0] }) {
  return (
    <div className="group relative overflow-hidden border border-white/10 bg-white/5">
      {/* Image */}
      <div className="relative h-[420px] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-[1400ms] group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Teal top-edge glow on hover — matches site system */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{
            background: `linear-gradient(to right, transparent, ${TEAL}, transparent)`,
          }}
        />

        {/* Floating category pill */}
        <div className="absolute left-5 top-5 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
          <p
            className={`${quicksand.className} text-xs font-semibold uppercase tracking-[0.2em] text-white`}
          >
            {event.category}
          </p>
        </div>

        {/* Date badge — RUST accent */}
        <div
          className="absolute right-5 top-5 flex h-20 w-20 flex-col items-center justify-center shadow-2xl"
          style={{ background: RUST }}
        >
          <span
            className={`${quicksand.className} text-3xl font-black leading-none text-white`}
          >
            {event.date.split(" ")[1]}
          </span>
          <span
            className={`${quicksand.className} text-xs font-bold uppercase tracking-[0.18em] text-white/80`}
          >
            {event.date.split(" ")[0]}
          </span>
        </div>

        {/* Card content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
          <h3
            className={`${quicksand.className} text-3xl font-black uppercase leading-[0.95] text-white md:text-4xl`}
          >
            {event.title}
          </h3>

          <div
            className={`${quicksand.className} mt-4 flex flex-wrap gap-5 text-sm text-white/70`}
          >
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" style={{ color: TEAL }} />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" style={{ color: TEAL }} />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Per-card CTA — CREAM text ghost button (inline, subtle) */}
          <button
            className={`${quicksand.className} group/btn mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:gap-4`}
            style={{ color: CREAM }}
          >
            View Event
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function EventsSection() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: SLATE }}
    >
      {/* Background glows */}
      <div
        className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full blur-3xl"
        style={{ background: `${TEAL}25` }}
      />
      <div
        className="absolute bottom-[-160px] right-[-100px] h-[300px] w-[300px] rounded-full blur-3xl"
        style={{ background: `${CREAM}12` }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">

        {/* ══ STANDARDISED SECTION HEADING ══ */}
        <div className="mb-10 sm:mb-16 max-w-3xl">
          {/* Rust dot + label — cream tint on dark bg */}
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full" style={{ background: RUST }} />
            <p
              className={`text-sm sm:text-base uppercase tracking-[0.25em] sm:tracking-[0.35em] ${quicksand.className}`}
              style={{ color: "rgba(245,222,179,0.5)" }}
            >
              City Calendar
            </p>
          </div>

          {/* Main title — cream on dark */}
          <h2
            className={`mt-4 text-4xl sm:text-5xl font-black uppercase leading-[0.95] md:text-7xl ${quicksand.className}`}
            style={{ color: CREAM }}
          >
            Events
            <br />
            in Fate.
          </h2>

          {/* Gradient bar */}
          <div
            className="mt-4 h-[3px] w-20 sm:w-24 rounded-full"
            style={{
              background: `linear-gradient(to right, ${RUST}, ${TEAL}, transparent)`,
            }}
          />

          {/* Description */}
          <p
            className={`mt-5 sm:mt-6 text-xl sm:text-2xl leading-relaxed ${quicksand.className}`}
            style={{ color: "rgba(245,222,179,0.65)" }}
          >
            From rooftop concerts and immersive art shows to food carnivals
            and cultural festivals — Fate transforms every week into a new
            experience worth chasing.
          </p>

          {/* ── STANDARDISED BUTTONS — inverted for dark bg ── */}
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-5">
            {/* Primary: cream bg, teal slide-in hover */}
            <Link
              href="/events"
              className={`group relative inline-flex items-center justify-center h-12 md:h-14 px-7 md:px-8 overflow-hidden uppercase tracking-[0.18em] text-xs md:text-sm font-semibold ${quicksand.className}`}
              style={{ background: CREAM, color: SLATE }}
            >
              <span
                className="absolute inset-0 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: TEAL }}
              />
              <span className="relative z-10">Explore All Events</span>
            </Link>

            {/* Secondary: cream border ghost */}
            <Link
              href="/calendar"
              className={`inline-flex items-center justify-center h-12 md:h-14 px-7 md:px-8 uppercase tracking-[0.18em] text-xs md:text-sm font-semibold transition-all duration-300 ${quicksand.className}`}
              style={{
                border: `1px solid ${CREAM}`,
                color: CREAM,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = CREAM;
                (e.currentTarget as HTMLAnchorElement).style.color = SLATE;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = CREAM;
              }}
            >
              View Calendar
            </Link>
          </div>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}