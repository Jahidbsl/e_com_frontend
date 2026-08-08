import { authFetch } from "../auth";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getCartItems = async () => {
  try {
    const response = await authFetch(`${BASEURL}/api/cart/`);
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    return data?.items || data?.cart_items || data || [];
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }
};

export const addCartItem = async (productData) => {
  try {
    const response = await authFetch(`${BASEURL}/api/cart/add/`, {
      method: "POST",
      body: productData,
    });
    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("Backend error details:", errorText || response.statusText);
      throw new Error(`Failed to add item: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

export const removeCartItem = async (itemId) => {
  try {
    const response = await authFetch(`${BASEURL}/api/cart/remove/`, {
      method: "POST",
      body: { item_id: itemId },
    });
    if (!response.ok) throw new Error("Failed to remove item");
    return await response.json();
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
};

export const updateCartItemQuantityApi = async (itemId, quantity) => {
  try {
    const response = await authFetch(`${BASEURL}/api/cart/update/`, {
      method: "POST",
      body: { item_id: itemId, quantity: quantity },
    });
    if (!response.ok) throw new Error("Failed to update quantity");
    return await response.json();
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    throw error;
  }
};