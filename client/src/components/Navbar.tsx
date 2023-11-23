"use client";
import { MagnifyingGlass, ShoppingBag } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white sticky w-full z-20 top-0 left-0 border-b-slate-600">
      <div className="flex justify-between items-center px-12 py-2">
        <div style={{ position: "relative", width: "200px", height: "60px" }}>
          <Link href="/">
            <Image
              src="/logo.svg"
              style={{ objectFit: "cover" }}
              alt="logo"
              fill
            />
          </Link>
        </div>

        <ul className="flex gap-4 items-center text-primary-600">
          <li>Nam</li>
          <li>Nữ</li>
          <li>Trẻ em</li>
          <li>Thương hiệu</li>
          <li className="text-primary-900 font-bold">Khuyến mãi</li>
        </ul>
        <ul className="flex gap-4 items-center">
          <li className="cursor-pointer">
            <form className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"></form>
          </li>
          <li className="cursor-pointer">
            <div className="relative">
              <ShoppingBag size={24} color="black" />
              <span className="absolute bottom-3 left-3 bg-secondary-600 text-pr rounded-full p-1 text-sm text-secondary-50 w-5 h-5 flex justify-center items-center">
                3
              </span>
            </div>
          </li>
          <li>
            <Link
              href="/auth/login"
              className="text-gray-900 hover:text-white border hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Đăng nhập
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
