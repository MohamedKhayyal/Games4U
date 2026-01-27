"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/imageHelper";

export default function DevicesClient() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <p className="text-center py-20 text-slate-400">Loading devices...</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold mb-8">Gaming Devices</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {devices.map((device) => (
          <Link
            key={device._id}
            href={`/devices/${device.slug}`}
            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-sky-400 transition"
          >
            <div className="relative aspect-square">
              <Image
                src={getImageUrl(device.photo)}
                alt={device.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-3 space-y-1">
              <p className="font-medium truncate">{device.name}</p>

              <p className="text-sm text-slate-400">
                {device.condition === "new" ? "New" : "Used"}
              </p>

              <p className="text-sky-400 font-semibold">
                {device.finalPrice} EGP
              </p>

              {device.isOnOffer && (
                <p className="text-xs text-green-400">On Offer</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
