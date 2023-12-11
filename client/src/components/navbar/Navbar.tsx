"use client";
import { List, MagnifyingGlass, ShoppingBag } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useStateContext } from "@/context/CartStateContext";
import NavSidebar from "./NavSidebar";
import { useState } from "react";
import Submenu from "./Submenu";

export default function Navbar() {
  const { setShowCart } = useStateContext();
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [openSubmenu, setOpenSubmenu] = useState<string>("");
  const handleMouseOver = (label: string) => {
    setOpenSubmenu(label);
  };
  return (
    <nav className="bg-white sticky w-full z-20 top-0 left-0 border-b-slate-600">
      <div className="flex justify-between items-center px-12 py-2">
        <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
          <List size={24} color="black" />
        </button>

        <div className="relative w-[200px] h-[60px]">
          <Link href="/">
            <Image
              src="/logo.svg"
              style={{ objectFit: "cover" }}
              alt="logo"
              fill
            />
          </Link>
        </div>
        <ul className="hidden md:flex gap-4 items-center text-primary-600">
          <Link href="/products">
            <li className="text-primary-700 text-base font-semibold border-b border-primary-950 hover:text-primary-950 ">
              Tất cả sản phẩm
            </li>
          </Link>
        </ul>
        {/* NavSidebar */}
        <NavSidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <ul className="flex gap-4 items-center">
          <li className="cursor-pointer">
            <form className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"></form>
          </li>
          <li className="cursor-pointer">
            <button
              className="relative flex justify-center"
              onClick={() => setShowCart(true)}
            >
              <ShoppingBag size={24} color="black" />
              <p className="absolute bottom-3 left-3 bg-secondary-600 text-pr rounded-full p-1 text-sm text-secondary-50 w-5 h-5 flex justify-center items-center">
                3
              </p>
            </button>
          </li>
          <li className="hidden md:block">
            <Link
              href="/auth/login"
              className="text-gray-900 hover:text-white border hover:bg-gray-900 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center transition-colors duration-300"
            >
              Đăng nhập
            </Link>
          </li>
        </ul>
      </div>
      {/* Submenu */}
      <div className="hidden md:block relative bg-primary-50 p-4 border-b border-primary-400 ">
        <ul className="flex justify-center gap-6 text-sm font-semibold flex-wrap">
          <li className="uppercase">Trang chủ</li>
          <li className="uppercase">Mua nhiều giảm sâu</li>
          <li className="uppercase">Giới thiệu</li>
          <li className="uppercase">Sản phẩm mới</li>
          <li className="uppercase">
            <Submenu
              label="Áo"
              items={["Áo thun", "Áo sơ mi", "Áo khoác"]}
              isOpen={openSubmenu === "Áo"}
              closeSubmenu={() => setOpenSubmenu("")}
              onMouseOver={() => handleMouseOver("Áo")}
            />
          </li>
          <li className="uppercase">
            <Submenu
              label="Quần"
              items={["Quần jean", "Quần kaki"]}
              isOpen={openSubmenu === "Quần"}
              closeSubmenu={() => setOpenSubmenu("")}
              onMouseOver={() => handleMouseOver("Quần")}
            />
          </li>
          <li className="uppercase">
            <Submenu
              label="Phụ kiện"
              items={["Ví", "Mũ", "Tất"]}
              isOpen={openSubmenu === "Phụ kiện"}
              closeSubmenu={() => setOpenSubmenu("")}
              onMouseOver={() => handleMouseOver("Phụ kiện")}
            />
          </li>
          <li className="uppercase">Bộ sưu tập</li>
        </ul>
      </div>
    </nav>
  );
}
