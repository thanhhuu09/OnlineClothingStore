"use client";
import { Product } from "@/interfaces/productInterface";
import ProductCard from "./ProductCard";
import { getProducts } from "@/api/products";
import Slider from "react-slick";
import { useEffect, useState } from "react";
// Featured Products Component

export default function FeaturedProducts() {
  // Fetch data from API
  const [products, setProducts] = useState<Product[]>([]);

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
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-center text-4xl text-primary-700 font-extrabold p-16">
        SẢN PHẨM BÁN CHẠY
      </h1>
      {/* <div className="flex gap-4 justify-between px-16">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div> */}
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
