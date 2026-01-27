"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/Providers/CartProvider";
import { getImageUrl } from "@/lib/imageHelper";

export default function DeviceDetailsClient({ slug }) {
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const { refetchCart } = useCart();

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const res = await fetch(`/api/devices/${slug}`);
        const data = await res.json();
        setDevice(data?.data?.device);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, [slug]);

  const addToCart = async () => {
    try {
      setAdding(true);

      const res = await fetch("/api/cart/items", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: device._id,
          itemType: "device",
        }),
      });

      if (!res.ok) throw new Error();

      await refetchCart();
    } catch {
      alert("Please login first");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <p className="text-center py-20">Loading device...</p>;
  }

  if (!device) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-white">
      <div className="grid md:grid-cols-2 gap-12">
        {/* IMAGE */}
        <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-800">
          <Image
            src={getImageUrl(device.photo)}
            alt={device.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* INFO */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{device.name}</h1>

          <p className="text-slate-400 leading-relaxed">
            {device.description}
          </p>

          <div className="flex gap-3 text-sm">
            <Badge text={device.condition.toUpperCase()} />
            {device.isOnOffer && (
              <Badge text="ON OFFER" variant="green" />
            )}
          </div>

          <p className="text-2xl font-semibold text-sky-400">
            {device.finalPrice} EGP
          </p>

          <p
            className={
              device.stock > 0
                ? "text-emerald-400"
                : "text-red-400"
            }
          >
            {device.stock > 0
              ? `In stock (${device.stock})`
              : "Out of stock"}
          </p>

          <button
            onClick={addToCart}
            disabled={adding || device.stock <= 0}
            className={`
              w-full py-4 rounded-xl font-semibold transition
              ${
                device.stock <= 0
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                  : "bg-sky-500 hover:bg-sky-400 text-black"
              }
            `}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Badge({ text, variant = "default" }) {
  const styles = {
    default: "bg-slate-800 text-slate-200",
    green: "bg-green-500/20 text-green-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[variant]}`}
    >
      {text}
    </span>
  );
}
