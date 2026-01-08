"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [showAddress, setShowAddress] = useState(false);

  const products = [
    {
      name: "Running Shoes",
      description: [
        "Lightweight and comfortable",
        "Breathable mesh upper",
        "Ideal for jogging and casual wear",
      ],
      offerPrice: 250,
      price: 200,
      quantity: 1,
      image: "/images/godOfWar.jpg",
      category: "Footwear",
    },
    {
      name: "Running Shoes",
      description: [
        "Lightweight and comfortable",
        "Breathable mesh upper",
        "Ideal for jogging and casual wear",
      ],
      offerPrice: 250,
      price: 200,
      quantity: 1,
      image: "/images/godOfWar.jpg",
      category: "Footwear",
    },
    {
      name: "Running Shoes",
      description: [
        "Lightweight and comfortable",
        "Breathable mesh upper",
        "Ideal for jogging and casual wear",
      ],
      offerPrice: 250,
      price: 200,
      quantity: 1,

      image: "/images/godOfWar.jpg",
      category: "Footwear",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-8xl w-full px-24 mx-auto text-white">
      {/* LEFT - CART */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-semibold mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-sky-400">{products.length} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-slate-400 text-sm font-medium pb-3 border-b border-slate-700">
          <p>Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {products.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base pt-6 border-b border-slate-800"
          >
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded bg-slate-800 overflow-hidden flex items-center justify-center">
                <Image
                  lazy="loading"
                  src={product.image}
                  alt={product.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>

              <div>
                <p className="font-semibold">{product.name}</p>
                <div className="flex items-center gap-2 text-slate-400 mt-2">
                  <span>Qty:</span>
                  <select className="bg-slate-900 border border-slate-700 outline-none px-2">
                    {[1, 2, 3, 4, 5].map((q) => (
                      <option key={q}>{q}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <p className="text-center font-medium">
              ${product.offerPrice * product.quantity}
            </p>

            <button className="mx-auto text-red-500 hover:text-red-400">
              ✕
            </button>
          </div>
        ))}

        <Link
          href={"/shop"}
          className="mt-8 text-sky-400 hover:underline flex items-center gap-2"
        >
          ← Continue Shopping
        </Link>
      </div>

      {/* RIGHT - SUMMARY */}
      <div className="max-w-[360px] w-full bg-slate-900 p-6 border border-slate-800 mt-16 md:mt-0 md:ml-12 rounded-lg">
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
          <div className="flex justify-between text-white font-semibold text-lg pt-2 border-t border-slate-700">
            <span>Total</span>
            <span>$612</span>
          </div>
        </div>

        <button className="w-full py-3 mt-6 bg-sky-500 hover:bg-sky-400 transition rounded-md font-medium">
          Place Order
        </button>
      </div>
    </div>
  );
}
