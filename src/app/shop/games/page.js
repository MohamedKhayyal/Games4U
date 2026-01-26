"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/Providers/CartProvider";
import { getImageUrl } from "@/lib/imageHelper";
import Link from "next/link";

export default function GamesPage() {
  const { refetchCart } = useCart();

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("/api/games");
        const data = await res.json();
        setGames(data?.data?.games || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const addToCart = async (gameId, variant) => {
    try {
      setAdding(`${gameId}-${variant}`);

      const res = await fetch("/api/cart/items", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: gameId,
          itemType: "game",
          variant,
        }),
      });

      if (!res.ok) {
        throw new Error("Please login first");
      }

      await refetchCart();
    } catch (err) {
      alert(err.message);
    } finally {
      setAdding(null);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-400 text-sm">
        Loading games...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
      <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-8">
        Games Store
      </h1>

      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          xl:grid-cols-5
          gap-3 sm:gap-4
        "
      >
        {games.map((game) => {
          const primary = game.variants?.primary;
          const secondary = game.variants?.secondary;

          return (
            <div
              key={game._id}
              className="
                bg-slate-900
                rounded-lg
                p-2 sm:p-3
                border border-slate-800
                flex flex-col
              "
            >
              <Link href={`/games/${game.slug}`}>
                <div className="relative w-full aspect-square mb-2 rounded-md overflow-hidden">
                  <Image
                    src={getImageUrl(game.photo)}
                    alt={game.name}
                    fill
                    sizes="(max-width: 640px) 50vw,
                         (max-width: 1024px) 25vw,
                         20vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              </Link>
              <h3 className="text-sm sm:text-base font-medium truncate mb-2">
                {game.name}
              </h3>

              <div className="mt-auto space-y-1">
                {primary?.enabled && (
                  <button
                    onClick={() => addToCart(game._id, "primary")}
                    disabled={adding === `${game._id}-primary`}
                    className="
                      w-full
                      text-xs sm:text-sm
                      py-1.5
                      rounded
                      bg-sky-500
                      hover:bg-sky-400
                      text-black
                      font-medium
                      disabled:opacity-60
                    "
                  >
                    {adding === `${game._id}-primary`
                      ? "Adding..."
                      : `Primary – ${primary.finalPrice} EGP`}
                  </button>
                )}

                {secondary?.enabled && (
                  <button
                    onClick={() => addToCart(game._id, "secondary")}
                    disabled={adding === `${game._id}-secondary`}
                    className="
                      w-full
                      text-xs sm:text-sm
                      py-1.5
                      rounded
                      border border-sky-400
                      hover:bg-sky-400
                      hover:text-black
                      disabled:opacity-60
                    "
                  >
                    {adding === `${game._id}-secondary`
                      ? "Adding..."
                      : `Secondary – ${secondary.finalPrice} EGP`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
