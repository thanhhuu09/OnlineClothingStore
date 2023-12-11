"use client";
import { useStateContext } from "@/context/CartStateContext";
import { X } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Cart() {
  const { showCart, setShowCart } = useStateContext();
  // Close sidebar when click outside

  return (
    <>
      {showCart && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-20"
          onClick={() => setShowCart(false)}
        ></div>
      )}

      <aside
        className={`${
          showCart ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 z-20 bg-primary-50 w-80 h-screen shadow-lg transform transition-transform duration-300 ease-in-out`}
      >
        <div>
          {/* Close sidebar button */}
          <div className="justify-start items-center flex p-3 w-full">
            <button
              className="border border-primary-400 bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded-lg text-slate-50 font-semibold px-3 py-1 shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
              onClick={() => setShowCart(!showCart)}
            >
              <X size={24} />
            </button>
            <p className="text-2xl font-bold mx-auto">Giỏ hàng</p>
          </div>
        </div>
        {/* Items */}
        <div>
          <div className="flex justify-between items-center gap-4 px-3 py-2 border-b border-primary-400 border-solid">
            {/* Image section */}
            <div className="relative w-[100px] h-[100px]">
              <Image
                src="/images/one.jpg"
                fill
                alt="product image"
                style={{ objectFit: "contain" }}
              />
            </div>
            {/* Info section */}
            <div>
              <p className="text-base font-medium">Áo thun nam</p>
              <p className="text-sm font-normal">Màu: Đen</p>
              <p className="text-sm font-normal">Size: M</p>
              <p className="text-sm font-normal">Giá: 100.000đ</p>
              <p className="text-sm font-normal">Số lượng: 1</p>
            </div>
            {/* Remove item */}
            <div className="border bg-white border-primary-400 border-solid p-1 rounded flex justify-center items-center hover:bg-primary-50 active:bg-primary-100 ">
              <button className="transition duration-200 ease-in-out transform hover:scale-105">
                <X size={24} className="text-primary-700" />
              </button>
            </div>
          </div>
          {/* Total price section */}
          <div className="flex justify-between items-center px-3 py-2 border-b border-primary-400 border-solid">
            <p className="text-base font-medium">Tổng tiền</p>
            <p className="text-base font-medium">100.000đ</p>
          </div>
          {/* Checkout section */}
          <div className="flex justify-center items-center px-3 py-2">
            <button className="border border-primary-400 bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded-lg text-slate-50 font-semibold px-8 py-2 shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
              Thanh toán
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
