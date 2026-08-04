"use client";
import { useCart } from "@/components/context/CartContext";
import Image from "next/image";

const ProductDetails = ({ product }) => {
  const { addToCart } = useCart();
  if (!product) {
    return (
      <div className="py-24 text-center text-gray-500 dark:text-gray-400">
        Product not found.
      </div>
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${baseUrl}${product.image}`;

  return (
    <section className="max-w-7xl mx-auto py-6 px-4 text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-black rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden w-full">
        <div className="grid md:grid-cols-12 items-center">

          <div className="relative bg-gray-50 dark:bg-black md:col-span-7 h-[450px] md:h-[650px] flex items-center justify-center p-6 md:border-r border-gray-100 dark:border-gray-800 w-full">
            {product.image ? (
              <Image
                src={imageUrl}
                alt={product.name || "Product image"}
                fill
                priority
                className="object-contain p-6 transition duration-500 ease-out hover:scale-[1.04]"
              />
            ) : (
              <span className="text-gray-400 dark:text-gray-600 text-sm">
                No image available
              </span>
            )}
          </div>

          <div className="p-8 lg:p-14 md:col-span-5 flex flex-col justify-between w-full">
            <div>
              <span
                className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${
                  product.stock > 0
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/25 dark:text-emerald-400"
                    : "bg-red-50 text-red-700 dark:bg-red-900/25 dark:text-red-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    product.stock > 0 ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>

              <h1 className="text-3xl lg:text-[2.5rem] font-extrabold tracking-tight mt-5 leading-tight">
                {product.name}
              </h1>

              <p className="text-3xl lg:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-4">
                ${product.price}
              </p>

              <div className="mt-7">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  {product.description}
                </p>
              </div>

              <div className="mt-7 divide-y divide-gray-100 dark:divide-gray-800 text-sm sm:text-base">
                <div className="flex justify-between py-2.5">
                  <span className="text-gray-500 dark:text-gray-400">Category</span>
                  <span className="font-bold">{product.category?.name || product.category}</span>
                </div>

                <div className="flex justify-between py-2.5">
                  <span className="text-gray-500 dark:text-gray-400">Stock</span>
                  <span className="font-bold">{product.stock}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock <= 0}
                className={`flex-1 py-3 px-6 rounded-xl font-bold transition shadow-sm ${
                  product.stock > 0
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                Add to Cart
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductDetails;