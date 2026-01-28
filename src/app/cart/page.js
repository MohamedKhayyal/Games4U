import { Suspense } from "react";
import CartClient from "@/components/cart/Cart";
import CartSkeleton from "@/components/skeletons/CartSkeleton";

export const metadata = {
  title: "Shopping Cart | Games4U",
  description:
    "Review your selected games and complete your purchase on Games4U.",
};

export default function CartPage() {
  return (
    <Suspense fallback={<CartSkeleton />}>
      <CartClient />
    </Suspense>
  );
}
