"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

export default function AddGamePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    platform: "ps5",
    category: "",
    stock: 0,
    primaryPrice: "",
    secondaryPrice: "",
    photo: null,
  });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!form.category) {
        alert("Please select category");
        return;
      }

      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.description);
      fd.append("platform", form.platform);
      fd.append("category", form.category);
      fd.append("stock", form.stock);

      fd.append("variants[primary][enabled]", "true");
      fd.append("variants[primary][price]", form.primaryPrice);

      if (form.secondaryPrice) {
        fd.append("variants[secondary][enabled]", "true");
        fd.append("variants[secondary][price]", form.secondaryPrice);
      }

      if (form.photo) {
        fd.append("photo", form.photo);
      }

      const res = await fetch("/api/games", {
        method: "POST",
        credentials: "include",
        body: fd,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to add game");
      }

      router.push("/admin/games");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add Game</h1>

      <form
        onSubmit={submit}
        className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4"
      >
        <Input
          label="Game Name"
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
        />

        <Textarea
          label="Description"
          value={form.description}
          onChange={(v) => setForm({ ...form, description: v })}
        />

        <Select
          label="Platform"
          value={form.platform}
          onChange={(v) => setForm({ ...form, platform: v })}
          options={[
            { value: "ps5", label: "PS5" },
            { value: "ps4", label: "PS4" },
            { value: "xbox", label: "Xbox" },
          ]}
        />

        <Select
          label="Category"
          value={form.category}
          onChange={(v) => setForm({ ...form, category: v })}
          options={[
            { value: "action", label: "Action" },
            { value: "rpg", label: "RPG" },
            { value: "sports", label: "Sports" },
            { value: "adventure", label: "Adventure" },
            { value: "platformer", label: "Platformer" },
          ]}
        />

        <Input
          label="Stock"
          type="number"
          value={form.stock}
          onChange={(v) => setForm({ ...form, stock: v })}
        />

        <Input
          label="Primary Price (EGP)"
          type="number"
          value={form.primaryPrice}
          onChange={(v) => setForm({ ...form, primaryPrice: v })}
        />

        <Input
          label="Secondary Price (optional)"
          type="number"
          value={form.secondaryPrice}
          onChange={(v) => setForm({ ...form, secondaryPrice: v })}
        />

        <div>
          <label className="block mb-1 text-sm text-slate-400">
            Game Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, photo: e.target.files?.[0] || null })
            }
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-sky-500 hover:bg-sky-400 text-black py-3 rounded-xl font-semibold"
        >
          {loading ? "Saving..." : "Add Game"}
        </button>
      </form>
    </div>
  );
}