import { serverFetch } from "../core/server";


export async function getProducts() {
  return await serverFetch('/api/products/');
}

export async function getProductDetails(id) {
  return await serverFetch(`/api/products/${id}`);
}


