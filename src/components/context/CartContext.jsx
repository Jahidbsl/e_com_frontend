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
          // Django API response er structure onujayi data set kora hocche
          setCartItems(initialCart.items || initialCart.item || []);
          setTotal(initialCart.total || 0);
        }
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCart();
  }, []);

  // Add product to cart
  const addToCart = async (product) => {
    try {
      const productId = product.id || product._id;

      // Backend action call kora hocche (import kora function er nam onujayi)
      const response = await addCartItem({ product_id: productId });

      if (response && response.cart) {
        setCartItems(response.cart.items || response.cart.item || []);
        setTotal(response.cart.total || 0);
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  // Remove product from cart
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

  // Update product quantity in cart
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
        // Optimistically update local state or refresh cart
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

  return (
    <cartContext.Provider
      value={{
        cartItems,
        total,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => useContext(cartContext);
