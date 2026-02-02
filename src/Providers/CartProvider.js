"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { addToCart, removeFromCart } from "@/lib/cartActions";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user, loading: authLoading } = useAuth();

  const [cart, setCart] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      let res = await fetch("/api/cart/me", {
        credentials: "include",
      });

      if (res.status === 401) {
        const refreshRes = await fetch("/api/auth/refresh-token", {
          method: "POST",
          credentials: "include",
        });

        if (!refreshRes.ok) throw new Error("Session expired");

        res = await fetch("/api/cart/me", {
          credentials: "include",
        });
      }

      if (!res.ok) {
        setCart(null);
        setCount(0);
        return;
      }

      const data = await res.json();
      const cartData = data?.data?.cart || null;

      setCart(cartData);
      setCount(cartData?.items?.length || 0);
    } catch {
      setCart(null);
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setCart(null);
      setCount(0);
      setLoading(false);
      return;
    }

    fetchCart();
  }, [user, authLoading]);

  return (
    <CartContext.Provider
      value={{
        cart,
        count,
        loading,
        refetchCart: fetchCart,

        addItem: async ({ itemId, itemType, variant }) => {
          await addToCart({ itemId, itemType, variant });
          await fetchCart();
        },
        removeItem: async (itemId) => {
          await removeFromCart(itemId);
          await fetchCart();
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
