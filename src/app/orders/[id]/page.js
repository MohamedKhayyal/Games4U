import OrderDetailsClient from "@/components/order/[id]/OrderDetailsClient";

export const metadata = {
  title: "Order Details | Games4U",
};

export default async function OrderDetailsPage({ params }) {
  const { id } = await params;

  return <OrderDetailsClient orderId={id} />;
}
