"use client";

import { useRef, useState, useEffect } from "react";
import { Pause, Play, MessageCircle, ChevronDown, X } from "lucide-react";
import { Caveat, Quicksand } from "next/font/google";

const DROPDOWNS = {
  visitor: {
    label: "I am a...",
    options: ["Family", "Couple", "Solo Traveler", "Group", "Sports Fan", "Business Traveler"],
  },
  interest: {
    label: "Interested In...",
    options: ["Sports & Events", "Dining", "Shopping", "Outdoors", "Arts & Culture", "Hotels"],
  },
};

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [visitorOpen, setVisitorOpen] = useState(false);
  const [interestOpen, setInterestOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Track dropdown trigger positions for fixed-position menus on mobile
  const visitorTriggerRef = useRef<HTMLButtonElement>(null);
  const interestTriggerRef = useRef<HTMLButtonElement>(null);
  const [visitorRect, setVisitorRect] = useState<DOMRect | null>(null);
  const [interestRect, setInterestRect] = useState<DOMRect | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 600px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Recalculate trigger rect when a dropdown opens (needed for fixed positioning)
  useEffect(() => {
    if (visitorOpen && visitorTriggerRef.current) {
      setVisitorRect(visitorTriggerRef.current.getBoundingClientRect());
    }
  }, [visitorOpen]);

  useEffect(() => {
    if (interestOpen && interestTriggerRef.current) {
      setInterestRect(interestTriggerRef.current.getBoundingClientRect());
    }
  }, [interestOpen]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const closeAll = () => {
    setVisitorOpen(false);
    setInterestOpen(false);
  };

  // On mobile, render dropdown as a fixed overlay anchored to the trigger
  const mobileMenuStyle = (rect: DOMRect | null): React.CSSProperties => {
    if (!rect) return {};
    return {
      position: "fixed",
      top: rect.bottom + 6,
      left: rect.left,
      width: rect.width,
      zIndex: 99999,
    };
  };

  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        height: "100dvh", // dvh handles mobile browser chrome correctly
        minHeight: "560px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: "clamp(56px, 10vh, 80px)",
        fontFamily: "'Anton', 'Impact', sans-serif",
      }}
      onClick={closeAll}
    >
      {/* ── Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        .hero-section * { box-sizing: border-box; }

        /* Video */
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        /* Dark gradient overlay */
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.08) 0%,
            rgba(0,0,0,0.15) 40%,
            rgba(0,0,0,0.65) 100%
          );
          z-index: 1;
        }

        /* Headline */
        .hero-headline {
          position: relative;
          z-index: 2;
          text-align: center;
          color: #fff;
          font-family: inherit;
          /* Mobile-first: clamp starts at 2rem so it fits at 320px */
          font-size: clamp(2rem, 8vw, 5.2rem);
          line-height: 1.05;
          letter-spacing: -0.015em;
          font-weight: 500;
          text-transform: none;
          margin-bottom: clamp(20px, 4vh, 52px);
          text-shadow: 0 3px 14px rgba(0,0,0,0.35);
          padding: 0 16px;
          animation: heroFadeUp 0.9s cubic-bezier(.22,.68,0,1.2) both;
        }

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Controls row */
        .hero-controls {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
          padding: 0 16px;
          animation: heroFadeUp 1.1s 0.2s cubic-bezier(.22,.68,0,1.2) both;
        }

        /* Dropdown wrapper */
        .hero-dropdown-wrap {
          position: relative;
          /* On mobile each dropdown takes half the row */
          flex: 1 1 140px;
          max-width: 260px;
        }

        /* Dropdown trigger */
        .hero-dropdown-trigger {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255,255,255,0.55);
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 12px 14px;
          border-radius: 4px;
          cursor: pointer;
          width: 100%;
          transition: background 0.2s, border-color 0.2s;
          letter-spacing: 0.03em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .hero-dropdown-trigger:hover {
          background: rgba(255,255,255,0.22);
          border-color: rgba(255,255,255,0.85);
        }
        .hero-dropdown-trigger .chevron {
          margin-left: auto;
          flex-shrink: 0;
          transition: transform 0.25s;
        }
        .hero-dropdown-trigger.open .chevron {
          transform: rotate(180deg);
        }

        /* Dropdown menu — default (desktop) is absolute inside wrapper */
        .hero-dropdown-menu {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: rgba(15,15,20,0.96);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 4px;
          overflow: hidden;
          z-index: 9999;
          animation: dropdownIn 0.2s ease both;
        }
        /* Mobile override: position is set inline via JS (fixed), reset absolute props */
        .hero-dropdown-menu.mobile-fixed {
          position: fixed;
          top: unset;
          left: unset;
          right: unset;
        }
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-dropdown-item {
          padding: 11px 18px;
          color: rgba(255,255,255,0.85);
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          letter-spacing: 0.02em;
        }
        .hero-dropdown-item:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
        .hero-dropdown-item.selected {
          color: #e63946;
        }

        /* Explore button */
        .hero-explore-btn {
          background: #fff;
          color: #111;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          padding: 13px 28px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: background 0.2s, transform 0.15s;
          /* On mobile: full-width row below the two dropdowns */
          flex: 0 0 auto;
          white-space: nowrap;
        }
        .hero-explore-btn:hover {
          background: #f0f0f0;
          transform: translateY(-1px);
        }
        .hero-explore-btn:active {
          transform: translateY(0);
        }

        /* Pause / Play button */
        .hero-pause-btn {
          position: absolute;
          bottom: 20px;
          left: 20px;         /* moved to left so it never collides with chat */
          z-index: 4;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0,0,0,0.45);
          border: 2px solid rgba(255,255,255,0.7);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .hero-pause-btn:hover {
          background: rgba(0,0,0,0.7);
        }

        /* AI Chat bubble */
        .hero-chat-bubble {
          position: absolute;
          bottom: 20px;
          right: 20px;
          z-index: 4;
          display: flex;
          align-items: flex-end;
          gap: 8px;
          animation: heroFadeUp 1.3s 0.5s cubic-bezier(.22,.68,0,1.2) both;
        }
        .hero-chat-tooltip {
          background: #fff;
          color: #111;
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          padding: 10px 28px 10px 12px;
          border-radius: 10px 10px 0 10px;
          max-width: 190px;
          line-height: 1.45;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          position: relative;
        }
        .hero-chat-close {
          position: absolute;
          top: 6px;
          right: 7px;
          cursor: pointer;
          color: #999;
          line-height: 1;
        }
        .hero-chat-close:hover { color: #333; }
        .hero-chat-icon-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #e63946;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(230,57,70,0.5);
          transition: transform 0.2s;
        }
        .hero-chat-icon-btn:hover { transform: scale(1.08); }

        /* ── Mobile breakpoint ── */
        @media (max-width: 600px) {
          .hero-controls {
            gap: 8px;
          }

          /* Two dropdowns side-by-side, then Explore full-width below */
          .hero-dropdown-wrap {
            flex: 1 1 calc(50% - 8px);
            max-width: calc(50% - 4px);
          }

          .hero-explore-btn {
            flex: 1 1 100%;   /* full-width third row */
            width: 100%;
            max-width: 100%;
            padding: 13px 0;
          }

          /* Slightly smaller trigger text so labels fit at 160px wide */
          .hero-dropdown-trigger {
            font-size: 0.8rem;
            padding: 11px 10px;
          }
        }

        /* Very small phones */
        @media (max-width: 380px) {
          .hero-headline {
            font-size: clamp(1.75rem, 9vw, 2.4rem);
          }
          .hero-chat-tooltip {
            max-width: 160px;
            font-size: 0.73rem;
          }
        }
      `}</style>

      {/* ── Video + overlay ── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
          src="/videos/hero-background.mp4"
        />
        <div className="hero-overlay" />
      </div>

      {/* ── Headline ── */}
      {mounted && (
        <h1 className={`hero-headline ${quicksand.className}`}>
          live well,
          live fate!
        </h1>
      )}

      {/* ── Filter Controls ── */}
      {mounted && (
        <div className="hero-controls" onClick={(e) => e.stopPropagation()}>

          {/* Visitor type dropdown */}
          <div className="hero-dropdown-wrap">
            <button
              ref={visitorTriggerRef}
              className={`hero-dropdown-trigger ${visitorOpen ? "open" : ""} ${quicksand.className}`}
              onClick={() => {
                setVisitorOpen((v) => !v);
                setInterestOpen(false);
              }}
            >
              {selectedVisitor || DROPDOWNS.visitor.label}
              <ChevronDown size={16} className="chevron" />
            </button>
            {visitorOpen && (
              <div
                className={`hero-dropdown-menu${isMobile ? " mobile-fixed" : ""}`}
                style={isMobile ? mobileMenuStyle(visitorRect) : undefined}
              >
                {DROPDOWNS.visitor.options.map((opt) => (
                  <div
                    key={opt}
                    className={`hero-dropdown-item ${selectedVisitor === opt ? "selected" : ""} ${caveat.className}`}
                    onClick={() => {
                      setSelectedVisitor(opt);
                      setVisitorOpen(false);
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interest dropdown */}
          <div className="hero-dropdown-wrap">
            <button
              ref={interestTriggerRef}
              className={`hero-dropdown-trigger ${interestOpen ? "open" : ""} ${quicksand.className}`}
              onClick={() => {
                setInterestOpen((v) => !v);
                setVisitorOpen(false);
              }}
            >
              {selectedInterest || DROPDOWNS.interest.label}
              <ChevronDown size={16} className="chevron" />
            </button>
            {interestOpen && (
              <div
                className={`hero-dropdown-menu${isMobile ? " mobile-fixed" : ""}`}
                style={isMobile ? mobileMenuStyle(interestRect) : undefined}
              >
                {DROPDOWNS.interest.options.map((opt) => (
                  <div
                    key={opt}
                    className={`hero-dropdown-item ${selectedInterest === opt ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedInterest(opt);
                      setInterestOpen(false);
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Explore CTA */}
          <button className={`hero-explore-btn ${quicksand.className}`}>
            Explore
          </button>
        </div>
      )}

      {/* ── Pause / Play toggle — moved to bottom-LEFT so it never overlaps chat ── */}
      <button
        className="hero-pause-btn"
        onClick={togglePlay}
        aria-label={playing ? "Pause background video" : "Play background video"}
      >
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </button>

      {/* ── AI Chat bubble — bottom-RIGHT ── */}
      {mounted && chatOpen && (
        <div className="hero-chat-bubble">
          <div className={`hero-chat-tooltip ${caveat.className}`}>
            <span
              className="hero-chat-close"
              onClick={() => setChatOpen(false)}
              role="button"
              aria-label="Dismiss"
            >
              <X size={12} />
            </span>
            Hi! I&apos;m Frankie, an AI assistant, here to help you plan your trip to Frisco.
          </div>
          <button className="hero-chat-icon-btn" aria-label="Open AI chat">
            <MessageCircle size={20} color="#fff" />
          </button>
        </div>
      )}

      {mounted && !chatOpen && (
        <div className="hero-chat-bubble">
          <button
            className="hero-chat-icon-btn"
            aria-label="Open AI assistant"
            onClick={() => setChatOpen(true)}
          >
            <MessageCircle size={20} color="#fff" />
          </button>
        </div>
      )}
    </section>
  );
}