"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/Providers/CartProvider";
import { getImageUrl } from "@/lib/imageHelper";
import Price from "@/components/ui/Price";

export default function GameDetailsClient({ game }) {
  const { refetchCart } = useCart();
  const [adding, setAdding] = useState(null);

  const addToCart = async (variant) => {
    try {
      setAdding(variant);
      await fetch("/api/cart/items", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: game._id,
          itemType: "game",
          variant,
        }),
      });
      refetchCart();
    } finally {
      setAdding(null);
    }
  };

  const primary = game.variants?.primary;
  const secondary = game.variants?.secondary;

  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-800">
        <Image
          src={getImageUrl(game.photo)}
          alt={game.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="space-y-6">
        <h1 className="text-4xl font-bold">{game.name}</h1>
        <p className="text-slate-400 leading-relaxed">{game.description}</p>

        {game.isOnOffer && (
          <span className="inline-block text-xs text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full">
            {game.discount}% OFF
          </span>
        )}

        <span
          className={`text-sm ${
            game.stock > 0 ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {game.stock > 0 ? `In stock (${game.stock})` : "Out of stock"}
        </span>

        {primary?.enabled && (
          <div className="space-y-2">
            <Price
              price={primary.price}
              finalPrice={primary.finalPrice}
              isOnOffer={game.isOnOffer}
            />
            <button
              onClick={() => addToCart("primary")}
              disabled={adding === "primary"}
              className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-semibold"
            >
              {adding === "primary" ? "Adding..." : "Add Primary"}
            </button>
          </div>
        )}
        {secondary?.enabled && (
          <div className="space-y-2">
            <Price
              price={secondary.price}
              finalPrice={secondary.finalPrice}
              isOnOffer={game.isOnOffer}
            />
            <button
              onClick={() => addToCart("secondary")}
              disabled={adding === "secondary"}
              className="w-full py-3 rounded-xl border border-sky-400 hover:bg-sky-400 hover:text-black font-semibold"
            >
              {adding === "secondary" ? "Adding..." : "Add Secondary"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
