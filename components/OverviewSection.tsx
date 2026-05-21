"use client";

import Image from "next/image";
import Link from "next/link";
import { Caveat, Quicksand } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function OverviewSection() {
  return (
    <section className="relative bg-[#faf8f4] pt-24 pb-24 overflow-visible z-20">

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
          className="h-[42px] w-full opacity-40 blur-2xl"
          style={{
            background:
              "linear-gradient(90deg, rgba(32,178,170,0.35) 0%, rgba(204,65,37,0.35) 50%, rgba(245,222,179,0.35) 100%)",
          }}
        />
      </div>

      {/* ======================================== */}
      {/* BACKGROUND DECOR                        */}
      {/* ======================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#20B2AA]/5 blur-3xl" />

        <div className="absolute -bottom-20 -left-20 w-[420px] h-[420px] rounded-full bg-[#CC4125]/5 blur-3xl" />
      </div>

      {/* ======================================== */}
      {/* MAIN WRAPPER                            */}
      {/* ======================================== */}
      <div className="relative max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* IMAGE */}
          <div className="relative">

            <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-[#20B2AA]/10 blur-3xl" />

            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#111111]/8 rounded-[36px]" />

            <div className="relative overflow-hidden rounded-[32px] h-[500px] md:h-[680px] shadow-[0_30px_100px_rgba(0,0,0,0.12)]">

              <Image
                src="/images/overview.jpg"
                alt="Fun in Fate"
                fill
                priority
                className="object-cover transition-transform duration-[1800ms] ease-out hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

              <div className="absolute top-6 left-6 z-20 backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-5 py-3">
                <p className="text-white text-sm tracking-[0.25em] uppercase font-medium">
                  Funinfate
                </p>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative z-10">

            <p className={`text-[#CC4125] text-3xl md:text-4xl mb-5 ${caveat.className}`}>
              Welcome to Fun in Fate
            </p>

            <h2
  className={`text-[#111111] text-5xl md:text-7xl xl:text-[7rem] font-black uppercase tracking-tight leading-[0.9] mb-8 ${quicksand.className}`}
>
              Explore
              <br />
              Fate
            </h2>

           <p className={`text-[#4a4a4a] text-xl md:text-[1.9rem] leading-relaxed max-w-2xl mb-12 ${caveat.className}`}>
              Fun in Fate is your gateway to unforgettable local experiences,
              vibrant events, entertainment, dining, culture, and community
              moments.
            </p>

            <div className="space-y-5 mb-14">

              {[
                "Live events & local entertainment",
                "Restaurants, cafés & nightlife",
                "Family experiences & attractions",
                "Community stories & destinations",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">

                  <div className="relative flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#20B2AA]" />
                    <div className="absolute w-6 h-6 rounded-full border border-[#20B2AA]/30" />
                  </div>

                  <p
  className={`text-[#111111] text-lg md:text-xl font-medium ${caveat.className}`}
>
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-5">

              <Link
                href="/discover"
                className={`group relative inline-flex items-center justify-center h-14 px-8 overflow-hidden bg-[#111111] text-white uppercase tracking-[0.18em] text-sm font-semibold ${quicksand.className}`}
              >
                <span className="absolute inset-0 bg-[#20B2AA] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                <span className="relative z-10">Explore More</span>
              </Link>

              <Link
                href="/events"
                className={`inline-flex items-center justify-center h-14 px-8 border border-[#111111] text-[#111111] uppercase tracking-[0.18em] text-sm font-semibold hover:bg-[#111111] hover:text-white transition-all duration-300 ${quicksand.className}`}
              >
                View Events
              </Link>

            </div>
          </div>

        </div>
      </div>

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
      {/* organic paper distortion */}
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

      {/* soft paper shadow */}
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

    {/* PAPER BODY */}
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
      fill="#faf8f4"
      filter="url(#paperShadow)"
    />

    {/* ROUGH TORN EDGE */}
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
      stroke="#f4eee6"
      strokeWidth="24"
      strokeLinecap="round"
      filter="url(#paperDistort)"
    />
  </svg>
</div>
    </section>
  );
}