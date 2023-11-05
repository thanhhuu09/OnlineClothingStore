"use client";
import { MagnifyingGlass, ShoppingBag } from "@phosphor-icons/react";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-white sticky w-full z-20 top-0 left-0 ">
      <div className="flex justify-between items-center p-4">
        <div style={{ position: "relative" }}>
          <div style={{ width: "200px", height: "60px" }}>
            <Image
              src="/logo.png"
              style={{ objectFit: "cover" }}
              alt="logo"
              fill
            />
          </div>
        </div>

        <ul className="flex gap-4 items-center text-[#475569]">
          <li>Nam</li>
          <li>Nữ</li>
          <li>Trẻ em</li>
          <li>Thương hiệu</li>
          <li className="text-[#0f172a] font-bold">Khuyến mãi</li>
        </ul>
        <ul className="flex gap-4 items-center">
          <li className="cursor-pointer">
            <MagnifyingGlass size={24} color="black" />
          </li>
          <li className="cursor-pointer">
            <ShoppingBag size={24} color="black" />
          </li>
          <li>
            <button
              type="button"
              className="text-gray-900 hover:text-white border hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Đăng nhập
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
