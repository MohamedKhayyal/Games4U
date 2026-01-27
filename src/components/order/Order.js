"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Providers/AuthProvider";
import { getImageUrl } from "@/lib/imageHelper";

export default function OrdersClient() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/order/my-orders", {
          credentials: "include",
        });

        const data = await res.json();
        setOrders(data?.data?.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  if (authLoading || loading) {
    return <p className="text-center py-20">Loading orders...</p>;
  }

  if (!orders.length) {
    return (
      <div className="text-center py-24 text-slate-400">
        <p className="text-xl mb-4">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-14 text-white">
      <h1 className="text-3xl font-semibold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5"
          >
            <div className="flex justify-between items-center mb-4 text-sm text-slate-400">
              <span>Order #{order._id.slice(-6)}</span>
              <StatusBadge status={order.status} />
            </div>

            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border-b border-slate-800 pb-3"
                >
                  <div className="w-16 h-16 rounded bg-slate-800 overflow-hidden">
                    <img
                      src={getImageUrl(item.photo)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    {item.variant && (
                      <p className="text-xs text-slate-400">
                        Variant: {item.variant}
                      </p>
                    )}
                    <p className="text-xs text-slate-400">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">{item.subTotal} EGP</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-semibold">
                Total: {order.totalPrice} EGP
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    pending: "bg-yellow-500/20 text-yellow-400",
    confirmed: "bg-green-500/20 text-green-400",
    cancelled: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
}
