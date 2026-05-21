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

  useEffect(() => {
    setMounted(true);
  }, []);

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

  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        zIndex: 10, // must beat sibling sections so dropdowns overlay them
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: "80px",
        fontFamily: "'Anton', 'Impact', sans-serif",
      }}
      onClick={closeAll}
    >
      {/* ── Google Fonts ── */}
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
          font-size: clamp(2.6rem, 6vw, 5.2rem);
          line-height: 1.0;
          letter-spacing: -0.015em;
font-weight: 500;
          text-transform: none;
          margin-bottom: clamp(28px, 5vh, 52px);
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
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          animation: heroFadeUp 1.1s 0.2s cubic-bezier(.22,.68,0,1.2) both;
        }

        /* Dropdown wrapper */
        .hero-dropdown-wrap {
          position: relative;
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
          font-size: 0.95rem;
          font-weight: 500;
          padding: 12px 20px;
          border-radius: 4px;
          cursor: pointer;
          min-width: 190px;
          transition: background 0.2s, border-color 0.2s;
          letter-spacing: 0.03em;
        }
        .hero-dropdown-trigger:hover {
          background: rgba(255,255,255,0.22);
          border-color: rgba(255,255,255,0.85);
        }
        .hero-dropdown-trigger .chevron {
          margin-left: auto;
          transition: transform 0.25s;
          flex-shrink: 0;
        }
        .hero-dropdown-trigger.open .chevron {
          transform: rotate(180deg);
        }

        /* Dropdown menu */
        .hero-dropdown-menu {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: rgba(15,15,20,0.96);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 4px;
          overflow: visible;
          z-index: 9999;
          animation: dropdownIn 0.2s ease both;
        }
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-dropdown-item {
          padding: 11px 20px;
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
          font-size: 0.95rem;
          font-weight: 700;
          padding: 13px 32px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: background 0.2s, transform 0.15s;
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
          bottom: 24px;
          right: 24px;
          z-index: 4;
          width: 38px;
          height: 38px;
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
          bottom: 24px;
          right: 72px;
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
          font-size: 0.8rem;
          font-weight: 500;
          padding: 10px 14px;
          border-radius: 10px 10px 0 10px;
          max-width: 210px;
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
      `}</style>

      {/* ── Video + overlay in their own clip box (overflow:hidden here, NOT on the section) ── */}
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
              <div className="hero-dropdown-menu">
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
              <div className="hero-dropdown-menu">
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

      {/* ── Pause / Play toggle ── */}
      <button
        className="hero-pause-btn"
        onClick={togglePlay}
        aria-label={playing ? "Pause background video" : "Play background video"}
      >
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </button>

      {/* ── AI Chat bubble ── */}
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
        <div
          className="hero-chat-bubble"
          style={{ right: "72px", bottom: "24px" }}
        >
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