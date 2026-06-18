import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

import ShowcaseVideoSection from "@/components/ShowcaseVideoSection";
import OverviewSection from "@/components/OverviewSection";
import Footer from "@/components/Footer";
import DiscoverHighlightsSection from "@/components/DiscoverHighlightsSection";
import AccommodationSection from "@/components/AccommodationSection";
import FateNewsSection from "@/components/FateNewsSection";
import Restarauntssection from "@/components/Restaraunts_section";
import Fateventsection from "@/components/Fateeventssection";

export default async function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />

      <div id="discover" style={{ scrollMarginTop: "110px" }}>
        <DiscoverHighlightsSection />
      </div>

      <div id="dining" style={{ scrollMarginTop: "110px" }}>
        <Restarauntssection />
      </div>

      <div id="events" style={{ scrollMarginTop: "110px" }}>
        <Fateventsection />
      </div>

      <div id="stay" style={{ scrollMarginTop: "110px" }}>
        <AccommodationSection />
      </div>

      <Footer />
    </main>
  );
}