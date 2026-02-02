"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/lib/imageHelper";
import HeroSliderSkeleton from "@/components/skeletons/HeroSliderSkeleton";

export default function HeroSlider() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    fetch("/api/banners")
      .then((res) => res.json())
      .then((data) => {
        setBanners(data?.data?.banners || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const startAutoSlide = () => {
    if (intervalRef.current || banners.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!banners.length) return;
    startAutoSlide();
    return () => stopAutoSlide();
  }, [banners]);

  const next = () => {
    stopAutoSlide();
    setCurrent((prev) => (prev + 1) % banners.length);
    startAutoSlide();
  };

  const prev = () => {
    stopAutoSlide();
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    startAutoSlide();
  };

  if (loading) return <HeroSliderSkeleton />;
  if (!banners.length) return null;

  const banner = banners[current];

  return (
    <section
      className="relative h-[70vh] sm:h-[80vh] lg:h-[85vh] w-screen overflow-hidden bg-[#0b1020]"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <Image
        src={getImageUrl(banner.image)}
        alt={banner.title}
        fill
        priority
        className="transition-opacity duration-700 object-contain sm:object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1020] via-[#0b1020]/80 to-transparent" />

      <div className="relative z-10 h-full flex items-center px-6 md:px-16 lg:px-24">
        <div
          key={banner._id}
          className="max-w-xl text-white animate-fade-slide-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight whitespace-pre-line">
            {banner.title}
          </h1>

          {banner.description && (
            <p className="mt-4 sm:mt-6 text-gray-300 text-sm md:text-base leading-relaxed">
              {banner.description}
            </p>
          )}

          {banner.discountText && (
            <span className="inline-block mt-4 text-sm bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full">
              {banner.discountText} % OFF
            </span>
          )}

          <div className="mt-6 sm:mt-8">
            <Link
              href="/shop"
              className="inline-block bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {banners.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-black/60 p-3 rounded-full text-white text-2xl"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-black/60 p-3 rounded-full text-white text-2xl"
          >
            <ChevronRight />
          </button>
        </>
      )}
    </section>
  );
}
