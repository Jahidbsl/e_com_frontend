import React from "react";
import AllProducts from "./AllProducts";
import { getProducts } from "@/lib/actions/products";

const page = async () => {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div>
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">All Products list</h2>
      </div>
      {products.length > 0 ? (
        <AllProducts products={products} />
      ) : (
        <p className="text-gray-600 mt-4">No products available.</p>
      )}
    </div>
  );
};

export default page;