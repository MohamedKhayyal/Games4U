"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBannerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const res = await fetch("/api/banners", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (res.ok) {
      router.push("/admin/banners");
    } else {
      const data = await res.json();
      alert(data.message || "Failed to create banner");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Add Banner</h1>

      <form
        onSubmit={submit}
        className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5"
      >
        <Input label="Title" name="title" required />
        <Textarea label="Description" name="description" />

        <Input
          label="Discount Text"
          name="discountText"
          placeholder="EX: Up to 50% OFF"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input type="date" label="Start Date" name="startDate" required />
          <Input type="date" label="End Date" name="endDate" required />
        </div>

        <Input type="number" label="Position" name="position" placeholder="0" />

        <Input type="file" label="Banner Image" name="image" required />

        <button
          disabled={loading}
          className="w-full bg-sky-500 hover:bg-sky-400 text-black py-3 rounded-xl font-semibold disabled:opacity-60"
        >
          {loading ? "Saving..." : "Create Banner"}
        </button>
      </form>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm mb-1 text-slate-400">{label}</label>
      <input {...props} className="w-full bg-slate-800 px-3 py-2 rounded" />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm mb-1 text-slate-400">{label}</label>
      <textarea
        {...props}
        rows={3}
        className="w-full bg-slate-800 px-3 py-2 rounded"
      />
    </div>
  );
}
