"use client";

import Image from "next/image";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { Caveat, DM_Sans, Bebas_Neue } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

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

export default function EventsSection() {
  return (
    <section className="relative overflow-hidden bg-[#0f1115] py-24 md:py-32">
      {/* Background glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[#20B2AA]/20 blur-3xl" />
      <div className="absolute bottom-[-160px] right-[-100px] h-[300px] w-[300px] rounded-full bg-[#F5DEB3]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Heading */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p
              className={`${caveat.className} mb-3 text-3xl text-[#20B2AA]`}
            >
              The city never sleeps
            </p>

            <h2
              className={`${bebas.className} text-6xl leading-[0.9] text-[#F5DEB3] md:text-8xl`}
            >
              EVENTS IN FATE
            </h2>

            <p
              className={`${dmSans.className} mt-6 text-base leading-relaxed text-white/70 md:text-lg`}
            >
              From rooftop concerts and immersive art shows to food carnivals
              and cultural festivals — Fate transforms every week into a new
              experience worth chasing.
            </p>
          </div>

          <button
            className={`${dmSans.className} group flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-[#20B2AA] hover:bg-[#20B2AA] hover:text-black`}
          >
            Explore All Events
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {events.map((event, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5"
            >
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

                {/* Floating category */}
                <div className="absolute left-5 top-5 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                  <p
                    className={`${dmSans.className} text-xs font-semibold uppercase tracking-[0.2em] text-white`}
                  >
                    {event.category}
                  </p>
                </div>

                {/* Date */}
                <div className="absolute right-5 top-5 flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-[#20B2AA] text-black shadow-2xl">
                  <span
                    className={`${bebas.className} text-3xl leading-none`}
                  >
                    {event.date.split(" ")[1]}
                  </span>
                  <span
                    className={`${dmSans.className} text-xs font-bold uppercase tracking-[0.18em]`}
                  >
                    {event.date.split(" ")[0]}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                  <h3
                    className={`${bebas.className} text-4xl leading-[0.9] text-white md:text-5xl`}
                  >
                    {event.title}
                  </h3>

                  <div
                    className={`${dmSans.className} mt-4 flex flex-wrap gap-5 text-sm text-white/80`}
                  >
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[#20B2AA]" />
                      <span>{event.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#20B2AA]" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <button
                    className={`${dmSans.className} mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#F5DEB3] transition-all duration-300 hover:gap-4`}
                  >
                    View Event
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}