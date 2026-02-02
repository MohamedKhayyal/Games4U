export const addToCart = async ({ itemId, itemType, variant }) => {
  const res = await fetch("/api/cart/items", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, itemType, variant }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to add to cart");
  }

  return res.json();
};

export const removeFromCart = async (itemId) => {
  const res = await fetch("/api/cart/items/remove", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to remove item");
  }

  return res.json();
};
