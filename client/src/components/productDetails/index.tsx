"use client";

import ProductSlider from "./ProductSlider";
import { Rating } from "@mui/material";
import { Heart, Minus, Plus, Repeat, Truck } from "@phosphor-icons/react";
import { useState } from "react";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";

function ProductDetails() {
  // Get products id from url
  const products = {
    name: "Cotton T-Shirt",
    description: "Cotton T-Shirt",
    category: "T-Shirts",
    price: 259000,
    currency: "VND",
    images: [
      "/images/one.jpg",
      "/images/two.jpg",
      "/images/three.jpg",
      "/images/four.jpg",
      "/images/five.jpg",
      "/images/six.jpg",
    ],
    variants: [
      {
        size: "S",
        color: "Yellow",
        sku: "SKU-001",
        availableQuantity: 10,
      },
      {
        size: "M",
        color: "Red",
        sku: "SKU-002",
        availableQuantity: 5,
      },
      {
        size: "L",
        color: "Blue",
        sku: "SKU-003",
        availableQuantity: 5,
      },
      {
        size: "L",
        color: "Red",
        sku: "SKU-004",
        availableQuantity: 5,
      },
    ],
    ratings: [
      { userId: 1, rating: 4, review: "Great quality!" },
      { userId: 2, rating: 5, review: "Good" },
    ],
  };
  const { name, variants } = products;
  const [selectedSize, setSelectedSize] = useState(variants[0].size);
  const [selectedColor, setSelectedColor] = useState(variants[0].color);
  const [quantity, setQuantity] = useState<number>(1);

  const availableSizes = [...new Set(variants.map((variant) => variant.size))];
  const availableColors = [
    ...new Set(variants.map((variant) => variant.color)),
  ];

  // Filter size and color availability based on selected size and color
  const getColorAvailability = (size: string) => {
    return variants
      .filter((variant) => variant.size === size)
      .map((variant) => variant.color);
  };
  const getSizeAvailability = (color: string) => {
    return variants
      .filter((variant) => variant.color === color)
      .map((variant) => variant.size);
  };
  // Event handler
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    // Check if selected color is available in selected size
    if (!getColorAvailability(size).includes(selectedColor)) {
      setSelectedColor("");
    }
  };
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    if (!getSizeAvailability(color).includes(selectedColor)) {
      setSelectedSize("");
    }
  };
  return (
    <div>
      {/* products Detail */}
      <div className="flex gap-8 justify-between p-12">
        <ProductSlider images={products.images} />
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-semibold">{name}</h1>
          <div className="flex gap-2 ">
            <Rating name="products-rating" defaultValue={4.5} precision={0.5} />
            <p className="text-primary-600">
              ({products?.ratings.length} Reviews)
            </p>
            <p>|</p>
            <p className="text-green-600">In Stock</p>
          </div>
          <p className="text-2xl font-normal">
            {products.currency + " " + products.price}
          </p>
          <p className="text-sm font-normal ">{products.description}</p>
          <hr className="border" />
          {/* Colors */}
          <div className="flex gap-2 items-center">
            <p className="text-xl font-normal tracking-wider">Colors:</p>
            <div>
              <div className="flex gap-2">
                <ColorSelector
                  variants={variants}
                  availableColors={availableColors}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                  onColorChange={handleColorChange}
                />
              </div>
            </div>
          </div>
          {/* Sizes */}
          <div>
            <div className="flex gap-2 items-center">
              <p className="text-xl font-normal tracking-wider">Sizes:</p>
              <div className="">
                <SizeSelector
                  variants={variants}
                  availableSizes={availableSizes}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                  onSizeChange={handleSizeChange}
                />
              </div>
            </div>
          </div>
          {/* Quantity, Add to Cart */}
          <div className="flex gap-4 items-center">
            {/* Button decrease quantity */}
            <div className="flex">
              <button
                onClick={() => {
                  quantity > 1 && setQuantity(quantity - 1);
                }}
                className="border bg-primary-50 border-primary-400 border-solid p-1 rounded-l hover:bg-primary-100 active:bg-primary-200 focus:outline-none"
              >
                <Minus size={26} />
              </button>
              <p className="py-1 font-medium w-16 text-center border-t border-b border-primary-400">
                {quantity}
              </p>
              {/* Button increase quantity */}
              <button
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
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
      {/* Related Products */}
      <div>
        <h2>Các sản phẩm khác</h2>
      </div>
    </div>
  );
}

export default ProductDetails;
