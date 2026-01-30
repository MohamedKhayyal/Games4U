"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

export default function EditDevicePage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    condition: "new",
    price: "",
    discount: 0,
    stock: 0,
  });

  useEffect(() => {
    if (!id) return;

    fetch(`/api/devices/id/${id}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Device not found");
        return res.json();
      })
      .then((data) => {
        const d = data.data.device;
        setForm({
          name: d.name,
          description: d.description,
          condition: d.condition,
          price: d.price,
          discount: d.discount,
          stock: d.stock,
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/devices/id/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          condition: form.condition,
          price: Number(form.price),
          discount: Number(form.discount),
          stock: Number(form.stock),
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      router.push("/admin/devices");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-slate-400">Loading device...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Edit Device</h1>

      <form
        onSubmit={submit}
        className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4"
      >
        <Input
          label="Name"
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
        />
        <Textarea
          label="Description"
          value={form.description}
          onChange={(v) => setForm({ ...form, description: v })}
        />

        <Select
          label="Condition"
          value={form.condition}
          onChange={(v) => setForm({ ...form, condition: v })}
          options={[
            { value: "new", label: "New" },
            { value: "used", label: "Used" },
          ]}
        />

        <Input
          label="Price"
          type="number"
          value={form.price}
          onChange={(v) => setForm({ ...form, price: v })}
        />
        <Input
          label="Discount (%)"
          type="number"
          value={form.discount}
          onChange={(v) => setForm({ ...form, discount: v })}
        />
        <Input
          label="Stock"
          type="number"
          value={form.stock}
          onChange={(v) => setForm({ ...form, stock: v })}
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
