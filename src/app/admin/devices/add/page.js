"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";

export default function AddDevicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    condition: "new",
    price: "",
    discount: 0,
    stock: 0,
    photo: null,
  });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!form.photo) {
        alert("Device image is required");
        return;
      }

      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.description);
      fd.append("condition", form.condition);
      fd.append("price", form.price);
      fd.append("stock", form.stock);
      fd.append("photo", form.photo);

      const res = await fetch("/api/devices", {
        method: "POST",
        credentials: "include",
        body: fd,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to add device");
      }

      router.push("/admin/devices");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add Device</h1>

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
          label="Stock"
          type="number"
          value={form.stock}
          onChange={(v) => setForm({ ...form, stock: v })}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, photo: e.target.files?.[0] })}
        />

        <button
          disabled={loading}
          className="w-full bg-sky-500 py-3 rounded-xl text-black font-semibold"
        >
          {loading ? "Saving..." : "Add Device"}
        </button>
      </form>
    </div>
  );
}
