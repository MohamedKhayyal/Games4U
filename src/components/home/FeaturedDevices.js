"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/Providers/CartProvider";
import { getImageUrl } from "@/lib/imageHelper";
import BestSellerSkeleton from "../skeletons/BestSellerSkeleton";

export default function FeaturedDevicesSlider() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);

  const sliderRef = useRef(null);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);

    fetch("/api/devices/featured?limit=10")
      .then((res) => res.json())
      .then((data) => {
        setDevices(data?.data?.devices || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* Slider scroll */
  const scroll = (dir) => {
    sliderRef.current?.scrollBy({
      left: dir === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  /* Add to cart via CartProvider */
  const handleAddToCart = async (deviceId) => {
    try {
      setLoadingId(deviceId);

      await addItem({
        itemId: deviceId,
        itemType: "device",
      });
    } finally {
      setLoadingId(null);
    }
  };

  if (loading) return <BestSellerSkeleton />;
  if (!devices.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Featured Devices</h2>

        <div className="flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="overflow-hidden">
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {devices.map((device) => (
            <div
              key={device._id}
              className="min-w-[260px] bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-sky-500 transition"
            >
              <Link href={`/shop/devices/${device.slug}`}>
                <div className="relative h-44 mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={getImageUrl(device.photo)}
                    alt={device.name}
                    fill
                    className="object-cover"
                  />

                  {device.isOnOffer && (
                    <span className="absolute top-2 left-2 bg-red-500 text-xs px-2 py-1 rounded">
                      -{device.discount}%
                    </span>
                  )}
                </div>
              </Link>

              <h3 className="font-semibold truncate">{device.name}</h3>

              <p className="text-sm text-slate-400 capitalize">
                Condition: {device.condition}
              </p>

              <p className="mt-2 text-sky-400 font-semibold">
                {device.finalPrice} EGP
              </p>

              <button
                onClick={() => handleAddToCart(device._id)}
                disabled={loadingId === device._id}
                className="mt-4 w-full bg-sky-500 hover:bg-sky-400 text-black py-2 rounded-lg font-medium transition disabled:opacity-60"
              >
                {loadingId === device._id ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
