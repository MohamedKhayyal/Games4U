"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart } from "@/Providers/CartProvider";
import { getImageUrl } from "../../lib/imageHelper";

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
        console.log()
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

            if (!res.ok) throw new Error();
            refetchCart();
        } catch {
            alert("Please login first");
        } finally {
            setLoadingId(null);
        }
    };

    if (!games.length) return null;

    return (
        <section className="relative mt-5 max-w-7xl mx-auto px-2 py-10">
            <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-2xl font-semibold">Best Sellers</h2>
                <div className="hidden sm:flex gap-2">
                    <button onClick={() => scroll("left")} className="w-9 h-9 rounded-full bg-slate-800">←</button>
                    <button onClick={() => scroll("right")} className="w-9 h-9 rounded-full bg-slate-800">→</button>
                </div>
            </div>

            <div ref={sliderRef} className="flex gap-4 overflow-x-auto scrollbar-hide px-2">
                {games.map((game) => {
                    const primary = game.variants?.primary;
                    const secondary = game.variants?.secondary;

                    return (
                        <div
                            key={game._id}
                            className="min-w-[260px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
                        >
                            <Link href={`/games/${game.slug}`}>
                                <div className="relative h-48">
                                    <img
                                        src={getImageUrl(game.photo)}
                                        alt={game.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                            </Link>

                            <div className="p-4 space-y-3">
                                <p className="font-medium">{game.name}</p>

                                {primary?.enabled && (
                                    <Variant
                                        label="Primary"
                                        price={primary.finalPrice}
                                        loading={loadingId === `${game._id}-primary`}
                                        onAdd={() => addToCart(game._id, "primary")}
                                    />
                                )}

                                {secondary?.enabled && (
                                    <Variant
                                        label="Secondary"
                                        price={secondary.finalPrice}
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

function Variant({ label, price, onAdd, loading }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">{label}</span>
            <div className="flex gap-2 items-center">
                <span className="text-sky-400 font-semibold">${price}</span>
                <button
                    onClick={onAdd}
                    disabled={loading}
                    className="px-3 py-1 text-xs bg-sky-500 rounded"
                >
                    {loading ? "..." : "Add"}
                </button>
            </div>
        </div>
    );
} 