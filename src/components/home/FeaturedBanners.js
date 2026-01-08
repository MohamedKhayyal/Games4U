"use client";

import Image from "next/image";
import Link from "next/link";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";

export default function FeaturedBanners() {
  const big = useRevealOnScroll();
  const top = useRevealOnScroll();
  const left = useRevealOnScroll();
  const right = useRevealOnScroll();

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6">

        <div
          ref={big}
          className="
            reveal group
            lg:row-span-2
            relative rounded-3xl overflow-hidden
            aspect-[3/4]
            min-h-[520px]
          "
        >
          <Image
            src="/images/godOfWar.jpg"
            alt="God of War Ragnarok"
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200" />

          <div className="absolute bottom-8 left-8 text-white max-w-xs">
            <h2 className="text-4xl font-extrabold leading-tight mb-6">
              GOD OF WAR
              <br />
              RAGNARÖK
            </h2>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
            >
              Shop Now →
            </Link>
          </div>
        </div>

        <div
          ref={top}
          className="
            reveal delay-1 group
            relative rounded-3xl overflow-hidden
            aspect-[16/9]
          "
        >
          <Image
            src="/images/ea-sports-fc-26.jpg"
            alt="EA Sports FC 26"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200" />

          <Link
            href="/shop"
            className="absolute top-6 right-6 bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition"
          >
            Shop Now →
          </Link>
        </div>

        <div
          ref={left}
          className="
            reveal delay-2 group
            relative rounded-3xl overflow-hidden
            aspect-[16/9]
          "
        >
          <Image
            src="/images/ghost-of-ytei.png"
            alt="Ghost of Yotei"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200" />

          <Link
            href="/shop"
            className="absolute bottom-6 left-6 bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition"
          >
            Shop Now →
          </Link>
        </div>

        <div
          ref={right}
          className="
            reveal delay-3 group
            relative rounded-3xl overflow-hidden
            aspect-[16/9]
          "
        >
          <Image
            src="/images/battlefield-6.png"
            alt="Battlefield 6"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200" />

          <Link
            href="/shop"
            className="absolute bottom-6 left-6 bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition"
          >
            Shop Now →
          </Link>
        </div>

      </div>
    </section>
  );
}
