import React from 'react';
import Link from 'next/link';
import { FiChevronRight, FiArrowLeft } from 'react-icons/fi';
import { getProductDetails } from '@/lib/actions/products';
import ProductDetails from './ProductDetails';

const Page = async ({ params }) => {
  const { id } = await params;
  const product = await getProductDetails(id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-gray-900 dark:text-gray-100">

      {/* Breadcrumb & Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 border-b border-gray-100 dark:border-gray-900 pb-4">

        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <FiChevronRight size={14} className="text-gray-400" />
          <Link href="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Products
          </Link>
          <FiChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-[140px] sm:max-w-[220px]">
            {product?.name || "Details"}
          </span>
        </nav>

        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3.5 py-1.5 rounded-lg transition-colors w-fit"
        >
          <FiArrowLeft size={15} />
          <span>Back</span>
        </Link>
      </div>

      {/* Product Details Component */}
      <ProductDetails product={product} />
    </div>
  );
};

export default Page;