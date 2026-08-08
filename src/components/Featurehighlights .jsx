"use client";

import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from "react-icons/fi";

const DEFAULT_FEATURES = [
  {
    icon: FiTruck,
    title: "Free Shipping",
    description: "On all orders over $100",
  },
  {
    icon: FiShield,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: FiRefreshCw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: FiHeadphones,
    title: "24/7 Support",
    description: "Dedicated customer care",
  },
];

export default function FeatureHighlights({ features = DEFAULT_FEATURES }) {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-10 sm:py-12 bg-white dark:bg-black border-y border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 divide-y divide-x-0 sm:divide-y-0 sm:divide-x divide-zinc-200 dark:divide-zinc-800">
        {features.map(({ icon: Icon, title, description }, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 px-3 sm:px-6 py-5 sm:py-2"
          >
            <div className="shrink-0 p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-100 dark:ring-indigo-900">
              <Icon size={20} />
            </div>
            <div className="flex flex-col">
              <p className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {title}
              </p>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}