import { Product } from "@/interfaces/productInterface";
import ProductCard from "./ProductCard";
import { getProducts } from "@/api/products";
// Featured Products Component

export default async function FeaturedProducts() {
  // Fetch data from API
  const products = await getProducts();

  return (
    <div>
      <h1 className="text-center text-4xl text-primary-700 font-extrabold p-16">
        SẢN PHẨM BÁN CHẠY
      </h1>
      <div className="flex gap-4 justify-between px-16">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
