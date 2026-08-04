import Image from "next/image";
import Link from "next/link";
import React from "react";

const AllProducts = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full flex flex-col justify-between"
          key={product.id}
        >
          <div>
            {product.image ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.image}`}
                alt={product.name || "Product image"}
                width={300}
                height={200}
                className="w-full h-[200px] object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
                No Image Available
              </div>
            )}
            <h2 className="text-xl font-bold mt-2">{product.name}</h2>
            {/* <p className="text-gray-600 mt-1">{product.description}</p> */}
            <p className="text-gray-800 font-semibold mt-2">${product.price}</p>
          </div>
          <Link
            href={`/products/${product.id}`}
            className="mt-4 inline-block text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 w-full"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
