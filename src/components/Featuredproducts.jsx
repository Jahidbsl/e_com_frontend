"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FeaturedProducts({
  products = [],
  title = "Featured Products",
  limit = 10,
}) {
  const router = useRouter();

  if (!products.length) return null;

  const visibleProducts = products.slice(0, limit);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-2">
            Shop the collection
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {title}
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-indigo-600" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5 lg:gap-6">
          {visibleProducts.map((product, i) => (
            <button
              key={product.id ?? i}
              type="button"
              onClick={() => product.id && router.push(`/products/${product.id}`)}
              className="group relative flex flex-col text-left bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all duration-300"
            >
              <div className="relative w-full aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                {product.image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.image}`}
                    alt={product.name || "Product image"}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs sm:text-sm">
                    No Image
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 bg-white/90 dark:bg-black/70 text-zinc-800 dark:text-zinc-100 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                  View →
                </span>
              </div>

              <div className="p-3 sm:p-4 flex flex-col gap-1">
                <p className="text-xs sm:text-sm lg:text-base font-semibold text-zinc-800 dark:text-zinc-100 line-clamp-1">
                  {product.name || "Unnamed Product"}
                </p>
                {product.price && (
                  <p className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400">
                    ${product.price}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        {products.length > limit && (
          <div className="flex justify-center mt-10 sm:mt-14">
            <button
              type="button"
              onClick={() => router.push("/products")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-500 font-semibold text-sm sm:text-base hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-colors duration-300"
            >
              View All Products
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}