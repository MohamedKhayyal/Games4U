"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

export default function EditGamePage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    platform: "ps5",
    stock: 0,
    primaryPrice: "",
    secondaryPrice: "",
    discount: 0,
  });

  useEffect(() => {
    if (!id) return;

    fetch(`/api/games/id/${id}`, { credentials: "include" })
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
          platform: g.platform || "ps5",
          stock: g.stock ?? 0,
          primaryPrice: g.variants?.primary?.price ?? "",
          secondaryPrice: g.variants?.secondary?.enabled
            ? g.variants.secondary.price
            : "",
          discount: g.discount ?? 0,
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
          discount: Number(form.discount),
          variants: {
            primary: {
              enabled: true,
              price: Number(form.primaryPrice),
            },
            secondary: {
              enabled: form.secondaryPrice !== "",
              price:
                form.secondaryPrice !== ""
                  ? Number(form.secondaryPrice)
                  : 0,
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

  if (loading) return <p className="text-slate-400">Loading game...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Edit Game</h1>

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

        <Input
          label="Discount (%)"
          type="number"
          value={form.discount}
          onChange={(v) => setForm({ ...form, discount: v })}
        />

        <button
          disabled={saving}
          className="w-full bg-sky-500 py-3 rounded-xl text-black font-semibold disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
