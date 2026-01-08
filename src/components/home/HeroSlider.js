"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "THE LAST OF US\nPART II",
    description:
      "Five years after the events of The Last of Us, Ellie embarks on another journey through a post-apocalyptic America on a mission of vengeance against a mysterious militia.",
    image: "/images/lastOfUs.jpg",
  },
  {
    id: 2,
    title: "GOD OF WAR\nRAGNARÖK",
    description:
      "Kratos and Atreus journey through the Nine Realms in search of answers as Asgardian forces prepare for war.",
    image: "/images/godOfWar.jpg",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const next = () => {
    stopAutoSlide();
    setCurrent((prev) => (prev + 1) % slides.length);
    startAutoSlide();
  };

  const prev = () => {
    stopAutoSlide();
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    startAutoSlide();
  };

  const slide = slides[current];

  return (
    <section
      className="relative h-[85vh] w-screen overflow-hidden bg-[#0b1020]"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        priority
        className="object-cover transition-opacity duration-700"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1020] via-[#0b1020]/80 to-transparent" />

      <div className="relative z-10 h-full flex items-center px-6 md:px-16 lg:px-24">
        <div
          key={current}
          className="max-w-xl text-white animate-fade-slide-left"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight whitespace-pre-line">
            {slide.title}
          </h1>

          <p className="mt-6 text-gray-300 text-sm md:text-base leading-relaxed">
            {slide.description}
          </p>

          <div className="mt-8">
            <Link href="/shop" className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition">
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 p-3 rounded-full text-white text-2xl"
      >
        ‹
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 p-3 rounded-full text-white text-2xl"
      >
        ›
      </button>
    </section>
  );
}
