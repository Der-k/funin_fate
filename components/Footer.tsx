"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// ─── Palette ──────────────────────────────────────────────────────────────────
const GOLD     = "#20B2AA";
const RUST     = "#CC4125";
const CREAM    = "#F5DEB3";
const CHARCOAL = "#1E2328";
const WHITE    = "#FFFFFF";

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

// ─── Register Button ──────────────────────────────────────────────────────────

function RegisterButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`${quicksand.className} w-full flex items-center justify-between px-5 py-4 text-sm rounded-full cursor-pointer`}
      style={{
        background: hovered ? "#1A9E97" : GOLD,
        color: "#0D1B24",
        letterSpacing: "0.04em",
        fontWeight: 700,
        border: "none",
        transition: "background 300ms ease",
      }}
    >
      <span>Register for Free</span>
      <ArrowUpRight
        style={{
          width: "16px",
          height: "16px",
          transform: hovered ? "translate(1px, -1px)" : "translate(0, 0)",
          transition: "transform 200ms ease",
        }}
      />
    </button>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    const params = email.trim()
      ? `?email=${encodeURIComponent(email.trim())}`
      : "";
    router.push(`/register${params}`);
  };

  return (
    <footer className="relative overflow-hidden">

      {/* =========================
          TOP CTA SECTION — from Discover Block 4
      ========================= */}
      <div style={{ background: CHARCOAL }}>
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${GOLD}50, ${RUST}50, transparent)`,
          }}
        />

        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop"
              alt="City of Fate"
              fill
              className="object-cover"
              style={{ filter: "brightness(0.18)" }}
            />
          </div>

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${CHARCOAL} 0%, transparent 20%, transparent 80%, ${CHARCOAL} 100%)`,
            }}
          />

          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${GOLD}12 0%, transparent 50%)` }}
          />

          <div
            className={`${quicksand.className} relative max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-10`}
            style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-px" style={{ background: GOLD }} />
                  <span
                    className="text-sm uppercase tracking-[0.35em]"
                    style={{ color: `${GOLD}AA`, fontWeight: 700 }}
                  >
                    Plan Your Visit
                  </span>
                </div>

                <h2
                  className="leading-[0.92]"
                  style={{ fontSize: "clamp(2.6rem, 6vw, 4.8rem)", color: CREAM, fontWeight: 700 }}
                >
                  Come experience <br />
                  <span style={{ color: RUST }}>Fate for yourself.</span>
                </h2>

                <p
                  className="leading-relaxed mt-6"
                  style={{ fontSize: "1rem", color: "rgba(245,222,179,0.5)", maxWidth: "36ch", fontWeight: 400 }}
                >
                  Register now to get early access to events, curated itineraries,
                  and exclusive experiences available only in Fate.
                </p>
              </div>

              <div
                className="w-full lg:w-auto lg:min-w-[340px] flex-shrink-0 relative p-8 rounded-[28px]"
                style={{
                  border: `1px solid ${GOLD}45`,
                  background: "rgba(20,26,30,0.85)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <p
                  className="text-xs uppercase tracking-[0.25em] mb-2"
                  style={{ color: `${GOLD}90`, fontWeight: 700 }}
                >
                  Free Registration
                </p>

                <h3
                  className="leading-tight mb-1"
                  style={{ fontSize: "1.6rem", color: CREAM, fontWeight: 700 }}
                >
                  Join Fate
                </h3>

                <p
                  className="text-sm mb-7"
                  style={{ color: "rgba(245,222,179,0.45)", fontWeight: 400 }}
                >
                  Get early access. No spam, ever.
                </p>

                <div className="relative mb-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                    className="w-full bg-transparent text-sm outline-none rounded-full"
                    style={{
                      border: `1px solid rgba(32,178,170,0.3)`,
                      padding: "14px 18px",
                      color: CREAM,
                      fontSize: "0.94rem",
                    }}
                  />
                </div>

                <RegisterButton onClick={handleRegister} />

                <p
                  className="text-xs mt-4 text-center"
                  style={{ color: "rgba(245,222,179,0.25)", fontWeight: 400 }}
                >
                  By registering you agree to our Terms & Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="h-px"
          style={{
            background: "linear-gradient(90deg, transparent, #20B2AA40, #CC412540, transparent)",
          }}
        />
      </div>

      {/* =========================
          MAIN FOOTER
      ========================= */}
      <section className="bg-[#36454f] px-6 md:px-12 lg:px-16 py-20">
        <div className="max-w-[1700px] mx-auto">

          {/* TOP ROW — centered */}
          <div className="flex flex-col items-center text-center gap-10 mb-16">

            {/* Logo + description */}
            <div className="flex flex-col items-center">
              <Link href="/" className="inline-block">
                <h2
                  className={`${quicksand.className} text-[#20B2AA] text-7xl md:text-8xl font-bold uppercase tracking-[-0.06em] leading-none`}
                >
                  FATE
                </h2>
              </Link>
              <p className={`text-white/60 mt-5 max-w-md text-xl md:text-2xl leading-relaxed ${quicksand.className}`}>
                Discover restaurants, nightlife, shopping,
                live events, attractions, and unforgettable
                local experiences throughout Fate.
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-5">
              {[
                { icon: <XIcon />, href: "https://x.com/VisitFate", label: "X (Twitter)" },
                { icon: <InstagramIcon />, href: "https://www.instagram.com/visitfate/", label: "Instagram" },
                { icon: <FacebookIcon />, href: "https://web.facebook.com/profile.php/?id=61589634350805&_rdc=1&_rdr", label: "Facebook" },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
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

          {/* NAV LINKS — centered */}
          <div className="flex flex-wrap justify-center items-center gap-x-7 gap-y-4 border-t border-white/10 pt-10">
            {["Discover", "Eat & Drink", "Events", "Plan Your Stay"].map((item, index, arr) => (
              <div key={index} className="flex items-center gap-7">
                <Link
                  href="/"
                  className={`
                    group relative
                    text-white/80 text-xl md:text-2xl
                    hover:text-white transition-colors
                    ${quicksand.className}
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

                {index !== arr.length - 1 && (
                  <span className={`text-[#CC4125] text-xl ${quicksand.className}`}>//</span>
                )}
              </div>
            ))}
          </div>

          {/* BOTTOM ROW */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mt-14 pt-8 border-t border-white/10">
            <div className={`flex items-center justify-center md:justify-start gap-3 text-white/45 text-lg ${quicksand.className}`}>
              <MapPin size={15} />
              <p>©2026 Visit Fate – All Rights Reserved  ©2026 Live Well, Live Fate! - All Rights Reserved.</p>
            </div>

            <div className="flex items-center justify-center md:justify-end gap-8">
              {["About Us", "Contact", "Privacy Policy"].map((label) => (
                <Link
                  key={label}
                  href={`/${label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`text-white/55 hover:text-white text-lg transition-colors ${quicksand.className}`}
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