"use client";
import { useState } from "react";
import { useCart } from "@/components/context/CartContext";
import React from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/lib/auth";
import {
  FiUser,
  FiMapPin,
  FiPhone,
  FiCreditCard,
  FiLock,
} from "react-icons/fi";

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    shipping_address: "",
    phone_number: "",
    payment_method: "Cash on Delivery",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const orderPayload = {
        ...formData,
        items: cartItems,
      };

      const response = await authFetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/create/`,
        {
          method: "POST",
          body: orderPayload,
        },
      );

      const data = await response.json().catch(() => ({}));

   if (!response.ok) {
        let errorMessage = "Failed to place order.";
        
        if (typeof data === "string") {
          errorMessage = data;
        } else if (data && typeof data === "object") {
          const firstVal = Object.values(data)[0];
          if (typeof firstVal === "string") {
            errorMessage = firstVal;
          } else if (Array.isArray(firstVal) && typeof firstVal[0] === "string") {
            errorMessage = firstVal[0];
          } else if (data.error && typeof data.error === "string") {
            errorMessage = data.error;
          } else if (data.detail && typeof data.detail === "string") {
            errorMessage = data.detail;
          }
        }
        
        throw new Error(errorMessage);
      }

      if (data && (data.success || response.ok)) {
        setMessage({ type: "success", text: "Order placed successfully!" });
        if (typeof clearCart === "function") {
          clearCart();
        }

        setTimeout(() => {
          router.push("/products");
        }, 1500);
      } else {
        setMessage({
          type: "error",
          text: data?.error || "Failed to place order.",
        });
      }
    } catch (error) {
      console.error("Order creation error:", error);
      setMessage({
        type: "error",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Please fill in your shipping and payment details to complete your
            order.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <FiUser
                size={16}
                className="text-indigo-600 dark:text-indigo-400"
              />
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              placeholder="John Doe"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <FiMapPin
                size={16}
                className="text-indigo-600 dark:text-indigo-400"
              />
              Shipping Address
            </label>
            <textarea
              name="shipping_address"
              rows="3"
              placeholder="123 Street Name, City, Country"
              value={formData.shipping_address}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <FiPhone
                  size={16}
                  className="text-indigo-600 dark:text-indigo-400"
                />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                placeholder="+1234567890"
                value={formData.phone_number}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <FiCreditCard
                  size={16}
                  className="text-indigo-600 dark:text-indigo-400"
                />
                Payment Method
              </label>
              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Online Payment">Online Payment</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-base transition-all duration-200 shadow-lg shadow-indigo-600/25 disabled:opacity-50"
          >
            <FiLock size={18} />
            <span>
              {loading ? "Processing Order..." : "Place Order Securely"}
            </span>
          </button>

          {message && (
            <div
              className={`p-4 rounded-xl text-sm font-medium text-center ${
                message.type === "success"
                  ? "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900"
                  : "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900"
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;