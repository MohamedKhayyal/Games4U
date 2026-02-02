"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/Providers/CartProvider";
import { getImageUrl } from "@/lib/imageHelper";
import BestSellerSkeleton from "../skeletons/BestSellerSkeleton";

export default function FeaturedGamesSlider() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);

  const sliderRef = useRef(null);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);

    fetch("/api/games/featured?limit=10")
      .then((res) => res.json())
      .then((data) => {
        setGames(data?.data?.games || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const scroll = (dir) => {
    sliderRef.current?.scrollBy({
      left: dir === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  const handleAddToCart = async (gameId, variant) => {
    try {
      setLoadingId(`${gameId}-${variant}`);

      await addItem({
        itemId: gameId,
        itemType: "game",
        variant,
      });
    } finally {
      setLoadingId(null);
    }
  };

  if (loading) return <BestSellerSkeleton />;
  if (!games.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Featured Games</h2>

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

      <div className="overflow-hidden">
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {games.map((game) => (
            <div
              key={game._id}
              className="min-w-[260px] bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-sky-500 transition"
            >
              <Link href={`/shop/games/${game.slug}`}>
                <div className="relative h-44 mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={getImageUrl(game.photo)}
                    alt={game.name}
                    fill
                    className="object-cover"
                  />

                  {game.isOnOffer && (
                    <span className="absolute top-2 left-2 bg-red-500 text-xs px-2 py-1 rounded">
                      -{game.discount}%
                    </span>
                  )}
                </div>
              </Link>

              <h3 className="font-semibold truncate">{game.name}</h3>

              {game.variants?.primary?.enabled && (
                <button
                  onClick={() => handleAddToCart(game._id, "primary")}
                  disabled={loadingId === `${game._id}-primary`}
                  className="mt-3 w-full bg-sky-500 hover:bg-sky-400 text-black py-2 rounded-lg font-medium disabled:opacity-60"
                >
                  {loadingId === `${game._id}-primary`
                    ? "Adding..."
                    : `Add Primary – ${game.variants.primary.finalPrice} EGP`}
                </button>
              )}

              {game.variants?.secondary?.enabled && (
                <button
                  onClick={() => handleAddToCart(game._id, "secondary")}
                  disabled={loadingId === `${game._id}-secondary`}
                  className="mt-2 w-full border border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-black py-2 rounded-lg font-medium transition disabled:opacity-60"
                >
                  {loadingId === `${game._id}-secondary`
                    ? "Adding..."
                    : `Add Secondary – ${game.variants.secondary.finalPrice} EGP`}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
