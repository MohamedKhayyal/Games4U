"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/Providers/CartProvider";
import { getImageUrl } from "@/lib/imageHelper";

export default function DevicesClient() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(null);

  const { refetchCart } = useCart();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await fetch("/api/devices");
        const data = await res.json();
        setDevices(data?.data?.devices || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const addToCart = async (deviceId) => {
    try {
      setAdding(deviceId);

      const res = await fetch("/api/cart/items", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: deviceId,
          itemType: "device",
        }),
      });

      if (!res.ok) throw new Error();

      await refetchCart();
    } catch {
      alert("Please login first");
    } finally {
      setAdding(null);
    }
  };

  if (loading) {
    return (
      <p className="text-center py-20 text-slate-400">Loading devices...</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold mb-8">Devices</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {devices.map((device) => (
          <div
            key={device._id}
            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-sky-400 transition flex flex-col"
          >
            <Link href={`/shop/devices/${device.slug}`}>
              {" "}
              <div className="relative aspect-square">
                <Image
                  src={getImageUrl(device.photo)}
                  alt={device.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>

            <div className="p-3 flex flex-col gap-2 flex-1">
              <p className="font-medium truncate">{device.name}</p>

              <p className="text-sm text-slate-400 capitalize">
                {device.condition}
              </p>

              <p className="text-sky-400 font-semibold">
                {device.finalPrice} EGP
              </p>

              <button
                onClick={() => addToCart(device._id)}
                disabled={adding === device._id || device.stock <= 0}
                className={`
                  mt-auto py-2 rounded-md text-sm font-medium transition
                  ${
                    device.stock <= 0
                      ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                      : "bg-sky-500 hover:bg-sky-400 text-black"
                  }
                `}
              >
                {adding === device._id
                  ? "Adding..."
                  : device.stock > 0
                    ? "Add to Cart"
                    : "Out of Stock"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
