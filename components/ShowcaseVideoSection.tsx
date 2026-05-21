"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});



function SketchWordUnderline({
  color = "#20B2AA",
}: {
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-0 w-full"
      style={{ bottom: "-4px", height: "10px" }}
      preserveAspectRatio="none"
    >
      <motion.path
        d="M3 6 C 35 3, 80 8, 130 5 C 180 2, 225 7, 257 5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
          delay: 0.5,
        }}
      />
    </svg>
  );
}

function SketchArrow({
  className = "",
}: {
  className?: string;
}) {
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



/* ────────────────────────────────────────────────────────────────────────── */
/* Stat Item */
/* ────────────────────────────────────────────────────────────────────────── */

function StatItem({
  number,
  label,
  delay,
}: {
  number: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className="relative"
    >
      {/* Splash glow */}
      <div className="absolute -top-5 left-0 w-20 h-20 bg-[#20B2AA]/10 blur-2xl rounded-full" />

      <h3
        className="relative font-bold leading-none mb-1"
        style={{
          color: "rgba(245,222,179,0.95)",
          fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
        }}
      >
        {number}
      </h3>

      <p
        className="relative font-semibold"
        style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: "var(--sketch-sm)",
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}



/* ────────────────────────────────────────────────────────────────────────── */
/* Main Section */
/* ────────────────────────────────────────────────────────────────────────── */

export default function ShowcaseVideoSection() {
  return (
    <section
      className={`relative min-h-[60vh] py-20 overflow-hidden ${caveat.className}`}
    >

      {/* ───────────────── Video Background ───────────────── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover scale-[1.03]"
      >
        <source
          src="/videos/fate-showcase.mp4"
          type="video/mp4"
        />
      </video>

      {/* ───────────────── Dark Cinematic Overlay ───────────────── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/35" />

      {/* ───────────────── Splash Color Overlay ───────────────── */}
      <div className="absolute inset-0 overflow-hidden">

        {/* teal splash */}
        <div className="absolute top-[-10%] left-[-8%] w-[420px] h-[420px] bg-[#20B2AA]/20 blur-3xl rounded-full" />

        {/* orange splash */}
        <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] bg-[#CC4125]/20 blur-3xl rounded-full" />

        {/* center glow */}
        <div className="absolute top-[30%] left-[45%] w-[350px] h-[350px] bg-white/5 blur-3xl rounded-full" />
      </div>

      {/* ───────────────── Vignette ───────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.58)_100%)]" />

      {/* ───────────────── Floating Decorative Lines ───────────────── */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-20 hidden lg:block opacity-30"
      >
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <path
            d="M10 90 C 45 30, 120 30, 170 90"
            stroke="#20B2AA"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 120 C 60 70, 120 75, 165 125"
            stroke="#ffffff"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* ───────────────── Content ───────────────── */}
      <div className="relative z-10 flex items-center h-full px-6 md:px-16 lg:px-[12vw]">

        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl relative"
        >

          {/* subtle splash behind content */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#20B2AA]/10 blur-3xl rounded-full" />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-7 relative">
        

            <p
              className="uppercase font-semibold tracking-[0.3em]"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "var(--sketch-xs)",
              }}
            >
            Fate Events
            </p>
          </div>

          {/* Heading */}
         <h2
  className="text-white font-bold leading-[1.0] mb-7 relative"
  style={{
    fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
  }}
>
  Experience the{" "}
  <span className="relative inline-block">
    Biggest Events
    <SketchWordUnderline color="#20B2AA" />
  </span>

  <br />

  Happening Across
  <br />
  Fate
</h2>

          {/* Description */}
       <p
  className="leading-relaxed max-w-2xl"
  style={{
    color: "rgba(255,255,255,0.74)",
    fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
  }}
>
  From live concerts and cultural festivals to nightlife experiences,
  food gatherings, seasonal celebrations, and community events —
  discover what’s happening in Fate every week.
</p>

        </motion.div>
      </div>

     
    </section>
  );
}