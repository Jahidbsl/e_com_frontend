import { getProducts } from "@/lib/actions/products";

export default async function Home() {

  const backend = await getProducts();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <h1 className="text-4xl font-bold text-center text-zinc-800 dark:text-zinc-200">
      {backend[0]?.name}
    </h1>
 
    </div>
  );
}
