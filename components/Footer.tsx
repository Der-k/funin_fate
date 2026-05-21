"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">

      {/* =========================
          TOP CTA SECTION
      ========================= */}
      <section className="relative overflow-hidden bg-[#F5DEB3] py-24 px-6">

        {/* Abstract blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[5%] w-[240px] h-[240px] rounded-full bg-[#CC4125]/18 blur-3xl" />
          <div className="absolute bottom-[-20%] right-[8%] w-[340px] h-[340px] rounded-full bg-[#20B2AA]/18 blur-3xl" />
          <div className="absolute top-[20%] right-[25%] w-[180px] h-[180px] rounded-full bg-[#36454F]/10 blur-2xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">

          {/* Handwritten eyebrow — matches "Welcome to Fun in Fate" pattern */}
          <p className={`text-[#CC4125] text-3xl md:text-4xl mb-4 ${caveat.className}`}>
            Stay Connected
          </p>

          {/* Main heading — font-black uppercase, same scale as all sections */}
          <h2 className="text-[#111111] text-5xl md:text-7xl font-black uppercase leading-[0.95] tracking-tight mb-10">
            Become a
            <br />
            Fate Insider
          </h2>

          {/* CTA — exact OverviewSection "Explore More" button */}
          <button className="
            inline-flex items-center justify-center
            h-14 px-10
            bg-[#111111] text-white
            uppercase tracking-[0.18em] text-sm font-semibold
            hover:bg-[#20B2AA]
            transition-all duration-300
          ">
            Sign Up
          </button>

        </div>
      </section>

      {/* =========================
          MAIN FOOTER
      ========================= */}
      <section className="bg-[#36454f] px-6 md:px-12 lg:px-16 py-20">
        <div className="max-w-[1700px] mx-auto">

          {/* TOP ROW */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-14 mb-16">

            {/* Logo + description */}
            <div>
              <Link href="/" className="inline-block">
                <h2 className="text-[#20B2AA] text-7xl md:text-8xl font-black tracking-tight leading-none">
                  Fate
                </h2>
              </Link>

              {/* Description — Caveat, matches section body style */}
              <p className={`text-white/60 mt-5 max-w-md text-xl md:text-2xl leading-relaxed ${caveat.className}`}>
                Discover restaurants, nightlife, shopping,
                live events, attractions, and unforgettable
                local experiences throughout Fate.
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-5">
              {[
                { icon: <Icons.Camera size={18} /> },
                { icon: <Icons.Users size={18} /> },
                { icon: <Icons.Play size={18} /> },
                { icon: <Icons.MessageCircle size={18} /> },
              ].map((item, index) => (
                <Link
                  key={index}
                  href="/"
                  className="
                    flex items-center justify-center
                    w-11 h-11 rounded-full
                    border border-white/15
                    text-white/70
                    hover:text-white hover:border-[#20B2AA] hover:bg-[#20B2AA]/10
                    transition-all duration-300
                  "
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* NAV LINKS — Caveat, larger to match system scale */}
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-white/10 pt-10">
            {[
              "Explore?","Discover", "Eat & Drink", "Events", "Accomodation & Stay", "News"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-7">
                <Link
                  href="/"
                  className={`
                    group relative
                    text-white/80 text-xl md:text-2xl
                    hover:text-white transition-colors
                    ${caveat.className}
                  `}
                >
                  {item}
                  <span className="
                    absolute left-0 -bottom-1
                    h-[1px] w-0 bg-[#20B2AA]
                    transition-all duration-300
                    group-hover:w-full
                  " />
                </Link>

                {index !== 7 && (
                  <span className={`text-[#CC4125] text-xl ${caveat.className}`}>//</span>
                )}
              </div>
            ))}
          </div>

          {/* BOTTOM ROW */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mt-14 pt-8 border-t border-white/10">

            {/* Copyright — Caveat */}
            <div className={`flex items-center gap-3 text-white/45 text-lg ${caveat.className}`}>
              <Icons.MapPin size={15} />
              <p>© 2026 Visit Fate. All rights reserved.</p>
            </div>

            {/* Legal links — Caveat */}
            <div className="flex items-center gap-8">
              {["About Us", "Contact", "Privacy Policy"].map((label) => (
                <Link
                  key={label}
                  href={`/${label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`text-white/55 hover:text-white text-lg transition-colors ${caveat.className}`}
                >
                  {label}
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>
    </footer>
  );
}