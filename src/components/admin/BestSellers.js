"use client";

import Image from "next/image";
import { getImageUrl } from "@/lib/imageHelper";

export default function BestSellers({ title, items = [] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h3 className="font-semibold mb-4">{title}</h3>

      {items.length === 0 ? (
        <p className="text-slate-400 text-sm">No data available</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 hover:bg-slate-800/40 p-2 rounded-lg transition"
            >
              {/* IMAGE */}
              {item.photo && (
                <div className="relative w-12 h-12 rounded overflow-hidden">
                  <Image
                    src={getImageUrl(item.photo)}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* INFO */}
              <div className="flex-1">
                <p className="font-medium text-sm line-clamp-1">
                  {item.name}
                </p>
                <p className="text-xs text-slate-400">
                  Sold: {item.sold}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
