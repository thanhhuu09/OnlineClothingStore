"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces/productInterface";
import { Heart, Eye, Star } from "@phosphor-icons/react";
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
  console.log(router);
  const handleDragStart = () => {
    setIsDragging(false);
    console.log("one mouse down");
  };
  const handleDragMove = () => {
    setIsDragging(true);
    console.log("one mouse move");
  };
  const handleClick = () => {
    if (!isDragging) {
      router.push(`/products/${product.id}`);
    }
  };
  return (
    <div>
      {/* Top Section */}
      <div className="overflow-hidden w-80 h-80 bg-white border border-gray-200 rounded-2xl shadow relative group">
        <a
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onClick={handleClick}
        >
          <Image
            className="p-8 rounded-t-lg group-hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer"
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: "contain" }}
          />
        </a>
        <div className="absolute top-0 -right-11 group-hover:right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-slate-200 rounded-full p-2 mb-2 cursor-pointer">
            <Heart size={26} color="black" />
          </div>
          <div className="bg-slate-200 rounded-full p-2 cursor-pointer">
            <Eye size={26} color="black" />
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="mt-4">
        <h2 className="text-base font-semibold max-w-[200px] truncate">
          {product.title}
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <h3 className="text-base font-semibold text-secondary-400">
            {product.price}
          </h3>
          <Rating
            key={product.id}
            name="product-rating"
            defaultValue={product.rating.rate}
            precision={0.5}
            readOnly
          />
          <p className="text-primary-600">({product.rating.count})</p>
        </div>
      </div>
    </div>
  );
}
