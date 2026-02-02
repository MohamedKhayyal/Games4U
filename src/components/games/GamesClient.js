"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/Providers/CartProvider";
import { getImageUrl } from "@/lib/imageHelper";
import Price from "@/components/ui/Price";

export default function GamesClient({ initialGames = [] }) {
  const { refetchCart } = useCart();
  const [adding, setAdding] = useState(null);

  const addToCart = async (gameId, variant) => {
    try {
      setAdding(`${gameId}-${variant}`);
      await fetch("/api/cart/items", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: gameId,
          itemType: "game",
          variant,
        }),
      });
      refetchCart();
    } finally {
      setAdding(null);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
      {initialGames.map((game) => {
        const primary = game.variants?.primary;
        const secondary = game.variants?.secondary;

        return (
          <div
            key={game._id}
            className="bg-slate-900 rounded-lg p-2 sm:p-3 border border-slate-800 flex flex-col"
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

            <h3 className="text-sm sm:text-base font-medium truncate mb-1">
              {game.name}
            </h3>

            {primary?.enabled && (
              <div className="space-y-1 mb-2">
                <Price
                  price={primary.price}
                  finalPrice={primary.finalPrice}
                  isOnOffer={game.isOnOffer}
                />
                <button
                  onClick={() => addToCart(game._id, "primary")}
                  disabled={adding === `${game._id}-primary`}
                  className="w-full text-xs py-1.5 rounded bg-sky-500 hover:bg-sky-400 text-black font-medium disabled:opacity-60"
                >
                  {adding === `${game._id}-primary`
                    ? "Adding..."
                    : "Add Primary"}
                </button>
              </div>
            )}

            {secondary?.enabled && (
              <div className="space-y-1">
                <Price
                  price={secondary.price}
                  finalPrice={secondary.finalPrice}
                  isOnOffer={game.isOnOffer}
                />
                <button
                  onClick={() => addToCart(game._id, "secondary")}
                  disabled={adding === `${game._id}-secondary`}
                  className="w-full text-xs py-1.5 rounded border border-sky-400 hover:bg-sky-400 hover:text-black font-medium disabled:opacity-60"
                >
                  {adding === `${game._id}-secondary`
                    ? "Adding..."
                    : "Add Secondary"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
