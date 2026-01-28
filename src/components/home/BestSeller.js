"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/Providers/CartProvider";
import { getImageUrl } from "@/lib/imageHelper";
import Price from "@/components/ui/Price";
import BestSellerSkeleton from "@/components/skeletons/BestSellerSkeleton";

export default function BestSellers() {
  const [games, setGames] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const sliderRef = useRef(null);
  const { refetchCart } = useCart();

  useEffect(() => {
    fetch("/api/games/best-sellers?limit=10")
      .then((res) => res.json())
      .then((data) => setGames(data?.data?.games || []))
      .catch(console.error);
  }, []);

  const scroll = (dir) => {
    sliderRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const addToCart = async (gameId, variant) => {
    try {
      setLoadingId(`${gameId}-${variant}`);

      const res = await fetch("/api/cart/items", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: gameId,
          itemType: "game",
          variant,
        }),
      });

      if (!res.ok) throw new Error("Please login first");

      await refetchCart();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  if (!games.length) {
    return <BestSellerSkeleton />;
  }

  return (
    <section className="relative mt-5 max-w-7xl mx-auto px-2 py-10">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-2xl font-semibold">Best Sellers</h2>

        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="
          flex gap-4
          overflow-x-auto
          scroll-smooth
          scrollbar-hide
          px-2
        "
      >
        {games.map((game) => {
          const primary = game.variants?.primary;
          const secondary = game.variants?.secondary;

          return (
            <div
              key={game._id}
              className="
                min-w-[260px]
                sm:min-w-[280px]
                md:min-w-[300px]
                bg-slate-900
                border border-slate-800
                rounded-xl
                overflow-hidden
                hover:border-sky-400
                transition
              "
            >
              {/* IMAGE */}
              <Link href={`/shop/games/${game.slug}`}>
                <div className="relative h-44 sm:h-48">
                  <Image
                    src={getImageUrl(game.photo)}
                    alt={game.name}
                    fill
                    sizes="(max-width: 640px) 70vw,
                           (max-width: 1024px) 35vw,
                           300px"
                    className="object-cover"
                  />
                </div>
              </Link>

              <div className="p-4 space-y-3">
                <p className="font-medium line-clamp-2">{game.name}</p>

                {game.isOnOffer && (
                  <span className="inline-block text-xs text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full">
                    {game.discount}% OFF
                  </span>
                )}

                {primary?.enabled && (
                  <VariantRow
                    label="Primary"
                    price={primary.price}
                    finalPrice={primary.finalPrice}
                    isOnOffer={game.isOnOffer}
                    loading={loadingId === `${game._id}-primary`}
                    onAdd={() => addToCart(game._id, "primary")}
                  />
                )}

                {secondary?.enabled && (
                  <VariantRow
                    label="Secondary"
                    price={secondary.price}
                    finalPrice={secondary.finalPrice}
                    isOnOffer={game.isOnOffer}
                    loading={loadingId === `${game._id}-secondary`}
                    onAdd={() => addToCart(game._id, "secondary")}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function VariantRow({ label, price, finalPrice, isOnOffer, onAdd, loading }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-sm text-slate-400">{label}</span>

      <div className="flex items-center gap-2">
        <Price price={price} finalPrice={finalPrice} isOnOffer={isOnOffer} />

        <button
          onClick={onAdd}
          disabled={loading}
          className="
            px-3 py-1
            text-xs
            bg-sky-500
            hover:bg-sky-400
            rounded
            text-black
            disabled:opacity-60
          "
        >
          {loading ? "..." : "Add"}
        </button>
      </div>
    </div>
  );
}
