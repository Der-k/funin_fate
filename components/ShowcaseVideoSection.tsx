"use client";

import { Caveat } from "next/font/google";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

function SketchWordUnderline({ color = "#20B2AA" }: { color?: string }) {
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
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
      />
    </svg>
  );
}

function StatItem({ number, label, delay }: { number: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className="relative"
    >
      <div className="absolute -top-5 left-0 w-20 h-20 bg-[#20B2AA]/10 blur-2xl rounded-full" />
      <h3
        className="relative font-bold leading-none mb-1"
        style={{ color: "rgba(245,222,179,0.95)", fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
      >
        {number}
      </h3>
      <p className="relative font-semibold" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
        {label}
      </p>
    </motion.div>
  );
}

export default function ShowcaseVideoSection() {
  const imageRef = useRef<HTMLDivElement>(null);

  // Track scroll relative to the image wrapper itself
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  // Image moves up slowly as you scroll — smooth spring
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const bgY  = useSpring(rawY, { stiffness: 40, damping: 30, mass: 1 });

  // Text fades in as section enters viewport
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [0, 1, 1, 0]);
  const textY       = useTransform(scrollYProgress, [0.05, 0.2], ["30px", "0px"]);
  const statsOpacity = useTransform(scrollYProgress, [0.15, 0.32], [0, 1]);
  const statsX       = useTransform(scrollYProgress, [0.15, 0.32], ["24px", "0px"]);

  return (
    <section className={`relative ${caveat.className}`}>
      {/*
        ONE wrapper. overflow-hidden clips everything.
        Height is just 60vh — short, as requested.
        No sticky, no nested wrappers, no math.
      */}
      <div
        ref={imageRef}
        className="relative overflow-hidden"
        style={{ height: "60vh" }}
      >
        {/* ── Parallax image — taller than container so shift never reveals edges ── */}
        <motion.div
          className="absolute inset-x-0"
          style={{
            y: bgY,
            top: "-10%",
            height: "120%",   // 20% extra = 10% bleed top + 10% bleed bottom
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=2400&q=80"
            alt="Fate Events"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* ── Dark overlay ── */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* ── Colour splashes ── */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-8%] w-[400px] h-[400px] bg-[#20B2AA]/15 blur-3xl rounded-full" />
          <div className="absolute bottom-[-15%] right-[-5%] w-[480px] h-[480px] bg-[#CC4125]/15 blur-3xl rounded-full" />
        </div>

        {/* ── Vignette ── */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]" />

        {/* ── Content ── */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-16 lg:px-[12vw]">

          <motion.div style={{ opacity: textOpacity, y: textY }} className="max-w-3xl">
            <p
              className="uppercase font-semibold tracking-[0.3em] mb-6"
              style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.72rem" }}
            >
              Fate Events
            </p>

            <h2
              className="text-white font-bold leading-[1.05] mb-6 relative"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
            >
              Experience the{" "}
              <span className="relative inline-block">
                Biggest Events
                <SketchWordUnderline color="#20B2AA" />
              </span>
              <br />
              Happening Across Fate
            </h2>

            <p
              className="leading-relaxed max-w-xl"
              style={{ color: "rgba(255,255,255,0.72)", fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)" }}
            >
              From live concerts and cultural festivals to nightlife experiences,
              food gatherings, seasonal celebrations, and community events —
              discover what's happening in Fate every week.
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: statsOpacity, x: statsX }}
            className="mt-12 flex gap-12 flex-wrap"
          >
            <StatItem number="200+" label="Events / Year" delay={0} />
            <StatItem number="50k+"  label="Attendees"    delay={0.1} />
            <StatItem number="12"    label="Venues"       delay={0.2} />
          </motion.div>
        </div>

        {/* ── Decorative floating lines ── */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-8 right-16 hidden lg:block opacity-20 z-20"
        >
          <svg width="160" height="160" viewBox="0 0 180 180" fill="none">
            <path d="M10 90 C 45 30, 120 30, 170 90" stroke="#20B2AA" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 120 C 60 70, 120 75, 165 125" stroke="#fff" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}