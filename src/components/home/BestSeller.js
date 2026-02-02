"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/Providers/CartProvider";
import { getImageUrl } from "@/lib/imageHelper";
import BestSellerSkeleton from "@/components/skeletons/BestSellerSkeleton";

export default function BestSellers() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);

  const sliderRef = useRef(null);
  const { addItem } = useCart();

  /* Fetch best sellers */
  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch("/api/games/best-sellers?limit=5").then((r) => r.json()),
      fetch("/api/devices/best-sellers?limit=5").then((r) => r.json()),
    ])
      .then(([gamesRes, devicesRes]) => {
        const games =
          gamesRes?.data?.games?.map((g) => ({
            ...g,
            itemType: "game",
          })) || [];

        const devices =
          devicesRes?.data?.devices?.map((d) => ({
            ...d,
            itemType: "device",
          })) || [];

        setItems([...games, ...devices]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* Slider scroll */
  const scroll = (dir) => {
    sliderRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  /* Add to cart via CartProvider */
  const handleAddToCart = async ({ id, itemType, variant }) => {
    try {
      setLoadingId(`${id}-${variant || "single"}`);

      await addItem({
        itemId: id,
        itemType,
        variant,
      });
    } catch {
      alert("Please login first");
    } finally {
      setLoadingId(null);
    }
  };

  if (loading) return <BestSellerSkeleton />;
  if (!items.length) return null;

  return (
    <section className="relative max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Best Sellers</h2>

        <div className="hidden sm:flex gap-2">
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

      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {items.map((item) => (
          <div
            key={item._id}
            className="min-w-[280px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-sky-400 transition"
          >
            <Link
              href={
                item.itemType === "game"
                  ? `/shop/games/${item.slug}`
                  : `/shop/devices/${item.slug}`
              }
            >
              <div className="relative h-48">
                <Image
                  src={getImageUrl(item.photo)}
                  alt={item.name}
                  fill
                  sizes="300px"
                  className="object-cover"
                />

                {item.isOnOffer && (
                  <span className="absolute top-2 left-2 bg-red-500 text-xs px-2 py-1 rounded">
                    -{item.discount}%
                  </span>
                )}
              </div>
            </Link>

            <div className="p-4 space-y-3">
              <div className="flex space-between items-baseline gap-5">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-slate-400 capitalize">
                  {item.condition}
                </p>
              </div>
              {item.itemType === "game" && (
                <>
                  {item.variants?.primary?.enabled && (
                    <button
                      onClick={() =>
                        handleAddToCart({
                          id: item._id,
                          itemType: "game",
                          variant: "primary",
                        })
                      }
                      disabled={loadingId === `${item._id}-primary`}
                      className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-semibold disabled:opacity-60"
                    >
                      {loadingId === `${item._id}-primary`
                        ? "Adding..."
                        : `Add Primary – ${item.variants.primary.finalPrice} EGP`}
                    </button>
                  )}

                  {item.variants?.secondary?.enabled && (
                    <button
                      onClick={() =>
                        handleAddToCart({
                          id: item._id,
                          itemType: "game",
                          variant: "secondary",
                        })
                      }
                      disabled={loadingId === `${item._id}-secondary`}
                      className="w-full py-3 rounded-xl border border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-black font-semibold disabled:opacity-60"
                    >
                      {loadingId === `${item._id}-secondary`
                        ? "Adding..."
                        : `Add Secondary – ${item.variants.secondary.finalPrice} EGP`}
                    </button>
                  )}
                </>
              )}

              {item.itemType === "device" && (
                <>
                  <p className="text-lg font-bold">{item.finalPrice} EGP</p>
                  <button
                    onClick={() =>
                      handleAddToCart({
                        id: item._id,
                        itemType: "device",
                      })
                    }
                    disabled={loadingId === `${item._id}-single`}
                    className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-semibold disabled:opacity-60"
                  >
                    {loadingId === `${item._id}-single`
                      ? "Adding..."
                      : "Add to Cart"}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
