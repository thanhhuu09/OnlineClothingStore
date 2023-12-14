"use client";
import { IProduct } from "@/interfaces/productInterface";
import ProductCard from "./ProductCard";
import { getProducts } from "@/api/products";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import ProductCardSkeleton from "./ProductCardSkeleton";
// Featured Products Component

export default function FeaturedProducts() {
  // Fetch data from API
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024, // breakpoint for desktop
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768, // breakpoint for tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 640, // breakpoint for mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
    ],
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
    <section className="bg-gradient-to-r from-primary-50 to-primary-100 px-10 py-24">
      <h1 className="text-center text-4xl text-primary-700 font-extrabold mb-4">
        SẢN PHẨM BÁN CHẠY
      </h1>
      <Slider {...settings}>
        {products?.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Slider>
    </section>
  );
}
