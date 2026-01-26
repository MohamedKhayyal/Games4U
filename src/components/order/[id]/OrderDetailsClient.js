"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Providers/AuthProvider";
import { getImageUrl } from "@/lib/imageHelper";
import Image from "next/image";

export default function OrderDetailsClient({ orderId }) {
  const statusStyles = {
    pending: "border-yellow-500 bg-yellow-500/5",
    confirmed: "border-green-500 bg-green-500/10",
    cancelled: "border-red-500 bg-red-500/10",
  };

  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/order/${orderId}`, {
          credentials: "include",
        });
        const data = await res.json();
        setOrder(data.data.order);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrder();
  }, [orderId, user]);

  if (loading || authLoading) {
    return <p className="text-center py-20">Loading order...</p>;
  }

  if (!order) {
    return <p className="text-center py-20">Order not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-14 text-white">
      <h1 className="text-3xl font-semibold mb-6">Order Details</h1>

      <div className="mb-6 flex justify-between text-sm text-slate-400">
        <span>Order ID: {order._id}</span>
        <span className={`border rounded-xl p-2 ${statusStyles[order.status]}`}>
          Status: {order.status}
        </span>
      </div>

      <div className="space-y-4">
        {order.items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-lg p-4"
          >
            <div className="w-20 h-20 rounded bg-slate-800 overflow-hidden">
              <Image
                src={getImageUrl(item.photo)}
                alt={item.name}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              {item.variant && (
                <p className="text-sm text-slate-400">
                  Variant: {item.variant}
                </p>
              )}
              <p className="text-sm text-slate-400">Qty: {item.quantity}</p>
            </div>

            <p className="font-semibold">{item.subTotal} EGP</p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right text-xl font-semibold">
        Total: {order.totalPrice} EGP
      </div>
    </div>
  );
}
