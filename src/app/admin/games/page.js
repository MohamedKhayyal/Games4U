"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminGamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/games/admin", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setGames(d?.data?.games || []))
      .finally(() => setLoading(false));
  }, []);

  const toggleActive = async (id) => {
    const res = await fetch(`/api/games/${id}/toggle-active`, {
      method: "PATCH",
      credentials: "include",
    });

    if (!res.ok) return alert("Failed to toggle active");

    setGames((prev) =>
      prev.map((g) => (g._id === id ? { ...g, isActive: !g.isActive } : g)),
    );
  };

  const toggleFeatured = async (id) => {
    const res = await fetch(`/api/games/${id}/feature`, {
      method: "PATCH",
      credentials: "include",
    });

    if (!res.ok) return alert("Failed to toggle featured");

    const data = await res.json();

    setGames((prev) =>
      prev.map((g) =>
        g._id === id ? { ...g, isFeatured: data.data.isFeatured } : g,
      ),
    );
  };

  if (loading) return <p className="text-slate-400">Loading games...</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Games</h1>
        <Link
          href="/admin/games/add"
          className="bg-sky-500 hover:bg-sky-400 px-4 py-2 rounded text-black font-medium"
        >
          + Add Game
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Platform</th>
              <th>Discount</th>
              <th>Primary</th>
              <th>Secondary</th>
              <th>Stock</th>
              <th>Active</th>
              <th>Featured</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {games.map((game) => (
              <tr
                key={game._id}
                className="border-t border-slate-800 hover:bg-slate-800/40"
              >
                <td className="p-3 font-medium">{game.name}</td>
                <td className="capitalize">{game.platform}</td>
                <td>{game.discount ? `${game.discount}%` : "-"}</td>
                <td>{game.variants?.primary?.finalPrice} EGP</td>
                <td>
                  {game.variants?.secondary?.enabled
                    ? `${game.variants.secondary.finalPrice} EGP`
                    : "-"}
                </td>
                <td>{game.stock}</td>

                <td>
                  <button
                    onClick={() => toggleActive(game._id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        game.isActive
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                  >
                    {game.isActive ? "Active" : "Inactive"}
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => toggleFeatured(game._id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition
                      ${
                        game.isFeatured
                          ? "bg-yellow-400 text-black"
                          : "bg-slate-700 text-slate-300 hover:bg-yellow-500 hover:text-black"
                      }`}
                  >
                    {game.isFeatured ? "★ Featured" : "☆ Feature"}
                  </button>
                </td>

                <td className="p-3 text-right space-x-3">
                  <Link
                    href={`/admin/games/edit/${game._id}`}
                    className="text-sky-400"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
