"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Caveat, Quicksand } from "next/font/google";

const restaurantImages = [
  {
    id: 1,
    title: "Rooftop Dining",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Luxury Interior",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Chef Experience",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Signature Cocktails",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Fine Dining",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Private Events",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop",
  },
];

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

function RestaurantImageCard({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[20px] sm:rounded-[28px]">
      <div className="relative h-[180px] sm:h-[200px] lg:h-[240px] w-full overflow-hidden rounded-[20px] sm:rounded-[28px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#36454F] via-[#36454F]/30 to-transparent" />

        <div className="absolute inset-0 rounded-[20px] sm:rounded-[28px] ring-1 ring-[#F5DEB3]/10 group-hover:ring-[#CC4125]/40 transition duration-500" />

        <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
          <p
            className={`text-sm uppercase tracking-[0.25em] text-[#20B2AA] ${caveat.className}`}
          >
            Dining
          </p>
          <h3
            className={`mt-1 text-2xl sm:text-3xl font-black text-[#F5DEB3] ${quicksand.className}`}
          >
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

function FeaturedCard() {
  return (
    <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-[#F5DEB3]/15 bg-[#36454F]/80 p-6 sm:p-8 shadow-2xl backdrop-blur-sm h-full">
      {/* Teal glow */}
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#20B2AA]/25 blur-3xl" />
      {/* Burnt red accent glow */}
      <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-[#CC4125]/20 blur-3xl" />

      <div className="relative z-10">
        <p
          className={`text-sm uppercase tracking-[0.35em] text-[#20B2AA] ${caveat.className}`}
        >
          Culinary Experiences
        </p>

        <h2
          className={`mt-4 text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-none text-[#F5DEB3] ${quicksand.className}`}
        >
          Taste The
          <br />
          Future Of
          <br />
          Funinfate
        </h2>

       <p className={`mt-4 sm:mt-5 max-w-md text-xl sm:text-2xl leading-relaxed text-[#F5DEB3]/70 ${caveat.className}`}>
  From immersive rooftop lounges to curated chef experiences,
  discover the restaurants, nightlife, and social spaces powering
  the energy of Funinfate.
</p>





        <div className="mt-5 sm:mt-6 h-px w-16 bg-gradient-to-r from-[#CC4125] to-transparent" />

        <div className="mt-5 sm:mt-6 flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4">
          <Link
            href="/restaurants"
            className={`group inline-flex items-center justify-center gap-2 rounded-full bg-[#20B2AA] px-5 sm:px-6 py-2.5 sm:py-3 text-base font-semibold text-[#020817] transition hover:scale-[1.02] hover:bg-[#1a9e97] ${quicksand.className}`}
          >
            Explore Dining
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/experience"
            className={`inline-flex items-center justify-center rounded-full border border-[#F5DEB3]/25 px-5 sm:px-6 py-2.5 sm:py-3 text-base font-semibold text-[#F5DEB3] transition hover:bg-[#CC4125] hover:border-[#CC4125] hover:text-white ${quicksand.className}`}
          >
            View Experiences
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RestaurantShowcaseSection() {
  return (
    <section className="relative overflow-hidden px-4 sm:px-6 py-14 sm:py-20 md:px-10 lg:px-16 bg-white">

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 sm:mb-16 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#CC4125]" />
            <p className={`text-sm sm:text-base uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#20B2AA] ${quicksand.className}`}>
              Restaurants & Nightlife
            </p>
          </div>

          <h2
            className={`mt-4 text-4xl sm:text-5xl font-black uppercase leading-[0.95] text-[#36454F] md:text-7xl ${quicksand.className}`}
          >
            Eat, Meet,
            <br />
            Connect.
          </h2>

          <div className="mt-4 h-[3px] w-20 sm:w-24 rounded-full bg-gradient-to-r from-[#CC4125] via-[#20B2AA] to-transparent" />

         <p className={`mt-5 sm:mt-6 text-xl sm:text-2xl leading-relaxed text-[#36454F]/60 ${caveat.className}`}>
  Discover premium dining destinations, social venues,
  networking lounges, and curated culinary experiences
  designed around the energy of Funinfate.
</p>
        </div>

        {/* Mobile featured card — hidden on lg+ */}
        <div className="mb-5 lg:hidden">
          <FeaturedCard />
        </div>

        {/* Mobile 2-col image grid — hidden on lg+ */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
          {restaurantImages.map((img) => (
            <RestaurantImageCard key={img.id} title={img.title} image={img.image} />
          ))}
        </div>

        {/* Desktop 3-column layout — hidden below lg */}
        <div className="hidden lg:grid grid-cols-3 gap-5">

          {/* Left column */}
          <div className="flex flex-col gap-5">
            <RestaurantImageCard title={restaurantImages[0].title} image={restaurantImages[0].image} />
            <RestaurantImageCard title={restaurantImages[1].title} image={restaurantImages[1].image} />
            <RestaurantImageCard title={restaurantImages[2].title} image={restaurantImages[2].image} />
          </div>

          {/* Centre — Featured card */}
          <div className="flex">
            <FeaturedCard />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            <RestaurantImageCard title={restaurantImages[3].title} image={restaurantImages[3].image} />
            <RestaurantImageCard title={restaurantImages[4].title} image={restaurantImages[4].image} />
            <RestaurantImageCard title={restaurantImages[5].title} image={restaurantImages[5].image} />
          </div>

        </div>
      </div>
    </section>
  );
}