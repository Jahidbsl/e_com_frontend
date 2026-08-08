import { getProducts } from "@/lib/actions/products";
import ProductCarousel from "@/components/ProductCarousel";
import FeatureHighlights from "@/components/Featurehighlights ";
import FeaturedProducts from "@/components/Featuredproducts";


export default async function Home() {
  const backend = await getProducts();

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black space-y-8">
      <ProductCarousel products={backend} />
      <FeatureHighlights />
      <FeaturedProducts products={backend} title="Our Products" limit={5} />
    </div>
  );
}