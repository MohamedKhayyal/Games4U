"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function EditBannerPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    discountText: "",
    startDate: "",
    endDate: "",
    position: 0,
  });

  useEffect(() => {
    if (!id) return;

    fetch(`/api/banners/${id}`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        const banner = data?.data?.banner;
        if (!banner) return;

        setForm({
          title: banner.title || "",
          description: banner.description || "",
          discountText: banner.discountText || "",
          startDate: banner.startDate?.slice(0, 10) || "",
          endDate: banner.endDate?.slice(0, 10) || "",
          position: banner.position ?? 0,
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );

    const res = await fetch(`/api/banners/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    });

    if (res.ok) {
      router.push("/admin/banners");
    } else {
      alert("Failed to update banner");
    }
  };

  if (loading) return <p className="text-slate-400">Loading banner...</p>;

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Edit Banner</h1>

      <form
        onSubmit={submit}
        className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5"
      >
        <Input
          label="Title"
          value={form.title}
          onChange={(value) =>
            setForm((f) => ({ ...f, title: value }))
          }
        />

        <Textarea
          label="Description"
          value={form.description}
          onChange={(value) =>
            setForm((f) => ({ ...f, description: value }))
          }
        />

        <Input
          label="Discount Text"
          value={form.discountText}
          onChange={(value) =>
            setForm((f) => ({ ...f, discountText: value }))
          }
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            label="Start Date"
            value={form.startDate}
            onChange={(value) =>
              setForm((f) => ({ ...f, startDate: value }))
            }
          />
          <Input
            type="date"
            label="End Date"
            value={form.endDate}
            onChange={(value) =>
              setForm((f) => ({ ...f, endDate: value }))
            }
          />
        </div>

        <Input
          type="number"
          label="Position"
          value={form.position}
          onChange={(value) =>
            setForm((f) => ({ ...f, position: Number(value) }))
          }
        />

        <button className="w-full bg-sky-500 py-3 rounded-xl text-black font-semibold">
          Save Changes
        </button>
      </form>
    </div>
  );
}
