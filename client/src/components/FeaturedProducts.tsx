"use client";
import { Product } from "@/interfaces/productInterface";
import ProductCard from "./ProductCard";
import { getProducts } from "@/api/products";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import ProductCardSkeleton from "./ProductCardSkeleton";
// Featured Products Component

export default function FeaturedProducts() {
  // Fetch data from API
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res);
        setIsLoading(true);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
    return () => {
      setProducts([]);
    };
  }, []);

  return (
    <div>
      <div className="p-4">
        <Slider {...settings}>
          {products?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
