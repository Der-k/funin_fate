import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import PendingScrollHandler from "@/components/PendingScrollHandler";
import { sections, DEFAULT_SCROLL_MARGIN_TOP } from "@/lib/site/sections";

export default async function HomePage() {
  return (
    <main>
      <PendingScrollHandler />
      <Navbar />
      <HeroSection />

      {sections.map((section) => {
        const Component = section.component;

        return (
          <div
            key={section.id}
            id={section.id}
            style={{
              scrollMarginTop: `${section.scrollMarginTop ?? DEFAULT_SCROLL_MARGIN_TOP}px`,
            }}
          >
            <Component />
          </div>
        );
      })}

      <Footer />
    </main>
  );
}