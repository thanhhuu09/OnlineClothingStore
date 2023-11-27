"use client";
import SizeBox from "@/components/SizeBox";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { id } = useParams();
  const productSizes = ["S", "M", "L", "XL"];
  // Use keep track of selected size
  const [selectedSize, setSelectedSize] = useState<string>("S");

  // Handle data from child component when is clicked
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <div className="flex gap-[30px]">
      {/* Child images for a product */}
      <div className="flex gap-4 flex-col">
        <div className="bg-primary-100 w-fit rounded-md px-5 py-2">
          <Image
            width={100}
            height={100}
            src="/images/product.svg"
            alt="product image"
          />
        </div>
        <div className="bg-primary-100 w-fit rounded-md px-5 py-2">
          <Image
            width={100}
            height={100}
            src="/images/product.svg"
            alt="product image"
          />
        </div>
        <div className="bg-primary-100 w-fit rounded-md px-5 py-2">
          <Image
            width={100}
            height={100}
            src="/images/product.svg"
            alt="product image"
          />
        </div>
        <div className="bg-primary-100 w-fit rounded-md px-5 py-2">
          <Image
            width={100}
            height={100}
            src="/images/product.svg"
            alt="product image"
          />
        </div>
      </div>
      {/* Main image for a product */}
      <div>
        <div className="bg-primary-100 w-[400px] h-[500px] rounded-md flex justify-center">
          <Image
            className=""
            width={300}
            height={300}
            src="/images/product.svg"
            alt="product image"
          />
        </div>
      </div>
      {/* Product info */}
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-semibold">Havic HV G-92 Gamepad</h1>
        <div className="flex gap-2 ">
          <Rating name="product-rating" defaultValue={4.5} precision={0.5} />
          <p className="text-primary-600">(150 Reviews)</p>
          <p>|</p>
          <p className="text-green-600">In Stock</p>
        </div>
        <p className="text-2xl font-normal">$192.00</p>
        <p className="text-sm font-normal ">
          PlayStation 5 Controller Skin High quality vinyl with air channel
          adhesive for easy bubble free install & mess free removal Pressure
          sensitive.
        </p>
        <hr className="border" />
        {/* Colors */}
        <div className="flex gap-2 items-center">
          <p className="text-xl font-normal tracking-wider">Colors:</p>
          <div>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-primary-100"></div>
              <div className="w-6 h-6 rounded-full bg-primary-200"></div>
              <div className="w-6 h-6 rounded-full bg-primary-300"></div>
            </div>
          </div>
        </div>
        {/* Sizes */}
        <div>
          <div className="flex gap-2 items-center">
            <p className="text-xl font-normal tracking-wider">Sizes:</p>
            <div className="flex gap-4">
              {productSizes.map((size) => (
                <SizeBox
                  key={size}
                  size={size}
                  isSelected={selectedSize === size} // Check if the size is selected or not
                  onSizeChange={handleSizeChange} // Handle data from child component when is clicked
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
