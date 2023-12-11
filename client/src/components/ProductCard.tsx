"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces/productInterface";
import { Heart, Eye, Star, ShoppingCart } from "@phosphor-icons/react";
import { Rating } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
// Product interface dùng để check kiểu dữ liệu của product nhận từ API
// ProductCardProps sử dụng để check kiểu dữ liệu của props truyền vào ProductCard
interface ProductCardProps {
  product: Product;
}
// Product Card Component
export default function ProductCard({ product }: ProductCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();
  const handleDragStart = () => {
    setIsDragging(false);
  };
  const handleDragMove = () => {
    setIsDragging(true);
  };
  const handleClick = () => {
    if (!isDragging) {
      router.push(`/products/${product.id}`);
    }
  };
  return (
    <a
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onClick={handleClick}
    >
      <div className="my-5 mr-5 cursor-pointer rounded-3xl bg-white shadow-lg transition-all duration-300 group">
        <div className="p-4 relative overflow-hidden">
          <div className="absolute z-10 top-0 -right-14 group-hover:right-4 transition-all duration-300 ease-in-out">
            <div className="bg-primary-50 hover:bg-primary-200 shadow-sm rounded-full p-2.5 cursor-pointer w-fit">
              <Eye size={24} className="text-primary-800" />
            </div>
          </div>

          <div className="relative w-full h-48 group-hover:scale-110 transition-transform ease-in-out duration-300 cursor-pointer">
            <Image
              className="rounded-xl"
              fill
              style={{ objectFit: "contain" }}
              src={product.image}
              alt={product.title}
            />
          </div>
          <h1 className="my-4 truncate font-medium text-slate-900">
            {product.title}
          </h1>
          <div className="flex items-center gap-2">
            <Rating
              key={product.id}
              name="product_rating"
              defaultValue={product.rating.rate}
              precision={0.5}
              readOnly
              size="small"
            />
            <p className=" text-sm text-primary-600">
              ({product.rating.count})
            </p>
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center p-4">
          <p className="text-2xl font-bold text-primary-800">{product.price}</p>
          <button className="text-white bg-primary-600 hover:bg-primary-700 rounded-full px-4 py-2 transition-colors duration-300">
            Add to Cart
          </button>
        </div>{" "}
      </div>
    </a>
  );
}
