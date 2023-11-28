"use client";
import ColorBox from "@/components/ColorBox";
import SizeBox from "@/components/SizeBox";
import { Rating } from "@mui/material";
import { Heart, Minus, Plus, Repeat, Truck } from "@phosphor-icons/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { id } = useParams();
  const productSizes = ["S", "M", "L", "XL"];
  const productColors = ["primary-100", "primary-200", "primary-300"];
  const productImages = [
    "/images/one.jpg",
    "/images/two.jpg",
    "/images/three.jpg",
    "/images/four.jpg",
    "/images/five.jpg",
    "/images/six.jpg",
  ];
  // Use keep track of selected size
  const [selectedSize, setSelectedSize] = useState<string>(productSizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(productColors[0]);
  const [quantity, setQuality] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>(productImages[0]);
  // Handle data from child component when is clicked
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };
  const handleOnColorChange = (color: string) => {
    setSelectedColor(color);
  };
  const handleDecreaseQuality = () => {
    if (quantity > 1) {
      setQuality(quantity - 1);
    }
  };
  const handleIncreaseQuality = () => {
    setQuality(quantity + 1);
  };

  return (
    <div className="flex gap-8 justify-between px-12">
      {/* Child images for a product */}
      <div className="flex gap-3 flex-col h-[550px] overflow-y-scroll no-scrollbar">
        {productImages.map((image, index) => (
          <div
            key={index}
            className="bg-primary-100 w-fit rounded-md px-5 py-2"
          >
            <Image
              width={150}
              height={150}
              src={image}
              alt="product image"
              onClick={() => setSelectedImage(image)}
            />
          </div>
        ))}
      </div>
      {/* Main image for a product */}
      <div className="w-[700px]">
        <div className="bg-primary-100 max-w-full rounded-md flex justify-center items-center overflow-hidden">
          <Image
            layout="responsive"
            width={300}
            height={250}
            objectFit="contain"
            src={selectedImage}
            alt="product image"
          />
        </div>
      </div>
      {/* Product info */}
      <div className="flex flex-col gap-5">
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
              {productColors.map((color) => (
                <ColorBox
                  key={color}
                  color={color}
                  isSelected={selectedColor === color}
                  onColorChange={handleOnColorChange}
                />
              ))}
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
        {/* Quantity, Add to Cart */}
        <div className="flex gap-4 items-center">
          {/* Button decrease quantity */}
          <div className="flex">
            <button
              onClick={handleDecreaseQuality}
              className="border bg-primary-50 border-primary-400 border-solid p-1 rounded-l hover:bg-primary-100 active:bg-primary-200 focus:outline-none"
            >
              <Minus size={26} />
            </button>
            <p className="py-1 font-medium w-16 text-center border-t border-b border-primary-400">
              {quantity}
            </p>
            {/* Button increase quantity */}
            <button
              onClick={handleIncreaseQuality}
              className="border border-primary-400 border-solid bg-secondary-500 p-1 rounded-r hover:bg-secondary-600 active:bg-secondary-700 focus:outline-none"
            >
              <Plus size={26} className="text-slate-50" />
            </button>
          </div>
          {/* Button add to cart */}
          <button className="border border-primary-400 bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded-lg text-slate-50 font-semibold px-8 py-2 shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
            Add to cart
          </button>
          <div className="border bg-white border-primary-400 border-solid p-1 rounded flex justify-center items-center hover:bg-primary-50 active:bg-primary-100 ">
            <button className="transition duration-200 ease-in-out transform hover:scale-105">
              <Heart size={24} className="text-primary-700" />
            </button>
          </div>
        </div>
        {/* Description */}
        <div>
          <div className="flex items-center gap-4 border border-primary-400 border-solid w-fit px-3 py-5 rounded-t">
            <Truck size={36} className="text-primary-700" />
            <div>
              <p className="text-base font-medium">Free Delivery</p>
              <p className="text-xs font-normal">
                Enter your postal code for Delivery Availability
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 border border-primary-400 border-solid w-fit px-3 py-5 rounded-b">
            <Repeat size={36} className="text-primary-700" />
            <div>
              <p className="text-base font-medium">Free Delivery</p>
              <p className="text-xs font-normal">
                Enter your postal code for Delivery Availability
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
