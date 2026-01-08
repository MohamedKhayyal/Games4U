"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const products = Array(3).fill({
    name: "God Of War Ragnarök",
    offerPrice: 200,
    quantity: 1,
    image: "/images/godOfWar.jpg",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 text-white">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* LEFT - CART */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-6">
            Shopping Cart{" "}
            <span className="text-sm text-sky-400">
              {products.length} Items
            </span>
          </h1>

          {/* TABLE HEADER (desktop only) */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-slate-400 text-sm font-medium pb-3 border-b border-slate-700">
            <p>Product</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          {/* ITEMS */}
          {products.map((product, index) => (
            <div
              key={index}
              className="
                grid
                grid-cols-1
                md:grid-cols-[2fr_1fr_1fr]
                gap-4
                md:gap-0
                items-center
                py-6
                border-b border-slate-800
              "
            >
              {/* Product */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded bg-slate-800 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="font-semibold">{product.name}</p>

                  <div className="flex items-center gap-2 text-slate-400 mt-2">
                    <span>Qty:</span>
                    <select className="bg-slate-900 border border-slate-700 px-2 py-1 rounded">
                      {[1, 2, 3, 4, 5].map((q) => (
                        <option key={q}>{q}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Subtotal */}
              <p className="md:text-center font-medium">
                ${product.offerPrice * product.quantity}
              </p>

              {/* Remove */}
              <button className="md:mx-auto text-red-500 hover:text-red-400">
                ✕
              </button>
            </div>
          ))}

          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 text-sky-400 hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* RIGHT - ORDER SUMMARY */}
        <div className="w-full lg:max-w-[360px] bg-slate-900 p-6 border border-slate-800 rounded-xl self-start">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4 text-slate-400 text-sm">
            <div className="flex justify-between">
              <span>Price</span>
              <span>$600</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-500">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (2%)</span>
              <span>$12</span>
            </div>
            <div className="flex justify-between text-white font-semibold text-lg pt-3 border-t border-slate-700">
              <span>Total</span>
              <span>$612</span>
            </div>
          </div>

          <button className="w-full py-3 mt-6 bg-sky-500 hover:bg-sky-400 transition rounded-md font-medium">
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
}
