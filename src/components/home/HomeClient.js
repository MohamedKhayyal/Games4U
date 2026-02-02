"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Providers/AuthProvider";

import HeroSlider from "@/components/home/HeroSlider";
import BestSellerSection from "./BestSeller";
import FeaturedGames from "./FeaturedGames";
import FeaturedDevices from "./FeaturedDevices";

const FeaturedBanners = dynamic(
  () => import("@/components/home/FeaturedBanners"),
  { ssr: false },
);

export default function HomeClient() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role === "admin") {
      router.replace("/admin/dashboard");
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <div className="overflow-x-hidden">
      <h1 className="sr-only">Games4U – Buy PlayStation & Xbox Games Online</h1>

      <HeroSlider />
      <FeaturedBanners />
      <BestSellerSection />
      <FeaturedGames />
      <FeaturedDevices />
    </div>
  );
}
