"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/Providers/CartProvider";
import { getImageUrl } from "@/lib/imageHelper";
import Price from "@/components/ui/Price";

export default function DeviceDetailsClient({ device }) {
  const [adding, setAdding] = useState(false);
  const { refetchCart } = useCart();

  const addToCart = async () => {
    try {
      setAdding(true);
      await fetch("/api/cart/items", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: device._id,
          itemType: "device",
        }),
      });
      refetchCart();
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* IMAGE */}
      <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-800">
        <Image
          src={getImageUrl(device.photo)}
          alt={device.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* INFO */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">{device.name}</h1>
        <p className="text-slate-400 leading-relaxed">{device.description}</p>

        <div className="flex gap-2">
          <span className="bg-slate-800 px-3 py-1 rounded-full text-xs">
            {device.condition.toUpperCase()}
          </span>

          {device.isOnOffer && (
            <span className="inline-block text-xs text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full">
              {device.discount}% OFF
            </span>
          )}
        </div>
        <Price
          price={device.price}
          finalPrice={device.finalPrice}
          isOnOffer={device.isOnOffer}
        />
        <span
          className={`text-sm ${
            device.stock > 0 ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {device.stock > 0 ? `In stock (${device.stock})` : "Out of stock"}
        </span>

        <button
          onClick={addToCart}
          disabled={adding || device.stock <= 0}
          className={`w-full py-4 rounded-xl font-semibold transition
            ${
              device.stock <= 0
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-sky-500 hover:bg-sky-400 text-black"
            }`}
        >
          {adding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
