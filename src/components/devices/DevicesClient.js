"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/Providers/CartProvider";
import { getImageUrl } from "@/lib/imageHelper";
import Price from "@/components/ui/Price";

export default function DevicesClient({ initialDevices = [] }) {
  const [adding, setAdding] = useState(null);
  const { refetchCart } = useCart();

  const addToCart = async (deviceId) => {
    try {
      setAdding(deviceId);
      await fetch("/api/cart/items", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: deviceId,
          itemType: "device",
        }),
      });
      refetchCart();
    } finally {
      setAdding(null);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
      {initialDevices.map((device) => (
        <div
          key={device._id}
          className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col"
        >
          <Link href={`/shop/devices/${device.slug}`}>
            <div className="relative aspect-square">
              <Image
                src={getImageUrl(device.photo)}
                alt={device.name}
                fill
                sizes="(max-width: 640px) 50vw,
                       (max-width: 1024px) 25vw,
                       20vw"
                className="object-cover"
              />
            </div>
          </Link>

          <div className="p-3 flex flex-col gap-2 flex-1">
            <p className="font-medium truncate">{device.name}</p>

            <div className="flex gap-2 text-xs">
              <span className="bg-slate-800 px-2 py-0.5 rounded-full">
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

            <button
              onClick={() => addToCart(device._id)}
              disabled={adding === device._id || device.stock <= 0}
              className={`mt-auto py-2 rounded-md text-sm font-medium transition
                ${
                  device.stock <= 0
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                    : "bg-sky-500 hover:bg-sky-400 text-black"
                }`}
            >
              {adding === device._id ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
