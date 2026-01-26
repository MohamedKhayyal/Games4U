import { Suspense } from "react";
import CartClient from "../../components/cart/Cart";

export const metadata = {
  title: "Shopping Cart | Games4U",
  description:
    "Review your selected games and complete your purchase on Games4U.",
};

export default function CartPage() {
  return (
    <Suspense fallback={<p className="text-center py-20">Loading cart...</p>}>
      <CartClient />
    </Suspense>
  );
}
