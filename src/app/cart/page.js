"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     Fetch cart
  ========================= */
  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart/me", {
        credentials: "include",
      });

      if (!res.ok) {
        setCart(null);
        return;
      }

      const data = await res.json();
      setCart(data.data.cart);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (item) => {
    await fetch("/api/cart/items/remove", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId: item.item._id,
        itemType: item.itemType,
        variant: item.variant,
      }),
    });

    fetchCart();
  };

  if (loading) {
    return <p className="text-center py-20">Loading cart...</p>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-24 text-slate-400">
        <p className="text-xl mb-4">Your cart is empty</p>
        <Link href="/shop" className="text-sky-400 hover:underline">
          Go shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 text-white">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* LEFT */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-6">
            Shopping Cart{" "}
            <span className="text-sm text-sky-400">
              {cart.items.length} Items
            </span>
          </h1>

          {/* Header */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-slate-400 text-sm font-medium pb-3 border-b border-slate-700">
            <p>Product</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          {/* Items */}
          {cart.items.map((item) => (
            <div
              key={`${item.item._id}-${item.variant}`}
              className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 items-center py-6 border-b border-slate-800"
            >
              {/* Product */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded bg-slate-800 overflow-hidden">
                  <img
                    src={item.item.photo}
                    alt={item.item.name}
                    width={80}
                    height={80}
                    loading="lazy"
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="font-semibold">{item.item.name}</p>
                  {item.variant && (
                    <p className="text-sm text-slate-400">
                      Variant: {item.variant}
                    </p>
                  )}
                  <p className="text-sm text-slate-400">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>

              {/* Subtotal */}
              <p className="md:text-center font-medium">
                ${item.subTotal}
              </p>

              {/* Remove */}
              <button
                onClick={() => removeItem(item)}
                className="md:mx-auto text-red-500 hover:text-red-400"
              >
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

        {/* RIGHT */}
        <div className="w-full lg:max-w-[360px] bg-slate-900 p-6 border border-slate-800 rounded-xl self-start">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4 text-slate-400 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${cart.totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-500">Free</span>
            </div>
            <div className="flex justify-between text-white font-semibold text-lg pt-3 border-t border-slate-700">
              <span>Total</span>
              <span>${cart.totalPrice}</span>
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
