

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
       <DiscoverHighlightsSection />
    <Restarauntssection/>
     <ShowcaseVideoSection />
     <Fateventsection />
      <Footer />
    </main>
  );
}