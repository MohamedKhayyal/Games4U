"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Providers/AuthProvider";
import { useCart } from "@/Providers/CartProvider";
import { getImageUrl } from "@/lib/imageHelper";
import Image from "next/image";

export default function CartClient() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { cart, loading: cartLoading, refetchCart } = useCart();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth/login");
    }
  }, [authLoading, user, router]);

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

    await refetchCart();
  };

  const placeOrder = async () => {
  try {
    const res = await fetch("/api/order", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Order error:", data);
      throw new Error(data.message || "Order failed");
    }

    await refetchCart();

    router.push("/orders");
  } catch (err) {
    alert(err.message);
  }
};


  if (authLoading || cartLoading) {
    return <p className="text-center py-20">Loading cart...</p>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-24 text-slate-400">
        <p className="text-xl mb-4">Your cart is empty</p>
        <Link href="/shop/games" className="text-sky-400 hover:underline">
          Go shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 text-white">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-6">
            Shopping Cart{" "}
            <span className="text-sm text-sky-400">
              {cart.items.length} Items
            </span>
          </h1>

          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-slate-400 text-sm font-medium pb-3 border-b border-slate-700">
            <p>Product</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          {cart.items.map((item) => (
            <div
              key={`${item.item._id}-${item.variant}`}
              className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 items-center py-6 border-b border-slate-800"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded bg-slate-800 overflow-hidden">
                  <Image
                    src={getImageUrl(item.item.photo)}
                    alt={item.item.name}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div>
                  <p className="font-semibold">{item.item.name}</p>

                  {item.variant && (
                    <p className="text-sm text-slate-400">
                      Variant: {item.variant}
                    </p>
                  )}

                  <p className="text-sm text-slate-400">Qty: {item.quantity}</p>
                </div>
              </div>

              <p className="md:text-center font-medium">{item.subTotal} EGP</p>

              <button
                onClick={() => removeItem(item)}
                className="md:mx-auto text-red-500 hover:text-red-400"
              >
                ✕
              </button>
            </div>
          ))}

          <Link
            href="/shop/games"
            className="mt-8 inline-flex items-center gap-2 text-sky-400 hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>

        <div className="w-full lg:max-w-[360px] bg-slate-900 p-6 border border-slate-800 rounded-xl self-start">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4 text-slate-400 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{cart.totalPrice} EGP</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-500">Free</span>
            </div>

            <div className="flex justify-between text-white font-semibold text-lg pt-3 border-t border-slate-700">
              <span>Total</span>
              <span>{cart.totalPrice} EGP</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            disabled={!cart || cart.items.length === 0}
            className="w-full py-3 mt-6 bg-sky-500 hover:bg-sky-400 transition rounded-md font-medium text-black disabled:opacity-50"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
