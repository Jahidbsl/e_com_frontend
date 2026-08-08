"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ProductCarousel({ products = [] }) {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollTo = useCallback(
    (i) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (!products.length) return null;

  return (
    <div className="relative w-full">
      {/* Viewport */}
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {products.map((product, i) => (
            <div
              key={product.id ?? i}
              className="relative flex-[0_0_100%] flex flex-col items-center justify-center"
            >
              <button
                type="button"
                onClick={() =>
                  product.id && router.push(`/products/${product.id}`)
                }
                className="w-full cursor-pointer"
                aria-label={`View details for ${product.name || "product"}`}
              >
                {product.image ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.image}`}
                    alt={product.name || "Product image"}
                    className="w-full h-[200px] object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
                    No Image Available
                  </div>
                )}
              </button>
              {product.name && (
                <p className="mt-4 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                  {product.name}
                </p>
              )}
              {product.price && (
                <p className="text-zinc-500 dark:text-zinc-400">
                  ${product.price}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/60 hover:bg-white dark:hover:bg-black rounded-full p-2 shadow-md transition"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={20} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/60 hover:bg-white dark:hover:bg-black rounded-full p-2 shadow-md transition"
        aria-label="Next slide"
      >
        <FiChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === selectedIndex
                ? "w-6 bg-indigo-600"
                : "w-2.5 bg-zinc-300 dark:bg-zinc-700"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
