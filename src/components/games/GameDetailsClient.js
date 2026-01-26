"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/Providers/CartProvider";
import { getImageUrl } from "@/lib/imageHelper";

export default function GameDetailsClient({ slug }) {
  const { refetchCart } = useCart();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`/api/games/${slug}`);
        const data = await res.json();
        setGame(data?.data?.game || null);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [slug]);

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

  if (loading) {
    return <p className="text-center py-20">Loading game...</p>;
  }

  if (!game) {
    return <p className="text-center py-20">Game not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-white">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
          <Image
            src={getImageUrl(game.photo)}
            alt={game.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{game.name}</h1>

          <div className="flex flex-wrap gap-2 space-x-2">
            <span className="text-sm bg-slate-800 px-3 py-1 rounded-full">
              {game.platform}
            </span>
          </div>

          {game.description && (
            <p className="text-slate-400 leading-relaxed">{game.description}</p>
          )}

          <span
            className={`text-sm ${
              game.stock > 0 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {game.stock > 0 ? `In stock (${game.stock})` : "Out of stock"}
          </span>

          <div className="space-y-3 pt-4">
            {game.variants?.primary?.enabled && (
              <VariantButton
                label={game.variants.primary.label || "Primary Edition"}
                price={game.variants.primary.finalPrice}
                loading={adding === "primary"}
                disabled={game.stock <= 0}
                onClick={() => addToCart("primary")}
              />
            )}

            {game.variants?.secondary?.enabled && (
              <VariantButton
                label={game.variants.secondary.label || "Secondary Edition"}
                price={game.variants.secondary.finalPrice}
                loading={adding === "secondary"}
                disabled={game.stock <= 0}
                onClick={() => addToCart("secondary")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function VariantButton({ label, price, loading, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        w-full flex justify-between items-center px-6 py-4 rounded-xl
        font-semibold transition
        ${
          disabled
            ? "bg-slate-700 text-slate-400 cursor-not-allowed"
            : "bg-sky-500 hover:bg-sky-400 text-black"
        }
      `}
    >
      <span>{label}</span>
      <span>{loading ? "Adding..." : `${price} EGP`}</span>
    </button>
  );
}

function Badge({ text, variant = "solid" }) {
  return (
    <span
      className={
        variant === "outline"
          ? "px-3 py-1 rounded-full border border-slate-600 text-slate-300 text-xs"
          : "px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-xs"
      }
    >
      {text}
    </span>
  );
}
