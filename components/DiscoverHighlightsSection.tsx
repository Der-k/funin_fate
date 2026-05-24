"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Caveat, Quicksand } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "600", "700"] });
const quicksand = Quicksand({ subsets: ["latin"], weight: ["300", "400", "600", "700"] });

// Physical easing curves as constants for reuse
const EASE_OUT_EXPO   = "cubic-bezier(.16,1,.3,1)";    // fast start → gentle settle
const EASE_OUT_QUINT  = "cubic-bezier(.22,1,.36,1)";   // snappy, smooth landing
const EASE_OUT_BACK   = "cubic-bezier(.34,1.56,.64,1)"; // slight overshoot — tactile
const EASE_IN_OUT_CIRC = "cubic-bezier(.85,0,.15,1)";  // slow-slow — for ambient fades

const categories = [
  {
    title: "Top Experiences",
    tag: "Must-Do",
    description: "Immersive adventures and curated experiences shaping the identity of the city.",
    href: "/experiences",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
    accent: "#20B2AA",
  },
  {
    title: "Culture & Community",
    tag: "Local Life",
    description: "Meet creators, innovators, and communities driving the cultural pulse of Fate.",
    href: "/community",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
    accent: "#CC4125",
  },
  {
    title: "Weekend Energy",
    tag: "Events",
    description: "Events, nightlife, and weekend discoveries across the city.",
    href: "/events",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1600&auto=format&fit=crop",
    accent: "#F5DEB3",
  },
  {
    title: "Food & Drink",
    tag: "Dining",
    description: "Hidden kitchens, rooftop bars, and the flavors that define Fate's palate.",
    href: "/dining",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop",
    accent: "#E8A87C",
  },
  {
    title: "Art & Design",
    tag: "Creative",
    description: "Galleries, murals, studios, and the makers reshaping Fate's visual language.",
    href: "/art",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1600&auto=format&fit=crop",
    accent: "#B39DDB",
  },
  {
    title: "Outdoors & Nature",
    tag: "Escape",
    description: "Parks, trails, and green spaces where the city breathes and slows down.",
    href: "/outdoors",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1600&auto=format&fit=crop",
    accent: "#66BB6A",
  },
];

// Build a CSS transition string with physical easing
function phys(
  properties: string[],
  duration: string,
  easing: string,
  delay = "0ms"
) {
  return properties
    .map((p) => `${p} ${duration} ${easing} ${delay}`)
    .join(", ");
}

export default function DiscoverFateSection() {
  const [active, setActive] = useState(0);
  const [prev, setPrev]     = useState<number | null>(null);
  const activeCategory = categories[active];

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef  = useRef<HTMLDivElement | null>(null);

  // ── Card: 3-D tilt on mouse-move ──────────────────────────────────
  const handleCardMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, i: number) => {
      const el = cardRefs.current[i];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -5;
      const rotY = ((x - cx) / cx) * 7;
      const tx   = i === active ? "-4px" : "0px";
      el.style.transform  = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateX(${tx}) scale(1.02)`;
      // Ultra-tight tracking curve while moving — feels stuck to cursor
      el.style.transition = phys(["transform"], "80ms", EASE_OUT_EXPO);
    },
    [active]
  );

  const handleCardMouseLeave = useCallback(
    (i: number) => {
      const el = cardRefs.current[i];
      if (!el) return;
      el.style.transform = i === active ? "translateX(-4px)" : "none";
      // Springy settle on leave
      el.style.transition = phys(["transform"], "600ms", EASE_OUT_BACK);
    },
    [active]
  );

  // ── Hero: parallax tilt ───────────────────────────────────────────
  const handleHeroMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      const rotX = y * -4;
      const rotY = x *  5;
      el.style.transform  = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-28px)`;
      el.style.transition = phys(["transform"], "120ms", EASE_OUT_EXPO);
    },
    []
  );

  const handleHeroMouseLeave = useCallback(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.transform  = "translateY(-28px)";
    el.style.transition = phys(["transform"], "800ms", EASE_OUT_QUINT);
  }, []);

  // ── Active card selection ─────────────────────────────────────────
  const handleCardEnter = useCallback(
    (i: number) => {
      setPrev(active);
      setActive(i);
    },
    [active]
  );

  return (
    <section
      className="relative pt-24 pb-36 overflow-hidden"
      style={{ backgroundColor: "#0d1418" }}
    >

      {/* ── BACKGROUND LAYERS ──────────────────────────────────────── */}

      {/* Layer 1 — deep base */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(160deg, #0d1418 0%, #111c22 50%, #0a1218 100%)",
        }}
      />

      {/* Layer 2 — per-category reactive gradient
          Uses EASE_IN_OUT_CIRC for slow, cinematic cross-fades */}
      {categories.map((cat, i) => (
        <div
          key={cat.accent}
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: i === active ? 1 : 0,
            background: `
              radial-gradient(ellipse at top left,    ${cat.accent}40 0%,  transparent 45%),
              radial-gradient(ellipse at bottom right, ${cat.accent}28 0%, transparent 50%),
              radial-gradient(ellipse at 60% 20%,     ${cat.accent}18 0%, transparent 40%)
            `,
            // Stagger: outgoing fades fast, incoming blooms slowly
            transition: i === active
              ? `opacity 900ms ${EASE_IN_OUT_CIRC}`
              : `opacity 500ms ${EASE_OUT_QUINT}`,
          }}
        />
      ))}

      {/* Layer 3 — dark mid veil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,18,22,0.45) 0%, rgba(10,18,22,0.2) 50%, rgba(10,18,22,0.55) 100%)",
        }}
      />

      {/* Layer 4 — large accent glow orbs
          Each orb gets a different delay → they don't all move in lock-step */}
      <div
        className="absolute top-[-80px] left-[-80px] w-[650px] h-[650px] blur-[120px] rounded-full pointer-events-none"
        style={{
          backgroundColor: activeCategory.accent + "30",
          zIndex: 1,
          transition: phys(
            ["background-color", "opacity"],
            "1100ms",
            EASE_IN_OUT_CIRC,
            "0ms"
          ),
        }}
      />
      <div
        className="absolute bottom-[-100px] right-[-80px] w-[550px] h-[550px] blur-[100px] rounded-full pointer-events-none"
        style={{
          backgroundColor: activeCategory.accent + "22",
          zIndex: 1,
          transition: phys(
            ["background-color"],
            "1300ms",
            EASE_IN_OUT_CIRC,
            "80ms"  // ← stagger: trails the first orb
          ),
        }}
      />
      <div
        className="absolute top-[35%] left-[25%] w-[500px] h-[500px] blur-[90px] rounded-full pointer-events-none"
        style={{
          backgroundColor: activeCategory.accent + "18",
          zIndex: 1,
          transition: phys(
            ["background-color"],
            "1500ms",
            EASE_IN_OUT_CIRC,
            "160ms" // ← stagger: breathes last
          ),
        }}
      />

      {/* Noise / grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/noise.png')",
          opacity: 0.045,
          mixBlendMode: "soft-light",
          zIndex: 2,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
          zIndex: 2,
        }}
      />

      {/* ── FOREGROUND ATMOSPHERE ─────────────────────────────────── */}

      {/* Floating lines */}
      <div className="absolute top-[12%] left-[38%] w-40 h-px bg-white/[0.06] rotate-[14deg] pointer-events-none" style={{ zIndex: 3 }} />
      <div className="absolute top-[18%] left-[42%] w-24 h-px bg-white/[0.04] rotate-[14deg] pointer-events-none" style={{ zIndex: 3 }} />
      <div className="absolute top-[72%] right-[34%] w-56 h-px bg-white/[0.05] rotate-[-8deg] pointer-events-none" style={{ zIndex: 3 }} />
      <div className="absolute top-[80%] right-[38%] w-16 h-px bg-white/[0.03] rotate-[-8deg] pointer-events-none" style={{ zIndex: 3 }} />
      <div className="absolute top-[45%] left-[8%] w-20 h-px bg-white/[0.04] rotate-[75deg] pointer-events-none" style={{ zIndex: 3 }} />
      <div className="absolute top-[30%] right-[6%] w-12 h-px bg-white/[0.05] rotate-[60deg] pointer-events-none" style={{ zIndex: 3 }} />

      {/* Small blurred foreground orbs — each staggered delay */}
      <div
        className="absolute w-[180px] h-[180px] rounded-full blur-2xl pointer-events-none"
        style={{
          top: "8%", left: "55%",
          backgroundColor: activeCategory.accent + "18",
          zIndex: 3,
          transition: phys(["background-color"], "1000ms", EASE_IN_OUT_CIRC, "0ms"),
        }}
      />
      <div
        className="absolute w-[80px] h-[80px] rounded-full blur-xl pointer-events-none"
        style={{
          top: "55%", left: "4%",
          backgroundColor: activeCategory.accent + "22",
          zIndex: 3,
          transition: phys(["background-color"], "1000ms", EASE_IN_OUT_CIRC, "120ms"),
        }}
      />
      <div
        className="absolute w-[120px] h-[120px] rounded-full blur-2xl pointer-events-none"
        style={{
          bottom: "12%", right: "28%",
          backgroundColor: activeCategory.accent + "15",
          zIndex: 3,
          transition: phys(["background-color"], "1000ms", EASE_IN_OUT_CIRC, "240ms"),
        }}
      />

      {/* Particles */}
      <div className="absolute w-1 h-1 rounded-full bg-white/20 pointer-events-none" style={{ top: "22%", left: "31%", zIndex: 3 }} />
      <div className="absolute w-[3px] h-[3px] rounded-full bg-white/10 pointer-events-none" style={{ top: "34%", left: "62%", zIndex: 3 }} />
      <div className="absolute w-1 h-1 rounded-full bg-white/15 pointer-events-none" style={{ top: "60%", left: "18%", zIndex: 3 }} />
      <div className="absolute w-[3px] h-[3px] rounded-full bg-white/10 pointer-events-none" style={{ top: "15%", right: "22%", zIndex: 3 }} />
      <div
        className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
        style={{
          top: "42%", right: "18%",
          backgroundColor: activeCategory.accent + "88",
          zIndex: 3,
          transition: phys(["background-color"], "700ms", EASE_OUT_QUINT, "60ms"),
        }}
      />
      <div
        className="absolute w-1 h-1 rounded-full pointer-events-none"
        style={{
          top: "68%", left: "46%",
          backgroundColor: activeCategory.accent + "66",
          zIndex: 3,
          transition: phys(["background-color"], "700ms", EASE_OUT_QUINT, "100ms"),
        }}
      />

      {/* Rings */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 220, height: 220,
          top: "5%", right: "12%",
          border: "1px solid rgba(255,255,255,0.04)",
          zIndex: 3,
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 140, height: 140,
          top: "8%", right: "15.5%",
          border: "1px solid rgba(255,255,255,0.03)",
          zIndex: 3,
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 80, height: 80,
          bottom: "18%", left: "10%",
          border: `1px solid ${activeCategory.accent}33`,
          zIndex: 3,
          transition: phys(["border-color"], "800ms", EASE_OUT_QUINT),
        }}
      />

      {/* Editorial vertical number */}
      <p
        className={`${quicksand.className} absolute font-black pointer-events-none select-none`}
        style={{
          fontSize: "clamp(8rem, 16vw, 14rem)",
          top: "30%",
          right: "-2%",
          color: "rgba(255,255,255,0.018)",
          letterSpacing: "0.05em",
          lineHeight: 1,
          writingMode: "vertical-rl",
          zIndex: 3,
        }}
      >
        FATE
      </p>

      {/* Cross-hair details */}
      <div className="absolute pointer-events-none" style={{ top: "14%", left: "5%", zIndex: 3 }}>
        <div className="w-6 h-px bg-white/[0.08]" />
        <div className="w-px h-6 bg-white/[0.08]" style={{ marginTop: "-0.5px", marginLeft: "11px" }} />
      </div>
      <div className="absolute pointer-events-none" style={{ bottom: "22%", right: "8%", zIndex: 3 }}>
        <div className="w-4 h-px bg-white/[0.06]" />
        <div className="w-px h-4 bg-white/[0.06]" style={{ marginTop: "-0.5px", marginLeft: "7px" }} />
      </div>

      {/* ── FOREGROUND ─────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative" style={{ zIndex: 4 }}>

        {/* Header */}
        <div className="relative mb-10 pt-8 pb-4 overflow-hidden">
          <p
            className={`${quicksand.className} absolute font-black uppercase pointer-events-none select-none`}
            style={{
              fontSize: "clamp(7rem, 20vw, 18rem)",
              opacity: 0.03,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              color: "#fff",
            }}
          >
            FATE
          </p>

          <p
            className={`${caveat.className} text-base tracking-[0.3em] uppercase mb-3 ml-1`}
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Discover the rhythm of
          </p>

          <div className={`${quicksand.className} font-black uppercase leading-[0.9] tracking-tight`}>
            <div style={{ fontSize: "clamp(4rem, 9vw, 8rem)", color: "#F5DEB3", letterSpacing: "-0.01em" }}>
              Discover
            </div>
            <div
              className="flex items-baseline gap-6"
              style={{ fontSize: "clamp(4rem, 9vw, 8rem)", marginTop: "-0.08em" }}
            >
              <span
                style={{
                  color: "rgba(255,255,255,0.12)",
                  marginLeft: "clamp(2rem, 8vw, 9rem)",
                  letterSpacing: "0.18em",
                  fontSize: "clamp(2rem, 4vw, 3.8rem)",
                  fontWeight: 300,
                }}
              >
                the city of
              </span>
              <span style={{ color: "#F5DEB3", letterSpacing: "-0.01em" }}>Fate</span>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-6 ml-1">
            <span className="block h-px bg-white/15" style={{ width: "clamp(2rem, 6vw, 5rem)" }} />
            <p className="text-white/30 text-[10px] tracking-[0.35em] uppercase">
              Stories · Experiences · Culture · Community
            </p>
          </div>
        </div>

        {/* Angled decorative lines */}
        <div className="absolute left-0 right-0 pointer-events-none overflow-hidden" style={{ top: "18%", zIndex: 0 }}>
          <svg width="100%" height="120" viewBox="0 0 1400 120" preserveAspectRatio="none" fill="none">
            <line x1="0" y1="90" x2="520" y2="10" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <line x1="480" y1="10" x2="1400" y2="85" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="110" x2="300" y2="40" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
          </svg>
        </div>

        {/* ── GRID ─────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-0 items-start relative">

          {/* HERO IMAGE */}
          <div
            ref={heroRef}
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={handleHeroMouseLeave}
            className="relative flex-shrink-0 lg:mr-[-18px]"
            style={{
              height: "clamp(480px, 72vh, 760px)",
              clipPath: "polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 40px 100px rgba(0,0,0,0.7)",
              transform: "translateY(-28px)",
              zIndex: 2,
              overflow: "hidden",
              willChange: "transform",
            }}
          >
            {categories.map((cat, i) => (
              <div
                key={cat.image}
                className="absolute inset-0"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "scale(1)" : "scale(1.04)",
                  // Incoming image: bloom in with expo ease
                  // Outgoing image: collapse with quint — faster exit
                  transition: i === active
                    ? `opacity 750ms ${EASE_OUT_EXPO}, transform 900ms ${EASE_OUT_EXPO}`
                    : `opacity 400ms ${EASE_OUT_QUINT}, transform 400ms ${EASE_OUT_QUINT}`,
                }}
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover"
                  style={{
                    transform: i === active ? "scale(1.04)" : "scale(1)",
                    animation: i === active
                      ? "slowZoom 14s ease-in-out infinite alternate"
                      : "none",
                    transition: `transform 900ms ${EASE_OUT_EXPO}`,
                  }}
                  priority={i === 0}
                />
              </div>
            ))}

            {/* Gradient overlay — physical color swap */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to top, ${activeCategory.accent}66 0%, transparent 55%)`,
                transition: phys(["background"], "800ms", EASE_OUT_EXPO),
              }}
            />

            {/* Film grain */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "url('/noise.png')",
                opacity: 0.06,
                mixBlendMode: "soft-light",
              }}
            />

            {/* Hero bottom glass strip */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <div
                className="backdrop-blur-md relative overflow-hidden flex items-end justify-between gap-4"
                style={{
                  borderRadius: "16px 6px 14px 10px",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow:
                    "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
                  padding: "14px 20px",
                }}
              >
                <div>
                  {/* Tag — small pop with back ease so it feels pressed */}
                  <span
                    className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mb-2 tracking-widest uppercase"
                    style={{
                      color: activeCategory.accent,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      transition: phys(["color"], "450ms", EASE_OUT_BACK),
                    }}
                  >
                    {activeCategory.tag}
                  </span>
                  <h3
                    className={`${quicksand.className} font-black text-white leading-tight`}
                    style={{
                      fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {activeCategory.title}
                  </h3>
                </div>

                <Link
                  href={activeCategory.href}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold group whitespace-nowrap"
                  style={{
                    color: activeCategory.accent,
                    transition: phys(["color"], "450ms", EASE_OUT_QUINT),
                  }}
                >
                  Explore
                  <ArrowRight
                    className="w-3.5 h-3.5"
                    style={{
                      transition: phys(["transform"], "300ms", EASE_OUT_BACK),
                    }}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Floating accent dot between hero & cards */}
          <div
            className="hidden lg:block absolute rounded-full pointer-events-none"
            style={{
              width: 10,
              height: 10,
              top: "38%",
              left: "calc(100% / 3 * 2 - 5px)",
              backgroundColor: activeCategory.accent,
              boxShadow: `0 0 24px 6px ${activeCategory.accent}55`,
              zIndex: 4,
              transform: "translateX(-50%)",
              // Back ease so the dot springs to the new color
              transition: phys(
                ["background-color", "box-shadow"],
                "600ms",
                EASE_OUT_BACK
              ),
            }}
          />

          {/* ── CATEGORY CARDS ───────────────────────────────────── */}
          <div
            className="flex flex-col gap-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 lg:pl-5 lg:pt-6"
            style={{ maxHeight: "clamp(480px, 72vh, 760px)" }}
          >
            {categories.map((cat, i) => (
              <div
                key={cat.title}
                ref={(el) => { cardRefs.current[i] = el; }}
                onMouseEnter={() => handleCardEnter(i)}
                onMouseMove={(e) => handleCardMouseMove(e, i)}
                onMouseLeave={() => handleCardMouseLeave(i)}
                className="group relative overflow-hidden cursor-pointer flex-shrink-0"
                style={{
                  height: i === active ? "114px" : "96px",
                  marginRight: i % 2 === 0 ? "-12px" : "0px",
                  marginLeft: i % 2 !== 0 ? "8px" : "0px",
                  // Active card slides left with springy back ease
                  transform: i === active ? "translateX(-4px)" : "none",
                  zIndex: i === active ? 3 : 1,
                  border:
                    i === active
                      ? "1px solid rgba(255,255,255,0.14)"
                      : "1px solid rgba(255,255,255,0.05)",
                  boxShadow:
                    i === active
                      ? `0 0 0 1px ${cat.accent}33, 0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`
                      : "0 4px 20px rgba(0,0,0,0.3)",
                  borderRadius:
                    i % 3 === 0
                      ? "20px 6px 20px 6px"
                      : i % 3 === 1
                      ? "6px 20px 6px 20px"
                      : "16px 16px 6px 6px",
                  clipPath:
                    i % 3 === 2 && i !== active
                      ? "polygon(0 0, 100% 0, 100% 80%, 96% 100%, 0 100%)"
                      : "none",
                  willChange: "transform",
                  // Physical transition stack:
                  //  height   — expo out: fast expand, gentle settle
                  //  box-shadow — quint: slightly behind height
                  //  border   — quick, quasi-instantaneous feel
                  transition: [
                    `height 420ms ${EASE_OUT_EXPO}`,
                    `box-shadow 420ms ${EASE_OUT_QUINT} 30ms`,
                    `border-color 350ms ${EASE_OUT_QUINT}`,
                    `transform 600ms ${EASE_OUT_BACK}`,
                  ].join(", "),
                }}
              >
                {/* Background image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover"
                  style={{
                    transform: i === active ? "scale(1.05)" : "scale(1)",
                    filter: i === active
                      ? "brightness(0.75)"
                      : "brightness(0.5)",
                    // Scale and brightness each get their own curve + delay
                    transition: [
                      `transform 700ms ${EASE_OUT_EXPO}`,
                      `filter 500ms ${EASE_OUT_QUINT} 50ms`,
                    ].join(", "),
                  }}
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      i === active
                        ? `linear-gradient(to right, ${cat.accent}55 0%, transparent 70%)`
                        : "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 80%)",
                    transition: phys(["background"], "700ms", EASE_IN_OUT_CIRC),
                  }}
                />

                {/* Card content */}
                <div
                  className="absolute inset-0 flex items-center justify-between px-5"
                  style={{
                    backdropFilter: i === active ? "blur(2px)" : "none",
                    WebkitBackdropFilter: i === active ? "blur(2px)" : "none",
                    transition: phys(["backdrop-filter"], "400ms", EASE_OUT_QUINT),
                  }}
                >
                  <div>
                    {/* Tag badge — springs into accent color */}
                    <span
                      className="inline-block text-[10px] font-bold uppercase tracking-widest mb-2 px-2 py-0.5 rounded-full"
                      style={{
                        color: i === active ? cat.accent : "rgba(255,255,255,0.4)",
                        background:
                          i === active ? "rgba(255,255,255,0.07)" : "transparent",
                        border:
                          i === active
                            ? "1px solid rgba(255,255,255,0.08)"
                            : "1px solid transparent",
                        // Staggered: color pops first, background blooms after
                        transition: [
                          `color 300ms ${EASE_OUT_BACK}`,
                          `background 400ms ${EASE_OUT_QUINT} 60ms`,
                          `border-color 400ms ${EASE_OUT_QUINT} 60ms`,
                        ].join(", "),
                      }}
                    >
                      {cat.tag}
                    </span>
                    <p className="text-white font-semibold text-sm leading-snug">
                      {cat.title}
                    </p>
                  </div>

                  {/* Arrow — slides in from right with spring */}
                  <Link
                    href={cat.href}
                    className="flex-shrink-0 ml-4"
                    style={{
                      color: cat.accent,
                      opacity: 0,
                      transform: "translateX(8px)",
                      transition: [
                        `opacity 280ms ${EASE_OUT_QUINT}`,
                        `transform 360ms ${EASE_OUT_BACK}`,
                      ].join(", "),
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.opacity = "1";
                      el.style.transform = "translateX(0) translateY(-1px) scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      // Re-check if card is active
                      if (i === active) {
                        el.style.opacity = "1";
                        el.style.transform = "translateX(0)";
                      } else {
                        el.style.opacity = "0";
                        el.style.transform = "translateX(8px)";
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Active indicator — diagonal slash
                    Width animates with back ease for a "click" feel */}
                <div
                  className="absolute left-0 top-0 bottom-0"
                  style={{
                    width: i === active ? "5px" : "3px",
                    backgroundColor: i === active ? cat.accent : "transparent",
                    clipPath:
                      i === active
                        ? "polygon(0 0, 100% 8%, 100% 92%, 0 100%)"
                        : "none",
                    boxShadow:
                      i === active ? `2px 0 12px ${cat.accent}66` : "none",
                    transition: [
                      `width 350ms ${EASE_OUT_BACK}`,
                      `background-color 400ms ${EASE_OUT_QUINT} 50ms`,
                      `box-shadow 500ms ${EASE_OUT_QUINT} 80ms`,
                    ].join(", "),
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}