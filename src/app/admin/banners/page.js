"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/banners/admin", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setBanners(d?.data?.banners || []))
      .finally(() => setLoading(false));
  }, []);

  const deleteBanner = async (id) => {
    if (!confirm("Delete this banner?")) return;

    const res = await fetch(`/api/banners/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setBanners((prev) => prev.filter((b) => b._id !== id));
    }
  };

  const toggleActive = async (id) => {
    const res = await fetch(`/api/banners/${id}/toggle-active`, {
      method: "PATCH",
      credentials: "include",
    });

    if (!res.ok) return;

    const data = await res.json();

    setBanners((prev) =>
      prev.map((b) =>
        b._id === id ? { ...b, isActive: data.data.isActive } : b,
      ),
    );
  };

  if (loading) return <p className="text-slate-400">Loading banners...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Banners</h1>

        <Link
          href="/admin/banners/add"
          className="bg-sky-500 px-4 py-2 rounded text-black font-medium"
        >
          + Add Banner
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 text-slate-300">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Discount</th>
              <th className="p-3 text-left">Position</th>
              <th className="p-3 text-left">Start</th>
              <th className="p-3 text-left">End</th>
              <th className="p-3 text-center">Active</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {banners.map((banner) => (
              <tr
                key={banner._id}
                className="border-t border-slate-800 hover:bg-slate-900/60"
              >
                <td className="p-3 font-medium">{banner.title}</td>

                <td className="p-3 text-slate-400">
                  {banner.discountText || "-"}
                </td>

                <td className="p-3 font-medium">{banner.position}</td>

                <td className="p-3 text-slate-400">
                  {new Date(banner.startDate).toLocaleDateString()}
                </td>
                <td className="p-3 text-slate-400">
                  {new Date(banner.endDate).toLocaleDateString()}
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => toggleActive(banner._id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition
                      ${
                        banner.isActive
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                  >
                    {banner.isActive ? "Active" : "Inactive"}
                  </button>
                </td>

                <td className="p-3 text-center space-x-3">
                  <Link
                    href={`/admin/banners/edit/${banner._id}`}
                    className="text-sky-400"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteBanner(banner._id)}
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
    </div>
  );
}
