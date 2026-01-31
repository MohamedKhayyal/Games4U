import { Suspense } from "react";
import OrdersClient from "@/components/order/Order";

export const metadata = {
  title: "My Orders | Games4U",
  description: "View your orders history on Games4U",
};

export default function OrdersPage() {
  return (
    <Suspense fallback={<p className="text-center py-20">Loading orders...</p>}>
      <OrdersClient />
    </Suspense>
  );
}
