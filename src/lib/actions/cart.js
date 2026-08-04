import { serverFetch, serverMutation } from "../core/server";

/**
 * Get all cart items from the backend server
 */
export const getCartItems = async () => {
  try {
    const data = await serverFetch('/api/cart/');
    return data?.items || data?.cart_items || data || [];
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }
};

/**
 * Add a product to the cart
 * @param {Object} productData - Product object jeta te { product_id } thakbe
 */
export const addCartItem = async (productData) => {
  try {
    const response = await serverMutation('/api/cart/add/', productData);
    return response;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

/**
 * Remove an item from the cart
 * @param {Number|String} itemId - CartItem-er ID
 */
export const removeCartItem = async (itemId) => {
  try {
    const response = await serverMutation('/api/cart/remove/', { item_id: itemId });
    return response;
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
};

/**
 * Update cart item quantity
 * @param {Number|String} itemId - CartItem-er ID
 * @param {Number} quantity - Notun quantity
 */
export const updateCartItemQuantityApi = async (itemId, quantity) => {
  try {
    const response = await serverMutation('/api/cart/update/', { 
      item_id: itemId, 
      quantity: quantity 
    });
    return response;
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    throw error;
  }
};