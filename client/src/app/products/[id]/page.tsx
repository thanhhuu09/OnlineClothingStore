"use client";
import ColorBox from "@/components/product-details/ColorBox";
import ProductSlider from "@/components/product-details/ProductSlider";
import SizeBox from "@/components/product-details/SizeBox";
import { Rating } from "@mui/material";
import { Heart, Minus, Plus, Repeat, Truck } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductById } from "@/api/products";
import { IProduct } from "@/interfaces/productInterface";
import { useCart } from "@/contexts/cartContext";
export default function Page() {
  // Get product id from url
  const [product, setProduct] = useState<IProduct>();

  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductById(id);
      setProduct(product);
    };
    fetchProduct();
  }, [id]);
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
  // const { decrementQuantity, incrementQuantity, quantity } = useStateContext();
  const { dispatch } = useCart();
  const decrementQuantity = () => {
    dispatch({ type: "DECREMENT_QUANTITY" });
  };
  const incrementQuantity = () => {
    dispatch({ type: "INCREMENT_QUANTITY" });
  };
  const { quantity } = useCart().state;

  // Handle data from child component when is clicked
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };
  const handleOnColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <>
      {/* Product Detail */}
      <div className="flex gap-8 justify-between p-12">
        <ProductSlider images={productImages} />
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-semibold">{product?.title}</h1>
          <div className="flex gap-2 ">
            <Rating name="product-rating" defaultValue={4.5} precision={0.5} />
            <p className="text-primary-600">
              ({product?.rating.count} Reviews)
            </p>
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
                onClick={decrementQuantity}
                className="border bg-primary-50 border-primary-400 border-solid p-1 rounded-l hover:bg-primary-100 active:bg-primary-200 focus:outline-none"
              >
                <Minus size={26} />
              </button>
              <p className="py-1 font-medium w-16 text-center border-t border-b border-primary-400">
                {quantity}
              </p>
              {/* Button increase quantity */}
              <button
                onClick={incrementQuantity}
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
    </>
  );
}
