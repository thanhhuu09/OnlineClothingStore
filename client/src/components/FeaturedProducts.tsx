import ProductCard from "./ProductCard";

// Featured Products Component
export default function FeaturedProducts() {
  return (
    <div>
      <h1 className="text-center text-4xl text-primary-700 font-extrabold p-16">
        SẢN PHẨM BÁN CHẠY
      </h1>
      <div className="flex gap-4 justify-between px-16">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
