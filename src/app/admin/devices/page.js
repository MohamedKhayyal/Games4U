"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDevicesPage() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/devices", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setDevices(d.data.devices || []))
      .finally(() => setLoading(false));
  }, []);

  const deleteDevice = async (id) => {
    if (!confirm("Delete this device?")) return;

    await fetch(`/api/devices/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setDevices((prev) => prev.filter((d) => d._id !== id));
  };

  const toggleFeatured = async (id) => {
    try {
      const res = await fetch(`/api/devices/${id}/feature`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      setDevices((prev) =>
        prev.map((d) =>
          d._id === id ? { ...d, isFeatured: data.data.isFeatured } : d,
        ),
      );
    } catch {
      alert("Failed to update featured status");
    }
  };

  if (loading) return <p className="text-slate-400">Loading devices...</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Devices</h1>
        <Link
          href="/admin/devices/add"
          className="bg-sky-500 hover:bg-sky-400 px-4 py-2 rounded text-black font-medium"
        >
          + Add Device
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Featured</th>
              <th>Offer</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {devices.map((d) => (
              <tr
                key={d._id}
                className="border-t border-slate-800 hover:bg-slate-800/40"
              >
                <td className="p-3">{d.name}</td>
                <td>{d.finalPrice} EGP</td>
                <td>{d.stock}</td>

                {/* ⭐ FEATURED */}
                <td>
                  <button
                    onClick={() => toggleFeatured(d._id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition
                      ${
                        d.isFeatured
                          ? "bg-yellow-400 text-black"
                          : "bg-slate-700 text-slate-300 hover:bg-yellow-500 hover:text-black"
                      }`}
                  >
                    {d.isFeatured ? "★ Featured" : "☆ Feature"}
                  </button>
                </td>

                <td>
                  {d.isOnOffer ? (
                    <span className="text-green-400">ON</span>
                  ) : (
                    <span className="text-slate-400">OFF</span>
                  )}
                </td>

                <td className="p-3 text-right space-x-3">
                  <Link
                    href={`/admin/devices/edit/${d._id}`}
                    className="text-sky-400"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteDevice(d._id)}
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
