"use client";
import { useCart } from '@/components/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';

const Cartpage = () => {
    const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

    // Django API response-er exact keys onujayi total calculation kora hocche
    const total = (cartItems || []).reduce((acc, item) => {
        const price = Number(item.product_price || 0);
        const quantity = Number(item.quantity || 1);
        return acc + price * quantity;
    }, 0);

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto py-20 px-4 text-center text-gray-900 dark:text-gray-100">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-950/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <FiShoppingBag size={36} />
                    </div>
                    <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                        Looks like you haven&apos;t added anything to your cart yet. Explore our products and find something you love.
                    </p>
                    <Link
                        href="/products"
                        className="mt-4 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-sm"
                    >
                        <FiArrowLeft size={18} />
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 text-gray-900 dark:text-gray-100">
            <h1 className="text-3xl font-extrabold tracking-tight mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
                
                <div className="lg:col-span-8 space-y-4">
                    {cartItems.map((item) => {
                        // Django JSON response keys matching
                        const itemId = item.id;
                        const itemName = item.product_name || "Product";
                        const itemPrice = Number(item.product_price || 0);
                        const itemImage = item.product_image || "";
                        const itemStock = item.stock !== undefined ? item.stock : Infinity;

                        const imageUrl = itemImage.startsWith("http")
                            ? itemImage
                            : `${baseUrl}${itemImage}`;

                        const currentQty = item.quantity || 1;
                        
                        return (
                            <div 
                                key={itemId}
                                className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-4 sm:p-6 rounded-2xl shadow-sm gap-4"
                            >
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="relative w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shrink-0 border border-gray-100 dark:border-gray-800">
                                        {itemImage ? (
                                            <Image
                                                src={imageUrl}
                                                alt={itemName}
                                                fill
                                                sizes="80px"
                                                className="object-contain p-2"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-base sm:text-lg line-clamp-1">{itemName}</h3>
                                        <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-1">${itemPrice.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                                    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => updateCartItemQuantity(itemId, currentQty - 1)}
                                            disabled={currentQty <= 1}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition"
                                        >
                                            <FiMinus size={14} />
                                        </button>
                                        
                                        <span className="px-4 font-bold text-sm">{currentQty}</span>
                                        
                                        {/* Plus Button with Stock Validation */}
                                        <button
                                            onClick={() => updateCartItemQuantity(itemId, currentQty + 1)}
                                            disabled={currentQty >= itemStock}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition"
                                        >
                                            <FiPlus size={14} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(itemId)}
                                        className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition"
                                        aria-label="Remove item"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="lg:col-span-4 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xl sticky top-24">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                    <div className="space-y-3 text-sm border-b border-gray-100 dark:border-gray-800 pb-6">
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                            <span className="font-bold">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                            <span className="font-bold">Free</span>
                        </div>
                    </div>

                    <div className="flex justify-between py-6 text-lg font-extrabold">
                        <span>Total</span>
                        <span className="text-indigo-600 dark:text-indigo-400">${total.toFixed(2)}</span>
                    </div>

                  <Link 
    href="/checkout"
    className="w-full mt-2 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-base transition-all duration-200 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5"
>
    <span>Proceed to Checkout</span>
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-5 h-5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2.5}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
</Link>
                </div>

            </div>
        </div>
    );
};

export default Cartpage;