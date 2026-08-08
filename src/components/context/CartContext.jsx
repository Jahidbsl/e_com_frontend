"use client";
import {
  addCartItem,
  getCartItems,
  removeCartItem,
  updateCartItemQuantityApi,
} from "@/lib/actions/cart";
import { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const initialCart = await getCartItems();
        if (initialCart) {
          // Handle both direct array or object containing items/cart_items
          const items = Array.isArray(initialCart)
            ? initialCart
            : initialCart.items ||
              initialCart.item ||
              initialCart.cart_items ||
              [];

          setCartItems(items);
          setTotal(initialCart.total || 0);
        }
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (product) => {
    try {
      const productId = product.id || product._id;
      const response = await addCartItem({ product_id: productId });

      if (response) {
        const cartData = response.cart || response;
        const items = Array.isArray(cartData)
          ? cartData
          : cartData.items || cartData.item || cartData.cart_items || [];

        setCartItems(items);
        setTotal(cartData.total || 0);
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await removeCartItem(itemId);
      setCartItems((prevItems) =>
        prevItems.filter((item) => (item.id || item._id) !== itemId),
      );
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  };

  const updateCartItemQuantity = async (itemId, quantity) => {
    const item = cartItems.find(
      (cartItem) => (cartItem.id || cartItem._id) === itemId,
    );

    if (
      quantity < 1 ||
      (item &&
        item.product?.stock !== undefined &&
        quantity > item.product.stock)
    ) {
      return;
    }

    try {
      const response = await updateCartItemQuantityApi(itemId, quantity);
      if (response) {
        setCartItems((prevItems) =>
          prevItems.map((cartItem) =>
            (cartItem.id || cartItem._id) === itemId
              ? { ...cartItem, quantity: quantity }
              : cartItem,
          ),
        );
      }
    } catch (error) {
      console.error("Failed to update cart quantity:", error);
    }
  };
  const clearCart = () => {
    setCartItems([]);
    setTotal(0);
    localStorage.removeItem("cart");
  };
  return (
    <cartContext.Provider
      value={{
        cartItems,
        total,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => useContext(cartContext);
