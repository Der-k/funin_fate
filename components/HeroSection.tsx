"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  Pause, Play, ChevronDown,
  ChevronLeft, ChevronRight, ArrowRight,
} from "lucide-react";
import { Caveat, Quicksand } from "next/font/google";

// ─────────────────────────────────────────────
//  REEL — add / reorder your media here
// ─────────────────────────────────────────────
type MediaItem =
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string; alt?: string };

const REEL: MediaItem[] = [
  {
    type: "video",
    src: "https://player.vimeo.com/external/...mp4",
    poster:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80",
    alt: "Luxury community",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2000&q=80",
    alt: "Modern apartments",
  },
  {
    type: "video",
    src: "https://player.vimeo.com/external/...mp4",
    poster:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=2000&q=80",
    alt: "Nature trails",
  },
];

const AUTO_ADVANCE_MS = 6000;

const FIELDS = [
  {
    id: "visitor",
    label: "Visiting as",
    placeholder: "Who's coming?",
    options: ["A Family","A Couple","Solo Traveler","A Group","Sports Fan","Business Traveler"],
  },
  {
    id: "interest",
    label: "Looking for",
    placeholder: "What's the plan?",
    options: ["Sports & Live Events","Dining & Nightlife","Outdoor Adventures","Arts & Culture","Shopping & Retail","Hotels & Resorts"],
  },
  {
    id: "when",
    label: "When",
    placeholder: "Any time",
    options: ["This Weekend","This Month","Next Month","Summer 2025","I'm Flexible"],
  },
] as const;

const QUICK_LINKS = ["Hotels", "Events", "Dining", "Outdoors"];

const caveat    = Caveat({ subsets: ["latin"], weight: ["400", "600", "700"] });
const quicksand = Quicksand({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

type FieldId = (typeof FIELDS)[number]["id"];

export default function HeroSection() {
  const [current, setCurrent]             = useState(0);
  const [prev, setPrev]                   = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [globalPaused, setGlobalPaused]   = useState(false);

  const [openField, setOpenField] = useState<FieldId | null>(null);
  const [selected, setSelected]   = useState<Record<FieldId, string>>({
    visitor: "", interest: "", when: "",
  });

  const [mounted, setMounted] = useState(false);
  const videoRefs   = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartX = useRef(0);
  const autoTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const closeAll = () => setOpenField(null);

  // ── slide transitions ──
  const goTo = useCallback((idx: number) => {
    if (transitioning || idx === current) return;
    setPrev(current);
    setCurrent(idx);
    setTransitioning(true);
    setTimeout(() => { setPrev(null); setTransitioning(false); }, 700);
  }, [current, transitioning]);

  const goPrev = useCallback(() => goTo((current - 1 + REEL.length) % REEL.length), [current, goTo]);
  const goNext = useCallback(() => goTo((current + 1) % REEL.length), [current, goTo]);

  const resetTimer = useCallback(() => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    if (globalPaused) return;
    autoTimer.current = setTimeout(goNext, AUTO_ADVANCE_MS);
  }, [globalPaused, goNext]);

  useEffect(() => {
    resetTimer();
    return () => { if (autoTimer.current) clearTimeout(autoTimer.current); };
  }, [current, globalPaused, resetTimer]);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === current && !globalPaused) { v.currentTime = 0; v.play().catch(() => {}); }
      else v.pause();
    });
  }, [current, globalPaused]);

  const toggleGlobalPause = () => {
    const next = !globalPaused;
    setGlobalPaused(next);
    const v = videoRefs.current[current];
    if (v) { next ? v.pause() : v.play().catch(() => {}); }
  };

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) { dx < 0 ? goNext() : goPrev(); }
  };

  const toggleField = (id: FieldId) => {
    setOpenField((prev) => (prev === id ? null : id));
  };

  const selectOption = (id: FieldId, value: string) => {
    setSelected((s) => ({ ...s, [id]: value }));
    setOpenField(null);
  };

  return (
    <section
      className="hero-section"
      style={{
        position: "relative", zIndex: 10, width: "100%",
        height: "100svh", minHeight: "680px",
        paddingBottom: "clamp(56px, 9vh, 80px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "flex-end",
      }}
      onClick={closeAll}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
        .hero-section * { box-sizing: border-box; }

        .hero-reel { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
        .hero-slide {
          position: absolute; inset: 0;
          opacity: 0; transition: opacity 0.7s ease; pointer-events: none;
        }
        .hero-slide.active  { opacity: 1; pointer-events: auto; }
        .hero-slide.leaving { opacity: 0; }
        .hero-slide video, .hero-slide img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }

        .hero-counter {
          position: absolute; top: 18px; right: 20px; z-index: 4;
          color: rgba(255,255,255,0.5);
          font-family: 'Inter', sans-serif; font-size: 0.68rem;
          font-weight: 400; letter-spacing: 0.12em;
        }

        .hero-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 4; width: 36px; height: 36px; border-radius: 50%;
          background: rgba(0,0,0,0.20);
          border: 0.5px solid rgba(255,255,255,0.30);
          color: #fff; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s, opacity 0.2s; opacity: 0.5;
        }
        .hero-arrow:hover { background: rgba(0,0,0,0.50); opacity: 1; }
        .hero-arrow.left  { left: 16px; }
        .hero-arrow.right { right: 16px; }

        .hero-dots {
          position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%);
          z-index: 4; display: flex; align-items: center; gap: 6px;
        }
        .hero-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,0.28); border: none; padding: 0; cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }
        .hero-dot.active { background: #fff; transform: scale(1.5); }

        .hero-headline {
          position: relative; z-index: 2; text-align: center; color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.55rem, 4.5vw, 2.75rem);
          line-height: 1.1; letter-spacing: -0.01em; font-weight: 300;
          margin-bottom: clamp(18px, 3.5vh, 40px); padding: 0 16px;
          animation: heroFadeUp 0.9s cubic-bezier(.22,.68,0,1.2) both;
        }
        .hero-headline em { font-style: normal; font-weight: 500; }

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-cta-stack {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          width: 100%; padding: 0 16px;
          animation: heroFadeUp 1.1s 0.18s cubic-bezier(.22,.68,0,1.2) both;
        }

        /* ── Planning bar — overflow visible so inline dropdowns aren't clipped ── */
        .hero-bar {
          display: flex; align-items: stretch;
          background: rgba(255,255,255,0.04);
          border: 0.5px solid rgba(255,255,255,0.14);
          border-radius: 10px;
          max-width: 660px; width: 100%;
          overflow: visible;        /* IMPORTANT: lets inline dropdowns escape */
        }

        .hero-bar-seg-wrap {
          flex: 1;
          position: relative;       /* dropdown anchors to this */
          display: flex;
          border-right: 0.5px solid rgba(255,255,255,0.10);
        }
        .hero-bar-seg-wrap:last-of-type { border-right: none; }

        .hero-bar-seg {
          flex: 1; display: flex; flex-direction: column;
          justify-content: center; gap: 3px;
          padding: 12px 18px;
          cursor: pointer; background: transparent; border: none;
          transition: background 0.15s; text-align: left;
        }
        .hero-bar-seg:hover { background: rgba(255,255,255,0.05); }

        .bar-seg-label {
          font-family: 'Inter', sans-serif;
          font-size: 9px; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.30);
        }
        .bar-seg-value {
          font-family: 'Inter', sans-serif;
          font-size: 13px; font-weight: 400;
          color: rgba(255,255,255,0.50);
          display: flex; align-items: center; gap: 4px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .bar-seg-value.filled { color: rgba(255,255,255,0.90); }
        .bar-seg-value .chevron { margin-left: auto; flex-shrink: 0; opacity: 0.35; transition: transform 0.2s; }
        .hero-bar-seg.open .bar-seg-value .chevron { transform: rotate(180deg); }

        /* ── Dropdown — inline, anchored to .hero-bar-seg-wrap ── */
        .hero-bar-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          min-width: 100%;
          background: rgba(8, 8, 14, 0.98);
          border: 0.5px solid rgba(255,255,255,0.10);
          border-radius: 8px;
          overflow: hidden;
          z-index: 100;
          animation: heroDropIn 0.14s ease both;
        }
        @keyframes heroDropIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-bar-item {
          padding: 10px 16px;
          color: rgba(255,255,255,0.55);
          font-family: 'Inter', sans-serif; font-size: 13px;
          cursor: pointer; transition: background 0.12s, color 0.12s;
          letter-spacing: 0.01em;
        }
        .hero-bar-item:hover { background: rgba(255,255,255,0.06); color: #fff; }
        .hero-bar-item.selected { color: #fff; }

        /* ── Plan button ── */
        .hero-plan-btn {
          background: #fff; color: #0d0d1a;
          font-family: 'Inter', sans-serif;
          font-size: 12px; font-weight: 500; letter-spacing: 0.03em;
          padding: 0 22px; border: none;
          border-radius: 0 9px 9px 0;
          cursor: pointer; flex-shrink: 0;
          display: flex; align-items: center; gap: 6px;
          white-space: nowrap; transition: opacity 0.15s;
        }
        .hero-plan-btn:hover { opacity: 0.88; }

        /* ── Quick links ── */
        .hero-quick-links { display: flex; align-items: center; gap: 14px; }
        .hero-quick-link {
          font-family: 'Inter', sans-serif;
          font-size: 11px; font-weight: 400;
          color: rgba(255,255,255,0.28);
          cursor: pointer; background: none; border: none;
          letter-spacing: 0.03em; transition: color 0.15s; padding: 0;
        }
        .hero-quick-link:hover { color: rgba(255,255,255,0.60); }
        .hero-quick-sep {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgba(255,255,255,0.15); flex-shrink: 0;
        }

        /* ── Pause button ── */
        .hero-pause-btn {
          position: absolute; bottom: 18px; left: 18px; z-index: 4;
          width: 30px; height: 30px; border-radius: 50%;
          background: rgba(0,0,0,0.30);
          border: 0.5px solid rgba(255,255,255,0.35);
          color: #fff; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s;
        }
        .hero-pause-btn:hover { background: rgba(0,0,0,0.60); }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .hero-bar { flex-wrap: wrap; border-radius: 10px; }
          .hero-bar-seg-wrap { flex: 1 1 calc(50% - 1px); }
          .hero-bar-seg-wrap:nth-child(2) { border-right: none; }
          .hero-bar-seg-wrap:nth-child(3) {
            flex: 1 1 100%; border-right: none;
            border-top: 0.5px solid rgba(255,255,255,0.10);
          }
          .hero-bar-seg-wrap:last-of-type { flex: 1 1 100%; }
          .hero-plan-btn {
            flex: 1 1 100%; border-radius: 0 0 9px 9px;
            justify-content: center; padding: 13px 0; font-size: 13px;
          }
          .hero-headline { font-size: clamp(1.3rem, 6.5vw, 1.9rem); }
          .hero-arrow.left  { left: 8px; }
          .hero-arrow.right { right: 8px; }
        }
      `}</style>

      {/* ── REEL ── */}
      <div className="hero-reel">
        {REEL.map((item, i) => (
          <div key={i} className={`hero-slide${i === current ? " active" : i === prev ? " leaving" : ""}`}>
            {item.type === "video" ? (
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                muted playsInline loop
                poster={"poster" in item ? item.poster : undefined}
                src={item.src}
              />
            ) : (
              <img src={item.src} alt={"alt" in item ? item.alt : ""} draggable={false} />
            )}
          </div>
        ))}
      </div>

      <div className="hero-counter">
        {String(current + 1).padStart(2, "0")} / {String(REEL.length).padStart(2, "0")}
      </div>

      <button className="hero-arrow left" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Previous slide">
        <ChevronLeft size={16} />
      </button>
      <button className="hero-arrow right" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Next slide">
        <ChevronRight size={16} />
      </button>

      <div className="hero-dots">
        {REEL.map((_, i) => (
          <button key={i} className={`hero-dot${i === current ? " active" : ""}`} onClick={(e) => { e.stopPropagation(); goTo(i); }} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>

      // see all fate has to offer;

{mounted && (
  <h1
    className={`hero-headline ${quicksand.className}`}
    style={{
      position: "relative", zIndex: 2, textAlign: "center", color: "#fff",
      fontSize: "clamp(1.55rem, 4.5vw, 2.75rem)",
      lineHeight: 1.15, letterSpacing: "-0.01em",
      marginBottom: "clamp(18px, 3.5vh, 40px)", padding: "0 16px",
      animation: "heroFadeUp 0.9s cubic-bezier(.22,.68,0,1.2) both",
      fontWeight: 300,
    }}
  >
    <span style={{ display: "block", color: "rgba(255,255,255,0.55)", fontWeight: 300, letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "0.52em", marginBottom: "0.4em" }}>
      Live Well
    </span>
    <span style={{ display: "block", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>
      Live Fate.
    </span>
  </h1>
)}
     

      <button
        className="hero-pause-btn"
        onClick={(e) => { e.stopPropagation(); toggleGlobalPause(); }}
        aria-label={globalPaused ? "Play reel" : "Pause reel"}
      >
        {globalPaused ? <Play size={13} /> : <Pause size={13} />}
      </button>
    </section>
  );
}