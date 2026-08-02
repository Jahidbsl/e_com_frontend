import { serverFetch } from "../core/server";


export async function getProducts() {
  return await serverFetch('/products/');
}
