"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminGamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/games", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setGames(d?.data?.games || []))
      .finally(() => setLoading(false));
  }, []);

  const deleteGame = async (id) => {
    if (!confirm("Are you sure you want to delete this game?")) return;

    const res = await fetch(`/api/games/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setGames((prev) => prev.filter((g) => g._id !== id));
    } else {
      alert("Failed to delete game");
    }
  };

  if (loading) {
    return <p className="text-slate-400">Loading games...</p>;
  }

  if (!games.length) {
    return <p className="text-slate-400">No games found.</p>;
  }

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
              <th>primary Price</th>
              <th>secondary Price</th>
              <th>Stock</th>
              <th>Offer</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {games.map((game) => (
              <tr
                key={game._id}
                className="border-t border-slate-800 hover:bg-slate-800/40"
              >
                <td className="p-3">{game.name}</td>
                <td className="capitalize">{game.platform}</td>
                <td>{game.variants?.primary?.finalPrice} EGP</td>
                <td>{game.variants?.secondary?.finalPrice} EGP</td>
                <td>{game.stock}</td>
                <td>
                  {game.isOnOffer ? (
                    <span className="text-green-400">ON</span>
                  ) : (
                    <span className="text-slate-400">OFF</span>
                  )}
                </td>
                <td className="p-3 text-right space-x-3">
                  <Link
                    href={`/admin/games/edit/${game._id}`}
                    className="text-sky-400"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteGame(game._id)}
                    className="text-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
