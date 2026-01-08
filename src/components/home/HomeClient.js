"use client";

import dynamic from "next/dynamic";
import HeroSlider from "@/components/home/HeroSlider";

const FeaturedBanners = dynamic(
  () => import("@/components/home/FeaturedBanners"),
  { ssr: false }
);

export default function HomeClient() {
  return (
    <div className="overflow-x-hidden">
      <h1 className="sr-only">Games4U – Buy PlayStation & Xbox Games Online</h1>

      <HeroSlider />
      <FeaturedBanners />
    </div>
  );
}
