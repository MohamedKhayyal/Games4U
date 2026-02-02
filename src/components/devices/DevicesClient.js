"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/Providers/CartProvider";
import { getImageUrl } from "@/lib/imageHelper";
import Price from "@/components/ui/Price";

export default function DevicesClient({ initialDevices = [] }) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(null);

  const handleAddToCart = async (deviceId) => {
    try {
      setAdding(deviceId);

      await addItem({
        itemId: deviceId,
        itemType: "device",
      });
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
            <div className="relative h-44 mb-3 rounded-lg overflow-hidden">
              <Image
                src={getImageUrl(device.photo)}
                alt={device.name}
                fill
                className="object-cover"
              />

              {device.isOnOffer && (
                <span className="absolute top-2 left-2 bg-red-500 text-xs px-2 py-1 rounded">
                  -{device.discount}%
                </span>
              )}
            </div>
          </Link>

          <div className="p-3 flex flex-col gap-2 flex-1">
            <p className="font-medium truncate">{device.name}</p>

            <p className="text-sm text-slate-400 capitalize">
              Condition: {device.condition}
            </p>

            <Price
              price={device.price}
              finalPrice={device.finalPrice}
              isOnOffer={device.isOnOffer}
            />

            <button
              onClick={() => handleAddToCart(device._id)}
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
