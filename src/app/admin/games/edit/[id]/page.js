"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditGamePage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    platform: "",
    stock: 0,
    primaryPrice: "",
    secondaryPrice: "",
  });
  useEffect(() => {
    if (!id) return;

    fetch(`/api/games/id/${id}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Game not found");
        return res.json();
      })
      .then((data) => {
        const g = data?.data?.game;
        if (!g) throw new Error("No game data");

        setForm({
          name: g.name || "",
          description: g.description || "",
          platform: g.platform || "",
          stock: g.stock ?? 0,
          primaryPrice: g.variants?.primary?.price ?? "",
          secondaryPrice: g.variants?.secondary?.price ?? "",
        });
      })
      .catch((err) => {
        alert(err.message);
        router.push("/admin/games");
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/games/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          platform: form.platform,
          stock: Number(form.stock),
          variants: {
            primary: {
              enabled: true,
              price: Number(form.primaryPrice),
            },
            secondary: {
              enabled: form.secondaryPrice !== "",
              price: form.secondaryPrice ? Number(form.secondaryPrice) : 0,
            },
          },
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      router.push("/admin/games");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-slate-400">Loading game...</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Edit Game</h1>

      <form
        onSubmit={submit}
        className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4"
      >
        <input
          className="w-full bg-slate-800 p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Game name"
        />

        <textarea
          className="w-full bg-slate-800 p-2 rounded"
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
        />

        <select
          className="w-full bg-slate-800 p-2 rounded"
          value={form.platform}
          onChange={(e) => setForm({ ...form, platform: e.target.value })}
        >
          <option value="">Select platform</option>
          <option value="ps5">PS5</option>
          <option value="ps4">PS4</option>
          <option value="xbox">Xbox</option>
        </select>

        <input
          type="number"
          className="w-full bg-slate-800 p-2 rounded"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          placeholder="Stock"
        />

        <input
          type="number"
          className="w-full bg-slate-800 p-2 rounded"
          value={form.primaryPrice}
          onChange={(e) => setForm({ ...form, primaryPrice: e.target.value })}
          placeholder="Primary price"
        />

        <input
          type="number"
          className="w-full bg-slate-800 p-2 rounded"
          value={form.secondaryPrice}
          onChange={(e) => setForm({ ...form, secondaryPrice: e.target.value })}
          placeholder="Secondary price (optional)"
        />

        <button
          disabled={saving}
          className="w-full bg-sky-500 py-3 rounded-xl text-black font-semibold"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
