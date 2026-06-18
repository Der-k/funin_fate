"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import type { ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";
import { Quicksand } from "next/font/google";
import { motion } from "framer-motion";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// ─── Palette ──────────────────────────────────────────────────────────────────
const TEAL  = "#20B2AA";
const RUST  = "#CC4125";
const CREAM = "#F5DEB3";
const SLATE = "#36454F";
const WHITE = "#FFFFFF";

// ─── Data ─────────────────────────────────────────────────────────────────────
const categories = [
  {
    title: "Top Experiences",
    tag: "Must-Do",
    number: "01",
    description: "Immersive adventures and curated experiences shaping the identity of the city.",
    href: "/experiences",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2400&auto=format&q=90&fit=crop",
  },
  {
    title: "Culture & Community",
    tag: "Local Life",
    number: "02",
    description: "Meet creators, innovators, and communities driving the cultural pulse of Fate.",
    href: "/community",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2400&auto=format&q=90&fit=crop",
  },
  {
    title: "Weekend Energy",
    tag: "Events",
    number: "03",
    description: "Events, nightlife, and weekend discoveries across the city.",
    href: "/events",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2400&auto=format&q=90&fit=crop",
  },
  {
    title: "Food & Drink",
    tag: "Dining",
    number: "04",
    description: "Hidden kitchens, rooftop bars, and the flavors that define Fate's palate.",
    href: "/dining",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2400&auto=format&q=90&fit=crop",
  },
  {
    title: "Art & Design",
    tag: "Creative",
    number: "05",
    description: "Galleries, murals, studios, and the makers reshaping Fate's visual language.",
    href: "/art",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2400&auto=format&q=90&fit=crop",
  },
  {
    title: "Outdoors & Nature",
    tag: "Escape",
    number: "06",
    description: "Parks, trails, and green spaces where the city breathes and slows down.",
    href: "/outdoors",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2400&auto=format&q=90&fit=crop",
  },
];

const amenities = [
  {
    label: "Free City Wi-Fi",
    tag: "Connectivity",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2400&auto=format&q=90&fit=crop",
  },
  {
    label: "Fitness Centers",
    tag: "Wellness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2400&auto=format&q=90&fit=crop",
  },
  {
    label: "Green Corridors",
    tag: "Outdoors",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2400&auto=format&q=90&fit=crop",
  },
  {
    label: "Retail Districts",
    tag: "Shopping",
    image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=2400&auto=format&q=90&fit=crop",
  },
  {
    label: "Smart Parking",
    tag: "Transport",
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=2400&auto=format&q=90&fit=crop",
  },
  {
    label: "Social Lounges",
    tag: "Community",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2400&auto=format&q=90&fit=crop",
  },
  {
    label: "24/7 Security",
    tag: "Safety",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2400&auto=format&q=90&fit=crop",
  },
  {
    label: "Aquatic Facilities",
    tag: "Recreation",
    image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=2400&auto=format&q=90&fit=crop",
  },
];

// ─── Specific local Fate businesses grouped by category ──────────────────────
type Business = {
  name: string;
  type: string;
  address: string;
  blurb: string;
  hours: string;
  img: string;
  href: string;
};

type BusinessGroup = {
  category: string;
  icon: string;
  businesses: Business[];
};

const businessGroups: BusinessGroup[] = [
  {
    category: "Dining",
    icon: "ti-tools-kitchen-2",
    businesses: [
      {
        name: "Mesquite & Main",
        type: "Texas BBQ",
        address: "104 Main St, Fate TX",
        blurb: "Slow-smoked brisket, house-made sides and pitmaster pride on every plate.",
        hours: "Tue–Sun 11am–9pm",
        img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2400&auto=format&q=90&fit=crop",
        href: "/directory/mesquite-and-main",
      },
      {
        name: "Paloma Kitchen",
        type: "Modern Mexican",
        address: "218 Fate Main St, Fate TX",
        blurb: "Handmade tortillas, mezcal cocktails and coastal Mexican flavors in a bright, lively space.",
        hours: "Mon–Sun 11am–10pm",
        img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=2400&auto=format&q=90&fit=crop",
        href: "/directory/paloma-kitchen",
      },
      {
        name: "The Ironwood Table",
        type: "American Bistro",
        address: "55 Commerce Dr, Fate TX",
        blurb: "Farm-sourced plates, weekend brunch and a craft beer list that keeps locals coming back.",
        hours: "Wed–Sun 10am–10pm",
        img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2400&auto=format&q=90&fit=crop",
        href: "/directory/ironwood-table",
      },
      {
        name: "Dough & Co.",
        type: "Artisan Pizza",
        address: "310 Fate Town Square, Fate TX",
        blurb: "Wood-fired Neapolitan pies with local toppings, natural wines and a relaxed, open-air patio.",
        hours: "Daily 12pm–10pm",
        img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2400&auto=format&q=90&fit=crop",
        href: "/directory/dough-and-co",
      },
    ],
  },
  {
    category: "Wellness",
    icon: "ti-heart-rate-monitor",
    businesses: [
      {
        name: "Roots & Rise Yoga",
        type: "Yoga Studio",
        address: "88 Wellness Way, Fate TX",
        blurb: "Hot yoga, breathwork and sound bath sessions in a serene, community-first studio.",
        hours: "Daily 6am–8pm",
        img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2400&auto=format&q=90&fit=crop",
        href: "/directory/roots-and-rise",
      },
      {
        name: "Apex Athletic Club",
        type: "Fitness Center",
        address: "401 Sportsplex Blvd, Fate TX",
        blurb: "Full-service gym with group classes, personal training and recovery suites.",
        hours: "Mon–Fri 5am–11pm, Sat–Sun 6am–9pm",
        img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2400&auto=format&q=90&fit=crop",
        href: "/directory/apex-athletic",
      },
      {
        name: "Solace Med Spa",
        type: "Medical Spa",
        address: "12 Lakeside Dr, Fate TX",
        blurb: "Facials, IV therapy and advanced skin treatments from licensed medical aestheticians.",
        hours: "Tue–Sat 9am–7pm",
        img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2400&auto=format&q=90&fit=crop",
        href: "/directory/solace-med-spa",
      },
    ],
  },
  {
    category: "Retail",
    icon: "ti-shopping-bag",
    businesses: [
      {
        name: "The Gather Market",
        type: "Boutique Goods",
        address: "22 Town Square, Fate TX",
        blurb: "Locally curated home goods, gifts and apparel from Texas artisans and makers.",
        hours: "Mon–Sat 10am–7pm",
        img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2400&auto=format&q=90&fit=crop",
        href: "/directory/the-gather-market",
      },
      {
        name: "Copper & Thread",
        type: "Women's Boutique",
        address: "67 Fate Main St, Fate TX",
        blurb: "Contemporary women's fashion with a Texas twist — seasonal collections and personal styling.",
        hours: "Tue–Sat 10am–6pm",
        img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2400&auto=format&q=90&fit=crop",
        href: "/directory/copper-and-thread",
      },
      {
        name: "Landmark Books & Coffee",
        type: "Bookstore & Café",
        address: "5 Heritage Square, Fate TX",
        blurb: "Independent booksellers paired with a specialty coffee bar — your new favourite third place.",
        hours: "Daily 7am–9pm",
        img: "https://images.unsplash.com/photo-1521056787327-239cf6b2f6a4?q=80&w=2400&auto=format&q=90&fit=crop",
        href: "/directory/landmark-books",
      },
    ],
  },
  {
    category: "Beauty",
    icon: "ti-sparkles",
    businesses: [
      {
        name: "Lumen Salon & Color Bar",
        type: "Hair Salon",
        address: "33 Fate Marketplace, Fate TX",
        blurb: "Creative color, cuts and keratin treatments from a team of award-winning stylists.",
        hours: "Tue–Sat 9am–7pm",
        img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2400&auto=format&q=90&fit=crop",
        href: "/directory/lumen-salon",
      },
      {
        name: "The Barber Collective",
        type: "Barbershop",
        address: "9 Heritage Square, Fate TX",
        blurb: "Classic cuts, straight-razor shaves and a welcoming space where every chair tells a story.",
        hours: "Mon–Sat 8am–6pm",
        img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2400&auto=format&q=90&fit=crop",
        href: "/directory/barber-collective",
      },
      {
        name: "Glow Nail Studio",
        type: "Nail Salon",
        address: "140 Commerce Dr, Fate TX",
        blurb: "Gel, dip, acrylics and nail art in a relaxing, toxin-conscious studio environment.",
        hours: "Mon–Sat 9am–7pm, Sun 10am–5pm",
        img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2400&auto=format&q=90&fit=crop",
        href: "/directory/glow-nail-studio",
      },
    ],
  },
  {
    category: "Services",
    icon: "ti-briefcase",
    businesses: [
      {
        name: "Cornerstone Realty Group",
        type: "Real Estate",
        address: "200 Fate Blvd, Suite 100, Fate TX",
        blurb: "Local experts helping families buy, sell and invest across Fate and the wider Rockwall County.",
        hours: "Mon–Fri 8am–6pm",
        img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2400&auto=format&q=90&fit=crop",
        href: "/directory/cornerstone-realty",
      },
      {
        name: "Pinnacle Financial Advisors",
        type: "Financial Planning",
        address: "75 Executive Park, Fate TX",
        blurb: "Retirement planning, wealth management and tax strategy tailored to Fate families.",
        hours: "Mon–Fri 9am–5pm",
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2400&auto=format&q=90&fit=crop",
        href: "/directory/pinnacle-financial",
      },
      {
        name: "Hartwell Law Group",
        type: "Legal Services",
        address: "18 Town Center Dr, Fate TX",
        blurb: "Family law, estate planning and business counsel from a trusted local firm.",
        hours: "Mon–Fri 8:30am–5:30pm",
        img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2400&auto=format&q=90&fit=crop",
        href: "/directory/hartwell-law",
      },
    ],
  },
];

// ─── Social Icons ─────────────────────────────────────────────────────────────
function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const socialLinks = [
  { icon: <XIcon />, href: "https://x.com/VisitFate", label: "X (Twitter)", handle: "@VisitFate" },
  { icon: <InstagramIcon />, href: "https://www.instagram.com/visitfate/", label: "Instagram", handle: "@visitfate" },
  { icon: <FacebookIcon />, href: "https://web.facebook.com/profile.php/?id=61589634350805&_rdc=1&_rdr", label: "Facebook", handle: "visitfate" },
];

// ─── Social Section ───────────────────────────────────────────────────────────
function SocialSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div style={{ background: SLATE, boxShadow: "0 8px 40px rgba(32,178,170,0.12), 0 2px 12px rgba(54,69,79,0.15)" }} className="relative overflow-hidden">
      <div className="absolute left-[-80px] bottom-[-80px] h-[200px] w-[200px] rounded-full blur-3xl pointer-events-none" style={{ background: `${TEAL}20` }} />
      <div className="absolute right-[-60px] top-[-60px] h-[180px] w-[180px] rounded-full blur-3xl pointer-events-none" style={{ background: `${CREAM}10` }} />

      <div className="relative max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16 py-10">
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(245,222,179,0.1)",
          borderRadius: "16px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
          padding: "28px 36px",
          backdropFilter: "blur(12px)",
        }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: RUST }} />
              <p
                className={`text-sm sm:text-base uppercase tracking-[0.25em] sm:tracking-[0.35em] ${quicksand.className}`}
                style={{ color: "rgba(245,222,179,0.5)" }}
              >
                Follow Fate On
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  title={link.label}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "7px",
                    padding: "9px 18px 9px 14px", borderRadius: "100px",
                    border: `1px solid ${hoveredIdx === i ? TEAL : "rgba(245,222,179,0.2)"}`,
                    background: hoveredIdx === i ? TEAL : "rgba(255,255,255,0.06)",
                    color: hoveredIdx === i ? WHITE : `rgba(245,222,179,0.7)`,
                    textDecoration: "none", transition: "all 220ms ease", whiteSpace: "nowrap",
                    backdropFilter: "blur(8px)",
                    boxShadow: hoveredIdx === i ? `0 4px 18px ${TEAL}50` : "none",
                  }}
                >
                  <span style={{ display: "flex", flexShrink: 0 }}>{link.icon}</span>
                  <span
                    className={quicksand.className}
                    style={{
                      fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.02em",
                      color: hoveredIdx === i ? WHITE : "rgba(245,222,179,0.7)",
                      transition: "color 220ms ease",
                    }}
                  >
                    {link.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Accordion Slice ──────────────────────────────────────────────────────────
function AccordionSlice({
  cat, isActive, onEnter, onLeave, onToggle, isFirst,
}: {
  cat: (typeof categories)[0];
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onToggle}
      style={{
        position: "relative", overflow: "hidden", cursor: "pointer",
        flex: isActive ? "5 1 0%" : "1 1 0%",
        transition: "flex 650ms cubic-bezier(.16,1,.3,1)",
        minWidth: 0,
      }}
    >
      <Image
        src={cat.image}
        alt={cat.title}
        fill
        className="object-cover"
        style={{
          transform: isActive ? "scale(1.02)" : "scale(1.08)",
          transition: "transform 700ms cubic-bezier(.16,1,.3,1)",
          objectPosition: "center",
        }}
      />

      <div style={{
        position: "absolute", inset: 0,
        background: isActive
          ? "linear-gradient(to top, rgba(10,18,24,0.72) 0%, rgba(10,18,24,0.05) 35%, transparent 55%)"
          : "linear-gradient(to top, rgba(10,18,24,0.5) 0%, transparent 40%)",
        transition: "background 500ms ease",
      }} />

      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background: `linear-gradient(to right, transparent, ${TEAL}, transparent)`,
          opacity: isActive ? 1 : 0,
          transition: "opacity 400ms ease",
        }}
      />

      <div style={{
        position: "absolute", bottom: "50%", left: "50%",
        transform: "translateX(-50%) translateY(50%) rotate(-90deg)",
        whiteSpace: "nowrap",
        opacity: isActive ? 0 : 1,
        transition: "opacity 300ms ease",
        pointerEvents: "none",
        display: "flex", alignItems: "center", gap: "8px",
      }}>
        <span className={quicksand.className} style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>
          {cat.number}
        </span>
        <span className={quicksand.className} style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.75)", textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>
          {cat.title}
        </span>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: `0 22px 26px ${isFirst ? "clamp(1.5rem, 4vw, 4rem)" : "22px"}`,
        opacity: isActive ? 1 : 0,
        transform: isActive ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 400ms ease 150ms, transform 450ms cubic-bezier(.16,1,.3,1) 150ms",
        pointerEvents: isActive ? "auto" : "none",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: `${TEAL}28`, border: `1px solid ${TEAL}60`,
          borderRadius: "100px", padding: "4px 12px", marginBottom: "10px",
          backdropFilter: "blur(8px)",
        }}>
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: TEAL, display: "inline-block", flexShrink: 0 }} />
          <span className={quicksand.className} style={{ color: TEAL, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            {cat.tag}
          </span>
        </div>

        <h3 className={quicksand.className} style={{ fontSize: "clamp(1.4rem, 2vw, 1.85rem)", fontWeight: 700, color: WHITE, lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: "8px", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
          {cat.title}
        </h3>

        <p className={quicksand.className} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", fontWeight: 400, lineHeight: 1.6, marginBottom: "16px", maxWidth: "28ch", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>
          {cat.description}
        </p>

        <Link
          href={cat.href}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          className="group relative inline-flex items-center justify-center overflow-hidden"
          style={{
            height: "40px", padding: "0 18px",
            background: TEAL, color: "#0D1B24",
            fontWeight: 700, fontSize: "0.73rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            textDecoration: "none", gap: "7px", whiteSpace: "nowrap",
          }}
        >
          <span style={{
            position: "absolute", inset: 0, background: RUST,
            transform: btnHovered ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 500ms cubic-bezier(.16,1,.3,1)",
          }} />
          <span className={quicksand.className} style={{ position: "relative", zIndex: 1, color: btnHovered ? WHITE : "#0D1B24", transition: "color 300ms ease" }}>
            Explore
          </span>
          <ArrowUpRight style={{ position: "relative", zIndex: 1, width: "13px", height: "13px", flexShrink: 0, color: btnHovered ? WHITE : "#0D1B24", transition: "color 300ms ease" }} />
        </Link>
      </div>

      <div style={{
        position: "absolute", top: "14px", right: "14px",
        width: "16px", height: "16px",
        borderTop: `1.5px solid ${TEAL}`,
        borderRight: `1.5px solid ${TEAL}`,
        opacity: isActive ? 0.7 : 0,
        transition: "opacity 350ms ease 100ms",
        pointerEvents: "none",
      }} />
    </div>
  );
}

// ─── Discover Block ───────────────────────────────────────────────────────────
function DiscoverBlock({ active, onEnter, onLeave, onToggle }: {
  active: number;
  onEnter: (i: number) => void;
  onLeave: () => void;
  onToggle: (i: number) => void;
}) {
  const cat = categories[active];
  const [animating, setAnimating] = useState(false);
  const [prevActive, setPrevActive] = useState(active);
  const [exploreHovered, setExploreHovered] = useState(false);
  const [eventsHovered, setEventsHovered] = useState(false);

  useEffect(() => {
    if (active !== prevActive) {
      setAnimating(true);
      const t = setTimeout(() => { setPrevActive(active); setAnimating(false); }, 420);
      return () => clearTimeout(t);
    }
  }, [active, prevActive]);

  return (
    <div style={{ background: WHITE, position: "relative", overflow: "hidden", boxShadow: "0 8px 40px rgba(32,178,170,0.10), 0 2px 12px rgba(54,69,79,0.10)" }}>
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: "600px", height: "600px", borderRadius: "50%",
          background: `radial-gradient(circle, ${TEAL}10 0%, transparent 70%)`,
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          filter: "blur(60px)",
        }}
      />

      <div
        className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16"
        style={{ paddingTop: "clamp(4rem, 9vh, 7rem)", paddingBottom: "clamp(2rem, 4vh, 3rem)" }}
      >
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: RUST }} />
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, letterSpacing: "0.03em", color: "#000000", textTransform: "none", margin: 0 }}>
            Discover the City
          </p>
        </div>

        <div style={{
          marginTop: "14px", height: "4px", width: "clamp(220px, 26vw, 340px)",
          background: `linear-gradient(90deg, ${TEAL} 0%, ${RUST} 55%, ${CREAM} 100%)`,
          borderRadius: "4px", transform: "skewX(-18deg) translateX(6px)", transformOrigin: "left",
        }} />
      </div>

      <div className="relative z-20">
        <div style={{ width: "100%", height: "clamp(560px, 80vh, 920px)", display: "flex", gap: "3px", overflow: "hidden" }}>
          {categories.map((c, i) => (
            <AccordionSlice
              key={c.title} cat={c} isActive={i === active}
              onEnter={() => onEnter(i)} onLeave={onLeave} onToggle={() => onToggle(i)}
              isFirst={i === 0} isLast={i === categories.length - 1}
            />
          ))}
        </div>
      </div>

      <div className="relative z-20 w-full">
        <motion.div
          initial={{ y: -200 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
          style={{ background: SLATE }}
        >
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}>
            <div className="max-w-4xl mx-auto text-center px-6 py-12">
              <div className="flex items-center justify-center gap-3">
                <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: RUST }} />
                <span className={quicksand.className} style={{ color: "rgba(245,222,179,0.35)", fontWeight: 500, fontSize: "0.72rem", letterSpacing: "0.12em", opacity: animating ? 0 : 1, transition: "opacity 300ms ease" }}>
                  {String(active + 1).padStart(2, "0")} — {String(categories.length).padStart(2, "0")}
                </span>
              </div>

              <h2
                className={`mt-4 text-3xl sm:text-4xl font-black uppercase leading-[0.95] md:text-5xl ${quicksand.className}`}
                style={{ color: CREAM, opacity: animating ? 0 : 1, transform: animating ? "translateY(14px)" : "translateY(0)", transition: "opacity 420ms ease 50ms, transform 480ms cubic-bezier(.16,1,.3,1) 50ms" }}
              >
                {cat.title}
              </h2>

              <div className="mt-4 h-[3px] w-20 sm:w-24 rounded-full mx-auto" style={{ background: `linear-gradient(to right, ${WHITE}, ${RUST}, transparent)` }} />

              <p
                className={`mt-5 sm:mt-6 text-xl sm:text-2xl leading-relaxed ${quicksand.className}`}
                style={{ color: "rgba(245,222,179,0.65)", opacity: animating ? 0 : 1, transform: animating ? "translateY(8px)" : "translateY(0)", transition: "opacity 380ms ease 100ms, transform 440ms cubic-bezier(.16,1,.3,1) 100ms" }}
              >
                {cat.description}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-5 mt-8" style={{ opacity: animating ? 0 : 1, transition: "opacity 380ms ease 120ms" }}>
                <Link
                  href={cat.href}
                  onMouseEnter={() => setExploreHovered(true)}
                  onMouseLeave={() => setExploreHovered(false)}
                  className={`group relative inline-flex items-center justify-center overflow-hidden h-12 md:h-14 px-7 md:px-8 ${quicksand.className}`}
                  style={{ background: CREAM, color: SLATE, textTransform: "uppercase", letterSpacing: "0.18em", fontSize: "0.75rem", fontWeight: 600, textDecoration: "none", gap: "8px" }}
                >
                  <span style={{ position: "absolute", inset: 0, background: TEAL, transform: exploreHovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 500ms cubic-bezier(.16,1,.3,1)" }} />
                  <span style={{ position: "relative", zIndex: 1, color: exploreHovered ? WHITE : SLATE, transition: "color 300ms ease" }}>Explore More</span>
                </Link>

                <Link
                  href="/events"
                  onMouseEnter={() => setEventsHovered(true)}
                  onMouseLeave={() => setEventsHovered(false)}
                  className={`inline-flex items-center justify-center h-12 md:h-14 px-7 md:px-8 ${quicksand.className}`}
                  style={{ border: `1px solid ${CREAM}`, color: eventsHovered ? SLATE : CREAM, background: eventsHovered ? CREAM : "transparent", textTransform: "uppercase", letterSpacing: "0.18em", fontSize: "0.75rem", fontWeight: 600, textDecoration: "none", transition: "all 300ms ease" }}
                >
                  View Events
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Amenity Card ─────────────────────────────────────────────────────────────
function AmenityCard({ amenity }: { amenity: (typeof amenities)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ flexShrink: 0, width: "clamp(340px, 32vw, 480px)" }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: "relative", width: "100%", height: "620px", overflow: "hidden", background: "#ddd", border: "1px solid rgba(54,69,79,0.08)" }}>
        <Image
          src={amenity.image}
          alt={amenity.label}
          fill
          className="object-cover"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 1400ms cubic-bezier(.16,1,.3,1)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: hovered ? "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" : "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 60%)", transition: "background 500ms ease" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(to right, transparent, ${TEAL}, transparent)`, opacity: hovered ? 1 : 0, transition: "opacity 400ms ease" }} />
      </div>

      <div style={{ paddingTop: "10px", paddingBottom: "4px", borderBottom: `3px solid ${hovered ? RUST : TEAL}`, transition: "border-color 300ms ease" }}>
        <p className={quicksand.className} style={{ fontSize: "1rem", fontWeight: 800, color: SLATE, letterSpacing: "0.01em", lineHeight: 1.2, margin: 0 }}>
          {amenity.label}
        </p>
      </div>
    </div>
  );
}

// ─── Individual Business Card ─────────────────────────────────────────────────
function BusinessCard({ biz }: { biz: Business }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={biz.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: "clamp(320px, 28vw, 400px)",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        border: `1px solid ${hovered ? TEAL : "rgba(54,69,79,0.12)"}`,
        transition: "border-color 280ms ease, box-shadow 280ms ease",
        boxShadow: hovered ? `0 8px 32px rgba(32,178,170,0.14)` : "0 2px 8px rgba(0,0,0,0.04)",
        background: WHITE,
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "260px", overflow: "hidden", flexShrink: 0 }}>
        <Image
          src={biz.img}
          alt={biz.name}
          fill
          sizes="(max-width: 768px) 90vw, 340px"
          className="object-cover"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)", transition: "transform 900ms cubic-bezier(.16,1,.3,1)", objectPosition: "center top" }}
        />
        {/* Teal top bar on hover */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "3px",
          background: `linear-gradient(to right, ${TEAL}, ${RUST})`,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 450ms cubic-bezier(.16,1,.3,1)",
        }} />
        {/* Type badge */}
        <div style={{
          position: "absolute", bottom: "12px", left: "12px",
          display: "inline-flex", alignItems: "center", gap: "5px",
          background: "rgba(10,18,24,0.72)",
          border: `1px solid ${TEAL}50`,
          borderRadius: "3px", padding: "4px 10px",
          backdropFilter: "blur(8px)",
        }}>
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: TEAL, flexShrink: 0 }} />
          <span className={quicksand.className} style={{ color: TEAL, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            {biz.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Name */}
        <h3 className={quicksand.className} style={{
          fontSize: "1.05rem", fontWeight: 800, color: SLATE,
          lineHeight: 1.1, letterSpacing: "-0.01em", margin: "0 0 6px",
        }}>
          {biz.name}
        </h3>

        {/* Address */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "10px" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={RUST} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span className={quicksand.className} style={{ fontSize: "0.68rem", color: "#000000", fontWeight: 500, letterSpacing: "0.02em" }}>
            {biz.address}
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(54,69,79,0.08)", marginBottom: "10px" }} />

        {/* Blurb */}
        <p className={quicksand.className} style={{
          fontSize: "0.8rem", color: "#000000", lineHeight: 1.65,
          fontWeight: 400, margin: "0 0 14px", flex: 1,
        }}>
          {biz.blurb}
        </p>

        {/* Footer row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span className={quicksand.className} style={{ fontSize: "0.65rem", color: "#000000", fontWeight: 500 }}>
              {biz.hours}
            </span>
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            color: hovered ? RUST : TEAL, transition: "color 250ms ease",
          }}>
            <span className={quicksand.className} style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              View
            </span>
            <ArrowUpRight style={{ width: "11px", height: "11px" }} />
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div style={{
        height: "3px", background: hovered ? RUST : "transparent",
        transition: "background 300ms ease",
        flexShrink: 0,
      }} />
    </Link>
  );
}

// ─── Business Directory Panel ─────────────────────────────────────────────────
function BusinessDirectoryPanel() {
  const [activeCat, setActiveCat] = useState(0);
  const [dirHovered, setDirHovered] = useState(false);
  const bizScrollRef = useRef<HTMLDivElement>(null);
  const [bizLeft, setBizLeft] = useState(false);
  const [bizRight, setBizRight] = useState(false);

  const scrollBiz = (dir: "left" | "right") => {
    bizScrollRef.current?.scrollBy({ left: dir === "right" ? 360 : -360, behavior: "smooth" });
  };

  const group = businessGroups[activeCat];

  return (
    <>
      {/* Header */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: RUST, flexShrink: 0 }} />
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.3rem, 2vw, 1.8rem)", fontWeight: 600, color: "#000000", margin: 0, letterSpacing: "0.02em" }}>
                Local Businesses
              </p>
            </div>
            <h2 className={quicksand.className} style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, color: SLATE, margin: "0 0 4px", lineHeight: 1 }}>
              What Fate Has to Offer
            </h2>
            <div style={{ height: "3px", width: "80px", background: `linear-gradient(to right, ${TEAL}, ${RUST})`, borderRadius: "2px" }} />
          </div>
          <Link
            href="/directory"
            onMouseEnter={() => setDirHovered(true)}
            onMouseLeave={() => setDirHovered(false)}
            className={quicksand.className}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              height: "44px", padding: "0 22px",
              border: `1px solid ${dirHovered ? RUST : SLATE}`,
              color: dirHovered ? RUST : SLATE, background: "transparent",
              textTransform: "uppercase", letterSpacing: "0.18em", fontSize: "0.7rem", fontWeight: 700,
              textDecoration: "none", transition: "all 250ms ease", whiteSpace: "nowrap",
              alignSelf: "center",
            }}
          >
            Full Directory <ArrowUpRight style={{ width: "12px", height: "12px" }} />
          </Link>
        </div>

        {/* Category sub-tabs */}
        <div style={{ display: "flex", gap: "8px", marginTop: "2rem", flexWrap: "wrap" }}>
          {businessGroups.map((g, i) => {
            const isActive = i === activeCat;
            return (
              <button
                key={g.category}
                onClick={() => setActiveCat(i)}
                className={quicksand.className}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "8px 18px", borderRadius: "100px", cursor: "pointer",
                  background: isActive ? SLATE : "transparent",
                  border: `1.5px solid ${isActive ? SLATE : "rgba(54,69,79,0.25)"}`,
                  color: isActive ? WHITE : "#000000",
                  fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                  transition: "all 220ms ease",
                }}
              >
                <i className={g.icon} style={{ fontSize: "15px" }} aria-hidden="true" />
                {g.category}
              </button>
            );
          })}
        </div>

        {/* Active category label + count */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "1.75rem", marginBottom: "0.25rem" }}>
          <span className={quicksand.className} style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: TEAL }}>
            {group.category}
          </span>
          <span style={{ width: "1px", height: "12px", background: "rgba(54,69,79,0.2)" }} />
          <span className={quicksand.className} style={{ fontSize: "0.68rem", fontWeight: 500, color: "#000000", letterSpacing: "0.08em" }}>
            {group.businesses.length} businesses
          </span>
        </div>
      </div>

      {/* Horizontally scrollable business card row */}
      <div style={{ position: "relative", width: "100%", marginTop: "1.25rem" }}>
        <div
          ref={bizScrollRef}
          style={{
            display: "flex", gap: "16px", overflowX: "auto", scrollbarWidth: "none",
            paddingLeft: "clamp(1.5rem, 4vw, 4rem)", paddingRight: "clamp(1.5rem, 4vw, 4rem)",
            paddingBottom: "8px",
          }}
        >
          {group.businesses.map((biz) => (
            <BusinessCard key={biz.name} biz={biz} />
          ))}

          {/* "See all" card */}
          <Link
            href={`/directory?cat=${group.category.toLowerCase()}`}
            style={{
              flexShrink: 0, width: "clamp(200px, 16vw, 240px)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: "14px", textDecoration: "none",
              border: `1.5px dashed ${TEAL}60`,
              background: `${TEAL}06`,
              transition: "background 250ms ease",
              padding: "24px",
            }}
          >
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: TEAL, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ArrowUpRight style={{ width: "20px", height: "20px", color: WHITE }} />
            </div>
            <span className={quicksand.className} style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: TEAL, textAlign: "center" }}>
              See All {group.category}
            </span>
          </Link>
        </div>
      </div>

      {/* Scroll nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "20px" }}>
        <div style={{ flex: 1, maxWidth: "100px", height: "1px", background: `linear-gradient(to right, transparent, ${TEAL}50)` }} />
        <button
          onClick={() => scrollBiz("left")}
          onMouseEnter={() => setBizLeft(true)}
          onMouseLeave={() => setBizLeft(false)}
          style={{
            display: "flex", alignItems: "center", gap: "7px", padding: "9px 18px", borderRadius: "100px",
            background: bizLeft ? SLATE : "transparent",
            border: `1.5px solid ${bizLeft ? SLATE : "rgba(54,69,79,0.25)"}`,
            color: bizLeft ? WHITE : SLATE, cursor: "pointer", transition: "all 240ms ease",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
          <span className={quicksand.className} style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>Prev</span>
        </button>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: TEAL, opacity: 0.5 }} />
        <button
          onClick={() => scrollBiz("right")}
          onMouseEnter={() => setBizRight(true)}
          onMouseLeave={() => setBizRight(false)}
          style={{
            display: "flex", alignItems: "center", gap: "7px", padding: "9px 18px", borderRadius: "100px",
            background: bizRight ? TEAL : "transparent",
            border: `1.5px solid ${bizRight ? TEAL : "rgba(54,69,79,0.25)"}`,
            color: bizRight ? WHITE : SLATE, cursor: "pointer", transition: "all 240ms ease",
          }}
        >
          <span className={quicksand.className} style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>Next</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
        <div style={{ flex: 1, maxWidth: "100px", height: "1px", background: `linear-gradient(to left, transparent, ${RUST}50)` }} />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div style={{ height: "1px", background: "rgba(54,69,79,0.10)", marginTop: "2.5rem" }} />
      </div>
    </>
  );
}

// ─── City Amenities Tab Content ────────────────────────────────────────────────
function CityAmenitiesContent() {
  const [dirHovered, setDirHovered] = useState(false);
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop: "2.5rem" }}>
        <p style={{
          fontFamily: "'Caveat', cursive", fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)", fontWeight: 500,
          color: "#000000", lineHeight: 1.65, maxWidth: "780px", margin: "0 0 0 auto",
          textAlign: "left", letterSpacing: "0.01em",
        }}>
          From free city-wide Wi-Fi and world-class fitness centers to lush green corridors and vibrant retail districts — Fate is designed for living well. Every corner of this city is built around the people who call it home, offering smart infrastructure, safe streets, social spaces, and recreational facilities that make everyday life feel anything but ordinary.
        </p>
      </div>

      <div style={{ position: "relative", marginTop: "0", width: "100%" }}>
        <div
          ref={scrollRef}
          style={{ display: "flex", gap: "20px", overflowX: "auto", scrollbarWidth: "none", paddingTop: "40px", paddingLeft: "clamp(1.5rem, 4vw, 4rem)" }}
        >
          {amenities.map((a) => (
            <AmenityCard key={a.label} amenity={a} />
          ))}
        </div>
      </div>

      {/* Carousel Nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "28px", paddingBottom: "4px" }}>
        <div style={{ flex: 1, maxWidth: "120px", height: "1px", background: `linear-gradient(to right, transparent, ${TEAL}60)` }} />
        <button
          onClick={() => scroll("left")}
          onMouseEnter={() => setLeftHovered(true)}
          onMouseLeave={() => setLeftHovered(false)}
          style={{
            display: "flex", alignItems: "center", gap: "8px", padding: "10px 22px", borderRadius: "100px",
            background: leftHovered ? SLATE : "transparent",
            border: `1.5px solid ${leftHovered ? SLATE : "rgba(54,69,79,0.3)"}`,
            color: leftHovered ? WHITE : SLATE, cursor: "pointer", transition: "all 250ms ease",
            boxShadow: leftHovered ? "0 4px 16px rgba(54,69,79,0.18)" : "none",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
          <span className={quicksand.className} style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>Prev</span>
        </button>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: TEAL, opacity: 0.6 }} />
        <button
          onClick={() => scroll("right")}
          onMouseEnter={() => setRightHovered(true)}
          onMouseLeave={() => setRightHovered(false)}
          style={{
            display: "flex", alignItems: "center", gap: "8px", padding: "10px 22px", borderRadius: "100px",
            background: rightHovered ? TEAL : "transparent",
            border: `1.5px solid ${rightHovered ? TEAL : "rgba(54,69,79,0.3)"}`,
            color: rightHovered ? WHITE : SLATE, cursor: "pointer", transition: "all 250ms ease",
            boxShadow: rightHovered ? `0 4px 16px ${TEAL}40` : "none",
          }}
        >
          <span className={quicksand.className} style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>Next</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
        <div style={{ flex: 1, maxWidth: "120px", height: "1px", background: `linear-gradient(to left, transparent, ${RUST}60)` }} />
      </div>

      {/* Heading + Directory CTA */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16" style={{ marginTop: "3.5rem" }}>
        <div className="mb-10 sm:mb-14 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: RUST }} />
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", fontWeight: 600, letterSpacing: "0.02em", color: "#000000", textTransform: "none", margin: 0 }}>
              City Amenities
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginTop: "1rem" }}>
            <div>
              <h2 className={`text-4xl sm:text-5xl font-black uppercase leading-[0.95] md:text-6xl ${quicksand.className}`} style={{ color: SLATE, margin: 0 }}>
                The Fate<br />Experience.
              </h2>
              <div className="mt-4 h-[3px] w-20 sm:w-24 rounded-full" style={{ background: `linear-gradient(to right, ${RUST}, ${TEAL}, transparent)` }} />
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.5rem, 2.6vw, 2.2rem)", fontWeight: 500, letterSpacing: "0.01em", lineHeight: 1.5, color: "#000000", marginTop: "1.5rem", marginBottom: 0, maxWidth: "44ch" }}>
                What makes Fate, Fate? Discover the businesses and amenities that define life here.
              </p>
            </div>

            <Link
              href="/directory"
              onMouseEnter={() => setDirHovered(true)}
              onMouseLeave={() => setDirHovered(false)}
              className={`inline-flex items-center gap-2 h-12 md:h-14 px-7 md:px-8 ${quicksand.className}`}
              style={{
                flexShrink: 0, alignSelf: "center",
                border: `1px solid ${dirHovered ? RUST : SLATE}`,
                color: dirHovered ? RUST : SLATE, background: "transparent",
                textTransform: "uppercase", letterSpacing: "0.18em", fontSize: "0.73rem", fontWeight: 700,
                textDecoration: "none", transition: "all 250ms ease", whiteSpace: "nowrap",
              }}
            >
              Browse Directory <ArrowUpRight style={{ width: "13px", height: "13px" }} />
            </Link>
          </div>
        </div>
        <div style={{ height: "1px", background: "rgba(54,69,79,0.12)", marginTop: "2.5rem" }} />
      </div>
    </>
  );
}

// ─── Tab Section Registry ──────────────────────────────────────────────────────
// To add a new rotating tab later, just append an entry here — everything else
// (auto-rotation, progress bar, crossfade animation, pause-on-hover) is generic.
type TabSection = {
  key: string;
  label: string;
  icon: string;
  Content: ComponentType;
};

const tabSections: TabSection[] = [
  { key: "amenities", label: "City Amenities", icon: "ti ti-building-community", Content: CityAmenitiesContent },
  { key: "businesses", label: "Find Businesses", icon: "ti ti-map-pin", Content: BusinessDirectoryPanel },
  // { key: "events", label: "Upcoming Events", icon: "ti ti-calendar-event", Content: EventsContent },
];

const AUTOPLAY_DURATION_MS = 7000;
const CROSSFADE_MS = 380;

// ─── Amenities Section (Auto-Rotating Tabs) ────────────────────────────────────
function AmenitiesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [displayedTab, setDisplayedTab] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [autoplayOn, setAutoplayOn] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance through tabs
  useEffect(() => {
    if (!autoplayOn || isPaused) return;
    intervalRef.current = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabSections.length);
    }, AUTOPLAY_DURATION_MS);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [autoplayOn, isPaused, activeTab]);

  // Crossfade content when the active tab changes
  useEffect(() => {
    if (activeTab !== displayedTab) {
      setAnimating(true);
      const t = setTimeout(() => {
        setDisplayedTab(activeTab);
        setAnimating(false);
      }, CROSSFADE_MS);
      return () => clearTimeout(t);
    }
  }, [activeTab, displayedTab]);

  const handleTabClick = (i: number) => {
    if (i === activeTab) return;
    setActiveTab(i);
    setAutoplayOn(false); // manual selection takes over; stop auto-rotating
  };

  const ActiveContent = tabSections[displayedTab].Content;

  return (
    <div
      style={{ background: WHITE, paddingTop: "0", paddingBottom: "4rem", boxShadow: "0 8px 40px rgba(32,178,170,0.10), 0 2px 12px rgba(54,69,79,0.10)" }}
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full blur-3xl pointer-events-none" style={{ background: `${TEAL}12` }} />
      <div className="absolute bottom-[-160px] right-[-100px] h-[300px] w-[300px] rounded-full blur-3xl pointer-events-none" style={{ background: `${CREAM}18` }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.47.0/tabler-icons.min.css');
        @keyframes tabAutoplayProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      {/* ── Tab Bar ── */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop: "3.5rem" }}>
        <div style={{ display: "flex", borderBottom: `2px solid rgba(54,69,79,0.12)`, marginBottom: "0" }}>
          {tabSections.map((tab, i) => {
            const isActive = i === activeTab;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabClick(i)}
                className={quicksand.className}
                style={{
                  position: "relative",
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "12px 28px", background: "transparent", border: "none",
                  borderBottom: `3px solid ${isActive ? TEAL : "transparent"}`,
                  marginBottom: "-2px", cursor: "pointer",
                  fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
                  color: isActive ? SLATE : "#000000",
                  transition: "color 220ms ease, border-color 220ms ease",
                }}
              >
                <i className={tab.icon} style={{ fontSize: "18px", color: isActive ? TEAL : "rgba(54,69,79,0.35)", transition: "color 220ms ease" }} aria-hidden="true" />
                {tab.label}

                {/* Autoplay progress indicator, only on the active tab while autoplay is running */}
                {isActive && autoplayOn && (
                  <span
                    key={`${tab.key}-${activeTab}`}
                    style={{
                      position: "absolute", bottom: "-3px", left: 0, height: "3px",
                      background: RUST, borderRadius: "2px",
                      animation: `tabAutoplayProgress ${AUTOPLAY_DURATION_MS}ms linear forwards`,
                      animationPlayState: isPaused ? "paused" : "running",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Crossfading tab content ── */}
      <div
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(12px)" : "translateY(0)",
          transition: `opacity ${CROSSFADE_MS}ms ease, transform ${CROSSFADE_MS + 60}ms cubic-bezier(.16,1,.3,1)`,
        }}
      >
        <ActiveContent />
      </div>
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────
export default function DiscoverFateSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [clickedCard, setClickedCard] = useState<number | null>(null);
  const [autoCard, setAutoCard] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const active = clickedCard !== null ? clickedCard : hoveredCard !== null ? hoveredCard : autoCard;

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setAutoCard((prev) => (prev + 1) % categories.length), 2800);
  };

  useEffect(() => {
    startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleEnter = (i: number) => { if (intervalRef.current) clearInterval(intervalRef.current); setHoveredCard(i); };
  const handleLeave = () => { setHoveredCard(null); if (clickedCard === null) startInterval(); };
  const handleToggle = (i: number) => {
    setClickedCard((prev) => {
      if (prev === i) { startInterval(); return null; }
      if (intervalRef.current) clearInterval(intervalRef.current);
      return i;
    });
  };

  return (
    <section className={`${quicksand.className} relative`} style={{ backgroundColor: WHITE, width: "100%", maxWidth: "100%", margin: 0, padding: 0 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');`}</style>
      <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
        <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${TEAL} 0%, ${RUST} 50%, ${CREAM} 100%)` }} />
        <div className="h-[42px] w-full opacity-40 blur-2xl" style={{ background: `linear-gradient(90deg, rgba(32,178,170,0.35) 0%, rgba(204,65,37,0.35) 50%, rgba(245,222,179,0.35) 100%)` }} />
      </div>

      <DiscoverBlock active={active} onEnter={handleEnter} onLeave={handleLeave} onToggle={handleToggle} />
      <AmenitiesSection />
      <SocialSection />
    </section>
  );
}